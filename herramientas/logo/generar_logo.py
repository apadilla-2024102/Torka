"""
Genera el logotipo de yolt en SVG (trazos, sin depender de fuentes).

    python3 herramientas/logo/generar_logo.py      # requiere fonttools

La palabra "yolt" se dibuja con Outfit Bold (licencia OFL, ver
OFL-Outfit.txt) convertida a trazos; el rayo es un trazo propio.

Salida en public/marca/ y public/favicon.svg:
  yolt-logo-claro.svg    rayo lima + palabra hueso (fondos oscuros)
  yolt-logo-oscuro.svg   rayo y palabra grafito (fondos claros)
  yolt-rayo.svg          solo el rayo (isotipo)
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]
LIMA, HUESO, GRAFITO = '#c5f230', '#f1eee5', '#141414'

# Rayo: dos tramos inclinados con el quiebre al centro (alto 860, ancho 500).
RAYO = 'M310 0 20 500H240L130 860 500 320H300L480 0Z'
RAYO_ANCHO, RAYO_ALTO = 500, 860


def palabra(texto, peso=700, tracking=-20):
    fuente = instantiateVariableFont(TTFont(AQUI / 'Outfit-variable.ttf'), {'wght': peso})
    glifos, mapa = fuente.getGlyphSet(), fuente.getBestCmap()
    asc = fuente['hhea'].ascent
    trazos, limites, x = [], BoundsPen(glifos), 0
    for letra in texto:
        g = mapa[ord(letra)]
        pluma = SVGPathPen(glifos)
        matriz = (1, 0, 0, -1, x, asc)
        glifos[g].draw(TransformPen(pluma, matriz))
        glifos[g].draw(TransformPen(limites, matriz))
        trazos.append(pluma.getCommands())
        x += glifos[g].width + tracking
    return ' '.join(trazos), limites.bounds  # (xmin, ymin, xmax, ymax); línea base en y = asc


def svg(viewbox, cuerpo, titulo):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-label="{titulo}">'
        f'<title>{titulo}</title>{cuerpo}</svg>\n'
    )


def main():
    destino = RAIZ / 'public' / 'marca'
    destino.mkdir(parents=True, exist_ok=True)
    d, (x0, y0, x1, y1) = palabra('yolt')
    base = 1000  # línea base de la palabra
    # El rayo va a la izquierda, del alto de la "l" a un poco bajo la base.
    alto_rayo = (base - y0) * 1.12
    escala = alto_rayo / RAYO_ALTO
    ancho_rayo = RAYO_ANCHO * escala
    separacion = 70
    rayo_x = x0 - separacion - ancho_rayo
    rayo_y = y0 - (alto_rayo - (base - y0)) / 2
    rayo = f'<path transform="translate({rayo_x:.1f} {rayo_y:.1f}) scale({escala:.4f})" d="{RAYO}"/>'
    vb = f'{rayo_x - 10:.0f} {y0 - 60:.0f} {x1 - rayo_x + 20:.0f} {y1 - y0 + 120:.0f}'

    for nombre, c_rayo, c_palabra in (('claro', LIMA, HUESO), ('oscuro', GRAFITO, GRAFITO)):
        cuerpo = f'<g fill="{c_rayo}">{rayo}</g><path fill="{c_palabra}" d="{d}"/>'
        (destino / f'yolt-logo-{nombre}.svg').write_text(svg(vb, cuerpo, 'yolt'))

    (destino / 'yolt-rayo.svg').write_text(svg(f'0 0 {RAYO_ANCHO} {RAYO_ALTO}', f'<path fill="{LIMA}" d="{RAYO}"/>', 'yolt'))
    favicon = (
        f'<rect width="1000" height="1000" rx="220" fill="{GRAFITO}"/>'
        f'<path fill="{LIMA}" transform="translate(265 120) scale(0.88)" d="{RAYO}"/>'
    )
    (RAIZ / 'public' / 'favicon.svg').write_text(svg('0 0 1000 1000', favicon, 'yolt'))


if __name__ == '__main__':
    main()
