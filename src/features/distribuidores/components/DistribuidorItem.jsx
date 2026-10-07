import { Clock, MapPin, Phone } from 'lucide-react'

export default function DistribuidorItem({ distribuidor }) {
  const { ciudad, direccion, telefono, horario, pruebaManejo } = distribuidor

  return (
    <li className="flex flex-col rounded-[2px] border border-linea bg-asfalto-alto p-6">
      <h2 className="text-xl font-semibold">{ciudad}</h2>
      <ul className="mt-4 space-y-2.5 text-niebla">
        <li className="flex gap-2.5">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {direccion}
        </li>
        <li className="flex gap-2.5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {horario}
        </li>
      </ul>
      <p className={`mt-4 text-sm font-medium ${pruebaManejo ? 'text-senal' : 'text-niebla'}`}>
        {pruebaManejo ? 'Con unidades para prueba de manejo' : 'Exhibición y venta, sin prueba de manejo'}
      </p>
      <a
        href={`tel:${telefono.replace(/\s/g, '')}`}
        className="cifras mt-6 inline-flex min-h-11 items-center gap-2 self-start border border-papel/50 px-5 font-semibold transition-[background-color,border-color,color] duration-[330ms] hover:bg-papel hover:text-negro"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Llamar al {telefono}
      </a>
    </li>
  )
}
