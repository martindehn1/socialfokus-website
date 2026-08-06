/* ==========================================================================
   Dönermap Hamburg — Demo-Daten & Karte
   Alle Läden, Bewertungen und PLZ unten sind Platzhalter-Beispieldaten,
   bis echte Standorte + Videos + Google-Bewertungen eingepflegt sind.
   ========================================================================== */

const DOENER_SHOPS = [
  {
    name: "Anatolia Grill",
    district: "St. Pauli",
    plz: "20359",
    lat: 53.5578, lng: 9.9673,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 9.2,
    googleRating: 4.6,
    googleCount: 812,
    note: "Fleisch top gewürzt, Brot frisch aus dem Ofen. Eine der besten Soßen der Stadt.",
    videoUrl: null
  },
  {
    name: "Bosphorus Kebap",
    district: "Altona",
    plz: "22767",
    lat: 53.5511, lng: 9.9349,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 8.8,
    googleRating: 4.4,
    googleCount: 501,
    note: "Sehr großzügig belegt, faires Preis-Leistungs-Verhältnis.",
    videoUrl: null
  },
  {
    name: "Sultan's Kebap Haus",
    district: "Eimsbüttel",
    plz: "20255",
    lat: 53.5738, lng: 9.9599,
    verdict: "mid",
    verdictLabel: "Solide",
    martinRating: 6.9,
    googleRating: 4.1,
    googleCount: 344,
    note: "In Ordnung, aber nichts Besonderes. Brot könnte frischer sein.",
    videoUrl: null
  },
  {
    name: "Berlin Döner Wandsbek",
    district: "Wandsbek",
    plz: "22041",
    lat: 53.5773, lng: 10.0821,
    verdict: "mid",
    verdictLabel: "Solide",
    martinRating: 6.5,
    googleRating: 3.9,
    googleCount: 210,
    note: "Ok für zwischendurch, Soße geht besser.",
    videoUrl: null
  },
  {
    name: "Kebap King Barmbek",
    district: "Barmbek",
    plz: "22081",
    lat: 53.5897, lng: 10.0362,
    verdict: "bad",
    verdictLabel: "Nicht empfohlen",
    martinRating: 3.4,
    googleRating: 3.2,
    googleCount: 156,
    note: "Fleisch trocken, lange Wartezeit trotz wenig los. Da geht mehr in Hamburg.",
    videoUrl: null
  },
  {
    name: "Ali Baba Kebap",
    district: "HafenCity",
    plz: "20457",
    lat: 53.5423, lng: 9.9993,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 8.5,
    googleRating: 4.5,
    googleCount: 389,
    note: "Überraschend gut für die Touri-Lage. Lammfleisch ist die Wahl hier.",
    videoUrl: null
  },
  {
    name: "Efes Grillhaus",
    district: "Winterhude",
    plz: "22303",
    lat: 53.5934, lng: 10.0057,
    verdict: "bad",
    verdictLabel: "Nicht empfohlen",
    martinRating: 4.1,
    googleRating: 3.4,
    googleCount: 98,
    note: "Zu viel Soße, zu wenig Fleisch. Für den Preis nicht gerechtfertigt.",
    videoUrl: null
  },
  {
    name: "Marmaris Döner",
    district: "Ottensen",
    plz: "22765",
    lat: 53.5502, lng: 9.9159,
    verdict: "good",
    verdictLabel: "Top-Empfehlung",
    martinRating: 9.0,
    googleRating: 4.7,
    googleCount: 623,
    note: "Hausgemachtes Brot, perfekt gewürztes Fleisch. Klarer Geheimtipp.",
    videoUrl: null
  }
];

const MARTIN_TIPS = [
  "Achte auf die Röstzwiebeln — wenn sie labbrig sind, war das Brot nicht frisch.",
  "Ein guter Laden schneidet das Fleisch erst, wenn du bestellst. Nicht vorher auf Vorrat.",
  "Frag ruhig, ob du Lammfleisch statt Kalb/Rind bekommen kannst — oft der bessere Geschmack.",
  "Wenn die Soßen selbstgemacht sind statt aus der Flasche, ist das meistens ein gutes Zeichen.",
  "Der beste Test: Schmeckt der Döner auch ohne Soße? Dann stimmt die Fleischqualität.",
  "Frisches Fladenbrot erkennst du daran, dass es beim Falten nicht bricht."
];

function verdictClass(v) { return v; }

function shopCardHtml(shop) {
  return `
    <article class="shop-card" data-plz="${shop.plz}">
      <div class="shop-card-top">
        <div>
          <h3>${shop.name}</h3>
          <div class="district">${shop.district} · ${shop.plz}</div>
        </div>
        <span class="verdict-badge ${verdictClass(shop.verdict)}">${shop.verdictLabel}</span>
      </div>
      <div class="ratings">
        <span>Martin: <strong>${shop.martinRating.toFixed(1)}/10</strong></span>
        <span>Google: <strong>${shop.googleRating.toFixed(1)}★</strong> (${shop.googleCount})</span>
      </div>
      <p class="note">${shop.note}</p>
      <div class="shop-card-actions">
        <a class="btn-mini video" href="${shop.videoUrl || '#'}" ${shop.videoUrl ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>
          ${shop.videoUrl ? "▶ Video ansehen" : "Video folgt"}
        </a>
        <a class="btn-mini" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.district + ' Hamburg')}" target="_blank" rel="noopener">Auf Google Maps</a>
      </div>
    </article>
  `;
}

function renderShopList(shops) {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  grid.innerHTML = (shops || DOENER_SHOPS).map(shopCardHtml).join("");
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof maplibregl === "undefined") return;

  const map = new maplibregl.Map({
    container: "map",
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    center: [9.99, 53.565],
    zoom: 11.2,
    attributionControl: true
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  map.on("load", () => {
    DOENER_SHOPS.forEach(shop => {
      const el = document.createElement("div");
      el.className = `doener-marker ${verdictClass(shop.verdict)}`;

      const popupHtml = `
        <div class="popup-shop-name">${shop.name}</div>
        <div class="popup-shop-meta">${shop.district} · ${shop.plz}</div>
        <span class="popup-shop-verdict ${verdictClass(shop.verdict)}">${shop.verdictLabel}</span><br/>
        <div class="popup-shop-meta">Martin: <strong>${shop.martinRating.toFixed(1)}/10</strong> · Google: <strong>${shop.googleRating.toFixed(1)}★</strong></div>
        ${shop.videoUrl ? `<a class="popup-video-link" href="${shop.videoUrl}" target="_blank" rel="noopener">▶ Martins Video ansehen</a>` : `<span class="popup-video-link" style="color:var(--text-faint)">Video folgt bald</span>`}
      `;

      new maplibregl.Marker({ element: el })
        .setLngLat([shop.lng, shop.lat])
        .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML(popupHtml))
        .addTo(map);
    });
  });
}

function showRandomTip() {
  const tipEl = document.getElementById("martinTipText");
  if (!tipEl) return;
  const tip = MARTIN_TIPS[Math.floor(Math.random() * MARTIN_TIPS.length)];
  tipEl.textContent = tip;
}

function initSearch() {
  const form = document.getElementById("plzForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("plzInput");
    const query = (input.value || "").trim();
    if (!query) return;

    const matches = DOENER_SHOPS.filter(shop =>
      shop.plz.includes(query) || shop.district.toLowerCase().includes(query.toLowerCase())
    );

    document.getElementById("listHint").textContent = matches.length
      ? `${matches.length} Laden${matches.length === 1 ? "" : "s"} gefunden für "${query}"`
      : `Keine Treffer für "${query}" — hier sind alle Läden:`;

    renderShopList(matches.length ? matches : DOENER_SHOPS);

    document.getElementById("shopGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderShopList();
  initMap();
  showRandomTip();
  initSearch();

  const refreshBtn = document.getElementById("tipRefresh");
  if (refreshBtn) refreshBtn.addEventListener("click", showRandomTip);
});
