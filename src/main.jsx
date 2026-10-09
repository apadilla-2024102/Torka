import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.jsx'
import './shared/styles/index.css'
import { iniciarAnalitica } from './shared/analitica/analitica.js'

iniciarAnalitica()

// Tras publicar una versión nueva, una pestaña abierta con la anterior pide
// archivos que ya no existen y la página no carga. Se recarga una sola vez
// para traer la versión vigente.
window.addEventListener('vite:preloadError', (evento) => {
  try {
    if (sessionStorage.getItem('yolt-recarga') === '1') return
    sessionStorage.setItem('yolt-recarga', '1')
  } catch {
    return
  }
  evento.preventDefault()
  window.location.reload()
})
// Si la página arrancó bien, se olvida la recarga (sin esperar al evento
// "load", que el navegador puede aplazar con conexión lenta).
setTimeout(() => {
  try {
    sessionStorage.removeItem('yolt-recarga')
  } catch {
    // Sin almacenamiento: no hay recarga automática, no pasa nada.
  }
}, 10000)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
