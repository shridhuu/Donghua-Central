import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SITE_URL = "https://shridhuu.github.io/Donghua-Central";

const NAV_ITEMS = [
  { id: "home", href: "index.html", label: "Home" },
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
];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

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
