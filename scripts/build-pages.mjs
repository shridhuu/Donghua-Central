import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SITE_URL = "https://shridhuu.github.io/Donghua-Central";
const YEAR = new Date().getFullYear();

const NAV_ITEMS = [
  { id: "home", href: "index.html", label: "Home" },
  { id: "schedule", href: "schedule.html", label: "Schedule" },
  { id: "library", href: "library.html", label: "Library" },
  { id: "subtitles", href: "subtitles.html", label: "Subtitles" },
  { id: "nine-heavens", href: "nine-heavens.html", label: "Nine Heavens" },
  { id: "staff", href: "staff.html", label: "Staff" },
  { id: "faq", href: "faq.html", label: "FAQ" },
  { id: "donate", href: "donate.html", label: "Donate" },
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
    title: "Donate | Donghua Central",
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
  {
    id: "about",
    contentFile: "pages/about.html",
    outputFile: "about.html",
    title: "About | Donghua Central",
    description: "The person behind Donghua Central, what's currently being worked on, and the tools the site runs on.",
  },
];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

const scheduleData = JSON.parse(read("data/schedule.json"));
const catalog = JSON.parse(read("data/series-catalog.json"));

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

// Regenerate sitemap.xml from the same page list — no more hand-maintained single-entry file
const urlEntries = PAGES.map((page) => {
  const loc = canonicalFor(page.outputFile);
  const priority = page.id === "home" ? "1.0" : "0.7";
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
console.log("Built sitemap.xml");

fs.writeFileSync(path.join(ROOT, "schedule.ics"), buildICS(), "utf8");
console.log("Built schedule.ics");
