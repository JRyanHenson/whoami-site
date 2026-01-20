export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8">
      <main className="max-w-3xl mx-auto">
        {/* Terminal window */}
        <div className="border border-green-500/50 rounded-sm">
          {/* Terminal header */}
          <div className="border-b border-green-500/50 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-green-500/70 text-sm ml-2">ryan@whoami:~</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 md:p-6 space-y-4 text-sm md:text-base">
            {/* whoami command */}
            <div>
              <span className="text-green-400">$</span> whoami
            </div>

            {/* ASCII name */}
            <pre className="text-green-400 text-xs md:text-sm leading-tight overflow-x-auto">{`
  ____                    _   _
 |  _ \\ _   _  __ _ _ __ | | | | ___ _ __  ___  ___  _ __
 | |_) | | | |/ _\` | '_ \\| |_| |/ _ \\ '_ \\/ __|/ _ \\| '_ \\
 |  _ <| |_| | (_| | | | |  _  |  __/ | | \\__ \\ (_) | | | |
 |_| \\_\\\\__, |\\__,_|_| |_|_| |_|\\___|_| |_|___/\\___/|_| |_|
        |___/
`}</pre>

            {/* Title */}
            <div>
              <span className="text-green-400">$</span> cat title.txt
            </div>
            <div className="text-amber-400 pl-2">
              Cybersecurity Engineer | Web Developer | Security Researcher
            </div>

            {/* Bio */}
            <div className="pt-2">
              <span className="text-green-400">$</span> cat bio.txt
            </div>
            <div className="text-green-300/90 pl-2 space-y-3 leading-relaxed">
              <p>
                Security engineer with 10 years of experience supporting U.S.
                government agencies and private industry in enterprise and
                mission-critical environments.
              </p>
              <p>
                Throughout my career, I&apos;ve focused on security assessments and
                risk analysis, integrating and operating security tools at scale,
                supporting secure development efforts, and automating security
                risk assessment and reporting workflows. This work gave me a
                strong foundation in how security programs function in real-world
                environments and how to turn technical findings into meaningful
                risk reduction.
              </p>
              <p>
                More recently, my focus has shifted toward security research,
                bug bounty work, and offensive security. I&apos;m interested in
                understanding how systems actually fail and using hands-on
                testing to validate risk rather than relying solely on
                theoretical or checklist-driven approaches.
              </p>
              <p>
                I&apos;m also passionate about applying AI to solve security problems,
                particularly in areas like automation, analysis, and improving
                signal-to-noise so security teams can move faster and make
                better decisions.
              </p>
            </div>

            {/* Links */}
            <div className="pt-2">
              <span className="text-green-400">$</span> ls -la ./links/
            </div>
            <div className="pl-2 space-y-1">
              <div>
                <span className="text-green-500/70">drwxr-xr-x</span>
                <span className="text-blue-400 ml-4">
                  <a
                    href="https://github.com/JRyanHenson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 hover:underline"
                  >
                    github/
                  </a>
                </span>
                <span className="text-green-500/50 ml-2">-&gt; github.com/JRyanHenson</span>
              </div>
              <div>
                <span className="text-green-500/70">drwxr-xr-x</span>
                <span className="text-blue-400 ml-4">
                  <a
                    href="https://www.linkedin.com/in/j-ryan-henson-4415a2117/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 hover:underline"
                  >
                    linkedin/
                  </a>
                </span>
                <span className="text-green-500/50 ml-2">-&gt; linkedin.com/in/j-ryan-henson</span>
              </div>
              <div>
                <span className="text-green-500/70">-rw-r--r--</span>
                <span className="text-cyan-400 ml-4">
                  <a
                    href="mailto:hensojr@gmail.com"
                    className="hover:text-cyan-300 hover:underline"
                  >
                    email.txt
                  </a>
                </span>
                <span className="text-green-500/50 ml-2">-&gt; hensojr@gmail.com</span>
              </div>
            </div>

            {/* Cursor */}
            <div className="pt-4">
              <span className="text-green-400">$</span>
              <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-green-500/40 text-xs">
          [ system uptime: always ] [ hosted on AWS ECS Fargate ]
        </div>
      </main>
    </div>
  );
}
