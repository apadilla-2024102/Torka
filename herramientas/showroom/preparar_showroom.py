"""
Prepara las fotos y el video del showroom para la web.

    python3 herramientas/showroom/preparar_showroom.py   # requiere Pillow y ffmpeg

Fotos: corrección sobria y uniforme (un poco menos de saturación, más
contraste, viñeta suave) y WebP de 1400 px como máximo.
Video: 12 s del recorrido, 540x960, sin audio, en WebM (VP9) y H.264 con
inicio rápido, más un póster del primer cuadro.
"""
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

AQUI = Path(__file__).resolve().parent
ORIGEN = AQUI / 'originales'
DESTINO = AQUI.parents[1] / 'public' / 'showroom'

FOTOS = {
    'foto-05.jpeg': 'showroom-lateral-naranja',
    'foto-15.jpeg': 'showroom-lateral-grafito',
    'foto-04.jpeg': 'showroom-frente-naranja',
    'foto-07.jpeg': 'showroom-frente-blanca',
    'foto-08.jpeg': 'showroom-frente-crema',
    'foto-01.jpeg': 'showroom-frente-negra',
}


def vineta(tamano, fuerza=0.35):
    w, h = tamano
    m = Image.new('L', (w, h), 0)
    ImageDraw.Draw(m).ellipse((-w * 0.25, -h * 0.2, w * 1.25, h * 1.2), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(min(w, h) * 0.18))
    return m.point(lambda v: int(255 - (255 - v) * fuerza))


def foto(origen, nombre):
    im = ImageOps.exif_transpose(Image.open(origen)).convert('RGB')
    im.thumbnail((1400, 1400), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(0.85)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    oscura = ImageEnhance.Brightness(im).enhance(0.55)
    im = Image.composite(im, oscura, vineta(im.size))
    im.save(DESTINO / f'{nombre}.webp', quality=80, method=6)


def video():
    origen = ORIGEN / 'recorrido.mp4'
    salida = DESTINO / 'recorrido.mp4'
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-ss', '0', '-t', '12', '-i', str(origen),
        '-vf', 'scale=540:960,eq=saturation=0.85:contrast=1.06:brightness=-0.02,fps=30',
        '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', str(salida),
    ], check=True)
    # WebM (VP9) como primera opción: navegadores sin H.264 también lo reproducen.
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-i', str(salida), '-an', '-c:v', 'libvpx-vp9',
        '-b:v', '0', '-crf', '38', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
        str(DESTINO / 'recorrido.webm'),
    ], check=True)
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-i', str(salida), '-frames:v', '1',
        '-q:v', '4', str(DESTINO / 'recorrido-poster.jpg'),
    ], check=True)


def main():
    DESTINO.mkdir(parents=True, exist_ok=True)
    for origen, nombre in FOTOS.items():
        foto(ORIGEN / origen, nombre)
    video()


if __name__ == '__main__':
    main()
