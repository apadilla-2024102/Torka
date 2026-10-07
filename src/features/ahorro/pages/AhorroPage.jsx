import EncabezadoPagina from '../../../shared/components/layout/EncabezadoPagina.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import LlamadoCotizar from '../../../shared/components/ui/LlamadoCotizar.jsx'
import CalculadoraAhorro from '../components/CalculadoraAhorro.jsx'

export default function AhorroPage() {
  return (
    <>
      <EncabezadoPagina
        titulo="Cuánto dejas de gastar al año"
        descripcion="Mueve los valores a tu realidad. Es mejor que compruebes el número con tus datos a que te demos una cifra que no se sostenga."
      />
      <Contenedor className="py-12 sm:py-16">
        <CalculadoraAhorro />
      </Contenedor>
      <LlamadoCotizar titulo="Convierte el ahorro en una cuota" texto="Te enviamos una cotización con enganche y plazo para comparar contra lo que hoy gastas en gasolina." />
    </>
  )
}
