/**
 * Datos de ejemplo de TORKA.
 *
 * Se usan mientras no exista un backend (variable VITE_API_URL vacía).
 * Precios en quetzales (GTQ), fichas, garantías y distribuidores son de
 * EJEMPLO: sustitúyelos por los reales antes de publicar.
 *
 * Añade o quita modelos y el catálogo, la ficha, el comparador y el
 * formulario de cotización se reconstruyen solos.
 */

export const MOCK_MODELOS = [
  {
    id: 'urbana',
    nombre: 'Urbana',
    tagline: 'La primera moto eléctrica que no te complica la vida',
    perfil: 'ciudad',
    perfilLabel: 'Ciudad',
    precio: 13900,
    destacado: 'Más vendida',
    requiereLicencia: false,
    resumen:
      'Pensada para trayectos cortos y constantes: casa, oficina, mandados. La batería se desmonta, así que la subes a tu casa y la cargas en un contacto normal.',
    specs: {
      autonomia: 65,
      velocidad: 45,
      carga: 4,
      motor: 1200,
      cargaUtil: 150,
      bateria: 'Extraíble 60V 20Ah',
    },
    puntos: [
      'Batería extraíble de 11 kg',
      'No requiere licencia tipo M',
      'Cargador incluido para contacto de 120 V',
    ],
    // Ilustración: rasgos que la distinguen mientras no hay foto.
    ilustracion: { parabrisas: false, parrilla: false, caja: false, dobleBateria: false },
    colores: [
      { id: 'blanco', nombre: 'Blanco glaciar', hex: '#eceef0' },
      { id: 'grafito', nombre: 'Grafito', hex: '#4a4c53' },
      { id: 'rojo', nombre: 'Rojo TORKA', hex: '#e31019' },
    ],
    // Cuando tengas fotos: { blanco: '/modelos/urbana-blanco.png', ... }
    fotos: null,
  },
  {
    id: 'sierra',
    nombre: 'Sierra',
    tagline: 'Autonomía para dejar de pensar en la batería',
    perfil: 'autonomia',
    perfilLabel: 'Larga distancia',
    precio: 19500,
    destacado: 'Mayor autonomía',
    requiereLicencia: true,
    resumen:
      'Doble batería y motor de mayor par para subidas y trayectos largos. Si haces más de 40 km diarios o vives en una zona con pendientes, esta es la que aguanta.',
    specs: {
      autonomia: 120,
      velocidad: 65,
      carga: 6,
      motor: 2000,
      cargaUtil: 170,
      bateria: 'Doble extraíble 72V 20Ah',
    },
    puntos: [
      'Dos baterías: carga una mientras usas la otra',
      'Motor de 2000 W con par reforzado para pendientes',
      'Frenos de disco delantero y trasero',
    ],
    ilustracion: { parabrisas: true, parrilla: false, caja: false, dobleBateria: true },
    colores: [
      { id: 'olivo', nombre: 'Verde volcán', hex: '#5f6b4a' },
      { id: 'arena', nombre: 'Arena', hex: '#c8b48a' },
      { id: 'negro', nombre: 'Negro mate', hex: '#2b2c30' },
    ],
    fotos: null,
  },
  {
    id: 'carga',
    nombre: 'Carga',
    tagline: 'Hecha para trabajar todos los días',
    perfil: 'trabajo',
    perfilLabel: 'Reparto y trabajo',
    precio: 17600,
    destacado: null,
    requiereLicencia: false,
    resumen:
      'Chasis reforzado, parrilla trasera y suspensión calibrada para peso. Para reparto, mensajería y flotillas donde cada quetzal de combustible cuenta.',
    specs: {
      autonomia: 90,
      velocidad: 55,
      carga: 5,
      motor: 1800,
      cargaUtil: 220,
      bateria: 'Extraíble 72V 20Ah',
    },
    puntos: [
      'Capacidad de 220 kg incluyendo conductor',
      'Parrilla trasera y anclajes para caja de reparto',
      'Precio por flotilla a partir de 5 unidades',
    ],
    ilustracion: { parabrisas: false, parrilla: true, caja: true, dobleBateria: false },
    colores: [
      { id: 'amarillo', nombre: 'Amarillo servicio', hex: '#e9b824' },
      { id: 'blanco', nombre: 'Blanco flotilla', hex: '#eceef0' },
      { id: 'grafito', nombre: 'Grafito', hex: '#4a4c53' },
    ],
    fotos: null,
  },
  {
    id: 'sport',
    nombre: 'Sport',
    tagline: 'Para quien dice que lo eléctrico es lento',
    perfil: 'potencia',
    perfilLabel: 'Potencia',
    precio: 22900,
    destacado: null,
    requiereLicencia: true,
    resumen:
      'Motor de 3000 W y respuesta instantánea. Velocidad de vía primaria con la entrega de par que solo da un eléctrico. Requiere licencia y placas.',
    specs: {
      autonomia: 100,
      velocidad: 85,
      carga: 5,
      motor: 3000,
      cargaUtil: 160,
      bateria: 'Litio fija 72V 32Ah',
    },
    puntos: [
      'De 0 a 50 km/h en 4.2 segundos',
      'Tres modos de manejo: Eco, Ciudad y Sport',
      'Requiere licencia tipo M y placas',
    ],
    ilustracion: { parabrisas: false, parrilla: false, caja: false, dobleBateria: false, deportiva: true },
    colores: [
      { id: 'rojo', nombre: 'Rojo TORKA', hex: '#e31019' },
      { id: 'negro', nombre: 'Negro mate', hex: '#2b2c30' },
      { id: 'azul', nombre: 'Azul lago', hex: '#2f5d8a' },
    ],
    fotos: null,
  },
]

/** Etiquetas, unidades y qué dirección es "mejor" en cada especificación. */
export const SPECS_META = [
  { key: 'autonomia', label: 'Autonomía', unidad: 'km', mejor: 'alto' },
  { key: 'velocidad', label: 'Velocidad máxima', unidad: 'km/h', mejor: 'alto' },
  { key: 'motor', label: 'Potencia', unidad: 'W', mejor: 'alto' },
  { key: 'carga', label: 'Tiempo de carga', unidad: 'h', mejor: 'bajo' },
  { key: 'cargaUtil', label: 'Capacidad de carga', unidad: 'kg', mejor: 'alto' },
  { key: 'bateria', label: 'Batería', unidad: '', mejor: null },
]

export const PERFILES = [
  { id: 'todos', label: 'Todos' },
  { id: 'ciudad', label: 'Ciudad' },
  { id: 'autonomia', label: 'Larga distancia' },
  { id: 'trabajo', label: 'Reparto y trabajo' },
  { id: 'potencia', label: 'Potencia' },
]

export const MOCK_DISTRIBUIDORES = [
  {
    id: 'gt-z10',
    ciudad: 'Ciudad de Guatemala',
    direccion: 'Zona 10',
    telefono: '2200 0000',
    horario: 'Lunes a sábado, 9:00 a 18:00',
    pruebaManejo: true,
  },
  {
    id: 'xela',
    ciudad: 'Quetzaltenango',
    direccion: 'Zona 3',
    telefono: '7700 0000',
    horario: 'Lunes a sábado, 9:00 a 17:00',
    pruebaManejo: true,
  },
  {
    id: 'escuintla',
    ciudad: 'Escuintla',
    direccion: 'Centro',
    telefono: '7880 0000',
    horario: 'Lunes a viernes, 8:00 a 17:00',
    pruebaManejo: false,
  },
  {
    id: 'coban',
    ciudad: 'Cobán',
    direccion: 'Zona 1',
    telefono: '7950 0000',
    horario: 'Lunes a sábado, 9:00 a 17:00',
    pruebaManejo: false,
  },
]

/**
 * Objeciones reales de compra. REVISA cada respuesta contra tus
 * condiciones: garantías, coberturas y trámites son compromisos
 * comerciales, y estas cifras son de ejemplo.
 */
export const MOCK_PREGUNTAS = [
  {
    id: 'licencia',
    pregunta: '¿Necesito licencia y placas?',
    respuesta:
      'Depende del modelo. Urbana y Carga se mantienen dentro del límite de potencia y velocidad que suele clasificarse como ciclomotor y no exigen licencia tipo M. Sierra y Sport sí requieren licencia tipo M y placas. Tu distribuidor te entrega la factura y el certificado de origen, que es lo que necesitas para inscribir el vehículo ante la SAT.',
  },
  {
    id: 'carga-departamento',
    pregunta: 'Vivo en un apartamento, ¿dónde la cargo?',
    respuesta:
      'Por eso la batería es extraíble en Urbana, Sierra y Carga. Pesa entre 11 y 14 kg, la desmontas con llave, la subes y la conectas a un contacto normal de 120 V. No necesitas instalación especial. Sport lleva batería fija y se carga con la moto estacionada.',
  },
  {
    id: 'vida-bateria',
    pregunta: '¿Cuánto dura la batería antes de perder capacidad?',
    respuesta:
      'Las celdas de litio están especificadas a 1,000 ciclos completos conservando el 80% de su capacidad. En uso urbano típico, cargando cada dos o tres días, son entre cuatro y seis años antes de notar pérdida real de autonomía. La batería tiene garantía propia y se puede reemplazar sin cambiar la moto.',
  },
  {
    id: 'lluvia',
    pregunta: '¿Qué pasa si me agarra la lluvia?',
    respuesta:
      'Toda la gama tiene certificación IP67 en el sistema eléctrico y la batería: resiste lluvia fuerte y charcos. Lo que ninguna moto tolera, eléctrica o de gasolina, es quedar sumergida. Puedes lavarla con manguera normal; evita la hidrolavadora directa sobre el conector.',
  },
  {
    id: 'ahorro',
    pregunta: '¿Cuánto me ahorro de verdad frente a una de gasolina?',
    respuesta:
      'Depende de cuánto recorras, por eso la calculadora usa tus datos en lugar de darte un número fijo. Como referencia, la energía cuesta unos 5 centavos de quetzal por kilómetro contra cerca de 29 de una moto de gasolina de 150 cc, y no hay cambios de aceite, filtros, bujías ni afinaciones.',
  },
  {
    id: 'garantia',
    pregunta: '¿Qué cubre la garantía y dónde me dan servicio?',
    respuesta:
      'Dos años o 20,000 km en motor, controlador y estructura, y tres años en batería contra defectos de fabricación. El servicio se da en la red de distribuidores autorizados. El mantenimiento se limita a frenos, llantas y suspensión. Hay repuestos garantizados por siete años desde la compra.',
  },
]

export const DEPARTAMENTOS_GT = [
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'El Progreso',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Petén',
  'Quetzaltenango',
  'Quiché',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa',
]
