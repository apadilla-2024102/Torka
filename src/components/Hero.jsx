import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { DURATION, EASE, maskUp, stagger } from '../lib/motion.js'

const lineas = ['La ciudad', 'cambió de sonido']

const datos = [
  { valor: '120', unidad: 'km', pie: 'de autonomía máxima' },
  { valor: '0.20', unidad: '$/km', pie: 'de costo en energía' },
  { valor: '4', unidad: 'modelos', pie: 'en la gama actual' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: el fondo y la pieza gráfica se mueven a distinta velocidad
  // que el texto. Es lo que da sensación de profundidad al hacer scroll.
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yGrafico = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const opacidad = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-28 pb-16"
    >
      {/* Rejilla técnica de fondo */}
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />

      {/* Halo de color: da vida al fondo sin necesitar una fotografía */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 right-0 h-[70vh] w-[70vh] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(227,16,25,0.30), transparent 70%)' }}
        animate={reduced ? {} : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ opacity: reduced ? 1 : opacidad }}
        className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        {/* ---------- Columna de texto ---------- */}
        <motion.div
          style={{ y: reduced ? 0 : yTexto }}
          variants={stagger(0.2, 0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.outExpo } },
            }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-soft/70 px-4 py-1.5 text-xs font-medium tracking-wide text-mist/80 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Scooters eléctricos · Hecho para México
          </motion.p>

          {/* Revelado con máscara: cada línea sube desde detrás de un borde
              invisible. Cuesta lo mismo que un fundido y se ve mucho mejor. */}
          <h1 className="font-display text-[clamp(2.75rem,8.5vw,5.75rem)] font-bold leading-[0.95] text-mist">
            {lineas.map((linea, i) => (
              <span key={linea} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : maskUp}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  {i === lineas.length - 1 ? (
                    <>
                      {linea}
                      <span className="text-brand-bright">.</span>
                    </>
                  ) : (
                    linea
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.outExpo } },
            }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-mist/65"
          >
            Autonomía que alcanza de verdad, batería que subes a tu casa y te cargas
            en un contacto normal, y un costo por kilómetro que no admite discusión
            frente a la gasolina.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.outExpo } },
            }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#gama"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-mist transition-all duration-300 hover:bg-brand-deep hover:shadow-[0_0_40px_-6px] hover:shadow-brand/50"
            >
              Ver la gama
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#ahorro"
              className="inline-flex items-center gap-2 rounded-full border border-ink-line px-7 py-3.5 font-semibold text-mist transition-colors duration-300 hover:border-mist/40 hover:bg-ink-soft"
            >
              Calcular mi ahorro
            </a>
          </motion.div>

          {/* Datos duros arriba del pliegue: responden "¿por qué te creo?" */}
          <motion.dl
            variants={stagger(0.5, 0.1)}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-line pt-8"
          >
            {datos.map((d) => (
              <motion.div
                key={d.pie}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.outExpo } },
                }}
              >
                <dt className="sr-only">{d.pie}</dt>
                <dd>
                  <span className="tabular font-display text-3xl font-bold text-mist sm:text-4xl">
                    {d.valor}
                  </span>
                  <span className="ml-1 text-sm font-medium text-brand-bright">{d.unidad}</span>
                  <span className="mt-1.5 block text-xs leading-snug text-mist/45">{d.pie}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Columna gráfica ---------- */}
        <motion.div style={{ y: reduced ? 0 : yGrafico }} className="relative">
          <EnergyRing reduced={reduced} />
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity: reduced ? 1 : opacidad }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-ink-line pt-2"
        >
          <span className="h-1.5 w-1 rounded-full bg-brand" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * Composición gráfica del héroe.
 *
 * Mientras no haya fotografía del producto, esta pieza sostiene la mitad
 * derecha: anillos concéntricos que giran a distinta velocidad, sugiriendo
 * carga y movimiento. El hueco central es donde va la foto de la moto.
 */
function EnergyRing({ reduced }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="arcoBrand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff3d45" stopOpacity="1" />
            <stop offset="100%" stopColor="#e31019" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[176, 146, 116].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="#26262c"
            strokeWidth={i === 0 ? 1.5 : 1}
          />
        ))}

        {/* Arcos que giran: dos sentidos opuestos para que nunca se sincronicen */}
        <motion.circle
          cx="200"
          cy="200"
          r="176"
          fill="none"
          stroke="url(#arcoBrand)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="340 766"
          style={{ transformOrigin: '200px 200px' }}
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="146"
          fill="none"
          stroke="url(#arcoBrand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="200 717"
          style={{ transformOrigin: '200px 200px' }}
          animate={reduced ? {} : { rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Hueco para la fotografía del producto */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE.outExpo, delay: 0.4 }}
        className="absolute inset-[22%] flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-line bg-ink-soft/40 text-center backdrop-blur-sm"
      >
        {/* Sustituye este bloque por: <img src="/moto.png" alt="Scooter TORKA Urbana" /> */}
        <svg viewBox="0 0 24 24" className="mb-3 h-9 w-9 text-brand-bright/70" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 3 4 14h7l-1 8 9-11h-7l1-8Z" />
        </svg>
        <p className="px-5 font-display text-sm font-semibold text-mist/70">
          Aquí va la foto de la moto
        </p>
        <p className="mt-1 px-6 text-xs leading-snug text-mist/35">
          PNG con fondo transparente, 1200 px de ancho
        </p>
      </motion.div>
    </div>
  )
}
