import { NEGOCIO } from '../config/negocio.js'
import { urlAbsoluta } from './useSeo.js'

/**
 * Datos estructurados schema.org (JSON-LD). Le dicen a Google qué es cada
 * página: el negocio, cada moto, las preguntas frecuentes y la ruta de
 * navegación. Los datos salen de negocio.js y mockData.js: un solo lugar.
 */

const perfiles = () => Object.values(NEGOCIO.perfiles ?? {}).filter(Boolean)
const telefonoIntl = () => `+${NEGOCIO.whatsapp.slice(0, 3)} ${NEGOCIO.telefono}`

/** El negocio: concesionario de motocicletas en Guatemala. Va en todas las páginas. */
export const esquemaNegocio = () => ({
  '@context': 'https://schema.org',
  '@type': 'MotorcycleDealer',
  '@id': urlAbsoluta('/#negocio'),
  name: NEGOCIO.nombre,
  legalName: NEGOCIO.razonSocial,
  url: urlAbsoluta('/'),
  logo: urlAbsoluta('/marca/yolt-logo.png'),
  image: urlAbsoluta('/og-yolt.jpg'),
  description: 'Motos eléctricas en Guatemala: yolt ONE, CITY, STREET y GT. Cotización, prueba de manejo y servicio autorizado.',
  email: NEGOCIO.correoVentas,
  telephone: telefonoIntl(),
  address: { '@type': 'PostalAddress', streetAddress: NEGOCIO.direccion, addressCountry: 'GT' },
  areaServed: { '@type': 'Country', name: 'Guatemala' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: telefonoIntl(),
    availableLanguage: 'es',
    areaServed: 'GT',
  },
  ...(perfiles().length ? { sameAs: perfiles() } : {}),
})

/** Ruta de navegación: [{ nombre, ruta }]. */
export const esquemaMigas = (migas) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: migas.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: m.nombre,
    item: urlAbsoluta(m.ruta),
  })),
})

/** Una moto. Sin precio publicado no se declara oferta (Google la rechazaría vacía). */
export const esquemaModelo = (modelo) => {
  const fotos = Object.values(modelo.fotos ?? {}).map(urlAbsoluta)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `yolt ${modelo.nombre}`,
    description: modelo.resumen,
    brand: { '@type': 'Brand', name: 'yolt' },
    category: 'Motocicleta eléctrica',
    image: fotos,
    url: urlAbsoluta(`/modelos/${modelo.id}`),
    color: modelo.colores.map((c) => c.nombre).join(', '),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Autonomía', value: modelo.specs.autonomia, unitText: 'km' },
      { '@type': 'PropertyValue', name: 'Velocidad máxima', value: modelo.specs.velocidad, unitText: 'km/h' },
      { '@type': 'PropertyValue', name: 'Potencia', value: modelo.specs.motor, unitText: 'W' },
      { '@type': 'PropertyValue', name: 'Batería', value: modelo.specs.bateria },
      { '@type': 'PropertyValue', name: 'Frenos', value: modelo.specs.frenos },
    ],
    ...(modelo.precio != null
      ? {
          offers: {
            '@type': 'Offer',
            price: modelo.precio,
            priceCurrency: 'GTQ',
            availability: modelo.proximamente ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
            seller: { '@id': urlAbsoluta('/#negocio') },
          },
        }
      : {}),
  }
}

/** Catálogo: la lista de modelos en orden. */
export const esquemaCatalogo = (modelos) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: modelos.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: urlAbsoluta(`/modelos/${m.id}`),
    name: `yolt ${m.nombre}`,
  })),
})

/** Preguntas frecuentes. */
export const esquemaPreguntas = (preguntas) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: preguntas.map((p) => ({
    '@type': 'Question',
    name: p.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
  })),
})
