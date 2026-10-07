import { BatteryCharging, ShieldCheck, Wallet, Wrench } from 'lucide-react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Revelar from '../../../shared/components/ui/Revelar.jsx'
import { CURVA } from '../../../shared/lib/movimiento.js'
import { motion } from 'motion/react'

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

        <Revelar grupo escalon={0.1} className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {RAZONES.map(({ icono: Icono, titulo, texto }) => (
            <Revelar.Item key={titulo} className="flex gap-5">
              {/* El ícono llega un instante después que su texto, con un giro corto. */}
              <motion.span
                variants={{
                  oculto: { scale: 0.6, rotate: -20, opacity: 0 },
                  visible: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.6, ease: CURVA.expo, delay: 0.12 } },
                }}
                className="mt-1 shrink-0"
              >
                <Icono className="h-7 w-7 text-rojo" strokeWidth={1.75} aria-hidden="true" />
              </motion.span>
              <div>
                <h3 className="text-xl font-semibold">{titulo}</h3>
                <p className="mt-2 max-w-md text-grafito">{texto}</p>
              </div>
            </Revelar.Item>
          ))}
        </Revelar>
      </Contenedor>
    </section>
  )
}
