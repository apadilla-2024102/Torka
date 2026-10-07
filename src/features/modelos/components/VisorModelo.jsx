import { lazy, Suspense, useState } from 'react'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import { hayWebGL } from '../../../shared/components/brand/moto3d/webgl.js'
import Decorado from '../../../shared/components/ui/Decorado.jsx'

// Three.js pesa: solo se descarga al abrir una ficha, nunca en la portada.
const Moto3D = lazy(() => import('../../../shared/components/brand/moto3d/Moto3D.jsx'))

/**
 * Imagen principal de la ficha.
 *
 * Muestra primero el render (llega al instante y es el que viaja desde la
 * tarjeta en la transición de página). Si el navegador dibuja WebGL, monta
 * encima el visor 3D y, cuando el primer cuadro está listo, el render se
 * retira. Sin WebGL, el render se queda: nadie ve un hueco.
 */
export default function VisorModelo({ modelo, colorId }) {
  const [con3D] = useState(hayWebGL)
  const [listo, setListo] = useState(false)
  const color = modelo.colores.find((c) => c.id === colorId) ?? modelo.colores[0]

  return (
    <figure>
      <div className="relative aspect-[44/27] w-full">
        <ModeloImagen
          modelo={modelo}
          colorId={color.id}
          prioridad
          className={`h-full w-full transition-opacity duration-300 ${listo ? 'opacity-0' : 'opacity-100'}`}
        />
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
      <figcaption className={`text-sm text-niebla ${con3D ? 'mt-[4.25rem]' : 'mt-4'}`}>
        {con3D ? 'Arrastra la moto para verla desde cualquier lado. ' : ''}
        Imagen generada por computadora; el acabado real puede variar.
      </figcaption>
    </figure>
  )
}
