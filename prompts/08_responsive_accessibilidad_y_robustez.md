# 08 — Responsive, accesibilidad, semántica y fallback

## Objetivo
Corregir problemas de funcionamiento y legibilidad reales detectados tras el MVP, sin añadir nuevas features.

## Inspeccionar
Siete HTML del especial, `leon-xiv.js`, `leon-xiv.css`, estilos globales; capturas nuevas/anteriores, lógica `IntersectionObserver`, foco y manejo de JS deshabilitado.

## Implementar
Ajustes de márgenes/anchos en 375/390/768/1024/1440; headings bien anidados; HTML válido (incluyendo cierres `p`); alt/figcaption y accesibilidad de links; filtros aria-pressed y focus; menú y landmarks semánticos sin disparar el selector global `nav` de `style.css`; respeto a movimiento reducido. Mejorar fallback inicial HTML para ofrecer síntesis útil/links principales sin JS **sin duplicar los 23 horarios**. Evitar contenido oculto si observer no dispara. No comprometer degradación progresiva.

## No tocar
Arquitectura de datos, visual ya validado salvo mejoras puntuales, frameworks, contenido no verificado.

## Aceptación/pruebas
Sin overflow ni header tapando contenido; navegación funcional teclado/touch, foco siempre visible y contraste correcto; la página con JS desactivado comunica fecha/enlaces principales; no HTML inválido ni un `<nav>` nuevo roto en móvil; sin bloqueos al reducir animaciones.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
