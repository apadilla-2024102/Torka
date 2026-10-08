import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import { hayWebGL } from '../../../shared/components/brand/moto3d/webgl.js'
import Decorado from '../../../shared/components/ui/Decorado.jsx'
import Inclinar from '../../../shared/components/ui/Inclinar.jsx'
import { CURVA } from '../../../shared/lib/movimiento.js'

// Three.js pesa: solo se descarga al abrir una ficha, nunca en la portada.
const Moto3D = lazy(() => import('../../../shared/components/brand/moto3d/Moto3D.jsx'))

/**
 * Imagen principal de la ficha.
 *
 * Muestra primero el render (llega al instante y es el que viaja desde la
 * tarjeta en la transición de página). Si el navegador dibuja WebGL, monta
 * encima el visor 3D y, cuando el primer cuadro está listo, el render se
 * retira. Sin WebGL, el render se queda: nadie ve un hueco.
 *
 * Si el color tiene foto real, se muestra la foto y no se monta el 3D: el
 * modelo 3D es genérico y no se parece a la moto que se vende.
 */
export default function VisorModelo({ modelo, colorId }) {
  const [webgl] = useState(hayWebGL)
  const [listo, setListo] = useState(false)
  const color = modelo.colores.find((c) => c.id === colorId) ?? modelo.colores[0]
  const conFoto = Boolean(modelo.fotos?.[color.id])
  const con3D = webgl && !conFoto

  return (
    <figure>
      <div className={`relative aspect-[44/27] w-full ${conFoto ? 'overflow-hidden' : ''}`}>
        {conFoto ? (
          // Al cambiar de color, la moto nueva entra rodando desde la derecha
          // y la anterior sale por la izquierda, desenfocadas por la velocidad.
          <Inclinar grados={6} className="relative h-full w-full">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={color.id}
                className="h-full w-full"
                initial={{ opacity: 0, x: 60, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -60, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: CURVA.expo }}
              >
                <ModeloImagen modelo={modelo} colorId={color.id} prioridad destello className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </Inclinar>
        ) : (
          <ModeloImagen
            modelo={modelo}
            colorId={color.id}
            prioridad
            className={`h-full w-full transition-opacity duration-300 ${listo ? 'opacity-0' : 'opacity-100'}`}
          />
        )}
        {con3D && (
          <Decorado>
            <Suspense fallback={null}>
              <div className={`transition-opacity duration-300 ${listo ? 'opacity-100' : 'opacity-0'}`}>
                <Moto3D modelo={modelo} colorHex={color.hex} onListo={() => setListo(true)} />
              </div>
            </Suspense>
          </Decorado>
        )}
      </div>
      {/* Con 3D, los botones de giro ocupan la franja de abajo: el texto va después. */}
      <figcaption className={`text-sm text-tinta-suave ${con3D ? 'mt-[4.25rem]' : 'mt-4'}`}>
        {conFoto
          ? 'Fotografía de la unidad en showroom.'
          : `${con3D ? 'Arrastra la moto para verla desde cualquier lado. ' : ''}Imagen generada por computadora; el acabado real puede variar.`}
      </figcaption>
    </figure>
  )
}
