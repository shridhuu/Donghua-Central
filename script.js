const staff = [
  {
    name: "Temper",
    role: "Owner",
    bio: "Owner of Donghua Central, helping lead the server and keep subtitle releases moving for the community.",
    avatar:
      "https://cdn.discordapp.com/avatars/1043082788452184064/6eeb22dcb769a59702420b03c0306d58.png?size=4096",
  },
  {
    name: "Shridhuu",
    role: "Developer - Royal Celestial Ancestor - Donghua Archivist",
    bio: "Developer, subtitle maker, and archivist helping shape Donghua Central's releases, website, and community experience.",
    avatar:
      "https://cdn.discordapp.com/avatars/1403304956924264468/d515bf2e9603eec7313ada4f5f9ce49d.png?size=512",
  },
  {
    name: "Shayne",
    role: "Grand Elder - Council of the Nine Heavens",
    bio: "Grand Elder and head developer of Nine Heavens, building the cultivation systems that make the server feel alive.",
    avatar:
      "https://cdn.discordapp.com/avatars/922769233950179340/a2694342ef0695505e92c3962fd0545c.png?size=512",
  },
  {
    name: "Divine Extinction",
    role: "Grand Elder",
    bio: "Enforcement Elder and long-time donghua and novel fan who guides deeper discussions while keeping the realm civil.",
    avatar:
      "https://cdn.discordapp.com/avatars/428902045181804566/093599cef7ca899e11549437b43f4b65.png?size=512",
  },
  {
    name: "Daksha",
    role: "Imperial Inspector",
    bio: "Imperial Inspector overseeing server operations and staff conduct so Donghua Central stays fair, organized, and welcoming.",
    avatar:
      "https://cdn.discordapp.com/avatars/863085379850207302/73df16a8d4f385410cdccbeeb58772a0.png?size=512",
  },
  {
    name: "Sheng Tian Yue",
    role: "Grand Elder",
    bio: "Grand Elder, donghua enjoyer, and active discussion voice who debates, recommends, and helps wherever needed.",
    avatar:
      "https://cdn.discordapp.com/avatars/550972666471907340/1c7c55982aa87ded49b073eb8fbc3466.png?size=512",
  },
  {
    name: "gawwwwwwwdddd",
    role: "Elder Developer of NH Game",
    bio: "Elder Developer focused on Nine Heavens features, gameplay improvements, and the growth of Donghua Central's interactive side.",
    avatar:
      "https://cdn.discordapp.com/avatars/406382478102626314/28da68f98c5cda5e2e4a2a47340273ba.png?size=512",
  },
  {
    name: "Blue",
    role: "Nine Heavens Development",
    bio: "Supports Nine Heavens development and stays active in the community, helping the project and server continue to improve.",
    avatar:
      "https://cdn.discordapp.com/avatars/768703559231340544/700fdcbf50bdeccddd6989b5a5132e15.png?size=512",
  },
  {
    name: "AG_TouSen",
    role: "Grand Elder",
    bio: "Grand Elder currently in seclusion, guiding cultivators through donghua, novels, updates, discussions, and Nine Heavens rankings.",
    avatar:
      "https://cdn.discordapp.com/avatars/1419545987583836180/c139ce8ba4bdc63c2950f012aec37aef.png?size=4096",
  },
  {
    name: "Noir",
    role: "Grand Elder",
    bio: "Donghua and anime lover, fanfic writer, and helpful community elder supporting discussions, reactor channels, and the Artistic Domain.",
    avatar:
      "https://cdn.discordapp.com/avatars/713438739296288779/4e8bc3183cfb9ec04a0aeaafe0ee6875.png?size=4096",
  },
  {
    name: "Chappelet",
    role: "Grand Elder - Nianfan Hater",
    bio: "Grand Elder who recommends overlooked donghua, pushes for broader genres, and supports reactor-friendly discovery in the community.",
    avatar:
      "https://cdn.discordapp.com/avatars/487735963913551874/4511a7a5a75ee54acb306a0e04999703.png?size=512",
  },
  {
    name: "KoriWave",
    role: "Freeloader - Grand Elder",
    bio: "Grand Elder who keeps the mood light, shares donghua shots, and helps Donghua Central feel casual, open, and welcoming.",
    avatar: "https://cdn.discordapp.com/avatars/606657480511979521/f601d890821504b0d4408c2f9c634368.png?size=512",
  },
];

const staffGrid = document.querySelector("#staffGrid");

const getInitials = (name) =>
  name
    .split(/\s|_/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const renderStaffAvatar = (member) => {
  if (!member.avatar) {
    return `<div class="staff-fallback" aria-hidden="true">${getInitials(member.name)}</div>`;
  }

  return `<img src="${member.avatar}" alt="${member.name}" loading="lazy" />`;
};

if (staffGrid) {
  staffGrid.innerHTML = staff
    .map(
      (member) => `
        <article class="staff-card">
          ${renderStaffAvatar(member)}
          <div class="staff-info">
            <span class="staff-role">${member.role}</span>
            <h3>${member.name}</h3>
            <p>${member.bio}</p>
          </div>
        </article>
      `
    )
    .join("");
}

const revealTargets = document.querySelectorAll(
  ".panel-band, .preview-panel, .system-panel, .join-section, .feature-card, .series-card, .nine-heavens-banner, .heaven-card, .realm-tier, .staff-card"
);

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.dataset.revealDelay = String(Math.min(index % 6, 5) * 70);
    target.style.transitionDelay = `${target.dataset.revealDelay}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        window.setTimeout(() => {
          entry.target.style.transitionDelay = "";
        }, Number(entry.target.dataset.revealDelay || 0) + 760);
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -70px",
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

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

if (window.lucide) {
  window.lucide.createIcons();
}
