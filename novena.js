(() => {
  const modal = document.getElementById("novena-modal");
  const launcher = document.getElementById("novena-launcher");

  if (!modal || !launcher) return;

  const CAMPAIGN_START = 20260819;
  const CAMPAIGN_END = 20260828;
  const CAMPAIGN_VISIBLE_FROM = 20260701;
  const STORAGE_KEY = "osa-novena-san-agustin-2026-v1-seen";
  const ASSET_ROOT =
    "Novena San Agustín 2026-20260729T182852Z-1-001/Novena San Agustín 2026";

  const days = [
    {
      day: 1,
      date: 19,
      title: "Las raíces: Agustín, pastor del corazón inquieto",
      file: "Novena Dia (1).png",
    },
    {
      day: 2,
      date: 20,
      title: "Raíces en América: los primeros misioneros agustinos",
      file: "Novena Dia (2).png",
    },
    {
      day: 3,
      date: 21,
      title: "La llegada a Buenos Aires: providencia y perseverancia",
      file: "Novena Dia (3).png",
    },
    {
      day: 4,
      date: 22,
      title: "La primera residencia: pequeños comienzos, grande misión",
      file: "Novena Dia (4).png",
    },
    {
      day: 5,
      date: 23,
      title: "La iglesia y el colegio: fe y cultura unidas",
      file: "Novena Dia (5).png",
    },
    {
      day: 6,
      date: 24,
      title: "Expansión por el país: una presencia que fructifica",
      file: "Novena Dia (6).png",
    },
    {
      day: 7,
      date: 25,
      title: "La Prelatura de Cafayate: la Iglesia en las periferias",
      file: "Novena Dia (7).png",
    },
    {
      day: 8,
      date: 26,
      title: "La unificación: un solo corazón orientado hacia Dios",
      file: "Novena Dia (8).png",
    },
    {
      day: 9,
      date: 27,
      title: "125 años: memoria, gratitud y misión",
      file: "Novena Dia (9).png",
    },
  ];

  const prayers = {
    start: {
      kicker: "Oración de inicio",
      title: "Prepará el corazón",
      dateLabel: "Antes de cada reflexión",
      file: "1.Oración Inicio.png",
      alt: "Oración de inicio de la Novena a San Agustín",
    },
    end: {
      kicker: "Oración de cierre",
      title: "Tarde te amé",
      dateLabel: "Al terminar cada día",
      file: "2.Oración Cierre.png",
      alt: "Oración de cierre de la Novena a San Agustín",
    },
  };

  const dayList = document.getElementById("novena-days");
  const statusTitle = document.getElementById("novena-status-title");
  const statusCopy = document.getElementById("novena-status-copy");
  const viewerKicker = document.getElementById("novena-viewer-kicker");
  const viewerTitle = document.getElementById("novena-viewer-title");
  const viewerDate = document.getElementById("novena-viewer-date");
  const flyerImage = document.getElementById("novena-flyer-image");
  const flyerLink = document.getElementById("novena-flyer-link");
  const fullLink = document.getElementById("novena-open-full");
  const closeButton = modal.querySelector(".novena-icon-button");

  let lastFocusedElement = null;
  let closeTimer = null;
  let selectedType = "prayer";
  let selectedValue = "start";

  const getArgentinaDateParts = () => {
    const localPreviewAllowed =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const previewDate = localPreviewAllowed
      ? new URLSearchParams(window.location.search).get("novenaDate")
      : null;
    const sourceDate = previewDate && /^\d{4}-\d{2}-\d{2}$/.test(previewDate)
      ? new Date(`${previewDate}T12:00:00-03:00`)
      : new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(sourceDate);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    return {
      year: Number(values.year),
      month: Number(values.month),
      day: Number(values.day),
    };
  };

  const dateParts = getArgentinaDateParts();
  const todayStamp =
    dateParts.year * 10000 + dateParts.month * 100 + dateParts.day;
  const campaignIsVisible =
    todayStamp >= CAMPAIGN_VISIBLE_FROM && todayStamp <= CAMPAIGN_END;

  const getUnlockedCount = () => {
    if (todayStamp < CAMPAIGN_START) return 0;
    if (todayStamp >= 20260827) return 9;
    return Math.min(9, Math.max(0, todayStamp - CAMPAIGN_START + 1));
  };

  const unlockedCount = getUnlockedCount();
  const activeDayIndex = unlockedCount > 0 ? unlockedCount - 1 : -1;

  const assetUrl = (file) =>
    `${ASSET_ROOT}/${file}`;

  const daysUntilStart = () => {
    const now = Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day);
    const start = Date.UTC(2026, 7, 19);
    return Math.max(0, Math.ceil((start - now) / 86400000));
  };

  const updateStatus = () => {
    if (todayStamp < CAMPAIGN_START) {
      const remaining = daysUntilStart();
      statusTitle.textContent = "El camino comienza el 19 de agosto";
      statusCopy.textContent =
        remaining === 1
          ? "Falta un día. Podés preparar el corazón con la oración inicial."
          : `Faltan ${remaining} días. Podés preparar el corazón con la oración inicial.`;
      return;
    }

    if (todayStamp === 20260827) {
      statusTitle.textContent = "Hoy, el último paso";
      statusCopy.textContent =
        "Llegamos al Día 9: memoria agradecida y una misión que continúa.";
      return;
    }

    if (todayStamp >= CAMPAIGN_END) {
      statusTitle.textContent = "El camino está completo";
      statusCopy.textContent =
        "Nueve pasos compartidos nos conducen a la fiesta de San Agustín.";
      return;
    }

    statusTitle.textContent = "Hoy, un nuevo paso";
    statusCopy.textContent =
      `Estás en el Día ${unlockedCount} de la Novena. Detenete, leé la reflexión y orá con el corazón de San Agustín.`;
  };

  const lockIcon = `
    <svg class="novena-day__lock" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2"></rect>
      <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
    </svg>`;

  const renderPath = () => {
    dayList.innerHTML = "";

    days.forEach((item, index) => {
      const isUnlocked = index < unlockedCount;
      const isCurrent = index === activeDayIndex;
      const isSelected = selectedType === "day" && selectedValue === index;
      const listItem = document.createElement("li");
      listItem.className = "novena-day";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "novena-day__button";
      button.disabled = !isUnlocked;
      button.dataset.dayIndex = String(index);
      button.setAttribute("aria-pressed", String(isSelected));
      button.setAttribute(
        "aria-label",
        isUnlocked
          ? `Día ${item.day}, ${item.date} de agosto: ${item.title}`
          : `Día ${item.day}, bloqueado hasta el ${item.date} de agosto`
      );

      if (isCurrent) button.classList.add("is-current");
      if (isSelected) button.classList.add("is-selected");
      if (isCurrent && todayStamp <= 20260827) {
        button.setAttribute("aria-current", "step");
      }

      button.innerHTML = `
        <span class="novena-day__number">${item.day}</span>
        <span class="novena-day__copy">
          <strong>Día ${item.day}${isUnlocked ? "" : lockIcon}</strong>
          <span>${item.title}</span>
        </span>
        <span class="novena-day__date"><b>${item.date}</b>AGO</span>`;

      if (isUnlocked) {
        button.addEventListener("click", () => selectDay(index, true));
      }

      listItem.appendChild(button);
      dayList.appendChild(listItem);
    });
  };

  const updateViewer = ({ kicker, title, dateLabel, file, alt, actionLabel }) => {
    const url = assetUrl(file);
    viewerKicker.textContent = kicker;
    viewerTitle.textContent = title;
    viewerDate.textContent = dateLabel;
    flyerImage.src = url;
    flyerImage.alt = alt;
    flyerLink.href = url;
    flyerLink.setAttribute("aria-label", `Abrir en tamaño completo: ${alt}`);
    fullLink.href = url;
    fullLink.childNodes[0].textContent = `${actionLabel} `;
  };

  const clearPrayerSelection = () => {
    modal.querySelectorAll("[data-novena-prayer]").forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });
  };

  const selectPrayer = (key, shouldScroll = false) => {
    const prayer = prayers[key];
    if (!prayer) return;

    selectedType = "prayer";
    selectedValue = key;
    clearPrayerSelection();

    const selectedButton = modal.querySelector(`[data-novena-prayer="${key}"]`);
    selectedButton?.classList.add("is-selected");
    selectedButton?.setAttribute("aria-pressed", "true");

    renderPath();
    updateViewer({
      ...prayer,
      actionLabel: "Ver oración",
    });

    if (shouldScroll && window.matchMedia("(max-width: 860px)").matches) {
      modal.querySelector(".novena-viewer")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const selectDay = (index, shouldScroll = false) => {
    if (index < 0 || index >= unlockedCount) return;

    const item = days[index];
    selectedType = "day";
    selectedValue = index;
    clearPrayerSelection();
    renderPath();
    updateViewer({
      kicker: `Novena · Día ${item.day}`,
      title: item.title,
      dateLabel: `${item.date} de agosto de 2026`,
      file: item.file,
      alt: `Flyer del Día ${item.day} de la Novena a San Agustín: ${item.title}`,
      actionLabel: "Ver reflexión",
    });

    if (shouldScroll && window.matchMedia("(max-width: 860px)").matches) {
      modal.querySelector(".novena-viewer")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const setSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // La experiencia sigue funcionando si el navegador bloquea el almacenamiento.
    }
  };

  const hasSeen = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  };

  const getFocusableElements = () =>
    [...modal.querySelectorAll(
      'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
    )].filter((element) => element.getClientRects().length > 0);

  const centerSelectedDay = (behavior = "auto") => {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    const path = modal.querySelector(".novena-path");
    const selectedButton = modal.querySelector(".novena-day__button.is-selected");
    if (!path || !selectedButton) return;

    const selectedLeft =
      selectedButton.getBoundingClientRect().left -
      path.getBoundingClientRect().left +
      path.scrollLeft;
    const targetLeft =
      selectedLeft - (path.clientWidth - selectedButton.clientWidth) / 2;
    if (behavior === "smooth") {
      path.scrollTo({ left: Math.max(0, targetLeft), behavior });
    } else {
      path.scrollLeft = Math.max(0, targetLeft);
    }
  };

  const openModal = ({ automatic = false } = {}) => {
    if (closeTimer) window.clearTimeout(closeTimer);
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("novena-is-open");

    window.requestAnimationFrame(() => {
      modal.classList.add("is-open");
      closeButton?.focus({ preventScroll: true });
      window.setTimeout(() => centerSelectedDay(), 80);
    });

    if (automatic) setSeen();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("novena-is-open");
    closeTimer = window.setTimeout(() => {
      modal.hidden = true;
      lastFocusedElement?.focus?.({ preventScroll: true });
    }, 230);
  };

  const handleModalKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  updateStatus();
  selectPrayer("start");

  if (unlockedCount > 0) {
    selectDay(activeDayIndex);
  }

  modal.querySelectorAll("[data-novena-prayer]").forEach((button) => {
    button.addEventListener("click", () => {
      selectPrayer(button.dataset.novenaPrayer, true);
    });
  });

  modal.querySelectorAll("[data-novena-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("keydown", handleModalKeydown);
  launcher.addEventListener("click", () => openModal());

  if (campaignIsVisible) {
    launcher.hidden = false;
    const forceOpen = new URLSearchParams(window.location.search).get("novena") === "1";

    if (!hasSeen() || forceOpen) {
      window.setTimeout(() => openModal({ automatic: true }), 650);
    }
  }
})();
