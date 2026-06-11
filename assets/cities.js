// ============================================================
//  cities.js — Loads city data and builds city cards
//
//  HOW TO ADD A NEW CITY:
//  1. Open data/cities.json
//  2. Copy any existing city object { ... }
//  3. Paste it at the end of the array (before the last ] )
//  4. Fill in the fields
//  5. Save → git add . → git commit → git push
//  That's it. No touching HTML or JS ever.
// ============================================================

function buildCityCard(city) {
  // Build tags HTML
  const tagsHTML = city.tags
    .map(tag => `<span class="city-tag">${tag}</span>`)
    .join('');

  // Build attractions list HTML — matches exact structure of original
  const attractionsHTML = city.attractions
    .map((item, i) => `
      <li>
        <span class="attr-n">${i + 1}</span>${item}
      </li>`)
    .join('');

  // Build the full card — identical HTML structure to the original hardcoded cards
  return `
    <div class="city-card" onclick="toggleCity(this)">
      <div class="city-card-top">
        <div class="city-emoji-big">${city.emoji}</div>
        <div class="city-difficulty">
          <div class="diff-label">Difficulty</div>
          <div class="diff-stars">${city.difficulty}</div>
        </div>
      </div>
      <div class="city-name-zh">${city.nameZh}</div>
      <div class="city-name-en">${city.nameEn}</div>
      <div class="city-days">🗓 ${city.days}</div>
      <div class="city-best-for"><strong>Best for:</strong> ${city.bestFor}</div>
      <div class="city-tags">${tagsHTML}</div>
      <div class="city-detail">
        <div class="city-must-see">Top 10 Must-See</div>
        <ol class="attr-list">${attractionsHTML}</ol>
      </div>
    </div>`;
}

async function loadCities() {
  const container = document.getElementById('cities-container');
  if (!container) return;

  try {
    const response = await fetch('./data/cities.json');

    if (!response.ok) {
      throw new Error(`Could not load cities.json (status ${response.status})`);
    }

    const cities = await response.json();

    // Build all cards and inject into container
    container.innerHTML = cities.map(buildCityCard).join('');

  } catch (err) {
    console.error('loadCities() failed:', err);
    // Fallback message so the section doesn't look broken
    container.innerHTML = `
      <p style="color:var(--text-muted);font-size:13px;padding:20px 0">
        City guide is loading... if this persists, please refresh the page.
      </p>`;
  }
}

// Run automatically when the page loads
loadCities();