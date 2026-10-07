---
version: 2
name: yolt
description: >
  Sistema de diseño de yolt, movilidad eléctrica para una Guatemala más
  real. Toma el sistema de marca de yolt (rayo lima, palabra en minúsculas,
  paleta lima / grafito / hueso / gris metálico) y lo aplica sobre la
  estructura de escaparate nocturno del sitio: lienzo negro, titulares
  grandes en mayúsculas y la moto como protagonista.

colors:
  lima: "#c5f230"         # acento único: acciones, energía, distancia
  lima-vivo: "#d8ff52"    # lima al pasar el cursor
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
  logotipo: "Outfit Bold, en trazos (public/marca)"
  familia: "Archivo (eje de ancho 62–125)"
  display: { ancho: 125%, peso: 700, caja: MAYÚSCULAS, interlinea: 0.92, tracking: -0.02em }
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

- **Logotipo**: rayo lima + "yolt" en minúsculas. Siempre en minúsculas,
  también dentro de textos ("una yolt", "yolt ONE"). Archivos en
  `public/marca/` (versión clara, oscura y solo el rayo).
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
- Titulares en MAYÚSCULAS, enormes, interlínea apretada.
- Botones rectos, sin esquinas redondeadas.
- Bandas claras (hueso) solo donde se lee con calma: tabla comparativa,
  formularios, calculadoras.
- Un solo tiempo para todo cambio de estado: 0.33 s.

## 3. Color

- **Lima `#c5f230`**: el único acento. Botón principal (con texto negro),
  energía, autonomía, distancia y detalles de marca. Una pantalla tiene,
  como máximo, un botón lima a la vista.
- **Lima hondo `#4a6600`**: cuando el lima va sobre hueso (texto, foco,
  marcadores). El lima puro sobre hueso no se lee.
- **Negro / grafito**: lienzo. Escenas en negro puro; el resto en `#121212`.
- **Hueso `#f1eee5`**: texto sobre oscuro y fondo de las bandas claras.
- **Gris metálico `#9b9b9b`**: texto secundario sobre oscuro.

Contrastes verificados (WCAG AA): hueso sobre grafito 16.2:1, gris metálico
sobre grafito 6.7:1, negro sobre lima 16.1:1, lima sobre grafito 14.4:1,
lima hondo sobre hueso 5.7:1.

## 4. Tipografía

- **Logotipo**: Outfit Bold convertido a trazos; no se escribe con texto.
- **Display / títulos** (`.tipo-ruta`): Archivo expandida al 125 %, peso
  700, en MAYÚSCULAS, interlínea 0.92.
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

## 6. Movimiento

- Cambios de estado (hover, foco, selección): 0.33 s, curva `mover`.
- Entradas y titulares: curva expo, 0.5–0.9 s, una vez.
- El sitio se anima para todos; con "reducir movimiento" solo se suavizan
  la autopista y los rayos (ver `src/shared/hooks/useMovimiento.js`).

## 7. Qué no hacer

- No escribir "YOLT" ni "Yolt": la marca va en minúsculas.
- No usar lima para decorar, ni dos botones lima en la misma vista.
- No poner texto lima sobre fondos claros: usa lima hondo.
- No redondear botones.
- No usar fotos de otras marcas.
