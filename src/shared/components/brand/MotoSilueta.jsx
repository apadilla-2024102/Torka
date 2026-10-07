/**
 * Silueta vectorial de una moto eléctrica yolt, de perfil.
 *
 * Es el RESPALDO mientras no hay fotografías: cambia de color con el
 * selector de la ficha y dibuja los rasgos que distinguen a cada modelo
 * (parabrisas, parrilla, caja de reparto, una o dos baterías), así el
 * cliente entiende la diferencia entre modelos sin necesidad de foto.
 *
 * Es un dibujo original y genérico; no reproduce un modelo comercial.
 *
 * Código de color dentro del dibujo: el lima marca SOLO
 * la batería, igual que en el resto del sitio marca energía.
 */
const NEUMATICO = '#1d1e22'
const MECANICA = '#2b2c30'
const RIN = '#9a9ca3'

export default function MotoSilueta({
  color = '#c5f230',
  rasgos = {},
  titulo = 'Moto eléctrica yolt',
  className = '',
}) {
  const { parabrisas, parrilla, caja, dobleBateria, deportiva } = rasgos

  return (
    <svg viewBox="0 0 440 270" className={className} role="img" aria-label={titulo}>
      {/* Sombra sobre el piso */}
      <ellipse cx="224" cy="254" rx="186" ry="7" fill="#000" opacity="0.14" />

      {/* Caja de reparto (detrás del cuerpo) */}
      {caja && (
        <g>
          <rect x="34" y="62" width="82" height="62" rx="8" fill={MECANICA} />
          <rect x="34" y="62" width="82" height="14" rx="7" fill="#000" opacity="0.18" />
          <rect x="62" y="94" width="26" height="6" rx="3" fill={color} />
        </g>
      )}

      {/* Parrilla trasera */}
      {parrilla && (
        <g stroke={MECANICA} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M40 126 L112 126" />
          <path d="M52 126 L64 140" />
          <path d="M98 126 L104 136" />
        </g>
      )}

      {/* Parabrisas alto de turismo */}
      {parabrisas && (
        <path
          d="M318 100 Q322 64 340 38 L356 44 Q346 72 340 100 Z"
          fill="#b9c7d6"
          opacity="0.55"
          stroke={MECANICA}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      )}

      {/* Cúpula corta deportiva */}
      {deportiva && (
        <path d="M322 98 Q330 78 348 70 L354 78 Q344 88 342 100 Z" fill={MECANICA} />
      )}

      {/* Horquilla delantera */}
      <path d="M318 112 L340 204" stroke={MECANICA} strokeWidth="10" strokeLinecap="round" />

      {/* Brazo basculante con el motor en el buje trasero */}
      <path d="M108 204 L190 180 L196 194 L114 216 Z" fill={MECANICA} />
      <path d="M150 180 L130 150" stroke={MECANICA} strokeWidth="7" strokeLinecap="round" />

      {/* Ruedas */}
      {[108, 340].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="204" r="46" fill={NEUMATICO} />
          <circle cx={cx} cy="204" r="31" fill={RIN} />
          <circle cx={cx} cy="204" r="25" fill={NEUMATICO} />
          {[0, 60, 120].map((giro) => (
            <rect
              key={giro}
              x={cx - 2.5}
              y="180"
              width="5"
              height="48"
              rx="2"
              fill={RIN}
              transform={`rotate(${giro} ${cx} 204)`}
            />
          ))}
          <circle cx={cx} cy="204" r="8" fill={RIN} />
        </g>
      ))}
      {/* Disco de freno delantero */}
      <circle cx="340" cy="204" r="18" fill="none" stroke="#c9cbd1" strokeWidth="3" />

      {/* Carrocería en el color elegido */}
      <path
        d="M46 150 Q46 138 60 136 L210 134 Q226 134 230 150 L236 180 L264 180
           Q276 180 279 166 L290 118 Q294 98 314 94 L334 90 Q352 88 356 106
           L362 134 Q344 136 336 150 L326 176 Q316 196 292 198 L186 200
           Q146 200 128 184 L114 170 L74 170 Q46 168 46 150 Z"
        fill={color}
        stroke="#000"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        style={{ transition: 'fill 320ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      {/* Volumen: sombra en la parte baja de la carrocería */}
      <path
        d="M114 170 L236 172 L236 180 L264 180 Q276 180 279 166 L284 146
           L300 150 L292 176 Q282 196 262 198 L186 200 Q146 200 128 184 Z"
        fill="#000"
        opacity="0.16"
      />
      {/* Brillo superior del carenado */}
      <path d="M298 104 Q316 94 340 96" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Batería: una o dos celdas visibles en el costado */}
      {(dobleBateria ? [138, 186] : [160]).map((x) => (
        <g key={x}>
          <rect x={x} y="146" width="40" height="18" rx="4" fill={MECANICA} />
          <rect x={x + 4} y="150" width="32" height="10" rx="2" fill="#c5f230" />
        </g>
      ))}

      {/* Asiento */}
      <path d="M70 136 Q72 116 98 114 L200 112 Q220 112 222 128 L222 134 Z" fill="#232428" />

      {/* Manillar, espejo y faro */}
      <path d="M314 96 L300 66 L282 62" stroke={MECANICA} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="296" cy="50" rx="10" ry="6" fill={MECANICA} transform="rotate(-20 296 50)" />
      <path d="M298 62 L296 54" stroke={MECANICA} strokeWidth="3" />
      <path d="M350 104 L364 112 L362 124 L352 120 Z" fill="#fff6d5" stroke={MECANICA} strokeWidth="2" />

      {/* Piloto trasero */}
      <path d="M46 146 L58 142 L58 152 L46 154 Z" fill="#c5f230" stroke="#4a6600" strokeWidth="1.5" />
    </svg>
  )
}
