import { Link } from 'react-router-dom'
import PaginaLegal from '../components/PaginaLegal.jsx'
import { NEGOCIO } from '../../../shared/config/negocio.js'

const enlace = 'font-medium text-tinta underline underline-offset-4'

export default function AvisoLegalPage() {
  return (
    <PaginaLegal
      titulo="Aviso legal"
      descripcion="Aviso legal de yolt: titular del sitio, condiciones de uso, precios y fichas técnicas de referencia, propiedad intelectual y legislación aplicable en Guatemala."
      intro={
        <p>
          Este aviso regula el uso del sitio web de {NEGOCIO.nombre}. Al navegar en él aceptas estas condiciones. Si no
          estás de acuerdo, te pedimos no utilizar el sitio.
        </p>
      }
      secciones={[
        {
          id: 'titular',
          titulo: 'Titular del sitio',
          contenido: (
            <ul className="space-y-1">
              <li>Nombre comercial: {NEGOCIO.nombre}</li>
              <li>Razón social: {NEGOCIO.razonSocial}</li>
              <li>NIT: {NEGOCIO.nit}</li>
              <li>Dirección: {NEGOCIO.direccion}</li>
              <li>
                Correo:{' '}
                <a className={enlace} href={`mailto:${NEGOCIO.correoVentas}`}>
                  {NEGOCIO.correoVentas}
                </a>
              </li>
              <li>Teléfono: {NEGOCIO.telefono}</li>
            </ul>
          ),
        },
        {
          id: 'objeto',
          titulo: 'Objeto del sitio',
          contenido: (
            <p>
              El sitio presenta la gama de motocicletas eléctricas {NEGOCIO.nombre}, sus características y la red de
              distribuidores, y permite solicitar una cotización. La información publicada es informativa: no constituye
              una oferta de venta. La compra se formaliza con el distribuidor autorizado, mediante cotización, factura y
              los documentos que correspondan.
            </p>
          ),
        },
        {
          id: 'precios',
          titulo: 'Precios, fichas técnicas e imágenes',
          contenido: (
            <>
              <p>
                Los precios, cuando se publican, están en quetzales y son de referencia: el precio vigente es el de la
                cotización que entrega el distribuidor. Las fichas técnicas provienen del fabricante y pueden variar entre
                lotes de producción.
              </p>
              <p>
                La autonomía depende del peso transportado, la pendiente, la velocidad, la temperatura y el estado de la
                batería. Los cálculos de ahorro y de costo por kilómetro son estimaciones basadas en los supuestos que se
                indican junto a cada cálculo. Las fotografías muestran unidades reales; el color puede variar según la
                pantalla.
              </p>
            </>
          ),
        },
        {
          id: 'garantia',
          titulo: 'Garantía y servicio',
          contenido: (
            <p>
              Las condiciones de garantía aplicables son las que constan por escrito en la póliza o documento que recibes al
              comprar, conforme a la Ley de Protección al Consumidor y Usuario (Decreto 006-2003). Los resúmenes del sitio
              no sustituyen ese documento.
            </p>
          ),
        },
        {
          id: 'uso',
          titulo: 'Uso del sitio',
          contenido: (
            <p>
              Te comprometes a usar el sitio de forma lícita y a no dañar su funcionamiento, no intentar acceder a áreas
              restringidas ni enviar información falsa en los formularios. Podemos modificar, suspender o retirar
              contenidos en cualquier momento.
            </p>
          ),
        },
        {
          id: 'propiedad',
          titulo: 'Propiedad intelectual',
          contenido: (
            <p>
              La marca {NEGOCIO.nombre}, el logotipo, los textos, las fotografías, el diseño y el código del sitio están
              protegidos por la Ley de Propiedad Industrial (Decreto 57-2000) y la Ley de Derecho de Autor y Derechos
              Conexos (Decreto 33-98). No se permite reproducirlos ni usarlos con fines comerciales sin autorización
              escrita.
            </p>
          ),
        },
        {
          id: 'enlaces',
          titulo: 'Enlaces a terceros',
          contenido: (
            <p>
              El sitio enlaza a servicios de terceros, como WhatsApp y Google Maps. No somos responsables de su contenido
              ni de sus políticas; al usarlos aplican sus propios términos.
            </p>
          ),
        },
        {
          id: 'responsabilidad',
          titulo: 'Responsabilidad',
          contenido: (
            <p>
              Procuramos que la información sea exacta y esté actualizada, pero puede contener errores u omisiones. No
              respondemos por decisiones tomadas solo con base en el sitio sin confirmar con un asesor, ni por
              interrupciones del servicio ajenas a nuestro control.
            </p>
          ),
        },
        {
          id: 'datos',
          titulo: 'Datos personales y cookies',
          contenido: (
            <p>
              El tratamiento de tus datos se explica en la{' '}
              <Link className={enlace} to="/privacidad">
                política de privacidad
              </Link>{' '}
              y el uso de cookies en el{' '}
              <Link className={enlace} to="/cookies">
                aviso de cookies
              </Link>
              .
            </p>
          ),
        },
        {
          id: 'ley',
          titulo: 'Legislación aplicable',
          contenido: (
            <p>
              Este aviso se rige por las leyes de la República de Guatemala. Cualquier controversia se someterá a los
              tribunales competentes de la ciudad de Guatemala, sin perjuicio de los derechos que la ley reconoce a los
              consumidores, incluida la vía de la Dirección de Atención y Asistencia al Consumidor (DIACO).
            </p>
          ),
        },
      ]}
    />
  )
}
