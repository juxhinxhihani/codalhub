import { useEffect, useRef } from 'react'
import { initSectionSpiral } from '../utils/spiral'

export default function Contact() {
  const spiralRef = useRef(null)

  useEffect(() => {
    const cleanup = initSectionSpiral(spiralRef.current, 600, 36, 0.35)
    return cleanup
  }, [])

  return (
    <section id="contact" className="cta-section">
      <canvas
        className="cta-spiral-bg"
        ref={spiralRef}
        width="600"
        height="600"
        style={{ width: '500px', height: '500px' }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="s-eyebrow reveal" style={{ justifyContent: 'center' }}>Let&apos;s Build Together</div>
        <h2 className="reveal reveal-delay-1">Ready to build something that <em>actually works?</em></h2>
        <p className="reveal reveal-delay-2">
          Whether you&apos;re a startup with a bold idea or an established company modernizing core systems &mdash; we&apos;re here to engineer it properly.
        </p>
        <div className="hero-btns reveal reveal-delay-3" style={{ justifyContent: 'center' }}>
          <a href="mailto:juxhin@codalhub.com" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Start a Project</a>
          <a href="https://www.codalhub.com" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }} target="_blank" rel="noopener noreferrer">codalhub.com</a>
        </div>
      </div>
    </section>
  )
}
