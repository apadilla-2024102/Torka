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
}

export const enlaceWhatsApp = (mensaje) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`
