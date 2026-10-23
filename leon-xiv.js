/* =========================================================
   LEÓN XIV EN ARGENTINA · especial OSA Argentina (V2)
   ---------------------------------------------------------
   Un solo archivo para todo el especial:

     · aviso discreto en la portada de OSA    (necesita #leo-mount)
     · menú interno del especial              (necesita #leo-subnav)
     · portada, días, agenda y participar     (necesita #leo-app)
     · enlace temporal en el menú global de OSA

   Cada página es una cáscara: el <head>, un resumen sin JavaScript y los
   scripts. Todo lo demás se arma acá desde leon-xiv-data.js, la única
   fuente del itinerario y de las reglas de inscripción.

   El estado "ahora / próximo" compara la hora de Buenos Aires con el
   cronograma publicado. No hay seguimiento en vivo ni red.
   ========================================================= */
(() => {
  "use strict";

  const DATA = window.LEON_XIV_ARGENTINA_2026;
  if (!DATA || !Array.isArray(DATA.days) || !DATA.days.length) return;

  const TIMEZONE = "America/Argentina/Buenos_Aires";
  /* Ventana máxima que se considera "en curso" cuando el siguiente punto
     del programa está lejos o es el último del día. */
  const MAX_EVENT_WINDOW_MIN = 120;
  const LANDING = DATA.campaign.pageUrl;
  const AGENDA_PAGE = "leon-xiv-agenda.html";
  const PARTICIPAR_PAGE = "leon-xiv-participar.html";
  const REG = DATA.registration || null;

  /* -------------------------------------------------------
     Utilidades
     ------------------------------------------------------- */

  const esc = (value) =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  /* Solo se aceptan URLs http(s) o rutas relativas del propio sitio. */
  const safeUrl = (value) => {
    const url = String(value || "").trim();
    if (/^https?:\/\//i.test(url)) return url;
    if (/^[\w.\-/#?=&%]+$/.test(url) && !/^[a-z]+:/i.test(url)) return url;
    return "#";
  };

  const isLocalPreviewHost = () =>
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "";

  const dayNum = (day) => String(Number(day.dayNumber));
  const dayLabel = (day) => `${day.weekday} ${dayNum(day)} de ${day.monthLabel}`;

  /* -------------------------------------------------------
     Tiempo (siempre hora de Argentina)
     -------------------------------------------------------
     "Minutos absolutos": la hora de pared de Buenos Aires proyectada
     sobre un eje lineal con Date.UTC. Las diferencias son exactas
     porque Argentina no aplica horario de verano.
  */

  const DATE_TIME_RE = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?$/;

  function parseParts(value) {
    const match = DATE_TIME_RE.exec(String(value || "").trim());
    if (!match) return null;
    const parts = {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
      hour: match[4] === undefined ? 0 : Number(match[4]),
      minute: match[5] === undefined ? 0 : Number(match[5]),
    };
    if (
      parts.month < 1 || parts.month > 12 ||
      parts.day < 1 || parts.day > 31 ||
      parts.hour > 23 || parts.minute > 59
    ) {
      return null;
    }
    return parts;
  }

  const absMinutes = (parts) =>
    Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute) / 60000;

  const dateKey = (parts) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
  };

  function at(value) {
    const parts = parseParts(value);
    return parts ? absMinutes(parts) : null;
  }

  /* Hora actual de Buenos Aires. `?leoDate=AAAA-MM-DDTHH:mm` solo funciona
     en localhost / 127.0.0.1 para previsualizar las fases. */
  function readNowParts() {
    if (isLocalPreviewHost()) {
      const raw = new URLSearchParams(window.location.search).get("leoDate");
      if (raw) {
        const parsed = parseParts(raw);
        // Un valor inválido se ignora en silencio y se usa el reloj real.
        if (parsed) return parsed;
      }
    }

    const formatted = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());

    const values = Object.fromEntries(formatted.map(({ type, value }) => [type, value]));

    return {
      year: Number(values.year),
      month: Number(values.month),
      day: Number(values.day),
      hour: Number(values.hour),
      minute: Number(values.minute),
    };
  }

  /* -------------------------------------------------------
     Programa aplanado + estado
     ------------------------------------------------------- */

  const SCHEDULE = DATA.days
    .flatMap((day) =>
      day.events.map((event) => ({
        ...event,
        dayId: day.id,
        page: day.page,
        date: day.date,
        weekday: day.weekday,
        dayNumber: day.dayNumber,
        monthLabel: day.monthLabel,
        startsAt: at(`${day.date}T${event.time}`),
      }))
    )
    .sort((a, b) => a.startsAt - b.startsAt);

  SCHEDULE.forEach((event, index) => {
    const next = SCHEDULE[index + 1];
    const gap = next ? next.startsAt - event.startsAt : MAX_EVENT_WINDOW_MIN;
    event.endsAt = event.startsAt + Math.min(Math.max(gap, 15), MAX_EVENT_WINDOW_MIN);
  });

  const OPEN_EVENTS = SCHEDULE.filter((event) => event.open);
  /* Encuentros que no son celebraciones abiertas pero tienen reglas propias. */
  const RESTRICTED_EVENTS = SCHEDULE.filter((event) => !event.open && event.access);

  const ARRIVAL = at(DATA.campaign.arrival);
  const DEPARTURE = at(DATA.campaign.departure);
  const FIRST_DAY = DATA.campaign.firstDay;
  const LAST_DAY = DATA.campaign.lastDay;
  const REG_DEADLINE = REG ? at(REG.deadline) : null;

  function buildState() {
    const parts = readNowParts();
    const now = absMinutes(parts);
    const today = dateKey(parts);

    let phase;
    if (now >= DEPARTURE) phase = "POST";
    else if (today >= FIRST_DAY && today <= LAST_DAY) phase = "DURING";
    else phase = "PRE";

    const inCountry = now >= ARRIVAL && now < DEPARTURE;

    const currentEvent =
      phase === "DURING" && inCountry
        ? SCHEDULE.find((event) => now >= event.startsAt && now < event.endsAt) || null
        : null;

    const nextEvent =
      phase === "POST" ? null : SCHEDULE.find((event) => event.startsAt > now) || null;

    const nextOpenEvent =
      phase === "POST" ? null : OPEN_EVENTS.find((event) => event.startsAt > now) || null;

    const todayDay = DATA.days.find((day) => day.date === today) || null;

    const firstDayStart = at(`${FIRST_DAY}T00:00`);
    const daysToStart = Math.max(
      0,
      Math.ceil((firstDayStart - absMinutes({ ...parts, hour: 0, minute: 0 })) / 1440)
    );

    /* Inscripción: "open" hasta el plazo informado; después, "closed"
       (se remite al sitio oficial); terminada la visita, "past". */
    let registration = "none";
    if (REG && REG_DEADLINE !== null) {
      if (phase === "POST") registration = "past";
      else registration = now <= REG_DEADLINE ? "open" : "closed";
    }

    return {
      now,
      today,
      phase,
      inCountry,
      currentEvent,
      nextEvent,
      nextOpenEvent,
      todayDay,
      daysToStart,
      registration,
      minutesToArrival: Math.max(0, ARRIVAL - now),
    };
  }

  function statusText(state) {
    if (state.phase === "POST") return "La visita terminó";

    if (state.phase === "PRE") {
      return state.daysToStart === 1 ? "Falta 1 día" : `Faltan ${state.daysToStart} días`;
    }

    if (!state.inCountry) {
      const hours = Math.floor(state.minutesToArrival / 60);
      const minutes = state.minutesToArrival % 60;
      if (hours >= 1) return `Hoy llega a Buenos Aires · faltan ${hours} h ${minutes} min`;
      if (state.minutesToArrival > 0) return `Hoy llega a Buenos Aires · faltan ${minutes} min`;
      return "Llegando a Buenos Aires";
    }

    return `Hoy, ${dayLabel(state.todayDay || DATA.days[0]).toLowerCase()}`;
  }

  /* -------------------------------------------------------
     Iconos en línea (evitan sumar dependencias)
     ------------------------------------------------------- */

  const ICON = {
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  };

  const NEW_TAB = '<span class="leo-sr-only">(se abre en una pestaña nueva)</span>';

  const placeLine = (event) => [event.venue, event.city].filter(Boolean).join(" · ");

  const timeTag = (event) =>
    `<time datetime="${esc(event.date)}T${esc(event.time)}">${esc(event.time)}</time>`;

  const mapLink = (event) =>
    event.maps
      ? `<a class="leo-maplink" href="${esc(safeUrl(event.maps))}" target="_blank" rel="noopener noreferrer">
           Ver ubicación${ICON.external}${NEW_TAB}
         </a>`
      : "";

  const accessInfo = (event) =>
    REG && event.access && REG.access && REG.access[event.access]
      ? REG.access[event.access]
      : null;

  const portalLink = (label, cls = "leo-btn leo-btn--primary") =>
    REG
      ? `<a class="${cls}" href="${esc(safeUrl(REG.portalUrl))}" target="_blank" rel="noopener noreferrer">
           ${esc(label)}${ICON.external}${NEW_TAB}
         </a>`
      : "";

  /* Frase corta sobre el plazo de inscripción, según la fecha. */
  function registrationLine(state) {
    if (!REG) return "";
    if (state.registration === "open") {
      return `Inscripción gratuita en el sitio oficial hasta el ${esc(REG.deadlineLabel)}.`;
    }
    if (state.registration === "closed") {
      return `El plazo de inscripción informado venció el ${esc(REG.deadlineLabel)}. Consultá novedades en el sitio oficial.`;
    }
    return "";
  }

  /* Marca de estado de un punto del programa (solo durante la visita). */
  function eventFlag(event, state) {
    if (state.phase !== "DURING") return { cls: "", flag: "" };
    if (state.currentEvent === event) {
      return {
        cls: "is-now",
        flag: '<span class="leo-flag leo-flag--now">Ahora, según el programa</span>',
      };
    }
    if (state.nextEvent === event) {
      return { cls: "is-next", flag: '<span class="leo-flag leo-flag--next">Próximo</span>' };
    }
    if (event.startsAt < state.now) {
      // Lo ya ocurrido se atenúa en gris; el lector de pantalla lo escucha.
      return { cls: "is-past", flag: '<span class="leo-sr-only">(ya pasó, según el programa)</span>' };
    }
    return { cls: "", flag: "" };
  }

  /* =======================================================
     MENÚ INTERNO DEL ESPECIAL
     ======================================================= */

  const currentFile = () => window.location.pathname.split("/").pop() || "index.html";

  function renderSubnav(state) {
    const mount = document.getElementById("leo-subnav");
    if (!mount) return;

    const here = currentFile();
    const dayPages = DATA.days.map((day) => day.page);
    const mark = (href, alsoFor = []) =>
      href === here || alsoFor.includes(here) ? ' aria-current="page"' : "";

    /* "Hoy" solo existe durante la visita y lleva al día en curso. */
    const today =
      state.phase === "DURING" && state.todayDay
        ? `<li><a class="leo-subnav__today" href="${esc(state.todayDay.page)}"${mark(state.todayDay.page)}>Hoy</a></li>`
        : "";

    mount.className = "leo-subnav";
    mount.innerHTML = `
      <div class="leo-shell leo-subnav__inner" role="navigation"
           aria-label="Secciones del especial León XIV en Argentina">
        <a class="leo-subnav__brand" href="${esc(LANDING)}">León XIV en Argentina</a>
        <ul>
          <li><a href="${esc(LANDING)}"${mark(LANDING)}>La visita</a></li>
          ${today}
          <li><a href="${esc(AGENDA_PAGE)}"${mark(AGENDA_PAGE, state.phase === "DURING" ? [] : dayPages)}>Agenda</a></li>
          <li><a href="${esc(PARTICIPAR_PAGE)}"${mark(PARTICIPAR_PAGE)}>Participar</a></li>
        </ul>
      </div>`;
  }

  /* =======================================================
     BLOQUES REUTILIZABLES
     ======================================================= */

  /* HOY / PRÓXIMO. Banda clara y compacta; cambia con la fase. */
  function todayMarkup(state) {
    if (state.phase === "DURING") {
      const current = state.currentEvent;
      const next = state.nextEvent;
      const day = state.todayDay;

      const slot = (label, event, fallback) =>
        `<div class="leo-today__slot">
           <p class="leo-today__label">${esc(label)}</p>
           ${
             event
               ? `<p class="leo-today__event">
                    <span class="leo-today__time">${timeTag(event)}</span>
                    <span class="leo-today__title">${esc(event.title)}</span>
                  </p>
                  ${placeLine(event) ? `<p class="leo-today__place">${esc(placeLine(event))}</p>` : ""}`
               : `<p class="leo-today__place">${esc(fallback)}</p>`
           }
         </div>`;

      const nextFallback = "No quedan puntos del programa en la Argentina.";
      return `
        <div class="leo-shell leo-today__inner leo-today__inner--during">
          <h2 class="leo-today__heading">${esc(statusText(state))}</h2>
          ${slot("Ahora, según el programa", current, state.inCountry ? "No hay una actividad prevista en este momento." : "El Papa todavía no llegó a la Argentina.")}
          ${slot("Próximo", next, nextFallback)}
          <p class="leo-today__note">
            Calculado con la hora de Buenos Aires y el programa oficial. No es un
            seguimiento en vivo: los horarios pueden variar.
            ${day && currentFile() !== day.page ? `<a class="leo-link" href="${esc(day.page)}">Ver el programa de hoy${ICON.arrow}</a>` : ""}
          </p>
        </div>`;
    }

    if (state.phase === "POST") {
      return `
        <div class="leo-shell leo-today__inner">
          <h2 class="leo-today__heading">La visita terminó</h2>
          <p class="leo-today__text">
            León XIV estuvo en la Argentina del ${esc(DATA.campaign.datesLabelLong)}.
            El programa oficial queda acá como archivo, día por día.
          </p>
          <a class="leo-link" href="${esc(AGENDA_PAGE)}">Ver el programa completo${ICON.arrow}</a>
        </div>`;
    }

    // PRE
    const first = SCHEDULE[0];
    const reg = registrationLine(state);
    return `
      <div class="leo-shell leo-today__inner">
        <h2 class="leo-today__heading">${esc(statusText(state))}</h2>
        <p class="leo-today__text">
          La visita empieza el ${esc(dayLabel(DATA.days[0]).toLowerCase())}: el Papa llega a
          Buenos Aires a las ${esc(DATA.campaign.arrival.slice(11))}, procedente de ${esc(first.city.split(",")[0])}.
          ${reg ? `<br><span class="leo-today__reg">${reg}</span>` : ""}
        </p>
        <a class="leo-link" href="${esc(PARTICIPAR_PAGE)}">Cómo participar${ICON.arrow}</a>
      </div>`;
  }

  /* Los cuatro días: un mismo patrón para los cuatro. */
  function daysMarkup(state) {
    return DATA.days
      .map((day) => {
        const chapter = day.chapter || {};
        const isToday = state.phase === "DURING" && state.today === day.date;
        return `
          <li class="leo-day${isToday ? " is-today" : ""}">
            <a class="leo-day__link" href="${esc(day.page)}"${isToday ? ' aria-current="date"' : ""}>
              <span class="leo-day__date">
                <span class="leo-day__num">${esc(dayNum(day))}</span>
                <span class="leo-day__weekday">${esc(day.weekday)}${isToday ? " · hoy" : ""}</span>
              </span>
              <span class="leo-day__body">
                <span class="leo-day__city">${esc(day.citiesLabel)}</span>
                <span class="leo-day__title">${esc(chapter.title || day.summary)}</span>
                <span class="leo-day__summary">${esc(day.summary)}</span>
                <span class="leo-day__go">Ver el día${ICON.arrow}</span>
              </span>
            </a>
          </li>`;
      })
      .join("");
  }

  /* Encuentros destacados: las celebraciones abiertas, en filas de agenda. */
  function picksMarkup(state) {
    return OPEN_EVENTS.map((event) => {
      const access = accessInfo(event);
      const showAccess = access && state.registration !== "past";
      return `
        <li class="leo-row">
          <p class="leo-row__when">
            <span class="leo-row__date">${esc(event.weekday)} ${esc(dayNum(event))}</span>
            <span class="leo-row__time">${timeTag(event)}</span>
          </p>
          <div class="leo-row__body">
            <h3 class="leo-row__title"><a href="${esc(event.page)}">${esc(event.title)}</a></h3>
            <p class="leo-row__place">${esc(placeLine(event))}</p>
            ${showAccess ? `<p class="leo-row__access">${esc(access.label)}</p>` : ""}
          </div>
        </li>`;
    }).join("");
  }

  const sourceList = (list) =>
    (list || [])
      .map(
        (source) => `
        <li class="leo-source">
          <a href="${esc(safeUrl(source.url))}" target="_blank" rel="noopener noreferrer">
            ${esc(source.label)}${NEW_TAB}
          </a>
          <span>${esc(source.publisher)}</span>
        </li>`
      )
      .join("");

  const sourcesSection = (withRegistration = false) => `
    <footer class="leo-section leo-sources-block" id="fuentes" aria-labelledby="leo-fuentes-title">
      <div class="leo-shell leo-shell--narrow">
        <h2 class="leo-small-title" id="leo-fuentes-title">Fuentes</h2>
        <ul class="leo-sources">
          ${sourceList(DATA.sources)}
          ${withRegistration && REG ? sourceList(REG.sources) : ""}
        </ul>
        <p class="leo-updated">
          Programa contrastado con la Santa Sede el ${esc(DATA.updatedAtLabel)}.
          ${withRegistration && REG ? `Datos de inscripción revisados el ${esc(REG.verifiedAtLabel)}.` : ""}
          Ante cualquier diferencia, vale lo que publiquen la Santa Sede y la
          organización local.
        </p>
      </div>
    </footer>`;

  /* =======================================================
     PÁGINAS
     ======================================================= */

  function renderLanding(app, state) {
    const photo = (DATA.days[1] && DATA.days[1].chapter) || {};
    const reg = state.registration === "open";

    app.innerHTML = `
      <header class="leo-hero">
        <div class="leo-shell leo-hero__grid">
          <div class="leo-hero__text">
            <p class="leo-hero__kicker">Viaje apostólico a Uruguay, Argentina y Perú</p>
            <h1 class="leo-hero__title">León XIV en Argentina</h1>
            <p class="leo-hero__date">${esc(DATA.campaign.datesLabelLong)}</p>
            <p class="leo-hero__cities">Buenos Aires, Claypole, Córdoba y Luján</p>
            <div class="leo-hero__actions">
              <a class="leo-btn leo-btn--primary" href="${esc(AGENDA_PAGE)}">Ver agenda${ICON.arrow}</a>
              ${state.phase === "POST" ? "" : `<a class="leo-link" href="${esc(PARTICIPAR_PAGE)}">Cómo participar${ICON.arrow}</a>`}
            </div>
          </div>
          <figure class="leo-hero__figure">
            <img src="${esc(photo.photo || "imagenes/papa-700x450.jpg")}"
                 alt="${esc(photo.photoAlt || "El Papa León XIV")}"
                 width="700" height="450" fetchpriority="high" decoding="async">
            <figcaption>${esc(photo.photoCaption || "")}</figcaption>
          </figure>
        </div>
      </header>

      <section class="leo-today" id="hoy" data-phase="${esc(state.phase)}" aria-label="Estado de la visita">${todayMarkup(state)}</section>

      <section class="leo-section" id="dias" aria-labelledby="leo-dias-title">
        <div class="leo-shell">
          <div class="leo-section__head">
            <h2 class="leo-section__title" id="leo-dias-title">La visita, día por día</h2>
          </div>
          <ol class="leo-days">${daysMarkup(state)}</ol>
        </div>
      </section>

      <section class="leo-section leo-section--alt" id="destacados" aria-labelledby="leo-dest-title">
        <div class="leo-shell">
          <div class="leo-section__head">
            <h2 class="leo-section__title" id="leo-dest-title">Celebraciones abiertas a los fieles</h2>
            <p class="leo-section__lead">
              ${state.phase === "POST"
                ? "Las cuatro celebraciones abiertas del programa oficial."
                : `Las cuatro celebraciones del programa abiertas a la participación. ${registrationLine(state)}`}
            </p>
          </div>
          <ol class="leo-rows">${picksMarkup(state)}</ol>
          ${state.phase === "POST" ? "" : `
          <p class="leo-section__foot">
            ${reg ? portalLink("Inscribirse en el sitio oficial") : ""}
            <a class="leo-link" href="${esc(PARTICIPAR_PAGE)}">Requisitos y cómo participar${ICON.arrow}</a>
          </p>`}
        </div>
      </section>

      <section class="leo-section" id="osa" aria-labelledby="leo-osa-title">
        <div class="leo-shell">
          <div class="leo-osa">
            <figure class="leo-osa__figure">
              <img src="imagenes/papa-leon-agustinos-madrid.jpeg"
                   alt="El Papa León XIV junto a religiosos agustinos y miembros de la familia agustiniana en Madrid"
                   width="750" height="422" loading="lazy" decoding="async">
              <figcaption>
                León XIV con la familia agustiniana en Madrid, el 7 de junio de 2026,
                durante su viaje apostólico a España.
              </figcaption>
            </figure>
            <div class="leo-osa__text">
              <h2 class="leo-section__title" id="leo-osa-title">Un Papa agustino</h2>
              <blockquote class="leo-quote">
                <p>Un solo corazón y una sola alma orientados hacia Dios.</p>
                <footer>Regla de San Agustín</footer>
              </blockquote>
              <p>
                Robert Francis Prevost profesó en la Orden de San Agustín, fue Prior
                General entre 2001 y 2013, y en 2025 fue elegido Obispo de Roma con el
                nombre de León XIV. En 2004 ya había estado en Buenos Aires, en el
                Congreso Agustiniano de Teología.
              </p>
              <p class="leo-osa__links">
                <a class="leo-link" href="noticia-prevost.html">El Congreso Agustiniano de 2004${ICON.arrow}</a>
                <a class="leo-link" href="noticia-papa-leon-agustinos-madrid.html">El encuentro en Madrid${ICON.arrow}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      ${sourcesSection(state.phase !== "POST")}`;
  }

  function renderDay(app, state, dayId) {
    const index = DATA.days.findIndex((day) => day.id === dayId);
    if (index < 0) return;

    const day = DATA.days[index];
    const chapter = day.chapter || {};
    const prev = DATA.days[index - 1] || null;
    const next = DATA.days[index + 1] || null;
    const isToday = state.phase === "DURING" && state.today === day.date;

    const events = SCHEDULE.filter((event) => event.dayId === day.id)
      .map((event) => {
        const { cls, flag } = eventFlag(event, state);
        const access = state.registration !== "past" ? accessInfo(event) : null;
        const meta = [event.category, access ? access.label : ""].filter(Boolean).join(" · ");
        return `
          <li class="leo-event ${cls}">
            <p class="leo-event__time">${timeTag(event)}</p>
            <div class="leo-event__body">
              <h3 class="leo-event__title">${esc(event.title)}</h3>
              ${placeLine(event) ? `<p class="leo-event__place">${esc(placeLine(event))}</p>` : ""}
              ${meta ? `<p class="leo-event__meta">${esc(meta)}</p>` : ""}
              ${flag ? `<p class="leo-event__flags">${flag}</p>` : ""}
              ${mapLink(event)}
            </div>
          </li>`;
      })
      .join("");

    const pagerLink = (target, dir, modifier) =>
      target
        ? `<a class="leo-pager__link ${modifier}" href="${esc(target.page)}">
             <span class="leo-pager__dir">${esc(dir)}</span>
             <span class="leo-pager__name">${esc(dayLabel(target))}</span>
           </a>`
        : '<span class="leo-pager__empty" aria-hidden="true"></span>';

    app.innerHTML = `
      <header class="leo-dayhead">
        <div class="leo-shell leo-shell--narrow">
          <p class="leo-dayhead__date">
            <span class="leo-dayhead__num">${esc(dayNum(day))}</span>
            <span>${esc(day.weekday)} ${esc(dayNum(day))} de noviembre de 2026${isToday ? " · hoy" : ""}</span>
          </p>
          <h1 class="leo-dayhead__title">${esc(chapter.title || dayLabel(day))}</h1>
          <p class="leo-dayhead__route">${esc(day.route)}</p>
          <p class="leo-dayhead__standfirst">${esc(chapter.standfirst || day.summary)}</p>
        </div>
      </header>

      ${isToday ? `<section class="leo-today" data-phase="DURING" aria-label="Estado de la visita">${todayMarkup(state)}</section>` : ""}

      <section class="leo-section leo-section--tight" aria-labelledby="leo-crono-title">
        <div class="leo-shell leo-shell--narrow">
          <div class="leo-section__head leo-section__head--row">
            <h2 class="leo-section__title leo-section__title--sm" id="leo-crono-title">Programa del día</h2>
            <a class="leo-link" href="${esc(AGENDA_PAGE)}#${esc(day.id)}">Agenda completa${ICON.arrow}</a>
          </div>

          <ol class="leo-timeline">${events}</ol>

          <div class="leo-pager" role="navigation" aria-label="Navegación entre días">
            ${pagerLink(prev, "Día anterior", "leo-pager__link--prev")}
            ${pagerLink(next, "Día siguiente", "leo-pager__link--next")}
          </div>
        </div>
      </section>

      ${sourcesSection(false)}`;
  }

  function renderAgenda(app, state) {
    const groups = DATA.days
      .map((day) => {
        const rows = SCHEDULE.filter((event) => event.dayId === day.id)
          .map((event) => {
            const { cls, flag } = eventFlag(event, state);
            const where = placeLine(event);
            return `
              <li class="leo-agenda__row ${cls}">
                <span class="leo-agenda__time">${timeTag(event)}</span>
                <span class="leo-agenda__what">${esc(event.title)}${flag ? ` ${flag}` : ""}</span>
                <span class="leo-agenda__where">${esc(where)}</span>
              </li>`;
          })
          .join("");

        const isToday = state.phase === "DURING" && state.today === day.date;
        return `
          <section class="leo-agenda__day" data-leo-day="${esc(day.id)}" aria-labelledby="${esc(day.id)}">
            <div class="leo-agenda__head">
              <h2 class="leo-agenda__daytitle" id="${esc(day.id)}">
                ${esc(dayLabel(day))}${isToday ? ' <span class="leo-flag leo-flag--now">Hoy</span>' : ""}
              </h2>
              <p class="leo-agenda__route">${esc(day.route)}</p>
              <a class="leo-link" href="${esc(day.page)}">Ver el día${ICON.arrow}</a>
            </div>
            <ol class="leo-agenda__list">${rows}</ol>
          </section>`;
      })
      .join("");

    const filters = [{ id: "todos", label: "Todos" }]
      .concat(DATA.days.map((day) => ({ id: day.id, label: day.shortLabel || dayNum(day) })))
      .map(
        (item, i) =>
          `<button type="button" data-leo-filter="${esc(item.id)}"
                   aria-pressed="${i === 0 ? "true" : "false"}">${esc(item.label)}</button>`
      )
      .join("");

    app.innerHTML = `
      <section class="leo-section leo-section--top">
        <div class="leo-shell leo-shell--narrow">
          <div class="leo-section__head">
            <h1 class="leo-section__title">Agenda oficial</h1>
            <p class="leo-section__lead">
              Los ${SCHEDULE.length} puntos del programa en la Argentina, del ${esc(DATA.campaign.datesLabelLong)},
              con los horarios publicados por la Santa Sede (hora de Argentina).
            </p>
          </div>

          <div class="leo-filter" role="group" aria-label="Filtrar la agenda por día">${filters}</div>
          <p class="leo-sr-only" id="leo-filter-status" role="status" aria-live="polite"></p>
          <div id="leo-agenda-groups">${groups}</div>
        </div>
      </section>

      ${sourcesSection(false)}`;

    // Filtro por día: solo muestra u oculta, sin estado en la URL.
    const groupsRoot = app.querySelector("#leo-agenda-groups");
    const status = app.querySelector("#leo-filter-status");
    app.querySelectorAll("[data-leo-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-leo-filter");
        app.querySelectorAll("[data-leo-filter]").forEach((other) => {
          other.setAttribute("aria-pressed", String(other === button));
        });
        let visible = 0;
        groupsRoot.querySelectorAll(".leo-agenda__day").forEach((group) => {
          group.hidden = value !== "todos" && group.getAttribute("data-leo-day") !== value;
          if (!group.hidden) visible += group.querySelectorAll(".leo-agenda__row").length;
        });
        if (status) {
          status.textContent =
            value === "todos"
              ? `Mostrando los ${visible} puntos del programa.`
              : `Mostrando ${visible} puntos del ${button.textContent.trim()}.`;
        }
      });
    });
  }

  function renderParticipar(app, state) {
    const past = state.registration === "past";

    const openRows = OPEN_EVENTS.map((event) => {
      const access = past ? null : accessInfo(event);
      return `
        <li class="leo-row leo-row--detail">
          <p class="leo-row__when">
            <span class="leo-row__date">${esc(event.weekday)} ${esc(dayNum(event))}</span>
            <span class="leo-row__time">${timeTag(event)}</span>
          </p>
          <div class="leo-row__body">
            <h3 class="leo-row__title">${esc(event.title)}</h3>
            <p class="leo-row__place">${esc(placeLine(event))}</p>
            ${access ? `<p class="leo-row__access">${esc(access.label)}</p>
                        <p class="leo-row__detail">${esc(access.detail)}${event.accessNote ? ` ${esc(event.accessNote)}` : ""}</p>` : ""}
            <p class="leo-row__links">
              ${mapLink(event)}
              <a class="leo-link" href="${esc(event.page)}">Programa de ese día${ICON.arrow}</a>
            </p>
          </div>
        </li>`;
    }).join("");

    const restrictedRows = RESTRICTED_EVENTS.map((event) => {
      const access = accessInfo(event);
      return `
        <li class="leo-row leo-row--detail">
          <p class="leo-row__when">
            <span class="leo-row__date">${esc(event.weekday)} ${esc(dayNum(event))}</span>
            <span class="leo-row__time">${timeTag(event)}</span>
          </p>
          <div class="leo-row__body">
            <h3 class="leo-row__title">${esc(event.title)}</h3>
            <p class="leo-row__place">${esc(placeLine(event))}</p>
            <p class="leo-row__access">${esc(access.label)}</p>
            <p class="leo-row__detail">${event.accessNote ? `${esc(event.accessNote)} ` : ""}${esc(access.detail)}</p>
          </div>
        </li>`;
    }).join("");

    let notice;
    if (past) {
      notice = `<p class="leo-notice">La visita terminó. Esta página queda como registro de las celebraciones abiertas del programa.</p>`;
    } else if (state.registration === "open") {
      notice = `
        <div class="leo-notice leo-notice--action">
          <p><strong>La inscripción es gratuita y se hace en el sitio oficial de la visita, hasta el ${esc(REG.deadlineLabel)}.</strong>
             Este sitio no toma inscripciones ni datos personales.</p>
          ${portalLink(`Ir a ${REG.portalLabel}`)}
        </div>`;
    } else {
      notice = `
        <div class="leo-notice">
          <p><strong>El plazo de inscripción informado venció el ${esc(REG.deadlineLabel)}.</strong>
             Para saber si hay novedades o cómo acceder sin inscripción previa, consultá el sitio oficial.</p>
          ${portalLink(`Consultar ${REG.portalLabel}`, "leo-btn leo-btn--quiet")}
        </div>`;
    }

    app.innerHTML = `
      <section class="leo-section leo-section--top">
        <div class="leo-shell leo-shell--narrow">
          <div class="leo-section__head">
            <h1 class="leo-section__title">Cómo participar</h1>
            <p class="leo-section__lead">
              Qué celebraciones del programa están abiertas a los fieles, qué
              encuentros piden inscripción obligatoria y dónde inscribirse.
            </p>
          </div>

          ${REG ? notice : ""}

          <h2 class="leo-section__title leo-section__title--sm">Celebraciones abiertas</h2>
          <ol class="leo-rows">${openRows}</ol>

          ${!past && restrictedRows ? `
          <h2 class="leo-section__title leo-section__title--sm">Encuentros con inscripción obligatoria</h2>
          <ol class="leo-rows">${restrictedRows}</ol>` : ""}

          ${!past && REG ? `
          <h2 class="leo-section__title leo-section__title--sm">Condiciones generales de inscripción</h2>
          <ul class="leo-rules">${REG.rules.map((rule) => `<li>${esc(rule)}</li>`).join("")}</ul>
          <p class="leo-updated">
            Según lo informado el 22 de octubre de 2026 y revisado el ${esc(REG.verifiedAtLabel)}.
            Las condiciones pueden cambiar: la referencia es siempre el sitio oficial.
            No difundimos sectores, horarios de apertura ni transporte que no estén publicados por una fuente oficial.
          </p>` : ""}
        </div>
      </section>

      ${state.phase === "DURING" ? `<section class="leo-today" data-phase="DURING" aria-label="Estado de la visita">${todayMarkup(state)}</section>` : ""}

      ${sourcesSection(true)}`;
  }

  /* Alto del header sticky de OSA: el menú interno se ancla debajo. */
  function measureHeadroom() {
    const header = document.querySelector(".site-header");
    const height = header ? Math.round(header.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty("--leo-headroom", `${height}px`);
  }

  /* =======================================================
     AVISO EN LA PORTADA DE OSA
     -------------------------------------------------------
     Reemplaza al popup de la V1: no se abre solo, no tapa contenido y
     no usa localStorage. index.html trae el mismo aviso en HTML para
     quien no tiene JavaScript; acá solo se actualiza el estado o se
     oculta fuera de la ventana de la campaña.
     ======================================================= */

  function initHomeNotice(state) {
    const mount = document.getElementById("leo-mount");
    if (!mount) return;

    const campaign = DATA.campaign;
    const visible = state.today >= campaign.visibleFrom && state.today <= campaign.archiveUntil;
    if (!visible) {
      mount.hidden = true;
      return;
    }

    mount.hidden = false;
    /* Antes de la visita se deja el aviso estático de index.html tal cual:
       reescribirlo movería el contenido de la portada (CLS). */
    if (state.phase === "PRE" && mount.querySelector(".leo-homebar")) return;

    const detail =
      state.phase === "DURING" ? statusText(state) : "Archivo de la visita y programa completo";

    mount.innerHTML = `
      <aside class="leo-homebar" aria-label="Especial León XIV en Argentina">
        <div class="leo-homebar__inner">
          <p class="leo-homebar__text">
            <strong>León XIV en Argentina</strong>
            <span>${esc(campaign.datesLabelLong)} · ${esc(detail)}</span>
          </p>
          <a class="leo-homebar__link" href="${esc(LANDING)}">Agenda y cómo participar${ICON.arrow}</a>
        </div>
      </aside>`;
  }

  /* -------------------------------------------------------
     Enlace temporal en la navegación global
     ------------------------------------------------------- */

  function initNavLink() {
    const nav = document.querySelector("#main-nav ul");
    if (!nav || nav.querySelector(".leo-nav-link")) return;

    const specialPages = [LANDING, AGENDA_PAGE, PARTICIPAR_PAGE].concat(
      DATA.days.map((day) => day.page)
    );

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "leo-nav-link";
    link.href = LANDING;
    link.textContent = "León XIV";
    if (specialPages.includes(currentFile())) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
    item.appendChild(link);
    nav.appendChild(item);
  }

  /* =======================================================
     Arranque
     ======================================================= */

  function start() {
    const state = buildState();

    initHomeNotice(state);

    const app = document.getElementById("leo-app");
    if (app) {
      const kind = app.getAttribute("data-leo-page");
      if (kind === "landing") renderLanding(app, state);
      else if (kind === "day") renderDay(app, state, app.getAttribute("data-leo-day"));
      else if (kind === "agenda") renderAgenda(app, state);
      else if (kind === "participar") renderParticipar(app, state);

      renderSubnav(state);

      measureHeadroom();
      window.addEventListener("resize", measureHeadroom, { passive: true });
      window.addEventListener("load", measureHeadroom, { once: true });

      // El contenido recién existe ahora: si se llegó por un ancla, reubicar.
      if (window.location.hash) {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        if (target) window.requestAnimationFrame(() => target.scrollIntoView());
      }
    }

    if (state.today <= DATA.campaign.archiveUntil) {
      // layout.js inyecta el header en DOMContentLoaded; esperamos a que exista.
      if (document.querySelector("#main-nav ul")) initNavLink();
      else window.setTimeout(initNavLink, 0);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
