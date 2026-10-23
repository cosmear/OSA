# León XIV en Argentina — especial OSA Argentina

Especial temporal por el Viaje Apostólico del Papa León XIV a la Argentina,
del **8 al 11 de noviembre de 2026**.

No es un sitio aparte: vive dentro del sitio estático de OSA Argentina, usa el
mismo header/footer (`layout.js`), la misma paleta y tipografía, y no requiere
build, framework ni dependencias.

---

## Archivos

El especial es un **micrositio de siete páginas** dentro del sitio de OSA.
Ninguna repite datos: todas se arman desde `leon-xiv-data.js`.

### Páginas (cáscaras)

| Archivo | Qué es |
|---|---|
| `leon-xiv-argentina.html` | Landing. Puerta de entrada al especial. |
| `leon-xiv-agenda.html` | Cronograma completo, con filtro por día. |
| `leon-xiv-dia-8.html` … `-dia-11.html` | Una página por día, con su cronograma. |
| `leon-xiv-participar.html` | Celebraciones abiertas a los fieles. |

Cada página es una cáscara mínima: `<head>` con su SEO, un `<h1>` y un aviso
por si el JavaScript no corre. El cuerpo lo arma `leon-xiv.js` a partir del
atributo `data-leo-page` (`landing` / `agenda` / `day` / `participar`).

### Lógica y datos

| Archivo | Qué hace |
|---|---|
| `leon-xiv-data.js` | **Única fuente de verdad**: campaña, fuentes, recorrido, días e itinerario oficial. |
| `leon-xiv.js` | Fases de tiempo, menú interno, render de las cuatro clases de página, popup y lanzador. |
| `leon-xiv.css` | Estilos del micrositio (namespace `leo-`). |
| `LEON-XIV-README.md` | Este documento. |

### Modificados

| Archivo | Cambio |
|---|---|
| `index.html` | `<link>` a `leon-xiv.css`, el div `#leo-mount` y los dos `<script>`. 6 líneas. |
| `sitemap.xml` | Las siete URLs del micrositio. |

### Sin tocar

`style.css`, `layout.js`, `java.js`, `novena.js` y el resto de las páginas.
La Novena sigue intacta y con su propia clave de `localStorage`.

---

## Cómo está armado

### Navegación

El usuario llega a cualquier evento importante en **dos clics como máximo**:
desde la landing, una tarjeta de día o un encuentro destacado lleva directo a
la página del día.

`leon-xiv.js` inyecta un **menú interno sticky** en el div `#leo-subnav` de
cada página: `Inicio · Agenda · Hoy · Participar · 08 · 09 · 10 · 11`. Se
ancla debajo del header de OSA (usa `--leo-headroom`, que mide su alto) y en
mobile se vuelve una barra horizontal scrolleable. El ítem **Hoy** apunta a la
página del día en curso durante la visita, y a la agenda el resto del tiempo.

Cada página de día tiene además `← Día anterior · Volver · Día siguiente →`.

### Agregar una página al micrositio

Copiar cualquier cáscara, cambiar el `<title>`, la descripción, el
`<link rel="canonical">`, el `<h1>` y el `data-leo-page`. Si es un día nuevo,
agregarlo en `leon-xiv-data.js` con su `page`: el menú interno, las tarjetas y
el paginador lo toman solos.

### Movimiento

Es discreto y no estorba la lectura: entradas suaves de algunos bloques
(`data-leo-in` + `IntersectionObserver`), hover en fotos y enlaces, y un
parallax corto de la fotografía del hero. No hay secciones ancladas durante
varias pantallas ni scroll horizontal. Con `prefers-reduced-motion: reduce`
todo queda quieto y el contenido no cambia.

### Largo de las páginas

Medido a 1440×900: landing **4,3 pantallas**, agenda 3,7, cada día 2,6–2,9,
participar 2,4.

### Un detalle que conviene recordar

`style.css` define `nav`, `nav ul` y `nav a` **sin clase**, y por debajo de
768 px le aplica `position:absolute; max-height:0` a cualquier `<nav>` de la
página. Por eso el menú interno y el paginador usan
`<div role="navigation">` en vez de `<nav>`. Si en el futuro se agrega
un `<nav>` al especial, va a desaparecer en mobile.

### Fotografía

El especial usa las fotografías de León XIV que ya existían en `imagenes/`.
No se generó ni se descargó ninguna imagen nueva.

- `papa-leon.jpg` — hero de la landing, popup y fondo de la tarjeta del día 8.
- `papa-700x450.jpg` — fondo de la tarjeta del día 9.
- `papa-leon-agustinos-madrid.jpeg` — bloque "Un Papa agustino".

Las tarjetas de los días 10 y 11 se resuelven con color y tipografía porque no
hay fotografía aprobada de Córdoba ni de Luján. Si llega una, se agrega como
`chapter.photo` del día correspondiente en `leon-xiv-data.js`.

---

## Ver el sitio en local

Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Después abrir:

- `http://localhost:8000/` — portada con el popup y el lanzador
- `http://localhost:8000/leon-xiv-argentina.html` — la landing del especial

No usar `file://`: los scripts y el estado dependen de servirlo por HTTP.

---

## Previsualizar otra fecha (solo en local)

El especial cambia según la hora de Buenos Aires
(`America/Argentina/Buenos_Aires`). Para probar las tres fases sin cambiar el
reloj de la máquina:

```
http://localhost:8000/leon-xiv-argentina.html?leoDate=2026-11-09T11:40
```

Formato: `YYYY-MM-DDTHH:mm`.

El override **solo funciona en `localhost` y `127.0.0.1`**. En producción se
ignora siempre y manda el reloj real. Un valor inválido también se ignora.

Fechas útiles para revisar:

| Fecha | Qué debería verse |
|---|---|
| `2026-10-01T09:00` | PRE · "Faltan N días" |
| `2026-11-08T16:00` | DURANTE, antes de llegar · "Llega hoy · faltan 30 min" |
| `2026-11-09T11:40` | DURANTE · "Ahora" en la Misa del Monumento de los Españoles |
| `2026-11-10T19:00` | DURANTE · "Próximo": Vigilia de los jóvenes |
| `2026-11-11T14:30` | POST · "Reviví la visita", sin cuenta regresiva |
| `2026-12-01T10:00` | POST estable |

Para forzar la apertura del popup en cualquier momento (también en producción,
sirve para mostrárselo a alguien): `?leo=1`.

---

## Actualizar el itinerario

Todo está en **`leon-xiv-data.js`**. No hay horarios escritos en el HTML.

1. Editar el evento dentro del día que corresponde en `days[]`.
2. Si el cambio viene de una publicación oficial nueva, actualizar
   `updatedAt` y `updatedAtLabel`, y agregar la fuente en `sources[]`.
3. Subir el archivo. No hay que tocar nada más.

Además del programa, cada día lleva `page` (su archivo), `cardCities` (la
etiqueta corta de la tarjeta) y un bloque `chapter` con el título editorial,
la entradilla y la fotografía. Nada de eso es información factual nueva.

Campos de un evento:

```js
{
  time: "11:30",                       // hora de Argentina, obligatorio
  title: "Santa Misa",                 // obligatorio
  venue: "Monumento de los Españoles", // opcional: solo si la fuente lo nombra
  city: "Buenos Aires",                // opcional
  category: "Celebración",             // opcional
  open: true,                          // opcional: aparece en "Quiero participar"
  maps: "https://..."                  // opcional: enlace de ubicación
}
```

`venue`, `city` y `category` son opcionales y la agenda se dibuja bien sin
ellos: se omiten donde el programa oficial no los indica.

### Regla de contenido

No cargar información de acceso, sectores, acreditaciones, transporte,
seguridad, transmisiones ni inscripciones que no esté publicada por una fuente
oficial. Mientras no la haya, los eventos con `open: true` muestran
*"Información de acceso por confirmar"*. No agregar botones de inscripción sin
una URL oficial real.

---

## Que el popup vuelva a abrirse solo

El popup se abre automáticamente **una sola vez por navegador**, guardando la
clave `campaign.storageKey` en `localStorage`.

Si hay una novedad importante y tiene que volver a saltar para todos, subir la
versión de la clave en `leon-xiv-data.js`:

```js
storageKey: "osa-leon-xiv-argentina-2026-v2-seen",   // era -v1-
```

Los navegadores que ya lo habían visto lo vuelven a ver una vez.

---

## Cuándo aparece y cuándo se apaga

En `leon-xiv-data.js` → `campaign`:

- `visibleFrom: "2026-09-21"` — desde acá se muestran el lanzador y el popup.
- `archiveUntil: "2026-12-31"` — pasada esta fecha el lanzador y el enlace
  temporal del menú dejan de aparecer. La página del especial sigue online
  como archivo.

Para retirar el especial de la portada antes de tiempo, adelantar
`archiveUntil`. Para sacarlo del todo, quitar de `index.html` el `<link>`, el
div `#leo-mount` y los dos `<script>`.

---

## Enlace temporal en el menú

`leon-xiv.js` agrega el ítem **León XIV** al menú global, pero solo en las
páginas que cargan el especial (portada y página del especial) y solo hasta
`archiveUntil`. No se editó `layout.js`.

Con seis ítems la barra quedaba apretada entre 769 y 860 px; `leon-xiv.css`
compensa el espaciado únicamente en ese rango y únicamente donde se carga ese
CSS, así que el resto del sitio no cambia.

---

## Desplegar

Sitio estático, sin build. Subir por FTP/cPanel a la raíz pública
(`public_html/` o equivalente), respetando los nombres:

```
leon-xiv-argentina.html   (nuevo)
leon-xiv-agenda.html      (nuevo)
leon-xiv-dia-8.html       (nuevo)
leon-xiv-dia-9.html       (nuevo)
leon-xiv-dia-10.html      (nuevo)
leon-xiv-dia-11.html      (nuevo)
leon-xiv-participar.html  (nuevo)
leon-xiv-data.js          (nuevo)
leon-xiv.js               (nuevo)
leon-xiv.css              (nuevo)
index.html                (reemplaza al actual)
sitemap.xml               (reemplaza al actual)
```

`LEON-XIV-README.md` es documentación interna: no hace falta subirlo.

No hay que subir imágenes nuevas: el especial reutiliza
`imagenes/logo_new.png`, `imagenes/papa-leon-agustinos-madrid.jpeg`,
`imagenes/papa-700x450.jpg` y
`imagenes/WhatsApp-Image-2025-05-11-at-15.32.39-700x450.jpeg`, que ya están en
el servidor.

Después de subir:

1. Abrir `https://www.sanagustin.org/` y confirmar que el popup aparece una vez.
2. Recargar y confirmar que ya no salta solo y que queda el lanzador.
3. Abrir `https://www.sanagustin.org/leon-xiv-argentina.html` y recorrer el menú interno: agenda, los cuatro días y participar.
4. Revisar en un teléfono.

Si el navegador muestra la versión vieja de los `.js`/`.css`, forzar recarga
(Ctrl+F5) o limpiar la caché del hosting.
