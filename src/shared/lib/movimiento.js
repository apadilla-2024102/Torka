/**
 * Sistema de movimiento de TORKA.
 *
 * Todas las curvas y duraciones viven aquí: para cambiar el carácter del
 * movimiento de todo el sitio se toca este archivo, no los componentes.
 *
 * Carácter: una moto eléctrica no ruge, arranca con par inmediato y se
 * desliza. Entradas con arranque rápido y frenado largo (expo out), nada
 * de rebotes de caricatura.
 */
export const CURVA = {
  entrar: [0.22, 1, 0.36, 1], // entradas y hover
  expo: [0.19, 1, 0.22, 1], // revelados dramáticos (titulares, la moto)
  mover: [0.25, 1, 0.5, 1], // desplazamientos en pantalla
}

export const DURACION = {
  rapida: 0.2,
  base: 0.5, // revelados de página de venta: 400-600 ms
  lenta: 0.9,
  escena: 1.3, // la moto entrando a la portada
}

/** Escalonado entre hermanos: ola, no metrónomo. */
export const ESCALON = 0.09

/** Disparo de revelados: cuando el elemento ya entró ~15% en pantalla. */
export const EN_VISTA = { once: true, margin: '0px 0px -15% 0px' }

/** Subida corta con fundido: el revelado estándar. */
export const subir = {
  oculto: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURACION.base, ease: CURVA.entrar } },
}

/** Línea de titular que sube desde detrás de una máscara. */
export const lineaMascara = {
  oculto: { y: '105%' },
  visible: { y: '0%', transition: { duration: DURACION.lenta, ease: CURVA.expo } },
}

/** Contenedor que escalona a sus hijos. */
export const escalonar = (retraso = 0, escalon = ESCALON) => ({
  oculto: {},
  visible: { transition: { delayChildren: retraso, staggerChildren: escalon } },
})
