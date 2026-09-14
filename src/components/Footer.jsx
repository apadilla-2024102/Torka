const columnas = [
  {
    titulo: 'Gama',
    enlaces: [
      { label: 'Urbana', href: '#gama' },
      { label: 'Sierra', href: '#gama' },
      { label: 'Carga', href: '#gama' },
      { label: 'Sport', href: '#gama' },
    ],
  },
  {
    titulo: 'Comprar',
    enlaces: [
      { label: 'Comparar modelos', href: '#comparar' },
      { label: 'Calcular ahorro', href: '#ahorro' },
      { label: 'Distribuidores', href: '#distribuidores' },
      { label: 'Flotillas', href: '#distribuidores' },
    ],
  },
  {
    titulo: 'Soporte',
    enlaces: [
      { label: 'Preguntas frecuentes', href: '#preguntas' },
      { label: 'Garantía', href: '#preguntas' },
      { label: 'Refacciones', href: '#preguntas' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <span className="font-display text-2xl font-bold text-mist">
              TORKA<span className="text-volt">.</span>
            </span>
            <p className="mt-4 max-w-sm leading-relaxed text-mist/50">
              Scooters eléctricos diseñados para el tráfico, los baches y los
              presupuestos reales de este país.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columnas.map((c) => (
              <div key={c.titulo}>
                <h3 className="font-display text-sm font-semibold tracking-wide text-mist uppercase">
                  {c.titulo}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {c.enlaces.map((e) => (
                    <li key={e.label}>
                      <a
                        href={e.href}
                        className="text-sm text-mist/50 transition-colors duration-300 hover:text-volt"
                      >
                        {e.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist/35">
            © {new Date().getFullYear()} TORKA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-mist/35">
            Imágenes y especificaciones de carácter informativo. Consulta la ficha
            vigente con tu distribuidor.
          </p>
        </div>
      </div>
    </footer>
  )
}
