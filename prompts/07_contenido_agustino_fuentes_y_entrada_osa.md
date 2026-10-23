# 07 — Sección agustina, fuentes, limpieza de CTA y home OSA

## Objetivo
Dar personalidad editorial OSA al especial y quitar la interrupción publicitaria desde la home.

## Inspeccionar
`renderLanding` (bloque `.leo-osa`, `.leo-quote`, `.leo-cta`, `sourcesSection`); `initPopup`, `initNavLink` y estilos `.leo-modal`, `.leo-launcher`; `index.html`, `layout.js`, `novena.js` y assets locales.

## Implementar
Conservar «Un Papa agustino» con foto documental real de Madrid y pie honesto, cita y contexto verificados, estilo de nota editorial, párrafo conciso. Eliminar CTA oscuro final a «agenda» por duplicidad. Mantener fuentes oficiales al pie con actualización legible. En `index.html`, sustituir **autoapertura** del modal Leo por presencia sobria (banner/enlace) que no tape contenido; si sobrevive una opción manual, que sea accesible y no repetitiva. Preservar enlace global y navegación de OSA. No modificar modal Novena.

## No tocar
Noticias no relacionadas, identidad global, otros popups/campañas, URL de producción sin verificación, programa oficial.

## Aceptación/pruebas
No hay modal intrusivo automático en primera visita; desde home se llega al especial; las notas con imagen no se presentan como fotografía de noviembre 2026; el último CTA redundante desapareció, no las fuentes; regresión de Novena, móvil y navegación global superada.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
