import { useLoaderData, useLocation } from 'react-router-dom'
import { getPreguntas } from '../../../shared/api/preguntasApi.js'
import EncabezadoPagina from '../../../shared/components/layout/EncabezadoPagina.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import LlamadoCotizar from '../../../shared/components/ui/LlamadoCotizar.jsx'
import Pregunta from '../components/Pregunta.jsx'

export const preguntasLoader = async () => ({ preguntas: await getPreguntas() })

export default function PreguntasPage() {
  const { preguntas } = useLoaderData()
  // Si se llega con un enlace a una pregunta concreta, se abre esa.
  const { hash } = useLocation()
  const abiertaId = hash.slice(1)

  return (
    <>
      <EncabezadoPagina
        titulo="Preguntas antes de comprar"
        descripcion="Licencia, carga, batería, lluvia, ahorro y garantía: las dudas que más se repiten en el piso de venta."
      />
      <Contenedor className="py-10 sm:py-14">
        <div className="border-t border-linea">
          {preguntas.map((p, i) => (
            <Pregunta
              key={p.id}
              id={p.id}
              pregunta={p.pregunta}
              respuesta={p.respuesta}
              abierta={abiertaId ? p.id === abiertaId : i === 0}
            />
          ))}
        </div>
      </Contenedor>
      <LlamadoCotizar titulo="¿Te quedó otra duda?" texto="Escríbenos por WhatsApp y te responde un asesor, no un bot." />
    </>
  )
}
