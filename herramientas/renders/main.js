import { crearEstudio, VISTA_CATALOGO } from '../../src/shared/components/brand/moto3d/estudio.js'
import { MOCK_MODELOS } from '../../src/shared/api/mockData.js'

/**
 * Dibuja un modelo en un color y devuelve la imagen como data URL WebP
 * con fondo transparente. scripts/generar-renders.mjs llama a
 * window.renderizar() para cada combinación y guarda los archivos.
 */
const ANCHO = 1320
const ALTO = 810 // misma proporción 44:27 que la silueta

const estudio = crearEstudio(document.getElementById('lienzo'), { preservarBuffer: true })
estudio.ajustarTamano(ANCHO, ALTO, 1)

window.modelos = MOCK_MODELOS.map((m) => ({ id: m.id, colores: m.colores.map((c) => c.id) }))

window.renderizar = (modeloId, colorId, vista = VISTA_CATALOGO, formato = 'image/webp') => {
  const modelo = MOCK_MODELOS.find((m) => m.id === modeloId)
  const color = modelo.colores.find((c) => c.id === colorId)
  estudio.ponerMoto(modelo.ilustracion, color.hex)
  estudio.orbitar(vista.azimut, vista.elevacion)
  estudio.render()
  return estudio.renderer.domElement.toDataURL(formato, 0.9)
}

window.listo = true
