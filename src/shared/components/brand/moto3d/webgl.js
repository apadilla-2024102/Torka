/**
 * ¿El navegador puede dibujar WebGL? Si no, la ficha se queda con el
 * render o la silueta.
 *
 * Vive aparte de estudio.js a propósito: importarlo NO descarga Three.js.
 */
export function hayWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
