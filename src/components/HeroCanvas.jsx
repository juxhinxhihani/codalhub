import { useEffect, useRef } from 'react'

function lineColor(norm) {
  norm = ((norm % 1) + 1) % 1
  let r, g, b
  if (norm < 0.33) {
    const t = norm / 0.33
    r = Math.round(0 + (68 - 0) * t); g = Math.round(212 + (255 - 212) * t); b = Math.round(255 + (170 - 255) * t)
  } else if (norm < 0.66) {
    const t = (norm - 0.33) / 0.33
    r = Math.round(68 + (204 - 68) * t); g = Math.round(255 + (68 - 255) * t); b = Math.round(170 + (255 - 170) * t)
  } else {
    const t = (norm - 0.66) / 0.34
    r = Math.round(204 + (0 - 204) * t); g = Math.round(68 + (212 - 68) * t); b = 255
  }
  return [r, g, b]
}

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const tc = canvasRef.current
    const ctx = tc.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W, H

    function resize() {
      W = window.innerWidth; H = window.innerHeight
      tc.width = W * dpr; tc.height = H * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const NL = 30, INNER = 0.07, OUTER = 0.72
    let mx, my, smx, smy, pvx = 0, pvy = 0
    let scrollRaw = 0, sScroll = 0, lastScrollY = 0
    let rot = 0, rotVel = 0
    let zoomTarget = 1, zoomSmooth = 1
    let twistAmt = 0, twistTarget = 0
    let breathe = 0
    let mouseInWindow = false
    let rafId
    let pendingMX = null, pendingMY = null, mousePending = false

    resize()
    mx = W / 2; my = H / 2; smx = mx; smy = my

    const onMouseMove = (e) => {
      pendingMX = e.clientX; pendingMY = e.clientY; mousePending = true; mouseInWindow = true
    }
    const onMouseLeave = () => { mouseInWindow = false }
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY
      scrollRaw = window.scrollY
      zoomTarget = 1 + scrollRaw * 0.0018
      rotVel -= delta * 0.001
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    function draw() {
      if (mousePending) {
        pvx = (pendingMX - smx) * 0.1; pvy = (pendingMY - smy) * 0.1
        mx = pendingMX; my = pendingMY; mousePending = false
      }
      breathe += 0.012
      smx += (mx - smx) * 0.06 + pvx * 0.3
      smy += (my - smy) * 0.06 + pvy * 0.3
      pvx *= 0.82; pvy *= 0.82
      sScroll += (scrollRaw - sScroll) * 0.07
      zoomSmooth += (zoomTarget - zoomSmooth) * 0.08

      const mouseDX = (smx - W / 2) / (W * 0.5)
      const mouseDY = (smy - H / 2) / (H * 0.5)
      const mouseDist = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY)
      rotVel += mouseDX * 0.0006
      rotVel *= 0.96
      if (rotVel < -0.003) rotVel = -0.003
      rot += 0.0035 + rotVel

      twistTarget = 1.6 + mouseDY * 0.55
      twistAmt += (twistTarget - twistAmt) * 0.04

      const cx = W / 2 + mouseDX * (mouseInWindow ? 28 : 0)
      const cy = H / 2 + mouseDY * (mouseInWindow ? 22 : 0)
      const minD = Math.min(W, H)
      const innerR = minD * INNER
      const outerR = minD * OUTER * zoomSmooth
      const pulse = Math.sin(breathe) * 0.012
      const voidR = innerR * (1 + pulse)

      ctx.clearRect(0, 0, W, H)

      const mouseAngle = Math.atan2(smy - cy, smx - cx)
      const mouseInfluence = Math.min(1, mouseDist * 0.9) * (mouseInWindow ? 1 : 0)

      for (let i = 0; i < NL; i++) {
        const norm = i / NL
        const baseAngle = norm * Math.PI * 2 + rot
        const angleDiff = ((baseAngle - mouseAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
        const proximity = Math.max(0, 1 - Math.abs(angleDiff) / 1.2)
        const fanOpen = proximity * mouseInfluence * 0.22

        const startA = baseAngle
        const endA = baseAngle + (twistAmt + fanOpen)
        const sx = cx + Math.cos(startA) * innerR
        const sy = cy + Math.sin(startA) * innerR
        const ex = cx + Math.cos(endA) * outerR
        const ey = cy + Math.sin(endA) * outerR

        const breatheAlpha = 0.03 * Math.sin(breathe + i * 0.35)
        const proximityBoost = proximity * mouseInfluence * 0.22
        const peakAlpha = Math.min(0.72, 0.42 + proximityBoost + breatheAlpha)

        const [rr, gg, bb] = lineColor(norm)

        const grad = ctx.createLinearGradient(sx, sy, ex, ey)
        grad.addColorStop(0, `rgba(${rr},${gg},${bb},${peakAlpha.toFixed(3)})`)
        grad.addColorStop(0.35, `rgba(${rr},${gg},${bb},${(peakAlpha * 0.75).toFixed(3)})`)
        grad.addColorStop(0.7, `rgba(${rr},${gg},${bb},${(peakAlpha * 0.28).toFixed(3)})`)
        grad.addColorStop(1, `rgba(${rr},${gg},${bb},0)`)

        const STEPS = 60
        ctx.beginPath()
        let first = true
        for (let s = 0; s <= STEPS; s++) {
          const frac = s / STEPS
          const easedFrac = Math.pow(frac, 0.82)
          const r = innerR + (outerR - innerR) * frac
          const a = baseAngle + (twistAmt + fanOpen) * easedFrac
          const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r
          if (first) { ctx.moveTo(px, py); first = false } else ctx.lineTo(px, py)
        }

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2 + proximity * mouseInfluence * 0.8
        ctx.stroke()
      }

      const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, voidR * 1.5)
      voidGrad.addColorStop(0, 'rgba(10,14,26,1)')
      voidGrad.addColorStop(0.65, 'rgba(10,14,26,0.95)')
      voidGrad.addColorStop(1, 'rgba(10,14,26,0)')
      ctx.fillStyle = voidGrad
      ctx.beginPath()
      ctx.arc(cx, cy, voidR * 1.5, 0, Math.PI * 2)
      ctx.fill()

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="three-canvas" ref={canvasRef} />
}
