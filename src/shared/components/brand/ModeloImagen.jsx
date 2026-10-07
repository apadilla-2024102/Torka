import { useState } from 'react'
import MotoSilueta from './MotoSilueta.jsx'

/**
 * Imagen de un modelo en un color.
 *
 * Si el modelo tiene foto para ese color (campo `fotos` en mockData.js),
 * muestra la foto; si no la tiene, o si el archivo falla al cargar,
 * dibuja la silueta vectorial. Subir fotos nunca deja un icono roto.
 *
 * `viewTransitionName` hace que la moto viaje de la tarjeta a su ficha
 * cuando el usuario navega entre ellas.
 */
export default function ModeloImagen({ modelo, colorId, className = '', transicion = true }) {
  const color = modelo.colores.find((c) => c.id === colorId) ?? modelo.colores[0]
  const foto = modelo.fotos?.[color.id]
  const [fotoRota, setFotoRota] = useState(false)
  const titulo = `TORKA ${modelo.nombre} en ${color.nombre.toLowerCase()}`
  const estilo = transicion ? { viewTransitionName: `moto-${modelo.id}` } : undefined

  if (foto && !fotoRota) {
    return (
      <img
        src={foto}
        alt={titulo}
        onError={() => setFotoRota(true)}
        width="440"
        height="270"
        loading="lazy"
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
