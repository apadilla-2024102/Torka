import { createContext, useCallback, useContext, useState } from 'react'

/**
 * ¿Ya terminó la pantalla de carga?
 *
 * La página se dibuja debajo desde el principio (así la imagen principal
 * empieza a descargar de inmediato), pero sus animaciones de entrada
 * esperan a que la cortina se abra; si no, ocurrirían a escondidas.
 */
const IntroContexto = createContext({ lista: true, terminar: () => {} })

/** Solo la primera visita de la sesión ve la pantalla de carga completa. */
const CLAVE = 'torka-intro-vista'

const yaVista = () => {
  try {
    return sessionStorage.getItem(CLAVE) === '1'
  } catch {
    return false
  }
}

export function IntroProveedor({ children }) {
  const [lista, setLista] = useState(yaVista)

  const terminar = useCallback(() => {
    try {
      sessionStorage.setItem(CLAVE, '1')
    } catch {
      // Sin almacenamiento (modo privado): la intro se verá de nuevo, no pasa nada.
    }
    setLista(true)
  }, [])

  return <IntroContexto.Provider value={{ lista, terminar }}>{children}</IntroContexto.Provider>
}

export const useIntro = () => useContext(IntroContexto)
