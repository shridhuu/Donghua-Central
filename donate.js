(async () => {
  const donateList = document.querySelector("#donateList");
  if (!donateList) return; // only present on donate.html — safe no-op on every other page

  const renderRow = (method) => {
    const icon = method.icon || "circle-dollar-sign";

    if (method.type === "unavailable") {
      return `
        <div class="donate-row donate-row-disabled">
          <div class="donate-row-label">
            <i data-lucide="${icon}" aria-hidden="true"></i>
            <span>${method.label}</span>
            <span class="donate-badge-unavailable">${method.status || "Unavailable for now"}</span>
          </div>
          <a class="outline-btn" href="${method.value}" target="_blank" rel="noopener noreferrer">
            <span>${method.cta || "Contact @shridhuu on Discord"}</span>
            <i data-lucide="external-link" aria-hidden="true"></i>
          </a>
        </div>
      `;
    }

    if (method.type === "copy") {
      return `
        <div class="donate-row">
          <div class="donate-row-label">
            <i data-lucide="${icon}" aria-hidden="true"></i>
            <span>${method.label}</span>
          </div>
          <button class="donate-copy" onclick="copyToClipboard('${method.value}', this)" aria-label="Copy ${method.label} address">
            <span>${method.value}</span>
            <i data-lucide="copy" aria-hidden="true"></i>
            <span class="copy-tooltip">Copied!</span>
          </button>
        </div>
      `;
    }

    // "link" type (also the fallback if `type` is ever missing/typo'd)
    return `
      <div class="donate-row">
        <div class="donate-row-label">
          <i data-lucide="${icon}" aria-hidden="true"></i>
          <span>${method.label}</span>
        </div>
        <a class="outline-btn" href="${method.value}" target="_blank" rel="noopener noreferrer">
          <span>${method.cta || "Open"}</span>
          <i data-lucide="external-link" aria-hidden="true"></i>
        </a>
      </div>
    `;
  };

  try {
    const res = await fetch("data/donate.json");
    if (!res.ok) throw new Error("data/donate.json not found");
    const methods = await res.json();
    donateList.innerHTML = methods.map(renderRow).join("");
  } catch (err) {
    console.warn("Failed to load donation methods:", err.message);
    donateList.innerHTML = `<p class="donate-error">Donation methods are temporarily unavailable — please check back soon or reach out on Discord.</p>`;
  } finally {
    if (window.lucide) window.lucide.createIcons();
  }
})();

(async () => {
  const perksList = document.querySelector("#donatePerks");
  if (!perksList) return; // only present on donate.html — safe no-op on every other page

  if (window.lucide) window.lucide.createIcons();

  // If perksList already contains static pre-rendered perk cards, keep them intact
  if (perksList.children.length > 0) return;

  const renderPerk = (perk) => {
    const bulletsHtml = perk.bullets && perk.bullets.length > 0
      ? `<ul class="perk-bullets">${perk.bullets.map(b => `<li><i data-lucide="check" aria-hidden="true"></i><span>${b}</span></li>`).join("")}</ul>`
      : "";

    const descHtml = perk.description ? `<p>${perk.description}</p>` : "";

    return `
      <div class="perk-card">
        <div class="perk-header">
          <i data-lucide="${perk.icon || "gift"}" aria-hidden="true"></i>
          <h4>${perk.title}</h4>
        </div>
        ${descHtml}
        ${bulletsHtml}
      </div>
    `;
  };

  try {
    const res = await fetch("data/donate-perks.json");
    if (!res.ok) throw new Error("data/donate-perks.json not found");
    const perks = await res.json();
    if (!perks || perks.length === 0) return;

    perksList.innerHTML = perks.map(renderPerk).join("");
    document.querySelector("#donatePerksWrap")?.removeAttribute("hidden");
  } catch (err) {
    console.warn("Failed to load donor perks:", err.message);
  } finally {
    if (window.lucide) window.lucide.createIcons();
  }
})();
