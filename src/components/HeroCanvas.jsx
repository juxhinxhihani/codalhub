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

const isMobile = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const tc = canvasRef.current
    const ctx = tc.getContext('2d', { alpha: false })
    const mobile = isMobile()

    // Mobile: cap DPR at 1 to dramatically reduce canvas pixels
    const dpr = mobile ? Math.min(window.devicePixelRatio || 1, 1) : Math.min(window.devicePixelRatio || 1, 2)
    // Mobile: fewer lines + steps for acceptable performance
    const NL = mobile ? 18 : 30
    const STEPS = mobile ? 28 : 60
    const INNER = 0.07, OUTER = 0.72

    let W, H

    // Stable size: on mobile use visualViewport to avoid address-bar resize events
    function getSize() {
      if (mobile && window.visualViewport) {
        return { w: window.visualViewport.width, h: window.visualViewport.height }
      }
      return { w: window.innerWidth, h: window.innerHeight }
    }

    function resize() {
      const { w, h } = getSize()
      W = w; H = h
      tc.width = Math.round(W * dpr)
      tc.height = Math.round(H * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    let mx, my, smx, smy, pvx = 0, pvy = 0
    let scrollRaw = 0, lastScrollY = 0
    let rot = 0, rotVel = 0
    let zoomTarget = 1, zoomSmooth = 1
    let twistAmt = 0, twistTarget = 0
    let breathe = 0
    let mouseInWindow = false
    let rafId
    let pendingMX = null, pendingMY = null, mousePending = false
    // 30fps throttle on mobile
    let frameSkip = false

    resize()
    mx = W / 2; my = H / 2; smx = mx; smy = my

    const onMouseMove = (e) => {
      if (mobile) return
      pendingMX = e.clientX; pendingMY = e.clientY; mousePending = true; mouseInWindow = true
    }
    const onMouseLeave = () => { mouseInWindow = false }
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY
      scrollRaw = window.scrollY
      if (!mobile) {
        zoomTarget = 1 + scrollRaw * 0.0018
        rotVel -= delta * 0.001
      }
    }

    // Only listen to orientation change on mobile to avoid address-bar resize jank
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, mobile ? 300 : 0)
    }
    const resizeTarget = mobile && window.visualViewport ? window.visualViewport : window

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    resizeTarget.addEventListener('resize', onResize, { passive: true })

    function draw() {
      // Throttle to ~30fps on mobile by skipping every other frame
      if (mobile) {
        frameSkip = !frameSkip
        if (frameSkip) { rafId = requestAnimationFrame(draw); return }
      }

      if (mousePending) {
        pvx = (pendingMX - smx) * 0.1; pvy = (pendingMY - smy) * 0.1
        mx = pendingMX; my = pendingMY; mousePending = false
      }

      breathe += mobile ? 0.008 : 0.012
      smx += (mx - smx) * 0.06 + pvx * 0.3
      smy += (my - smy) * 0.06 + pvy * 0.3
      pvx *= 0.82; pvy *= 0.82

      if (!mobile) {
        zoomSmooth += (zoomTarget - zoomSmooth) * 0.08
      }

      const mouseDX = mobile ? 0 : (smx - W / 2) / (W * 0.5)
      const mouseDY = mobile ? 0 : (smy - H / 2) / (H * 0.5)
      const mouseDist = mobile ? 0 : Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY)

      if (!mobile) {
        rotVel += mouseDX * 0.0006
        rotVel *= 0.96
        if (rotVel < -0.003) rotVel = -0.003
      }
      rot += (mobile ? 0.004 : 0.0035) + rotVel

      twistTarget = mobile ? 1.6 : (1.6 + mouseDY * 0.55)
      twistAmt += (twistTarget - twistAmt) * 0.04

      const cx = W / 2 + mouseDX * (mouseInWindow ? 28 : 0)
      const cy = H / 2 + mouseDY * (mouseInWindow ? 22 : 0)
      const minD = Math.min(W, H)
      const innerR = minD * INNER
      const outerR = minD * OUTER * (mobile ? 1 : zoomSmooth)
      const pulse = Math.sin(breathe) * 0.012
      const voidR = innerR * (1 + pulse)

      const mouseAngle = mobile ? 0 : Math.atan2(smy - cy, smx - cx)
      const mouseInfluence = mobile ? 0 : Math.min(1, mouseDist * 0.9) * (mouseInWindow ? 1 : 0)

      ctx.fillStyle = '#0a0e1a'
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < NL; i++) {
        const norm = i / NL
        const baseAngle = norm * Math.PI * 2 + rot

        let fanOpen = 0
        if (mouseInfluence > 0) {
          const angleDiff = ((baseAngle - mouseAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
          const proximity = Math.max(0, 1 - Math.abs(angleDiff) / 1.2)
          fanOpen = proximity * mouseInfluence * 0.22
        }

        const breatheAlpha = 0.03 * Math.sin(breathe + i * 0.35)
        const peakAlpha = Math.min(0.72, 0.42 + breatheAlpha)

        const [rr, gg, bb] = lineColor(norm)

        const sx = cx + Math.cos(baseAngle) * innerR
        const sy = cy + Math.sin(baseAngle) * innerR
        const endAngle = baseAngle + (twistAmt + fanOpen)
        const ex = cx + Math.cos(endAngle) * outerR
        const ey = cy + Math.sin(endAngle) * outerR

        const grad = ctx.createLinearGradient(sx, sy, ex, ey)
        grad.addColorStop(0, `rgba(${rr},${gg},${bb},${peakAlpha.toFixed(3)})`)
        grad.addColorStop(0.35, `rgba(${rr},${gg},${bb},${(peakAlpha * 0.75).toFixed(3)})`)
        grad.addColorStop(0.7, `rgba(${rr},${gg},${bb},${(peakAlpha * 0.28).toFixed(3)})`)
        grad.addColorStop(1, `rgba(${rr},${gg},${bb},0)`)

        ctx.beginPath()
        for (let s = 0; s <= STEPS; s++) {
          const frac = s / STEPS
          const easedFrac = frac * frac * (3 - 2 * frac) // smoothstep, no Math.pow
          const r = innerR + (outerR - innerR) * frac
          const a = baseAngle + (twistAmt + fanOpen) * easedFrac
          const px = cx + Math.cos(a) * r
          const py = cy + Math.sin(a) * r
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
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
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
      resizeTarget.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="three-canvas" ref={canvasRef} />
}
