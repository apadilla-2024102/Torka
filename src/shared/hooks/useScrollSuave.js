import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useIntro } from '../components/intro/IntroContexto.jsx'
import { sinMovimiento } from './useMovimiento.js'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

/**
 * Scroll con inercia (Lenis), como en los sitios de estudio.
 *
 * Solo con mouse o trackpad: en pantallas táctiles el sistema ya tiene su
 * propia inercia y reemplazarla se siente peor. Tampoco si el sitio obedece
 * "reducir movimiento" (ver useMovimiento.js). No hay saltos forzados ni secciones que atrapen el scroll:
 * solo suaviza la rueda del mouse.
 *
 * Sincronizado con GSAP ScrollTrigger (el manifiesto) y con el router:
 * al cambiar de página se alinea con la posición que fija el router.
 */
export function useScrollSuave() {
  const { pathname } = useLocation()

  useEffect(() => {
    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducir = sinMovimiento()
    if (!conMouse || reducir) return

    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 })
    lenis.on('scroll', ScrollTrigger.update)
    const tic = (tiempo) => lenis.raf(tiempo * 1000)
    gsap.ticker.add(tic)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tic)
      lenis.destroy()
      lenis = null
    }
  }, [])

  // Las posiciones de los disparadores se miden con la página ya
  // completa: al abrirse la cortina y cuando terminan de llegar las
  // tipografías (cambian el alto de los titulares). Medidas viejas hacían
  // que una animación se disparara antes o nunca.
  const { lista } = useIntro()
  useEffect(() => {
    if (!lista) return
    let vivo = true
    const medir = () => vivo && ScrollTrigger.refresh()
    const marco = requestAnimationFrame(medir)
    document.fonts?.ready.then(medir)
    const tarde = setTimeout(medir, 1500)
    return () => {
      vivo = false
      cancelAnimationFrame(marco)
      clearTimeout(tarde)
    }
  }, [lista])

  // Al navegar, el router mueve el scroll: Lenis toma esa posición como
  // propia en lugar de animar de regreso a la anterior.
  useEffect(() => {
    if (!lenis) return
    const marco = requestAnimationFrame(() => {
      lenis.resize()
      lenis.scrollTo(window.scrollY, { immediate: true, force: true })
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(marco)
  }, [pathname])
}
