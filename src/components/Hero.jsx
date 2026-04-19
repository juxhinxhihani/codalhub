export default function Hero({ show }) {
  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={`hero${show ? ' show' : ''}`} id="hero">
      <div className="hero-eyebrow">Technology Consulting &amp; Development</div>
      <h1>
        <span className="word" style={{ transitionDelay: '.5s' }}>Scalable</span>{' '}
        <span className="word" style={{ transitionDelay: '.6s' }}>software</span>{' '}
        <span className="word" style={{ transitionDelay: '.7s' }}>and</span>{' '}
        <span className="word" style={{ transitionDelay: '.8s' }}><em>modern</em></span>{' '}
        <span className="word" style={{ transitionDelay: '.85s' }}><em>web</em></span>{' '}
        <span className="word" style={{ transitionDelay: '.9s' }}><em>applications</em></span>{' '}
        <span className="word" style={{ transitionDelay: '.98s' }}>&mdash;</span>{' '}
        <span className="word" style={{ transitionDelay: '1.05s' }}>engineered</span>{' '}
        <span className="word" style={{ transitionDelay: '1.12s' }}>for</span>{' '}
        <span className="word" style={{ transitionDelay: '1.2s' }}>impact.</span>
      </h1>
      <p className="hero-sub" style={{ transitionDelay: '1.35s' }}>
        We help businesses streamline operations, integrate systems, and accelerate digital transformation through tailored, high-quality solutions built to last.
      </p>
      <div className="hero-btns" style={{ transitionDelay: '1.5s' }}>
        <button className="btn-primary" onClick={() => scrollTo('contact')}>Start a Project</button>
        <button className="btn-ghost" onClick={() => scrollTo('services')}>Our Services</button>
      </div>
      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="line" />
      </div>
    </div>
  )
}
