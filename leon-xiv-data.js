/*
  León XIV en Argentina · Viaje Apostólico 8 — 11 de noviembre de 2026
  ---------------------------------------------------------------------
  ÚNICA fuente de verdad del especial. El popup de la portada y la página
  leon-xiv-argentina.html leen desde acá. No dupliques estos datos.

  Regla de integridad: el programa (horarios, sedes, nombres) se transcribe
  tal cual de la Santa Sede (ver `sources`). Las reglas de inscripción y
  acceso vienen de la organización local según fuentes fechadas
  (ver `registration.sources`) y caducan solas: después de
  `registration.deadline` la web deja de anunciar la inscripción como abierta.
  Lo que no está verificado se remite al sitio oficial, sin inventar.

  Horarios expresados en hora de Argentina (America/Argentina/Buenos_Aires).
*/
window.LEON_XIV_ARGENTINA_2026 = {
  version: 2,

  // Fecha de la última revisión del programa contra la fuente oficial.
  // (23/10/2026: el programa de vatican.va coincide punto por punto.)
  updatedAt: "2026-10-23",
  updatedAtLabel: "23 de octubre de 2026",

  campaign: {
    // Clave de localStorage del popup de la V1. La V2 ya no abre un popup:
    // se conserva solo como referencia histórica, no se lee ni se escribe.
    storageKey: "osa-leon-xiv-argentina-2026-v1-seen",
    // Desde cuándo se muestra el aviso del especial en la portada de OSA.
    visibleFrom: "2026-09-21",
    // Tramo argentino del viaje.
    firstDay: "2026-11-08",
    lastDay: "2026-11-11",
    // Llegada a Aeroparque y salida hacia Lima (hora de Argentina).
    arrival: "2026-11-08T16:30",
    departure: "2026-11-11T14:00",
    // Hasta cuándo el especial conserva el aviso en la portada y el enlace del menú.
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

  /*
    Inscripción y acceso (organización local de la visita).
    - `deadline`: fin del plazo informado, hora de Argentina. Pasada esa hora
      la web muestra el plazo como vencido y remite al sitio oficial.
    - `verifiedAt`: cuándo se contrastó por última vez con las fuentes.
    - `access`: tipos usados por el campo `access` de cada evento.
    Si el plazo se extiende o cambian las reglas, actualizar acá con su fuente.
  */
  registration: {
    portalUrl: "https://www.elpapaenargentina.com.ar/",
    portalLabel: "elpapaenargentina.com.ar",
    deadline: "2026-10-28T23:59",
    deadlineLabel: "miércoles 28 de octubre",
    verifiedAt: "2026-10-23",
    verifiedAtLabel: "23 de octubre de 2026",
    // Condiciones generales informadas el 22/10/2026 (ver fuentes).
    rules: [
      "La inscripción es gratuita y se hace solo en el sitio oficial.",
      "Pueden inscribirse mayores de 16 años; a los menores los inscribe un adulto responsable.",
      "Se puede inscribir una persona o un grupo de hasta 20 personas.",
      "El correo electrónico se valida con un código; después el sistema sugiere una puerta de acceso.",
      "Completar el formulario no garantiza un lugar en las actividades con cupo: requieren confirmación de la organización.",
      "Para los sectores reservados a personas con discapacidad hay un formulario específico con documentación (por ejemplo, el Certificado Único de Discapacidad) y se envía un código QR.",
    ],
    access: {
      recomendada: {
        label: "Inscripción recomendada",
        detail: "Para las misas la inscripción se recomienda pero no es obligatoria. El acceso es libre y no hace falta código QR.",
      },
      obligatoria: {
        label: "Inscripción obligatoria, con cupo",
        detail: "Requiere aprobación de la organización. Quienes quedan admitidos reciben por correo un código QR personal e intransferible.",
      },
      consultar: {
        label: "Condiciones en el sitio oficial",
        detail: "Está incluida en la inscripción para los encuentros con jóvenes. Consultá las condiciones actualizadas en el sitio oficial.",
      },
    },
    sources: [
      {
        label: "Visita León XIV: continúan las inscripciones para participar de los encuentros con el Papa",
        publisher: "AICA · 22 de octubre de 2026",
        url: "https://aica.org/imprimir-noticia.php?id=76104",
      },
      {
        label: "Siguen abiertas las inscripciones para la visita de León XIV",
        publisher: "Canal C (Córdoba) · 22 de octubre de 2026",
        url: "https://canalc.com.ar/visita-leon-xiv-inscripciones-misa-fadea-cordoba/",
      },
    ],
  },

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
      Describe el evento, NO garantiza el ingreso.
    - `access`: clave de `registration.access` cuando hay reglas verificadas.
    - `accessNote`: matiz verificado de ese evento (opcional).
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
          access: "recomendada",
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
          access: "recomendada",
          accessNote: "Según la organización local, la misma inscripción incluye la vigilia previa en el predio, el lunes 9.",
        },
        {
          time: "15:15",
          title: "Encuentro con obispos, sacerdotes, diáconos, consagrados y consagradas, seminaristas y agentes de pastoral",
          venue: "Catedral de Córdoba",
          city: "Córdoba",
          category: "Encuentro",
          access: "obligatoria",
          accessNote: "Para obispos, sacerdotes, diáconos, consagrados, seminaristas y agentes de pastoral. Es una inscripción aparte de la de la Misa.",
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
          access: "consultar",
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
          access: "recomendada",
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
