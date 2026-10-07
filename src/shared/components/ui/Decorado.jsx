import { Component } from 'react'

/**
 * Barrera para efectos decorativos (3D, WebGL, fondos animados).
 *
 * Si uno falla al dibujarse —navegador sin WebGL, tarjeta gráfica
 * bloqueada, archivo que no descargó— se muestra el `respaldo` (o nada)
 * y el resto de la página sigue funcionando. Un adorno nunca debe tumbar
 * la venta.
 */
export default class Decorado extends Component {
  state = { fallo: false }

  static getDerivedStateFromError() {
    return { fallo: true }
  }

  render() {
    return this.state.fallo ? (this.props.respaldo ?? null) : this.props.children
  }
}
