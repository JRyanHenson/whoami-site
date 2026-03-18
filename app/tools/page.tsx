import Link from "next/link";

const tools = [
  {
    command: "hibp-checker",
    description: "Check if an email address appears in known data breaches",
    href: "/tools/hibp/",
    status: "active",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-2 sm:p-4 md:p-8 overflow-x-hidden">
      <main className="max-w-3xl mx-auto">
        <div className="border border-green-500/50 rounded-sm overflow-hidden">
          {/* Terminal header */}
          <div className="border-b border-green-500/50 px-3 sm:px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-green-500/70 text-xs sm:text-sm ml-2">
              ryan@whoami:~/tools
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
            <div>
              <span className="text-green-400">$</span> ls -la ./tools/
            </div>

            <div className="text-green-300/80 pl-2 text-[10px] sm:text-xs md:text-sm">
              A collection of cybersecurity tools and utilities. More being added over time.
            </div>

            <div className="pl-2 space-y-3">
              {tools.map((tool) => (
                <div key={tool.command} className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4">
                    <span className="text-green-500/70">-rwxr-xr-x</span>
                    <a
                      href={tool.href}
                      className="text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      {tool.command}
                    </a>
                    <span className="text-green-500/30 text-[9px] sm:text-xs">
                      [{tool.status}]
                    </span>
                  </div>
                  <div className="pl-4 sm:pl-6 text-green-500/50 text-[9px] sm:text-xs">
                    {tool.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Back link */}
            <div className="pt-1">
              <span className="text-green-400">$</span> cd ~
            </div>
            <div className="pl-2">
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 hover:underline text-[10px] sm:text-xs md:text-sm"
              >
                ← back to home
              </Link>
            </div>

            {/* Cursor */}
            <div className="pt-1">
              <span className="text-green-400">$</span>
              <span className="inline-block w-2 h-3 sm:h-4 bg-green-500 ml-1 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-center text-green-500/40 text-[9px] sm:text-xs">
          [ system uptime: always ] [ hosted on AWS ECS Fargate ]
        </div>
      </main>
    </div>
  );
}
