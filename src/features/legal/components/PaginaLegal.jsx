import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import { useSeo } from '../../../shared/seo/useSeo.js'

export const ACTUALIZADO = '9 de octubre de 2026'

/**
 * Plantilla de las páginas legales: título, fecha de actualización e
 * índice de secciones; cada sección es { id, titulo, contenido }.
 *
 * IMPORTANTE: los textos son una base redactada para Guatemala. Revísalos
 * con un abogado antes de publicar y completa los datos legales en
 * src/shared/config/negocio.js.
 */
export default function PaginaLegal({ titulo, descripcion, intro, secciones }) {
  useSeo({ titulo, descripcion })

  return (
    <article className="bg-lienzo pt-32 pb-24 text-tinta sm:pt-36">
      <Contenedor className="max-w-3xl">
        <p className="tipo-etiqueta text-tinta-suave">Información legal</p>
        <h1 className="tipo-ruta mt-4 text-[clamp(2.6rem,6vw,4.2rem)]">{titulo}</h1>
        <p className="mt-3 text-sm text-tinta-suave">Última actualización: {ACTUALIZADO}</p>
        <div className="mt-8 text-lg leading-relaxed text-tinta-suave">{intro}</div>

        <nav aria-label="Contenido" className="mt-10 border-y border-filete py-6">
          <ol className="grid gap-2 text-tinta-suave sm:grid-cols-2">
            {secciones.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="underline-offset-4 hover:text-tinta hover:underline">
                  <span className="tipo-tablero mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {s.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {secciones.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="mt-12 scroll-mt-28">
            <h2 id={`${s.id}-t`} className="tipo-ruta text-[1.9rem]">
              <span className="tipo-tablero mr-3 align-middle text-base text-lima-hondo">{String(i + 1).padStart(2, '0')}</span>
              {s.titulo}
            </h2>
            <div className="legal-cuerpo mt-4 space-y-4 leading-relaxed text-tinta-suave">{s.contenido}</div>
          </section>
        ))}
      </Contenedor>
    </article>
  )
}
