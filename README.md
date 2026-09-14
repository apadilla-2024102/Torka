# TORKA

Sitio de marca y catálogo de scooters eléctricos TORKA.

## Arrancar

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # compila a dist/
npm run preview  # revisa el build antes de publicar
```

El resultado de `npm run build` son archivos estáticos: se suben a cualquier
hosting (Netlify, Vercel, Cloudflare Pages, o un servidor propio) sin backend.

## Stack

| Pieza | Para qué |
|---|---|
| Vite | Compilador y servidor de desarrollo |
| React 19 | Interfaz |
| Tailwind 4 | Estilos, configurados con tokens de marca |
| Motion | Animación e interacción |

Sin backend, sin base de datos, sin dependencias de pago.

## Qué tienes que cambiar antes de publicar

Está construido con datos y gráficos de ejemplo. Estos son los cinco puntos
que hay que sustituir, en orden de importancia:

1. **Colores y tipografía** — `src/index.css`, bloque `@theme`. Es el único
   sitio que tocas para cambiar la identidad: todo lo demás se actualiza solo.
2. **Fotos de las motos** — cada hueco marcado con borde punteado indica el
   formato esperado. Van en `public/` y se referencian desde `Hero.jsx` y
   `ModeloCard.jsx`, donde hay un comentario con la línea exacta a usar.
3. **Fichas técnicas** — `src/data/modelos.js`. Nombres, precios, autonomía,
   potencia. Añade o quita modelos y el catálogo, el filtro y el comparador
   se reconstruyen solos.
4. **Preguntas frecuentes** — `src/data/faq.js`. Las respuestas sobre
   garantía, licencias y cobertura son de ejemplo: contrástalas con tus
   condiciones reales, porque son compromisos comerciales.
5. **Supuestos de la calculadora** — constante `SUPUESTOS` en
   `src/components/Ahorro.jsx`. Tarifa eléctrica, consumo y mantenimiento.
   Actualízalos con precios vigentes o el número pierde credibilidad.

También: red de distribuidores en `src/components/Distribuidores.jsx` y el
logo, que ahora es texto, en `Nav.jsx` y `Footer.jsx`.

## Cómo está organizado

```
src/
  index.css               tokens de marca — el archivo de identidad
  App.jsx                 orden de las secciones
  lib/motion.js           sistema de animación centralizado
  lib/useCountUp.js       contadores animados
  data/modelos.js         catálogo
  data/faq.js             objeciones de compra
  components/             una sección por archivo
```

Las animaciones **no** viven dentro de los componentes: están en
`lib/motion.js`. Para cambiar el carácter del movimiento de toda la página
—o sustituir el sistema completo— se toca ese archivo, no la interfaz.

## Accesibilidad

- Respeta `prefers-reduced-motion`: quien configuró su sistema para menos
  movimiento recibe fundidos en lugar de desplazamientos.
- Navegable por teclado, con enlace de salto al contenido y foco visible.
- Tabla comparativa con encabezados de fila y columna correctos.
- Textos alternativos y etiquetas en todos los controles.
