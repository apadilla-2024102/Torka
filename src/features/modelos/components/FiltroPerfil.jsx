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
            className={`tipo-etiqueta relative min-h-11 px-5 transition-colors duration-[330ms] ${
              seleccionado ? 'text-negro' : 'text-niebla hover:text-papel'
            }`}
          >
            {seleccionado && (
              <motion.span
                layoutId="perfil-activo"
                className="absolute inset-0 bg-papel"
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
