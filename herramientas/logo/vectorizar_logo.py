"""
Vectoriza el logo oficial de yolt (PNG) a SVG.

    python3 herramientas/logo/vectorizar_logo.py     # requiere opencv-python y numpy

Entrada: herramientas/logo/original/yolt-logo.png (Y lima + "olt" blanco)
         herramientas/logo/original/yolt-isotipo.png (solo la Y)
Salida:  public/marca/yolt-logo-claro.svg   Y lima + "olt" hueso (fondos oscuros)
         public/marca/yolt-logo-oscuro.svg  Y lima hondo + "olt" grafito (fondos claros)
         public/marca/yolt-isotipo.svg      solo la Y, lima
         public/favicon.svg                 Y lima sobre grafito

Cada color se separa por umbral, se amplía 4x con suavizado para que las
curvas queden limpias y se traza con contornos (los huecos de la "o" se
conservan con fill-rule evenodd).
"""
from pathlib import Path

import cv2
import numpy as np

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]
LIMA, LIMA_HONDO, HUESO, GRAFITO = '#d6f715', '#4a6600', '#f1eee5', '#121212'
ESCALA = 4


def trazar(mascara):
    m = cv2.resize(mascara.astype(np.uint8) * 255, None, fx=ESCALA, fy=ESCALA, interpolation=cv2.INTER_CUBIC)
    m = cv2.GaussianBlur(m, (0, 0), ESCALA * 0.6)
    _, m = cv2.threshold(m, 127, 255, cv2.THRESH_BINARY)
    contornos, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    partes = []
    for c in contornos:
        if cv2.contourArea(c) < (ESCALA * 6) ** 2:
            continue  # motas de compresión
        c = cv2.approxPolyDP(c, ESCALA * 0.45, True)
        puntos = ' '.join(f'{p[0][0] / ESCALA:.1f} {p[0][1] / ESCALA:.1f}' for p in c)
        partes.append(f'M{puntos}Z')
    return ' '.join(partes)


def caja(*mascaras):
    ys, xs = np.where(np.logical_or.reduce(mascaras))
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def svg(viewbox, cuerpo, titulo='yolt'):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-label="{titulo}">'
        f'<title>{titulo}</title>{cuerpo}</svg>\n'
    )


def main():
    destino = RAIZ / 'public' / 'marca'
    destino.mkdir(parents=True, exist_ok=True)
    for viejo in destino.glob('*.svg'):
        viejo.unlink()

    rgb = cv2.cvtColor(cv2.imread(str(AQUI / 'original' / 'yolt-logo.png')), cv2.COLOR_BGR2RGB).astype(int)
    lima = (rgb[..., 1] > 150) & (rgb[..., 2] < 110) & (rgb[..., 0] > 120)
    blanco = rgb.min(axis=2) > 150
    x0, y0, x1, y1 = caja(lima, blanco)
    m = 4
    vb = f'{x0 - m} {y0 - m} {x1 - x0 + 2 * m} {y1 - y0 + 2 * m}'
    d_y, d_olt = trazar(lima), trazar(blanco)
    for nombre, c_y, c_olt in (('claro', LIMA, HUESO), ('oscuro', LIMA_HONDO, GRAFITO)):
        cuerpo = f'<path fill="{c_y}" fill-rule="evenodd" d="{d_y}"/><path fill="{c_olt}" fill-rule="evenodd" d="{d_olt}"/>'
        (destino / f'yolt-logo-{nombre}.svg').write_text(svg(vb, cuerpo))

    iso = cv2.cvtColor(cv2.imread(str(AQUI / 'original' / 'yolt-isotipo.png')), cv2.COLOR_BGR2RGB).astype(int)
    lima_i = (iso[..., 1] > 150) & (iso[..., 2] < 110) & (iso[..., 0] > 120)
    x0, y0, x1, y1 = caja(lima_i)
    d_i = trazar(lima_i)
    (destino / 'yolt-isotipo.svg').write_text(
        svg(f'{x0 - m} {y0 - m} {x1 - x0 + 2 * m} {y1 - y0 + 2 * m}', f'<path fill="{LIMA}" fill-rule="evenodd" d="{d_i}"/>')
    )
    lado = max(x1 - x0, y1 - y0) * 1.5
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    fondo = f'<rect x="{cx - lado / 2:.0f}" y="{cy - lado / 2:.0f}" width="{lado:.0f}" height="{lado:.0f}" rx="{lado * 0.22:.0f}" fill="{GRAFITO}"/>'
    (RAIZ / 'public' / 'favicon.svg').write_text(
        svg(f'{cx - lado / 2:.0f} {cy - lado / 2:.0f} {lado:.0f} {lado:.0f}', fondo + f'<path fill="{LIMA}" fill-rule="evenodd" d="{d_i}"/>')
    )


if __name__ == '__main__':
    main()
