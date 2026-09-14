# Skills instaladas

Subconjunto curado de la librería [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills),
vendorizado en este repo para que esté disponible en cualquier sesión de Claude Code que trabaje sobre Torka.

- **Origen:** `alirezarezvani/claude-skills`
- **Commit fijado:** `19392f7a08264ed00486a251f5b2098321771f94`
- **Licencia:** MIT (ver `LICENSE` en el repo de origen)
- **Instalado:** 10 de 846 skills disponibles

## Por qué un subconjunto y no la librería completa

Claude carga la descripción de **cada** skill instalada en el contexto de cada sesión. Vendorizar las 846
satura el contexto y empeora la elección de skill. Se instaló solo lo que transfiere al negocio:
venta consultiva de acabados para construcción (residencial y comercial).

## Skills instaladas

| Skill | Para qué sirve aquí |
|---|---|
| `commercial-skills` | Router: enruta a la sub-skill correcta cuando la petición es ambigua |
| `deal-desk` | Revisión de operación concreta: margen tras descuento, ruteo de aprobación, detección de cláusulas trampa |
| `commercial-policy` | Matriz de descuentos por volumen/plazo, umbrales de aprobación, política de excepciones |
| `rfp-responder` | Licitaciones y concursos: parseo de requisitos, matriz de evidencias, decisión bid / no-bid |
| `pricing-strategist` | Diseño de precio y empaquetado por niveles (bueno / mejor / premium), sensibilidad al precio |
| `channel-economics` | Venta directa vs. canal (distribuidor, contratista): costo de servir y rentabilidad real por canal |
| `commercial-forecaster` | Pronóstico de pipeline por etapa con tramos comprometido / probable / solo-pipeline |
| `partnerships-architect` | Alta de socios de canal: nivel, compromiso conjunto y reparto de margen vs. venta directa |
| `sales-engineer` | Matrices comparativas frente a competencia y preparación técnica de propuesta |
| `contract-and-proposal-writer` | Propuestas, SOW, NDA y contratos marco |

## Qué se dejó fuera deliberadamente

De los dominios `commercial` y `business-growth` se excluyeron por ser nativas de SaaS y no transferir:

- `customer-success-manager` — scoring de salud de cuenta y churn por suscripción
- `revenue-operations` — MAPE de forecast y eficiencia GTM de SaaS
- `business-growth-skills` — router de un dominio del que solo se tomaron 2 skills

## Advertencias de uso

- **Jurisdicción:** `contract-and-proposal-writer` cubre US (Delaware), UE, Reino Unido y DACH.
  **No cubre derecho mexicano.** Para contratos en México usa la skill `contract-review-mx` y valida con abogado.
- **Terminología SaaS:** varias skills hablan de ARR, NRR y suscripción. La lógica de margen, descuento y
  canal transfiere, pero traduce los términos a tu realidad (venta por m², obra, volumen por proyecto).
- **Scripts:** 24 utilidades en Python, solo biblioteca estándar. No requieren instalar dependencias.

## Ampliar o actualizar

Para añadir más skills de la misma librería:

```bash
git clone --depth 1 https://github.com/alirezarezvani/claude-skills.git /tmp/cs
cp -r /tmp/cs/<dominio>/skills/<skill> .claude/skills/
```

Dominios disponibles: `engineering`, `marketing-skill`, `finance`, `c-level-advisor`, `product-team`,
`project-management`, `business-operations`, `research`, `compliance-os`, `productivity`, entre otros.

Candidatos más probables para este negocio, si más adelante hacen falta:
`business-operations/skills/procurement-optimizer` y `business-operations/skills/vendor-management`
(compra a fábricas y negociación con proveedores).
