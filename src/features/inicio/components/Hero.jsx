import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { BatteryCharging, FileCheck2, KeyRound, Wrench } from 'lucide-react'
import Boton from '../../../shared/components/ui/Boton.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Inclinar from '../../../shared/components/ui/Inclinar.jsx'
import { RUTAS_LOGO } from '../../../shared/components/brand/Logo.jsx'
import { costoRecorrido, REFERENCIA } from '../../../shared/lib/energia.js'
import { CURVA, escalonar, lineaMascara, subir } from '../../../shared/lib/movimiento.js'
import { useIntro } from '../../../shared/components/intro/IntroContexto.jsx'
import { useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'

const LINEAS = ['Enciende', 'tu camino.']

/** Lo que más pesa en la decisión, a la vista desde el primer pantallazo. */
const CONFIANZA = [
  { icono: BatteryCharging, texto: '2 años de garantía en batería' },
  { icono: Wrench, texto: 'Servicio en taller autorizado' },
  { icono: FileCheck2, texto: 'Factura y certificado para placas' },
  { icono: KeyRound, texto: 'Prueba de manejo antes de comprar' },
]

/**
 * Portada formal: lienzo claro, titular en serif y la moto como única
 * protagonista sobre un panel pergamino, con la Y del logotipo como marca
 * de agua.
 *
 * Movimiento sereno: el titular sube por líneas, el panel se descubre como
 * cortina, la moto entra y flota despacio, y con el scroll el panel y la
 * moto se separan en profundidad (paralaje).
 */
export default function Hero({ modeloPortada }) {
  const seccion = useRef(null)
  const reduced = useSinMovimiento()
  // La entrada espera a que se abra la cortina de la pantalla de carga.
  const { lista } = useIntro()
  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end start'] })
  const capaPanel = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const capaMoto = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const capaMarca = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Redondeos que nunca exageran a favor de yolt: la luz hacia arriba, la
  // gasolina hacia abajo.
  const costo = costoRecorrido()
  const qElectrica = Math.ceil(costo.electrica)
  const qGasolina = Math.floor(costo.gasolina)

  return (
    <section ref={seccion} className="relative isolate overflow-hidden bg-lienzo text-tinta">
      <Contenedor className="relative grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <motion.div initial="oculto" animate={lista ? 'visible' : 'oculto'} variants={escalonar(0, 0.12)}>
          <motion.p variants={subir} className="tipo-etiqueta flex items-center gap-3 text-tinta-suave">
            <span aria-hidden="true" className="block h-px w-10 bg-lima-hondo" />
            Movilidad eléctrica · Guatemala
          </motion.p>
          <h1 className="tipo-ruta mt-7 text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.92]">
            {LINEAS.map((linea) => (
              <span key={linea} className="block overflow-hidden pb-[0.1em]">
                <motion.span variants={lineaMascara} className="block">
                  {linea}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p variants={subir} className="tipo-ruta mt-3 text-[clamp(1.6rem,3vw,2.4rem)] text-tinta-suave italic">
            Menos gasto. Más vida.
          </motion.p>
          <motion.p variants={subir} className="mt-8 max-w-md text-base leading-relaxed text-tinta-suave sm:text-lg">
            Una carga completa de la {REFERENCIA.modelo} cuesta unos Q{qElectrica} de luz y rinde {REFERENCIA.km} km; la
            misma distancia en gasolina, unos Q{qGasolina}. Frenos de disco y mantenimiento mínimo.
          </motion.p>
          <motion.div variants={subir} className="mt-10 flex flex-wrap items-center gap-3">
            <Boton to="/cotizar">Solicitar cotización</Boton>
          </motion.div>
        </motion.div>

        {modeloPortada && (
          <div className="relative">
            {/* Panel pergamino: se descubre de abajo hacia arriba. */}
            <motion.div
              aria-hidden="true"
              style={reduced ? undefined : { y: capaPanel }}
              initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={lista ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
              transition={{ duration: 1.4, ease: CURVA.expo, delay: 0.2 }}
              className="absolute inset-x-[4%] top-[6%] bottom-[2%] overflow-hidden bg-lienzo-alto"
            >
              <motion.img
                src={RUTAS_LOGO.isotipo}
                alt=""
                width="851"
                height="535"
                style={reduced ? undefined : { y: capaMarca }}
                className="absolute -right-[12%] -bottom-[6%] w-[90%] opacity-[0.07] grayscale"
              />
            </motion.div>

            <motion.div style={reduced ? undefined : { y: capaMoto }} className="relative">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: 60 }}
                animate={lista ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 1.2, ease: CURVA.expo, delay: 0.55 }}
              >
                {/* Flotación lenta: el producto nunca queda del todo quieto. */}
                <motion.div
                  animate={reduced ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                >
                  <Inclinar grados={6}>
                    <ModeloImagen
                      modelo={modeloPortada}
                      transicion={false}
                      prioridad
                      ajustada
                      destello
                      className="aspect-[44/27] w-full"
                    />
                  </Inclinar>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={lista ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="tipo-etiqueta relative mt-2 flex justify-between px-[6%] text-tinta-suave"
            >
              <span>yolt {modeloPortada.nombre}</span>
              <span>{modeloPortada.tagline}</span>
            </motion.p>
          </div>
        )}
      </Contenedor>

      {/* Franja de confianza: garantías y trámites. */}
      <div className="border-t border-filete bg-lienzo">
        <Contenedor as="ul" className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:grid-cols-4">
          {CONFIANZA.map(({ icono: Icono, texto }) => (
            <li key={texto} className="flex items-center gap-3 text-sm text-tinta-suave">
              <Icono className="h-5 w-5 shrink-0 text-lima-hondo" strokeWidth={1.5} aria-hidden="true" />
              {texto}
            </li>
          ))}
        </Contenedor>
      </div>
    </section>
  )
}
