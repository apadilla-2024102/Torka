/**
 * Catálogo TORKA.
 *
 * DATOS DE EJEMPLO. Sustituye por las fichas reales antes de publicar.
 * Precios en quetzales (GTQ), de ejemplo.
 * La estructura ya está lista: añade o quita modelos y la página, el
 * comparador y el filtro se reconstruyen solos.
 */

export const modelos = [
  {
    id: 'urbana',
    nombre: 'Urbana',
    tagline: 'La primera moto eléctrica que no te complica la vida',
    perfil: 'ciudad',
    perfilLabel: 'Ciudad',
    precio: 13900,
    destacado: 'Más vendida',
    resumen:
      'Pensada para trayectos cortos y constantes: casa, oficina, mandado. Batería extraíble, así que la subes al departamento y la cargas en un contacto normal.',
    specs: {
      autonomia: 65,
      velocidad: 45,
      carga: 4,
      motor: 1200,
      cargaUtil: 150,
      bateria: 'Extraíble · 60V 20Ah',
    },
    puntos: [
      'Batería extraíble de 11 kg',
      'No requiere licencia tipo M en la mayoría de departamentos',
      'Cargador incluido, contacto doméstico de 120 V',
    ],
  },
  {
    id: 'sierra',
    nombre: 'Sierra',
    tagline: 'Autonomía para dejar de pensar en la batería',
    perfil: 'autonomia',
    perfilLabel: 'Larga distancia',
    precio: 19500,
    destacado: 'Mayor autonomía',
    resumen:
      'Doble batería y motor de mayor par para subidas y trayectos largos. Si haces más de 40 km diarios o vives en zona con pendientes, esta es la que aguanta.',
    specs: {
      autonomia: 120,
      velocidad: 65,
      carga: 6,
      motor: 2000,
      cargaUtil: 170,
      bateria: 'Doble extraíble · 72V 20Ah',
    },
    puntos: [
      'Dos baterías: carga una mientras usas la otra',
      'Motor de 2000 W con par reforzado para pendientes',
      'Frenos de disco delantero y trasero',
    ],
  },
  {
    id: 'carga',
    nombre: 'Carga',
    tagline: 'Hecha para trabajar todos los días',
    perfil: 'trabajo',
    perfilLabel: 'Reparto y trabajo',
    precio: 17600,
    destacado: null,
    resumen:
      'Chasis reforzado, parrilla trasera y suspensión calibrada para peso. Para reparto, mensajería y flotillas donde cada peso de combustible cuenta.',
    specs: {
      autonomia: 90,
      velocidad: 55,
      carga: 5,
      motor: 1800,
      cargaUtil: 220,
      bateria: 'Extraíble · 72V 20Ah',
    },
    puntos: [
      'Capacidad de carga de 220 kg incluyendo conductor',
      'Parrilla trasera y anclajes para caja de reparto',
      'Precio por flotilla a partir de 5 unidades',
    ],
  },
  {
    id: 'sport',
    nombre: 'Sport',
    tagline: 'La respuesta a quien dice que lo eléctrico es lento',
    perfil: 'potencia',
    perfilLabel: 'Potencia',
    precio: 22900,
    destacado: null,
    resumen:
      'Motor de 3000 W y arranque instantáneo. Velocidad de vía primaria con la entrega de par que solo da un eléctrico. Requiere licencia y placas.',
    specs: {
      autonomia: 100,
      velocidad: 85,
      carga: 5,
      motor: 3000,
      cargaUtil: 160,
      bateria: 'Litio fija · 72V 32Ah',
    },
    puntos: [
      'De 0 a 50 km/h en 4.2 segundos',
      'Tres modos de manejo: Eco, Ciudad y Sport',
      'Requiere licencia tipo M y placas',
    ],
  },
]

/** Etiquetas legibles y unidades de cada especificación, para el comparador. */
export const specsMeta = [
  { key: 'autonomia', label: 'Autonomía', unidad: 'km', mejor: 'alto' },
  { key: 'velocidad', label: 'Velocidad máxima', unidad: 'km/h', mejor: 'alto' },
  { key: 'motor', label: 'Potencia', unidad: 'W', mejor: 'alto' },
  { key: 'carga', label: 'Tiempo de carga', unidad: 'h', mejor: 'bajo' },
  { key: 'cargaUtil', label: 'Capacidad de carga', unidad: 'kg', mejor: 'alto' },
  { key: 'bateria', label: 'Batería', unidad: '', mejor: null },
]

export const filtros = [
  { id: 'todos', label: 'Toda la gama' },
  { id: 'ciudad', label: 'Ciudad' },
  { id: 'autonomia', label: 'Larga distancia' },
  { id: 'trabajo', label: 'Reparto y trabajo' },
  { id: 'potencia', label: 'Potencia' },
]
