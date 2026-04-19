import { useState, useEffect } from 'react'
import './App.css'
import Splash from './components/Splash'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HeroCanvas from './components/HeroCanvas'
import Services from './components/Services'
import Approach from './components/Approach'
import Stats from './components/Stats'
import Technologies from './components/Technologies'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [showHero, setShowHero] = useState(false)

  const handleSplashComplete = () => {
    setSplashDone(true)
    setTimeout(() => {
      setShowNav(true)
      setShowHero(true)
    }, 650)
  }

  // Manage body overflow during splash
  useEffect(() => {
    document.body.classList.toggle('splash-active', !splashDone)
  }, [splashDone])

  // IntersectionObserver for reveal animations — set up after splash exits
  useEffect(() => {
    if (!splashDone) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((x) => { if (x.isIntersecting) x.target.classList.add('vis') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .tech-grid').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [splashDone])

  return (
    <>
      {!splashDone && <Splash onComplete={handleSplashComplete} />}
      <HeroCanvas />
      <Nav show={showNav} />
      <Hero show={showHero} />
      <Services />
      <Approach />
      <Stats />
      <Technologies />
      <Contact />
      <Footer />
    </>
  )
}
