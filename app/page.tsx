import Link from "next/link";

export default function Home() {
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
              ryan@whoami:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
            {/* whoami command */}
            <div>
              <span className="text-green-400">$</span> whoami
            </div>

            {/* ASCII name */}
            <pre className="text-green-400 text-[7px] sm:text-xs md:text-sm leading-tight whitespace-pre">
{`  ____                    _   _
 |  _ \\ _   _  __ _ _ __ | | | | ___ _ __  ___  ___  _ __
 | |_) | | | |/ _\` | '_ \\| |_| |/ _ \\ '_ \\/ __|/ _ \\| '_ \\
 |  _ <| |_| | (_| | | | |  _  |  __/ | | \\__ \\ (_) | | | |
 |_| \\_\\\\__, |\\__,_|_| |_|_| |_|\\___|_| |_|___/\\___/|_| |_|
        |___/`}
            </pre>

            {/* Title */}
            <div>
              <span className="text-green-400">$</span> cat title.txt
            </div>
            <div className="text-amber-400 pl-2 text-[10px] sm:text-xs md:text-sm">
              IT Professional | Cybersecurity Engineer | Developer
            </div>

            {/* Bio */}
            <div className="pt-2">
              <span className="text-green-400">$</span> cat bio.txt
            </div>
            <div className="text-green-300/90 pl-2 space-y-2 sm:space-y-3 leading-relaxed text-[10px] sm:text-xs md:text-sm">
              <p>
                Experienced IT and cybersecurity professional with a background
                spanning systems engineering, automation, and security across
                government and private industry environments. As a U.S. Navy
                veteran, I bring a mission-focused mindset and strong commitment
                to service, both in my professional work and in my community.
              </p>
              <p>
                Throughout my career, I&apos;ve worked across a range of
                technical roles focused on designing, improving, and operating
                complex systems in secure environments. My experience includes
                supporting enterprise infrastructure, implementing technical
                solutions that improve reliability and visibility, and helping
                teams integrate security into everyday engineering and
                operational practices.
              </p>
              <p>
                My cybersecurity experience includes conducting security
                assessments, performing risk analysis, and integrating security
                tools into enterprise environments. More recently, I&apos;ve
                expanded into security research and bug bounty work, using
                hands-on testing to better understand how systems actually fail
                and to strengthen defenses through practical, real-world
                validation rather than purely theoretical approaches.
              </p>
              <p>
                Outside of work, I care deeply about my local community and
                enjoy contributing through volunteer work and leadership roles
                that help strengthen the places where my family and neighbors
                live.
              </p>
            </div>

            {/* Links */}
            <div className="pt-2">
              <span className="text-green-400">$</span> ls -la ./links/
            </div>
            <div className="pl-2 space-y-1 text-[9px] sm:text-xs md:text-sm">
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4">
                <span className="text-green-500/70">drwxr-xr-x</span>
                <a
                  href="https://github.com/JRyanHenson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  github/
                </a>
                <span className="text-green-500/50">
                  -&gt; github.com/JRyanHenson
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4">
                <span className="text-green-500/70">drwxr-xr-x</span>
                <a
                  href="https://www.linkedin.com/in/j-ryan-henson-4415a2117/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  linkedin/
                </a>
                <span className="text-green-500/50">
                  -&gt; linkedin.com/in/j-ryan-henson
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4">
                <span className="text-green-500/70">-rw-r--r--</span>
                <a
                  href="mailto:hensojr@gmail.com"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  email.txt
                </a>
                <span className="text-green-500/50">
                  -&gt; hensojr@gmail.com
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4">
                <span className="text-green-500/70">-rw-r--r--</span>
                <Link
                  href="/about"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  about-site.md
                </Link>
                <span className="text-green-500/50">
                  -&gt; how this site was built
                </span>
              </div>
            </div>

            {/* Cybersecurity Tools */}
            <div className="pt-2">
              <span className="text-green-400">$</span> ls -la ./tools/
            </div>
            <div className="pl-2 space-y-1 text-[9px] sm:text-xs md:text-sm">
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4">
                <span className="text-green-500/70">-rwxr-xr-x</span>
                <a
                  href="/tools/hibp/"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  hibp-checker
                </a>
                <span className="text-green-500/50">
                  -&gt; check email against known data breaches
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 sm:gap-x-4">
                <span className="text-green-500/70">-rwxr-xr-x</span>
                <a
                  href="/tools/pwned-password/"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  pwned-password
                </a>
                <span className="text-green-500/50">
                  -&gt; check password against known data breaches
                </span>
              </div>
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
