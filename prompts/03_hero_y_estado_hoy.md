# 03 — Portada: hero editorial y módulo temporal útil

## Objetivo
Reducir la cabecera casi full-screen y segunda franja oscura, elevando datos importantes.

## Inspeccionar
`renderLanding`, `todayMarkup`, `initHeroParallax`, estructura del `.leo-hero`/`.leo-today` en CSS, `imagenes/papa-leon.jpg` y baseline móvil.

## Implementar
Hero más compacto, jerarquía H1/fecha/ciudades/CTA, foto documental bien encuadrada sin mascarillas complejas; preferir composición editorial clara de dos columnas y un flujo mobile. CTA principal «Ver agenda» y enlace secundario «Cómo participar». Eliminar parallax si no mejora utilidad. PRE: barra clara concisa; DURING: «Ahora según cronograma / Próximo» sin afirmar live tracking; POST: archivo neutro y correcto. Corregir cierres HTML `</h3>` incorrectos en `todayMarkup()`. Restaurar padding horizontal real en `.leo-hero__inner` y `.leo-today__inner`.

## No tocar
Agenda/detalles de días, hora oficial ni other assets. No inventar fotografía ni transmisión en vivo.

## Aceptación/pruebas
En 375/390/1440 el hero no tapa el contexto útil, el contenido no toca bordes, CTA visibles, foto no invade texto; PRE/DURING/POST muestran estado correcto; consola sin error; motion reducido sin scroll effects; imagen y alt adecuados.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
