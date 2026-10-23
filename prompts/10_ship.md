# 10 — Ship / cierre de V1: pruebas, limpieza y entrega

## Objetivo
Entregar **una V1 funcional y revisada** del rediseño, lista para aprobación y publicación, sin features nuevas.

## Inspeccionar
Diff completo, `context.md` Definition of Done, `.agent-progress.md`, `LEON-XIV-README.md`, 7 páginas, home, links, JS/CSS/assets, avisos de registro, canonical y secretos.

## Ejecutar
1. Correr todas las pruebas que existan: humo funcional, filtros, calendario PRE/DURING/POST, teclado, mobile, reducción de movimiento y rutas.
2. Revisar consola/network, 404, imágenes y enlaces externos. Si posible, abrir producción/preview reales.
3. Buscar stubs/placeholder/TODO/FIXME relevantes, HTML mal cerrado, copy vencido y texto que prometa «en vivo» indebidamente.
4. Verificar que no se añadieron credenciales ni se expusieron datos; que JS está escapando textos y enlaces externos seguros.
5. Verificar SEO/OG/`canonical` con dominio real cuando esté confirmado; si no, dejar anotación sin cambiarlo ciegamente.
6. Evaluar rendimiento, accesibilidad, responsive y capturas finales **reales**. Reparar fallos introducidos.
7. Actualizar SOLO la documentación mínima de mantenimiento (cómo actualizar `leon-xiv-data.js`, fuentes y estados; cómo ejecutar preview y publicar en GitHub Pages).
8. Preparar resumen de cambios, archivos tocados, pruebas y resultados cuantificables, cuestiones editoriales pendientes y pasos exactos para deploy. Si hay autorización explícita y flujo permitido, publicar; de otro modo entregar listo para review sin afirmar que está desplegado.

## No tocar
No agregar nuevas funcionalidades, no cambiar framework, no rehacer diseño por capricho, no borrar historial ajeno ni hacer push en producción no autorizado.

## Aceptación final
Todas las 7 rutas y home funcionan; 23 puntos (o versión oficial actualizada respaldada) siguen visibles; datos actuales verificables; accesibilidad/performance sin fallos bloqueantes; sin popup intrusivo, sin AI slop; V1 revisada con guía de despliegue reproducible. Nada de «estructura preparada»: funcionalidad terminada y limitaciones explícitas.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
