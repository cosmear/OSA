# ASSETS_AND_ART_DIRECTION.md — Identidad y sistema visual del especial

## 1. Personalidad buscada

**Institucional, argentino, agustino, editorial, humano, sobrio y legible.** Una cobertura excepcional dentro de OSA; no un sitio comercial ni una colección de widgets. Referencia conceptual: una portada de revista o diario institucional de buena factura; la información y la fotografía mandan.

No importar imágenes ilustrativas de respuestas anteriores: **no eran fotos ni capturas del sitio**. El agente debe tomar screenshots reales de `https://cosmear.github.io/OSA/leon-xiv-argentina.html` ejecutando JS, y hacer inventario de assets del repo.

## 2. Identidad que no se cambia

Variables reales de OSA en `style.css`/`leon-xiv.css`:

| Token / uso | Valor existente / orientación |
|---|---|
| Azul corporativo `--azul` | `#151f43`: títulos, navegación, algún botón |
| Dorado `--dorado` | `#c5a24a`: acento escaso, líneas pequeñas |
| Dorado claro | `#e0c878`: acento sobre azul oscuro cuando contraste lo permite |
| Superficie gris OSA `--gris` | `#f4f4f4`: alternancia muy sutil |
| Blanco | `#ffffff`: superficie dominante |
| Tinta de lectura | cerca de `#1b1f31` (ya usada en el especial) |
| Tipografía títulos | `Cormorant Garamond`, con `Georgia` fallback |
| Tipografía cuerpo/UI | `Montserrat`, con Arial/sans-serif fallback |

No inventar nuevo logo, nueva paleta vaticana, banderas/motivos patrióticos dominantes. Se admiten blancos cálidos y tonalidades suaves **derivadas** de tokens OSA, verificando contraste. Reducir fondos `#070b1f`/`#0c1230` encadenados y el uso de azul casi negro como bloque de varias pantallas.

## 3. Jerarquía tipográfica

- H1 protagonista pero no gritado: serif elegante, **sin mayúsculas forzadas** si perjudican lectura; máximo 2–3 líneas en mobile.
- H2 de sección serif con escala homogénea; subtítulos en sans más sobria.
- Cuerpo legible: objetivo 16 px (1rem) y `line-height` 1.55–1.7; limitar ancho a ~60–70 caracteres según contenido.
- Fechas/horas: `font-variant-numeric: tabular-nums`; un nivel de énfasis superior al cuerpo, sin tamaños gigantes en cada fila.
- Labels cortos uppercase solo cuando ayudan, `letter-spacing` moderado (no 0.2em repetido por toda la página).
- Reducir botones con ALL CAPS y tracking exagerado. Botones nombrados como acciones humanas: «Ver agenda», «Cómo participar», «Ver el día».

## 4. Composición, espaciado y densidad

- Contenedor máximo cercano al existente (`--leo-shell: 1140px`); páginas de lectura estrechas cuando conviene.
- Márgenes laterales móviles mínimos 20–24 px; nunca elementos informativos pegados al borde.
- Secciones ~48–72 px desktop / ~32–52 px móvil, ajustando por contenido. Separación **menor entre bloques** y **suficiente dentro de párrafos/filas**.
- No usar una card alta por cada información mínima. Reemplazar con listas/filas y divisores finos.
- No más de una sección oscura consecutiva; preferible fondo global claro y módulos funcionales discretos.
- Botones: primario una vez por bloque que realmente lo requiera; links de texto para navegación editorial.
- Bordes de 1 px, radios discretos (0–6 px), sombras ausentes o muy suaves. Sin marcos de oro, pills decorativos ni glow.

## 5. Hero

**Antes:** altura que puede rozar un viewport, gradientes radiales, imagen con máscara/oscurecida y parallax.

**Después:** cabecera informativa de menor altura; foto documental real a un lado y H1/fecha/ciudades en área clara, si la fotografía tiene calidad y proporción suficiente. Puede adaptarse a una composición apilada en móvil. Máxima prioridad: título/fecha/CTA visibles sin scroll desmesurado. El contenido no debe quedar cubierto por máscaras ni texto encima de una imagen con contraste inseguro.

Usar `imagenes/papa-leon.jpg` solo si resolución y recorte reales lo permiten; no aumentar artificialmente su detalle. Alternativa sin nueva foto: cabecera tipográfica simple **antes que usar imagen generada**.

## 6. Hoy / Próximo

- PRE: línea o banda clara compacta; fecha, próximo evento principal o «faltan X días» y acceso al cronograma; no tres columnas oscuras.
- DURING: «Ahora según el programa», «Próximo», hora, lugar, fuente de que no es información live; prioridad funcional, no espectáculo.
- POST: archivo y resumen discretos, sin urgencia ficticia.
- No usar badge «EN VIVO» ni contadores en tiempo real no verificados.

## 7. Los cuatro días y agenda

- Cuatro módulos del mismo sistema: `08`, `09`, `10`, `11`; día + ciudad + actividad principal + enlace.
- No cuatro backgrounds radicalmente distintos, ni gradientes diferentes por `nth-child`, ni una fecha outline frente a tres sólidas.
- En mobile, lista vertical fácil de escanear. En desktop, grilla coherente de 2/4 o lista editorial según resultado real.
- Agenda principal tipo cronología/lista: izquierda hora, centro evento, derecha ubicación/enlace cuando alcance; adaptar a filas verticales sin truncar nombres.
- Eventos destacados: filas similares a la agenda, no CTA-cards redundantes.

## 8. Bloque «Un Papa agustino» y fuentes

- Conservar como punto identitario fuerte de OSA, fotografía real `imagenes/papa-leon-agustinos-madrid.jpeg`, cita atribuida y párrafo breve verificable.
- Pie de foto legible y apropiado; no representarla como foto de la visita 2026 si es de Madrid.
- Fuentes en cierre con título pequeño, enlaces reales y fecha de verificación; no repetir un banner final para dirigir a la agenda.

## 9. Entrada en la home de OSA

- No autoabrir el modal de 900 px que tapa la primera interacción y ocupa todo el teléfono.
- Preferir banner/cinta institucional compacto en `index.html` con título, fecha y enlace, respetando la navegación y diseño existentes.
- Si se conserva un lanzador/manual modal por razones de comunicación, que no interrumpa, no duplique el banner ni tape contenido/acciones móviles; etiqueta y cerrar accesibles.
- El popup/launcher de otras campañas de OSA no se altera.

## 10. Fotografía y estrategia de assets

Prioridad estricta:

1. Archivos **ya existentes** en el repositorio, verificados y con contexto correcto.
2. Assets originales/propios aprobados por OSA.
3. Fotografías externas con procedencia y licencia/reutilización comprobadas, descargadas localmente con atribución cuando corresponda.
4. Generación asistida solo para **decoración abstracta** si es realmente necesaria, nunca para falsificar registro documental del Papa.
5. Placeholders únicamente durante prototipado; se eliminan antes de cerrar V1.

Assets observados: `imagenes/papa-leon.jpg`, `imagenes/papa-700x450.jpg`, `imagenes/papa-leon-agustinos-madrid.jpeg`, `imagenes/logo_new.png`. Inspeccionar tamaño, licencia y uso antes de redimensionar/eliminar. No hotlinkear imágenes ajenas. No incorporar un retrato de búsqueda genérica como si fuera el mismo asset. Registrar fuente/autor/licencia de cada nuevo asset; nunca añadir marcas de agua de stock.

## 11. Motion y microinteracciones

- Hover/focus: cambios de color/underline muy sutiles; filas y botones se perciben interactivos.
- Evitar parallax en hero, escalados agresivos, transiciones por todas partes, observers que retardan contenido útil y animaciones «cinematográficas» innecesarias.
- Una entrada suave opcional puede existir en elementos no críticos, si no retrasa lectura ni oculta contenido en un browser sin JS.
- Respetar `prefers-reduced-motion: reduce` y evitar scroll effects caros.

## 12. Estados visuales y accesibilidad

- Loading: el contenido editorial crítico debe mostrarse directamente o con fallback meaningful; no spinner al arrancar página estática.
- Empty: si no hay evento «Ahora», mostrar «No hay una actividad prevista en este momento» y el próximo, sin huecos vacíos.
- Error/dato externo no disponible: aviso neutral con enlace a fuente, nunca estimar horarios, inscripciones o plazas.
- Focus visible, links reconocibles, contraste AA, `alt` correcto, íconos decorativos ocultos al lector de pantalla, teclado en filtros, `aria-current` correcto.
- Mobile 375–430: sin ancho accidental, hit targets ~44 px, menú corto visible, secciones no gigantes, fotografías con `object-position` probado y textos completos.
- Entre 768–1024: evitar columna 3 de “Hoy” desproporcionada, menú que colisiona o navegación sticky duplicada.

## 13. What this must NOT look like

- NO "AI slop": tarjetas gigantes repetidas, tarjetas flotantes por cada línea, CTA cada 20 cm, etiquetas decorativas everywhere.
- NO gradientes al azar, auroras radiales, glow, glassmorphism, blur/masks superpuestas o esquinas arbitrariamente redondeadas.
- NO hero oscuro de casi una pantalla seguido por otra franja oscura del mismo peso.
- NO sitio fintech/SaaS, dashboard, videogame, scroll-jacking o micrositio separado.
- NO banners engañosos «en vivo» ni countdown agresivo.
- NO retratos papales fabricados, fotos de otros sitios presentadas como capturas del código real ni imágenes sin licencia.
- NO mayúsculas, tracking exagerado, pequeños textos grises sobre blanco, animaciones que ocultan agenda.
- NO sobrecorrección minimalista que borre información relevante o identidad agustina.

## 14. Barra de calidad visual

Al comparar capturas **auténticas** desktop/mobile antes-después, debe apreciarse: información principal más arriba, menos superficies oscuras, más legibilidad, todos los días tratados coherentemente, recorridos fáciles y apariencia inequívocamente OSA. Ningún elemento debe parecer diseñado solo «para llenar espacio».
