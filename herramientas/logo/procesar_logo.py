"""
Prepara el logo TORKA para la web a partir de la imagen original
(fondo blanco). Uso:  python3 herramientas/logo/procesar_logo.py

Genera en public/marca/:
  torka-logo-claro.webp    logo completo para fondo oscuro (letras blancas)
  torka-logo-oscuro.webp   logo completo para fondo claro (colores originales)
  torka-emblema.webp       solo la T roja
  torka-palabra-claro.webp solo "TORKA" en blanco (barra de navegación)
  favicon.png             emblema en cuadro de 64 px

No redibuja la marca: quita el blanco y, para fondo oscuro, cambia a blanco
solo los tonos neutros (negro y grises); el rojo se conserva tal cual.
"""
from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGEN = Path(__file__).with_name('torka-original.png')
DESTINO = RAIZ / 'public' / 'marca'

# Recortes medidos sobre la imagen original (x0, y0, x1, y1).
EMBLEMA = (318, 166, 890, 408)
PALABRA = (100, 421, 1106, 545)
COMPLETO = (95, 162, 1112, 598)


def sin_blanco(rgb):
    """Blanco a transparente (como "color a alfa"): bordes suaves intactos."""
    alfa = (255 - rgb).max(axis=2) / 255.0
    seguro = np.maximum(alfa, 1e-6)[..., None]
    color = (rgb - 255 * (1 - alfa[..., None])) / seguro
    return np.clip(color, 0, 255), alfa


def a_claro(color, alfa):
    """Neutros (negro, grises) a blanco papel; el rojo no cambia."""
    saturacion = color.max(axis=2) - color.min(axis=2)
    neutro = saturacion < 60
    salida = color.copy()
    salida[neutro] = (246, 246, 243)
    return salida, alfa


def guardar(color, alfa, caja, nombre):
    x0, y0, x1, y1 = caja
    rgba = np.dstack([color, alfa * 255])[y0:y1, x0:x1].round().astype(np.uint8)
    Image.fromarray(rgba, 'RGBA').save(DESTINO / nombre, quality=92, method=6)


def main():
    DESTINO.mkdir(parents=True, exist_ok=True)
    rgb = np.asarray(Image.open(ORIGEN).convert('RGB')).astype(float)
    color, alfa = sin_blanco(rgb)
    claro, _ = a_claro(color, alfa)

    guardar(color, alfa, COMPLETO, 'torka-logo-oscuro.webp')
    guardar(claro, alfa, COMPLETO, 'torka-logo-claro.webp')
    guardar(color, alfa, EMBLEMA, 'torka-emblema.webp')
    guardar(claro, alfa, PALABRA, 'torka-palabra-claro.webp')

    emblema = Image.open(DESTINO / 'torka-emblema.webp')
    lado = max(emblema.size)
    lienzo = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
    lienzo.paste(emblema, ((lado - emblema.width) // 2, (lado - emblema.height) // 2))
    lienzo.resize((64, 64), Image.LANCZOS).save(RAIZ / 'public' / 'favicon.png', optimize=True)


if __name__ == '__main__':
    main()
