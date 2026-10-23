# PROMPT_SYSTEM.md — Sistema de trabajo autónomo, tecnología y QA

## Principio

Es una metodología **general de desarrollo de software**, aplicada en este repositorio a un rediseño de una web estática. Adaptar herramientas al dominio; no asumir videojuegos, motores gráficos, SaaS o backend cuando no existen.

Flujo de cada etapa:

`READ → INSPECT → PLAN → IMPLEMENT → RUN → TEST → FIX → VERIFY → CONTINUE`

Mantener plan interno breve: el objetivo es entregar comportamiento verificable, no generar documentos interminables. Leer la documentación principal una vez al comienzo; releer únicamente las secciones necesarias durante cada etapa. Registrar un checkpoint de una línea por etapa en `.agent-progress.md` (estado, archivos, prueba y hallazgo), para poder retomar tras interrupciones sin reconstruir lo ya hecho. Ese registro no es producto público.

## Skills preferidas: instalación inicial

Verificar qué skills están disponibles y **revisar su procedencia y scripts antes de ejecutarlos**; si faltan, intentar al comienzo las cinco indicadas:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill gpt-taste
npx skills add https://github.com/Leonxlnx/taste-skill --skill redesign-existing-projects
npx skills add https://github.com/Leonxlnx/taste-skill --skill full-output-enforcement
npx skills add https://github.com/Leonxlnx/taste-skill --skill high-end-visual-design
npx skills add https://github.com/Leonxlnx/taste-skill --skill image-to-code
```

- **gpt-taste:** evitar UI genérica y «AI slop»; criterio visual.
- **redesign-existing-projects:** auditar primero y mejorar lo existente sin destruir funcionalidad.
- **full-output-enforcement:** exigir archivos completos, sin stubs ni código omitido.
- **high-end-visual-design:** pulir tipografía, jerarquía, composición y microinteracciones según dirección editorial OSA (no «SaaS premium»).
- **image-to-code:** solo cuando existan capturas reales/referencias aprobadas; nunca simular haber inspeccionado la web a través de fotografías de ejemplos ajenos.

No reinstalar cada etapa. Si la instalación indica que ya existe, continuar. Si alguna falla por red/permisos, documentar el motivo y continuar con criterios equivalentes cuando sea posible; **no ejecutar scripts externos desconocidos a ciegas**. Estas skills orientan al agente, no son dependencias del sitio en producción.

## Tecnología detectada (mantener)

| Elemento | Decisión / razón |
|---|---|
| Runtime | Navegador: sitio estático, sin servidor de aplicación |
| Lenguajes | HTML5 + CSS3 + JavaScript ES6+ (nativo, suficiente para este sitio) |
| Framework | Ninguno: no introducir React/Next/Vue ni bundler sin necesidad |
| Package manager | Ninguno para producción. `npx` se usa solo para skills o herramienta eventual de QA |
| Fuente tipográfica | Cormorant Garamond (titulares) + Montserrat (cuerpo), existentes |
| Iconografía | SVG inline en `leon-xiv.js` y elementos existentes; no añadir icon pack |
| Datos | `leon-xiv-data.js`, objeto compartido `window.LEON_XIV_ARGENTINA_2026` |
| Persistencia | No requerida; no BD/Auth. Mantener lógica local solo si imprescindible |
| Hosting/preview | GitHub Pages, servido desde `/OSA/`; preservar rutas relativas |
| Producción canónica | `www.sanagustin.org` figura en metadata: **verificar antes de editar** |
| Integraciones | Vatican/portal de visita por enlace, Maps por URL simple, fuentes remotas actuales |
| Testing | Smoke tests y matriz manual con navegador; automatización ligera solo si ya existe o se justifica |
| Lint/format | Sin configuración base obligatoria. Validar HTML/CSS/JS y mantener estilo del repositorio |

**No introduzcas ni package.json, ni pipeline de CI, ni Puppeteer/Playwright a producción simplemente para realizar cambios visuales.** Un runner temporal de tests está permitido si aporta valor, sin inflar runtime.

## Fases de implementación

**MVP funcional (etapas 00–07):** inventario y baseline; corrección editorial respaldada; sistema visual; hero/banda hoy; navegación; agenda/días; participación; sección agustina/fuentes/entrada home. Tras cada paso, mantener rutas operativas y contenidos coherentes.

**Robustez, polish y ship (etapas 08–10):** accesibilidad, mobile, semántica y fallback; SEO/rendimiento y prueba de extremo a extremo; cierre productivo. No abrir nuevos features en polish.

## Arranque local

Desde raíz del repo, usar servidor estático que respete rutas relativas:

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000/leon-xiv-argentina.html`. Si Python no está disponible, usar otro servidor local simple existente; no instalar un framework para servir HTML.

**No usar `file://` como prueba concluyente** para routing y carga de assets. Para GitHub Pages, comparar comportamiento en `https://cosmear.github.io/OSA/leon-xiv-argentina.html` cuando corresponda y se tenga acceso.

## Matriz mínima de QA

- Rutas: 7 páginas del especial + home OSA; navegación retorno, anterior/siguiente y enlaces externos.
- Viewports: 375, 390, 768, 1024, 1440 px; comprobar texto, columnas, menú sticky, footer y CTA.
- Usuarios: pointer, teclado (Tab, Enter, Espacio, Escape si quedan diálogos), touch emulado.
- Fases: `PRE`, `DURING`, `POST` mediante la previsualización local `?leoDate=2026-11-07T12:00`, `?leoDate=2026-11-10T10:10`, `?leoDate=2026-11-12T12:00` y al menos un momento dentro de la visita sin punto activo.
- JS y resiliencia: con/sin JS, enlaces de fuentes, imagen no disponible, navegación sin filtros.
- A11y: headings H1/H2/H3, contraste, focus-visible, etiquetas, `aria-pressed`, `alt`, enlaces inequívocos, reducción de movimiento.
- Estado/content: ningún dato inventado; fuentes y revisión vigentes; inscripciones vencidas no deben anunciarse como abiertas.
- QA de regresión: modal/campaña Novena y navegación global de OSA conservan funcionalidad.

## Visual QA

Tomar capturas **reales** (no imágenes ilustrativas) del sitio antes y después, al menos en mobile y desktop. Comparar longitud hero, jerarquía, contraste, margen lateral y prominencia de información. Si no se puede abrir un navegador/screenshot, registrar en informe «QA visual no ejecutada» y no fingir que se hizo. Aplicar `prefers-reduced-motion` y verificar que contenido siga visible.

## Performance/SEO

No introducir nuevas librerías de UI. Medir al menos tamaño de CSS/JS, imágenes usadas, CLS/LCP en navegador si la herramienta existe, ausencia de scroll handlers costosos, carga del hero, enlaces y meta etiquetas. Comprobar `canonical` por entorno antes de modificarlo y consistencia con OG/sitemap. Si Lighthouse no está disponible, hacer revisión reproducible e informarlo.

## Entrega autónoma

- Iniciar con inspección y solo detenerse por bloqueo material.
- Cada etapa contiene `Scope`, `No tocar`, `Criterios`, `Pruebas` para evitar preguntas rutinarias.
- Tras cada etapa, anotar brevemente pruebas ejecutadas y resultado. Corregir fallos introducidos antes de seguir.
- No sustituir pruebas con capturas de pantallas o resultados simulados.
- En ship, dejar comandos de verificación y publicación, diff/resumen de archivos y riesgos externos, sin afirmar despliegue si no ocurrió.
