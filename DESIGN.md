---
version: 2
name: yolt
description: >
  Sistema de diseño de yolt, movilidad eléctrica para una Guatemala más
  real. Toma el sistema de marca de yolt (isotipo Y lima, marca en minúsculas,
  paleta lima / grafito / hueso / gris metálico) y lo aplica sobre la
  estructura de escaparate nocturno del sitio: lienzo negro, titulares
  grandes en mayúsculas y la moto como protagonista.

colors:
  lima: "#d6f715"         # acento único: acciones, energía, distancia
  lima-vivo: "#e4ff4d"    # lima al pasar el cursor
  lima-hondo: "#4a6600"   # lima sobre fondos claros (texto, foco, puntos)
  negro: "#000000"        # lienzo de escenas (héroe, cierre)
  asfalto: "#121212"      # grafito: lienzo general
  asfalto-alto: "#1c1c1c" # tarjetas y superficies elevadas
  linea: "#2e2e2e"        # filetes y bordes sobre oscuro
  papel: "#f1eee5"        # hueso: texto sobre oscuro y bandas claras
  niebla: "#9b9b9b"       # gris metálico: texto secundario sobre oscuro
  error: "#ff6b5e"        # error sobre oscuro
  error-hondo: "#b42318"  # error sobre hueso

typography:
  logotipo: "oficial, vectorizado (public/marca)"
  familia: "Archivo (eje de ancho 62–125) + Instrument Serif"
  display: { familia: Instrument Serif, peso: 400, caja: normal, interlinea: 1.0, tracking: -0.015em }
  cuerpo:  { ancho: 100%, peso: 400, tamaño: 17px, interlinea: 1.6 }
  tablero: { ancho: 75%, peso: 700, cifras: tabulares }
  etiqueta: { ancho: 100%, peso: 600, caja: MAYÚSCULAS, tamaño: 12–13px, tracking: 0.12em }

spacing: [4, 8, 16, 24, 32, 48, 64, 96, 128]
rounded: { botones: 0, tarjetas: 2px, muestras-de-color: completo }
motion:
  estado: "0.33s cubic-bezier(0.25, 1, 0.5, 1)"
  entrada: "cubic-bezier(0.19, 1, 0.22, 1)"
---

# yolt — Sistema de diseño

## 1. Marca

- **Logotipo**: la Y lima (isotipo) + "olt". Archivos vectorizados del
  original en `public/marca/` (versión clara, oscura e isotipo); se
  regeneran con `herramientas/logo/vectorizar_logo.py`. En textos, la
  marca se escribe "yolt" en minúsculas ("una yolt", "yolt ONE").
- **Lema**: *Enciende tu camino.* Secundario: *Menos gasto. Más vida.*
- **Voz**: simple, moderna, auténtica, con propósito. Guatemala real:
  ciudad, volcanes, rutas.
- **Gama**: yolt ONE (tu primer gran paso), CITY (más ciudad, más vida),
  X (más potencia, más libertad) y GT (futura gama superior, sin límites).

## 2. Atmósfera

La moto es la única protagonista. El sitio es un **escaparate nocturno**:
lienzo negro donde solo el producto, el texto hueso y el lima tienen
permiso de brillar.

- Lienzo negro de borde a borde; las escenas importantes en negro puro.
- Titulares en serif editorial, grandes, en caja normal.
- Botones rectos, sin esquinas redondeadas.
- Bandas claras (hueso) donde se lee con calma o se contempla: showroom,
  tabla comparativa, formularios, calculadoras.
- Fotografía editorial: galería asimétrica, fotos que se descubren como
  cortina y se desplazan dentro de su marco (`FotoRevelada`).
- Un solo tiempo para todo cambio de estado: 0.33 s.

## 3. Color

- **Lima `#d6f715`**: el único acento. Botón principal (con texto negro),
  energía, autonomía, distancia y detalles de marca. Una pantalla tiene,
  como máximo, un botón lima a la vista.
- **Lima hondo `#4a6600`**: cuando el lima va sobre hueso (texto, foco,
  marcadores). El lima puro sobre hueso no se lee.
- **Negro / grafito**: lienzo. Escenas en negro puro; el resto en `#121212`.
- **Hueso `#f1eee5`**: texto sobre oscuro y fondo de las bandas claras.
- **Gris metálico `#9b9b9b`**: texto secundario sobre oscuro.

Contrastes verificados (WCAG AA): hueso sobre grafito 16.2:1, gris metálico
sobre grafito 6.7:1, negro sobre lima 17.2:1, lima sobre grafito 15.3:1,
lima hondo sobre hueso 5.7:1.

## 4. Tipografía

- **Logotipo**: siempre el archivo SVG; nunca se escribe con texto.
- **Display / títulos** (`.tipo-ruta`): Instrument Serif, peso 400, en
  caja normal (nunca todo en mayúsculas), interlínea 1.0. Itálica para el
  lema en lima ("Menos gasto. Más vida.").
- **Cuerpo**: ancho normal, 17 px, interlínea 1.6.
- **Tablero** (`.tipo-tablero`): condensada al 75 % con cifras tabulares,
  para toda especificación técnica.
- **Etiqueta** (`.tipo-etiqueta`): 12–13 px, MAYÚSCULAS, espaciado 0.12em.

## 5. Componentes

- **Botón principal**: rectángulo lima, texto negro en etiqueta, 0 radio,
  alto mínimo 48 px. Hover: lima vivo.
- **Botón secundario**: contorno hueso al 50 %, texto hueso; al pasar el
  cursor se rellena de hueso con texto negro.
- **Tarjeta**: asfalto alto, filete `linea`, radio 2 px.
- **Lectura de tablero**: etiqueta arriba, cifra condensada grande, unidad
  en gris; las de energía en lima.
- **Franja de marca**: lima / gris metálico / hueso, bajo los encabezados y
  como separador de escenas.
- **Encabezado de sección** (`TituloSeccion`): índice numerado en lima,
  filete que se dibuja y rótulo; debajo, el titular que sube por máscara.
- **Línea de luz** (`Carril`): filete fino con un destello lima que lo
  recorre; separa encabezados y bandas.
- **Borde vivo**: una línea de luz lima recorre el borde de la tarjeta de
  cierre. Solo ahí.

## 6. Movimiento

Tono formal: movimiento preciso y sereno, nunca juguetón. Sin chispas,
rayos ni efectos de videojuego.

- Cambios de estado (hover, foco, selección): 0.33 s, curva `mover`.
- Entradas y titulares: curva expo, 0.5–0.9 s, una vez.
- El sitio se anima para todos; con "reducir movimiento" solo se suavizan
  la autopista (ver `src/shared/hooks/useMovimiento.js`).

## 7. Qué no hacer

- En textos corridos, la marca va en minúsculas: "yolt".
- No usar lima para decorar, ni dos botones lima en la misma vista.
- No poner texto lima sobre fondos claros: usa lima hondo.
- No redondear botones.
- No usar fotos de otras marcas.
