import { motion } from 'motion/react'

/**
 * Filtro por uso. El indicador se desliza al perfil elegido: el
 * movimiento muestra qué cambió, en respuesta a la elección del usuario.
 */
export default function FiltroPerfil({ perfiles, activo, onCambiar }) {
  return (
    <div role="group" aria-label="Filtrar por uso" className="flex flex-wrap gap-2">
      {perfiles.map((p) => {
        const seleccionado = activo === p.id
        return (
          <button
            key={p.id}
            type="button"
            aria-pressed={seleccionado}
            onClick={() => onCambiar(p.id)}
            className={`relative min-h-11 rounded-full px-5 text-[0.95rem] font-medium transition-colors duration-200 ${
              seleccionado ? 'text-papel' : 'text-grafito hover:text-asfalto'
            }`}
          >
            {seleccionado && (
              <motion.span
                layoutId="perfil-activo"
                className="absolute inset-0 rounded-full bg-asfalto"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative">{p.label}</span>
          </button>
        )
      })}
    </div>
  )
}
