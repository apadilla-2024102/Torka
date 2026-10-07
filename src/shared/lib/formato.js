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

/** Precio de un modelo para mostrar: "Próximamente" si aún no tiene precio. */
export const precioModelo = (modelo) => (modelo.precio == null ? 'Próximamente' : quetzales.format(modelo.precio))
