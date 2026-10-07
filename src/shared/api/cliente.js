/**
 * Cliente HTTP común.
 *
 * Sin VITE_API_URL el sitio funciona solo con los datos de ejemplo de
 * mockData.js: no intenta ninguna petición. Cuando exista un backend,
 * define VITE_API_URL en .env y cada función pedirá sus datos reales;
 * si el servidor no responde, vuelve a los datos de ejemplo para que la
 * página nunca quede en blanco.
 */
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || ''

export const obtener = async (ruta, respaldo) => {
  if (!BASE_URL) return respaldo

  try {
    const response = await fetch(`${BASE_URL}${ruta}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const body = await response.json()
    return body.data ?? body
  } catch (error) {
    console.warn(`API no disponible en ${ruta}, usando datos de ejemplo:`, error.message)
    return respaldo
  }
}
