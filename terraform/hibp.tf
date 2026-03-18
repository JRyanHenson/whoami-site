# ── ECR Repository ────────────────────────────────────────────
resource "aws_ecr_repository" "hibp" {
  name                 = "hibp-webapp"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "hibp-webapp-ecr"
  }
}

resource "aws_ecr_lifecycle_policy" "hibp" {
  repository = aws_ecr_repository.hibp.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 5 images"
      selection    = { tagStatus = "any", countType = "imageCountMoreThan", countNumber = 5 }
      action       = { type = "expire" }
    }]
  })
}

# ── Secrets Manager ───────────────────────────────────────────
# Stores the HIBP API key so it never appears in the task
# definition, environment variables, or Terraform state.
#
# After running terraform apply, populate the secret once:
#   aws secretsmanager put-secret-value \
#     --secret-id hibp/HIBP_API_KEY \
#     --secret-string "your_actual_key_here"
resource "aws_secretsmanager_secret" "hibp_api_key" {
  name        = "hibp/HIBP_API_KEY"
  description = "Have I Been Pwned API key for hibp-webapp"

  tags = {
    Name = "hibp-api-key"
  }
}

# ── IAM: Task Execution Role ───────────────────────────────────
# hibp needs its own execution role because it requires an extra
# permission the whoami-site role doesn't have: reading from
# Secrets Manager at container startup.
resource "aws_iam_role" "hibp_task_execution" {
  name = "hibp-webapp-ecs-task-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

# Base ECS permissions: pull from ECR, write logs to CloudWatch
resource "aws_iam_role_policy_attachment" "hibp_task_execution_base" {
  role       = aws_iam_role.hibp_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Scoped to only this specific secret — principle of least privilege
resource "aws_iam_role_policy" "hibp_secrets_access" {
  name = "hibp-webapp-secrets-access"
  role = aws_iam_role.hibp_task_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["secretsmanager:GetSecretValue"]
      Resource = aws_secretsmanager_secret.hibp_api_key.arn
    }]
  })
}

# ── CloudWatch Logs ────────────────────────────────────────────
resource "aws_cloudwatch_log_group" "hibp" {
  name              = "/ecs/hibp-webapp"
  retention_in_days = 7

  tags = {
    Name = "hibp-webapp-logs"
  }
}

# ── Security Group ─────────────────────────────────────────────
# Only allows inbound traffic from the ALB — the container is
# never reachable directly from the internet.
resource "aws_security_group" "hibp_tasks" {
  name        = "hibp-webapp-tasks-sg"
  description = "Allow inbound traffic from ALB to hibp tasks only"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Traffic from ALB only"
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "hibp-webapp-tasks-sg"
  }
}

# ── ECS Task Definition ────────────────────────────────────────
resource "aws_ecs_task_definition" "hibp" {
  family                   = "hibp-webapp"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.hibp_task_execution.arn

  container_definitions = jsonencode([{
    name  = "hibp-webapp"
    image = "${aws_ecr_repository.hibp.repository_url}:latest"

    portMappings = [{
      containerPort = 8000
      hostPort      = 8000
      protocol      = "tcp"
    }]

    # The ECS agent fetches this from Secrets Manager at container
    # startup and injects it as an env var. The value never appears
    # in the task definition JSON or CloudTrail logs.
    secrets = [{
      name      = "HIBP_API_KEY"
      valueFrom = aws_secretsmanager_secret.hibp_api_key.arn
    }]

    environment = [{
      name  = "HIBP_USER_AGENT"
      value = "ryanhenson-hibp"
    }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.hibp.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    # ALB uses this to verify the container is healthy before
    # routing traffic to it. Points to the lightweight /health
    # route, not the full app path.
    healthCheck = {
      command     = ["CMD-SHELL", "curl -f http://localhost:8000/health || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 10
    }

    essential = true
  }])

  tags = {
    Name = "hibp-webapp-task"
  }
}

# ── ECS Service ────────────────────────────────────────────────
# Runs in the same cluster as whoami-site. Fargate manages the
# underlying compute — no EC2 instances to maintain.
resource "aws_ecs_service" "hibp" {
  name            = "hibp-webapp-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.hibp.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.hibp_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.hibp.arn
    container_name   = "hibp-webapp"
    container_port   = 8000
  }

  depends_on = [aws_lb_listener_rule.hibp]

  tags = {
    Name = "hibp-webapp-service"
  }
}

# ── ALB Target Group ───────────────────────────────────────────
resource "aws_lb_target_group" "hibp" {
  name        = "hibp-webapp-tg"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = "/health"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }

  tags = {
    Name = "hibp-webapp-tg"
  }
}

# ── ALB Listener Rule ──────────────────────────────────────────
# Attaches to the existing HTTPS listener and intercepts requests
# matching /tools/hibp or /tools/hibp/* before they reach the
# default rule (which forwards everything to whoami-site).
# Priority 10 = evaluated before the default action.
resource "aws_lb_listener_rule" "hibp" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10

  condition {
    path_pattern {
      values = ["/tools/hibp", "/tools/hibp/*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hibp.arn
  }
}
