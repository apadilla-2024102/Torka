import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import { enlaceWhatsApp } from '../../../shared/config/negocio.js'
import { EN_VISTA, escalonar, lineaMascara, subir } from '../../../shared/lib/movimiento.js'

/**
 * Cierre de la portada: una tarjeta sobria sobre un resplandor lima que se
 * desplaza despacio. Una línea de luz recorre el borde de la tarjeta: es
 * el único elemento de la portada con ese borde, así se reconoce como el
 * destino. El titular sube por líneas al entrar en pantalla.
 */
export default function LlamadoFinal() {
  // La línea del borde gira solo con la tarjeta en pantalla.
  const tarjeta = useRef(null)
  const enVista = useInView(tarjeta, { margin: '100px 0px' })

  return (
    <section className="relative isolate overflow-hidden bg-tinta py-28 text-lienzo-alto sm:py-36">
      <div aria-hidden="true" className="resplandor-lento absolute inset-[-20%] -z-10" />

      <Contenedor>
        <motion.div
          ref={tarjeta}
          initial="oculto"
          whileInView="visible"
          viewport={EN_VISTA}
          variants={escalonar(0, 0.12)}
          className={`borde-vivo relative rounded-[4px] ${enVista ? '' : 'borde-vivo-pausa'}`}
        >
          <div className="relative rounded-[3px] bg-tinta/90 p-8 backdrop-blur sm:p-14">
            <motion.p variants={subir} className="tipo-etiqueta text-lima">
              Prueba de manejo
            </motion.p>
            <h2 className="tipo-ruta mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.2rem)]">
              {['Agenda tu prueba', 'de manejo.'].map((linea) => (
                <span key={linea} className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={lineaMascara} className="block">
                    {linea}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p variants={subir} className="mt-6 max-w-xl text-lg text-tinta-inversa-suave">
              Conoce la gama yolt en persona. Un asesor te acompaña en la prueba y te presenta las opciones de pago y
              financiamiento disponibles.
            </motion.p>
            <motion.div variants={subir} className="mt-10 flex flex-wrap gap-3">
              <Boton to="/cotizar" sobreLienzo={false}>
                Solicitar cotización
              </Boton>
              <Boton
                href={enlaceWhatsApp('Hola, quiero agendar una prueba de manejo de yolt.')}
                target="_blank"
                rel="noopener noreferrer"
                variante="secundario"
                sobreLienzo={false}
              >
                Escribir por WhatsApp
              </Boton>
            </motion.div>
          </div>
        </motion.div>
      </Contenedor>
    </section>
  )
}
