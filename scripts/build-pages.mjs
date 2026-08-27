import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SITE_URL = "https://shridhuu.github.io/Donghua-Central";
const YEAR = new Date().getFullYear();

const NAV_ITEMS = [
  { id: "home", href: "index.html", label: "Home" },
  { id: "donate", href: "donate.html", label: "Donate" },
  { id: "schedule", href: "schedule.html", label: "Schedule" },
  { id: "library", href: "library.html", label: "Library" },
  { id: "subtitles", href: "subtitles.html", label: "Subtitles" },
  { id: "nine-heavens", href: "nine-heavens.html", label: "Nine Heavens" },
  { id: "staff", href: "staff.html", label: "Staff" },
  { id: "faq", href: "faq.html", label: "FAQ" },
];

const PAGES = [
  {
    id: "home",
    contentFile: "pages/home.html",
    outputFile: "index.html",
    title: "Donghua Central",
    description:
      "Donghua Central is a Discord community for donghua fans with handcrafted English subtitles, episode updates, discussions, novels, audiobooks, and the Nine Heavens cultivation project.",
  },
  {
    id: "schedule",
    contentFile: "pages/schedule.html",
    outputFile: "schedule.html",
    title: "Release Schedule | Donghua Central",
    description:
      "See when Donghua Central drops new subtitle releases, tracked day by day in your local time.",
  },
  {
    id: "library",
    contentFile: "pages/library.html",
    outputFile: "library.html",
    title: "Series Library | Donghua Central",
    description:
      "Browse the donghua series library curated and subtitled by Donghua Central, searchable by name and genre.",
  },
  {
    id: "subtitles",
    contentFile: "pages/subtitles.html",
    outputFile: "subtitles.html",
    title: "Our Subtitle Process | Donghua Central",
    description:
      "How Donghua Central makes handcrafted English subtitles: translation, editing, timing, typesetting, and QC.",
  },
  {
    id: "nine-heavens",
    contentFile: "pages/nine-heavens.html",
    outputFile: "nine-heavens.html",
    title: "Nine Heavens Cultivation RPG | Donghua Central",
    description:
      "Nine Heavens is a persistent, server-wide cultivation RPG on the Donghua Central Discord, inspired by Xianxia novels.",
  },
  {
    id: "staff",
    contentFile: "pages/staff.html",
    outputFile: "staff.html",
    title: "Staff | Donghua Central",
    description:
      "Meet the developers, moderators, subtitle makers, and archivists behind Donghua Central.",
  },
  {
    id: "faq",
    contentFile: "pages/faq.html",
    outputFile: "faq.html",
    title: "FAQ | Donghua Central",
    description: "Answers to the questions new Donghua Central members ask first.",
  },
  {
    id: "donate",
    contentFile: "pages/donate.html",
    outputFile: "donate.html",
    title: "Buy Me a Coffee | Donghua Central",
    description:
      "Support Shridhuu directly to help keep Donghua Central's subtitles, hosting, and community running.",
  },
  {
    id: "terms",
    contentFile: "pages/terms.html",
    outputFile: "terms.html",
    title: "Terms of Republishing | Donghua Central",
    description:
      "Rules for redistributing Donghua Central's subtitle releases elsewhere: credit requirements, no paywalling, and courtesy guidelines.",
  },
];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const scheduleData = JSON.parse(read("data/schedule.json"));
const catalog = JSON.parse(read("data/series-catalog.json"));
const tmdbOverlay = JSON.parse(read("data/series.json"));

const DAY_TO_ICAL = {
  sunday: "SU", monday: "MO", tuesday: "TU", wednesday: "WE",
  thursday: "TH", friday: "FR", saturday: "SA",
};

const pad2 = (n) => String(n).padStart(2, "0");

const escapeICS = (text) =>
  String(text).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

const buildICS = () => {
  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}Z`;
  const dayIndexOf = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const events = scheduleData
    .filter((item) => DAY_TO_ICAL[item.day]) // skip nonweekly/tentative — no fixed recurrence
    .map((item) => {
      const show = catalog.find((s) => s.id === item.showId);
      const title = show ? show.name : item.showId;
      const [h, m] = item.releaseTimeUTC.split(":").map(Number);

      // Anchor DTSTART on the next occurrence of that weekday so the RRULE starts correctly
      const anchor = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h, m, 0));
      let diff = dayIndexOf.indexOf(item.day) - now.getUTCDay();
      if (diff < 0) diff += 7;
      anchor.setUTCDate(anchor.getUTCDate() + diff);
      const dtstart = `${anchor.getUTCFullYear()}${pad2(anchor.getUTCMonth() + 1)}${pad2(anchor.getUTCDate())}T${pad2(h)}${pad2(m)}00Z`;

      return [
        "BEGIN:VEVENT",
        `UID:${item.id}@donghuacentral`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${dtstart}`,
        `RRULE:FREQ=WEEKLY;BYDAY=${DAY_TO_ICAL[item.day]}`,
        `SUMMARY:${escapeICS(`[${item.group}] ${title}`)}`,
        item.note ? `DESCRIPTION:${escapeICS(item.note)}` : null,
        "END:VEVENT",
      ].filter(Boolean).join("\r\n");
    });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Donghua Central//Release Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeICS("Donghua Central Release Schedule")}`,
    ...events,
    "END:VCALENDAR",
  ].join("\r\n") + "\r\n";
};

const buildRSS = () => {
  const now = new Date().toUTCString();

  const items = scheduleData
    .filter((item) => item.day !== "tentative")
    .map((item) => {
      const show = catalog.find((s) => s.id === item.showId);
      const title = show ? show.name : item.showId;
      const dayLabel = item.day === "nonweekly" ? "Non-Weekly" : item.day[0].toUpperCase() + item.day.slice(1);

      return [
        "    <item>",
        `      <title>${escapeICS(`[${item.group}] ${title} — ${dayLabel}`)}</title>`,
        `      <link>${SITE_URL}/schedule.html</link>`,
        `      <guid isPermaLink="false">${item.id}@donghuacentral-schedule</guid>`,
        `      <pubDate>${now}</pubDate>`,
        item.note ? `      <description>${escapeICS(item.note)}</description>` : null,
        "    </item>",
      ].filter(Boolean).join("\n");
    });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Donghua Central Release Schedule</title>",
    `    <link>${SITE_URL}/schedule.html</link>`,
    "    <description>Current weekly release schedule for Donghua Central — refreshed on every deploy, not a log of past releases.</description>",
    `    <lastBuildDate>${now}</lastBuildDate>`,
    ...items,
    "  </channel>",
    "</rss>",
  ].join("\n") + "\n";
};

const seriesDetailBody = (item) => {
  const tmdbInfo = tmdbOverlay[item.id] || {};
  const genres = tmdbInfo.genres?.length ? tmdbInfo.genres : item.genres;
  const synopsis = tmdbInfo.overview && tmdbInfo.use_tmdb_synopsis ? tmdbInfo.overview : item.synopsis;
  const poster =
    tmdbInfo.poster_path && tmdbInfo.poster_path.startsWith("http") && tmdbInfo.use_tmdb_poster
      ? tmdbInfo.poster_path
      : item.image;

  return `
<section class="panel-band" id="series-detail">
  <a class="back-link" href="library.html">&larr; Back to Library</a>
  <div class="modal-body">
    <div class="modal-media">
      <img src="${poster}" alt="${item.name} Poster" width="${item.width || 300}" height="${item.height || 450}" />
    </div>
    <div class="modal-info">
      <h2>${item.name}</h2>
      ${tmdbInfo.original_name && tmdbInfo.original_name !== item.name ? `<p class="modal-native-name">${tmdbInfo.original_name}</p>` : ""}
      <div class="modal-meta-row">
        <span class="modal-badge status-${item.status.toLowerCase()}">${item.status}</span>
        ${tmdbInfo.first_air_date ? `<span class="modal-year">${tmdbInfo.first_air_date.slice(0, 4)}</span>` : ""}
        <span class="modal-episodes"><strong>Episodes:</strong> ${item.episodes}</span>
        ${tmdbInfo.rating ? `<span class="modal-rating"><strong>${tmdbInfo.rating.toFixed(1)}</strong>/10</span>` : ""}
      </div>
      <p class="modal-synopsis">${synopsis}</p>
      <div class="modal-genres">
        ${genres.map((g) => `<span class="genre-tag">${g}</span>`).join("")}
      </div>
      <a class="primary-btn" href="https://discord.gg/donghuacentral" target="_blank" rel="noopener noreferrer">
        <span>Discuss on Discord</span>
      </a>
    </div>
  </div>
</section>`;
};

const buildNav = (activeId) =>
  NAV_ITEMS.map(
    (item) =>
      `<a class="${item.id === activeId ? "is-active" : ""}" href="${item.href}">${item.label}</a>`
  ).join("\n            ");

const canonicalFor = (outputFile) =>
  `${SITE_URL}/${outputFile === "index.html" ? "" : outputFile}`;

const layout = read("partials/layout.html");

for (const page of PAGES) {
  const body = read(page.contentFile);
  const html = layout
    .replaceAll("{{PAGE_TITLE}}", page.title)
    .replaceAll("{{PAGE_DESCRIPTION}}", page.description)
    .replaceAll("{{CANONICAL_URL}}", canonicalFor(page.outputFile))
    .replaceAll("{{NAV_LINKS}}", buildNav(page.id))
    .replaceAll("{{YEAR}}", YEAR)
    .replaceAll("{{MAIN_CONTENT}}", body);

  fs.writeFileSync(path.join(ROOT, page.outputFile), html, "utf8");
  console.log(`Built ${page.outputFile}`);
}

// Generate static detail pages for each series in library catalog
const librarySeries = catalog.filter((s) => !s.excludeFromLibrary);
for (const item of librarySeries) {
  const outputFile = `series-${item.id}.html`;
  const html = layout
    .replaceAll("{{PAGE_TITLE}}", `${item.name} | Donghua Central`)
    .replaceAll("{{PAGE_DESCRIPTION}}", item.synopsis.slice(0, 155))
    .replaceAll("{{CANONICAL_URL}}", canonicalFor(outputFile))
    .replaceAll("{{NAV_LINKS}}", buildNav("library"))
    .replaceAll("{{YEAR}}", YEAR)
    .replaceAll("{{MAIN_CONTENT}}", seriesDetailBody(item));

  fs.writeFileSync(path.join(ROOT, outputFile), html, "utf8");
}
console.log(`Built ${librarySeries.length} series detail pages`);

// Regenerate sitemap.xml with lastmod dates
const today = new Date().toISOString().slice(0, 10);
const urlEntries = PAGES.map((page) => {
  const loc = canonicalFor(page.outputFile);
  const priority = page.id === "home" ? "1.0" : "0.7";
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
console.log("Built sitemap.xml");

fs.writeFileSync(path.join(ROOT, "schedule.ics"), buildICS(), "utf8");
console.log("Built schedule.ics");

fs.writeFileSync(path.join(ROOT, "feed.xml"), buildRSS(), "utf8");
console.log("Built feed.xml");
