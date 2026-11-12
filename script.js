let staff = [];
let series = [];

const loadCatalogData = async () => {
  try {
    const [staffRes, seriesRes] = await Promise.all([
      fetch("data/staff.json"),
      fetch("data/series-catalog.json"),
    ]);
    if (staffRes.ok) staff = await staffRes.json();
    if (seriesRes.ok) series = await seriesRes.json();
  } catch (err) {
    console.warn("Failed to load catalog data:", err.message);
  }
};


const staffGrid = document.querySelector("#staffGrid");
const seriesGrid = document.querySelector("#seriesGrid");
const librarySearch = document.querySelector("#librarySearch");
const filterChipsContainer = document.querySelector("#filterChips");
const statusChipsContainer = document.querySelector("#statusChips");
const searchClearBtn = document.querySelector("#searchClear");
const resultsCountEl = document.querySelector("#resultsCount");

let activeStatusFilter = "all";
let activeGenreFilter = "all";
let searchQuery = "";

const getInitials = (name) =>
  name
    .split(/\s|_/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const renderStaffAvatar = (member) => {
  const initials = getInitials(member.name);
  if (!member.avatar) {
    return `<div class="staff-fallback" aria-hidden="true">${initials}</div>`;
  }

  return `
    <div class="staff-fallback" aria-hidden="true">${initials}</div>
    <img src="${member.avatar}" alt="${member.name}" loading="lazy" onerror="this.onerror=null;this.remove();" />
  `;
};

// Clipboard copying micro-interaction
window.copyToClipboard = (text, element) => {
  navigator.clipboard.writeText(text).then(() => {
    const tooltip = element.querySelector(".copy-tooltip");
    if (tooltip) {
      tooltip.classList.add("is-visible");
      setTimeout(() => {
        tooltip.classList.remove("is-visible");
      }, 1500);
    }
  }).catch(err => {
    console.error("Clipboard copy failed:", err);
  });
};

const renderStaff = () => {
  if (!staffGrid) return;
  staffGrid.innerHTML = staff
    .map(
      (member) => `
        <article class="staff-card">
          ${renderStaffAvatar(member)}
          <div class="staff-info">
            <span class="staff-role">${member.role}</span>
            <h3>${member.name}</h3>
            <p>${member.bio}</p>
            <div class="staff-socials">
              <button class="staff-discord" onclick="copyToClipboard('${member.discord}', this)" aria-label="Copy Discord username ${member.discord}">
                <i data-lucide="message-square" aria-hidden="true"></i>
                <span>${member.discord}</span>
                <span class="copy-tooltip">Copied!</span>
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const renderSkeletons = () => {
  if (!staffGrid) return;
  staffGrid.innerHTML = Array(4).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-shimmer"></div>
      <div style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: flex-end;">
        <div class="skeleton-role"></div>
        <div class="skeleton-name"></div>
        <div class="skeleton-bio"></div>
        <div class="skeleton-bio short"></div>
      </div>
    </div>
  `).join("");
};

// Status Filter Chips Handler
const initStatusChips = () => {
  if (!statusChipsContainer) return;
  const buttons = statusChipsContainer.querySelectorAll(".filter-chip");
  buttons.forEach(btn => {
    btn.onclick = () => {
      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeStatusFilter = btn.dataset.status;
      renderSeries();
    };
  });
};

// Dynamic Genre Chips Generation
const renderFilterChips = () => {
  if (!filterChipsContainer) return;

  const genres = new Set();
  series.forEach(item => {
    if (item.excludeFromLibrary) return;
    if (item.genres) {
      item.genres.forEach(g => genres.add(g.trim()));
    }
  });

  let html = `
    <button class="filter-chip ${activeGenreFilter === 'all' ? 'is-active' : ''}" data-genre="all">All Genres</button>
  `;

  Array.from(genres).sort().forEach(genre => {
    const filterVal = genre.toLowerCase();
    html += `
      <button class="filter-chip ${activeGenreFilter === filterVal ? 'is-active' : ''}" data-genre="${filterVal}">${genre}</button>
    `;
  });

  filterChipsContainer.innerHTML = html;

  const newChips = filterChipsContainer.querySelectorAll(".filter-chip");
  newChips.forEach(chip => {
    chip.addEventListener("click", () => {
      newChips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeGenreFilter = chip.dataset.genre;
      renderSeries();
    });
  });
};

const buildPosterMarkup = (item, altText, extraAttrs = "") => {
  const isRemote = item.image.startsWith("http");
  if (isRemote) {
    return `<img src="${item.image}" alt="${altText}" loading="lazy" ${extraAttrs} />`;
  }
  const webpSrc = item.image.replace(/\.(jpg|png)$/, ".webp");
  return `
    <picture>
      <source srcset="${webpSrc}" type="image/webp">
      <img src="${item.image}" alt="${altText}" loading="lazy" width="${item.width || 300}" height="${item.height || 450}" ${extraAttrs} />
    </picture>
  `;
};

const renderSeries = () => {
  if (!seriesGrid) return;

  const totalVisible = series.filter(item => !item.excludeFromLibrary);

  const filtered = totalVisible.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      (item.synopsis && item.synopsis.toLowerCase().includes(q)) ||
      (item.genres && item.genres.some(g => g.toLowerCase().includes(q)));

    if (!matchesSearch) return false;

    // Status filter
    if (activeStatusFilter === "ongoing" && item.status.toLowerCase() !== "ongoing") return false;
    if (activeStatusFilter === "completed" && item.status.toLowerCase() !== "completed") return false;
    if (activeStatusFilter === "working-on" && !item.currentlyWorkingOn) return false;

    // Genre filter
    if (activeGenreFilter !== "all") {
      if (!item.genres || !item.genres.some(g => g.toLowerCase() === activeGenreFilter)) return false;
    }

    return true;
  });

  if (resultsCountEl) {
    if (searchQuery || activeStatusFilter !== "all" || activeGenreFilter !== "all") {
      resultsCountEl.textContent = `Showing ${filtered.length} of ${totalVisible.length} series`;
    } else {
      resultsCountEl.textContent = `${totalVisible.length} series in catalog`;
    }
  }

  if (filtered.length === 0) {
    seriesGrid.innerHTML = `
      <div class="no-results">
        <i data-lucide="book-x" aria-hidden="true"></i>
        <p>No scrolls match your cultivation criteria.</p>
        <button class="reset-filters-btn" id="resetFiltersBtn">Reset Filters</button>
      </div>
    `;
    const resetBtn = document.querySelector("#resetFiltersBtn");
    resetBtn?.addEventListener("click", () => {
      activeStatusFilter = "all";
      activeGenreFilter = "all";
      searchQuery = "";
      if (librarySearch) librarySearch.value = "";
      if (searchClearBtn) searchClearBtn.hidden = true;
      initStatusChips();
      renderFilterChips();
      renderSeries();
    });
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  seriesGrid.innerHTML = filtered.map(item => {
    const ratingMarkup = item.rating
      ? `<span class="series-rating-badge" title="TMDB Rating"><i data-lucide="star" aria-hidden="true"></i> ${Number(item.rating).toFixed(1)}</span>`
      : "";
    const workingBadge = item.currentlyWorkingOn
      ? `<span class="series-working-badge" title="${item.workingOnNote || 'Active translation'}"><i data-lucide="sparkles" aria-hidden="true"></i> ${item.workingOnNote || 'Shridhuu Subs'}</span>`
      : "";
    const statusClass = item.status.toLowerCase() === "ongoing" ? "status-ongoing" : "status-completed";

    return `
      <a class="series-card" href="series-${item.id}.html" data-id="${item.id}" aria-label="View details for ${item.name}">
        <div class="series-card-media">
          ${buildPosterMarkup(item, `${item.name} Poster`)}
        </div>
        <div class="series-card-badges">
          <span class="series-status-pill ${statusClass}">${item.status}</span>
          ${ratingMarkup}
        </div>
        ${workingBadge}
        <div class="series-card-info">
          <h3>${item.name}</h3>
          ${item.episodes ? `<span class="series-episodes-pill">${item.episodes}</span>` : ""}
        </div>
      </a>
    `;
  }).join("");

  document.querySelectorAll(".series-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      openModal(card.dataset.id);
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

// Modal handlers
const seriesModal = document.querySelector("#seriesModal");
const modalContent = document.querySelector("#modalContent");
const modalClose = document.querySelector("#modalClose");
let previouslyFocusedElement = null;

const openModal = (id) => {
  const item = series.find(s => s.id === id);
  if (!item || !seriesModal || !modalContent) return;

  previouslyFocusedElement = document.activeElement;

  modalContent.innerHTML = `
    <div class="modal-body">
      <div class="modal-media">
        ${buildPosterMarkup(item, item.name)}
      </div>
      <div class="modal-info">
        <h2>${item.name}</h2>
        ${item.nativeName ? `<p class="modal-native-name">${item.nativeName}</p>` : ""}
        <div class="modal-meta-row">
          <span class="modal-badge status-${item.status.toLowerCase()}">${item.status}</span>
          ${item.year ? `<span class="modal-year">${item.year}</span>` : ""}
          <span class="modal-episodes"><strong>Episodes:</strong> ${item.episodes}</span>
          ${item.rating ? `<span class="modal-rating"><i data-lucide="star" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px; fill: var(--highlight); color: var(--highlight);"></i><strong>${item.rating.toFixed(1)}</strong>/10${item.voteCount ? ` <span class="modal-vote-count">(${item.voteCount.toLocaleString()} votes)</span>` : ""}</span>` : ""}
        </div>
        ${(item.lastEpisode || item.nextEpisode) ? `
        <div class="modal-airing-status">
          ${item.lastEpisode ? `<p class="modal-episode-line"><i data-lucide="check-circle" aria-hidden="true"></i> Episode ${item.lastEpisode.episode_number} aired ${new Date(item.lastEpisode.air_date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>` : ""}
          ${item.nextEpisode ? `<p class="modal-episode-line modal-next-episode"><i data-lucide="calendar" aria-hidden="true"></i> Episode ${item.nextEpisode.episode_number} airs ${new Date(item.nextEpisode.air_date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>` : ""}
        </div>` : ""}
        <p class="modal-synopsis">${item.synopsis}</p>
        <div class="modal-genres">
          ${item.genres.map(g => `<span class="genre-tag">${g}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  seriesModal.classList.add("is-visible");
  seriesModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalClose?.focus();
  seriesModal.addEventListener("keydown", handleModalKeydown);

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const closeModal = () => {
  if (!seriesModal) return;
  seriesModal.classList.remove("is-visible");
  seriesModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  seriesModal.removeEventListener("keydown", handleModalKeydown);

  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
};

const handleModalKeydown = (e) => {
  if (e.key === "Escape") {
    closeModal();
    return;
  }

  if (e.key === "Tab") {
    const focusableElements = seriesModal.querySelectorAll('button, [tabindex="0"]');
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
};

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}
if (seriesModal) {
  seriesModal.addEventListener("click", (e) => {
    if (e.target === seriesModal) {
      closeModal();
    }
  });
}

// Mobile nav toggle
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("is-open");
    if (isOpen) {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = `<i data-lucide="menu" aria-hidden="true"></i>`;
    } else {
      navMenu.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.innerHTML = `<i data-lucide="x" aria-hidden="true"></i>`;
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const navMenuLinks = navMenu.querySelectorAll(".nav-links a");
  navMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = `<i data-lucide="menu" aria-hidden="true"></i>`;
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    });
  });
}

// Floating Discord CTA and back to top visibility
const floatingDiscordCta = document.querySelector("#floatingDiscordCta");

window.addEventListener("scroll", () => {
  if (floatingDiscordCta) {
    if (window.scrollY > 500) {
      floatingDiscordCta.classList.add("is-visible");
    } else {
      floatingDiscordCta.classList.remove("is-visible");
    }
  }
});



// Library search and keyboard shortcut
if (librarySearch) {
  librarySearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchClearBtn) {
      searchClearBtn.hidden = !searchQuery;
    }
    renderSeries();
  });

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      librarySearch.value = "";
      searchQuery = "";
      searchClearBtn.hidden = true;
      librarySearch.focus();
      renderSeries();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== librarySearch && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      librarySearch.focus();
      librarySearch.select();
    } else if (e.key === "Escape" && document.activeElement === librarySearch) {
      librarySearch.blur();
    }
  });
}


// Hero Video Programmatic Autoplay based on network speed and data saver
const initHeroVideo = () => {
  const heroVideo = document.querySelector("#heroVideo");
  if (!heroVideo) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = connection && (connection.saveData || ["slow-2g", "2g", "3g"].includes(connection.effectiveType));

  if (!isReducedMotion && !isSlowConnection) {
    const source = heroVideo.querySelector("source");
    if (source) {
      source.src = source.dataset.src;
      heroVideo.load();
      heroVideo.play().catch(err => console.log("Video autoplay blocked:", err));
    }
  } else {
    heroVideo.style.display = "none";
  }
};

// Load TMDB Local merged JSON database
const loadTMDBData = async () => {
  try {
    const res = await fetch('data/series.json');
    if (!res.ok) throw new Error('Static series.json not found.');
    const tmdbData = await res.json();

    series.forEach(item => {
      const tmdbInfo = tmdbData[item.id];
      if (tmdbInfo) {
        if (tmdbInfo.rating) item.rating = tmdbInfo.rating;
        if (tmdbInfo.episodes) item.episodes = tmdbInfo.episodes;
        if (item.status !== 'Completed') {
          if (tmdbInfo.status && ['Ended', 'Canceled'].includes(tmdbInfo.status)) {
            item.status = 'Completed';
          }
        }
        if (tmdbInfo.poster_path && tmdbInfo.poster_path.startsWith('http') && tmdbInfo.use_tmdb_poster) {
          item.image = tmdbInfo.poster_path;
        }
        if (tmdbInfo.overview && tmdbInfo.use_tmdb_synopsis) {
          item.synopsis = tmdbInfo.overview;
        }
        if (tmdbInfo.genres && tmdbInfo.genres.length > 0) item.genres = tmdbInfo.genres;
        if (tmdbInfo.vote_count) item.voteCount = tmdbInfo.vote_count;
        if (tmdbInfo.first_air_date) item.year = tmdbInfo.first_air_date.slice(0, 4);
        if (tmdbInfo.original_name && tmdbInfo.original_name !== item.name) item.nativeName = tmdbInfo.original_name;
        if (tmdbInfo.last_episode) item.lastEpisode = tmdbInfo.last_episode;
        if (tmdbInfo.next_episode) item.nextEpisode = tmdbInfo.next_episode;
      }
    });
  } catch (err) {
    console.warn('Using curated local fallback series data:', err.message);
  } finally {
    initStatusChips();
    renderFilterChips();
    renderSeries();
  }
};

// Initialise
(async () => {
  renderSkeletons();
  await loadCatalogData();
  await loadTMDBData();
  renderStaff();
  initHeroVideo();
  await loadSchedule();
})();

const faqDetails = document.querySelectorAll(".faq-list details");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finishFaqAnimation = (detail) => {
  detail.style.height = "";
  detail.dataset.animating = "false";
  detail.classList.remove("is-animating", "is-closing");
};

const openFaqDetail = (detail) => {
  const startHeight = detail.offsetHeight;

  detail.dataset.animating = "true";
  detail.classList.add("is-animating");
  detail.style.height = `${startHeight}px`;
  detail.open = true;

  window.requestAnimationFrame(() => {
    detail.style.height = `${detail.scrollHeight}px`;
  });

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== "height") {
      return;
    }

    finishFaqAnimation(detail);
    detail.removeEventListener("transitionend", handleTransitionEnd);
  };

  detail.addEventListener("transitionend", handleTransitionEnd);
};

const closeFaqDetail = (detail) => {
  const summary = detail.querySelector("summary");
  const endHeight = summary ? summary.offsetHeight : 0;

  detail.dataset.animating = "true";
  detail.classList.add("is-animating", "is-closing");
  detail.style.height = `${detail.offsetHeight}px`;

  window.requestAnimationFrame(() => {
    detail.style.height = `${endHeight}px`;
  });

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== "height") {
      return;
    }

    detail.open = false;
    finishFaqAnimation(detail);
    detail.removeEventListener("transitionend", handleTransitionEnd);
  };

  detail.addEventListener("transitionend", handleTransitionEnd);
};

if (!prefersReducedMotion) {
  faqDetails.forEach((detail) => {
    const summary = detail.querySelector("summary");

    summary?.addEventListener("click", (event) => {
      event.preventDefault();

      if (detail.dataset.animating === "true") {
        return;
      }

      if (detail.open) {
        closeFaqDetail(detail);
      } else {
        openFaqDetail(detail);
      }
    });
  });
}

// Interactive Realm Codex Accordion (Symmetrical Reduced Motion Support)
const realmTiers = document.querySelectorAll(".realm-tier");
const prefersReducedMotionRealms = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

realmTiers.forEach((tier) => {
  const header = tier.querySelector(".realm-tier-header");
  const details = tier.querySelector(".realm-tier-details");

  header?.addEventListener("click", () => {
    const isActive = tier.classList.contains("is-active");

    // Close all other tiers
    realmTiers.forEach((otherTier) => {
      if (otherTier !== tier && otherTier.classList.contains("is-active")) {
        otherTier.classList.remove("is-active");
        const otherDetails = otherTier.querySelector(".realm-tier-details");
        if (otherDetails) {
          if (prefersReducedMotionRealms) {
            otherDetails.style.transition = "none";
          }
          otherDetails.style.height = "0px";
        }
      }
    });

    // Toggle current tier
    if (isActive) {
      tier.classList.remove("is-active");
      if (details) {
        if (prefersReducedMotionRealms) {
          details.style.transition = "none";
        }
        details.style.height = "0px";
      }
    } else {
      tier.classList.add("is-active");
      if (details) {
        if (prefersReducedMotionRealms) {
          details.style.transition = "none";
          details.style.height = "auto";
        } else {
          details.style.transition = "";
          details.style.height = `${details.scrollHeight}px`;
        }
      }
    }
  });
});

// Back to Top Button
const backToTopBtn = document.querySelector("#backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}

window.copyUsername = (text, el) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const badge = el.querySelector('.copy-badge');
      if (badge) {
        const originalHTML = badge.innerHTML;
        badge.innerHTML = '<span class="copied-indicator">Copied!</span>';
        setTimeout(() => {
          badge.innerHTML = originalHTML;
          if (window.lucide) window.lucide.createIcons();
        }, 1500);
      }
    }).catch(err => {
      console.warn('Could not copy text: ', err);
    });
  }
};

// ---- Schedule Engine ----
const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "nonweekly", "tentative"];
const DAY_LABELS = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday",
  friday: "Friday", saturday: "Saturday", sunday: "Sunday",
  nonweekly: "Non-Weekly", tentative: "Tentative"
};

let scheduleData = [];
let activeDay = "monday";
let countdownInterval = null;

const updateTimezoneBadge = () => {
  const tzEl = document.querySelector("#detectedTz");
  const userTzEl = document.querySelector("#userTimezone");
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const now = new Date();
    const offsetMin = -now.getTimezoneOffset();
    const sign = offsetMin >= 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offsetMin) / 60);
    const mins = Math.abs(offsetMin) % 60;
    const offsetStr = `UTC${sign}${hours}${mins ? ":" + String(mins).padStart(2, "0") : ""}`;
    const cleanTz = tz.replace(/_/g, " ");
    const text = `${cleanTz} (${offsetStr})`;
    if (tzEl) tzEl.textContent = text;
    if (userTzEl) userTzEl.textContent = text;
  } catch (err) {
    if (tzEl) tzEl.textContent = "Local Time";
    if (userTzEl) userTzEl.textContent = "Local Time";
  }
};

const getNextOccurrence = (day, timeUTC) => {
  if (!timeUTC) return null;
  const [h, m] = timeUTC.split(":").map(Number);
  const now = new Date();

  if (day === "nonweekly" || day === "tentative") return null;

  const dayIndex = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(day);
  const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h, m, 0));
  let diffDays = dayIndex - now.getUTCDay();
  if (diffDays < 0) diffDays += 7;
  target.setUTCDate(target.getUTCDate() + diffDays);

  const GRACE_MS = 6 * 60 * 60 * 1000; // treat "just released" as still relevant for 6h
  if (target.getTime() < now.getTime() - GRACE_MS) {
    target.setUTCDate(target.getUTCDate() + 7);
  }
  return target;
};

const formatCountdown = (target) => {
  if (!target) return null;
  const diff = target.getTime() - Date.now();
  const abs = Math.abs(diff);
  const totalSeconds = Math.floor(abs / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const label = d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m ${s}s`;
  return diff <= 0 ? `Aired ${label} ago` : `Airs in ${label}`;
};

const formatLocalTime = (day, timeUTC) => {
  const target = getNextOccurrence(day, timeUTC);
  if (!target) return "";
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short"
  }).format(target);
};

const renderDayTabs = () => {
  const tabsEl = document.querySelector("#dayTabs");
  if (!tabsEl) return;
  const activeDays = DAY_ORDER.filter(d => scheduleData.some(item => item.day === d));

  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const todayName = dayNames[new Date().getDay()];

  tabsEl.innerHTML = activeDays.map(day => {
    const isSelected = day === activeDay;
    const isToday = day === todayName;
    const count = scheduleData.filter(item => item.day === day).length;
    const isRest = day === "wednesday" && scheduleData.some(item => item.day === day && item.showId === "shridhuu-needs-rest");

    return `
      <button class="day-tab ${isSelected ? "is-active" : ""} ${isToday ? "is-today" : ""}" role="tab" aria-selected="${isSelected}" data-day="${day}">
        <span class="day-tab-name">${DAY_LABELS[day]}</span>
        ${isToday ? '<span class="day-today-badge">Today</span>' : ''}
        ${isRest ? '<span class="day-count-badge is-rest">Rest</span>' : `<span class="day-count-badge">${count}</span>`}
      </button>
    `;
  }).join("");

  tabsEl.querySelectorAll(".day-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeDay = btn.dataset.day;
      renderDayTabs();
      renderScheduleGrid();
    });
  });
};

const renderScheduleGrid = () => {
  const gridEl = document.querySelector("#scheduleGrid");
  const emptyEl = document.querySelector("#scheduleEmpty");
  if (!gridEl) return;

  const dayItems = scheduleData.filter(item => item.day === activeDay);
  if (emptyEl) emptyEl.style.display = dayItems.length > 0 ? "none" : "flex";

  gridEl.innerHTML = dayItems.map(item => {
    const show = series.find(s => s.id === item.showId);
    if (!show) return "";
    const target = getNextOccurrence(item.day, item.releaseTimeUTC);
    const localTime = formatLocalTime(item.day, item.releaseTimeUTC);

    const isCompleted = show.status === "Completed";
    const isRest = show.id === "shridhuu-needs-rest";

    let countdownMarkup = "";
    if (isCompleted) {
      countdownMarkup = `<span class="countdown-badge is-completed"><i data-lucide="check-circle" aria-hidden="true"></i> Completed Series</span>`;
    } else if (isRest) {
      countdownMarkup = `<span class="countdown-badge is-rest"><i data-lucide="coffee" aria-hidden="true"></i> Seclusion &amp; Rest</span>`;
    } else if (target) {
      const countdownText = formatCountdown(target) || "Scheduled";
      const diff = target.getTime() - Date.now();
      const statusClass = diff <= 0 ? "is-aired" : (diff < 6 * 3600 * 1000 ? "is-imminent" : "is-upcoming");
      const iconName = diff <= 0 ? "check" : (diff < 6 * 3600 * 1000 ? "zap" : "clock");
      countdownMarkup = `
        <span class="countdown-badge ${statusClass}" data-target="${target.toISOString()}">
          <i data-lucide="${iconName}" aria-hidden="true"></i>
          <span class="countdown-text">${countdownText}</span>
        </span>
      `;
    }

    return `
      <article class="schedule-card ${isRest ? 'is-rest-card' : ''}">
        <div class="schedule-card-header">
          <span class="schedule-group"><i data-lucide="shield" aria-hidden="true"></i> ${item.group}</span>
          ${localTime ? `<span class="schedule-time"><i data-lucide="clock-3" aria-hidden="true"></i> ${localTime}</span>` : ""}
        </div>
        <div class="schedule-card-body">
          <img src="${show.image}" alt="${show.name}" loading="lazy" class="schedule-thumb" />
          <div class="schedule-card-main">
            ${isRest ? `
              <h3 class="copiable-username" onclick="copyUsername('Shridhuu', this)">
                @Shridhuu Needs Rest
                <span class="copy-badge" title="Copy username">
                  <i data-lucide="copy" aria-hidden="true"></i>
                </span>
              </h3>
            ` : `
              <h3><a href="series-${show.id}.html">${show.name}</a></h3>
            `}
            ${show.nativeName ? `<p class="schedule-native-name">${show.nativeName}</p>` : ""}
            ${countdownMarkup}
          </div>
        </div>
        ${item.note ? `<div class="schedule-note"><i data-lucide="info" aria-hidden="true"></i> <span>${item.note}</span></div>` : ""}
        <div class="schedule-tags">
          ${isCompleted ? '<span class="schedule-tag tag-completed">Completed</span>' : ''}
          ${item.tags.filter(t => t.toLowerCase() !== 'weekly' || !isCompleted).map(t => `<span class="schedule-tag">${t}</span>`).join("")}
        </div>
      </article>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
};

const startCountdownTicker = () => {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    document.querySelectorAll(".countdown-badge[data-target]").forEach(el => {
      const iso = el.dataset.target;
      if (!iso) return;
      const target = new Date(iso);
      const textEl = el.querySelector(".countdown-text");
      if (textEl) {
        textEl.textContent = formatCountdown(target);
      }
      const diff = target.getTime() - Date.now();
      el.classList.toggle("is-aired", diff <= 0);
      el.classList.toggle("is-imminent", diff > 0 && diff < 6 * 3600 * 1000);
      el.classList.toggle("is-upcoming", diff >= 6 * 3600 * 1000);
    });
  }, 1000);
};

const loadSchedule = async () => {
  try {
    const res = await fetch("data/schedule.json");
    if (!res.ok) throw new Error("schedule.json not found");
    scheduleData = await res.json();

    updateTimezoneBadge();

    // Auto-select current day of week if active days have schedule entries
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDayName = dayNames[new Date().getDay()];
    if (scheduleData.some(item => item.day === currentDayName)) {
      activeDay = currentDayName;
    } else {
      const firstActive = DAY_ORDER.find(d => scheduleData.some(item => item.day === d));
      if (firstActive) activeDay = firstActive;
    }

    renderDayTabs();
    renderScheduleGrid();
    startCountdownTicker();
  } catch (err) {
    console.warn("Schedule data unavailable:", err);
  }
};



