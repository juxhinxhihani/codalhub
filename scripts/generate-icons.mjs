import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = '/Users/juxhinxhihani/Downloads/IMG_7844.jpg'
const pub = resolve(__dirname, '../public')

async function run() {
  // Favicon 32×32 — square crop from center
  await sharp(src)
    .resize(32, 32, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(`${pub}/favicon-32.png`)
  console.log('✓ favicon-32.png')

  // Apple touch icon 180×180
  await sharp(src)
    .resize(180, 180, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(`${pub}/apple-touch-icon.png`)
  console.log('✓ apple-touch-icon.png')

  // PWA icon 512×512
  await sharp(src)
    .resize(512, 512, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(`${pub}/icon-512.png`)
  console.log('✓ icon-512.png')

  // OG image 1200×630 — cover crop
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90 })
    .toFile(`${pub}/og-image.jpg`)
  console.log('✓ og-image.jpg (1200×630)')
}

run().catch(err => { console.error(err); process.exit(1) })

