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
      brand/      Logo, silueta de la moto, imagen de modelo
    config/       negocio.js: WhatsApp, correo, teléfono
    hooks/        hooks reutilizables
    lib/          formatos de número y cálculos de energía y cuotas
    styles/       index.css: tokens de marca
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

## Fotos de las motos

Mientras no hay fotos, cada modelo se dibuja con una **silueta vectorial**
que cambia de color con el selector y muestra lo que distingue al modelo:
parabrisas (Sierra), parrilla y caja (Carga), una o dos baterías.

Cuando tengas fotos:

1. Guárdalas en `public/modelos/`, una por color. Lo ideal es PNG **sin
   fondo** de al menos 1200 px de ancho, todas con el mismo encuadre de
   perfil para que el cambio de color no salte.
2. En `mockData.js`, llena el campo `fotos` del modelo:

   ```js
   fotos: {
     blanco: '/modelos/urbana-blanco.png',
     grafito: '/modelos/urbana-grafito.png',
   },
   ```

Un color sin foto sigue mostrando la silueta, y si un archivo no carga se
vuelve a la silueta: subir fotos nunca deja una imagen rota.

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

**Movimiento con propósito.** Solo hay una animación que ocurre sola: los
dos carriles de la portada. El resto responde a lo que hace el usuario.
Al cambiar de página hay una transición, y la moto viaja de la tarjeta a
su ficha (View Transitions API). También se animan el indicador del
filtro, el color de la moto, las cifras de la calculadora y de la cuota,
y el acordeón de preguntas. Quien activa "reducir movimiento" en su
sistema ve los cambios sin animación.

## Accesibilidad

- Navegable por teclado, con enlace para saltar al contenido y foco visible.
- Formulario con errores junto a cada campo y foco al primer error.
- Selectores de color y plazo hechos con radios nativos: se recorren con
  flechas y el lector de pantalla anuncia el nombre.
- Las cifras animadas se anuncian solo con su valor final.
- Tabla comparativa con encabezados de fila y columna.
