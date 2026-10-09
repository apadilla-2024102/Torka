/**
 * Genera public/sitemap.xml y public/robots.txt antes de cada build
 * (script "prebuild" de package.json).
 *
 * Las rutas salen de los modelos de mockData.js y el dominio de
 * src/shared/config/negocio.js (sitioUrl): agregar un modelo o cambiar de
 * dominio actualiza ambos archivos sin tocarlos a mano.
 */
import { writeFileSync } from 'node:fs'
import { MOCK_MODELOS } from '../src/shared/api/mockData.js'
import { NEGOCIO } from '../src/shared/config/negocio.js'

const BASE = NEGOCIO.sitioUrl.replace(/\/$/, '')
const hoy = new Date().toISOString().slice(0, 10)

const rutas = [
  { ruta: '/', prioridad: '1.0', frecuencia: 'weekly' },
  { ruta: '/modelos', prioridad: '0.9', frecuencia: 'weekly' },
  ...MOCK_MODELOS.map((m) => ({ ruta: `/modelos/${m.id}`, prioridad: '0.9', frecuencia: 'weekly', modelo: m })),
  { ruta: '/cotizar', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: '/comparar', prioridad: '0.7', frecuencia: 'monthly' },
  { ruta: '/ahorro', prioridad: '0.7', frecuencia: 'monthly' },
  { ruta: '/distribuidores', prioridad: '0.7', frecuencia: 'monthly' },
  { ruta: '/preguntas', prioridad: '0.6', frecuencia: 'monthly' },
  { ruta: '/aviso-legal', prioridad: '0.2', frecuencia: 'yearly' },
  { ruta: '/privacidad', prioridad: '0.2', frecuencia: 'yearly' },
  { ruta: '/cookies', prioridad: '0.2', frecuencia: 'yearly' },
]

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const imagenes = (m) =>
  Object.values(m.vistas ?? {})
    .flat()
    .map(
      (v) =>
        `    <image:image><image:loc>${BASE}${v.src}</image:loc><image:title>${esc(`yolt ${m.nombre}, ${v.label.toLowerCase()}`)}</image:title></image:image>`,
    )
    .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${rutas
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${r.frecuencia}</changefreq>
    <priority>${r.prioridad}</priority>${r.modelo ? `\n${imagenes(r.modelo)}` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `# robots.txt de ${BASE}
User-agent: *
Allow: /
Disallow: /cotizar?*

Sitemap: ${BASE}/sitemap.xml
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(new URL('../public/robots.txt', import.meta.url), robots)
console.log(`sitemap.xml (${rutas.length} rutas) y robots.txt generados para ${BASE}`)
