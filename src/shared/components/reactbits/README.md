# Componentes de React Bits

Tomados de [React Bits](https://github.com/DavidHDev/react-bits), versión
Tailwind en JavaScript, commit `63a008d` (7 de octubre de 2026).

Licencia: **MIT + Commons Clause** (ver `LICENSE.md`, que debe quedarse
junto a estos archivos). Permite usarlos en este sitio, incluso con fines
comerciales; no permite vender ni redistribuir los componentes por separado.

Los cambios hechos para TORKA están marcados en el código con `[TORKA]`:

| Componente | Cambio |
|---|---|
| ScrollReveal | Limpieza limitada a sus propios disparadores (el original borraba todos los de la página), HTML válido, respeta "reducir movimiento" |
| ScrollVelocity | Texto accesible una sola vez para lectores de pantalla, banda quieta con "reducir movimiento" |
| Lightning | Libera el contexto WebGL al desmontarse |

Hyperspeed, ElectricBorder, ClickSpark, Magnet y SpotlightCard se usan sin
cambios; su configuración de marca vive en quien los usa.
