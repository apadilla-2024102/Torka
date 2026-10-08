/**
 * Supuestos de costo de energía y mantenimiento en Guatemala.
 *
 * Los usa la portada (lo que cuesta una carga completa frente a la misma
 * distancia en gasolina) y la calculadora de ahorro. Están a la vista a propósito: una cuenta que esconde sus
 * supuestos no convence a quien sabe hacer cuentas.
 *
 * ACTUALIZA estos valores con precios vigentes antes de publicar.
 */
export const SUPUESTOS = {
  // Derivado de la ficha de la yolt CITY: batería 72V 30Ah (2.16 kWh) para
  // 90 km, más 15 % de pérdida al cargar = 2.8 kWh cada 100 km.
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

/**
 * Recorrido de referencia: una carga completa de la yolt CITY según la
 * ficha del fabricante (72V 30Ah, 90 km). La pérdida al cargar se cobra
 * aparte: lo que paga el cliente es lo que mide su contador.
 */
export const REFERENCIA = {
  modelo: 'yolt CITY',
  km: 90,
  bateriaKwh: (72 * 30) / 1000,
  eficienciaCarga: 0.85,
}

/** Lo que cuesta recorrer la distancia de referencia con cada moto. */
export const costoRecorrido = () => ({
  electrica: (REFERENCIA.bateriaKwh / REFERENCIA.eficienciaCarga) * SUPUESTOS.tarifaKwh,
  gasolina: REFERENCIA.km * costoKmGasolina(),
})

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
