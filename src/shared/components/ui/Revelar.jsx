import { motion } from 'motion/react'
import { EN_VISTA, escalonar, subir } from '../../lib/movimiento.js'

/**
 * Revelado al entrar en pantalla, una sola vez.
 *
 *   <Revelar>…</Revelar>                    un bloque que sube y aparece
 *   <Revelar grupo as="ul">                 un contenedor que escalona…
 *     <Revelar.Item as="li">…</Revelar.Item> …a sus hijos, como una ola
 *
 * Regla: una sola entrada por contenedor. Si el grupo escalona a sus
 * hijos, el grupo en sí no se mueve.
 *
 * Si el sitio obedece "reducir movimiento" (shared/hooks/useMovimiento.js),
 * MotionConfig (app/App.jsx) quita el
 * desplazamiento y deja solo el cambio de opacidad.
 */
export default function Revelar({ as = 'div', grupo = false, retraso = 0, escalon, className, children, ...props }) {
  const Etiqueta = motion[as]
  return (
    <Etiqueta
      initial="oculto"
      whileInView="visible"
      viewport={EN_VISTA}
      variants={grupo ? escalonar(retraso, escalon) : conRetraso(subir, retraso)}
      className={className}
      {...props}
    >
      {children}
    </Etiqueta>
  )
}

function Item({ as = 'div', variantes = subir, className, children, ...props }) {
  const Etiqueta = motion[as]
  return (
    <Etiqueta variants={variantes} className={className} {...props}>
      {children}
    </Etiqueta>
  )
}

Revelar.Item = Item

const conRetraso = (variantes, retraso) =>
  retraso
    ? {
        ...variantes,
        visible: { ...variantes.visible, transition: { ...variantes.visible.transition, delay: retraso } },
      }
    : variantes
