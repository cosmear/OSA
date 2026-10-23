# Paquete autónomo de implementación — León XIV en Argentina (V2)

**Proyecto:** mejorar el especial *León XIV en Argentina* existente dentro del sitio estático de OSA Argentina. **No es un proyecto nuevo ni la programación del rediseño.** El ZIP entrega instrucciones y prompts para que un agente lo implemente después.

- Sitio bajo revisión: https://cosmear.github.io/OSA/leon-xiv-argentina.html
- Repositorio: https://github.com/cosmear/OSA
- Referencia de código comprobada: rama `main`, consulta del 23/10/2026.
- Idioma de la experiencia: español de Argentina.

## Cómo usar

1. Guardar una copia/branch del repositorio antes de trabajar.
2. Descomprimir **el contenido de este paquete en la raíz del repositorio**, conservando la carpeta `prompts/`. No sobrescribir archivos existentes sin comparar; en particular, si ya hay un `AGENTS.md`, fusionar reglas sin perder ninguna de seguridad.
3. Abrir Codex, Claude Code o Antigravity en la raíz del repositorio.
4. Enviar **solo el texto de `PROMPT_MAESTRO.md`**. El agente leerá los demás archivos y realizará las etapas, con verificaciones intermedias.
5. Revisar el informe de cierre y publicar cuando se haya validado la fuente oficial y el dominio de producción.

> El repositorio ya contenía `osa_leon_xiv_implementation_pack/` y `osa_leon_xiv_implementation_pack.zip`: corresponden a una planificación previa orientada a crear el especial. **Este paquete V2 tiene prioridad para el rediseño del especial ya implementado.** No ejecutes ambas secuencias.

## Contenido

- `context.md`: qué producto se mejora, conducta esperada, alcance y criterios de aceptación.
- `AGENTS.md`: reglas permanentes para cualquier agente.
- `PROMPT_SYSTEM.md`: metodología autónoma, skills, stack y pruebas.
- `ASSETS_AND_ART_DIRECTION.md`: arte, fotos, jerarquía visual y «qué NO debe parecer».
- `PROMPT_MAESTRO.md`: instrucción única para ejecutar todas las etapas.
- `prompts/00_...md` a `prompts/10_...md`: secuencia de implementación.

No se incluyó código de producto, ni se modificó el repositorio remoto.
