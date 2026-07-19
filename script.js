const staff = [
  {
    name: "Temper",
    role: "Owner",
    bio: "Owner of Donghua Central, helping lead the server and keep subtitle releases moving for the community.",
    avatar:
      "https://cdn.discordapp.com/avatars/1043082788452184064/6eeb22dcb769a59702420b03c0306d58.png?size=4096",
    discord: "@tempershot7"
  },
  {
    name: "Shridhuu",
    role: "Developer - Royal Celestial Ancestor - Donghua Archivist",
    bio: "Developer, subtitle maker, and archivist helping shape Donghua Central's releases, website, and community experience.",
    avatar:
      "https://cdn.discordapp.com/avatars/1403304956924264468/d515bf2e9603eec7313ada4f5f9ce49d.png?size=512",
    discord: "@Shridhuu"
  },
  {
    name: "Shayne",
    role: "Grand Elder - Council of the Nine Heavens",
    bio: "Grand Elder and head developer of Nine Heavens, building the cultivation systems that make the server feel alive.",
    avatar:
      "https://cdn.discordapp.com/avatars/922769233950179340/a2694342ef0695505e92c3962fd0545c.png?size=512",
    discord: "@shayne_rok"
  },
  {
    name: "Divine Extinction",
    role: "Grand Elder",
    bio: "Enforcement Elder and long-time donghua and novel fan who guides deeper discussions while keeping the realm civil.",
    avatar:
      "https://cdn.discordapp.com/avatars/428902045181804566/093599cef7ca899e11549437b43f4b65.png?size=512",
    discord: "@divine_extinction"
  },
  {
    name: "Daksha",
    role: "Imperial Inspector",
    bio: "Imperial Inspector overseeing server operations and staff conduct so Donghua Central stays fair, organized, and welcoming.",
    avatar:
      "https://cdn.discordapp.com/avatars/863085379850207302/73df16a8d4f385410cdccbeeb58772a0.png?size=512",
    discord: "@Daksha"
  },
  {
    name: "Sheng Tian Yue",
    role: "Grand Elder",
    bio: "Grand Elder, donghua enjoyer, and active discussion voice who debates, recommends, and helps wherever needed.",
    avatar:
      "https://cdn.discordapp.com/avatars/550972666471907340/1c7c55982aa87ded49b073eb8fbc3466.png?size=512",
    discord: "@shengtianyue"
  },
  {
    name: "gawwwwwwwdddd",
    role: "Elder Developer of NH Game",
    bio: "Elder Developer focused on Nine Heavens features, gameplay improvements, and the growth of Donghua Central's interactive side.",
    avatar:
      "https://cdn.discordapp.com/avatars/406382478102626314/28da68f98c5cda5e2e4a2a47340273ba.png?size=512",
    discord: "@gawwwwwwwdddd"
  },
  {
    name: "Blue",
    role: "Nine Heavens Development",
    bio: "Supports Nine Heavens development and stays active in the community, helping the project and server continue to improve.",
    avatar:
      "https://cdn.discordapp.com/avatars/768703559231340544/700fdcbf50bdeccddd6989b5a5132e15.png?size=512",
    discord: "@blue"
  },
  {
    name: "AG_TouSen",
    role: "Grand Elder",
    bio: "Grand Elder currently in seclusion, guiding cultivators through donghua, novels, updates, discussions, and Nine Heavens rankings.",
    avatar:
      "https://cdn.discordapp.com/avatars/1419545987583836180/c139ce8ba4bdc63c2950f012aec37aef.png?size=4096",
    discord: "@ag_tuosen"
  },
  {
    name: "Noir",
    role: "Grand Elder",
    bio: "Donghua and anime lover, fanfic writer, and helpful community elder supporting discussions, reactor channels, and the Artistic Domain.",
    avatar:
      "https://cdn.discordapp.com/avatars/713438739296288779/4e8bc3183cfb9ec04a0aeaafe0ee6875.png?size=4096",
    discord: "@noir"
  },
  {
    name: "Chappelet",
    role: "Grand Elder - Nianfan Hater",
    bio: "Grand Elder who recommends overlooked donghua, pushes for broader genres, and supports reactor-friendly discovery in the community.",
    avatar:
      "https://cdn.discordapp.com/avatars/487735963913551874/4511a7a5a75ee54acb306a0e04999703.png?size=512",
    discord: "@chappelet"
  },
  {
    name: "KoriWave",
    role: "Freeloader - Grand Elder",
    bio: "Grand Elder who keeps the mood light, shares donghua shots, and helps Donghua Central feel casual, open, and welcoming.",
    avatar: "https://cdn.discordapp.com/avatars/606657480511979521/f601d890821504b0d4408c2f9c634368.png?size=512",
    discord: "@koriwave"
  },
];

const series = [
  {
    id: "perfect-world",
    name: "Perfect World",
    image: "assets/shows/Perfect World.jpg",
    width: 1908,
    height: 1080,
    status: "Ongoing",
    episodes: "170+",
    genres: ["Cultivation", "Action", "Fantasy"],
    synopsis: "Shi Hao, a born genius from a ruined clan, climbs the path of cultivation to uncover deep secrets of the universe while fighting off enemies in a vast, dangerous world."
  },
  {
    id: "renegade-immortal",
    name: "Renegade Immortal",
    image: "assets/shows/Renegade Immortal.jpg",
    width: 594,
    height: 336,
    status: "Ongoing",
    episodes: "90+",
    genres: ["Cultivation", "Action", "Dark Fantasy"],
    synopsis: "Wang Lin, mocked for his lack of talent, acquires a mysterious bead. With iron resolve, he walks a bloody path to ascendancy and protect what remains of his soul."
  },
  {
    id: "mortal-journey",
    name: "A Record of a Mortal's Journey to Immortality",
    image: "assets/shows/A Record's of mortal journey to Immortallity.jpg",
    width: 500,
    height: 667,
    status: "Ongoing",
    episodes: "110+",
    genres: ["Cultivation", "Adventure", "Fantasy"],
    synopsis: "Han Li, an ordinary mortal with no initial cultivation talent, navigates the dangerous, self-serving world of cultivation using caution, wit, and a mysterious green bottle."
  },
  {
    id: "slay-the-gods",
    name: "Slay The Gods",
    image: "assets/shows/Slay The Gods.png",
    width: 400,
    height: 561,
    status: "Ongoing",
    episodes: "40+",
    genres: ["Action", "Modern Fantasy", "Supernatural"],
    synopsis: "In a world threatened by mysterious mythological entities, a blind boy named Lin Qiye obtains divine vision and fire to lead a secret defense unit of humanity."
  },
  {
    id: "beyond-times-gaze",
    name: "Beyond Time's Gaze",
    image: "assets/shows/Beyond Time's Gaze.jpg",
    width: 3840,
    height: 2160,
    status: "Ongoing",
    episodes: "30+",
    genres: ["Cultivation", "Mystery", "Fantasy"],
    synopsis: "Xu Qing lives in a world corrupted by the gaze of an ancient god. Desperate to survive, he uses stealth, poison, and a shadow artifact to hunt beasts and rise through the ranks."
  },
  {
    id: "blades-guardians",
    name: "Blades of the Guardians",
    image: "assets/shows/Blades of the Guardians.png",
    width: 1054,
    height: 1492,
    status: "Completed",
    episodes: "14",
    genres: ["Action", "Historical", "Martial Arts"],
    synopsis: "Dao Ma, a powerful mercenary indebted to the court, escorts a mysterious traveler to the capital Chang'an, facing lethal martial experts and political schemes along the way."
  },
  {
    id: "good-day-to-ascend",
    name: "A Good Day to Ascend",
    image: "assets/shows/A Good Day to Ascend.png",
    width: 1024,
    height: 1024,
    status: "Ongoing",
    episodes: "1+",
    genres: ["Cultivation", "Action", "Fantasy"],
    synopsis: "A young man finds himself crossing paths with bizarre cultivators and ascension tribulations. Armed with quick wit and luck, he navigates the journey of becoming immortal."
  },
  {
    id: "sword-of-coming",
    name: "Sword of Coming",
    image: "assets/shows/Sword of Coming.png",
    width: 1024,
    height: 1024,
    status: "Ongoing",
    episodes: "1+",
    genres: ["Cultivation", "Action", "Fantasy"],
    synopsis: "A young orphan boy from a mysterious small town acquires magical swords and sets out on a legendary cultivation journey to protect his loved ones and seek the Dao."
  },
  {
    id: "ever-night",
    name: "Ever Night",
    image: "assets/shows/Ever Night.png",
    width: 1024,
    height: 1024,
    status: "Ongoing",
    episodes: "1+",
    genres: ["Cultivation", "Action", "Drama"],
    synopsis: "Ning Que fights to protect his maid and friend Sang Sang, navigating the dark cultivation world as prophecy warns of the eternal night and total destruction."
  },
  {
    id: "demon-hunter",
    name: "The Demon Hunter",
    image: "assets/shows/The Demon Hunter.png",
    width: 1024,
    height: 1024,
    status: "Ongoing",
    episodes: "1+",
    genres: ["Cultivation", "Action", "Fantasy"],
    synopsis: "Meng Chuan vows to avenge his mother and protect humanity from invading demons, training his blade and cultivating power to hunt demons and defend his home."
  }
];

const staffGrid = document.querySelector("#staffGrid");
const seriesGrid = document.querySelector("#seriesGrid");
const librarySearch = document.querySelector("#librarySearch");
const filterChipsContainer = document.querySelector("#filterChips");

let activeFilter = "all";
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
    <img src="${member.avatar}" alt="${member.name}" loading="lazy" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='grid';" />
    <div class="staff-fallback" style="display: none;" aria-hidden="true">${initials}</div>
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

// Dynamic Genre Chips Generation
const renderFilterChips = () => {
  if (!filterChipsContainer) return;

  const genres = new Set();
  series.forEach(item => {
    if (item.genres) {
      item.genres.forEach(g => genres.add(g.trim()));
    }
  });

  let html = `
    <button class="filter-chip ${activeFilter === 'all' ? 'is-active' : ''}" data-filter="all">All</button>
    <button class="filter-chip ${activeFilter === 'ongoing' ? 'is-active' : ''}" data-filter="ongoing">Ongoing</button>
    <button class="filter-chip ${activeFilter === 'completed' ? 'is-active' : ''}" data-filter="completed">Completed</button>
  `;

  Array.from(genres).sort().forEach(genre => {
    const filterVal = genre.toLowerCase();
    html += `
      <button class="filter-chip ${activeFilter === filterVal ? 'is-active' : ''}" data-filter="${filterVal}">${genre}</button>
    `;
  });

  filterChipsContainer.innerHTML = html;

  const newChips = filterChipsContainer.querySelectorAll(".filter-chip");
  newChips.forEach(chip => {
    chip.addEventListener("click", () => {
      newChips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeFilter = chip.dataset.filter;
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
      <img src="${item.image}" alt="${altText}" loading="lazy" width="${item.width}" height="${item.height}" ${extraAttrs} />
    </picture>
  `;
};

const renderSeries = () => {
  if (!seriesGrid) return;

  const filtered = series.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
      item.synopsis.toLowerCase().includes(searchQuery);

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "ongoing" || activeFilter === "completed") {
      return matchesSearch && item.status.toLowerCase() === activeFilter;
    }
    return matchesSearch && item.genres.some(g => g.toLowerCase() === activeFilter);
  });

  if (filtered.length === 0) {
    seriesGrid.innerHTML = `
      <div class="no-results">
        <i data-lucide="alert-circle" aria-hidden="true"></i>
        <p>No series found matching your criteria.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  seriesGrid.innerHTML = filtered.map(item => {
    return `
      <article class="series-card" data-id="${item.id}" role="button" tabindex="0" aria-label="View details for ${item.name}">
        <div class="series-card-media">
          ${buildPosterMarkup(item, `${item.name} Poster`)}
        </div>
        <span>${item.status}</span>
        <h3>${item.name}</h3>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".series-card").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.id);
      }
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

// Scrollspy Observer
const spyLinks = document.querySelectorAll(".nav-links a");
const spySections = [
  document.querySelector(".hero-section"),
  document.querySelector("#library"),
  document.querySelector("#schedule"),
  document.querySelector("#subtitles"),
  document.querySelector("#nine-heavens"),
  document.querySelector("#staff"),
  document.querySelector("#faq")
].filter(Boolean);

const spyObserverOptions = {
  root: null,
  rootMargin: "-25% 0px -55% 0px",
  threshold: 0
};

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let id = entry.target.id;
      if (entry.target.classList.contains("hero-section")) {
        id = "top";
      }

      spyLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${id}`) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }
  });
}, spyObserverOptions);

spySections.forEach(sec => spyObserver.observe(sec));

// Library filter text action
if (librarySearch) {
  librarySearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderSeries();
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
        if (tmdbInfo.status) item.status = ['Ended', 'Canceled'].includes(tmdbInfo.status) ? 'Completed' : 'Ongoing';
        if (tmdbInfo.poster_path && tmdbInfo.poster_path.startsWith('http') && tmdbInfo.use_tmdb_poster) {
          item.image = tmdbInfo.poster_path;
        }
        if (tmdbInfo.overview && tmdbInfo.use_tmdb_synopsis) {
          item.synopsis = tmdbInfo.overview;
        }
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
    renderFilterChips();
    renderSeries();
  }
};

// Initialise
loadTMDBData();
renderSkeletons();
setTimeout(renderStaff, 600);
initHeroVideo();

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

// ---- Schedule ----
const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "nonweekly", "tentative"];
const DAY_LABELS = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday",
  friday: "Friday", saturday: "Saturday", sunday: "Sunday",
  nonweekly: "Non-Weekly", tentative: "Tentative"
};

let scheduleData = [];
let activeDay = "monday";
let countdownInterval = null;

const getNextOccurrence = (day, timeUTC) => {
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
  return diff <= 0 ? `Released ${label} ago` : `Releasing in ${label}`;
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
  tabsEl.innerHTML = activeDays.map(day => `
    <button class="day-tab ${day === activeDay ? "is-active" : ""}" role="tab" aria-selected="${day === activeDay}" data-day="${day}">
      ${DAY_LABELS[day]}
    </button>
  `).join("");

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
  emptyEl.hidden = dayItems.length > 0;

  gridEl.innerHTML = dayItems.map(item => {
    const show = series.find(s => s.id === item.showId);
    if (!show) return "";
    const target = getNextOccurrence(item.day, item.releaseTimeUTC);
    const localTime = formatLocalTime(item.day, item.releaseTimeUTC);

    return `
      <article class="schedule-card">
        <div class="schedule-card-header">
          <span class="schedule-group">[${item.group}]</span>
          ${localTime ? `<span class="schedule-time">${localTime}</span>` : ""}
        </div>
        <div class="schedule-card-body">
          <img src="${show.image}" alt="${show.name}" loading="lazy" class="schedule-thumb" />
          <div>
            <h3>${show.name}</h3>
            ${show.nativeName ? `<p class="schedule-native-name">${show.nativeName}</p>` : ""}
            <p class="schedule-countdown" data-target="${target ? target.toISOString() : ""}">
              ${formatCountdown(target) || "Schedule TBA"}
            </p>
          </div>
        </div>
        ${item.note ? `<p class="schedule-note"><i data-lucide="info" aria-hidden="true"></i> ${item.note}</p>` : ""}
        <div class="schedule-tags">
          ${item.tags.map(t => `<span class="schedule-tag">${t}</span>`).join("")}
        </div>
      </article>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
};

const startCountdownTicker = () => {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    document.querySelectorAll(".schedule-countdown").forEach(el => {
      const iso = el.dataset.target;
      if (!iso) return;
      el.textContent = formatCountdown(new Date(iso));
    });
  }, 1000);
};

const loadSchedule = async () => {
  try {
    const res = await fetch("data/schedule.json");
    if (!res.ok) throw new Error("schedule.json not found");
    scheduleData = await res.json();
    
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

loadSchedule();

