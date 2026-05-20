# ── ECR Repository ────────────────────────────────────────────
resource "aws_ecr_repository" "pwned_password" {
  name                 = "pwned-password"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "pwned-password-ecr"
  }
}

resource "aws_ecr_lifecycle_policy" "pwned_password" {
  repository = aws_ecr_repository.pwned_password.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 5 images"
      selection    = { tagStatus = "any", countType = "imageCountMoreThan", countNumber = 5 }
      action       = { type = "expire" }
    }]
  })
}

# ── IAM: Task Execution Role ───────────────────────────────────
# pwned-password only needs the base ECS execution policy —
# no Secrets Manager access required (Pwned Passwords API is keyless).
resource "aws_iam_role" "pwned_password_task_execution" {
  name = "pwned-password-ecs-task-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "pwned_password_task_execution_base" {
  role       = aws_iam_role.pwned_password_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ── CloudWatch Logs ────────────────────────────────────────────
resource "aws_cloudwatch_log_group" "pwned_password" {
  name              = "/ecs/pwned-password"
  retention_in_days = 7

  tags = {
    Name = "pwned-password-logs"
  }
}

# ── Security Group ─────────────────────────────────────────────
resource "aws_security_group" "pwned_password_tasks" {
  name        = "pwned-password-tasks-sg"
  description = "Allow inbound traffic from ALB to pwned-password tasks only"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Traffic from ALB only"
    from_port       = 8001
    to_port         = 8001
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
    Name = "pwned-password-tasks-sg"
  }
}

# ── ECS Task Definition ────────────────────────────────────────
resource "aws_ecs_task_definition" "pwned_password" {
  family                   = "pwned-password"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.pwned_password_task_execution.arn

  container_definitions = jsonencode([{
    name  = "pwned-password"
    image = "${aws_ecr_repository.pwned_password.repository_url}:latest"

    portMappings = [{
      containerPort = 8001
      hostPort      = 8001
      protocol      = "tcp"
    }]

    environment = [{
      name  = "HIBP_USER_AGENT"
      value = "ryanhenson-pwned-password"
    }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.pwned_password.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "python -c \"import urllib.request; urllib.request.urlopen('http://localhost:8001/health')\" || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 10
    }

    essential = true
  }])

  tags = {
    Name = "pwned-password-task"
  }
}

# ── ECS Service ────────────────────────────────────────────────
resource "aws_ecs_service" "pwned_password" {
  name            = "pwned-password-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.pwned_password.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.pwned_password_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.pwned_password.arn
    container_name   = "pwned-password"
    container_port   = 8001
  }

  depends_on = [aws_lb_listener_rule.pwned_password]

  tags = {
    Name = "pwned-password-service"
  }
}

# ── ALB Target Group ───────────────────────────────────────────
resource "aws_lb_target_group" "pwned_password" {
  name        = "pwned-password-tg"
  port        = 8001
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
    Name = "pwned-password-tg"
  }
}

# ── ALB Listener Rule ──────────────────────────────────────────
# Priority 20 — evaluated after hibp (priority 10) but before
# the default rule that forwards everything to whoami-site.
resource "aws_lb_listener_rule" "pwned_password" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 20

  condition {
    path_pattern {
      values = ["/tools/pwned-password", "/tools/pwned-password/*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pwned_password.arn
  }
}
