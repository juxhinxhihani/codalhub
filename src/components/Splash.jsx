import { useEffect, useRef, useState } from 'react'
import { sRGB } from '../utils/spiral'

export default function Splash({ onComplete }) {
  const canvasRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const c = canvasRef.current
    const bar = barRef.current
    const text = textRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const S = 160
    c.width = c.height = S * dpr
    const ctx = c.getContext('2d')
    ctx.scale(dpr, dpr)
    const cx = S / 2, cy = S / 2
    const NL = 18, IR = S * 0.08, OR = S * 0.46, CURVE = 2
    let cur = 0, lp = 0, phase = 0, hold = 0
    let rafId
    let completed = false

    function draw() {
      ctx.clearRect(0, 0, S, S)
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, S * 0.52)
      bg.addColorStop(0, '#0e0a50')
      bg.addColorStop(1, '#060420')
      ctx.fillStyle = bg
      ctx.beginPath()
      ctx.arc(cx, cy, S * 0.52, 0, Math.PI * 2)
      ctx.fill()
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, S * 0.5, 0, Math.PI * 2)
      ctx.clip()
      for (let i = 0; i < NL; i++) {
        const ba = (i / NL) * Math.PI * 2
        const amt = i < cur ? 1 : (i === cur ? lp : 0)
        if (amt <= 0) continue
        const steps = Math.floor(amt * 60)
        const sx = cx + Math.cos(ba) * IR, sy = cy + Math.sin(ba) * IR
        const ex = cx + Math.cos(ba + CURVE) * OR, ey = cy + Math.sin(ba + CURVE) * OR
        const rgb = sRGB(ba)
        const grad = ctx.createLinearGradient(sx, sy, ex, ey)
        const peakAl = 0.28 + 0.18 * amt
        grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${peakAl.toFixed(2)})`)
        grad.addColorStop(0.45, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(peakAl * 0.6).toFixed(2)})`)
        grad.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
        ctx.beginPath()
        for (let s = 0; s <= steps; s++) {
          const t = s / 60, r = IR + (OR - IR) * t, a = ba + CURVE * t
          const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.8
        ctx.shadowColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.3)`
        ctx.shadowBlur = 3 * amt
        ctx.stroke()
      }
      ctx.shadowBlur = 0
      ctx.fillStyle = '#060430'
      ctx.beginPath()
      ctx.arc(cx, cy, IR * 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      bar.style.width = ((cur + lp) / NL * 100) + '%'

      if (phase === 0) {
        lp += 0.25
        if (lp >= 1) {
          lp = 0
          cur += 2
          if (cur >= NL) {
            cur = NL
            phase = 1
            text.classList.add('show')
          }
        }
      } else if (phase === 1) {
        hold++
        if (hold > 25 && !completed) {
          completed = true
          phase = 2
          setExiting(true)
          setTimeout(() => onComplete(), 650)
          return
        }
      }
      if (phase < 2) rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete])

  return (
    <div id="splash" className={exiting ? 'exit' : ''}>
      <canvas id="splash-canvas" ref={canvasRef} width="320" height="320" />
      <div id="splash-text" ref={textRef}>Codal Hub</div>
      <div id="splash-bar">
        <div id="splash-bar-inner" ref={barRef} />
      </div>
    </div>
  )
}
