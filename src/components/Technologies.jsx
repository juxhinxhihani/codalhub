export default function Technologies() {
  return (
    <section id="technologies">
      <div className="container">
        <div className="s-eyebrow reveal">Technologies</div>
        <h2 className="s-title reveal reveal-delay-1">Modern. Proven. <em>Battle-tested.</em></h2>
        <p className="s-desc reveal reveal-delay-2">Technologies chosen for performance, scalability, and long-term maintainability.</p>
        <div className="tech-grid reveal reveal-delay-3">

          {/* .NET */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity=".3"/>
                <text x="22" y="27" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#00d4ff">.NET</text>
              </svg>
            </div>
            <div className="name">.NET</div><div className="cat">Backend</div>
          </div>

          {/* Node.js */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="22,4 38,13 38,31 22,40 6,31 6,13" stroke="#44ffaa" strokeWidth="1.5" strokeOpacity=".4" fill="none"/>
                <polygon points="22,10 33,16.5 33,27.5 22,34 11,27.5 11,16.5" fill="#44ffaa" fillOpacity=".15"/>
                <text x="22" y="26" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="7.5" fontWeight="600" fill="#44ffaa">NODE</text>
              </svg>
            </div>
            <div className="name">Node.js</div><div className="cat">Runtime</div>
          </div>

          {/* React */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="22" cy="22" rx="18" ry="7" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity=".8"/>
                <ellipse cx="22" cy="22" rx="18" ry="7" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity=".8" transform="rotate(60 22 22)"/>
                <ellipse cx="22" cy="22" rx="18" ry="7" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity=".8" transform="rotate(120 22 22)"/>
                <circle cx="22" cy="22" r="3" fill="#00d4ff"/>
              </svg>
            </div>
            <div className="name">React</div><div className="cat">Frontend</div>
          </div>

          {/* Next.js */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="18" stroke="rgba(244,242,237,.35)" strokeWidth="1.5"/>
                <path d="M14 30 L24 14 L34 30" stroke="rgba(244,242,237,.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="18" y1="25" x2="30" y2="25" stroke="rgba(244,242,237,.9)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="name">Next.js</div><div className="cat">Framework</div>
          </div>

          {/* Vue.js */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 38 L4 8 L12 8 L22 26 L32 8 L40 8 Z" stroke="#44ffaa" strokeWidth="1.5" strokeLinejoin="round" fill="#44ffaa" fillOpacity=".12"/>
                <path d="M22 28 L12 12 L17 12 L22 20 L27 12 L32 12 Z" fill="#44ffaa" fillOpacity=".4"/>
              </svg>
            </div>
            <div className="name">Vue.js</div><div className="cat">Frontend</div>
          </div>

          {/* Laravel */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 12 C38 12 28 8 22 8 C16 8 6 12 6 12 L6 28 C6 28 12 36 22 36 C32 36 38 28 38 28 Z" stroke="#cc44ff" strokeWidth="1.5" strokeOpacity=".7" fill="#cc44ff" fillOpacity=".1"/>
                <path d="M22 8 L22 36" stroke="#cc44ff" strokeWidth="1" strokeOpacity=".4" strokeDasharray="2 2"/>
                <path d="M6 20 C6 20 14 24 22 24 C30 24 38 20 38 20" stroke="#cc44ff" strokeWidth="1.2" strokeOpacity=".5"/>
              </svg>
            </div>
            <div className="name">Laravel</div><div className="cat">PHP</div>
          </div>

          {/* Docker */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="16" width="8" height="7" rx="1" stroke="#00d4ff" strokeWidth="1.4" fill="#00d4ff" fillOpacity=".1"/>
                <rect x="15" y="16" width="8" height="7" rx="1" stroke="#00d4ff" strokeWidth="1.4" fill="#00d4ff" fillOpacity=".1"/>
                <rect x="24" y="16" width="8" height="7" rx="1" stroke="#00d4ff" strokeWidth="1.4" fill="#00d4ff" fillOpacity=".1"/>
                <rect x="15" y="8" width="8" height="7" rx="1" stroke="#00d4ff" strokeWidth="1.4" fill="#00d4ff" fillOpacity=".08"/>
                <rect x="24" y="8" width="8" height="7" rx="1" stroke="#00d4ff" strokeWidth="1.4" fill="#00d4ff" fillOpacity=".08"/>
                <path d="M6 28 C6 28 8 34 18 34 L34 34 C40 34 40 28 40 28 C40 28 38 24 34 24 L8 24 C4 24 6 28 6 28Z" stroke="#00d4ff" strokeWidth="1.2" fill="#00d4ff" fillOpacity=".08"/>
                <circle cx="35" cy="20" r="2" fill="#00d4ff" fillOpacity=".6"/>
                <path d="M37 20 C37 20 40 19 40 17" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="name">Docker</div><div className="cat">Container</div>
          </div>

          {/* Cloud */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34 32 L12 32 C8 32 5 29 5 25 C5 21.5 7.5 18.5 11 18 C11 13 15 9 20 9 C24.5 9 28 12 29 16.5 C32 16.5 38 19 38 25 C38 29 36 32 34 32Z" stroke="#3355ff" strokeWidth="1.5" fill="#3355ff" fillOpacity=".12"/>
                <line x1="16" y1="36" x2="16" y2="32" stroke="#3355ff" strokeWidth="1.2" strokeOpacity=".6"/>
                <line x1="22" y1="38" x2="22" y2="32" stroke="#3355ff" strokeWidth="1.2" strokeOpacity=".6"/>
                <line x1="28" y1="36" x2="28" y2="32" stroke="#3355ff" strokeWidth="1.2" strokeOpacity=".6"/>
              </svg>
            </div>
            <div className="name">Cloud</div><div className="cat">Infra</div>
          </div>

          {/* DevOps */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 8 C14 8 8 14 8 22 C8 26 10 30 13 32" stroke="#cc44ff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M22 36 C30 36 36 30 36 22 C36 18 34 14 31 12" stroke="#44ffaa" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <polygon points="22,4 26,12 18,12" fill="#cc44ff" fillOpacity=".9"/>
                <polygon points="22,40 26,32 18,32" fill="#44ffaa" fillOpacity=".9"/>
                <circle cx="22" cy="22" r="4" stroke="rgba(244,242,237,.4)" strokeWidth="1.2" fill="none"/>
              </svg>
            </div>
            <div className="name">DevOps</div><div className="cat">Automation</div>
          </div>

          {/* Dynamics 365 */}
          <div className="tech-cell">
            <div className="tc-icon">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 22 L22 8 L36 22 L22 36 Z" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity=".5" fill="#00d4ff" fillOpacity=".06"/>
                <path d="M14 22 L22 14 L30 22 L22 30 Z" stroke="#cc44ff" strokeWidth="1.5" fill="#cc44ff" fillOpacity=".15"/>
                <circle cx="22" cy="22" r="3.5" fill="#cc44ff" fillOpacity=".8"/>
                <text x="22" y="42" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="6" fontWeight="600" fill="rgba(244,242,237,.4)" letterSpacing="0.5">365</text>
              </svg>
            </div>
            <div className="name">Dynamics 365</div><div className="cat">ERP</div>
          </div>

        </div>
      </div>
    </section>
  )
}
