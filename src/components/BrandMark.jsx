import { useEffect, useRef } from 'react'
import { drawMark } from '../utils/spiral'

export default function BrandMark({ className }) {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const S = 32
    c.width = c.height = S * dpr
    const ctx = c.getContext('2d')
    ctx.scale(dpr, dpr)
    let rot = 0
    let rafId
    let isVisible = true

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting
    })
    observer.observe(c)

    const loop = () => {
      if (isVisible) { drawMark(ctx, S, rot); rot += 0.004 }
      rafId = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(rafId); observer.disconnect() }
  }, [])

  return <canvas ref={ref} className={className} />
}
