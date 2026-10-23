/* =========================================================
   LEÓN XIV EN ARGENTINA · micrositio OSA Argentina
   ---------------------------------------------------------
   Un solo archivo para todo el especial:

     · popup + lanzador de la portada        (necesita #leo-mount)
     · menú interno del micrositio            (necesita #leo-subnav)
     · landing, días, agenda y participar     (necesita #leo-app)

   Cada página es una cáscara: el <head>, el <h1> y un aviso por si el
   JavaScript no corre. Todo lo demás se arma acá desde leon-xiv-data.js,
   que sigue siendo la única fuente del itinerario. Ninguna página repite
   datos oficiales.

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

  const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

  /* Hora actual de Buenos Aires, con override de previsualización local. */
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

  const ARRIVAL = at(DATA.campaign.arrival);
  const DEPARTURE = at(DATA.campaign.departure);
  const FIRST_DAY = DATA.campaign.firstDay;
  const LAST_DAY = DATA.campaign.lastDay;

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
      minutesToArrival: Math.max(0, ARRIVAL - now),
    };
  }

  function statusText(state) {
    if (state.phase === "POST") return "Reviví la visita";

    if (state.phase === "PRE") {
      return state.daysToStart === 1 ? "Falta 1 día" : `Faltan ${state.daysToStart} días`;
    }

    if (!state.inCountry) {
      const hours = Math.floor(state.minutesToArrival / 60);
      const minutes = state.minutesToArrival % 60;
      if (hours >= 1) return `Llega hoy · faltan ${hours} h ${minutes} min`;
      if (state.minutesToArrival > 0) return `Llega hoy · faltan ${minutes} min`;
      return "Llegando a Buenos Aires";
    }

    return `HOY · ${dayLabel(state.todayDay || DATA.days[0])}`;
  }

  /* -------------------------------------------------------
     Iconos en línea (evitan sumar dependencias)
     ------------------------------------------------------- */

  const ICON = {
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    info:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  };

  const statusMarkup = (state) =>
    `<span class="leo-status" data-phase="${esc(state.phase)}">
       <span class="leo-status__dot" aria-hidden="true"></span>
       <span>${esc(statusText(state))}</span>
     </span>`;

  const placeLine = (event) => [event.venue, event.city].filter(Boolean).join(" · ");

  const mapLink = (event) =>
    event.maps
      ? `<a class="leo-maplink" href="${esc(event.maps)}" target="_blank" rel="noopener noreferrer">
           Ver ubicación ${ICON.external}
           <span class="leo-sr-only">(se abre en una pestaña nueva)</span>
         </a>`
      : "";

  /* Marca de estado de un punto del programa. */
  function eventFlag(event, state) {
    if (state.phase !== "DURING") return { cls: "", flag: "" };
    if (state.currentEvent === event) {
      return {
        cls: "is-now",
        flag: '<span class="leo-flag leo-flag--now">Ahora, según el cronograma</span>',
      };
    }
    if (state.nextEvent === event) {
      return { cls: "", flag: '<span class="leo-flag leo-flag--next">Próximo</span>' };
    }
    if (event.startsAt < state.now) {
      return { cls: "is-past", flag: '<span class="leo-flag leo-flag--past">Finalizado</span>' };
    }
    return { cls: "", flag: "" };
  }

  /* =======================================================
     MENÚ INTERNO DEL MICROSITIO
     ======================================================= */

  const currentFile = () => window.location.pathname.split("/").pop() || "index.html";

  function renderSubnav(state) {
    const mount = document.getElementById("leo-subnav");
    if (!mount) return;

    const here = currentFile();
    const mark = (href) => (href === here ? ' aria-current="page"' : "");

    const todayHref =
      state.phase === "DURING" && state.todayDay ? state.todayDay.page : AGENDA_PAGE;

    const days = DATA.days
      .map(
        (day) =>
          `<li><a href="${esc(day.page)}"${mark(day.page)}>${esc(day.dayNumber)}</a></li>`
      )
      .join("");

    mount.className = "leo-subnav";
    mount.innerHTML = `
      <div class="leo-shell leo-subnav__inner" role="navigation"
           aria-label="Secciones del especial León XIV en Argentina">
        <a class="leo-subnav__brand" href="${esc(LANDING)}">León XIV en Argentina</a>
        <ul>
          <li><a href="${esc(LANDING)}"${mark(LANDING)}>Inicio</a></li>
          <li><a href="${esc(AGENDA_PAGE)}"${mark(AGENDA_PAGE)}>Agenda</a></li>
          <li><a href="${esc(todayHref)}">Hoy</a></li>
          <li><a href="${esc(PARTICIPAR_PAGE)}"${mark(PARTICIPAR_PAGE)}>Participar</a></li>
        </ul>
        <ul class="leo-subnav__days" aria-label="Días de la visita">${days}</ul>
      </div>`;
  }

  /* =======================================================
     BLOQUES REUTILIZABLES
     ======================================================= */

  /* HOY / PRÓXIMO. Existe en las tres fases, con distinto contenido. */
  function todayMarkup(state) {
    if (state.phase === "DURING") {
      const current = state.currentEvent;
      const next = state.nextEvent;
      const day = state.todayDay;

      const slot = (label, event, fallback) =>
        event
          ? `<div class="leo-today__slot">
               <span class="leo-today__label">${esc(label)}</span>
               <p class="leo-today__time">${esc(event.time)}</p>
               <p class="leo-today__title">${esc(event.title)}</p>
               <p class="leo-today__place">${esc(placeLine(event))}</p>
             </div>`
          : `<div class="leo-today__slot">
               <span class="leo-today__label">${esc(label)}</span>
               <p class="leo-today__place">${esc(fallback)}</p>
             </div>`;

      return `
        <div class="leo-shell leo-today__inner">
          ${slot("Ahora, según el cronograma", current, "Entre un punto y otro del programa.")}
          ${slot("Próximo", next, "No quedan puntos del programa en la Argentina.")}
          <div class="leo-today__aside">
            <p class="leo-today__day">${esc(day ? dayLabel(day) : DATA.campaign.title)}</p>
            <a class="leo-btn leo-btn--primary" href="${esc(day ? day.page : AGENDA_PAGE)}">
              Ver la agenda de hoy ${ICON.arrow}
            </a>
            <p class="leo-today__note">
              Comparamos la hora de Buenos Aires con el programa oficial.
              No es un seguimiento en vivo: los horarios pueden variar.
            </p>
          </div>
        </div>`;
    }

    if (state.phase === "POST") {
      return `
        <div class="leo-shell leo-today__inner">
          <div class="leo-today__slot">
            <span class="leo-today__label">La visita terminó</span>
            <p class="leo-today__title">
              El Papa León XIV estuvo en la Argentina del ${esc(DATA.campaign.datesLabelLong)}.
            </h3>
            <p class="leo-today__place">Queda el programa oficial completo, día por día.</p>
          </div>
          <div class="leo-today__slot"></div>
          <div class="leo-today__aside">
            <a class="leo-btn leo-btn--primary" href="${esc(AGENDA_PAGE)}">
              Ver los cuatro días ${ICON.arrow}
            </a>
          </div>
        </div>`;
    }

    // PRE
    const next = state.nextOpenEvent || OPEN_EVENTS[0];
    return `
      <div class="leo-shell leo-today__inner">
        <div class="leo-today__slot">
          <span class="leo-today__label">Próximo gran encuentro</span>
          <p class="leo-today__time">${esc(next.time)}</p>
          <p class="leo-today__title">${esc(next.title)}</h3>
          <p class="leo-today__place">${esc(placeLine(next))}</p>
        </div>
        <div class="leo-today__slot">
          <span class="leo-today__label">Cuándo</span>
          <p class="leo-today__title">${esc(dayLabel(next))}</h3>
          <p class="leo-today__place">${esc(statusText(state))} para el inicio de la visita.</p>
        </div>
        <div class="leo-today__aside">
          <a class="leo-btn leo-btn--primary" href="${esc(next.page)}">
            Ver ese día ${ICON.arrow}
          </a>
          <p class="leo-today__note">
            Las indicaciones de acceso todavía no fueron publicadas.
          </p>
        </div>
      </div>`;
  }

  /* Los cuatro días. */
  function daysMarkup(state) {
    return DATA.days
      .map((day) => {
        const chapter = day.chapter || {};
        const isToday = state.phase === "DURING" && state.today === day.date;
        const photo = chapter.photo
          ? `<figure class="leo-daycard__photo" aria-hidden="true">
               <img src="${esc(chapter.photo)}" alt="" loading="lazy" decoding="async">
             </figure>`
          : "";
        return `
          <li>
            <a class="leo-daycard ${isToday ? "is-today" : ""}" href="${esc(day.page)}">
              ${photo}
              <p class="leo-daycard__num">${esc(day.dayNumber)}
                <span>${esc(day.weekday)} · Noviembre</span>
              </p>
              <p class="leo-daycard__city">${esc(day.cardCities || day.citiesLabel)}</p>
              <p class="leo-daycard__what">${esc(chapter.title || day.summary)}</p>
              <span class="leo-daycard__go">Ver el día ${ICON.arrow}</span>
            </a>
          </li>`;
      })
      .join("");
  }

  /* Encuentros destacados: exactamente los abiertos al público. */
  function picksMarkup() {
    return OPEN_EVENTS.map(
      (event) => `
        <li>
          <a class="leo-pick" href="${esc(event.page)}">
            <span class="leo-pick__when">
              <span class="leo-pick__date">${esc(dayNum(event))} nov</span>
              <span class="leo-pick__time">${esc(event.time)}</span>
            </span>
            <span class="leo-pick__what">
              <span class="leo-pick__title">${esc(event.title)}</span>
              <span class="leo-pick__place">${esc(placeLine(event))}</span>
            </span>
            <svg class="leo-pick__go" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </li>`
    ).join("");
  }

  function sourcesMarkup() {
    return (DATA.sources || [])
      .map(
        (source) => `
        <li>
          <div class="leo-source">
            <a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">
              ${esc(source.label)}
              <span class="leo-sr-only">(se abre en una pestaña nueva)</span>
            </a>
            <span>${esc(source.publisher)}</span>
          </div>
        </li>`
      )
      .join("");
  }

  function participationMarkup() {
    return OPEN_EVENTS.map(
      (event) => `
        <li class="leo-participation__item">
          <p class="leo-participation__when">
            ${esc(event.weekday)} ${esc(dayNum(event))} de ${esc(event.monthLabel)} · ${esc(event.time)}
          </p>
          <h2 class="leo-participation__title">${esc(event.title)}</h2>
          <p class="leo-participation__place">${esc(placeLine(event))}</p>
          ${mapLink(event)}
          <p class="leo-pending">
            ${ICON.info}
            <span>Información de acceso por confirmar</span>
          </p>
          <a class="leo-link" href="${esc(event.page)}">Ver el día completo ${ICON.arrow}</a>
        </li>`
    ).join("");
  }

  const sourcesSection = () => `
    <section class="leo-section leo-section--alt" id="fuentes">
      <div class="leo-shell leo-shell--narrow">
        <div class="leo-section__head">
          <div>
            <span class="leo-eyebrow">De dónde sale esta información</span>
            <h2 class="leo-section__title">Fuentes oficiales</h2>
          </div>
        </div>
        <ul class="leo-sources">${sourcesMarkup()}</ul>
        <p class="leo-updated">
          Programa contrastado con la fuente oficial el
          <b>${esc(DATA.updatedAtLabel)}</b>. Si la Santa Sede o la organización
          local publican cambios, esta página se actualiza.
        </p>
      </div>
    </section>`;

  /* =======================================================
     PÁGINAS
     ======================================================= */

  function renderLanding(app, state) {
    app.innerHTML = `
      <section class="leo-hero">
        <div class="leo-hero__bg" aria-hidden="true"></div>
        <figure class="leo-hero__photo" aria-hidden="true">
          <img src="imagenes/papa-leon.jpg" alt="" width="1200" height="265"
               fetchpriority="high" decoding="async">
        </figure>
        <div class="leo-shell leo-hero__inner">
          <span class="leo-eyebrow">${esc(DATA.campaign.eyebrow)}</span>
          <h1 class="leo-hero__title">León XIV en Argentina</h1>
          <p class="leo-hero__date">8 — 11 noviembre 2026</p>
          <p class="leo-hero__cities">${esc(DATA.campaign.citiesLabel.replace(/·/g, "·"))}</p>
          <p class="leo-hero__status">${statusMarkup(state)}</p>
          <div class="leo-hero__actions">
            <a class="leo-btn leo-btn--primary" href="${esc(AGENDA_PAGE)}">
              Ver agenda completa ${ICON.arrow}
            </a>
            <a class="leo-btn leo-btn--ghost" href="#hoy">Qué pasa hoy</a>
          </div>
        </div>
      </section>

      <section class="leo-today" id="hoy">${todayMarkup(state)}</section>

      <section class="leo-section" id="dias">
        <div class="leo-shell">
          <div class="leo-section__head">
            <div>
              <span class="leo-eyebrow">Elegí un día</span>
              <h2 class="leo-section__title">La visita en 4 días</h2>
            </div>
            <a class="leo-link" href="${esc(AGENDA_PAGE)}">Cronograma completo ${ICON.arrow}</a>
          </div>
          <ul class="leo-days" data-leo-in>${daysMarkup(state)}</ul>
        </div>
      </section>

      <section class="leo-section leo-section--alt" id="destacados">
        <div class="leo-shell">
          <div class="leo-section__head">
            <div>
              <span class="leo-eyebrow">Abiertos a los fieles</span>
              <h2 class="leo-section__title">Encuentros destacados</h2>
              <p class="leo-section__lead">
                Las cuatro celebraciones del programa oficial abiertas a la
                participación. Las indicaciones de acceso todavía no fueron publicadas.
              </p>
            </div>
            <a class="leo-link" href="${esc(PARTICIPAR_PAGE)}">Cómo participar ${ICON.arrow}</a>
          </div>
          <ul class="leo-picks" data-leo-in>${picksMarkup()}</ul>
        </div>
      </section>

      <section class="leo-section" id="osa">
        <div class="leo-shell">
          <div class="leo-osa">
            <figure class="leo-osa__figure" data-leo-in>
              <img src="imagenes/papa-leon-agustinos-madrid.jpeg"
                   alt="El Papa León XIV junto a religiosos agustinos y miembros de la familia agustiniana en Madrid"
                   width="750" height="422" loading="lazy" decoding="async">
              <figcaption>León XIV con la familia agustiniana, durante su viaje a España.</figcaption>
            </figure>
            <div>
              <span class="leo-eyebrow">Por qué lo seguimos desde acá</span>
              <h2 class="leo-section__title">Un Papa agustino</h2>
              <blockquote class="leo-quote">
                Un solo corazón y una sola alma orientados hacia Dios.
                <cite>Regla de San Agustín</cite>
              </blockquote>
              <p>
                Robert Francis Prevost profesó en la Orden de San Agustín, fue Prior
                General entre 2001 y 2013, y en 2025 fue elegido Obispo de Roma con el
                nombre de León XIV. En 2004 ya había estado en Buenos Aires, en el
                Congreso Agustiniano de Teología.
              </p>
              <a class="leo-btn leo-btn--quiet" href="noticia-prevost.html">
                Leer sobre el Congreso de 2004 ${ICON.arrow}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="leo-section leo-section--alt">
        <div class="leo-shell">
          <div class="leo-cta">
            <div>
              <span class="leo-eyebrow">23 puntos del programa</span>
              <p class="leo-cta__title">El cronograma oficial completo</p>
            </div>
            <a class="leo-btn leo-btn--primary" href="${esc(AGENDA_PAGE)}">
              Ver agenda ${ICON.arrow}
            </a>
          </div>
        </div>
      </section>

      ${sourcesSection()}`;

    initHeroParallax(app);
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
        const meta = [];
        if (event.category) meta.push(`<span class="leo-tag">${esc(event.category)}</span>`);
        if (flag) meta.push(flag);
        return `
          <li class="leo-event ${cls}">
            <p class="leo-event__time">
              <time datetime="${esc(event.date)}T${esc(event.time)}">${esc(event.time)}</time>
            </p>
            <div class="leo-event__body">
              <h3 class="leo-event__title">${esc(event.title)}</h3>
              ${placeLine(event) ? `<p class="leo-event__place">${esc(placeLine(event))}</p>` : ""}
              ${meta.length ? `<p class="leo-event__meta">${meta.join("")}</p>` : ""}
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
        : '<span class="leo-pager__empty"></span>';

    app.innerHTML = `
      <header class="leo-dayhead">
        <div class="leo-shell">
          <p class="leo-dayhead__num">${esc(day.dayNumber)}<em>${esc(day.weekday)} · Noviembre 2026</em></p>
          <p class="leo-dayhead__route">${esc(day.route)}</p>
          <h1 class="leo-dayhead__title">${esc(chapter.title || dayLabel(day))}</h1>
          <p class="leo-dayhead__standfirst">${esc(chapter.standfirst || day.summary)}</p>
          ${isToday ? '<p class="leo-dayhead__chip">Hoy</p>' : ""}
        </div>
      </header>

      <section class="leo-section">
        <div class="leo-shell leo-shell--narrow">
          <div class="leo-section__head">
            <div>
              <span class="leo-eyebrow">${esc(dayLabel(day))}</span>
              <h2 class="leo-section__title">Cronograma del día</h2>
            </div>
            <a class="leo-link" href="${esc(AGENDA_PAGE)}#${esc(day.id)}">Ver en la agenda completa ${ICON.arrow}</a>
          </div>

          <ol class="leo-timeline">${events}</ol>

          <div class="leo-pager" role="navigation" aria-label="Navegación entre días">
            ${pagerLink(prev, "← Día anterior", "leo-pager__link--prev")}
            <a class="leo-pager__link leo-pager__link--center" href="${esc(LANDING)}">
              <span class="leo-pager__dir">Volver</span>
              <span class="leo-pager__name">León XIV en Argentina</span>
            </a>
            ${pagerLink(next, "Día siguiente →", "leo-pager__link--next")}
          </div>
        </div>
      </section>

      ${sourcesSection()}`;
  }

  function renderAgenda(app, state) {
    const groups = DATA.days
      .map((day) => {
        const rows = SCHEDULE.filter((event) => event.dayId === day.id)
          .map((event) => {
            const { cls, flag } = eventFlag(event, state);
            return `
              <li class="leo-agenda__row ${cls}">
                <span class="leo-agenda__time">
                  <time datetime="${esc(event.date)}T${esc(event.time)}">${esc(event.time)}</time>
                </span>
                <span class="leo-agenda__what">${esc(event.title)}</span>
                <span class="leo-agenda__where">${esc(placeLine(event))}</span>
                ${flag ? `<span class="leo-agenda__flags">${flag}</span>` : ""}
              </li>`;
          })
          .join("");

        const isToday = state.phase === "DURING" && state.today === day.date;
        return `
          <div class="leo-agenda__day" data-leo-day="${esc(day.id)}">
            <div class="leo-agenda__head" id="${esc(day.id)}">
              <div>
                <h2 class="leo-agenda__daytitle">${esc(dayLabel(day))}</h2>
                <span class="leo-agenda__route">${esc(day.route)}</span>
              </div>
              <div class="leo-agenda__flags">
                ${isToday ? '<span class="leo-flag leo-flag--now">Hoy</span>' : ""}
                <a class="leo-link" href="${esc(day.page)}">Ver el día ${ICON.arrow}</a>
              </div>
            </div>
            <ol class="leo-agenda__list">${rows}</ol>
          </div>`;
      })
      .join("");

    const filters = [{ id: "todos", label: "Todos" }]
      .concat(DATA.days.map((day) => ({ id: day.id, label: day.dayNumber })))
      .map(
        (item, i) =>
          `<button type="button" data-leo-filter="${esc(item.id)}"
                   aria-pressed="${i === 0 ? "true" : "false"}">${esc(item.label)}</button>`
      )
      .join("");

    app.innerHTML = `
      <section class="leo-section">
        <div class="leo-shell leo-shell--narrow">
          <div class="leo-section__head">
            <div>
              <span class="leo-eyebrow">8 al 11 de noviembre de 2026</span>
              <h1 class="leo-section__title">Agenda oficial completa</h1>
              <p class="leo-section__lead">
                Los 23 puntos del programa en la Argentina, con los horarios tal como
                figuran en la publicación de la Santa Sede.
              </p>
            </div>
            <a class="leo-link" href="${esc(LANDING)}">Volver a León XIV en Argentina ${ICON.arrow}</a>
          </div>

          <div class="leo-filter" role="group" aria-label="Filtrar por día">${filters}</div>
          <div id="leo-agenda-groups">${groups}</div>
        </div>
      </section>

      ${sourcesSection()}`;

    // Filtro por día: solo muestra u oculta, sin estado en la URL.
    const groupsRoot = app.querySelector("#leo-agenda-groups");
    app.querySelectorAll("[data-leo-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-leo-filter");
        app.querySelectorAll("[data-leo-filter]").forEach((other) => {
          other.setAttribute("aria-pressed", String(other === button));
        });
        groupsRoot.querySelectorAll(".leo-agenda__day").forEach((group) => {
          group.hidden = value !== "todos" && group.getAttribute("data-leo-day") !== value;
        });
      });
    });
  }

  function renderParticipar(app, state) {
    app.innerHTML = `
      <section class="leo-section">
        <div class="leo-shell">
          <div class="leo-section__head">
            <div>
              <span class="leo-eyebrow">Para los fieles</span>
              <h1 class="leo-section__title">Quiero participar</h1>
              <p class="leo-section__lead">
                Estas son las celebraciones del programa oficial abiertas a la
                participación. Las indicaciones de acceso, los horarios de apertura y
                cualquier requisito dependen de la organización local: todavía no
                fueron publicados. Cuando haya información oficial, la vas a encontrar acá.
              </p>
            </div>
            <a class="leo-link" href="${esc(LANDING)}">Volver a León XIV en Argentina ${ICON.arrow}</a>
          </div>

          <ul class="leo-participation">${participationMarkup()}</ul>

          <p class="leo-updated">
            No difundimos indicaciones de acceso, sectores, acreditaciones, capacidad
            ni transporte especial que no estén publicadas por una fuente oficial.
          </p>
        </div>
      </section>

      <section class="leo-today">${todayMarkup(state)}</section>

      ${sourcesSection()}`;
  }

  /* -------------------------------------------------------
     Movimiento discreto
     ------------------------------------------------------- */

  function initEntrances(root) {
    const targets = root.querySelectorAll("[data-leo-in]");
    if (!targets.length) return;

    if (reduceMotion.matches || typeof IntersectionObserver === "undefined") {
      targets.forEach((target) => target.classList.add("is-in"));
      return;
    }

    document.documentElement.classList.add("leo-anim");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    targets.forEach((target) => observer.observe(target));
  }

  /* Parallax corto del hero: solo mientras el hero está en pantalla. */
  function initHeroParallax(root) {
    const hero = root.querySelector(".leo-hero");
    if (!hero || reduceMotion.matches) return;

    let queued = false;
    const update = () => {
      queued = false;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const shift = clamp(-rect.top / Math.max(1, rect.height), 0, 1);
      hero.style.setProperty("--leo-shift", shift.toFixed(3));
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /* Alto del header sticky de OSA: el menú interno se ancla debajo. */
  function measureHeadroom() {
    const header = document.querySelector(".site-header");
    const height = header ? Math.round(header.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty("--leo-headroom", `${height}px`);
  }

  /* =======================================================
     POPUP DE PORTADA
     ======================================================= */

  function initPopup(state) {
    const mount = document.getElementById("leo-mount");
    if (!mount) return;

    const campaign = DATA.campaign;
    const campaignIsVisible =
      state.today >= campaign.visibleFrom && state.today <= campaign.archiveUntil;

    mount.innerHTML = `
      <div class="leo-modal" id="leo-modal" hidden>
        <button class="leo-modal__backdrop" type="button" data-leo-close
                tabindex="-1" aria-hidden="true"></button>
        <section class="leo-dialog" role="dialog" aria-modal="true"
                 aria-labelledby="leo-dialog-title" aria-describedby="leo-dialog-lead">
          <button class="leo-dialog__close" type="button" data-leo-close
                  aria-label="Cerrar el aviso de la visita">${ICON.close}</button>

          <div class="leo-dialog__visual">
            <figure class="leo-dialog__photo">
              <img src="imagenes/papa-leon.jpg" alt="" aria-hidden="true"
                   width="1200" height="265" decoding="async">
            </figure>
            <img class="leo-dialog__logo" src="imagenes/logo_new.png"
                 alt="Orden de San Agustín Argentina" width="1265" height="420">
            <p>
              <span class="leo-dialog__datenum">08&nbsp;—&nbsp;11</span>
              <span class="leo-dialog__datemeta">Noviembre 2026</span>
            </p>
          </div>

          <div class="leo-dialog__panel">
            <span class="leo-eyebrow">${esc(campaign.eyebrow)}</span>
            <h2 class="leo-dialog__title" id="leo-dialog-title">${esc(campaign.title)}</h2>
            <p class="leo-dialog__lead" id="leo-dialog-lead">${esc(campaign.popupLead)}</p>
            <p class="leo-dialog__status">${statusMarkup(state)}</p>
            <p class="leo-dialog__cities">${esc(campaign.citiesLabel)}</p>
            <div class="leo-dialog__actions">
              <a class="leo-btn leo-btn--primary" href="${esc(LANDING)}">
                Ver la visita ${ICON.arrow}
              </a>
              <button class="leo-dialog__dismiss" type="button" data-leo-close>Ahora no</button>
            </div>
          </div>
        </section>
      </div>

      <button class="leo-launcher" id="leo-launcher" type="button" hidden
              aria-haspopup="dialog" aria-controls="leo-modal">
        <span class="leo-launcher__mark" aria-hidden="true">8—11</span>
        <span class="leo-launcher__copy">
          <strong>León XIV en Argentina</strong>
          <small>${esc(statusText(state))}</small>
        </span>
        ${ICON.arrow}
      </button>
    `;

    const modal = mount.querySelector("#leo-modal");
    const dialog = mount.querySelector(".leo-dialog");
    const launcher = mount.querySelector("#leo-launcher");
    const closeButton = mount.querySelector(".leo-dialog__close");

    let lastFocused = null;
    let closeTimer = null;

    const focusable = () =>
      [...dialog.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), a[href]')]
        .filter((element) => element.getClientRects().length > 0);

    const setSeen = () => {
      try {
        window.localStorage.setItem(campaign.storageKey, "true");
      } catch (error) {
        /* Si el navegador bloquea el almacenamiento, el popup sigue siendo usable. */
      }
    };

    const hasSeen = () => {
      try {
        return window.localStorage.getItem(campaign.storageKey) === "true";
      } catch (error) {
        return false;
      }
    };

    const openModal = () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
      lastFocused = document.activeElement;
      modal.hidden = false;
      // Reflow forzado: la transición arranca sin depender de
      // requestAnimationFrame, que no corre si la pestaña no pinta.
      void modal.offsetWidth;
      modal.classList.add("is-open");
      document.body.classList.add("leo-is-open");
      closeButton.focus({ preventScroll: true });
      setSeen();
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      document.body.classList.remove("leo-is-open");
      const restore = () => {
        modal.hidden = true;
        // Si el popup se abrió solo, el foco previo era <body>: devolverlo
        // al lanzador deja al teclado en un punto útil.
        const target =
          lastFocused &&
          lastFocused !== document.body &&
          typeof lastFocused.focus === "function" &&
          document.contains(lastFocused)
            ? lastFocused
            : launcher;
        target.focus({ preventScroll: true });
      };
      if (reduceMotion.matches) restore();
      else closeTimer = window.setTimeout(restore, 280);
    };

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    mount.querySelectorAll("[data-leo-close]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });

    launcher.addEventListener("click", () => openModal());

    if (!campaignIsVisible) return;

    launcher.hidden = false;
    const forceOpen = new URLSearchParams(window.location.search).get("leo") === "1";

    if (!hasSeen() || forceOpen) {
      window.setTimeout(openModal, reduceMotion.matches ? 0 : 700);
    }
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

    initPopup(state);

    const app = document.getElementById("leo-app");
    if (app) {
      const kind = app.getAttribute("data-leo-page");
      if (kind === "landing") renderLanding(app, state);
      else if (kind === "day") renderDay(app, state, app.getAttribute("data-leo-day"));
      else if (kind === "agenda") renderAgenda(app, state);
      else if (kind === "participar") renderParticipar(app, state);

      renderSubnav(state);
      initEntrances(app);

      measureHeadroom();
      window.addEventListener("resize", measureHeadroom, { passive: true });
      window.addEventListener("load", measureHeadroom, { once: true });

      // El contenido recién existe ahora: si se llegó por un ancla, reubicar.
      if (window.location.hash) {
        const target = document.getElementById(window.location.hash.slice(1));
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
