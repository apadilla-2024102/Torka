import { Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'
import Contenedor from './Contenedor.jsx'
import { NEGOCIO } from '../../config/negocio.js'

const COLUMNAS = [
  {
    titulo: 'Elegir',
    enlaces: [
      { to: '/modelos', label: 'Todos los modelos' },
      { to: '/comparar', label: 'Comparar modelos' },
      { to: '/ahorro', label: 'Calcular mi ahorro' },
    ],
  },
  {
    titulo: 'Comprar',
    enlaces: [
      { to: '/cotizar', label: 'Pedir cotización' },
      { to: '/distribuidores', label: 'Distribuidores' },
      { to: '/distribuidores#flotillas', label: 'Flotillas' },
    ],
  },
  {
    titulo: 'Después de comprar',
    enlaces: [
      { to: '/preguntas', label: 'Preguntas frecuentes' },
      { to: '/preguntas#garantia', label: 'Garantía' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-asfalto pt-16 pb-28 text-papel lg:pb-10">
      <Contenedor>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-niebla">
              Motos eléctricas para el tráfico, las pendientes y el presupuesto de Guatemala.
            </p>
            <p className="mt-6 text-niebla">
              <a href={`mailto:${NEGOCIO.correoVentas}`} className="text-papel underline-offset-4 hover:underline">
                {NEGOCIO.correoVentas}
              </a>
              <br />
              <a href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`} className="cifras text-papel underline-offset-4 hover:underline">
                {NEGOCIO.telefono}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNAS.map((c) => (
              <div key={c.titulo}>
                <h2 className="text-base font-semibold">{c.titulo}</h2>
                <ul className="mt-4 space-y-3">
                  {c.enlaces.map((e) => (
                    <li key={e.to}>
                      <Link to={e.to} viewTransition className="text-niebla transition-colors duration-200 hover:text-papel">
                        {e.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-linea pt-7 text-sm text-niebla sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} TORKA</p>
          <p>Precios y especificaciones de referencia. Confirma la ficha vigente con tu distribuidor.</p>
        </div>
      </Contenedor>
    </footer>
  )
}
