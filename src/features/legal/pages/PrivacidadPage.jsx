import { Link } from 'react-router-dom'
import PaginaLegal from '../components/PaginaLegal.jsx'
import { NEGOCIO } from '../../../shared/config/negocio.js'

const enlace = 'font-medium text-tinta underline underline-offset-4'

export default function PrivacidadPage() {
  return (
    <PaginaLegal
      titulo="Política de privacidad"
      descripcion="Cómo trata yolt tus datos: qué pedimos al cotizar, para qué los usamos, con quién se comparten, cuánto tiempo se guardan y cómo ejercer tus derechos."
      intro={
        <p>
          Tu privacidad importa. Aquí explicamos qué datos recogemos, para qué y cómo puedes controlarlos. Pedimos solo
          lo necesario para atender tu solicitud.
        </p>
      }
      secciones={[
        {
          id: 'responsable',
          titulo: 'Responsable',
          contenido: (
            <p>
              {NEGOCIO.razonSocial} ({NEGOCIO.nombre}), NIT {NEGOCIO.nit}, con domicilio en {NEGOCIO.direccion}. Para
              cualquier asunto de privacidad escribe a{' '}
              <a className={enlace} href={`mailto:${NEGOCIO.correoPrivacidad}`}>
                {NEGOCIO.correoPrivacidad}
              </a>
              .
            </p>
          ),
        },
        {
          id: 'datos',
          titulo: 'Qué datos recogemos',
          contenido: (
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-tinta">Al pedir una cotización:</strong> nombre, número de teléfono o WhatsApp,
                departamento, modelo y color de interés, y el comentario que quieras añadir.
              </li>
              <li>
                <strong className="text-tinta">Al escribirnos por WhatsApp, correo o teléfono:</strong> los datos y
                mensajes que nos envíes.
              </li>
              <li>
                <strong className="text-tinta">Al navegar:</strong> datos técnicos y de uso (páginas visitadas, tipo de
                dispositivo, país aproximado). Los de Google Analytics solo si aceptas las cookies de analítica.
              </li>
            </ul>
          ),
        },
        {
          id: 'finalidad',
          titulo: 'Para qué los usamos',
          contenido: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Responder tu solicitud, enviarte la cotización y agendar la prueba de manejo.</li>
              <li>Asignarte el distribuidor más cercano y darte seguimiento a la compra.</li>
              <li>Atender garantía y servicio si ya eres cliente.</li>
              <li>Medir de forma agregada cómo se usa el sitio para mejorarlo.</li>
            </ul>
          ),
        },
        {
          id: 'base',
          titulo: 'Base para tratarlos',
          contenido: (
            <p>
              Tratamos tus datos porque tú nos los das para pedir información o comprar (tu consentimiento y la relación
              precontractual o contractual), y para cumplir obligaciones legales, como las fiscales y las de la Ley de
              Protección al Consumidor y Usuario. Guatemala no cuenta todavía con una ley general de protección de datos
              personales; aun así aplicamos los principios de finalidad, minimización, seguridad y transparencia, y
              respetamos la inviolabilidad de las comunicaciones que reconoce la Constitución.
            </p>
          ),
        },
        {
          id: 'compartir',
          titulo: 'Con quién los compartimos',
          contenido: (
            <>
              <p>No vendemos ni alquilamos tus datos. Solo los compartimos con:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>El distribuidor autorizado que atenderá tu cotización o servicio.</li>
                <li>
                  Proveedores que nos prestan servicios: WhatsApp (Meta) para la mensajería, Vercel para alojar el sitio
                  y medir visitas sin cookies, y Google Analytics si aceptas las cookies. Algunos procesan datos fuera de
                  Guatemala.
                </li>
                <li>Autoridades, cuando una ley o una orden judicial lo exija.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'plazo',
          titulo: 'Cuánto tiempo los guardamos',
          contenido: (
            <p>
              Los datos de una cotización que no termina en compra se conservan hasta 12 meses para darte seguimiento. Si
              compras, los conservamos mientras dure la garantía y los plazos que exige la legislación fiscal y mercantil.
              Después se eliminan o se anonimizan.
            </p>
          ),
        },
        {
          id: 'derechos',
          titulo: 'Tus derechos',
          contenido: (
            <p>
              Puedes pedir en cualquier momento acceder a tus datos, corregirlos, eliminarlos o dejar de recibir mensajes
              nuestros. Escribe a{' '}
              <a className={enlace} href={`mailto:${NEGOCIO.correoPrivacidad}`}>
                {NEGOCIO.correoPrivacidad}
              </a>{' '}
              indicando tu nombre y el número con el que nos contactaste. Respondemos en un plazo máximo de 10 días
              hábiles.
            </p>
          ),
        },
        {
          id: 'seguridad',
          titulo: 'Seguridad',
          contenido: (
            <p>
              El sitio se sirve siempre por conexión cifrada (HTTPS). Limitamos el acceso a tus datos a las personas que
              necesitan atender tu solicitud.
            </p>
          ),
        },
        {
          id: 'menores',
          titulo: 'Menores de edad',
          contenido: (
            <p>
              El sitio está dirigido a personas mayores de 18 años. Si eres menor, pide a tu madre, padre o tutor que
              solicite la cotización.
            </p>
          ),
        },
        {
          id: 'cookies',
          titulo: 'Cookies',
          contenido: (
            <p>
              El uso de cookies y cómo cambiar tu elección se explica en el{' '}
              <Link className={enlace} to="/cookies">
                aviso de cookies
              </Link>
              .
            </p>
          ),
        },
        {
          id: 'cambios',
          titulo: 'Cambios a esta política',
          contenido: (
            <p>
              Si cambiamos esta política, publicaremos la versión nueva en esta página con su fecha de actualización.
            </p>
          ),
        },
      ]}
    />
  )
}
