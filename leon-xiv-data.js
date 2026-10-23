/*
  León XIV en Argentina · Viaje Apostólico 8 — 11 de noviembre de 2026
  ---------------------------------------------------------------------
  ÚNICA fuente de verdad del especial. El popup de la portada y la página
  leon-xiv-argentina.html leen desde acá. No dupliques estos datos.

  Regla de integridad: solo se carga información publicada por la Santa Sede
  (ver `sources`). Horarios, sedes y nombres se transcriben tal cual.
  Todo lo operativo local (accesos, sectores, acreditaciones, transporte,
  transmisiones) queda como "por confirmar" hasta que exista fuente oficial.

  Horarios expresados en hora de Argentina (America/Argentina/Buenos_Aires).
*/
window.LEON_XIV_ARGENTINA_2026 = {
  version: 1,

  // Fecha de la última revisión del programa contra la fuente oficial.
  updatedAt: "2026-09-21",
  updatedAtLabel: "21 de septiembre de 2026",

  campaign: {
    // Clave de localStorage del popup. Subí el sufijo -vN para que vuelva a abrirse solo.
    storageKey: "osa-leon-xiv-argentina-2026-v1-seen",
    // Desde cuándo se muestra el lanzador y puede autoabrirse el popup.
    visibleFrom: "2026-09-21",
    // Tramo argentino del viaje.
    firstDay: "2026-11-08",
    lastDay: "2026-11-11",
    // Llegada a Aeroparque y salida hacia Lima (hora de Argentina).
    arrival: "2026-11-08T16:30",
    departure: "2026-11-11T14:00",
    // Hasta cuándo el especial conserva el lanzador en la portada.
    archiveUntil: "2026-12-31",
    datesLabel: "8 — 11 NOV 2026",
    datesLabelLong: "8 al 11 de noviembre de 2026",
    citiesLabel: "Buenos Aires · Córdoba · Luján",
    pageUrl: "leon-xiv-argentina.html",
    eyebrow: "Viaje Apostólico · Argentina 2026",
    title: "León XIV en Argentina",
    popupLead:
      "El Papa agustino visita la Argentina dentro de su viaje apostólico a Uruguay, Argentina y Perú.",
  },

  sources: [
    {
      label: "Programa del Viaje Apostólico (vatican.va)",
      publisher: "Santa Sede",
      url: "https://www.vatican.va/content/leo-xiv/es/travels/2026/documents/uruguay-argentina-peru-6-17novembre2026.html",
    },
    {
      label: "Boletín de la Oficina de Prensa de la Santa Sede (21/09/2026)",
      publisher: "Oficina de Prensa de la Santa Sede",
      url: "https://press.vatican.va/content/salastampa/es/bollettino/pubblico/2026/09/21/210926d.html",
    },
  ],

  // Lugares del recorrido argentino. Los enlaces abren Google Maps (sin SDK ni API).
  route: [
    {
      id: "buenos-aires",
      name: "Buenos Aires",
      detail: "Aeroparque, Plaza San Martín, Casa Rosada, Palacio Libertad, Monumento de los Españoles, UCA, Palacio San Martín, Catedral Metropolitana, Complejo Penitenciario Federal y Aeropuerto Internacional Ministro Pistarini.",
      daysLabel: "8, 9, 10 y 11 de noviembre",
      maps: "https://www.google.com/maps/search/?api=1&query=Monumento+de+los+Espa%C3%B1oles+Buenos+Aires",
    },
    {
      id: "claypole",
      name: "Claypole",
      detail: "Pequeño Cottolengo Don Orione, en el sur del conurbano bonaerense.",
      daysLabel: "9 de noviembre",
      maps: "https://www.google.com/maps/search/?api=1&query=Peque%C3%B1o+Cottolengo+Don+Orione+Claypole",
    },
    {
      id: "cordoba",
      name: "Córdoba",
      detail: "Predio de la Escuela de Aviación Militar y Catedral de Córdoba.",
      daysLabel: "10 de noviembre",
      maps: "https://www.google.com/maps/search/?api=1&query=Escuela+de+Aviaci%C3%B3n+Militar+C%C3%B3rdoba",
    },
    {
      id: "lujan",
      name: "Luján",
      detail: "Explanada de la Basílica de Nuestra Señora de Luján.",
      daysLabel: "11 de noviembre",
      maps: "https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica+de+Nuestra+Se%C3%B1ora+de+Luj%C3%A1n",
    },
  ],

  /*
    Programa oficial del tramo argentino.
    - `time`: hora de Argentina, formato HH:mm.
    - `category`: solo cuando surge con claridad del programa oficial.
    - `open: true`: celebración abierta al público según su propia naturaleza.
      NO implica acceso libre ni inscripción: eso sigue sin confirmar.
  */
  days: [
    {
      id: "dia-8",
      cardCities: "Buenos Aires",
      page: "leon-xiv-dia-8.html",
      chapter: {
        number: "01",
        title: "La llegada",
        standfirst:
          "El Papa aterriza en Buenos Aires y la ciudad lo recibe en el mismo día.",
        /* Solo como textura de la placa del riel: en el relato no se repite,
           porque es la misma fotografía que abre la página. */
        photo: "imagenes/papa-leon.jpg",
      },
      date: "2026-11-08",
      weekday: "Domingo",
      dayNumber: "08",
      monthLabel: "noviembre",
      shortLabel: "Dom 8",
      route: "Montevideo → Buenos Aires",
      citiesLabel: "Buenos Aires",
      summary: "Llegada a la Argentina, ceremonia de bienvenida y encuentro con autoridades.",
      events: [
        {
          time: "15:30",
          title: "Salida de Montevideo hacia Buenos Aires",
          city: "Montevideo, Uruguay",
          category: "Traslado",
        },
        {
          time: "16:30",
          title: "Llegada y recibimiento oficial",
          venue: "Aeropuerto Jorge Newbery (Aeroparque)",
          city: "Buenos Aires",
          category: "Ceremonia oficial",
        },
        {
          time: "17:00",
          title: "Visita al Monumento al General San Martín y a los Ejércitos de la Independencia",
          venue: "Plaza San Martín",
          city: "Buenos Aires",
          category: "Visita",
        },
        {
          time: "17:20",
          title: "Ceremonia de bienvenida",
          venue: "Casa Rosada",
          city: "Buenos Aires",
          category: "Ceremonia oficial",
        },
        {
          time: "17:50",
          title: "Visita al Presidente de la República",
          city: "Buenos Aires",
          category: "Encuentro",
        },
        {
          time: "18:30",
          title: "Encuentro con las autoridades, la sociedad civil y el cuerpo diplomático",
          venue: "Palacio Libertad",
          city: "Buenos Aires",
          category: "Encuentro",
        },
      ],
    },
    {
      id: "dia-9",
      cardCities: "Claypole + Buenos Aires",
      page: "leon-xiv-dia-9.html",
      chapter: {
        number: "02",
        title: "El encuentro",
        standfirst:
          "Un día de gente: el Cottolengo, la Misa en el Monumento de los Españoles y las Vísperas en la Catedral.",
        photo: "imagenes/papa-700x450.jpg",
        beatPhoto: "imagenes/papa-700x450.jpg",
        photoAlt: "El Papa León XIV durante una celebración litúrgica",
        photoCaption: "León XIV en una celebración litúrgica. Archivo OSA Argentina.",
      },
      date: "2026-11-09",
      weekday: "Lunes",
      dayNumber: "09",
      monthLabel: "noviembre",
      shortLabel: "Lun 9",
      route: "Buenos Aires → Claypole → Buenos Aires",
      citiesLabel: "Buenos Aires · Claypole",
      summary: "Visita al Pequeño Cottolengo, Misa en el Monumento de los Españoles y Vísperas en la Catedral.",
      events: [
        {
          time: "09:15",
          title: "Visita al personal y a los residentes del Pequeño Cottolengo Don Orione",
          venue: "Pequeño Cottolengo Don Orione",
          city: "Claypole",
          category: "Visita",
        },
        {
          time: "11:30",
          title: "Santa Misa",
          venue: "Monumento de los Españoles",
          maps: "https://www.google.com/maps/search/?api=1&query=Monumento+de+los+Espa%C3%B1oles+Buenos+Aires",
          city: "Buenos Aires",
          category: "Celebración",
          open: true,
        },
        {
          time: "16:10",
          title: "Encuentro con el mundo del trabajo",
          venue: "Universidad Católica Argentina",
          city: "Buenos Aires",
          category: "Encuentro",
        },
        {
          time: "17:30",
          title: "Encuentro con los responsables de las comunidades cristianas y de las tradiciones religiosas",
          venue: "Palacio San Martín",
          city: "Buenos Aires",
          category: "Encuentro",
        },
        {
          time: "18:45",
          title: "Vísperas con el episcopado argentino y los equipos sinodales",
          venue: "Catedral Metropolitana",
          city: "Buenos Aires",
          category: "Oración",
        },
        {
          time: "19:45",
          title: "Cena con los obispos",
          venue: "Residencia del Arzobispo",
          city: "Buenos Aires",
          category: "Encuentro",
        },
      ],
    },
    {
      id: "dia-10",
      cardCities: "Córdoba + Buenos Aires",
      page: "leon-xiv-dia-10.html",
      chapter: {
        number: "03",
        title: "Córdoba y los jóvenes",
        standfirst:
          "Ida y vuelta a Córdoba en el día, y a la noche la vigilia de los jóvenes en Buenos Aires.",
      },
      date: "2026-11-10",
      weekday: "Martes",
      dayNumber: "10",
      monthLabel: "noviembre",
      shortLabel: "Mar 10",
      route: "Buenos Aires → Córdoba → Buenos Aires",
      citiesLabel: "Córdoba · Buenos Aires",
      summary: "Misa en Córdoba, encuentro en la Catedral cordobesa y Vigilia de los jóvenes en Buenos Aires.",
      events: [
        {
          time: "07:30",
          title: "Vuelo de Buenos Aires a Córdoba",
          city: "Buenos Aires",
          category: "Traslado",
        },
        {
          time: "09:00",
          title: "Llegada a Córdoba",
          city: "Córdoba",
          category: "Traslado",
        },
        {
          time: "10:00",
          title: "Santa Misa",
          venue: "Predio de la Escuela de Aviación Militar",
          maps: "https://www.google.com/maps/search/?api=1&query=Escuela+de+Aviaci%C3%B3n+Militar+C%C3%B3rdoba",
          city: "Córdoba",
          category: "Celebración",
          open: true,
        },
        {
          time: "15:15",
          title: "Encuentro con obispos, sacerdotes, diáconos, consagrados y consagradas, seminaristas y agentes de pastoral",
          venue: "Catedral de Córdoba",
          city: "Córdoba",
          category: "Encuentro",
        },
        {
          time: "16:55",
          title: "Vuelo de Córdoba a Buenos Aires",
          city: "Córdoba",
          category: "Traslado",
        },
        {
          time: "18:10",
          title: "Llegada a Buenos Aires",
          venue: "Aeropuerto Jorge Newbery (Aeroparque)",
          city: "Buenos Aires",
          category: "Traslado",
        },
        {
          time: "20:15",
          title: "Vigilia de los jóvenes",
          venue: "Monumento de los Españoles",
          maps: "https://www.google.com/maps/search/?api=1&query=Monumento+de+los+Espa%C3%B1oles+Buenos+Aires",
          city: "Buenos Aires",
          category: "Celebración",
          open: true,
        },
      ],
    },
    {
      id: "dia-11",
      cardCities: "Luján + Buenos Aires",
      page: "leon-xiv-dia-11.html",
      chapter: {
        number: "04",
        title: "Luján y la despedida",
        standfirst:
          "La última mañana: Luján, la Basílica, y el vuelo que se va hacia Lima.",
      },
      date: "2026-11-11",
      weekday: "Miércoles",
      dayNumber: "11",
      monthLabel: "noviembre",
      shortLabel: "Mié 11",
      route: "Buenos Aires → Luján → Lima",
      citiesLabel: "Buenos Aires · Luján",
      summary: "Visita al Complejo Penitenciario Federal, Misa en Luján y despedida hacia Perú.",
      events: [
        {
          time: "08:00",
          title: "Visita al Complejo Penitenciario Federal de Buenos Aires",
          venue: "Complejo Penitenciario Federal",
          city: "Buenos Aires",
          category: "Visita",
        },
        {
          time: "10:00",
          title: "Santa Misa",
          venue: "Explanada de la Basílica de Nuestra Señora de Luján",
          maps: "https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica+de+Nuestra+Se%C3%B1ora+de+Luj%C3%A1n",
          city: "Luján",
          category: "Celebración",
          open: true,
        },
        {
          time: "13:30",
          title: "Ceremonia de despedida",
          venue: "Aeropuerto Internacional Ministro Pistarini",
          city: "Buenos Aires",
          category: "Ceremonia oficial",
        },
        {
          time: "14:00",
          title: "Salida hacia Lima",
          venue: "Aeropuerto Internacional Ministro Pistarini",
          city: "Buenos Aires",
          category: "Traslado",
        },
      ],
    },
  ],
};
