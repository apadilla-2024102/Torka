/**
 * Datos de contacto del negocio.
 *
 * CAMBIA ESTOS VALORES ANTES DE PUBLICAR. Son los únicos datos de
 * contacto de todo el sitio: el formulario de cotización, el pie de
 * página y los botones de WhatsApp los leen de aquí.
 */
export const NEGOCIO = {
  nombre: 'yolt',
  // Número de WhatsApp con código de país y sin espacios ni signos.
  // Guatemala: 502 + 8 dígitos. Este es un número de ejemplo.
  whatsapp: '50200000000',
  correoVentas: 'ventas@yolt.gt',
  telefono: '2200 0000',

  // Datos legales: aparecen en el aviso legal y en la política de
  // privacidad. Deben coincidir con la patente de comercio y el RTU.
  razonSocial: '[Razón social registrada]',
  nit: '[NIT]',
  direccion: '[Dirección fiscal], Ciudad de Guatemala',
  correoPrivacidad: 'privacidad@yolt.gt',

  // Dominio público del sitio, sin barra final. Se usa en enlaces
  // canónicos, sitemap.xml, robots.txt y datos estructurados.
  sitioUrl: 'https://www.yolt.gt',

  // Perfiles públicos (Google Business Profile, Facebook, Instagram...).
  // Los que tengan valor se enlazan en los datos estructurados para que
  // Google relacione el sitio con la ficha del negocio.
  perfiles: {
    google: '',
    facebook: '',
    instagram: '',
    tiktok: '',
  },

  // Analítica. Google Analytics 4 se carga solo si el visitante acepta
  // cookies; Vercel Web Analytics no usa cookies y se carga siempre.
  // Pon aquí el ID de medición de GA4 (G-XXXXXXXXXX) o déjalo vacío.
  ga4: import.meta.env?.VITE_GA4_ID ?? '',
}

export const enlaceWhatsApp = (mensaje) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`
