import { useReducedMotion } from 'motion/react'

/**
 * ¿El sitio obedece la preferencia "reducir movimiento" del sistema?
 *
 * Windows la activa al apagar "Efectos de animación", algo muy común en
 * computadoras de oficina o en modo de máximo rendimiento, muchas veces
 * sin que la persona lo haya elegido. Obedecerla dejaba la página quieta
 * y vacía para buena parte de los visitantes, así que por decisión del
 * negocio el sitio se anima para todos.
 *
 * Con `false`, quien tiene la preferencia activa ve todas las animaciones,
 * pero los dos efectos más intensos (la autopista y los rayos) corren más
 * lentos y sin aceleración (ver `usePrefiereSuave`).
 *
 * Para volver a obedecerla por completo, cambia a `true`.
 */
export const RESPETAR_MENOS_MOVIMIENTO = false

const pideMenosMovimiento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fuera de React (GSAP, Lenis): ¿se apagan las animaciones? */
export const sinMovimiento = () => RESPETAR_MENOS_MOVIMIENTO && pideMenosMovimiento()

/** En componentes: ¿se apagan las animaciones? */
export function useSinMovimiento() {
  const pide = useReducedMotion()
  return RESPETAR_MENOS_MOVIMIENTO && Boolean(pide)
}

/** ¿La persona pidió menos movimiento? Para suavizar, no para apagar. */
export function usePrefiereSuave() {
  return Boolean(useReducedMotion())
}
