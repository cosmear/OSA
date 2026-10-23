# context.md — Producto y funcionalidades | OSA · León XIV en Argentina (V2)

## 1. Proyecto

**Qué estamos haciendo:** rediseñar y mejorar **el especial existente** «León XIV en Argentina» dentro de la web institucional de la Orden de San Agustín Argentina (OSA). La página específica es `leon-xiv-argentina.html`; el alcance incluye sus otras seis páginas vinculadas y su entrada promocional en `index.html`. El objetivo es **menor peso visual, mejor lectura y navegación, estética institucional/editorial que no parezca «AI slop»**, y contenido práctico actualizado.

**No** construimos una web separada, un videojuego, una SaaS, ni una reforma integral del sitio OSA. El plan anterior alojado en `osa_leon_xiv_implementation_pack/` es historia del producto: puede aportar contexto, pero sus instrucciones originales sobre crear el especial y hacer un popup impactante quedan superadas por esta V2.

**Por qué existe:** ayudar a visitantes, fieles y comunidades agustinianas a entender fechas, lugares y programa oficial del viaje de León XIV a la Argentina; encontrar cómo participar; y reconocer el vínculo del Papa con la Orden. La experiencia debe servir en tres etapas temporales: antes, durante y después de la visita.

**Usuario principal:** persona que llega en móvil desde un enlace/buscador y quiere saber **cuándo, dónde y cómo participar** en segundos. Usuarios secundarios: integrantes de OSA, parroquias, familias y quienes quieren consultar el programa por día o durante el evento.

**Principio UX:** _Información primero; identidad institucional después; decoración en último lugar._ La navegación debe sentirse como un especial editorial, no como una landing publicitaria.

## 2. Estado REAL ya implementado (23/10/2026)

Repositorio público: `https://github.com/cosmear/OSA`, rama principal `main`.

Sitio: `https://cosmear.github.io/OSA/leon-xiv-argentina.html`.

Stack actual: HTML, CSS, JavaScript vanilla, GitHub Pages; **sin build obligatorio, package manager, framework, base de datos ni backend**. Compartidos: `index.html`, `style.css`, `layout.js`, `java.js`, `imagenes/`, encabezado y pie. El especial usa `leon-xiv.css`, `leon-xiv.js`, `leon-xiv-data.js` y `LEON-XIV-README.md`.

Rutas existentes que **se conservan**:

| Ruta | Función |
|---|---|
| `leon-xiv-argentina.html` | portada/landing |
| `leon-xiv-agenda.html` | agenda consolidada con filtro por día |
| `leon-xiv-dia-8.html` | domingo 8 de noviembre |
| `leon-xiv-dia-9.html` | lunes 9 |
| `leon-xiv-dia-10.html` | martes 10 |
| `leon-xiv-dia-11.html` | miércoles 11 |
| `leon-xiv-participar.html` | celebraciones e indicaciones de participación |

La agenda se modela desde `window.LEON_XIV_ARGENTINA_2026` en `leon-xiv-data.js`, con **4 días y 23 puntos** al momento de esta especificación. `leon-xiv.js` genera contenido, menú, filtros, estados temporales y popup/lanzador de la portada general; usa prefijo de clases `leo-`. No replicar manualmente el programa en varias páginas.

**Hallazgos reales del código que requieren atención:**

- `leo-hero__inner` puede ocupar hasta 720 px / cerca de un viewport; hero azul muy oscuro con máscaras, degradados y parallax.
- `leo-today` añade una segunda franja oscura de tres columnas aun en fase previa.
- `leo-daycard` tiene cuatro tratamientos diferentes (`nth-child`, fondos con gradientes, fotos solo en días 8 y 9, número delineado en día 11).
- Se ofrecen accesos repetidos a la agenda, incluido CTA oscuro final redundante.
- Dos sistemas de navegación visibles: header global más subnav sticky `Inicio · Agenda · Hoy · Participar · 08 · 09 · 10 · 11`; «Hoy» redirige a la agenda fuera de la visita.
- `index.html` abre un modal por primera visita tras 700 ms; en móvil el modal ocupa la pantalla completa y existe un lanzador flotante.
- El HTML inicial de la landing contiene contenido de reserva mínimo; una herramienta que no ejecuta JavaScript solo lee el aviso de que hace falta JS. No presentar ese texto como si fuera toda la página renderizada.
- `todayMarkup()` incluye cierres `</h3>` para elementos `<p>` en el estado PRE/POST: corregir semántica.
- `.leo-hero__inner` y `.leo-today__inner` reasignan `padding` con horizontal `0` y pueden dejar la lectura pegada al borde en móvil.
- `updatedAtLabel` en datos aún refiere al **21/09/2026** y el texto público presume que no hay instrucciones de inscripción; requiere verificación documental actual.
- Los metadatos `canonical`/Open Graph apuntan a `www.sanagustin.org`, mientras el sitio suministrado funciona en GitHub Pages. No cambiar un dominio canónico automáticamente: verificar cuál es el definitivo.

**No se dispone aquí de una captura integral del DOM ejecutado.** Las observaciones previas vienen de código/estructura; el agente debe obtener capturas reales desde navegador antes de afirmar cómo se ve el diseño y después de editar. Las imágenes de ejemplo utilizadas en una respuesta anterior **no pertenecen a esta web** y no constituyen referencia visual de su estado actual.

## 3. Objetivos cerrados para V1 del rediseño

1. Disminuir el predominio de bloques azul casi negro y dorado ornamental; priorizar blanco/marfil, azul institucional para titulares/acento y dorado escaso.
2. Hero editorial **más bajo**, con H1, fecha, ciudades, fotografía real aprobada y un CTA principal; evitar fotografía oscurecida con máscaras complejas y parallax innecesario.
3. «Hoy / Próximo»: antes del viaje, **banda compacta clara**; durante, módulo útil «Ahora según programa / Próximo»; después, resumen/archivo discreto. Jamás confundir cálculo temporal con transmisión en vivo.
4. Cuatro días bajo **un mismo patrón** de listado/módulos: día, ciudad, nombre, enlace. Evitar variaciones arbitrarias de fondos y tarjetas; mantener navegación directa a cada día.
5. «Encuentros destacados» en filas limpias tipo agenda; horario y localización legibles; comunicar claramente reglas de inscripción verificadas.
6. Simplificar navegación interna en las páginas del especial (p. ej. «La visita / Agenda / Participar»), sin repetir una pestaña «Hoy» que en PRE remite a lo mismo que Agenda. Accesos por día dentro del cronograma.
7. Priorizar el valor editorial exclusivo de OSA: «Un Papa agustino», fotografía auténtica, cita agustiniana y breve contexto verificable.
8. Quitar el CTA final redundante de «Cronograma completo», mantener fuentes y fecha comprobable de última revisión en un cierre sobrio.
9. Convertir la irrupción del popup inicial en entrada **no invasiva** desde la home (aviso/banner visible y accesible, o enlazado discreto); no interrumpir automáticamente la visita al sitio con el modal. El enlace del menú principal se conserva durante la campaña.
10. Arreglar problemas de semántica/márgenes y asegurar legibilidad, responsive, accesibilidad y rendimiento. El especial debe seguir visualmente integrado a OSA.

**Regla de diseño:** no confundir «más liviano» con una web vacía. Conservar todos los datos y accesos útiles, quitando presentación repetida y ornamento innecesario.

## 4. Jerarquía de información y pantalla principal

Orden propuesto (adaptable si una inspección real demuestra una alternativa mejor):

1. Header global existente + subnavegación simplificada.
2. Hero informativo: «León XIV en Argentina», **8–11 noviembre 2026**, ciudades, imagen real, «Ver agenda» y enlace secundario «Cómo participar».
3. Banda contextual según fase temporal: pre / durante / post.
4. «La visita, día por día» (8, 9, 10, 11), cuatro accesos consistentes.
5. «Participá de las celebraciones / Encuentros destacados»: filas escaneables y CTA directo al portal oficial cuando corresponda.
6. «Un Papa agustino»: foto, historia concreta, cita, enlace OSA relacionado.
7. Fuentes oficiales y revisión; sin último bloque de CTA duplicado.

**Desktop:** hero en dos columnas texto-foto o composición editorial equivalente; limitar anchura de lectura.
**Tablet:** sin columnas aplastadas, navegación clara.
**Mobile:** una columna, orden de lectura natural, header sin superposiciones, sin desbordes horizontales.

## 5. Funcionalidad por ruta y flujo de usuario

### Portada

El visitante conoce inmediatamente evento/fechas, puede entrar a la agenda o información de participación, saltar a cualquiera de los cuatro días y verificar fuentes. Si el viaje aún no empezó, mostrar un estado previo preciso, sin «en directo» falso. No ocultar las próximas opciones detrás de pantallas grandes.

### Agenda (`leon-xiv-agenda.html`)

Presenta los **23 eventos actuales** por 4 días, horas en `America/Argentina/Buenos_Aires`, localización y agrupación clara. Filtro «Todos / 8 / 9 / 10 / 11» funcional por teclado y móvil; tiene `aria-pressed` coherente y eventos no duplicados. La vista que no aplica debe poder ocultarse sin perder los datos. Enlaces a páginas diarias y a ubicaciones si existen.

### Día individual (`leon-xiv-dia-8.html` … `-11.html`)

Encabezado conciso con fecha/ruta/tema del día; cronología por hora en orden, estado contextual durante visita y enlaces a día anterior/siguiente y agenda. `time datetime` y jerarquía de encabezados semánticos.

### Participación (`leon-xiv-participar.html`)

Diferenciar claramente **celebraciones masivas** de **encuentros con inscripción, validación y/o cupos**, SOLO cuando las fuentes lo respalden. Mostrar estados `Inscripción abierta` / `Cerrada` / `Información en verificación` según datos verificados y fecha aplicable, no mensajes viejos «todo por confirmar». CTA hacia portal oficial externo; **no captar datos personales ni montar inscripciones propias**. No presentar `open: true` como garantía de libre acceso irrestricto: describe la naturaleza del evento, no condiciones de ingreso.

### Home de OSA (`index.html`)

El especial se descubre mediante enlace y aviso sobrio sin overlay involuntario. La home y resto de secciones OSA siguen funcionando. No alterar otros modales/campañas (por ejemplo, Novena) ni sus preferencias almacenadas.

### Flujos centrales

1. **Consulta:** entra → hero → elige día o agenda → lee hora y lugar → fuente oficial.
2. **Participación:** entra → «Participar» → revisa requisitos vigentes → sale al sitio oficial para inscribirse.
3. **Durante visita:** entra → ve «ahora/próximo según cronograma» → abre día correspondiente; no interpreta que se actualice por señal en vivo.
4. **Desde OSA:** navega home global → aviso/enlace → micrositio → vuelve fácilmente al sitio institucional.
5. **Después:** portada deja de afirmar que «falta X»; conserva archivo y fuentes y no exhibe llamadas a inscripciones vencidas.

## 6. Datos, estados, roles e integraciones

**Datos existentes:** campaña/fechas/copy, días, 23 eventos, horarios, ciudades, sedes, categorías, enlaces de Maps, cuatro marcadores actuales `open: true`, fuentes URL/organismo/fecha, imágenes/captions, actualización publicada. Conservar `leon-xiv-data.js` como fuente de verdad; puede ampliarse de modo acotado con datos operativos `registration`/`verifiedAt`/`validUntil` cuando haga falta y estén respaldados.

**Estados principales:** `PRE`, `DURING`, `POST` en el código (no introducir enum paralelo). Tiempo de referencia: zona de Buenos Aires; fecha de viaje 8–11/11/2026; llegada y salida oficiales disponibles en `campaign`. La etiqueta «Ahora» es una **inferencia de horario**; informar que puede haber variaciones. `?leoDate=...` está habilitado solamente en localhost/127.0.0.1 para previsualizar los estados, no en producción.

**Roles:** visitantes públicos sin inicio de sesión. Equipo editorial OSA actualiza archivos en Git; no hay roles de usuario en la web.

**Integraciones:** sitios oficiales externos (Santa Sede, oficina de prensa, portal de la visita), Google Maps mediante enlaces simples, Google Fonts/F. Awesome ya presentes. No hay API en vivo, RSS exigido, CMS, BD, pagos, email propio, ni identificación personal.

**Idioma:** español, variante Argentina; mantener `lang="es"`, mayúsculas naturales, acentos correctos. **Responsive** en desktop/tablet/móvil. **Privacidad:** no recolectar inscripciones ni datos del usuario; `localStorage` solamente si realmente sirve para una función consentida, respetando la página general.

## 7. Integridad editorial y fuentes: datos de octubre 2026

**Fuentes del itinerario:**
- Santa Sede: https://www.vatican.va/content/leo-xiv/es/travels/2026/documents/uruguay-argentina-peru-6-17novembre2026.html
- Oficina de Prensa (21/09): https://press.vatican.va/content/salastampa/es/bollettino/pubblico/2026/09/21/210926d.html

**Nueva información a verificar e incorporar:** AICA informó el **22/10/2026** que los formularios oficiales de inscripción estaban disponibles hasta el **28/10/2026**, para misas en Buenos Aires/Córdoba/Luján y encuentros con jóvenes y clero; inscripción gratuita. Indicó matices de acceso: en misas, inscripción recomendada; algunos otros encuentros requieren email/aprobación y QR; determinados colectivos requieren reglas diferenciadas. Fuente: https://aica.org/imprimir-noticia.php?id=76104 . Portal oficial identificado por AICA: https://www.elpapaenargentina.com.ar/ (accesibilidad desde automatización puede variar).

**No convertir esta noticia fechada en una verdad permanente.** El agente deberá comprobar vigencia y enlaces en momento de implementación/publicación, en particular a partir del 29/10. Si hay contradicción entre notas y programa de horarios, mantener las horas de la Santa Sede hasta modificación oficial. Las reglas de inscripción proceden del organizador y fuentes confiables identificadas, con enlace y fecha. Si no se puede verificar una condición puntual, mostrar «Consultá condiciones actualizadas en el sitio oficial», sin inventar. No alterar horarios o rutas por intuición.

## 8. Requisitos no funcionales

- **Accesibilidad:** objetivo WCAG 2.2 AA: contraste normal >= 4.5:1; controles identificables; foco visible; teclado completo en menú/filtros/modal si queda; destino claro de enlaces; no hover exclusivo; objetivos táctiles adecuados (aprox. 44×44 px cuando sea posible); `prefers-reduced-motion`; alt de imagen informativa; capturas/documentos atribuibles.
- **Performance:** página estática liviana, sin librerías UI ni imágenes nuevas pesadas. Evitar parallax por scroll y filtros de imagen caros. Optimizar LCP real, imágenes dimensionadas, fuentes con `display=swap` ya existente y lazy loading donde corresponda. Objetivos de validación: CLS <= 0.1, LCP <= 2.5 s en condiciones razonables de prueba y Lighthouse móvil ~90+ si viable (no mentir si entorno no lo permite).
- **Robustez:** sin errores de consola, links internos válidos, fallback legible sin JS, sin `</h3>` huérfanos, sin overflow horizontal de contenido. Mantener páginas utilizables incluso con fuentes o assets no disponibles.
- **Compatibilidad:** navegadores modernos; verificar 375/390/768/1024/1440 px y flujos con teclado. Respetar `style.css` y `layout.js` sin regressiones globales.
- **Seguridad:** escapar contenido externo antes de insertarlo; no `innerHTML` sin escape en datos no controlados; `noopener noreferrer` al abrir pestañas externas; no introducir claves ni dependencias externas sin justificación.
- **SEO:** título y descripción honestos por ruta, `canonical` final revisada con el dueño de dominio, Open Graph coherente, sitemap/robots existentes. Página inicial con resumen significativo aun sin ejecutar JS, sin duplicar manualmente los 23 horarios.

## 9. Restricciones y decisiones cerradas

- Preservar **siete URLs** y contenido oficial; no renombrarlas ni migrarlas sin razón.
- Mantener **HTML/CSS/JS vanilla**; paleta OSA; tipografías Cormorant Garamond y Montserrat; header/footer compartidos; español.
- Conservar posibilidad de agenda por día y navegación de ida/vuelta.
- Imágenes solo reales y atribuibles. No presentar imágenes de búsquedas genéricas, renders IA ni mockups como si fueran capturas de esta página o fotografías documentales de la visita.
- Usar un solo sistema visual de ritmos, espaciado y acentos. Eliminar gradientes, sombras o movimientos arbitrarios, no indiscriminadamente todos los recursos gráficos.
- No abrir automáticamente un modal que interrumpa a toda persona que llega a OSA.
- No reorganizar ni rediseñar el resto de OSA.
- No escribir ni desplegar código a producción automáticamente si faltan verificaciones esenciales.

## 10. Non-goals / Out of Scope — PROTECCIÓN CONTRA SCOPE CREEP

NO construir V1: nuevo sitio/dominio separado; Next.js/React/Vue; CMS; base de datos; autenticación; panel editorial; app móvil; chatbot/IA; inscripciones y formularios con datos personales; pagos; notificaciones; livestream embebido; seguimiento GPS en vivo del Papa; mapas con SDK; reserva de sectores; alojamientos/transporte; newsfeed automático; fotogalería masiva; historias generadas por IA; generador de flyers; reescritura integral de `style.css`, `layout.js` o otras páginas; nuevo diseño de marca; nueva arquitectura para todo OSA. No gastar tiempo en "features por si acaso".

## 11. Open Decisions — solo si realmente se bloquea algo

**Ninguna decisión bloqueante para comenzar o cerrar V1 en GitHub Pages.**

- **Dominio canónico de producción:** `www.sanagustin.org` está en los metadatos actuales y GitHub Pages es la URL de revisión. No adivinar cuál prevalece: conservar la configuración hasta verificarla; dejar explícita esta dependencia en cierre si no se obtiene confirmación. **No impide rediseñar ni probar.**
- **Reglas operativas de acceso por evento y vigencia de inscripciones:** dato editorial externo, no decisión de producto. Verificar y publicar solo datos corroborados; si no están, enviar al portal oficial y documentar la limitación. **No detiene V1.**

## 12. Definition of Done (V1 terminada)

1. Las 7 rutas existentes funcionan sin enlaces rotos y no se perdió ningún punto vigente del itinerario.
2. La home de OSA permite llegar al especial sin popup auto-invasivo y las otras páginas institucionales siguen operativas.
3. Portada visualmente más liviana: hero más corto, contraste correcto, «Hoy» compacto en PRE, tarjetas de días consistentes, filas de encuentros, sin CTA final repetida.
4. Agenda/filtros/días/prev-next/participar funcionan en mouse, teclado y móvil.
5. PRE/DURING/POST verificadas con horario de Buenos Aires y modo de previsualización local, sin afirmaciones de live tracking ni inscripciones vencidas.
6. Fechas/requisitos/inscripciones respaldados por enlaces oficiales y con «última revisión» verdadera.
7. No cambios de alcance fuera del especial ni regresiones en otras campañas del sitio.
8. Capturas reales comparativas desktop+mobile, evaluación de legibilidad y movimiento reducido.
9. Sin fallas bloqueantes de accesibilidad, errores de consola, bugs de responsive, contenido HTML inválido o regresiones.
10. Instrucciones exactas para preview, validación y despliegue; resultado final es **V1 funcional**, no un scaffold o mockup.
