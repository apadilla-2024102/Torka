import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CURVA } from '../../../shared/lib/movimiento.js'

/** Píxeles de arrastre que equivalen a un cuarto de vuelta. */
const PASO_ARRASTRE = 70

/**
 * Giro de 360° con las cuatro fotos reales de la moto.
 *
 * Arrastrar (con mouse o con el dedo), las flechas, las flechas del teclado
 * o las miniaturas giran la moto un cuarto de vuelta. Cada cambio se
 * comprime en horizontal al salir y se expande al entrar, para que se lea
 * como un giro y no como un simple cambio de foto.
 */
export default function GiroVistas({ vistas, titulo }) {
  const [indice, setIndice] = useState(0)
  const [sentido, setSentido] = useState(1)
  const arrastre = useRef(null)
  const total = vistas.length
  const vista = vistas[indice]

  // Las cuatro fotos se piden de una vez: el giro no espera a la red.
  useEffect(() => {
    vistas.forEach((v) => {
      const img = new Image()
      img.src = v.src
    })
  }, [vistas])

  const girar = (paso) => {
    setSentido(paso)
    setIndice((i) => (i + paso + total) % total)
  }
  const irA = (i) => {
    if (i === indice) return
    setSentido(i > indice ? 1 : -1)
    setIndice(i)
  }

  const alPresionar = (e) => {
    arrastre.current = e.clientX
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const alMover = (e) => {
    if (arrastre.current == null) return
    const dx = e.clientX - arrastre.current
    if (Math.abs(dx) >= PASO_ARRASTRE) {
      girar(dx < 0 ? 1 : -1)
      arrastre.current = e.clientX
    }
  }
  const alSoltar = () => {
    arrastre.current = null
  }
  const alTeclear = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      girar(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      girar(-1)
    }
  }

  return (
    <div>
      <div
        role="group"
        aria-roledescription="visor de 360 grados"
        aria-label={`${titulo}: ${vista.label}. Usa las flechas para girar.`}
        tabIndex={0}
        onPointerDown={alPresionar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onKeyDown={alTeclear}
        className="relative aspect-[44/27] w-full cursor-grab touch-pan-y overflow-hidden outline-none select-none focus-visible:ring-2 focus-visible:ring-lima-hondo active:cursor-grabbing"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence initial={false} mode="popLayout" custom={sentido}>
          <motion.img
            key={vista.id}
            src={vista.src}
            alt={`${titulo}, ${vista.label.toLowerCase()}`}
            width="1320"
            height="810"
            draggable={false}
            custom={sentido}
            variants={{
              entra: (s) => ({ opacity: 0, rotateY: s * -35, scaleX: 0.8 }),
              quieta: { opacity: 1, rotateY: 0, scaleX: 1 },
              sale: (s) => ({ opacity: 0, rotateY: s * 35, scaleX: 0.8 }),
            }}
            initial="entra"
            animate="quieta"
            exit="sale"
            transition={{ duration: 0.45, ease: CURVA.expo }}
            className="foto-moto absolute inset-0 h-full w-full object-contain"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => girar(-1)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Girar a la izquierda"
          className="absolute top-1/2 left-0 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-filete bg-lienzo/80 text-tinta backdrop-blur transition-[border-color] duration-[330ms] hover:border-tinta/50"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => girar(1)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Girar a la derecha"
          className="absolute top-1/2 right-0 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-filete bg-lienzo/80 text-tinta backdrop-blur transition-[border-color] duration-[330ms] hover:border-tinta/50"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Miniaturas: cada una lleva a su vista. */}
      <ul className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {vistas.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={() => irA(i)}
              aria-pressed={i === indice}
              className={`group block w-full rounded-[2px] border bg-lienzo p-1.5 text-left transition-[border-color] duration-[330ms] ${
                i === indice ? 'border-tinta' : 'border-filete hover:border-tinta/40'
              }`}
            >
              <img
                src={v.src}
                alt=""
                width="1320"
                height="810"
                loading="lazy"
                decoding="async"
                className="aspect-[44/27] w-full object-contain"
              />
              <span className="mt-1 block truncate text-xs text-tinta-suave">{v.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
