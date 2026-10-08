/**
 * Datos de ejemplo de yolt.
 *
 * Se usan mientras no exista un backend (variable VITE_API_URL vacía).
 * Fichas técnicas: cotización del fabricante (260901). Precios en quetzales
 * (GTQ), garantías y distribuidores son de
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
    // Sin precio publicado todavía: el sitio muestra "Precio a consultar".
    precio: null,
    destacado: 'Ideal para iniciar',
    requiereLicencia: false,
    resumen:
      'La puerta de entrada a lo eléctrico: ligera, fácil de manejar y con respaldo para el acompañante. Para casa, oficina y mandados sin volver a pasar por la gasolinera.',
    // Ficha del fabricante (cotización 260901).
    specs: {
      autonomia: 70,
      velocidad: 50,
      motor: 1000,
      bateria: 'Plomo-ácido 60V 20Ah',
      frenos: 'Disco delantero y trasero',
      llantas: 'Aluminio 10" delantera y trasera',
    },
    puntos: [
      'Frenos de disco delantero y trasero',
      'Respaldo para el acompañante y faro LED',
      'No requiere licencia tipo M',
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
    precio: null,
    destacado: 'Más vendida',
    requiereLicencia: true,
    resumen:
      'Chasis con defensa de acero, baúl trasero y plataforma amplia. Para moverte todos los días por la ciudad, hacer mensajería o reparto, y que cada quetzal que antes iba a combustible se quede contigo.',
    specs: {
      autonomia: 90,
      velocidad: 85,
      motor: 3000,
      bateria: 'Litio 72V 30Ah',
      frenos: 'Disco delantero y trasero',
      llantas: 'Aluminio 12" delantera, 10" trasera',
    },
    puntos: [
      'Motor de 3,000 W y hasta 85 km/h',
      'Defensa de acero y baúl trasero',
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
      'La gama superior de yolt: scooter grande con motor de 5,000 W, cómodo para dos y con la mayor autonomía de la marca. Déjanos tus datos y te avisamos primero cuando llegue.',
    specs: {
      autonomia: 130,
      velocidad: 95,
      motor: 5000,
      bateria: 'Litio 72V 48Ah',
      frenos: 'Disco delantero y trasero',
      llantas: 'Aluminio 13" delantera, 12" trasera',
    },
    puntos: [
      'Motor de 5,000 W y hasta 95 km/h',
      'La mayor autonomía de la gama: 130 km',
      'Parabrisas alto y baúl trasero',
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
  { key: 'bateria', label: 'Batería', unidad: '', mejor: null },
  { key: 'frenos', label: 'Frenos', unidad: '', mejor: null },
  { key: 'llantas', label: 'Rines', unidad: '', mejor: null },
]

export const PERFILES = [
  { id: 'todos', label: 'Todos' },
  { id: 'ciudad', label: 'Ciudad' },
  { id: 'trabajo', label: 'Ciudad y reparto' },
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
      'Depende del modelo. yolt ONE (1,000 W y 50 km/h) se mantiene dentro del límite que suele clasificarse como ciclomotor y no exige licencia tipo M. yolt CITY y GT sí requieren licencia tipo M y placas. Tu distribuidor te entrega la factura y el certificado de origen, que es lo que necesitas para inscribir el vehículo ante la SAT.',
  },
  {
    id: 'carga-departamento',
    pregunta: 'Vivo en un apartamento, ¿dónde la cargo?',
    respuesta:
      'Se carga en un tomacorriente doméstico con su cargador, sin instalación especial: en el parqueo, la cochera o el sótano de tu edificio. Si no tienes un tomacorriente cerca de donde estacionas, tu asesor te orienta para instalar uno.',
  },
  {
    id: 'vida-bateria',
    pregunta: '¿Cuánto dura la batería antes de perder capacidad?',
    respuesta:
      'Depende del tipo de batería. yolt CITY y GT usan litio, que conserva la mayor parte de su capacidad durante varios años de uso diario. yolt ONE usa plomo-ácido: es más económica y su vida útil es menor. En ambos casos la batería tiene garantía propia y se puede reemplazar sin cambiar la moto.',
  },
  {
    id: 'lluvia',
    pregunta: '¿Qué pasa si me agarra la lluvia?',
    respuesta:
      'Están diseñadas para uso diario en la calle, con lluvia incluida. Lo que ninguna moto tolera, eléctrica o de gasolina, es quedar sumergida. Puedes lavarla con manguera normal; evita la hidrolavadora directa sobre conectores y tablero.',
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
