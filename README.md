# ryanhenson.io

Personal website and cybersecurity tools platform for [ryanhenson.io](https://ryanhenson.io). Built as a living DevSecOps project — the infrastructure, CI/CD pipeline, and security controls are part of the point.

## What's Here

- **Main site** — Personal landing page with terminal aesthetic
- **`/tools`** — Landing page for cybersecurity micro-apps
- **`/tools/hibp/`** — Have I Been Pwned breach checker (routed to separate Flask service)
- **`/about`** — Stack, architecture, and security controls

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Hosting | AWS ECS Fargate |
| Registry | Amazon ECR |
| Infrastructure | Terraform |
| DNS / TLS | Route53, ACM (TLS 1.3) |
| Load Balancer | ALB with path-based routing |
| CI/CD | GitHub Actions |

## Architecture

Two ECS services run in the same cluster behind a single ALB. Path-based routing rules determine which service handles each request:

```
ryanhenson.io/*          → whoami-site (Next.js, port 3000)
ryanhenson.io/tools/hibp/* → hibp-webapp (Flask, port 8000)
```

## Infrastructure

Terraform manages all AWS resources in `terraform/`:

```
terraform/
├── main.tf       # Provider and backend config
├── vpc.tf        # VPC, subnets, security groups
├── alb.tf        # Application Load Balancer and listeners
├── ecs.tf        # ECS cluster and whoami-site service
├── ecr.tf        # ECR repository for whoami-site
├── dns.tf        # Route53 and ACM certificate
├── variables.tf  # Input variables
├── outputs.tf    # Output values
└── hibp.tf       # All infrastructure for hibp-webapp service
```

### Apply infrastructure changes

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## CI/CD Pipeline

The pipeline runs on every push to `main` and on a weekly schedule for security patch rebuilds.

**Security gates (run in parallel, all must pass before deploy):**

| Gate | Tool | Protects Against |
|---|---|---|
| SAST | CodeQL | Logic bugs, injection flaws in TypeScript |
| Secrets | Gitleaks | Credentials committed to git history |
| Dependencies | npm audit | Known CVEs in npm packages |
| Container | Trivy | OS and package CVEs in Docker image |

**Deploy steps (only on gate pass):**
1. Build Docker image with `--pull` for latest base image
2. Trivy container scan — fails on CRITICAL or HIGH
3. Push to ECR
4. Force new ECS deployment

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Security Controls

- Containers run as non-root users
- Multi-stage Docker builds minimize attack surface
- API keys stored in AWS Secrets Manager — never in task definitions or environment variables
- ALB security groups restrict container access to ALB traffic only
- TLS 1.3 enforced on all HTTPS traffic
- Weekly scheduled rebuilds pull latest base image security patches
- ECR lifecycle policy retains only the last 5 images
