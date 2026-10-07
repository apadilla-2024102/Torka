import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * Moto eléctrica yolt construida por código con piezas reales: llantas,
 * rines, disco de freno, horquilla, manubrio, asiento, faro LED y una
 * carrocería con laca automotriz.
 *
 * No usa modelos descargados: todo sale del mismo perfil lateral que la
 * silueta SVG (MotoSilueta.jsx), así la silueta, los renders y el visor
 * 3D muestran la misma moto. Es un diseño original y genérico.
 *
 * Unidades: 1 = 100 px del perfil SVG (la moto mide ~3.3 de largo).
 * Ejes: X hacia el frente, Y hacia arriba, Z hacia el lado derecho.
 */

// Perfil SVG (x, y con y hacia abajo y piso en 250) a coordenadas 3D.
const P = (x, y) => [(x - 220) / 100, (250 - y) / 100]

/** Traduce comandos M/L/Q del perfil SVG a un THREE.Shape. */
function forma(comandos) {
  const s = new THREE.Shape()
  for (const [op, ...n] of comandos) {
    if (op === 'M') s.moveTo(...P(n[0], n[1]))
    if (op === 'L') s.lineTo(...P(n[0], n[1]))
    if (op === 'Q') s.quadraticCurveTo(...P(n[0], n[1]), ...P(n[2], n[3]))
  }
  s.closePath()
  return s
}

/** Pieza extruida a lo ancho (Z), centrada y con cantos redondeados. */
function extruir(shape, ancho, redondeo, material) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(ancho - redondeo * 2, 0.01),
    bevelEnabled: true,
    bevelThickness: redondeo,
    bevelSize: redondeo * 0.8,
    bevelSegments: 16,
    curveSegments: 24,
  })
  geo.translate(0, 0, -(ancho - redondeo * 2) / 2)
  geo.computeVertexNormals()
  return malla(geo, material)
}

function malla(geo, material) {
  const m = new THREE.Mesh(geo, material)
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Cilindro entre dos puntos (para horquilla, tubos y barras). */
function tubo(a, b, radio, material, segmentos = 20) {
  const inicio = new THREE.Vector3(...a)
  const fin = new THREE.Vector3(...b)
  const largo = inicio.distanceTo(fin)
  const geo = new THREE.CylinderGeometry(radio, radio, largo, segmentos)
  const m = malla(geo, material)
  m.position.copy(inicio).lerp(fin, 0.5)
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), fin.clone().sub(inicio).normalize())
  return m
}

// ---------- Perfiles de cada pieza (mismas coordenadas que el SVG) ----------

const PERFIL_COLA = [
  ['M', 46, 150], ['Q', 46, 138, 60, 136], ['L', 210, 134], ['Q', 226, 134, 230, 150],
  ['L', 236, 180], ['L', 196, 188], ['Q', 150, 192, 128, 182], ['L', 114, 170],
  ['L', 74, 170], ['Q', 46, 168, 46, 150],
]

const PERFIL_ESCUDO = [
  ['M', 262, 182], ['Q', 276, 180, 279, 166], ['L', 290, 118], ['Q', 294, 98, 314, 94],
  ['L', 334, 90], ['Q', 352, 88, 356, 106], ['L', 362, 134], ['Q', 344, 136, 336, 150],
  ['L', 326, 176], ['Q', 316, 196, 292, 198], ['L', 262, 198],
]

const PERFIL_PISO = [
  ['M', 190, 182], ['L', 300, 182], ['L', 300, 198], ['L', 196, 200], ['Q', 166, 200, 156, 194],
]

const PERFIL_ASIENTO = [
  ['M', 70, 137], ['Q', 72, 116, 98, 114], ['L', 200, 112], ['Q', 220, 112, 222, 128], ['L', 222, 137],
]

const PERFIL_FALDON = [
  ['M', 114, 170], ['L', 236, 172], ['L', 238, 184], ['L', 196, 190], ['Q', 150, 194, 128, 184],
]

/** Materiales compartidos por todas las motos. */
export function crearMateriales(colorHex) {
  return {
    pintura: new THREE.MeshPhysicalMaterial({
      color: colorHex,
      // Laca automotriz: color sólido debajo, barniz brillante encima.
      metalness: 0.02,
      roughness: 0.38,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    }),
    plasticoMate: new THREE.MeshStandardMaterial({ color: '#232428', roughness: 0.78, metalness: 0.05 }),
    plasticoSatin: new THREE.MeshStandardMaterial({ color: '#2d2e33', roughness: 0.5, metalness: 0.1 }),
    piel: new THREE.MeshStandardMaterial({ color: '#1b1b1e', roughness: 0.68, metalness: 0 }),
    hule: new THREE.MeshStandardMaterial({ color: '#151517', roughness: 0.92, metalness: 0 }),
    aluminio: new THREE.MeshStandardMaterial({ color: '#b8bcc4', roughness: 0.28, metalness: 0.95 }),
    aceroOscuro: new THREE.MeshStandardMaterial({ color: '#3a3c42', roughness: 0.35, metalness: 0.85 }),
    disco: new THREE.MeshStandardMaterial({ color: '#d4d7dd', roughness: 0.22, metalness: 1 }),
    rojoMarca: new THREE.MeshStandardMaterial({ color: '#c5f230', roughness: 0.4, metalness: 0.2 }),
    senal: new THREE.MeshStandardMaterial({
      color: '#c5f230',
      roughness: 0.35,
      emissive: '#c5f230',
      emissiveIntensity: 0.25,
    }),
    faro: new THREE.MeshStandardMaterial({ color: '#fff7dc', emissive: '#fff3c4', emissiveIntensity: 2.2 }),
    piloto: new THREE.MeshStandardMaterial({ color: '#ff2a32', emissive: '#e31019', emissiveIntensity: 1.6 }),
    cristal: new THREE.MeshPhysicalMaterial({
      color: '#c9d6e4',
      roughness: 0.04,
      metalness: 0,
      transparent: true,
      opacity: 0.32,
      clearcoat: 1,
      side: THREE.DoubleSide,
    }),
    cristalOscuro: new THREE.MeshPhysicalMaterial({
      color: '#1e2126',
      roughness: 0.05,
      transparent: true,
      opacity: 0.75,
      clearcoat: 1,
      side: THREE.DoubleSide,
    }),
  }
}

/** Rueda completa: llanta con perfil, rin de 5 rayos, buje y opcionalmente disco. */
function rueda(m, { conDisco = false, conMotor = false } = {}) {
  const g = new THREE.Group()

  // Llanta: perfil de goma girado alrededor del eje (más real que un toro).
  const perfil = []
  for (let i = 0; i <= 24; i++) {
    const t = (i / 24) * Math.PI * 2
    perfil.push(new THREE.Vector2(0.385 + Math.cos(t) * 0.075, Math.sin(t) * 0.085))
  }
  const llanta = malla(new THREE.LatheGeometry(perfil, 64), m.hule)
  llanta.rotation.x = Math.PI / 2
  g.add(llanta)

  // Rin: aro exterior, rayos y buje.
  const aro = malla(new THREE.TorusGeometry(0.315, 0.022, 12, 64), m.aluminio)
  g.add(aro)
  const aroInterior = malla(new THREE.CylinderGeometry(0.31, 0.31, 0.11, 64, 1, true), m.aceroOscuro)
  aroInterior.rotation.x = Math.PI / 2
  g.add(aroInterior)

  for (let i = 0; i < 5; i++) {
    const rayo = malla(new RoundedBoxGeometry(0.05, 0.27, 0.035, 2, 0.012), m.aluminio)
    rayo.position.y = 0.165
    const pivote = new THREE.Group()
    pivote.rotation.z = (i / 5) * Math.PI * 2
    pivote.add(rayo)
    g.add(pivote)
  }

  const buje = malla(
    new THREE.CylinderGeometry(conMotor ? 0.16 : 0.07, conMotor ? 0.16 : 0.07, conMotor ? 0.16 : 0.13, 40),
    conMotor ? m.aceroOscuro : m.aluminio,
  )
  buje.rotation.x = Math.PI / 2
  g.add(buje)

  if (conDisco) {
    const disco = malla(new THREE.CylinderGeometry(0.2, 0.2, 0.008, 64), m.disco)
    disco.rotation.x = Math.PI / 2
    disco.position.z = 0.085
    g.add(disco)
    const caliper = malla(new RoundedBoxGeometry(0.1, 0.13, 0.05, 2, 0.015), m.rojoMarca)
    caliper.position.set(-0.13, 0.13, 0.095)
    caliper.rotation.z = 0.8
    g.add(caliper)
  }
  return g
}

/**
 * Arma la moto completa.
 * @param rasgos  { parabrisas, parrilla, caja, dobleBateria, deportiva }
 * @returns { grupo, materiales }  — cambia el color con materiales.pintura.color
 */
export function construirMoto(rasgos = {}, colorHex = '#c5f230') {
  const m = crearMateriales(colorHex)
  const moto = new THREE.Group()

  // --- Carrocería pintada ---
  moto.add(extruir(forma(PERFIL_COLA), 0.44, 0.12, m.pintura))
  moto.add(extruir(forma(PERFIL_ESCUDO), 0.48, 0.16, m.pintura))
  // Faldón inferior oscuro: da volumen y separa la pintura del piso.
  moto.add(extruir(forma(PERFIL_FALDON), 0.4, 0.08, m.plasticoSatin))
  // Piso con tapete de hule.
  moto.add(extruir(forma(PERFIL_PISO), 0.36, 0.03, m.plasticoMate))
  const tapete = malla(new RoundedBoxGeometry(1.02, 0.012, 0.3, 2, 0.005), m.hule)
  tapete.position.set(...P(245, 181), 0)
  moto.add(tapete)

  // --- Asiento acolchado ---
  const asiento = extruir(forma(PERFIL_ASIENTO), 0.36, 0.1, m.piel)
  asiento.position.y = 0.005
  moto.add(asiento)
  // Costura en color de marca, visible en el perfil.
  const costura = malla(new RoundedBoxGeometry(1.36, 0.012, 0.35, 2, 0.005), m.rojoMarca)
  costura.position.set(...P(146, 128), 0)
  moto.add(costura)

  // --- Batería: el amarillo de carril marca la energía, igual que en el sitio ---
  const celdas = rasgos.dobleBateria ? [148, 194] : [170]
  for (const x of celdas) {
    for (const lado of [1, -1]) {
      const marco = malla(new RoundedBoxGeometry(0.4, 0.07, 0.02, 2, 0.01), m.plasticoMate)
      marco.position.set(...P(x + 20, 156), lado * 0.222)
      const tira = malla(new RoundedBoxGeometry(0.34, 0.022, 0.02, 2, 0.008), m.senal)
      tira.position.set(...P(x + 20, 156), lado * 0.23)
      moto.add(marco, tira)
    }
  }

  // --- Ruedas ---
  const trasera = rueda(m, { conMotor: true })
  trasera.position.set(...P(108, 204), 0)
  const delantera = rueda(m, { conDisco: true })
  delantera.position.set(...P(340, 204), 0)
  moto.add(trasera, delantera)

  // Guardabarros delantero pintado.
  const guarda = malla(
    new THREE.TorusGeometry(0.47, 0.05, 10, 32, Math.PI * 0.42),
    m.pintura,
  )
  guarda.scale.z = 2.4
  guarda.position.set(...P(340, 204), 0)
  guarda.rotation.z = Math.PI * 0.32
  moto.add(guarda)

  // --- Basculante con motor en el buje trasero y amortiguador ---
  for (const lado of [1, -1]) {
    moto.add(tubo([...P(108, 204), lado * 0.12], [...P(200, 186), lado * 0.12], 0.035, m.aceroOscuro))
  }
  const amortiguador = tubo([...P(118, 198), 0.13], [...P(150, 158), 0.13], 0.03, m.aluminio)
  const resorte = tubo([...P(122, 192), 0.13], [...P(144, 166), 0.13], 0.05, rasgos.deportiva ? m.rojoMarca : m.aceroOscuro)
  moto.add(amortiguador, resorte)

  // --- Horquilla, columna y manubrio ---
  for (const lado of [1, -1]) {
    moto.add(tubo([...P(340, 204), lado * 0.13], [...P(318, 116), lado * 0.13], 0.032, m.aluminio))
  }
  moto.add(tubo([...P(318, 116), 0], [...P(306, 74), 0], 0.04, m.aceroOscuro))
  const manubrio = tubo([...P(300, 68), -0.36], [...P(300, 68), 0.36], 0.022, m.aceroOscuro)
  moto.add(manubrio)
  for (const lado of [1, -1]) {
    moto.add(tubo([...P(300, 68), lado * 0.25], [...P(300, 68), lado * 0.4], 0.032, m.hule))
    // Espejos
    moto.add(tubo([...P(302, 68), lado * 0.26], [...P(296, 50), lado * 0.4], 0.012, m.aceroOscuro))
    const espejo = malla(new THREE.SphereGeometry(0.075, 24, 16), m.plasticoMate)
    espejo.scale.set(0.35, 0.62, 1.25)
    espejo.position.set(...P(295, 46), lado * 0.43)
    moto.add(espejo)
  }
  // Tablero digital.
  const tablero = malla(new RoundedBoxGeometry(0.06, 0.12, 0.22, 2, 0.02), m.cristalOscuro)
  tablero.position.set(...P(306, 76), 0)
  tablero.rotation.z = -0.5
  moto.add(tablero)

  // --- Faro LED y piloto ---
  const faro = malla(new THREE.SphereGeometry(0.1, 32, 16), m.faro)
  // El canto redondeado ensancha el carenado ~0.13: el faro va por fuera.
  faro.scale.set(0.45, 0.8, 1.8)
  faro.position.set(...P(370, 112), 0)
  moto.add(faro)
  for (const lado of [1, -1]) {
    const direccional = malla(new RoundedBoxGeometry(0.05, 0.03, 0.06, 2, 0.01), m.senal)
    direccional.position.set(...P(364, 140), lado * 0.2)
    moto.add(direccional)
  }
  const piloto = malla(new RoundedBoxGeometry(0.05, 0.08, 0.3, 2, 0.015), m.piloto)
  piloto.position.set(...P(34, 150), 0)
  moto.add(piloto)

  // --- Rasgos por modelo ---
  if (rasgos.parabrisas) moto.add(parabrisas(m.cristal, 0.62, 0.52, [...P(326, 76)], -0.35))
  if (rasgos.deportiva) moto.add(parabrisas(m.cristalOscuro, 0.24, 0.34, [...P(338, 86)], -0.7))

  if (rasgos.parrilla) {
    for (const lado of [1, -1]) {
      moto.add(tubo([...P(40, 126), lado * 0.16], [...P(110, 126), lado * 0.16], 0.016, m.aceroOscuro))
      moto.add(tubo([...P(60, 126), lado * 0.16], [...P(70, 140), lado * 0.16], 0.014, m.aceroOscuro))
    }
    for (const x of [44, 70, 96]) {
      moto.add(tubo([...P(x, 126), -0.16], [...P(x, 126), 0.16], 0.012, m.aceroOscuro))
    }
  }

  if (rasgos.caja) {
    const caja = malla(new RoundedBoxGeometry(0.86, 0.64, 0.62, 4, 0.07), m.plasticoSatin)
    caja.position.set(...P(75, 92), 0)
    const reflejante = malla(new RoundedBoxGeometry(0.02, 0.06, 0.34, 2, 0.01), m.piloto)
    reflejante.position.set(...P(32, 92), 0)
    moto.add(caja, reflejante)
  }

  return { grupo: moto, materiales: m }
}

/** Pantalla curva: un plano doblado hacia atrás, en vez de un bloque. */
function parabrisas(material, alto, ancho, [x, y], inclinacion) {
  // Arco de cilindro centrado hacia el frente (+X): en CylinderGeometry
  // el ángulo π/2 apunta a +X, así que el arco va de π/2 - a a π/2 + a.
  const a = ancho / 2 / 0.9
  const geo = new THREE.CylinderGeometry(0.9, 0.9, alto, 24, 1, true, Math.PI / 2 - a, a * 2)
  const pantalla = malla(geo, material)
  pantalla.castShadow = false
  const g = new THREE.Group()
  pantalla.position.x = -0.9
  g.add(pantalla)
  g.position.set(x, y, 0)
  g.rotation.z = inclinacion
  return g
}

/** Libera la memoria de GPU de todo lo que cuelga de un objeto. */
export function liberar(objeto) {
  objeto.traverse((o) => {
    if (o.geometry) o.geometry.dispose()
    if (o.material) [].concat(o.material).forEach((mat) => mat.dispose())
  })
}
