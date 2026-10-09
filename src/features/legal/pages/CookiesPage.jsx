import { Link } from 'react-router-dom'
import PaginaLegal from '../components/PaginaLegal.jsx'
import { abrirAvisoCookies } from '../../../shared/analitica/analitica.js'

const enlace = 'font-medium text-tinta underline underline-offset-4'

const COOKIES = [
  {
    nombre: 'yolt-consentimiento-cookies',
    tipo: 'Necesaria (almacenamiento local)',
    para: 'Recordar si aceptaste o rechazaste la analítica.',
    duracion: 'Hasta que la borres',
  },
  {
    nombre: '_ga, _ga_*',
    tipo: 'Analítica (Google Analytics)',
    para: 'Contar visitas y páginas vistas de forma agregada. Solo si aceptas.',
    duracion: '2 años',
  },
]

export default function CookiesPage() {
  return (
    <PaginaLegal
      titulo="Aviso de cookies"
      descripcion="Qué cookies usa el sitio de yolt, para qué sirven y cómo aceptar, rechazar o cambiar tu elección en cualquier momento."
      intro={
        <p>
          Las cookies son pequeños archivos que el sitio guarda en tu navegador. Usamos las mínimas: una para recordar tu
          elección y, solo si la aceptas, la analítica de Google.
        </p>
      }
      secciones={[
        {
          id: 'cuales',
          titulo: 'Qué cookies usamos',
          contenido: (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-filete text-tinta">
                    <th scope="col" className="py-3 pr-4 font-semibold">Nombre</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Tipo</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Para qué</th>
                    <th scope="col" className="py-3 font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.nombre} className="border-b border-filete align-top">
                      <td className="py-3 pr-4 font-mono text-xs text-tinta">{c.nombre}</td>
                      <td className="py-3 pr-4">{c.tipo}</td>
                      <td className="py-3 pr-4">{c.para}</td>
                      <td className="py-3">{c.duracion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: 'sin-cookies',
          titulo: 'Medición sin cookies',
          contenido: (
            <p>
              Además usamos Vercel Web Analytics, que cuenta visitas sin cookies y sin identificarte personalmente, por lo
              que no requiere tu consentimiento.
            </p>
          ),
        },
        {
          id: 'terceros',
          titulo: 'Servicios de terceros',
          contenido: (
            <p>
              Al tocar un botón de WhatsApp o un mapa sales de nuestro sitio; esos servicios aplican sus propias cookies y
              políticas. Las fuentes tipográficas se cargan desde Google Fonts, que recibe la dirección IP de tu
              dispositivo para entregarlas.
            </p>
          ),
        },
        {
          id: 'cambiar',
          titulo: 'Cómo cambiar tu elección',
          contenido: (
            <>
              <p>Puedes cambiar tu decisión cuando quieras:</p>
              <button
                type="button"
                onClick={abrirAvisoCookies}
                className="tipo-etiqueta min-h-11 border border-tinta/50 px-5 text-tinta transition-colors duration-[330ms] hover:bg-tinta hover:text-lienzo"
              >
                Configurar cookies
              </button>
              <p>
                También puedes borrar las cookies desde la configuración de tu navegador. Rechazar la analítica no
                afecta el uso del sitio.
              </p>
            </>
          ),
        },
        {
          id: 'mas',
          titulo: 'Más información',
          contenido: (
            <p>
              El tratamiento de tus datos se explica en la{' '}
              <Link className={enlace} to="/privacidad">
                política de privacidad
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  )
}
