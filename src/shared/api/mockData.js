/**
 * Datos de ejemplo de yolt.
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
    id: 'one',
    nombre: 'ONE',
    tagline: 'Tu primer gran paso',
    perfil: 'ciudad',
    perfilLabel: 'Ciudad',
    precio: 8000,
    destacado: 'Desde Q 8,000',
    requiereLicencia: false,
    resumen:
      'La puerta de entrada a lo eléctrico: ligera, fácil de manejar y con batería que se desmonta para cargarla en casa. Para casa, oficina y mandados sin volver a pasar por la gasolinera.',
    specs: {
      autonomia: 60,
      velocidad: 45,
      carga: 4,
      motor: 1000,
      cargaUtil: 150,
      bateria: 'Extraíble 48V 20Ah',
    },
    puntos: [
      'Batería extraíble: la cargas en cualquier contacto de 120 V',
      'No requiere licencia tipo M',
      'Asiento acolchado con respaldo para el acompañante',
    ],
    // Silueta de respaldo, por si una foto no carga.
    ilustracion: { parabrisas: false, parrilla: false, caja: false, dobleBateria: false },
    // Un color por cada foto real: no se ofrece un color que no se puede mostrar.
    colores: [{ id: 'crema', nombre: 'Crema y menta', hex: '#e8e1cb' }],
    // Imágenes en public/modelos/fotos (ver README, "Imágenes de las motos").
    fotos: { crema: '/modelos/fotos/one-crema.webp' },
  },
  {
    id: 'city',
    nombre: 'CITY',
    tagline: 'Más ciudad. Más vida.',
    perfil: 'trabajo',
    perfilLabel: 'Ciudad y reparto',
    precio: 12000,
    destacado: 'Más vendida',
    requiereLicencia: false,
    resumen:
      'Chasis con defensas de acero, parrilla trasera y plataforma amplia. Para moverte todos los días por la ciudad, hacer mensajería o reparto, y que cada quetzal que antes iba a combustible se quede contigo.',
    specs: {
      autonomia: 80,
      velocidad: 50,
      carga: 5,
      motor: 1500,
      cargaUtil: 200,
      bateria: 'Extraíble 60V 24Ah',
    },
    puntos: [
      'Defensas laterales y parrilla trasera de acero',
      'Capacidad de 200 kg incluyendo conductor',
      'Precio por flotilla a partir de 5 unidades',
    ],
    ilustracion: { parabrisas: true, parrilla: true, caja: false, dobleBateria: false },
    colores: [
      { id: 'grafito', nombre: 'Grafito', hex: '#3b3d42' },
      { id: 'naranja', nombre: 'Naranja', hex: '#e8501e' },
    ],
    fotos: {
      grafito: '/modelos/fotos/city-grafito.webp',
      naranja: '/modelos/fotos/city-naranja.webp',
    },
  },
  {
    id: 'x',
    nombre: 'X',
    tagline: 'Más potencia. Más libertad.',
    perfil: 'potencia',
    perfilLabel: 'Potencia',
    precio: 25000,
    destacado: 'Más potencia',
    requiereLicencia: true,
    resumen:
      'Moto de uso mixto con suspensión delantera invertida, rines de rayos y llantas de tacos para salirte del asfalto. Motor de mayor par para subidas, vía primaria y rutas fuera de la ciudad. Requiere licencia y placas.',
    specs: {
      autonomia: 110,
      velocidad: 80,
      carga: 6,
      motor: 3000,
      cargaUtil: 180,
      bateria: 'Litio 72V 40Ah',
    },
    puntos: [
      'Motor de 3000 W con par inmediato para pendientes',
      'Frenos de disco delantero y trasero',
      'Suspensión invertida y llantas de tacos para terracería',
    ],
    ilustracion: { parabrisas: false, parrilla: false, caja: false, dobleBateria: true, deportiva: true },
    colores: [{ id: 'grafito', nombre: 'Grafito y lima', hex: '#1f2125' }],
    fotos: { grafito: '/modelos/fotos/x-grafito.webp' },
    // Sin foto de la unidad todavía: imagen de la lámina de marca.
    fotoReferencia: true,
  },
  {
    id: 'gt',
    nombre: 'GT',
    tagline: 'Sin límites',
    perfil: 'autonomia',
    perfilLabel: 'Larga distancia',
    // Futura gama superior: sin precio publicado todavía.
    precio: null,
    proximamente: true,
    destacado: 'Próximamente',
    requiereLicencia: true,
    resumen:
      'La futura gama superior de yolt: scooter grande, cómodo para dos y con la mayor autonomía de la marca. Déjanos tus datos y te avisamos primero cuando llegue.',
    specs: {
      autonomia: 140,
      velocidad: 95,
      carga: 6,
      motor: 4000,
      cargaUtil: 190,
      bateria: 'Litio 72V 50Ah',
    },
    puntos: [
      'La mayor autonomía de la gama',
      'Parabrisas alto y asiento amplio para viajar en pareja',
      'Ficha preliminar: puede cambiar al lanzamiento',
    ],
    ilustracion: { parabrisas: true, parrilla: true, caja: false, dobleBateria: false, deportiva: true },
    colores: [{ id: 'blanco', nombre: 'Blanco perla', hex: '#e7e6ea' }],
    fotos: { blanco: '/modelos/fotos/gt-blanco.webp' },
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
  { id: 'trabajo', label: 'Ciudad y reparto' },
  { id: 'potencia', label: 'Potencia' },
  { id: 'autonomia', label: 'Larga distancia' },
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
      'Depende del modelo. yolt ONE y CITY se mantienen dentro del límite de potencia y velocidad que suele clasificarse como ciclomotor y no exigen licencia tipo M. yolt X y GT sí requieren licencia tipo M y placas. Tu distribuidor te entrega la factura y el certificado de origen, que es lo que necesitas para inscribir el vehículo ante la SAT.',
  },
  {
    id: 'carga-departamento',
    pregunta: 'Vivo en un apartamento, ¿dónde la cargo?',
    respuesta:
      'Por eso la batería es extraíble en yolt ONE y CITY. Pesa entre 11 y 14 kg, la desmontas con llave, la subes y la conectas a un contacto normal de 120 V. No necesitas instalación especial. yolt X y GT llevan batería fija de mayor capacidad y se cargan con la moto estacionada.',
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
