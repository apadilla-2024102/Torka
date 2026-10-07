import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Lectura from '../../../shared/components/ui/Lectura.jsx'
import { formatoQuetzales } from '../../../shared/lib/formato.js'

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
      <Link
        to={`/modelos/${id}`}
        viewTransition
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-concreto bg-white transition-[border-color] duration-200 hover:border-asfalto/40"
      >
        <div className="relative bg-concreto/60 px-6 pt-10 pb-4">
          {destacado && (
            <span className="absolute top-4 left-4 rounded-full bg-asfalto px-3 py-1 text-sm font-medium text-papel">
              {destacado}
            </span>
          )}
          <ModeloImagen modelo={modelo} className="mx-auto aspect-[44/27] w-full max-w-[320px]" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="tipo-ruta text-3xl">{nombre}</h2>
            <span className="text-grafito">{perfilLabel}</span>
          </div>
          <p className="mt-2 text-grafito">{tagline}</p>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            <Lectura etiqueta="Autonomía" valor={specs.autonomia} unidad="km" energia />
            <Lectura etiqueta="Velocidad" valor={specs.velocidad} unidad="km/h" />
            <Lectura etiqueta="Carga" valor={specs.carga} unidad="h" energia />
          </dl>

          <div className="mt-auto flex items-end justify-between gap-4 pt-7">
            <div>
              <span className="block text-sm text-grafito">Precio</span>
              <span className="tipo-tablero text-2xl">{formatoQuetzales(precio)}</span>
            </div>
            <div className="flex gap-1.5" aria-label={`${colores.length} colores disponibles`}>
              {colores.map((c) => (
                <span
                  key={c.id}
                  title={c.nombre}
                  className="h-5 w-5 rounded-full ring-1 ring-asfalto/20"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}
