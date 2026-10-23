# 01 — Integridad de datos, inscripción y contenido fechado

## Objetivo
Que las afirmaciones públicas del micrositio sean exactas y actuales **antes** de pulir la apariencia.

## Inspeccionar
`leon-xiv-data.js`, `leon-xiv.js` (OPEN_EVENTS/`participationMarkup`/`todayMarkup`/`sourcesMarkup`), `leon-xiv-participar.html`, `LEON-XIV-README.md`. Contrastar agenda y fechas con URL oficial de Santa Sede documentada en `context.md`; revisar AICA 22/10/2026 y el portal oficial para inscripción/requisitos. Detectar noticias fechadas y contradicciones; no asumir que todo sigue vigente.

## Implementar
Corregir textos «no hay datos de acceso» cuando existan pautas comprobadas; establecer presentación diferenciada para misas masivas y eventos con requisitos particulares; enlazar al sitio oficial de inscripciones (sin procesarlas localmente); incorporar fecha de verificación auténtica, `validUntil` o texto prudente para caducidad después del 28/10 si corresponde. Mantener los 23 eventos salvo evidencia oficial de cambio; categorizar eventos sin inferir acceso a partir de `open: true`. Mantener un solo dataset y timestamps Argentina. No modificar datos de la Santa Sede sin fuente.

## No tocar
Diseño general, infraestructura, identidad OSA, backend/registro, agenda de otros países. No copiar literalmente artículos de prensa largos ni crear datos ficticios. No inventar reglas de menores/QR/cupos sin fuente vigente.

## Aceptación/pruebas
Horarios/fechas corresponden a fuentes; no se exhibe inscripción abierta tras su vencimiento sin nueva confirmación; todas las URLs oficiales apuntan a destino razonable; «Última revisión» es verdadera; ninguna condición incierta se comunica como garantía. Verificar PRE y POST en localhost; comprobar links, sintaxis y ausencia de errores.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
