(async () => {
  const workingOnList = document.querySelector("#aboutWorkingOn");
  if (!workingOnList) return; // only present on about.html — safe no-op on every other page

  try {
    const res = await fetch("data/series-catalog.json");
    if (!res.ok) throw new Error("data/series-catalog.json not found");
    const catalog = await res.json();
    const active = catalog.filter((show) => show.currentlyWorkingOn);

    workingOnList.innerHTML = active
      .map((show) => `<li><strong>${show.name}</strong>${show.workingOnNote ? ` — ${show.workingOnNote}` : ""}</li>`)
      .join("");
  } catch (err) {
    console.warn("Failed to load current projects:", err.message);
    workingOnList.innerHTML = `<li>Check the <a href="library.html">library</a> for what's currently in progress.</li>`;
  }
})();
