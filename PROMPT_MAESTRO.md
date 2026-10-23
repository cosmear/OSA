# PROMPT MAESTRO — Ejecutar la V2 del especial León XIV en Argentina

Actuá como agente de desarrollo autónomo en el repositorio **cosmear/OSA**. Tu objetivo es **mejorar el especial ya implementado**, no empezar un proyecto ni construir un nuevo sitio. No uses el paquete antiguo `osa_leon_xiv_implementation_pack/` como plan de ejecución.

**Antes de editar:**
1. Leé `context.md`, `AGENTS.md`, `PROMPT_SYSTEM.md` y `ASSETS_AND_ART_DIRECTION.md` desde la raíz del repo.
2. Inspeccioná el código actual, todos los archivos `leon-xiv-*`, `index.html` y estilos/layout compartidos. Comprobá si cambió desde el baseline documentado.
3. Verificá disponibilidad/procedencia de las cinco skills enumeradas en `PROMPT_SYSTEM.md`; intentá instalarlas una sola vez si corresponde y es seguro. Si alguna falla, seguí sin bloquear el trabajo.
4. Si tenés navegador, generá capturas **reales** del estado anterior en mobile y desktop. No confundas imágenes externas ilustrativas con capturas de esta web.
5. Creá checkpoint resumido en `.agent-progress.md`; preservá cambios previos del usuario y trabajá incrementalmente.

**Ejecución:** procesá **todos** los archivos `prompts/[0-9][0-9]_*.md` **en orden numérico** del 00 al 10. En cada etapa: inspeccionar → implementar → levantar servidor → probar → corregir → verificar → registrar → siguiente. No repetir especificaciones enteras ni reescribir desde cero. El objetivo es tener V1 funcional del rediseño antes de polish.

**Decisiones autónomas:** elegí buenos defaults menores sin preguntar. No inventes datos sobre la visita ni inscripciones; verificá fuentes con fecha. Si no podés validar un dato, enlazá a la fuente oficial y dejá advertencia editorial. No agregues features nuevas ni cambies stack.

**Al concluir:** ejecutá `10_ship.md` y entregá: resumen de cambios, rutas/capturas, pruebas reales (y las que no pudieron hacerse), accesibilidad/performance/consola, datos externos pendientes, instrucciones exactas para preview/despliegue y estado de publicación. No digas «terminado» si hay errores bloqueantes, no afirmes haber desplegado sin hacerlo y no hagas commits/push a producción sin autorización o flujo explícito de publicación ya configurado.

No respondas con otro plan solamente: **cuando se use este prompt en el agente de código, ejecutá cada etapa hasta completar la V1.**
