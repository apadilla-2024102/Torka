import { useEffect, useState } from 'react'

const CLAVE = 'torka-equipo-lento'

const marcadoLento = () => {
  try {
    return sessionStorage.getItem(CLAVE) === '1'
  } catch {
    return false
  }
}

/**
 * Vigila que un efecto pesado no vuelva lenta la página.
 *
 * Mientras `activo` es verdadero, mide cuadros por segundo durante dos
 * segundos (después de uno de calentamiento). Si el equipo no llega a
 * `minimo`, devuelve `lento = true` y lo recuerda para la sesión: quien
 * tiene una computadora sin aceleración gráfica ve la versión ligera en
 * lugar de una página entrecortada.
 */
export function useFluidez(activo, minimo = 30) {
  const [lento, setLento] = useState(marcadoLento)

  useEffect(() => {
    if (!activo || lento) return
    let marco
    let cuadros = 0
    let inicio = 0
    const t0 = performance.now()

    const contar = (ahora) => {
      const transcurrido = ahora - t0
      if (transcurrido > 1000) {
        if (!inicio) inicio = ahora
        cuadros++
      }
      if (transcurrido < 3000) {
        marco = requestAnimationFrame(contar)
        return
      }
      const fps = (cuadros * 1000) / Math.max(ahora - inicio, 1)
      if (fps < minimo) {
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
