import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Inclinar from '../../../shared/components/ui/Inclinar.jsx'
import Lectura from '../../../shared/components/ui/Lectura.jsx'
import { precioModelo } from '../../../shared/lib/formato.js'

/**
 * Tarjeta del catálogo. Toda la tarjeta es un enlace a la ficha; la moto
 * viaja de aquí a la ficha con la transición de vista.
 *
 * Recibe `ref` como prop (React 19) porque AnimatePresence en modo
 * popLayout necesita medir el elemento al retirarlo.
 */
export default function ModeloCard({ modelo, ref }) {
  const { id, nombre, perfilLabel, tagline, precio, destacado, specs, colores } = modelo

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 38 }}
    >
      {/* Con mouse, la tarjeta se inclina hacia el cursor con un reflejo de luz. */}
      <Inclinar grados={6} brillo className="h-full">
        <Link
          to={`/modelos/${id}`}
          viewTransition
          data-cursor="Ver"
          className="group flex h-full flex-col overflow-hidden rounded-[2px] border border-filete bg-superficie transition-[border-color] duration-[330ms] hover:border-tinta/40"
        >
          <div className="relative bg-lienzo px-6 pt-10 pb-4">
            {destacado && (
              <span className="tipo-etiqueta absolute top-4 left-4 bg-lima px-3 py-1 text-lienzo">
                {destacado}
              </span>
            )}
            {/* Al pasar el cursor la moto rueda un poco hacia adelante. */}
            <div className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
              <ModeloImagen modelo={modelo} ajustada className="mx-auto aspect-[4/3] w-full max-w-[320px]" />
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="tipo-ruta text-3xl">{nombre}</h2>
              <span className="text-tinta-suave">{perfilLabel}</span>
            </div>
            <p className="mt-2 text-tinta-suave">{tagline}</p>

            <dl className="mt-6 grid grid-cols-3 gap-3">
              <Lectura etiqueta="Autonomía" valor={specs.autonomia} unidad="km" energia />
              <Lectura etiqueta="Velocidad" valor={specs.velocidad} unidad="km/h" />
              <Lectura etiqueta="Carga" valor={specs.carga} unidad="h" energia />
            </dl>

            <div className="mt-auto flex items-end justify-between gap-4 pt-7">
              <div>
                <span className="tipo-etiqueta block text-tinta-suave">Precio</span>
                <span className="tipo-tablero text-2xl">{precioModelo(modelo)}</span>
              </div>
              <div className="flex gap-1.5" aria-label={colores.length === 1 ? `Color: ${colores[0].nombre}` : `${colores.length} colores disponibles`}>
                {colores.map((c) => (
                  <span
                    key={c.id}
                    title={c.nombre}
                    className="h-5 w-5 rounded-full ring-1 ring-tinta/30"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
      </Inclinar>
    </motion.li>
  )
}
