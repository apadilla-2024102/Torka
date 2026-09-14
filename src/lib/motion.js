/**
 * Sistema de animación de TORKA.
 *
 * Todas las variantes viven aquí, no dentro de los componentes. Así se
 * cambia el carácter del movimiento de toda la página desde un solo sitio
 * —y se puede sustituir por otro sistema sin reescribir la interfaz.
 *
 * Carácter elegido para scooters urbanos eléctricos: movimiento fluido y
 * silencioso. Entradas largas con desaceleración marcada, nada de rebotes
 * bruscos. La moto eléctrica no ruge, se desliza; la página hace lo mismo.
 */

// Curvas. expo da la sensación de "llegar sin frenar de golpe".
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
}

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
}

/** Aparición desde abajo. El caballo de batalla de la página. */
export const riseIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.outExpo },
  },
}

/** Aparición con escala — para tarjetas y piezas con peso visual. */
export const scaleIn = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
}

/** Entrada lateral. Dirección configurable. */
export const slideIn = (from = 'left', distance = 40) => ({
  hidden: { opacity: 0, x: from === 'left' ? -distance : distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.base, ease: EASE.outExpo },
  },
})

/**
 * Contenedor que escalona a sus hijos.
 * El escalonado es lo que separa una web animada de una web con animaciones:
 * los elementos llegan en secuencia, no todos a la vez.
 */
export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
})

/** Revelado de texto línea por línea, con máscara. */
export const maskUp = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
}

/** Configuración estándar de disparo por scroll. */
export const inViewOnce = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -80px 0px',
}

/** Respuesta al puntero en elementos interactivos. */
export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: DURATION.fast, ease: EASE.outExpo } },
  tap: { y: -2, scale: 0.99 },
}

/**
 * Devuelve variantes neutralizadas cuando el usuario pidió menos movimiento.
 * Se conserva el fundido —que no marea— y se elimina el desplazamiento.
 */
export function respectMotion(variants, reduced) {
  if (!reduced) return variants
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
  }
}
