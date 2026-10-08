const quetzales = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
  maximumFractionDigits: 0,
})

const numero = new Intl.NumberFormat('es-GT', { maximumFractionDigits: 0 })

const decimales = (n) =>
  new Intl.NumberFormat('es-GT', { minimumFractionDigits: n, maximumFractionDigits: n })

export const formatoQuetzales = (valor) => quetzales.format(valor)
export const formatoNumero = (valor) => numero.format(valor)
export const formatoDecimal = (valor, n = 2) => decimales(n).format(valor)

/**
 * Precio de un modelo para mostrar. Sin precio publicado: "Próximamente"
 * si el modelo aún no llega, "Precio a consultar" si ya está a la venta.
 */
export const precioModelo = (modelo) => {
  if (modelo.precio != null) return quetzales.format(modelo.precio)
  return modelo.proximamente ? 'Próximamente' : 'Precio a consultar'
}
