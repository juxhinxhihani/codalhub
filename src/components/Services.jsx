const services = [
  { num: '01', title: 'Custom Software Development', desc: 'Tailored applications built around your business logic \u2014 scalable, maintainable, and designed for long-term growth.' },
  { num: '02', title: 'Web Platforms & Applications', desc: 'Modern, performant web applications \u2014 from MVPs to enterprise-grade platforms.' },
  { num: '03', title: 'System Integrations', desc: 'Connecting your tools, APIs, and data sources \u2014 ensuring all systems work seamlessly.' },
  { num: '04', title: 'ERP & Dynamics 365', desc: 'Implementation and customization of Microsoft Dynamics 365 Finance & Operations.' },
  { num: '05', title: 'Cloud & DevOps', desc: 'Docker, CI/CD, cloud infrastructure, and deployment automation.' },
  { num: '06', title: 'Digital Transformation', desc: 'Modernizing legacy systems to adapt, scale, and compete.' },
]

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="s-eyebrow reveal">What We Do</div>
        <h2 className="s-title reveal reveal-delay-1">Building the systems <em>behind</em> the business.</h2>
        <p className="s-desc reveal reveal-delay-2">
          From custom software to modern web platforms and enterprise integrations &mdash; we deliver solutions designed for efficiency, scale, and long-term value.
        </p>
        <div className="svc-list reveal reveal-delay-3">
          {services.map((s) => (
            <div key={s.num} className="svc-item">
              <div className="svc-num">{s.num}</div>
              <div className="svc-title">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-arrow">&#8594;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
