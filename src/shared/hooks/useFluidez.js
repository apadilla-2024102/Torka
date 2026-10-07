import { useEffect, useState } from 'react'

const CLAVE = 'yolt-equipo-lento'

const marcadoLento = () => {
  try {
    return sessionStorage.getItem(CLAVE) === '1'
  } catch {
    return false
  }
}

const CALENTAMIENTO_MS = 2500 // compilar sombreadores en Windows tarda: no cuenta
const VENTANA_MS = 2000

/**
 * Vigila que un efecto pesado no vuelva lenta la página.
 *
 * Mientras `activo` es verdadero, mide cuadros por segundo en ventanas de
 * dos segundos durante todo el tiempo que el efecto está montado (no solo
 * al inicio). Si dos ventanas seguidas quedan bajo `minimo`, devuelve
 * `lento = true` y lo recuerda para la sesión: quien tiene una computadora
 * sin aceleración gráfica ve la versión ligera en lugar de una página
 * entrecortada. Las ventanas con la pestaña oculta no cuentan.
 */
export function useFluidez(activo, minimo = 30) {
  const [lento, setLento] = useState(marcadoLento)

  useEffect(() => {
    if (!activo || lento) return
    let marco
    let cuadros = 0
    let inicioVentana = performance.now() + CALENTAMIENTO_MS
    let bajas = 0

    const contar = (ahora) => {
      marco = requestAnimationFrame(contar)
      if (document.hidden) {
        cuadros = 0
        inicioVentana = ahora + 500
        return
      }
      if (ahora < inicioVentana) return
      cuadros++
      const transcurrido = ahora - inicioVentana
      if (transcurrido < VENTANA_MS) return

      const fps = (cuadros * 1000) / transcurrido
      bajas = fps < minimo ? bajas + 1 : 0
      cuadros = 0
      inicioVentana = ahora
      if (bajas >= 2) {
        cancelAnimationFrame(marco)
        try {
          sessionStorage.setItem(CLAVE, '1')
        } catch {
          // Sin almacenamiento: se vuelve a medir en la siguiente carga.
        }
        setLento(true)
      }
    }
    marco = requestAnimationFrame(contar)
    return () => cancelAnimationFrame(marco)
  }, [activo, lento, minimo])

  return lento
}
