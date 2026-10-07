import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Lleva a la sección indicada en la URL (#flotillas, #garantia) al
 * navegar. ScrollRestoration del router solo restaura posiciones, no
 * resuelve anclas.
 */
export function useScrollAHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const destino = document.getElementById(decodeURIComponent(hash.slice(1)))
    destino?.scrollIntoView({ block: 'start' })
  }, [pathname, hash])
}
