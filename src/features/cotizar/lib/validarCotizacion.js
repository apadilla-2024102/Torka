/**
 * Validación y armado del mensaje de cotización.
 * Viven fuera del componente para poder probarse y reutilizarse.
 */

export const INTERESES = [
  { id: 'contado', label: 'Precio de contado' },
  { id: 'cuotas', label: 'Pago en cuotas' },
  { id: 'prueba', label: 'Prueba de manejo' },
]

/** Teléfono de Guatemala: 8 dígitos, se aceptan espacios y guiones. */
const soloDigitos = (texto) => texto.replace(/\D/g, '')

export const validarCotizacion = (datos) => {
  const errores = {}
  if (!datos.modelo) errores.modelo = 'Elige el modelo que te interesa.'
  if (datos.nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre para saber cómo dirigirnos a ti.'
  if (soloDigitos(datos.telefono).length !== 8)
    errores.telefono = 'Escribe un teléfono de 8 dígitos, por ejemplo 5555 1234.'
  if (!datos.departamento) errores.departamento = 'Elige tu departamento para asignarte el distribuidor más cercano.'
  return errores
}

export const armarMensaje = (datos, modelo, color) => {
  const interes = INTERESES.find((i) => i.id === datos.interes)?.label ?? ''
  const telefono = soloDigitos(datos.telefono).replace(/(\d{4})(\d{4})/, '$1 $2')
  return [
    `Hola, soy ${datos.nombre.trim()}. Quiero cotizar una yolt ${modelo.nombre}${color ? ` en ${color.nombre.toLowerCase()}` : ''}.`,
    `Me interesa: ${interes}.`,
    `Departamento: ${datos.departamento}.`,
    `Teléfono: ${telefono}.`,
    datos.comentario.trim() ? `Comentario: ${datos.comentario.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}
