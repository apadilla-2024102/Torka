/**
 * Supuestos de costo de energía y mantenimiento en Guatemala.
 *
 * Los usa la portada (cuánto recorres con Q100) y la calculadora de
 * ahorro. Están a la vista a propósito: una cuenta que esconde sus
 * supuestos no convence a quien sabe hacer cuentas.
 *
 * ACTUALIZA estos valores con precios vigentes antes de publicar.
 */
export const SUPUESTOS = {
  consumoKwh100km: 2.8, // kWh por cada 100 km
  tarifaKwh: 1.85, // quetzales por kWh, tarifa residencial
  precioGalon: 38, // quetzales por galón de gasolina súper
  rendimientoKmGalon: 130, // moto de gasolina de 150 cc
  mantenimientoGasolinaAnual: 1100, // aceite, filtros, bujías, afinación
  mantenimientoElectricoAnual: 280, // frenos y llantas
}

export const costoKmElectrico = () =>
  (SUPUESTOS.consumoKwh100km / 100) * SUPUESTOS.tarifaKwh

export const costoKmGasolina = (
  precioGalon = SUPUESTOS.precioGalon,
  rendimiento = SUPUESTOS.rendimientoKmGalon,
) => precioGalon / rendimiento

/** Kilómetros que recorre cada moto con un mismo monto en energía. */
export const kmPorMonto = (monto) => ({
  gasolina: monto / costoKmGasolina(),
  electrica: monto / costoKmElectrico(),
})

/** Comparativa anual con los datos del cliente. */
export const calcularAhorroAnual = ({ kmMes, precioGalon, rendimiento }) => {
  const kmAnual = kmMes * 12
  const totalGasolina =
    kmAnual * costoKmGasolina(precioGalon, rendimiento) + SUPUESTOS.mantenimientoGasolinaAnual
  const totalElectrico =
    kmAnual * costoKmElectrico() + SUPUESTOS.mantenimientoElectricoAnual

  return {
    kmAnual,
    totalGasolina,
    totalElectrico,
    ahorro: Math.max(totalGasolina - totalElectrico, 0),
    porKmGasolina: totalGasolina / Math.max(kmAnual, 1),
    porKmElectrico: totalElectrico / Math.max(kmAnual, 1),
  }
}

/**
 * Cuota mensual estimada con interés sobre saldo (sistema francés).
 * Tasa de EJEMPLO: cámbiala por la de tu financiera.
 */
export const TASA_ANUAL_EJEMPLO = 0.18

export const cuotaMensual = ({ precio, enganche, meses, tasaAnual = TASA_ANUAL_EJEMPLO }) => {
  const saldo = Math.max(precio - enganche, 0)
  const i = tasaAnual / 12
  if (saldo === 0) return 0
  if (i === 0) return saldo / meses
  return (saldo * i) / (1 - Math.pow(1 + i, -meses))
}
