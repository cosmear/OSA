# León XIV en Argentina — especial OSA Argentina (V2)

Especial temporal por el Viaje Apostólico del Papa León XIV a la Argentina,
del **8 al 11 de noviembre de 2026**.

No es un sitio aparte: vive dentro del sitio estático de OSA Argentina, usa el
mismo header/footer (`layout.js`), la misma paleta y tipografía, y no requiere
build, framework ni dependencias.

La **V2 (octubre de 2026)** rediseñó el especial existente: superficies claras,
hero más bajo con fotografía real, banda «Hoy» compacta, los cuatro días con un
mismo patrón, filas tipo agenda, menú interno reducido, inscripción verificada
y un aviso discreto en la portada de OSA en lugar del popup.

---

## Archivos

| Archivo | Qué es |
|---|---|
| `leon-xiv-argentina.html` | Portada del especial. |
| `leon-xiv-agenda.html` | Agenda completa (23 puntos) con filtro por día. |
| `leon-xiv-dia-8.html` … `-dia-11.html` | Una página por día. |
| `leon-xiv-participar.html` | Celebraciones abiertas, encuentros con inscripción obligatoria y condiciones. |
| `leon-xiv-data.js` | **Única fuente de verdad**: campaña, fuentes, inscripción, días e itinerario oficial. |
| `leon-xiv.js` | Fases de tiempo, menú interno, render de las páginas, aviso de la portada de OSA y enlace del menú global. |
| `leon-xiv.css` | Estilos del especial (namespace `leo-`). |
| `index.html` | Trae el aviso del especial dentro de `#leo-mount` (HTML estático: funciona sin JS). |
| `sitemap.xml` | Las siete URLs del especial. |

Cada página es una cáscara: `<head>` con su SEO, un **resumen útil sin
JavaScript** (fecha, días y enlaces, sin repetir los horarios) y los scripts.
El cuerpo lo arma `leon-xiv.js` según `data-leo-page` (`landing` / `agenda` /
`day` / `participar`).

`style.css`, `layout.js`, `java.js`, `novena.js` y el resto de las páginas no
se tocaron. La Novena conserva su popup y su clave de `localStorage`.

---

## Cómo está armado

**Menú interno:** `La visita · Agenda · Participar`. Durante la visita (8 al
11) aparece además **Hoy**, que lleva a la página del día en curso. Es sticky
solo en desktop (≥ 900 px); en el teléfono no suma una segunda barra fija.
Los días se recorren desde la portada, los filtros de la agenda y el paginador
«Día anterior / Día siguiente» de cada día.

**Banda «Hoy»** (portada; también en el día en curso y en Participar):

| Fase | Qué muestra |
|---|---|
| PRE | «Faltan N días», llegada del domingo 8 y estado del plazo de inscripción |
| DURING | «Ahora, según el programa» / «Próximo», con aviso de que no es un seguimiento en vivo |
| POST | «La visita terminó» y enlace al programa como archivo |

**Inscripción:** el especial no toma inscripciones ni datos personales. Enlaza
al sitio oficial (`registration.portalUrl`). Hasta `registration.deadline`
dice «Inscripción gratuita … hasta el miércoles 28 de octubre» y muestra el
botón «Inscribirse en el sitio oficial»; pasada esa hora muestra que el plazo
informado venció y remite al sitio oficial; después de la visita no habla de
inscripción.

**Portada de OSA:** ya no hay popup ni lanzador flotante. `index.html` trae una
franja azul debajo del header («León XIV en Argentina · 8 al 11 de noviembre de
2026 · Agenda y cómo participar»). `leon-xiv.js` le actualiza el estado
(«Faltan N días», «Hoy, lunes 9 de noviembre»…) y la oculta fuera de
`campaign.visibleFrom` – `campaign.archiveUntil`. No usa `localStorage`.

**Movimiento:** no hay parallax, entradas animadas ni efectos de scroll. Solo
transiciones cortas de color/subrayado en hover y foco.

**Detalle de `style.css`:** define `nav`, `nav ul`, `nav a` sin clase y por
debajo de 768 px oculta cualquier `<nav>`. Por eso el menú interno y el
paginador usan `<div role="navigation">`. Además, `blockquote` global trae
fondo y cursiva: `.leo-page .leo-quote` lo anula.

**Fotografía** (todas ya estaban en `imagenes/`; no se agregó ninguna):

- `papa-700x450.jpg` — hero de la portada del especial («Archivo OSA Argentina»).
- `papa-leon-agustinos-madrid.jpeg` — «Un Papa agustino», con pie que aclara
  que es Madrid, 7 de junio de 2026, no la visita a la Argentina.
- `papa-leon.jpg` — solo como imagen Open Graph (1200×265, panorámica: no
  sirve como foto de hero).

---

## Ver el sitio en local

Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

- `http://localhost:8000/` — portada de OSA con el aviso del especial
- `http://localhost:8000/leon-xiv-argentina.html` — portada del especial

No usar `file://`.

### Previsualizar otra fecha (solo en local)

`?leoDate=AAAA-MM-DDTHH:mm` en hora de Buenos Aires. **Solo funciona en
`localhost` y `127.0.0.1`**; en producción se ignora.

| Fecha | Qué debería verse |
|---|---|
| `2026-10-23T12:00` | PRE · «Faltan 16 días» · inscripción abierta hasta el 28/10 |
| `2026-10-30T12:00` | PRE · plazo de inscripción informado vencido |
| `2026-11-08T12:00` | DURING antes de llegar · «Hoy llega a Buenos Aires · faltan 4 h 30 min» |
| `2026-11-09T11:40` | DURING · «Ahora»: Santa Misa en el Monumento de los Españoles |
| `2026-11-10T13:00` | DURING sin punto activo · «No hay una actividad prevista…» y «Próximo» 15:15 |
| `2026-11-12T12:00` | POST · archivo, sin inscripción |

---

## Actualizar datos

Todo está en **`leon-xiv-data.js`**. No hay horarios escritos en el HTML.

**Programa:** editar el evento en `days[]`. Si viene de una publicación
oficial nueva, actualizar `updatedAt`/`updatedAtLabel` y sumar la fuente a
`sources[]`. La Santa Sede manda sobre cualquier otra fuente para horarios.

**Inscripción** (`registration`):

- Si la organización extiende el plazo: cambiar `deadline` (hora de Argentina)
  y `deadlineLabel`, sumar la fuente a `registration.sources` y actualizar
  `verifiedAt`/`verifiedAtLabel`.
- Reglas generales: `registration.rules` (texto plano, una por línea).
- Reglas por evento: campo `access` del evento (`recomendada`, `obligatoria`,
  `consultar`, definidos en `registration.access`) y `accessNote` opcional.

Campos de un evento:

```js
{
  time: "11:30",                       // hora de Argentina, obligatorio
  title: "Santa Misa",                 // obligatorio
  venue: "Monumento de los Españoles", // opcional
  city: "Buenos Aires",                // opcional
  category: "Celebración",             // opcional
  open: true,                          // celebración abierta: aparece en destacados y Participar
  access: "recomendada",               // opcional: regla de inscripción verificada
  accessNote: "…",                     // opcional: matiz verificado
  maps: "https://..."                  // opcional: enlace de ubicación
}
```

### Regla de contenido

No cargar accesos, sectores, horarios de apertura, transporte, transmisiones
ni reglas de inscripción sin una fuente fechada. Si algo no se puede
verificar, remitir al sitio oficial.

**Estado verificado el 23/10/2026:** programa = vatican.va (coincide punto por
punto). Inscripción = AICA y Canal C del 22/10/2026 (MDZ coincide). El sitio
`elpapaenargentina.com.ar` no permite lectura automática: verificarlo a mano.
AICA y Canal C mencionan una vigilia en el predio de Córdoba el lunes 9 que no
figura en el programa de la Santa Sede: solo aparece como nota de inscripción,
no en la agenda.

---

## Cuándo aparece y cuándo se apaga

`campaign.visibleFrom` / `campaign.archiveUntil` controlan el aviso en la
portada de OSA y el ítem **León XIV** del menú global. Pasado `archiveUntil`
el especial sigue online como archivo. Para sacarlo de la portada: quitar de
`index.html` el `<link>` a `leon-xiv.css`, el bloque `#leo-mount` y los dos
`<script>` del especial.

---

## Publicar (GitHub Pages)

El repositorio `cosmear/OSA` publica `main` en
`https://cosmear.github.io/OSA/`. Sin build:

```bash
git checkout -b leon-xiv-v2          # revisar en una rama
git add leon-xiv*.html leon-xiv*.js leon-xiv.css LEON-XIV-README.md index.html
git commit -m "León XIV en Argentina: V2 del especial"
git push origin leon-xiv-v2          # abrir PR y revisar
# al aprobar: merge a main → GitHub Pages publica solo
```

Después de publicar, abrir en el teléfono `…/leon-xiv-argentina.html`,
`…/leon-xiv-participar.html` y la portada, y forzar recarga (Ctrl+F5) si el
navegador muestra CSS/JS viejo.

**Dominio canónico:** los `<link rel="canonical">` y Open Graph apuntan a
`https://www.sanagustin.org/`. No se cambiaron: confirmar con quien administra
el dominio cuál es el definitivo antes de tocarlos.
