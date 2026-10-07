---
version: 1
name: TORKA
description: >
  Sistema de diseño de TORKA, motos eléctricas para Guatemala. Toma lo
  mejor del análisis de cuatro marcas automotrices (VoltAgent/awesome-design-md):
  el lienzo negro y la tipografía en mayúsculas gigantes de Lamborghini, la
  disciplina de color editorial de Ferrari, el producto como protagonista de
  Tesla y la franja de marca de BMW M. Se toman reglas, nunca marcas ni logos.

colors:
  negro: "#000000"        # lienzo de escenas (héroe, cierre)
  asfalto: "#111111"      # lienzo general
  asfalto-alto: "#1c1c1c" # tarjetas y superficies elevadas
  linea: "#2e2e2e"        # filetes y bordes sobre oscuro
  papel: "#f6f6f3"        # texto principal sobre oscuro y bandas claras
  niebla: "#9a9a9a"       # texto secundario sobre oscuro
  rojo: "#e31019"         # SOLO acción principal
  rojo-hondo: "#b00c14"   # rojo pulsado y texto rojo sobre claro
  rojo-claro: "#ff4a50"   # texto rojo sobre oscuro
  senal: "#f2c230"        # SOLO energía, carga y distancia

typography:
  familia: "Archivo (eje de ancho 62–125)"
  display: { ancho: 125%, peso: 700, caja: MAYÚSCULAS, interlinea: 0.92, tracking: -0.02em }
  titulo:  { ancho: 125%, peso: 700, caja: MAYÚSCULAS, interlinea: 1.0 }
  cuerpo:  { ancho: 100%, peso: 400, tamaño: 17px, interlinea: 1.6 }
  tablero: { ancho: 75%, peso: 700, cifras: tabulares }
  etiqueta: { ancho: 100%, peso: 600, caja: MAYÚSCULAS, tamaño: 12–13px, tracking: 0.12em }

spacing: [4, 8, 16, 24, 32, 48, 64, 96, 128]   # escalera de 8 px (Ferrari)
rounded: { botones: 0, tarjetas: 2px, muestras-de-color: completo }
motion:
  estado: "0.33s cubic-bezier(0.25, 1, 0.5, 1)"   # todo cambio de estado (Tesla)
  entrada: "cubic-bezier(0.19, 1, 0.22, 1)"        # revelados y titulares
---

# TORKA — Sistema de diseño

## 1. Atmósfera

La moto es la única protagonista. El sitio es un **escaparate nocturno**:
lienzo negro donde solo el producto, el texto blanco y dos colores de
señal tienen permiso de brillar. Nada decora: sin degradados de adorno,
sin sombras en la interfaz, sin bordes que no separen información.

| Regla | De dónde viene |
|---|---|
| Lienzo negro de borde a borde; las escenas importantes en negro puro | Lamborghini |
| Titulares en MAYÚSCULAS, enormes, interlínea apretada | Lamborghini |
| Botones rectos, sin esquinas redondeadas | Lamborghini |
| El rojo solo en la acción principal; nunca decorativo | Ferrari |
| Bandas claras solo donde se lee con calma: tabla comparativa, formularios, calculadoras | Ferrari |
| Escalera de espaciado de 8 px | Ferrari |
| Cada modelo ocupa la pantalla; la interfaz se retira | Tesla |
| Un solo tiempo para todo cambio de estado: 0.33 s | Tesla |
| Navegación transparente que se vuelve vidrio esmerilado al hacer scroll | Tesla |
| Franja de marca de tres colores como firma | BMW M |

## 2. Color

- **Rojo `#e31019`**: botón de acción principal y nada más. Una pantalla
  tiene, como máximo, un botón rojo a la vista.
- **Amarillo de carril `#f2c230`**: autonomía, carga, distancia y la
  batería. Nunca en botones ni en texto decorativo.
- **Negro / asfalto**: lienzo. Las escenas (héroe, cierre) en negro puro;
  el resto en asfalto `#111111`.
- **Papel `#f6f6f3`**: texto sobre oscuro y fondo de las bandas claras.

Contrastes verificados (WCAG AA): papel sobre asfalto 17.4:1, niebla sobre
asfalto 6.7:1, blanco sobre rojo 4.8:1, amarillo sobre asfalto 11.3:1.

## 3. Tipografía

Una sola familia, Archivo, con su eje de ancho como recurso:

- **Display / títulos** (`.tipo-ruta`): expandida al 125 %, peso 700, en
  MAYÚSCULAS, interlínea 0.92. Es la voz de la marca.
- **Cuerpo**: ancho normal, 17 px, interlínea 1.6, en minúsculas.
- **Tablero** (`.tipo-tablero`): condensada al 75 % con cifras tabulares,
  para toda especificación técnica.
- **Etiqueta** (`.tipo-etiqueta`): 12–13 px, MAYÚSCULAS, espaciado 0.12em,
  solo para rótulos de botones y de datos.

## 4. Componentes

- **Botón principal**: rectángulo rojo, texto blanco en etiqueta, 0 radio,
  alto mínimo 48 px. Pulsado: rojo hondo.
- **Botón secundario**: contorno blanco al 50 %, texto blanco; al pasar el
  cursor se rellena de blanco con texto negro.
- **Tarjeta**: asfalto alto, filete `linea`, radio 2 px.
- **Lectura de tablero**: etiqueta arriba, cifra condensada grande, unidad
  en niebla; las de energía llevan la marca amarilla.
- **Franja de marca**: tres barras finas rojo / amarillo / blanco, bajo el
  logotipo y como separador de las escenas principales.

## 5. Movimiento

- Cambios de estado (hover, foco, selección): 0.33 s, curva `mover`.
- Entradas y titulares: curva expo, 0.5–0.9 s, una vez.
- Una sola secuencia orquestada por pantalla; lo demás responde al usuario.
- Todo respeta "reducir movimiento".

## 6. Qué no hacer

- No usar rojo para decorar, ni dos botones rojos en la misma vista.
- No redondear botones.
- No usar fotos o renders de otras marcas: solo motos TORKA.
- No copiar logotipos, nombres ni frases de las marcas de referencia.
