"""
Encuadra las cuatro vistas recortadas de cada moto (PNG con transparencia)
en lienzos de 1320x810 con sombra suave, y las guarda como WebP en
public/modelos/fotos/<modelo>/<vista>.webp.

Las cuatro vistas de una moto quedan a la misma altura, para que el giro
de 360° no cambie de tamaño entre una foto y otra.

Uso: python encuadrar_vistas.py <carpeta_recortes>
     (la carpeta tiene <modelo>-<vista>.png, p. ej. city-frente.png)
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

R = Path(sys.argv[1])
D = Path(__file__).resolve().parents[3] / 'public/modelos/fotos'
W, H = 1320, 810
VISTAS = ['izquierda', 'frente', 'derecha', 'atras']


def recortar(p):
    im = Image.open(p).convert('RGBA')
    a = np.asarray(im)[..., 3]
    ys, xs = np.where(a > 20)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


for modelo in sorted({p.stem.split('-')[0] for p in R.glob('*-*.png')}):
    ims = {v: recortar(R / f'{modelo}-{v}.png') for v in VISTAS}
    # Altura común: la que permite que el perfil más ancho quepa a lo ancho.
    alto = min(H * 0.88, *(W * 0.92 * im.height / im.width for im in ims.values()))
    (D / modelo).mkdir(parents=True, exist_ok=True)
    for v, im in ims.items():
        esc = alto / im.height
        im = im.resize((round(im.width * esc), round(alto)), Image.LANCZOS)
        rgb = im.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
        rgb.putalpha(im.getchannel('A'))
        im = rgb
        lienzo = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        x = (W - im.width) // 2
        y = H - im.height - round(H * 0.05)
        sombra = Image.new('L', (W, H), 0)
        ImageDraw.Draw(sombra).ellipse(
            (x + im.width * 0.06, y + im.height - 14, x + im.width * 0.94, y + im.height + 16), fill=110
        )
        sombra = sombra.filter(ImageFilter.GaussianBlur(14))
        capa = Image.new('RGBA', (W, H), (0, 0, 0, 255))
        capa.putalpha(sombra)
        lienzo.alpha_composite(capa)
        lienzo.alpha_composite(im, (x, y))
        destino = D / modelo / f'{v}.webp'
        lienzo.save(destino, quality=86, method=6)
        print(destino.relative_to(D.parent.parent.parent), destino.stat().st_size // 1024, 'KB')
