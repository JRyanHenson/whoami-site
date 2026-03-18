import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-2 sm:p-4 md:p-8 overflow-x-hidden">
      <main className="max-w-3xl mx-auto">
        {/* Terminal window */}
        <div className="border border-green-500/50 rounded-sm overflow-hidden">
          {/* Terminal header */}
          <div className="border-b border-green-500/50 px-3 sm:px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-green-500/70 text-xs sm:text-sm ml-2">
              ryan@whoami:~/about
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
            {/* Header */}
            <div>
              <span className="text-green-400">$</span> cat README.md
            </div>

            <div className="text-amber-400 pl-2 text-sm sm:text-base md:text-lg font-bold">
              # About This Site
            </div>

            <div className="text-green-300/90 pl-2 leading-relaxed text-[10px] sm:text-xs md:text-sm">
              This site serves as both a personal landing page and a living DevSecOps
              project — a platform for deploying cybersecurity micro-apps alongside
              modern cloud infrastructure, containerization, and CI/CD automation.
            </div>

            {/* Tech Stack */}
            <div>
              <span className="text-green-400">$</span> cat stack.json
            </div>
            <div className="pl-2 space-y-1 text-[10px] sm:text-xs md:text-sm">
              <div className="text-cyan-400">{"{"}</div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;frontend&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;Next.js + TypeScript + Tailwind CSS&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;tools&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;Python + Flask (cybersecurity micro-apps)&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;containers&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;Docker multi-stage builds, non-root users&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;hosting&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;AWS ECS Fargate (two services, one cluster)&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;routing&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;ALB path-based routing (/tools/* → micro-apps)&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;infrastructure&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;Terraform (IaC)&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;ci_cd&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;GitHub Actions&quot;</span>
              </div>
              <div className="text-cyan-400">{"}"}</div>
            </div>

            {/* Security */}
            <div>
              <span className="text-green-400">$</span> cat security.log
            </div>
            <div className="pl-2 space-y-1 text-[10px] sm:text-xs md:text-sm">
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> All containers run as non-root users</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Multi-stage Docker builds minimize attack surface</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Trivy container scanning blocks high/critical CVEs pre-deploy</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Gitleaks scans full git history for leaked secrets</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Bandit + pip-audit scan Python code and dependencies</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> API keys stored in AWS Secrets Manager, never in task definitions</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> ALB security groups isolate containers from direct internet access</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Weekly scheduled rebuilds pull latest base image patches</span>
              </div>
            </div>

            {/* Architecture */}
            <div>
              <span className="text-green-400">$</span> cat architecture.txt
            </div>
            <pre className="text-green-300/80 pl-2 text-[8px] sm:text-[10px] md:text-xs leading-tight whitespace-pre overflow-x-auto">
{`┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ GitHub Repos │─▶│    GitHub    │─▶│  Amazon ECR  │
│ (site+tools) │  │   Actions    │  │  (2 repos)   │
└──────────────┘  └──────────────┘  └──────┬───────┘
                                           │
                  ┌────────────────────────┘
                  ▼
┌────────────────────────────────────────────────┐
│              ECS Fargate Cluster               │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │   whoami-site    │  │   hibp-webapp    │    │
│  │  Next.js  :3000  │  │  Flask   :8000   │    │
│  └──────────────────┘  └──────────────────┘    │
└────────────────────────┬───────────────────────┘
                         ▼
       ┌────────────────────────────────────┐
       │   Application Load Balancer        │
       │   /*       →  whoami-site          │
       │   /tools/* →  hibp-webapp          │
       └─────────────────┬──────────────────┘
                         ▼
                       Users`}
            </pre>

            {/* Back link */}
            <div>
              <span className="text-green-400">$</span> cd ~
            </div>
            <div className="pl-2">
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                ← back to home
              </Link>
            </div>

            {/* Cursor */}
            <div>
              <span className="text-green-400">$</span>
              <span className="inline-block w-2 h-3 sm:h-4 bg-green-500 ml-1 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 sm:mt-4 text-center text-green-500/40 text-[9px] sm:text-xs">
          [ system uptime: always ] [ hosted on AWS ECS Fargate ]
        </div>
      </main>
    </div>
  );
}
