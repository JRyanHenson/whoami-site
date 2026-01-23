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
          <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
            {/* Header */}
            <div>
              <span className="text-green-400">$</span> cat README.md
            </div>

            <div className="text-amber-400 pl-2 text-sm sm:text-base md:text-lg font-bold">
              # About This Site
            </div>

            <div className="text-green-300/90 pl-2 leading-relaxed text-[10px] sm:text-xs md:text-sm">
              This site serves as both a personal landing page and a learning project
              for modern cloud infrastructure, containerization, and CI/CD automation.
            </div>

            {/* Tech Stack */}
            <div className="pt-2">
              <span className="text-green-400">$</span> cat stack.json
            </div>
            <div className="pl-2 space-y-2 text-[10px] sm:text-xs md:text-sm">
              <div className="text-cyan-400">{"{"}</div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;frontend&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;Next.js + TypeScript + Tailwind CSS&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;container&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;Docker (multi-stage Alpine build)&quot;</span>
                <span className="text-green-500">,</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">&quot;hosting&quot;</span>
                <span className="text-green-500">: </span>
                <span className="text-amber-300">&quot;AWS ECS Fargate&quot;</span>
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
            <div className="pt-2">
              <span className="text-green-400">$</span> cat security.log
            </div>
            <div className="pl-2 space-y-1.5 text-[10px] sm:text-xs md:text-sm">
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Container runs as non-root user</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Multi-stage Docker build minimizes attack surface</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Trivy vulnerability scanning blocks high/critical CVEs</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Weekly scheduled rebuilds pull latest security patches</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> ECR lifecycle policy limits stored image versions</span>
              </div>
              <div>
                <span className="text-green-500/70">[INFO]</span>
                <span className="text-green-300/90"> Security groups restrict traffic to necessary ports only</span>
              </div>
            </div>

            {/* Architecture */}
            <div className="pt-2">
              <span className="text-green-400">$</span> cat architecture.txt
            </div>
            <pre className="text-green-300/80 pl-2 text-[8px] sm:text-[10px] md:text-xs leading-tight whitespace-pre overflow-x-auto">
{`┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   GitHub    │────▶│   GitHub    │────▶│   Amazon    │
│    Repo     │     │   Actions   │     │     ECR     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Users     │────▶│     ALB     │────▶│ ECS Fargate │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘`}
            </pre>

            {/* Back link */}
            <div className="pt-4">
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
            <div className="pt-3 sm:pt-4">
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
