import { NEGOCIO } from '../config/negocio.js'

/**
 * Analítica del sitio.
 *
 * - Vercel Web Analytics: sin cookies ni datos personales; se carga
 *   siempre (actívala en el panel de Vercel: Project > Analytics).
 * - Google Analytics 4: usa cookies, así que se carga SOLO si el visitante
 *   las acepta. Con el ID vacío en negocio.js no se carga nunca.
 *
 * Eventos que se miden (sirven para saber qué página trae clientes):
 *   generate_lead     el visitante envía la cotización
 *   contacto_whatsapp toca un botón de WhatsApp
 */

const CLAVE = 'yolt-consentimiento-cookies'
export const EVENTO_CONSENTIMIENTO = 'yolt:consentimiento'

/** 'aceptado' | 'rechazado' | null (aún no decide). */
export function leerConsentimiento() {
  try {
    return localStorage.getItem(CLAVE)
  } catch {
    return null
  }
}

export function guardarConsentimiento(valor) {
  try {
    localStorage.setItem(CLAVE, valor)
  } catch {
    // Sin almacenamiento (modo privado): la decisión dura esta visita.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: valor }))
  if (valor === 'aceptado') cargarGA4()
  else apagarGA4()
}

/** Vuelve a mostrar el aviso de cookies (enlace "Configurar cookies"). */
export function abrirAvisoCookies() {
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: 'preguntar' }))
}

let ga4Cargado = false

function cargarGA4() {
  const id = NEGOCIO.ga4
  if (!id || ga4Cargado) return
  ga4Cargado = true
  window[`ga-disable-${id}`] = false
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // La navegación es de una sola página: las vistas se envían a mano.
  window.gtag('config', id, { send_page_view: false, anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s)
  registrarVista(window.location.pathname)
}

function apagarGA4() {
  if (NEGOCIO.ga4) window[`ga-disable-${NEGOCIO.ga4}`] = true
}

function cargarVercel() {
  if (window.va || import.meta.env.DEV) return
  window.va = function va(...a) {
    ;(window.vaq = window.vaq || []).push(a)
  }
  const s = document.createElement('script')
  s.defer = true
  s.src = '/_vercel/insights/script.js'
  document.head.appendChild(s)
}

/** Se llama una vez al arrancar la aplicación. */
export function iniciarAnalitica() {
  cargarVercel()
  if (leerConsentimiento() === 'aceptado') cargarGA4()
}

/** Vista de página (cada cambio de ruta). */
export function registrarVista(ruta) {
  if (ga4Cargado && window.gtag) {
    window.gtag('event', 'page_view', { page_path: ruta, page_location: window.location.href, page_title: document.title })
  }
}

/** Evento de conversión. */
export function registrarEvento(nombre, datos = {}) {
  if (ga4Cargado && window.gtag) window.gtag('event', nombre, datos)
  if (window.va) window.va('event', { name: nombre, data: datos })
}
