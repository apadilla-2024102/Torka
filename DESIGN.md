---
version: 3
name: yolt
description: >
  Sistema de diseño de yolt, movilidad eléctrica para Guatemala. Estilo
  formal y elegante, a la manera de las marcas premium de acabados y de la
  dirección de Apple y Bugatti (VoltAgent/awesome-design-md): lienzo claro,
  serif clásica en los titulares, mucho aire, fotografía como protagonista
  y el lima del logotipo como acento mínimo. Paleta y tipografía
  recomendadas por ui-ux-pro-max ("Minimalism & Swiss", Cormorant +
  Montserrat).

colors:
  lienzo: "#ffffff"              # escenas y tarjetas
  lienzo-alto: "#f5f5f3"         # pergamino: lienzo general
  superficie: "#fbfbfa"          # superficies sobre pergamino
  filete: "#e3e1db"              # bordes sobre claro
  tinta: "#1d1d1f"               # texto principal y bandas oscuras
  tinta-suave: "#6e6e73"         # texto secundario sobre claro
  filete-inverso: "#3a3a3c"      # bordes sobre tinta
  tinta-inversa-suave: "#a1a1a6" # texto secundario sobre tinta
  lima: "#d6f715"                # acento de marca (logo, detalles, CTA sobre tinta)
  lima-vivo: "#e4ff4d"           # lima al pasar el cursor
  lima-hondo: "#4a6600"          # lima como texto o línea sobre claro
  error: "#ff6b5e"               # error sobre tinta
  error-hondo: "#b42318"         # error sobre claro

typography:
  display: { familia: Cormorant Garamond, peso: 500, caja: normal, interlinea: 1.0, tracking: -0.01em }
  cuerpo:  { familia: Montserrat, peso: 400, tamaño: 17px, interlinea: 1.6 }
  cifras:  { familia: Montserrat, peso: 500, cifras: tabulares }
  etiqueta: { familia: Montserrat, peso: 500, caja: MAYÚSCULAS, tamaño: 12px, tracking: 0.18em }

spacing: [4, 8, 16, 24, 32, 48, 64, 96, 128]
rounded: { botones: 0, tarjetas: 2px, muestras-de-color: completo }
motion:
  estado: "0.33s cubic-bezier(0.25, 1, 0.5, 1)"
  entrada: "cubic-bezier(0.19, 1, 0.22, 1)"
---

# yolt — Sistema de diseño

## 1. Marca

- **Logotipo**: la Y lima (isotipo) + "olt". Vectorizado del original en
  `public/marca/` (versión para fondo claro con "olt" en tinta, versión
  para fondo oscuro con "olt" hueso, e isotipo). Se regenera con
  `herramientas/logo/vectorizar_logo.py`. Nunca se escribe con texto.
- En textos corridos, la marca va en minúsculas: "yolt", "yolt ONE".
- **Lema**: *Enciende tu camino.* Secundario: *Menos gasto. Más vida.*

## 2. Atmósfera

Formal, sereno, de catálogo premium. La moto y la fotografía son las
protagonistas; la interfaz se retira.

- Lienzo claro (blanco y pergamino) con mucho aire.
- Bandas de tinta (oscuras) solo para dar ritmo: showroom, pantalla de
  carga, cierre de portada, tarjeta de cuota.
- Titulares en serif clásica, en caja normal. Nada en mayúsculas salvo los
  rótulos pequeños.
- Sin luces de autopista, rayos, chispas ni efectos de videojuego.

## 3. Color

- **Tinta `#1d1d1f`** sobre pergamino `#f5f5f3`: 15.4:1.
- **Tinta suave `#6e6e73`**: texto secundario (4.7:1 sobre pergamino,
  5.1:1 sobre blanco).
- **Lima `#d6f715`**: la Y del logo, pequeños detalles y el botón principal
  solo sobre bandas de tinta (texto tinta sobre lima, 13.8:1). Sobre claro,
  el lima como texto o línea va en **lima hondo `#4a6600`** (6.0:1).
- **Acción principal sobre claro**: botón tinta con texto blanco.

## 4. Tipografía

- **Display** (`.tipo-ruta`): Cormorant Garamond 500, caja normal,
  interlínea 1.0. Itálica para el lema secundario.
- **Cuerpo**: Montserrat 400, 17 px, interlínea 1.6.
- **Cifras** (`.tipo-tablero`): Montserrat 500, cifras tabulares.
- **Etiqueta** (`.tipo-etiqueta`): Montserrat 500, 12 px, MAYÚSCULAS,
  espaciado 0.18em, solo para rótulos y botones.

## 5. Componentes

- **Botón principal**: rectángulo tinta, texto blanco en etiqueta, 0 radio,
  alto mínimo 48 px. Sobre bandas de tinta: lima con texto tinta.
- **Botón secundario**: contorno tinta al 50 %; se rellena al pasar el
  cursor.
- **Tarjeta**: blanca, filete `filete`, radio 2 px.
- **Encabezado de sección** (`TituloSeccion`): índice numerado, filete que
  se dibuja y rótulo; debajo, el titular que sube por máscara.
- **Fotografía editorial** (`FotoRevelada`): se descubre como cortina y se
  desplaza dentro de su marco con el scroll.
- **Línea de luz** (`Carril`): filete fino con un destello lima.
- **Borde vivo**: línea de luz lima que recorre la tarjeta del cierre.

## 6. Movimiento

Preciso y sereno:

- Cambios de estado: 0.33 s, curva `mover`.
- Entradas: curva expo, 0.6–1.4 s, una vez. Titulares por máscara, fotos
  como cortina, paralaje suave en la portada y la galería.
- El sitio se anima para todos; ver `src/shared/hooks/useMovimiento.js`.

## 7. Qué no hacer

- No poner texto lima sobre fondo claro (usar lima hondo).
- No escribir titulares en mayúsculas.
- No usar más de un botón principal por vista.
- No redondear botones.
- No agregar efectos llamativos (luces, rayos, chispas, bordes eléctricos).
