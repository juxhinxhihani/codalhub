import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = resolve(__dirname, '../public/favicon.svg')
const svgData = readFileSync(svgPath, 'utf-8')

function render(size, outName) {
  const resvg = new Resvg(svgData, {
    fitTo: { mode: 'width', value: size },
    background: '#080620',
  })
  const png = resvg.render()
  const buf = png.asPng()
  const out = resolve(__dirname, `../public/${outName}`)
  writeFileSync(out, buf)
  console.log(`✓ ${outName} (${size}×${size})`)
}

render(32,  'favicon-32.png')
render(180, 'apple-touch-icon.png')
render(512, 'icon-512.png')

// OG image — separate wider SVG
const ogSvgPath = resolve(__dirname, '../public/og-image.svg')
const ogSvgData = readFileSync(ogSvgPath, 'utf-8')
const ogResvg = new Resvg(ogSvgData, {
  fitTo: { mode: 'width', value: 1200 },
  background: '#06041e',
})
const ogPng = ogResvg.render()
writeFileSync(resolve(__dirname, '../public/og-image.png'), ogPng.asPng())
console.log('✓ og-image.png (1200×630)')
