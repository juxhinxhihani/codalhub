import { useEffect, useRef } from 'react'
import { initSectionSpiral } from '../utils/spiral'

export default function Approach() {
  const spiralRef = useRef(null)

  useEffect(() => {
    const cleanup = initSectionSpiral(spiralRef.current, 240, 28, 0.85)
    return cleanup
  }, [])

  return (
    <section id="approach">
      <div className="container">
        <div className="s-eyebrow reveal">Our Approach</div>
        <h2 className="s-title reveal reveal-delay-1">Technology meets <em>real</em> business challenges.</h2>
        <div className="approach-grid" style={{ marginTop: '5rem' }}>
          <div className="approach-left reveal reveal-delay-2">
            <h3>Practical expertise. <em>Measurable</em> outcomes.</h3>
            <p>Codal Hub is a technology consulting and development company focused on building scalable software and modern web applications. We help businesses streamline operations, improve efficiency, and accelerate digital transformation.</p>
            <p style={{ marginTop: '1.5rem' }}>Whether working with startups or established organizations, our focus is to deliver solutions that create real impact, enhance productivity, and support sustainable growth.</p>
            <div className="section-spiral-wrap reveal" style={{ marginTop: '2.5rem' }}>
              <canvas
                className="section-spiral"
                ref={spiralRef}
                width="240"
                height="240"
                style={{ width: '120px', height: '120px' }}
              />
            </div>
          </div>
          <div className="approach-right reveal reveal-delay-3">
            <div className="principle">
              <div className="principle-num">&mdash; 01</div>
              <h4>Engineered, not assembled</h4>
              <p>Every solution is designed from first principles &mdash; efficient, scalable, and aligned with long-term business goals.</p>
            </div>
            <div className="principle">
              <div className="principle-num">&mdash; 02</div>
              <h4>Built to integrate</h4>
              <p>Systems don&apos;t live in isolation. We ensure everything works seamlessly together.</p>
            </div>
            <div className="principle">
              <div className="principle-num">&mdash; 03</div>
              <h4>Outcome over output</h4>
              <p>Success is measured in business impact: improved efficiency, faster operations, and sustainable growth.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
