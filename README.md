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

1. **El logotipo** — guarda el archivo en `public/` (por ejemplo
   `public/logo.svg`, o PNG con fondo transparente y 600 px de ancho mínimo)
   y en `src/components/Logo.jsx` cambia `ARCHIVO_LOGO` de `null` a
   `'/logo.svg'`. Hasta entonces se dibuja un sustituto tipográfico. No se
   reprodujo el emblema a mano a propósito: una copia aproximada de una marca
   registrada se ve peor y la deforma.
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

También: red de distribuidores en `src/components/Distribuidores.jsx`.

## Color

La paleta sale del logotipo: rojo TORKA sobre negro, con blanco roto para
las zonas claras. Vive en el bloque `@theme` de `src/index.css` y es el único
sitio que hay que tocar para cambiarla.

Hay tres rojos, y la distinción importa:

| Token | Para qué |
|---|---|
| `brand` | Rellenos sólidos: botones, resaltados, el color que manda |
| `brand-bright` | **Texto sobre fondo negro.** El rojo de marca puro no alcanza contraste legible en texto pequeño sobre oscuro |
| `brand-deep` | Texto sobre fondo claro y estados presionados |

Sobre rojo sólido el texto va en blanco (`text-mist`), nunca en negro.

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
