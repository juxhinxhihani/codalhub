// ═══ SPIRAL COLOR ═══
export function sRGB(angle) {
  const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const c = [0, 212, 255], m = [204, 34, 255], g = [34, 255, 170], bl = [40, 60, 220]
  let r, g2, b, t
  if (a < Math.PI * 0.5) {
    t = a / (Math.PI * 0.5)
    r = m[0] + (g[0] - m[0]) * t; g2 = m[1] + (g[1] - m[1]) * t; b = m[2] + (g[2] - m[2]) * t
  } else if (a < Math.PI) {
    t = (a - Math.PI * 0.5) / (Math.PI * 0.5)
    r = g[0] + (c[0] - g[0]) * t; g2 = g[1] + (c[1] - g[1]) * t; b = g[2] + (c[2] - g[2]) * t
  } else if (a < Math.PI * 1.5) {
    t = (a - Math.PI) / (Math.PI * 0.5)
    r = c[0] + (bl[0] - c[0]) * t; g2 = c[1] + (bl[1] - c[1]) * t; b = c[2] + (bl[2] - c[2]) * t
  } else {
    t = (a - Math.PI * 1.5) / (Math.PI * 0.5)
    r = bl[0] + (m[0] - bl[0]) * t; g2 = bl[1] + (m[1] - bl[1]) * t; b = bl[2] + (m[2] - bl[2]) * t
  }
  return [Math.round(r), Math.round(g2), Math.round(b)]
}

// ═══ BRAND MARK ═══
export function drawMark(ctx, S, rot) {
  const cx = S / 2, cy = S / 2
  ctx.clearRect(0, 0, S, S)
  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, S * 0.5)
  bg.addColorStop(0, '#12103a')
  bg.addColorStop(1, '#080620')
  ctx.fillStyle = bg
  ctx.beginPath()
  ctx.arc(cx, cy, S * 0.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, S * 0.48, 0, Math.PI * 2)
  ctx.clip()
  for (let i = 0; i < 20; i++) {
    const ba = (i / 20) * Math.PI * 2 + rot
    const IR = S * 0.1, OR = S * 0.45
    const sx = cx + Math.cos(ba) * IR, sy = cy + Math.sin(ba) * IR
    const ex = cx + Math.cos(ba + 0.8) * OR, ey = cy + Math.sin(ba + 0.8) * OR
    const rgb = sRGB(ba)
    const grad = ctx.createLinearGradient(sx, sy, ex, ey)
    grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.45)`)
    grad.addColorStop(0.4, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.22)`)
    grad.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
    ctx.beginPath()
    for (let s = 0; s <= 30; s++) {
      const t = s / 30, r = IR + (OR - IR) * t, a = ba + 0.8 * t
      s === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
              : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
    }
    ctx.strokeStyle = grad
    ctx.lineWidth = 0.7
    ctx.shadowColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.25)`
    ctx.shadowBlur = 2
    ctx.stroke()
  }
  ctx.shadowBlur = 0
  ctx.fillStyle = '#080620'
  ctx.beginPath()
  ctx.arc(cx, cy, S * 0.08, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// ═══ SECTION SPIRAL ═══
export function initSectionSpiral(canvas, size, lineCount, opacity) {
  if (!canvas) return () => {}
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = canvas.height = size * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  const cx = size / 2, cy = size / 2
  let rot = 0
  let rafId
  let isVisible = false

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting
  }, { threshold: 0.1 })
  observer.observe(canvas)

  function draw() {
    rot += 0.008
    if (isVisible) {
      ctx.clearRect(0, 0, size, size)
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5)
      bg.addColorStop(0, `rgba(14,10,60,${opacity})`)
      bg.addColorStop(1, `rgba(6,4,30,${opacity})`)
      ctx.fillStyle = bg
      ctx.beginPath()
      ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2)
      ctx.clip()
      for (let i = 0; i < lineCount; i++) {
        const ba = (i / lineCount) * Math.PI * 2 + rot
        ctx.beginPath()
        for (let s = 0; s <= 50; s++) {
          const t = s / 50, r = size * 0.08 + (size * 0.4) * t, a = ba + 1.5 * t
          s === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
                  : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
        }
        const rgb = sRGB(ba)
        ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(opacity * 0.8).toFixed(2)})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
      ctx.fillStyle = `rgba(6,4,40,${opacity})`
      ctx.beginPath()
      ctx.arc(cx, cy, size * 0.09, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
    rafId = requestAnimationFrame(draw)
  }

  draw()
  return () => { cancelAnimationFrame(rafId); observer.disconnect() }
}
