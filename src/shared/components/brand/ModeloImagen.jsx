import { useState } from 'react'
import MotoSilueta from './MotoSilueta.jsx'

/** Ruta del render generado con `npm run renders` para un modelo y color. */
export const rutaRender = (modeloId, colorId) => `/modelos/renders/${modeloId}-${colorId}.webp`

/**
 * Imagen de un modelo en un color, con tres niveles de respaldo:
 *
 *   1. Foto real, si el modelo la tiene (campo `fotos` en mockData.js).
 *   2. Render 3D generado (public/modelos/renders/<modelo>-<color>.webp).
 *   3. Silueta vectorial, si ninguno de los archivos carga.
 *
 * Así subir o quitar imágenes nunca deja un icono roto.
 *
 * `viewTransitionName` hace que la moto viaje de la tarjeta a su ficha
 * cuando el usuario navega entre ellas.
 */
export default function ModeloImagen({ modelo, colorId, className = '', transicion = true, prioridad = false }) {
  const color = modelo.colores.find((c) => c.id === colorId) ?? modelo.colores[0]
  const candidatos = [modelo.fotos?.[color.id], rutaRender(modelo.id, color.id)].filter(Boolean)
  // Se recuerdan las rutas que fallaron, no un sí/no: si falla el render de
  // un color, los demás colores siguen intentando el suyo.
  const [rotas, setRotas] = useState(() => new Set())
  const src = candidatos.find((c) => !rotas.has(c))

  const titulo = `TORKA ${modelo.nombre} en ${color.nombre.toLowerCase()}`
  const estilo = transicion ? { viewTransitionName: `moto-${modelo.id}` } : undefined

  if (src) {
    return (
      <img
        src={src}
        alt={titulo}
        onError={() => setRotas((r) => new Set(r).add(src))}
        width="1320"
        height="810"
        loading={prioridad ? 'eager' : 'lazy'}
        fetchPriority={prioridad ? 'high' : undefined}
        decoding="async"
        className={`object-contain ${className}`}
        style={estilo}
      />
    )
  }

  return (
    <div className={className} style={estilo}>
      <MotoSilueta color={color.hex} rasgos={modelo.ilustracion} titulo={titulo} className="h-full w-full" />
    </div>
  )
}
