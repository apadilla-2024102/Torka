import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import TituloSeccion from '../../../shared/components/ui/TituloSeccion.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import { CURVA, EN_VISTA, escalonar, subir } from '../../../shared/lib/movimiento.js'

/** Lo que ofrece el showroom (sistema de marca yolt). */
const SERVICIOS = [
  { nombre: 'Motos', detalle: 'La gama completa en exhibición y lista para prueba.' },
  { nombre: 'Servicio', detalle: 'Taller autorizado para mantenimiento y garantía.' },
  { nombre: 'Repuestos', detalle: 'Inventario local de repuestos.' },
  { nombre: 'Carga', detalle: 'Orientación para instalar la carga en casa o en tu negocio.' },
  { nombre: 'Asesoría', detalle: 'Financiamiento, flotillas y trámite de placas.' },
]

const fila = {
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: CURVA.entrar } },
}

/**
 * Experiencia en el showroom: a la izquierda, los servicios en una lista
 * numerada con filetes; a la derecha, el recorrido en video dentro de un
 * marco vertical (se grabó en vertical: así conserva su nitidez). El
 * video solo corre mientras está en pantalla.
 */
export default function Experiencia() {
  const video = useRef(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    const vigia = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    vigia.observe(v)
    return () => vigia.disconnect()
  }, [])

  return (
    <section aria-labelledby="experiencia-titulo" className="bg-lienzo py-24 text-tinta sm:py-32">
      <Contenedor className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <TituloSeccion id="experiencia-titulo" indice="05" etiqueta="Experiencia yolt">
            Todo lo que necesitas, en un solo lugar
          </TituloSeccion>

          <motion.ol
            initial="oculto"
            whileInView="visible"
            viewport={EN_VISTA}
            variants={escalonar(0.1, 0.08)}
            className="mt-12 border-t border-filete"
          >
            {SERVICIOS.map((s, i) => (
              <motion.li
                key={s.nombre}
                variants={fila}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-filete py-5 sm:grid-cols-[3rem_10rem_1fr]"
              >
                <span className="tipo-tablero text-tinta-suave">{String(i + 1).padStart(2, '0')}</span>
                <span className="tipo-ruta text-3xl transition-colors duration-300 group-hover:text-lima-hondo">{s.nombre}</span>
                <span className="col-start-2 text-tinta-suave sm:col-start-3">{s.detalle}</span>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div initial="oculto" whileInView="visible" viewport={EN_VISTA} variants={subir} className="mt-10">
            <Boton to="/distribuidores" variante="secundario" sobreLienzo>
              Agendar visita
            </Boton>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[2px] border border-filete"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.4, ease: CURVA.expo }}
        >
          <video
            ref={video}
            className="block aspect-[9/16] w-full object-cover"
            poster="/showroom/recorrido-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-label="Recorrido en video por el showroom"
          >
            <source src="/showroom/recorrido.webm" type="video/webm" />
            <source src="/showroom/recorrido.mp4" type="video/mp4" />
          </video>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <p className="tipo-etiqueta absolute bottom-5 left-5 text-tinta/85">Recorrido · Showroom</p>
        </motion.div>
      </Contenedor>
    </section>
  )
}
