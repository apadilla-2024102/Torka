import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NEGOCIO } from '../config/negocio.js'

const MARCA = 'yolt'
const IMAGEN_SOCIAL = '/og-yolt.jpg'

/** Busca la etiqueta <meta>/<link> indicada en <head> o la crea. */
function etiqueta(selector, crear) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = crear()
    document.head.appendChild(el)
  }
  return el
}

const meta = (atributo, clave, valor) => {
  const el = etiqueta(`meta[${atributo}="${clave}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(atributo, clave)
    return m
  })
  el.setAttribute('content', valor)
}

export const urlAbsoluta = (ruta = '/') => `${NEGOCIO.sitioUrl}${ruta}`

/**
 * Título, descripción, enlace canónico, Open Graph, indexación y datos
 * estructurados (JSON-LD) de la página actual.
 *
 * Actualiza las etiquetas que ya trae index.html en lugar de añadir
 * otras: así nunca hay dos descripciones ni dos títulos en <head>.
 *
 *   titulo       sin la marca; se añade " | yolt". Sin título: el de portada.
 *   descripcion  150–160 caracteres, con la acción que se espera.
 *   jsonLd       objeto u arreglo de objetos schema.org de esta página.
 *   noindex      para páginas que no deben aparecer en Google (404).
 */
export function useSeo({ titulo, descripcion, imagen = IMAGEN_SOCIAL, jsonLd, noindex = false }) {
  const { pathname } = useLocation()
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const tituloCompleto = titulo ? `${titulo} | ${MARCA}` : `${MARCA} | Motos eléctricas en Guatemala`
    const canonica = urlAbsoluta(pathname === '/' ? '/' : pathname.replace(/\/$/, ''))
    const imagenAbs = imagen.startsWith('http') ? imagen : urlAbsoluta(imagen)

    document.title = tituloCompleto
    meta('name', 'description', descripcion)
    meta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    meta('property', 'og:title', tituloCompleto)
    meta('property', 'og:description', descripcion)
    meta('property', 'og:url', canonica)
    meta('property', 'og:image', imagenAbs)
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', tituloCompleto)
    meta('name', 'twitter:description', descripcion)
    meta('name', 'twitter:image', imagenAbs)

    const link = etiqueta('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    })
    link.href = canonica

    // Datos estructurados de la página: se quitan si esta página no tiene.
    const previo = document.getElementById('ld-pagina')
    if (!ld) {
      previo?.remove()
    } else {
      const script = previo ?? document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'ld-pagina'
      script.textContent = ld
      if (!previo) document.head.appendChild(script)
    }
  }, [titulo, descripcion, imagen, ld, noindex, pathname])
}
