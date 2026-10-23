# 02 — Fundamentos visuales sobrios sin cambiar identidad

## Objetivo
Unificar estilos y preparar una reducción real de peso visual, sin volver a diseñar toda OSA.

## Inspeccionar
`style.css` (tokens de OSA), `leon-xiv.css` (variables, botones, secciones, tipografía, efectos), capturas baseline y `ASSETS_AND_ART_DIRECTION.md`.

## Implementar
Reorganizar/reutilizar variables `leo-` y estilos: superficies claras predominantes, azul OSA en títulos/acciones, dorado como acento limitado; reglas homogéneas de espaciado, divisores, botones, links, titulares y texto legible. Eliminar redundancias CSS cuando sea seguro; normalizar `letter-spacing`, uppercase, radios y sombras. Conservar contraste WCAG y nombres públicos de clases para no romper JS.

## No tocar
Marcado funcional, datos, `style.css` de todo OSA salvo corrección imprescindible, estructura de páginas, eventos, imágenes nuevas.

## Aceptación/pruebas
Se ven coherentes al menos landing/agenda/participar; links y botones conservan estados hover/focus; visuales legibles en claro/oscuro sin invasión global. Comparar con baseline y verificar que no aparezcan regresiones en home OSA.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
