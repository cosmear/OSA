# AGENTS.md — Reglas permanentes del agente | OSA León XIV

Este archivo rige toda modificación realizada desde este paquete. **No programar un proyecto nuevo: mejorar el que existe.**

## Jerarquía de fuentes

1. `context.md`: producto, alcance y comportamiento aprobados.
2. `AGENTS.md`: reglas de implementación y protección.
3. **Código real del repositorio**: implementación vigente mientras no contradiga los anteriores.
4. `prompts/NN_*.md`: tarea y criterios de cada etapa.
5. `ASSETS_AND_ART_DIRECTION.md`: dirección visual, imágenes y assets.
6. `PROMPT_SYSTEM.md`: metodología, skills y pruebas.

**Excepción editorial:** para hechos contingentes (horarios, accesos, inscripciones), ninguna especificación obsoleta prevalece sobre la fuente oficial fechada y comprobada. Documentar conflictos y conservar verificabilidad.

## Protección del alcance

- No inventar features, secciones promocionales, proveedores, identidades visuales ni contenido editorial.
- No transformar el especial en una SPA, SaaS, un CMS o una reescritura de OSA.
- No introducir frameworks, DB, SDK de mapas, librerías de animación ni backend sin una necesidad comprobada.
- No ejecutar prompts del paquete previo `osa_leon_xiv_implementation_pack/`: son una planificación antigua con objetivos diferentes.
- No modificar noticias ni campañas globales salvo el enlace/banner acordado del especial y correcciones estrictamente necesarias.

## Preservación del proyecto

Antes de tocar algo, leer los archivos afectados y su contexto. Conservar 7 rutas, IDs, nombres de datos, cronograma y enlaces; respetar `style.css`, `layout.js`, `java.js`, `novena.js`, `index.html` y navegación global. Cambios quirúrgicos con selectores `leo-*`; evitar CSS global sin necesidad. No eliminar código funcional solo porque se prefiere otro estilo. Crear rama o respaldo antes de cambios sustanciales.

## Implementación

- Soluciones simples y mantenibles; módulos claros; datos centralizados en `leon-xiv-data.js`; nombres descriptivos; mínima duplicación.
- Un cambio de diseño no permite modificar hechos. Un dato nuevo requiere fuente/documentación.
- No copiar 23 eventos en otro HTML/JS; generar vistas a partir del mismo dataset.
- Evitar TODOs como resultado final, features vacías, stubs, "remainder omitted", placeholders públicos o botones sin acción real.
- No sobreañadir jerarquías de sombras, glassmorphism, gradientes, badges, mayúsculas ni tarjetas por hábito.
- No utilizar imágenes genéricas de internet como si fueran capturas de la web; usar capturas **reales del navegador** cuando se comparen versiones.
- Si es imposible comprobar un contenido, diferenciarlo claramente y remitir a la fuente verificada.

## Calidad y verificación

Cada etapa: inspeccionar → implementar → correr → probar → corregir → verificar. Probar las rutas/funciones tocadas y regresiones adyacentes. El hecho de que el JS no tenga errores sintácticos **no prueba** que el diseño se vea bien. Verificar en navegador real, viewport móvil y desktop; inspeccionar consola; guardar capturas de antes/después cuando se pueda. Si no hay navegador disponible, informar limitación sin afirmar revisión visual.

## Seguridad y privacidad

No incorporar secretos ni claves en Git; validar y escapar textos/URLs externas; no recopilar datos personales ni crear registro propio; permisos mínimos; revisar dependencias y comandos que se instalen; `rel="noopener noreferrer"` con `target="_blank"`; no hacer afirmaciones sensibles sin fuentes.

## Decisiones autónomas

Elegir sin preguntar: detalles menores de padding, tokens derivados, microinteracciones, nombres internos, breakpoint fino, simplificación de CSS, organización de tests. Preguntar **solo** si existe un bloqueo de producto/arquitectura/alcance que no pueda resolverse prudentemente. Para dependencias editoriales no verificadas, usar estado informativo prudente y dejar constancia, sin frenar el resto.

## Definition of complete

Nunca cerrar una etapa que exige funcionalidad diciendo «base lista», «esqueleto completo» o «siguiente fase pendiente». Terminar flujos, ejecutar pruebas, arreglar regresiones y continuar a la siguiente etapa hasta `10_ship.md`. No desplegar sin verificar los hechos publicados y el destino de producción.
