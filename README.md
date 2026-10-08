# yolt

**Enciende tu camino.** Sitio de venta de motos eléctricas yolt, localizado para **Guatemala**:
precios en quetzales, gasolina por galón, licencia tipo M, trámite de placas
ante la SAT y cotización por WhatsApp.

## Arrancar

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # compila a dist/
npm run preview  # revisa el build antes de publicar
```

`npm run build` produce archivos estáticos que se suben a cualquier hosting.
Como el sitio tiene varias páginas (`/modelos`, `/cotizar`…), el hosting
debe devolver `index.html` para cualquier ruta. Ya está configurado para
**Netlify** (`public/_redirects`) y **Vercel** (`vercel.json`).

## Páginas

| Ruta | Qué hace |
|---|---|
| `/` | Portada: comparativa de dos carriles (cuánto recorres con Q100), gama, razones, proceso de compra |
| `/modelos` | Catálogo con filtro por uso (el filtro queda en la URL) |
| `/modelos/:id` | Ficha: selector de color, ficha técnica, estimador de cuota |
| `/comparar` | Tabla comparativa de todos los modelos |
| `/ahorro` | Calculadora de ahorro anual frente a gasolina |
| `/distribuidores` | Puntos de venta y contacto para flotillas |
| `/cotizar` | Formulario que abre WhatsApp con la solicitud ya escrita |
| `/preguntas` | Objeciones frecuentes; se puede enlazar a una (`/preguntas#garantia`) |

## Cómo está organizado

Por **funcionalidades** (features), igual que el cliente de RestauranteCanela:
cada página vive con sus propios componentes, y lo que comparten varias
páginas va en `shared/`.

```
src/
  main.jsx                      punto de entrada
  app/
    App.jsx                     raíz de la aplicación
    router/AppRouter.jsx        rutas y carga de datos de cada página
  features/
    inicio/       pages/ components/
    modelos/      pages/ components/
    comparar/     pages/ components/
    ahorro/       pages/ components/
    distribuidores/ pages/ components/
    cotizar/      pages/ components/ lib/
    preguntas/    pages/ components/
    errores/      pages/
  shared/
    api/          datos: mockData.js + una función por recurso
    components/
      layout/     Layout, Nav, Footer, encabezados, contenedor
      ui/         Botón, lecturas de tablero, llamado a cotizar
      brand/      Logo, imagen de modelo, silueta y moto3d/ (modelo 3D)
    config/       negocio.js: WhatsApp, correo, teléfono
    hooks/        hooks reutilizables
    lib/          formatos de número y cálculos de energía y cuotas
    styles/       index.css: tokens de marca
herramientas/renders/           página de desarrollo que dibuja los renders
scripts/generar-renders.mjs     npm run renders
```

Regla para crecer: si algo solo lo usa una página, va dentro de su
`features/<página>/`. Si lo usan dos o más, se mueve a `shared/`.

## Qué cambiar antes de publicar

Todo está construido con datos de ejemplo. En orden de importancia:

1. **Contacto** en `src/shared/config/negocio.js`: el número de WhatsApp
   (`502` + 8 dígitos), el correo y el teléfono. El formulario de
   cotización envía a ese número.
2. **Modelos** en `src/shared/api/mockData.js`: nombres, precios, fichas,
   colores. Añade o quita modelos y todas las páginas se reconstruyen solas.
3. **Preguntas frecuentes** en el mismo archivo. Garantías, licencias y
   coberturas son compromisos comerciales: revísalos.
4. **Distribuidores** en el mismo archivo.
5. **Supuestos de costo** en `src/shared/lib/energia.js`: precio del galón,
   tarifa eléctrica, mantenimiento y la tasa de ejemplo de las cuotas.
6. **Logotipo**: los originales están en `herramientas/logo/original/`. Si
   cambian, reemplázalos y corre `python3 herramientas/logo/vectorizar_logo.py`
   (requiere opencv-python): regenera `public/marca/` y `public/favicon.svg`.

## Imágenes de las motos

Las motos son las de la lámina del sistema de marca
(`herramientas/fotos/gama/sistema-de-marca-yolt.webp`): recortadas de la
sección "Nuestra gama", ampliadas 4× con superresolución (EDSR), sin fondo
y encuadradas en 1320 × 810 px con sombra de contacto, en
`public/modelos/fotos/<modelo>-<color>.webp`. La lámina es de baja
resolución: **cuando haya fotos o renders oficiales de cada modelo,
reemplázalas** (mismo nombre de archivo y encuadre). Las fotos de showroom
anteriores siguen en `herramientas/fotos/originales/`.

Como las motos son negras sobre lienzo negro, `.foto-moto` les da una
orilla de luz tenue (index.css).

### Showroom

Las fotos y el video del showroom están en `public/showroom/`, preparados
con `python3 herramientas/showroom/preparar_showroom.py` (Pillow + ffmpeg)
desde `herramientas/showroom/originales/`: color sobrio y uniforme, WebP de
1400 px y un fragmento de 12 s del recorrido en WebM y MP4 con póster.
Se usan en las secciones Showroom (galería editorial sobre hueso) y
Experiencia (servicios y video vertical) de la portada.

| Modelo | Color         | Archivo                |
| ------ | ------------- | ---------------------- |
| yolt ONE  | Grafito y lima | `one-grafito.webp` |
| yolt CITY | Grafito y lima | `city-grafito.webp` |
| yolt X    | Grafito y lima | `x-grafito.webp` |
| yolt GT   | Grafito y lima (próximamente) | `gt-grafito.webp` |

Cada modelo ofrece **solo los colores que tienen foto**: un color sin foto
no se puede mostrar y genera dudas en la compra.

Cada imagen pasa por tres niveles de respaldo, en este orden:

1. **Foto real** (campo `fotos` en `mockData.js`).
2. **Render 3D** de `public/modelos/renders/<modelo>-<color>.webp`, si
   existe (`npm run renders`).
3. **Silueta vectorial**, si ninguno carga.

Subir o quitar imágenes nunca deja un icono roto. En la ficha, si el color
tiene foto se muestra la foto; el visor 3D (genérico) solo aparece en
colores sin foto.

### Agregar una foto o un color

1. Recorta la moto sin fondo (PNG/WebP con transparencia, mínimo 1200 px).
   Con fondo de showroom, cuida que no se cuelen otras motos.
2. Encuádrala en 1320 × 810 con la moto apoyada abajo y guárdala en
   `public/modelos/fotos/`.
3. En `mockData.js`, agrega el color en `colores` y su ruta en `fotos`:

   ```js
   colores: [{ id: 'negro', nombre: 'Negro', hex: '#1a1a1a' }],
   fotos: { negro: '/modelos/fotos/one-negro.webp' },
   ```

### Visor 3D y renders

El modelo 3D procedural vive en `src/shared/components/brand/moto3d/`
(`construirMoto.js`, `estudio.js`, `Moto3D.jsx`) y `npm run renders`
genera renders con él. Hoy no se usa porque todos los colores tienen foto;
queda como respaldo para modelos nuevos sin fotografía.

## Conectar un backend

Sin configuración, el sitio usa los datos de `mockData.js`. Para leerlos
de un servidor, copia `.env.example` a `.env` y define `VITE_API_URL`. Se
piden `/modelos`, `/distribuidores` y `/preguntas`; si el servidor falla,
el sitio vuelve a los datos de ejemplo en lugar de quedar en blanco.

## Diseño

**Las reglas visuales viven en [`DESIGN.md`](DESIGN.md)**: colores y para
qué se usa cada uno, tipografía, botones, espaciado y movimiento. Aplica el
sistema de marca de yolt (isotipo Y lima, "yolt" en minúsculas, paleta lima /
grafito / hueso / gris metálico) sobre una estructura de escaparate
nocturno: lienzo negro, titulares gigantes en mayúsculas y la moto como
protagonista.

Antes de agregar una página o componente, léelo. Las tres reglas que más
se rompen: un solo botón lima por vista, nada de texto lima sobre fondo
claro (usa lima hondo), y "yolt" siempre en minúsculas.

Los tokens están en el bloque `@theme` de `src/shared/styles/index.css`.

**Movimiento.** Las curvas y duraciones viven en
`src/shared/lib/movimiento.js`; para cambiar el carácter de todo el sitio
se toca ese archivo.

| Momento | Qué se mueve |
|---|---|
| Portada al cargar | El titular sube línea por línea, la moto entra rodando y frena, luego corren los dos carriles |
| Portada al hacer scroll | La moto se adelanta (parallax atado al scroll) |
| Toda la página | Barra roja de progreso de lectura; la navegación se esconde al bajar y vuelve al subir |
| Líneas de carril amarillas | Avanzan como la calle; se pausan fuera de pantalla |
| Especificaciones | Las cifras suben desde cero al aparecer, como el tablero al encender |
| Gama, razones, pasos | Entran en ola una sola vez; en "Cómo se compra" una línea roja avanza con el scroll |
| Tarjetas y filas de modelos | Al pasar el cursor, la moto rueda un poco hacia adelante |
| Cambio de página | Transición de vista; la moto viaja de la tarjeta a la ficha |
| Ficha | Nombre con máscara, visor 3D que gira y cambia de color |
| Formulario | El campo con error da una sacudida; la confirmación dibuja una palomita |

Quien activa "reducir movimiento" en su sistema ve todo el contenido sin
desplazamientos: los bucles se pausan, la línea de pasos aparece completa
y las cifras muestran su valor final.

## Portada

Estilo formal y claro (ver `DESIGN.md`). Orden: héroe (titular en serif y
la moto sobre un panel pergamino con paralaje), banda de lemas, manifiesto
y comparación de recorrido, 01 La gama (escaparate), 02 Showroom (galería
editorial sobre tinta), 03 Razones, 04 Línea yolt (desfile), 05
Experiencia (servicios y video), 06 Proceso de compra, 07 Preguntas y el
cierre en banda de tinta.

Componentes de [React Bits](https://github.com/DavidHDev/react-bits) en
`src/shared/components/reactbits/` (con su licencia):

| Sección | Componente | Qué hace |
|---|---|---|
| Banda | ScrollVelocity | Lemas que corren y se aceleran con el scroll |
| Manifiesto | ScrollReveal | Las palabras se encienden mientras se lee |
| Razones | SpotlightCard | Tarjetas con luz que sigue al cursor |

Propios: `TituloSeccion` (índice, filete y titular por máscara),
`FotoRevelada` (foto que se descubre como cortina con paralaje),
`Inclinar` (inclinación 3D con el cursor), el destello sobre la moto y el
borde vivo del cierre (CSS).

## Pantalla de carga, transiciones y cursor

| Pieza | Dónde | Qué hace |
|---|---|---|
| Pantalla de carga | `shared/components/intro/PantallaCarga.jsx` | La Y del logotipo se llena de lima de 0 a 100 % siguiendo la carga real (tipografía, logo e imagen principal), con una línea de progreso; luego se abre como cortina. Solo en la primera visita de la sesión |
| Cambio de página | `shared/styles/index.css` (view transitions) | La página nueva sube como cortina mientras la anterior se hunde y se oscurece |
| Cursor | `shared/components/intro/CursorMarca.jsx` | Anillo que sigue al mouse; crece sobre enlaces y muestra "Ver" o "Arrastra" según el elemento (atributo `data-cursor`) |
| Scroll suave | `shared/hooks/useScrollSuave.js` | Inercia con Lenis, solo con mouse o trackpad |
| Menú de celular | `shared/components/layout/Nav.jsx` | Pantalla completa, baja como cortina y los enlaces entran en cascada |

Mientras la pantalla de carga está arriba, el sitio de abajo no se pinta
(sus imágenes sí descargan): así la carga se anima fluida incluso en
equipos modestos. La portada y los títulos esperan a que la cortina se
abra para hacer su entrada.

## Accesibilidad

- Navegable por teclado, con enlace para saltar al contenido y foco visible.
- Formulario con errores junto a cada campo y foco al primer error.
- Selectores de color y plazo hechos con radios nativos: se recorren con
  flechas y el lector de pantalla anuncia el nombre.
- Las cifras animadas se anuncian solo con su valor final.
- Tabla comparativa con encabezados de fila y columna.
