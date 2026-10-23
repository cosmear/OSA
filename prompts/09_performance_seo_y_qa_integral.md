# 09 — Performance, SEO y pruebas end-to-end

## Objetivo
Medir/calibrar V1, reparar regresiones y validar presentación real, no agregar funciones.

## Inspeccionar
Todos los archivos cambiados, tamaños de imágenes, fuentes, `canonical`/OG/sitemap/robots, tests existentes si aparecieron en repo, `LEON-XIV-README.md`, estado QA y checklist en `context.md`.

## Implementar
Solo fixes necesarios: optimizar cargas e imágenes existentes respetando autoría, evitar listeners/parallax costosos, reducir CSS/JS redundante sin dañar `leo-*`, preload únicamente donde mejora LCP; metadatos coherentes sin adivinar dominio canónico. Introducir pruebas automatizadas ligeras **solo si su beneficio es claro**; no requerir stack JS pesado. Documentar límites de tooling.

## No tocar
Features nuevas, arquitectura global, contenidos que no se pueden verificar.

## Aceptación/pruebas
Recorrido end-to-end home→landing→agenda→día→participar→fuente; filtros, PRE/DURING/POST, sinJS, foco y responsive; errores de consola cero; rutas internas correctas; lighthouse/LCP/CLS medidos cuando haya herramientas (metas en `context.md`, resultados reales o impedimento documentado); captures before/after auténticas y sin falsa afirmación de QA visual.


> **Lectura mínima al iniciar la etapa:** `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md`, `ASSETS_AND_ART_DIRECTION.md` (revisar secciones pertinentes si ya se cargaron) y luego el código actual. Respetar jerarquía de fuentes. **Al finalizar:** correr, probar, corregir errores, documentar checkpoint y continuar con la siguiente etapa; no declarar terminada una etapa sin pruebas.
