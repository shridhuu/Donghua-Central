(async () => {
  const donateList = document.querySelector("#donateList");
  if (!donateList) return; // only present on donate.html — safe no-op on every other page

  const renderRow = (method) => {
    const icon = method.icon || "circle-dollar-sign";

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
