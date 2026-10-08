import { CircleDot, ShieldCheck, Wallet, Wrench } from 'lucide-react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Revelar from '../../../shared/components/ui/Revelar.jsx'
import SpotlightCard from '../../../shared/components/reactbits/SpotlightCard/SpotlightCard.jsx'
import TituloSeccion from '../../../shared/components/ui/TituloSeccion.jsx'

/**
 * Las cuatro objeciones que frenan la compra, respondidas antes de que el
 * cliente las formule. Tarjetas con luz que sigue al cursor (React Bits ·
 * SpotlightCard) en una rejilla asimétrica: el ahorro, que es el argumento
 * más fuerte, ocupa el doble.
 */
const RAZONES = [
  {
    icono: Wallet,
    titulo: 'Una fracción del costo por kilómetro',
    texto:
      'Alrededor de 5 centavos de quetzal por kilómetro en energía, frente a casi 30 en gasolina. En un año de uso diario, la diferencia cubre buena parte de la inversión.',
    ancha: true,
  },
  {
    icono: CircleDot,
    titulo: 'Frenos de disco',
    texto: 'Disco delantero y trasero y rines de aluminio en toda la gama.',
  },
  {
    icono: Wrench,
    titulo: 'Mantenimiento mínimo',
    texto: 'Sin aceite, filtros, bujías ni embrague. El servicio se limita a frenos, llantas y suspensión.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Garantía y respaldo',
    texto:
      'Dos años de garantía en motor, estructura y batería. Respaldo de una red de distribuidores autorizados en Guatemala.',
    ancha: true,
  },
]

export default function Razones() {
  return (
    <section aria-labelledby="razones-titulo" className="bg-lienzo-alto py-24 text-tinta sm:py-32">
      <Contenedor>
        <TituloSeccion id="razones-titulo" indice="03" etiqueta="Por qué eléctrica">
          Lo que cambia cuando dejas la gasolina
        </TituloSeccion>

        <Revelar grupo escalon={0.1} className="mt-14 grid gap-5 md:grid-cols-3">
          {RAZONES.map(({ icono: Icono, titulo, texto, ancha }) => (
            <Revelar.Item key={titulo} className={ancha ? 'md:col-span-2' : ''}>
              <SpotlightCard
                spotlightColor="rgba(214, 247, 21, 0.16)"
                className="h-full !rounded-[2px] !border-filete !bg-superficie"
              >
                <Icono className="h-8 w-8 text-lima-hondo" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-semibold">{titulo}</h3>
                <p className="mt-3 max-w-xl text-tinta-suave">{texto}</p>
              </SpotlightCard>
            </Revelar.Item>
          ))}
        </Revelar>
      </Contenedor>
    </section>
  )
}
