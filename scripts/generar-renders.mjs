/**
 * Genera los renders de catálogo: una imagen WebP con fondo transparente
 * por cada modelo y color, en public/modelos/renders/.
 *
 *   npm run renders
 *
 * Vuelve a correrlo cuando agregues un modelo o un color en
 * src/shared/api/mockData.js. Necesita Chromium de Playwright
 * (una sola vez: npx playwright install chromium).
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createServer } from 'vite'
import { chromium } from 'playwright'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const destino = join(raiz, 'public', 'modelos', 'renders')
mkdirSync(destino, { recursive: true })

const servidor = await createServer({ root: raiz, logLevel: 'warn', server: { port: 5198, strictPort: false } })
await servidor.listen()
const url = servidor.resolvedUrls.local[0]

// SwiftShader: dibuja WebGL por software, funciona también sin tarjeta de video.
const navegador = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})
const pagina = await navegador.newPage()
pagina.on('pageerror', (e) => console.error('Error en la página:', e.message))

try {
  await pagina.goto(`${url}herramientas/renders/index.html`)
  await pagina.waitForFunction(() => window.listo, null, { timeout: 60000 })
  const modelos = await pagina.evaluate(() => window.modelos)

  for (const { id, colores } of modelos) {
    for (const color of colores) {
      const dataUrl = await pagina.evaluate(([m, c]) => window.renderizar(m, c), [id, color])
      const archivo = join(destino, `${id}-${color}.webp`)
      writeFileSync(archivo, Buffer.from(dataUrl.split(',')[1], 'base64'))
      console.log('✓', `public/modelos/renders/${id}-${color}.webp`)
    }
  }
} finally {
  await navegador.close()
  await servidor.close()
}
