/* ============================================================
   Ready? China! — Shared JavaScript
   All navigation, modals, menu, map, checklist, cities, visa
   ============================================================ */

// ── MENU ──────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('menu-btn').classList.toggle('open');
  document.getElementById('menu-dropdown').classList.toggle('show');
}
function closeMenu() {
  document.getElementById('menu-btn').classList.remove('open');
  document.getElementById('menu-dropdown').classList.remove('show');
}
document.addEventListener('click', e => {
  const b = document.getElementById('menu-btn');
  const d = document.getElementById('menu-dropdown');
  if (b && d && !b.contains(e.target) && !d.contains(e.target)) closeMenu();
});

// ── SCROLL TO SECTION ─────────────────────────────────────────
// Call this from any button: scrollToSection('ready-section')
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  closeMenu();
  // Small delay so menu closes before scroll starts
  setTimeout(() => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

// ── MODALS ────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('show');
  document.body.style.overflow = '';
}
// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});
// Close on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show')
      .forEach(m => closeModal(m.id));
    closeMenu();
  }
});

// ── MAP TOOLTIP ───────────────────────────────────────────────
function showTip(e, el) {
  const t = document.getElementById('prov-tip');
  if (!t) return;
  document.getElementById('tip-zh').textContent = el.dataset.zh || '';
  document.getElementById('tip-en').textContent = el.dataset.en || '';
  document.getElementById('tip-desc').textContent = el.dataset.desc || '';
  t.style.display = 'block';
  moveTip(e);
}
function moveTip(e) {
  const t = document.getElementById('prov-tip');
  if (!t) return;
  let x = e.clientX + 16, y = e.clientY - 10;
  if (x + 220 > window.innerWidth) x = e.clientX - 225;
  if (y + 120 > window.innerHeight) y = e.clientY - 120;
  t.style.left = x + 'px';
  t.style.top = y + 'px';
}
function hideTip() {
  const t = document.getElementById('prov-tip');
  if (t) t.style.display = 'none';
}
const mapSvg = document.getElementById('china-map-svg');
if (mapSvg) {
  mapSvg.addEventListener('mousemove', e => {
    if (document.getElementById('prov-tip').style.display === 'block') moveTip(e);
  });
}

// ── MAP PROVINCE SELECT ───────────────────────────────────────
let activeProv = null;
function selectProv(el) {
  if (activeProv) activeProv.classList.remove('active');
  if (activeProv === el) {
    activeProv = null;
    const pill = document.getElementById('map-pill');
    if (pill) pill.style.display = 'none';
    return;
  }
  el.classList.add('active');
  activeProv = el;
  const zh = document.getElementById('map-zh');
  const en = document.getElementById('map-en');
  const pill = document.getElementById('map-pill');
  if (zh) zh.textContent = el.dataset.zh;
  if (en) en.textContent = el.dataset.en;
  if (pill) pill.style.display = 'inline-flex';
}

// ── CHECKLIST PROGRESS ────────────────────────────────────────
const steps = [
  'step-passport','step-visa','step-flights','step-esim',
  'step-payment','step-network','step-apps','step-transport','step-customs'
];
const statusMsgs = [
  'Just getting started — your adventure awaits! 🌱',
  'Great start! Passport sorted ✅',
  'Visa sorted — you\'re officially going! 🎉',
  'Flights & hotel booked — it\'s real now! 🛫',
  'SIM ready — you\'ll have signal the moment you land 📶',
  'Payments sorted — you can eat ANYTHING 🍜',
  'Connected — Instagram works in China too 🌐',
  'Apps ready — you\'re basically a local 📱',
  'Transport sorted — rail, metro, Didi — you\'ve got this 🚄',
  '100% CHINA READY! See you there! 🇨🇳🎊'
];
function toggleStep(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('done');
  updateProgress();
}
function updateProgress() {
  const done = steps.filter(s => {
    const el = document.getElementById(s);
    return el && el.classList.contains('done');
  }).length;
  const pct = Math.round((done / steps.length) * 100);
  const bar = document.getElementById('prog-bar');
  const label = document.getElementById('pct-label');
  const status = document.getElementById('prog-status');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
  if (status) status.textContent = statusMsgs[done] || statusMsgs[0];
}

// ── CITY CARDS ────────────────────────────────────────────────
function toggleCity(card) {
  const d = card.querySelector('.city-detail');
  const wasOpen = d.classList.contains('open');
  document.querySelectorAll('.city-detail').forEach(x => x.classList.remove('open'));
  document.querySelectorAll('.city-card').forEach(c => c.style.borderColor = '');
  if (!wasOpen) {
    d.classList.add('open');
    card.style.borderColor = 'var(--accent)';
  }
}

// ── VISA DATABASE ─────────────────────────────────────────────
const visaDB = {
  us:{flag:'🇺🇸',name:'United States',type:'Visa Required',detail:'Apply for a <strong>10-year multiple-entry L (Tourist) visa</strong> at the Chinese Embassy or Consulate in your state. Also eligible for <strong style="color:var(--gold)">144-hour visa-free transit</strong> through Beijing, Shanghai, Guangzhou and more.',link:'https://www.visaforchina.cn/globle/'},
  uk:{flag:'🇬🇧',name:'United Kingdom',type:'✅ Visa-Free (15 days)',detail:'UK citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (expanded 2024 policy). For longer stays, apply for an L visa at the Chinese Embassy in London.',link:'https://www.visaforchina.cn/LON2_EN/'},
  au:{flag:'🇦🇺',name:'Australia',type:'Visa Required',detail:'Apply for a tourist (L) visa at the Chinese Embassy in Canberra or consulates in Sydney/Melbourne. Processing: 4–7 business days. Also eligible for <strong style="color:var(--gold)">144-hour transit visa-free</strong>.',link:'https://www.china-embassy.gov.cn/eng/'},
  de:{flag:'🇩🇪',name:'Germany',type:'✅ Visa-Free (15 days)',detail:'German citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (expanded 2024). 144-hour transit also available.',link:'https://www.visaforchina.cn/BER2_EN/'},
  fr:{flag:'🇫🇷',name:'France',type:'✅ Visa-Free (15 days)',detail:'French citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (expanded 2024).',link:'https://www.visaforchina.cn/PAR2_EN/'},
  ca:{flag:'🇨🇦',name:'Canada',type:'Visa Required',detail:'Apply at the Chinese Consulate in Toronto, Vancouver, or Calgary. Processing: 4–7 days. <strong style="color:var(--gold)">144-hour transit visa-free</strong> also available.',link:'https://www.visaforchina.cn/globle/'},
  sg:{flag:'🇸🇬',name:'Singapore',type:'✅ Visa-Free (30 days)',detail:'Singapore citizens enjoy <strong style="color:var(--gold)">30-day visa-free entry</strong>. No application needed.',link:'https://www.mfa.gov.cn/ce/cesg//eng/'},
  jp:{flag:'🇯🇵',name:'Japan',type:'✅ Visa-Free (15 days)',detail:'Japanese citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (restored 2024).',link:'https://www.visaforchina.cn/TYO2_EN/'},
  kr:{flag:'🇰🇷',name:'South Korea',type:'✅ Visa-Free (15 days)',detail:'Korean citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (expanded 2024).',link:'https://www.visaforchina.cn/SEL_EN/'},
  nz:{flag:'🇳🇿',name:'New Zealand',type:'Visa Required',detail:'Apply at the Chinese Embassy in Wellington or Consulate in Auckland. Processing: 4–7 days.',link:'https://www.visaforchina.cn/globle/'},
  it:{flag:'🇮🇹',name:'Italy',type:'✅ Visa-Free (15 days)',detail:'Italian citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (2024 policy).',link:'https://www.visaforchina.cn/ROM2_EN/'},
  es:{flag:'🇪🇸',name:'Spain',type:'✅ Visa-Free (15 days)',detail:'Spanish citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (2024 policy).',link:'https://www.visaforchina.cn/MAD2_EN/'},
  nl:{flag:'🇳🇱',name:'Netherlands',type:'✅ Visa-Free (15 days)',detail:'Dutch citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (2024).',link:'https://www.visaforchina.cn/AMS_EN/'},
  se:{flag:'🇸🇪',name:'Sweden',type:'✅ Visa-Free (15 days)',detail:'Swedish citizens enjoy <strong style="color:var(--gold)">15-day visa-free entry</strong> (2024).',link:'https://www.visaforchina.cn/STO_EN/'},
  ch:{flag:'🇨🇭',name:'Switzerland',type:'Visa Required',detail:'Apply at the Chinese Embassy in Bern. Processing: 4–7 days.',link:'https://www.visaforchina.cn/globle/'},
  br:{flag:'🇧🇷',name:'Brazil',type:'✅ Visa-Free (30 days)',detail:'Brazilian citizens enjoy <strong style="color:var(--gold)">30-day visa-free entry</strong>.',link:'https://www.visaforchina.cn/globle/'},
  in:{flag:'🇮🇳',name:'India',type:'Visa Required',detail:'Apply at the Chinese Embassy in New Delhi or consulates in Mumbai/Kolkata/Chennai. Processing: 5–10 days.',link:'https://www.visaforchina.cn/globle/'},
  za:{flag:'🇿🇦',name:'South Africa',type:'Visa Required',detail:'Apply at the Chinese Embassy in Pretoria. Processing: 5–7 days.',link:'https://www.visaforchina.cn/globle/'},
};
function showVisa(btn, code) {
  document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const v = visaDB[code];
  const res = document.getElementById('visa-result');
  res.innerHTML = `<strong>${v.flag} ${v.name}</strong> — <strong style="color:var(--accent)">${v.type}</strong><br><br>${v.detail}<br><br>🔗 <a href="${v.link}" target="_blank" rel="noopener">Official Application Portal →</a>`;
  res.classList.add('show');
}
function filterCountries() {
  const q = document.getElementById('visa-search').value.toLowerCase();
  document.querySelectorAll('.country-btn').forEach(b => {
    b.style.display = b.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ── EMAIL NOTIFY ──────────────────────────────────────────────
function communityNotify() {
  const e = document.getElementById('comm-email').value;
  if (!e || !e.includes('@')) { alert('Please enter a valid email.'); return; }
  document.getElementById('comm-success').style.display = 'block';
  document.getElementById('comm-email').value = '';
}
function plannerNotify() {
  const e = document.getElementById('plan-email').value;
  if (!e || !e.includes('@')) { alert('Please enter a valid email.'); return; }
  document.getElementById('plan-ok').style.display = 'block';
  document.getElementById('plan-email').value = '';
}


// ╔══════════════════════════════════════════════════════════════════╗
// ║   SHARED COMPONENTS                                              ║
// ║   Change something ONCE here → updates on ALL pages instantly    ║
// ║   You never need to touch the individual .html files for these   ║
// ╚══════════════════════════════════════════════════════════════════╝

const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';

// ──────────────────────────────────────────────────────────────────
// HEADER & NAV
// ✏️ To add a nav link: add a line to the links[] array below
// ──────────────────────────────────────────────────────────────────
function buildHeader() {
  const links = [
    { href: 'get-ready.html', label: 'Get Ready with Me' },
    { href: 'cities.html',    label: 'Cities'            },
    { href: 'community.html', label: 'Community'         },
  ];
  const navLinks = links.map(l => `
    <a class="nav-link" href="${l.href}"
       style="${CURRENT_PAGE===l.href ? 'color:var(--accent)' : ''}">
      ${l.label}
    </a>`).join('');

  const LOGO_SVG = `
    <div class="logo-travelers">
      <div class="traveler"><svg width="20" height="32" viewBox="0 0 20 32" fill="none"><circle cx="10" cy="4.5" r="3.5" fill="#c0392b" opacity=".85"/><rect x="6" y="9" width="8" height="13" rx="2" fill="#c0392b" opacity=".85"/><rect x="12.5" y="10" width="5" height="7" rx="1.5" fill="#9a7b2f" opacity=".9"/><line x1="7.5" y1="22" x2="5.5" y2="31" stroke="#c0392b" stroke-width="2.5" stroke-linecap="round" opacity=".85"/><line x1="12.5" y1="22" x2="14.5" y2="31" stroke="#c0392b" stroke-width="2.5" stroke-linecap="round" opacity=".85"/></svg></div>
      <div class="traveler"><svg width="18" height="30" viewBox="0 0 18 30" fill="none"><circle cx="9" cy="4" r="3" fill="#9a7b2f" opacity=".8"/><rect x="5.5" y="8" width="7" height="12" rx="2" fill="#9a7b2f" opacity=".8"/><rect x="11" y="9" width="4.5" height="6.5" rx="1.5" fill="#c0392b" opacity=".7"/><line x1="7" y1="20" x2="5.5" y2="29" stroke="#9a7b2f" stroke-width="2.2" stroke-linecap="round" opacity=".8"/><line x1="11" y1="20" x2="12.5" y2="29" stroke="#9a7b2f" stroke-width="2.2" stroke-linecap="round" opacity=".8"/></svg></div>
      <div class="traveler"><svg width="16" height="28" viewBox="0 0 16 28" fill="none"><circle cx="8" cy="3.5" r="2.8" fill="#4a3c28" opacity=".6"/><rect x="5" y="7" width="6" height="11" rx="2" fill="#4a3c28" opacity=".6"/><rect x="9.5" y="8" width="4" height="6" rx="1.5" fill="#c0392b" opacity=".55"/><line x1="6.5" y1="18" x2="5" y2="27" stroke="#4a3c28" stroke-width="2" stroke-linecap="round" opacity=".6"/><line x1="9.5" y1="18" x2="11" y2="27" stroke="#4a3c28" stroke-width="2" stroke-linecap="round" opacity=".6"/></svg></div>
    </div>`;

  document.querySelector('header').innerHTML = `
    <div class="logo-area">
      ${LOGO_SVG}
      <div class="logo-text">
        <div class="logo-main"><a href="index.html" style="text-decoration:none;color:inherit">Ready? China!</a></div>
        <div class="logo-sub">Survive &amp; Thrive with K</div>
      </div>
    </div>
    <nav>
      ${navLinks}
      <button class="nav-link nav-cta" onclick="openModal('planning-modal')">
        <span class="soon-tag">SOON</span>Start Planning
      </button>
    </nav>`;
}

// ──────────────────────────────────────────────────────────────────
// FLOATING MENU
// ✏️ To add a menu item: add an object to menuItems[] below
// ──────────────────────────────────────────────────────────────────
function buildMenu() {
  const menuItems = [
    { icon:'✅', title:'Get Ready with Me', sub:'Step-by-step checklist',  href:'get-ready.html',  badge:'START', bc:'mbadge-red'  },
    { icon:'🗺️', title:'Cities',            sub:'Where should I go?',       href:'cities.html'                                       },
    { icon:'📍', title:'Explore the Map',   sub:'All 31 provinces',         href:'china-map.html'                                    },
    { icon:'👥', title:'Community',         sub:'K\'s updates & tips',      href:'community.html',  badge:'NEW',   bc:'mbadge-red'  },
    { icon:'🙋‍♀️', title:'About K',          sub:'Who built this & why',     modal:'about-modal'                                      },
    { icon:'🤖', title:'AI Trip Planner',   sub:'Auto itinerary',           modal:'planning-modal', badge:'SOON',  bc:'mbadge-gray' },
  ];
  document.getElementById('menu-dropdown').innerHTML = menuItems.map(m => {
    const action = m.modal ? `openModal('${m.modal}');closeMenu()` : `window.location='${m.href}'`;
    const badge  = m.badge ? `<span class="mbadge ${m.bc||''}">${m.badge}</span>` : '';
    return `<div class="menu-item" onclick="${action}">
      <div class="menu-icon">${m.icon}</div>
      <div><div class="menu-item-title">${m.title}</div><div class="menu-item-sub">${m.sub}</div></div>
      ${badge}</div>`;
  }).join('');
}

// ──────────────────────────────────────────────────────────────────
// FOOTER
// ✏️ ONLY EDIT THIS FUNCTION to change year, text, links
//    It updates footer on ALL pages at once
// ──────────────────────────────────────────────────────────────────
function buildFooter() {
  const YEAR = 2026; // ← change year here only
  document.querySelector('footer').innerHTML = `
    <div>
      <div class="footer-brand">Ready? China!</div>
      <div>Survive &amp; Thrive with K · 为朋友们而造</div>
    </div>
    <div style="text-align:right;line-height:1.8">
      <div>AI Planner · Community · Coming Soon</div>
      <div style="opacity:.5;margin-top:4px">© ${YEAR} Ready? China!</div>
    </div>`;
}

// ──────────────────────────────────────────────────────────────────
// SHARED MODALS (About K + AI Planner)
// These appear on every page — edit profile photo & bio here only
// ──────────────────────────────────────────────────────────────────
function buildModals() {

  // ✏️ YOUR PROFILE PHOTO
  // Option A — use a URL:  const PHOTO = 'https://yourlink.com/photo.jpg'
  // Option B — use a file: const PHOTO = 'assets/profile.jpg'
  //            (put your photo in the assets/ folder, name it profile.jpg)
  // Option C — keep emoji: const PHOTO = null  (shows 🌏 emoji)
  const PHOTO = null;

  const avatarHTML = PHOTO
    ? `<img src="${PHOTO}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,.5)">`
    : `<div class="about-avatar">🌏</div>`;

  // ✏️ YOUR BIO — edit the text between the backticks
  const BIO = `Born in the Philippines, grew up between Hong Kong, Quanzhou China,
    and studied in Australia — I've lived in four places and carry a little piece of all of them.<br><br>
    Now I'm back in China, and I keep inviting my foreign friends to come visit me.
    Every single one of them panics when they start planning. So I built this —
    a website I wish existed when my friends first asked me "where do I even start?"
    I'll be their tour guide, and yours too. Step by step, I've got you. 🏮`;

  const container = document.getElementById('modal-container') || document.body;
  container.insertAdjacentHTML('beforeend', `

  <!-- ABOUT K MODAL -->
  <div class="modal-overlay" id="about-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">🙋‍♀️ About K · 关于我</div>
        <div class="modal-subtitle">The person behind Ready? China!</div></div>
        <button class="modal-close" onclick="closeModal('about-modal')">×</button>
      </div>
      <div class="modal-body" style="padding:0">
        <div style="background:linear-gradient(135deg,#c0392b,#8b1a1a);padding:32px;display:flex;gap:20px;align-items:flex-start">
          ${avatarHTML}
          <div>
            <div style="font-family:'Playfair Display',serif;font-size:22px;color:white;margin-bottom:4px">Hey, I'm K!</div>
            <div style="font-size:11px;color:rgba(255,255,255,.7);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">Local Chinese · World Traveler · Your China Guide</div>
            <div style="font-size:20px;letter-spacing:4px">🇵🇭 🇭🇰 🇨🇳 🇦🇺</div>
          </div>
        </div>
        <div style="padding:28px">
          <p style="font-size:13px;color:var(--text-mid);line-height:1.8;margin-bottom:20px">${BIO}</p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
            <div style="display:flex;gap:12px;padding:14px;background:var(--surface);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:20px">📶</span>
              <span style="font-size:12px;color:var(--text-muted);line-height:1.6">My Australian friend spent <strong>2 hours at Shanghai airport</strong> trying to get wifi. His phone had no signal and he couldn't contact the hotel.</span>
            </div>
            <div style="display:flex;gap:12px;padding:14px;background:var(--surface);border-radius:8px;border:1px solid var(--border)">
              <span style="font-size:20px">💳</span>
              <span style="font-size:12px;color:var(--text-muted);line-height:1.6">Another friend <strong>couldn't pay for dinner</strong> — he assumed credit cards worked everywhere. A stranger finally helped him pay.</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:14px;background:var(--red-soft);border:1px solid var(--red-border);border-radius:8px;font-size:12px;color:var(--text-mid)">
            <span>📧</span>
            <span>Email K anytime: <a href="mailto:katherine011004@gmail.com" style="color:var(--accent);font-weight:500">katherine011004@gmail.com</a></span>
          </div>
          <div style="font-family:'Noto Serif SC',serif;font-size:13px;color:var(--accent);margin-top:12px">家乡：福建泉州 · Hometown: Quanzhou, Fujian 🏮</div>
        </div>
      </div>
    </div>
  </div>

  <!-- AI PLANNER MODAL -->
  <div class="modal-overlay" id="planning-modal">
    <div class="modal-box" style="max-width:540px">
      <div class="modal-header">
        <div><div class="modal-title">🤖 AI Trip Planner · 智能行程</div>
        <div class="modal-subtitle">Your perfect China itinerary, generated in seconds</div></div>
        <button class="modal-close" onclick="closeModal('planning-modal')">×</button>
      </div>
      <div class="modal-body" style="text-align:center;padding:32px">
        <div style="font-size:48px;margin-bottom:16px">✨</div>
        <div style="font-family:'Playfair Display',serif;font-size:22px;color:var(--text);margin-bottom:10px">Coming Soon</div>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.7;max-width:380px;margin:0 auto 24px">
          Tell us your budget, days, season &amp; interests — we'll generate a complete personalised itinerary with routes, food spots, and hidden gems.
        </p>
        <div style="display:flex;flex-direction:column;gap:8px;max-width:340px;margin:0 auto 24px;text-align:left">
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;color:var(--text-muted)"><span>🗓️</span>Choose your days &amp; season</div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;color:var(--text-muted)"><span>💸</span>Budget, mid-range or luxury</div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;color:var(--text-muted)"><span>❤️</span>Food · History · Nature · Nightlife</div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:12px;color:var(--text-muted)"><span>🚄</span>Optimised routes between cities</div>
        </div>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Be first to know when it launches 👇</p>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          <input id="plan-email" type="email" placeholder="your@email.com"
            style="background:var(--surface);border:1px solid var(--border);color:var(--text);padding:10px 16px;border-radius:6px;font-size:12px;outline:none;width:200px;font-family:'DM Sans',sans-serif"/>
          <button onclick="plannerNotify()"
            style="background:var(--accent);color:white;border:none;padding:10px 18px;border-radius:6px;cursor:pointer;font-size:12px;font-family:'DM Sans',sans-serif">Notify Me</button>
        </div>
        <div id="plan-ok" style="font-size:12px;color:var(--gold);margin-top:10px;display:none">🎉 You're on the list!</div>
      </div>
    </div>
  </div>`);
}

// ──────────────────────────────────────────────────────────────────
// RUN EVERYTHING — fires on every page automatically
// ──────────────────────────────────────────────────────────────────
buildHeader();
buildMenu();
buildFooter();
buildModals();
