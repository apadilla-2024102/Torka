import { BatteryCharging, ShieldCheck, Wallet, Wrench } from 'lucide-react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'

/**
 * Las cuatro objeciones que frenan la compra, respondidas antes de que
 * el cliente las formule. No van numeradas: no son una secuencia.
 */
const RAZONES = [
  {
    icono: Wallet,
    titulo: 'Cuesta una fracción de moverla',
    texto: 'Unos 5 centavos de quetzal por kilómetro en luz contra casi 30 en gasolina. En un año de uso diario la diferencia paga buena parte de la moto.',
  },
  {
    icono: BatteryCharging,
    titulo: 'La batería sube contigo',
    texto: 'Se desmonta con llave, pesa 11 kg y se carga en cualquier contacto de 120 V. No necesitas garaje ni instalación especial.',
  },
  {
    icono: Wrench,
    titulo: 'No hay nada que afinar',
    texto: 'Sin aceite, filtros, bujías ni clutch. El mantenimiento se reduce a frenos, llantas y suspensión: menos días en el taller.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Respaldo que puedes verificar',
    texto: 'Dos años en motor y estructura, tres en batería y repuestos garantizados por siete años. Con una marca nueva, lo que importa es no quedarse sin repuesto.',
  },
]

export default function Razones() {
  return (
    <section aria-labelledby="razones-titulo" className="bg-white py-20 sm:py-28">
      <Contenedor>
        <h2 id="razones-titulo" className="tipo-ruta max-w-2xl text-[clamp(2rem,5vw,3.25rem)]">
          Lo que cambia cuando dejas la gasolina
        </h2>

        <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {RAZONES.map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo} className="flex gap-5">
              <Icono className="mt-1 h-7 w-7 shrink-0 text-rojo" strokeWidth={1.75} aria-hidden="true" />
              <div>
                <h3 className="text-xl font-semibold">{titulo}</h3>
                <p className="mt-2 max-w-md text-grafito">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </Contenedor>
    </section>
  )
}
