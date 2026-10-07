# TORKA

Sitio de venta de motos eléctricas TORKA, localizado para **Guatemala**:
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
6. **Logotipo** en `src/shared/components/brand/Logo.jsx`: guarda el
   archivo en `public/` y cambia `ARCHIVO_LOGO`.

## Imágenes de las motos

Mientras no haya fotografías, las motos se muestran con **renders 3D**
generados por código: carrocería con laca automotriz, llantas, rines,
disco de freno, faro LED y sombra de estudio. Cada modelo conserva lo que
lo distingue: parabrisas (Sierra), parrilla y caja (Carga), cúpula
deportiva (Sport), una o dos baterías.

Cada imagen pasa por tres niveles de respaldo, en este orden:

1. **Foto real**, si el modelo la tiene (campo `fotos` en `mockData.js`).
2. **Render** de `public/modelos/renders/<modelo>-<color>.webp`.
3. **Silueta vectorial**, si ninguno de los dos archivos carga.

Subir o quitar imágenes nunca deja un icono roto.

### Visor 3D en la ficha

En la ficha de cada modelo, la moto se puede girar arrastrando, con los
botones o con las flechas del teclado, y cambia de color en vivo. Three.js
se descarga **solo** en esa página (unos 140 kB comprimidos), nunca en la
portada. Si el navegador no puede dibujar 3D, se queda el render.

Las imágenes llevan la nota "imagen generada por computadora; el acabado
real puede variar". Retírala cuando pongas fotos reales.

### Regenerar los renders

Cuando agregues un modelo o un color en `mockData.js`:

```bash
npx playwright install chromium   # solo la primera vez
npm run renders
```

El modelo 3D se arma en `src/shared/components/brand/moto3d/`:
`construirMoto.js` (piezas), `estudio.js` (luces, cámara y sombra) y
`Moto3D.jsx` (visor). El visor y los renders usan el mismo estudio, así
que siempre se ven igual.

### Cuando tengas fotos

1. Guárdalas en `public/modelos/`, una por color. Lo ideal es PNG o WebP
   **sin fondo**, de al menos 1200 px de ancho y con el mismo encuadre de
   perfil para que el cambio de color no salte.
2. En `mockData.js`, llena el campo `fotos` del modelo:

   ```js
   fotos: {
     blanco: '/modelos/urbana-blanco.png',
     grafito: '/modelos/urbana-grafito.png',
   },
   ```

La foto tiene prioridad sobre el render en catálogo, portada y
comparador.

## Conectar un backend

Sin configuración, el sitio usa los datos de `mockData.js`. Para leerlos
de un servidor, copia `.env.example` a `.env` y define `VITE_API_URL`. Se
piden `/modelos`, `/distribuidores` y `/preguntas`; si el servidor falla,
el sitio vuelve a los datos de ejemplo en lugar de quedar en blanco.

## Diseño

Toda la identidad vive en el bloque `@theme` de
`src/shared/styles/index.css`.

**La calle como idea.** Asfalto para las zonas oscuras, papel y concreto
para las claras. Cada color tiene una sola función:

| Token | Para qué |
|---|---|
| `rojo` | Acciones: botones, enlaces activos. El rojo del logotipo |
| `rojo-claro` | Texto rojo sobre asfalto (el rojo puro no da contraste) |
| `rojo-hondo` | Texto rojo sobre papel, errores |
| `senal` | Amarillo de línea de carril: **solo** energía, carga y distancia |
| `asfalto` / `papel` | Fondos oscuro y claro |

**Una sola tipografía, Archivo**, usada en tres anchos: expandida para
titulares (`.tipo-ruta`), normal para leer y condensada con cifras
tabulares para las especificaciones (`.tipo-tablero`), como el tablero de
una moto.

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

## Portada cinematográfica

La portada está armada por capas de profundidad (skill `epic-design`) y
usa componentes de [React Bits](https://github.com/DavidHDev/react-bits),
guardados en `src/shared/components/reactbits/` con su licencia:

| Sección | Componente | Qué hace |
|---|---|---|
| Héroe | Hyperspeed | Autopista nocturna en colores TORKA; al mantener presionado, acelera |
| Héroe y cierre | ClickSpark | Chispas amarillas al hacer clic |
| Botón principal | Magnet | El botón se acerca al cursor |
| Banda | ScrollVelocity | Frases que corren y se aceleran con el scroll |
| Manifiesto | ScrollReveal | Las palabras se encienden mientras se lee |
| Razones | SpotlightCard | Tarjetas con luz que sigue al cursor |
| Cierre | Lightning + ElectricBorder | Relámpago de fondo y borde eléctrico en la tarjeta final |

Además: escaparate de la gama con la moto fija mientras pasan los modelos
(se intercambian como motos frente a una vitrina), franja de garantías bajo
el héroe, resumen de dudas frecuentes y barra fija de compra en celular
(recomendaciones de la skill `page-cro`).

Los fondos WebGL (autopista y relámpago) solo se montan cuando están en
pantalla. En celular, sin WebGL o con "reducir movimiento", se usa una
versión estática en CSS.

## Accesibilidad

- Navegable por teclado, con enlace para saltar al contenido y foco visible.
- Formulario con errores junto a cada campo y foco al primer error.
- Selectores de color y plazo hechos con radios nativos: se recorren con
  flechas y el lector de pantalla anuncia el nombre.
- Las cifras animadas se anuncian solo con su valor final.
- Tabla comparativa con encabezados de fila y columna.
