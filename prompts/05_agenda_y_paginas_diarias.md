# 05 — Agenda y páginas diarias editoriales

## Objetivo
Mejorar lectura de las 23 actividades y la navegación entre días, manteniendo datos y filtros.

## Inspeccionar
`renderAgenda`, `renderDay`, `eventFlag`, `mapLink`, CSS `.leo-agenda*`, `.leo-timeline`, `.leo-event*`, `.leo-pager*`, `leon-xiv-data.js`.

## Implementar
Agenda en filas/cronología con hora, evento y lugar claros; filtros accesibles con botones reales, indicador seleccionado y contraste. Encabezados de día compactos y jerarquía correcta; paginación anterior/siguiente/volver directa. Reducir etiquetas/badges innecesarios; dar prioridad a la hora y título; preservar enlaces de Maps válidos. En DURING destacar ahora/próximo con texto honesto y formato discreto. No esconder información por efectos visuales.

## No tocar
Datasets, 7 URL, configuración global, integración con Maps por enlaces externos, nuevas librerías.

## Aceptación/pruebas
23 eventos disponibles en orden por defecto, filtros Todos/8/9/10/11 correctos; fechas/hora Argentina y lugares completos, accesibilidad teclado/ARIA; páginas 8–11 navegables y sin enlaces muertos; verificar casos sin evento «Ahora»; pantallas mobile sin truncamiento accidental.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
