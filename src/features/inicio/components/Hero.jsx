import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { BatteryCharging, FileCheck2, KeyRound, Wrench } from 'lucide-react'
import Boton from '../../../shared/components/ui/Boton.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Magnet from '../../../shared/components/reactbits/Magnet/Magnet.jsx'
import ClickSpark from '../../../shared/components/reactbits/ClickSpark/ClickSpark.jsx'
import { formatoNumero, formatoQuetzales } from '../../../shared/lib/formato.js'
import { kmPorMonto } from '../../../shared/lib/energia.js'
import { escalonar, lineaMascara, subir } from '../../../shared/lib/movimiento.js'
import FondoAutopista from './FondoAutopista.jsx'
import { useIntro } from '../../../shared/components/intro/IntroContexto.jsx'

const LINEAS = ['Deja la gasolinera', 'en el retrovisor.']

/** Lo que más pesa en la decisión, a la vista desde el primer pantallazo. */
const CONFIANZA = [
  { icono: BatteryCharging, texto: '3 años de garantía en batería' },
  { icono: Wrench, texto: 'Repuestos garantizados por 7 años' },
  { icono: FileCheck2, texto: 'Factura y certificado para placas' },
  { icono: KeyRound, texto: 'Prueba de manejo antes de comprar' },
]

/**
 * Portada cinematográfica, por capas de profundidad (skill epic-design):
 *
 *   capa 0  autopista nocturna (React Bits · Hyperspeed)
 *   capa 1  sombra que asegura la lectura del texto
 *   capa 2  "TORKA" gigante en contorno, se mueve más lento al hacer scroll
 *   capa 3  la moto: entra rodando, flota y se adelanta con el scroll
 *   capa 4  titular, texto y botones
 *   capa 5  pista "mantén presionado para acelerar" (solo escritorio)
 *
 * El texto deja pasar el puntero (pointer-events-none) para que mantener
 * presionado en cualquier punto vacío acelere la autopista; los botones
 * sí lo reciben.
 */
export default function Hero({ precioDesde, totalModelos, modeloPortada }) {
  const seccion = useRef(null)
  const reduced = useReducedMotion()
  // La entrada espera a que se abra la cortina de la pantalla de carga.
  const { lista } = useIntro()
  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end start'] })
  const capaLetras = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const capaMoto = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const escalaMoto = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const desvanecer = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const km = kmPorMonto(100)
  // Redondeos que nunca exageran a favor de TORKA: lo eléctrico hacia abajo
  // a la centena, lo de gasolina a la decena más cercana.
  const kmElectrica = formatoNumero(Math.floor(km.electrica / 100) * 100)
  const kmGasolina = formatoNumero(Math.round(km.gasolina / 10) * 10)

  return (
    <section ref={seccion} className="relative isolate overflow-hidden bg-black text-papel">
      <ClickSpark sparkColor="#f2c230" sparkSize={12} sparkRadius={22} sparkCount={10} duration={450}>
        {/* capa 0 */}
        <div className="absolute inset-0 -z-10" data-cursor="Acelera">
          <FondoAutopista />
        </div>
        {/* capa 1 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0)_75%),linear-gradient(0deg,#1f2024_0%,rgba(31,32,36,0)_30%)]"
        />
        {/* capa 2 */}
        <motion.p
          aria-hidden="true"
          style={reduced ? undefined : { y: capaLetras }}
          className="tipo-ruta pointer-events-none absolute right-[-2vw] bottom-[9%] -z-10 text-[clamp(6rem,24vw,22rem)] leading-none text-transparent select-none [-webkit-text-stroke:1.5px_rgba(246,246,243,0.16)]"
        >
          TORKA
        </motion.p>

        <Contenedor className="pointer-events-none relative flex min-h-[100svh] flex-col justify-center pt-28 pb-10 lg:min-h-[calc(100svh-5.25rem)]">
          <motion.div
            initial="oculto"
            animate={lista ? 'visible' : 'oculto'}
            variants={escalonar(0, 0.12)}
            style={reduced ? undefined : { opacity: desvanecer }}
            className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]"
          >
            {/* capa 4 */}
            <div>
              <motion.span variants={subir} aria-hidden="true" className="franja-marca mb-7 block h-1 w-24" />
              <h1 className="tipo-ruta text-[clamp(2.6rem,7vw,5.5rem)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
                {LINEAS.map((linea) => (
                  <span key={linea} className="block overflow-hidden pb-[0.08em]">
                    <motion.span variants={lineaMascara} className="block">
                      {linea}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p variants={subir} className="mt-6 max-w-lg text-lg text-papel/80 sm:text-xl">
                Con Q100 de luz recorres más de {kmElectrica} km; con gasolina, unos{' '}
                {kmGasolina}. Batería que subes a tu casa y cero afinaciones. {totalModelos} modelos desde{' '}
                {formatoQuetzales(precioDesde)}.
              </motion.p>
              <motion.div variants={subir} className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3">
                <Magnet padding={60} magnetStrength={4} disabled={reduced}>
                  <Boton to="/modelos" className="shadow-[0_0_40px_-8px_rgba(227,16,25,0.8)]">
                    Ver los modelos
                  </Boton>
                </Magnet>
                <Boton to="/cotizar" variante="secundario" sobreOscuro className="bg-black/30 backdrop-blur">
                  Agendar prueba de manejo
                </Boton>
              </motion.div>
            </div>

            {/* capa 3 */}
            {modeloPortada && (
              <motion.div
                style={reduced ? undefined : { y: capaMoto, scale: escalaMoto }}
                className="relative lg:-mr-12"
              >
                <motion.div
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: '-55%' }}
                  animate={lista ? { opacity: 1, x: '0%' } : undefined}
                  transition={
                    reduced
                      ? { duration: 0.3 }
                      : {
                          x: { type: 'spring', stiffness: 70, damping: 15, delay: 0.3 },
                          opacity: { duration: 0.35, delay: 0.3 },
                        }
                  }
                >
                  {/* Flotación lenta: el producto nunca queda del todo quieto. */}
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                  >
                    <ModeloImagen
                      modelo={modeloPortada}
                      transicion={false}
                      prioridad
                      className="aspect-[44/27] w-full drop-shadow-[0_40px_50px_rgba(227,16,25,0.25)]"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* capa 5 */}
          <p className="mt-6 hidden text-sm text-papel/50 [@media(pointer:fine)]:block" aria-hidden="true">
            Mantén presionado el fondo para acelerar.
          </p>
        </Contenedor>
      </ClickSpark>

      {/* Franja de confianza: garantías y trámites, junto a los botones. */}
      <div className="relative border-t border-white/10 bg-asfalto/80 backdrop-blur">
        <Contenedor as="ul" className="grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
          {CONFIANZA.map(({ icono: Icono, texto }) => (
            <li key={texto} className="flex items-center gap-3 text-sm text-papel/85 sm:text-base">
              <Icono className="h-5 w-5 shrink-0 text-senal" aria-hidden="true" />
              {texto}
            </li>
          ))}
        </Contenedor>
      </div>
    </section>
  )
}
