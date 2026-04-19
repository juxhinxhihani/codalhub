import { useEffect, useState } from 'react'
import BrandMark from './BrandMark'

export default function Nav({ show }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={[show ? 'show' : '', scrolled ? 'scrolled' : ''].filter(Boolean).join(' ')}>
      <a className="brand" href="#">
        <BrandMark className="brand-mark" />
        <span className="brand-name">Codal Hub</span>
      </a>
      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#approach">Approach</a>
        <a href="#technologies">Technologies</a>
        <a href="#contact">Contact</a>
      </div>
      <button className="nav-cta" onClick={() => scrollTo('contact')}>Get in Touch</button>
    </nav>
  )
}
