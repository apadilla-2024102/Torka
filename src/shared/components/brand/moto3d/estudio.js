import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { construirMoto, liberar } from './construirMoto.js'

/**
 * Estudio fotográfico virtual: luz principal con sombra suave, reflejos
 * de un cuarto de estudio sobre la laca, y una sombra de contacto en el
 * piso. Fondo transparente para que la moto se asiente sobre la página.
 *
 * Lo comparten el visor interactivo (Moto3D.jsx) y el generador de
 * renders estáticos (herramientas/renders), así ambos se ven idénticos.
 */
export const VISTA_CATALOGO = { azimut: 0.32, elevacion: 0.16 }

export function crearEstudio(canvas, { preservarBuffer = false } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: preservarBuffer,
  })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.95
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const escena = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const entorno = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  escena.environment = entorno
  escena.environmentIntensity = 0.75

  // Luz principal desde arriba y adelante: dibuja el volumen de la carrocería.
  const principal = new THREE.DirectionalLight('#ffffff', 2.4)
  // Casi cenital, como en estudio: sombra corta que no se sale del piso.
  principal.position.set(1.2, 8, 2.2)
  principal.castShadow = true
  principal.shadow.mapSize.set(2048, 2048)
  principal.shadow.radius = 6
  principal.shadow.bias = -0.0004
  principal.shadow.normalBias = 0.025 // evita las rayas de autosombra sobre la laca
  Object.assign(principal.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 })
  escena.add(principal)

  // Contraluz frío: separa el borde de la moto del fondo oscuro.
  const contraluz = new THREE.DirectionalLight('#cfe0ff', 1.2)
  contraluz.position.set(-4, 3, -3)
  escena.add(contraluz)

  // Piso invisible que solo recibe la sombra.
  const piso = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ opacity: 0.32 }))
  piso.rotation.x = -Math.PI / 2
  piso.receiveShadow = true
  escena.add(piso)

  // Sombra de contacto: oscurece justo bajo las llantas, como en estudio.
  const contacto = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 0.95), new THREE.MeshBasicMaterial({
    map: texturaSombra(),
    transparent: true,
    depthWrite: false,
  }))
  contacto.rotation.x = -Math.PI / 2
  contacto.position.y = 0.002
  escena.add(contacto)

  const camara = new THREE.PerspectiveCamera(26, 1, 0.1, 50)
  const objetivo = new THREE.Vector3(0.02, 0.92, 0)

  let moto = null
  let materiales = null

  const api = {
    renderer,
    escena,
    camara,
    objetivo,
    /** Pone la moto del modelo indicado (reemplaza la anterior). */
    ponerMoto(rasgos, colorHex) {
      if (moto) {
        escena.remove(moto)
        liberar(moto)
      }
      const armada = construirMoto(rasgos, colorHex)
      moto = armada.grupo
      materiales = armada.materiales
      escena.add(moto)
    },
    get materiales() {
      return materiales
    },
    /** Coloca la cámara en órbita alrededor de la moto. */
    orbitar(azimut, elevacion, distancia = 5.7) {
      camara.position.set(
        objetivo.x + Math.sin(azimut) * Math.cos(elevacion) * distancia,
        objetivo.y + Math.sin(elevacion) * distancia,
        objetivo.z + Math.cos(azimut) * Math.cos(elevacion) * distancia,
      )
      camara.lookAt(objetivo)
    },
    ajustarTamano(ancho, alto, pixelRatio = Math.min(window.devicePixelRatio, 2)) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(ancho, alto, false)
      camara.aspect = ancho / alto
      camara.updateProjectionMatrix()
    },
    render() {
      renderer.render(escena, camara)
    },
    destruir() {
      if (moto) liberar(moto)
      liberar(escena)
      entorno.dispose()
      pmrem.dispose()
      renderer.dispose()
    },
  }
  return api
}

/**
 * Degradado radial para la sombra de contacto. El lienzo es cuadrado y el
 * degradado llega a transparente antes del borde: el plano lo estira en
 * elipse y no queda ningún canto recto visible desde ningún ángulo.
 */
function texturaSombra() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 126)
  g.addColorStop(0, 'rgba(0,0,0,0.55)')
  g.addColorStop(0.55, 'rgba(0,0,0,0.18)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}
