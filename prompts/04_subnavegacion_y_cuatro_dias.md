# 04 — Navegación clara y cuatro días consistentes

## Objetivo
Quitar repetición de header/subnav y cards «de IA» sin perder accesos directos.

## Inspeccionar
`renderSubnav`, `daysMarkup`, `leo-subnav`, `leo-days`, `.leo-daycard` y responsive en `leon-xiv.css`; interacción con header inyectado en `layout.js`.

## Implementar
Menú interno reducido a «La visita / Agenda / Participar» (o equivalente igual de conciso probado visualmente). Si se muestra «Hoy» durante la visita, hacerlo de forma contextual y solo si no duplica otra ruta. Los cuatro días están en lista/grilla editorial uniforme con fecha, ciudad y síntesis, sin gradientes `nth-child` arbitrarios, outlining inconsistente o fondo fotográfico en unos sí/otros no sin criterio; navegación directa preservada. Resolver sticky y anclas sin solapamientos.

## No tocar
Header global fuera de lo imprescindible, 7 rutas existentes, contenido de itinerario ni fuentes.

## Aceptación/pruebas
Sin overflow horizontal (375, 390, 768, 1024, 1440); foco/`aria-current` correctos; todos los cuatro días accesibles; subnav no duplica enlaces confusos en PRE; textos legibles sin hover; footer y header OSA sin regresiones.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
