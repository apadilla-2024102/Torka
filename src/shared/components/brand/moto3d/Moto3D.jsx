import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { RotateCcw, RotateCw } from 'lucide-react'
import * as THREE from 'three'
import { crearEstudio, VISTA_CATALOGO } from './estudio.js'

const PASO_GIRO = Math.PI / 4
const SUAVE = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Visor 3D de la ficha de modelo.
 *
 * - Se gira arrastrando en horizontal (en celular el gesto vertical sigue
 *   haciendo scroll), con los botones o con las flechas del teclado.
 * - Dibuja solo cuando algo cambia: sin bucle continuo, no gasta batería.
 * - El color cambia con una transición corta, como respuesta a la elección.
 * - Al cargar da un cuarto de vuelta hasta la vista de catálogo: el único
 *   movimiento que no inicia el usuario, y se omite con "reducir movimiento".
 *
 * Se carga de forma perezosa: Three.js solo se descarga en esta página.
 */
export default function Moto3D({ modelo, colorHex, onListo }) {
  const lienzo = useRef(null)
  const estudio = useRef(null)
  const azimut = useRef(VISTA_CATALOGO.azimut)
  const animacion = useRef(0)
  const reduced = useReducedMotion()
  const [arrastrando, setArrastrando] = useState(false)

  const dibujar = () => {
    const e = estudio.current
    if (!e) return
    e.orbitar(azimut.current, VISTA_CATALOGO.elevacion)
    e.render()
  }

  /** Anima un valor de 0 a 1 en `ms` y llama a `paso` en cada cuadro. */
  const animar = (ms, paso) => {
    cancelAnimationFrame(animacion.current)
    if (reduced) {
      paso(1)
      dibujar()
      return
    }
    const inicio = performance.now()
    const cuadro = (ahora) => {
      const t = Math.min((ahora - inicio) / ms, 1)
      paso(SUAVE(t))
      dibujar()
      if (t < 1) animacion.current = requestAnimationFrame(cuadro)
    }
    animacion.current = requestAnimationFrame(cuadro)
  }

  const girarA = (destino, ms = 450) => {
    const desde = azimut.current
    animar(ms, (t) => {
      azimut.current = desde + (destino - desde) * t
    })
  }

  // Monta el estudio una sola vez.
  useEffect(() => {
    const canvas = lienzo.current
    const e = crearEstudio(canvas)
    estudio.current = e

    const ajustar = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (width && height) {
        e.ajustarTamano(width, height)
        dibujar()
      }
    }
    const observador = new ResizeObserver(ajustar)
    observador.observe(canvas)

    return () => {
      cancelAnimationFrame(animacion.current)
      observador.disconnect()
      e.destruir()
      estudio.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cambiar de modelo reconstruye la moto (el router reutiliza esta página).
  useEffect(() => {
    const e = estudio.current
    if (!e) return
    e.ponerMoto(modelo.ilustracion, colorHex)
    azimut.current = reduced ? VISTA_CATALOGO.azimut : VISTA_CATALOGO.azimut + Math.PI / 2
    dibujar()
    onListo?.()
    girarA(VISTA_CATALOGO.azimut, 1200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelo.id])

  // Cambiar de color mezcla la pintura actual hacia la nueva.
  useEffect(() => {
    const pintura = estudio.current?.materiales?.pintura
    if (!pintura) return
    const desde = pintura.color.clone()
    const hacia = new THREE.Color(colorHex)
    if (desde.equals(hacia)) return
    animar(320, (t) => pintura.color.copy(desde).lerp(hacia, t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorHex])

  // --- Arrastre horizontal ---
  const inicioX = useRef(0)
  const azimutInicio = useRef(0)

  const alPresionar = (e) => {
    cancelAnimationFrame(animacion.current)
    e.currentTarget.setPointerCapture(e.pointerId)
    inicioX.current = e.clientX
    azimutInicio.current = azimut.current
    setArrastrando(true)
  }
  const alMover = (e) => {
    if (!arrastrando) return
    const ancho = e.currentTarget.clientWidth || 1
    azimut.current = azimutInicio.current - ((e.clientX - inicioX.current) / ancho) * Math.PI * 1.6
    dibujar()
  }
  const alSoltar = () => setArrastrando(false)

  const alTeclado = (e) => {
    if (e.key === 'ArrowLeft') girarA(azimut.current + PASO_GIRO)
    else if (e.key === 'ArrowRight') girarA(azimut.current - PASO_GIRO)
    else return
    e.preventDefault()
  }

  return (
    <div className="absolute inset-0">
      <canvas
        ref={lienzo}
        tabIndex={0}
        data-cursor="Arrastra"
        role="img"
        aria-label={`Vista 3D de la TORKA ${modelo.nombre}. Usa las flechas izquierda y derecha para girarla.`}
        onPointerDown={alPresionar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onKeyDown={alTeclado}
        className={`h-full w-full touch-pan-y select-none ${arrastrando ? 'cursor-grabbing' : 'cursor-grab'}`}
      />
      {/* Los controles van debajo de la imagen, no encima de la moto. */}
      <div className="absolute top-full right-0 mt-3 flex gap-2">
        <BotonGiro etiqueta="Girar a la izquierda" onClick={() => girarA(azimut.current + PASO_GIRO)}>
          <RotateCcw size={18} aria-hidden="true" />
        </BotonGiro>
        <BotonGiro etiqueta="Volver a la vista de perfil" onClick={() => girarA(VISTA_CATALOGO.azimut)}>
          <span className="px-1 text-sm font-semibold">Perfil</span>
        </BotonGiro>
        <BotonGiro etiqueta="Girar a la derecha" onClick={() => girarA(azimut.current - PASO_GIRO)}>
          <RotateCw size={18} aria-hidden="true" />
        </BotonGiro>
      </div>
    </div>
  )
}

function BotonGiro({ etiqueta, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={etiqueta}
      title={etiqueta}
      className="flex h-11 min-w-11 items-center justify-center border border-papel/40 bg-negro/80 px-2 text-papel backdrop-blur transition-[background-color,border-color] duration-150 hover:border-niebla hover:bg-asfalto active:scale-95"
    >
      {children}
    </button>
  )
}
