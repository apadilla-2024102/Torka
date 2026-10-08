import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { escalonar, lineaMascara, subir } from '../../../shared/lib/movimiento.js'
import { getModeloPorId, getModelos } from '../../../shared/api/modelosApi.js'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import LlamadoCotizar from '../../../shared/components/ui/LlamadoCotizar.jsx'
import { enlaceWhatsApp } from '../../../shared/config/negocio.js'
import { precioModelo } from '../../../shared/lib/formato.js'
import SelectorColor from '../components/SelectorColor.jsx'
import FichaTecnica from '../components/FichaTecnica.jsx'
import CuotaEstimada from '../components/CuotaEstimada.jsx'
import VisorModelo from '../components/VisorModelo.jsx'
import { useIntro } from '../../../shared/components/intro/IntroContexto.jsx'

export const modeloDetalleLoader = async ({ params }) => {
  const [modelo, modelos] = await Promise.all([getModeloPorId(params.id), getModelos()])
  if (!modelo) throw new Response('Modelo no encontrado', { status: 404 })
  return { modelo, otros: modelos.filter((m) => m.id !== modelo.id) }
}

export default function ModeloDetallePage() {
  const { modelo, otros } = useLoaderData()
  const { lista } = useIntro()
  // El color elegido vive en la URL y viaja a la cotización.
  const [params, setParams] = useSearchParams()
  const colorId = modelo.colores.some((c) => c.id === params.get('color'))
    ? params.get('color')
    : modelo.colores[0].id

  const cambiarColor = (id) => setParams({ color: id }, { replace: true, preventScrollReset: true })

  return (
    <>
      <section className="bg-lienzo pt-28 pb-14 text-tinta sm:pt-32 sm:pb-20">
        <Contenedor>
          <nav aria-label="Ruta de navegación" className="text-tinta-suave">
            <Link to="/modelos" viewTransition className="underline-offset-4 hover:text-tinta hover:underline">
              Modelos
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-tinta" aria-current="page">
              {modelo.nombre}
            </span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div className="rounded-[2px] border border-filete bg-lienzo-alto p-4 sm:p-8">
              <VisorModelo modelo={modelo} colorId={colorId} />
            </div>

            {/* Al llegar o cambiar de modelo, el nombre sube con máscara y el
                resto de la columna lo sigue en ola. */}
            <motion.div key={modelo.id} initial="oculto" animate={lista ? 'visible' : 'oculto'} variants={escalonar(0.05, 0.08)}>
              <motion.p variants={subir} className="text-tinta-suave">
                {modelo.perfilLabel}
              </motion.p>
              <h1 className="tipo-ruta mt-1 overflow-hidden pb-[0.08em] text-[clamp(3rem,8vw,5.5rem)]">
                <motion.span variants={lineaMascara} className="block">
                  {modelo.nombre}
                </motion.span>
              </h1>
              <motion.p variants={subir} className="mt-3 text-xl text-tinta-suave">
                {modelo.tagline}
              </motion.p>

              <motion.p variants={subir} className="mt-8">
                <span className="tipo-tablero text-5xl">{precioModelo(modelo)}</span>
                <span className="mt-1 block text-sm text-tinta-suave">
                  {modelo.proximamente
                    ? 'Futura gama superior. Te avisamos primero cuando llegue.'
                    : 'Precio de lista, sin placas ni seguro'}
                </span>
              </motion.p>

              <motion.div variants={subir} className="mt-8">
                <SelectorColor
                  colores={modelo.colores}
                  activo={colorId}
                  onCambiar={cambiarColor}
                  nombreGrupo={`color-${modelo.id}`}
                />
              </motion.div>

              <motion.div variants={subir} className="mt-9 flex flex-wrap gap-3">
                <Boton to={`/cotizar?modelo=${modelo.id}&color=${colorId}`}>
                  {modelo.proximamente ? 'Avísame cuando llegue' : `Cotizar la ${modelo.nombre}`}
                </Boton>
                <Boton
                  href={enlaceWhatsApp(`Hola, me interesa la yolt ${modelo.nombre}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variante="secundario"
                  sobreLienzo
                >
                  Preguntar por WhatsApp
                </Boton>
              </motion.div>
            </motion.div>
          </div>
        </Contenedor>
      </section>

      <Contenedor className="grid gap-16 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="ficha-titulo">
          <h2 id="ficha-titulo" className="tipo-ruta text-3xl">
            Ficha técnica
          </h2>
          <p className="mt-3 max-w-xl text-tinta-suave">{modelo.resumen}</p>
          <div className="mt-10">
            <FichaTecnica specs={modelo.specs} />
          </div>
        </section>

        <section aria-labelledby="incluye-titulo">
          <h2 id="incluye-titulo" className="tipo-ruta text-3xl">
            Lo que la distingue
          </h2>
          <ul className="mt-8 space-y-4">
            {modelo.puntos.map((p) => (
              <li key={p} className="flex gap-3">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-lima-hondo" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-[2px] border border-filete bg-superficie p-5">
            {modelo.requiereLicencia
              ? 'Requiere licencia tipo M y placas. Sales del distribuidor con factura y certificado de origen para tramitarlas.'
              : 'No requiere licencia tipo M. Sales del distribuidor con factura y certificado de origen.'}
          </p>
        </section>
      </Contenedor>

      <Contenedor className="pb-20 sm:pb-24">
        {modelo.precio != null && <CuotaEstimada key={modelo.id} precio={modelo.precio} />}
      </Contenedor>

      <Contenedor as="section" aria-labelledby="otros-titulo" className="pb-20 sm:pb-24">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="otros-titulo" className="text-2xl font-semibold">
            Otros modelos
          </h2>
          <Link to={`/comparar`} viewTransition className="font-semibold underline underline-offset-4">
            Comparar todos
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {otros.map((m) => (
            <li key={m.id}>
              <Link
                to={`/modelos/${m.id}`}
                viewTransition
                className="flex items-center gap-4 rounded-[2px] border border-filete bg-superficie p-4 transition-[border-color] duration-[330ms] hover:border-tinta/40"
              >
                <ModeloImagen modelo={m} className="aspect-[44/27] w-24 shrink-0" />
                <span>
                  <span className="block text-lg font-semibold">{m.nombre}</span>
                  <span className="tipo-tablero text-tinta-suave">{precioModelo(m)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Contenedor>

      <LlamadoCotizar modelo={modelo} titulo={`Prueba la ${modelo.nombre}`} />
    </>
  )
}
