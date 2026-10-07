import { BatteryCharging, ShieldCheck, Wallet, Wrench } from 'lucide-react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Revelar from '../../../shared/components/ui/Revelar.jsx'
import SpotlightCard from '../../../shared/components/reactbits/SpotlightCard/SpotlightCard.jsx'

/**
 * Las cuatro objeciones que frenan la compra, respondidas antes de que el
 * cliente las formule. Tarjetas con luz que sigue al cursor (React Bits ·
 * SpotlightCard) en una rejilla asimétrica: el ahorro, que es el argumento
 * más fuerte, ocupa el doble.
 */
const RAZONES = [
  {
    icono: Wallet,
    titulo: 'Cuesta una fracción de moverla',
    texto:
      'Unos 5 centavos de quetzal por kilómetro en luz contra casi 30 en gasolina. En un año de uso diario la diferencia paga buena parte de la moto.',
    ancha: true,
  },
  {
    icono: BatteryCharging,
    titulo: 'La batería sube contigo',
    texto: 'Se desmonta con llave, pesa 11 kg y se carga en cualquier contacto de 120 V.',
  },
  {
    icono: Wrench,
    titulo: 'No hay nada que afinar',
    texto: 'Sin aceite, filtros, bujías ni clutch. Solo frenos, llantas y suspensión.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Respaldo que puedes verificar',
    texto:
      'Dos años en motor y estructura, tres en batería y repuestos garantizados por siete años. Con una marca nueva, lo que importa es no quedarse sin repuesto.',
    ancha: true,
  },
]

export default function Razones() {
  return (
    <section aria-labelledby="razones-titulo" className="bg-asfalto py-24 text-papel sm:py-32">
      <Contenedor>
        <h2 id="razones-titulo" className="tipo-ruta max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)]">
          Lo que cambia cuando dejas la gasolina
        </h2>

        <Revelar grupo escalon={0.1} className="mt-14 grid gap-5 md:grid-cols-3">
          {RAZONES.map(({ icono: Icono, titulo, texto, ancha }) => (
            <Revelar.Item key={titulo} className={ancha ? 'md:col-span-2' : ''}>
              <SpotlightCard
                spotlightColor="rgba(197, 242, 48, 0.16)"
                className="h-full !rounded-[2px] !border-linea !bg-asfalto-alto"
              >
                <Icono className="h-8 w-8 text-lima" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-semibold">{titulo}</h3>
                <p className="mt-3 max-w-xl text-niebla">{texto}</p>
              </SpotlightCard>
            </Revelar.Item>
          ))}
        </Revelar>
      </Contenedor>
    </section>
  )
}
