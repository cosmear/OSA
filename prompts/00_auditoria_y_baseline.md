# 00 — Auditoría real y baseline reproducible

## Objetivo
Establecer estado actual de la experiencia existente (no construir una app nueva), asegurar que el repo y las 7 rutas estén bien entendidos, y registrar evidencia inicial antes de cambios.

## Inspeccionar
`index.html`, `style.css`, `layout.js`, `java.js`, `novena.js`, `leon-xiv-argentina.html`, `leon-xiv-agenda.html`, `leon-xiv-dia-{8,9,10,11}.html`, `leon-xiv-participar.html`, `leon-xiv.css`, `leon-xiv.js`, `leon-xiv-data.js`, `LEON-XIV-README.md` y `imagenes/`. Revisar cambios locales existentes antes de editar. Verificar archivos del paquete viejo solo como historia, sin ejecutarlos.

## Implementar
Ningún rediseño en esta etapa. Preparar rama/backup según entorno. Levantar sitio con servidor estático; probar entrada home → landing → agenda → día → participar; tomar capturas reales en 390 y 1440 px si navegador disponible. Registrar inventario de densidad visual, superposiciones de headers, contraste, altura hero, popup, contenido JS/no-JS, tiempos y enlaces. Registrar archivos/funciones y zonas sensibles que no deben tocarse.

## No tocar
Ni código funcional ni contenido editorial, salvo reparar de inmediato un error que impida realizar la auditoría y quede trazado. No instalar framework.

## Aceptación/pruebas
Existe baseline reproducible (capturas reales o constancia explícita de que no fue posible), listado conciso de riesgos, 7 rutas reconocidas y servidor de preview comprobado. No inventar que se hizo inspección visual si solo se leyó CSS.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
