import BrandMark from './BrandMark'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="f-brand">
          <a className="brand" href="#">
            <BrandMark className="brand-mark" />
            <span className="brand-name">Codal Hub</span>
          </a>
          <p>Technology consulting &amp; development. Building scalable software and modern web applications that deliver real business impact.</p>
        </div>
        <div className="f-col">
          <h5>Services</h5>
          <a href="#services">Custom Software</a>
          <a href="#services">Web Platforms</a>
          <a href="#services">System Integrations</a>
          <a href="#services">Dynamics 365</a>
          <a href="#services">Cloud &amp; DevOps</a>
        </div>
        <div className="f-col">
          <h5>Company</h5>
          <a href="#approach">Approach</a>
          <a href="#technologies">Technologies</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="f-col">
          <h5>Connect</h5>
          <a href="https://www.codalhub.com" target="_blank" rel="noopener noreferrer">www.codalhub.com</a>
          <a href="https://www.linkedin.com/company/codal-hub" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:juxhin@codalhub.com">Email</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2025 Codal Hub. All rights reserved.</span>
        <span><a href="https://www.codalhub.com" target="_blank" rel="noopener noreferrer">www.codalhub.com</a></span>
      </div>
    </footer>
  )
}
