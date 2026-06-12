// ============================================================
//  assets/getready.js — Get Ready with Me component
//
//  WHAT THIS FILE CONTROLS:
//  • The full "Get Ready with Me" section (progress bar + 10 steps)
//  • All 8 modals triggered by the steps:
//    visa, sim, payment, network, apps, transport, emergency, customs
//
//  HOW TO EDIT CONTENT:
//  • Change a step title/description → find the step object in STEPS array
//  • Add a new step → add an object to STEPS, add its ID to script.js steps[]
//  • Edit a modal → find the matching modal function below
//  • Add a country to visa → find visaDB in script.js (stays there — shared)
// ============================================================

function loadGetReady() {

  // ── STEPS DATA ──────────────────────────────────────────
  // To edit a step: change title, desc, or modal here only
  const STEPS = [
    {
      id: 'step-passport',
      num: 'Step 1',
      title: '🛂 Check Your Passport',
      desc: 'Is it still valid? China requires at least 6 months validity beyond your travel dates. No passport? Start the application now — it might take 4–6 weeks.',
      modal: null
    },
    {
      id: 'step-visa',
      num: 'Step 2',
      title: '📋 Sort Your Visa',
      desc: 'Requirements depend on your nationality. Some countries are now visa-free for 15–30 days. Others need to apply. Click to find yours.',
      modal: { id: 'visa-modal', label: 'Check my visa →' }
    },
    {
      id: 'step-flights',
      num: 'Step 3',
      title: '✈️ Book Flights & Hotels',
      desc: 'Once your visa is approved, book everything in advance. P.S. Not all hotels accept foreigners. International chains are always safe, such as IHG, Marriott, Hilton etc.',
      modal: null
    },
    {
      id: 'step-esim',
      num: 'Step 4',
      title: '📶 Get a SIM or eSIM',
      desc: 'There are four options to use data in China. Expect using your international roaming, you can also get an eSIM, physical SIM, or pocket WiFi.',
      modal: { id: 'sim-modal', label: 'SIM guide →' }
    },
    {
      id: 'step-payment',
      num: 'Step 5',
      title: '💳 Set Up Payments',
      desc: 'China is almost entirely cashless. Street food stalls, taxis, supermarkets — all QR code. Link your foreign card to Alipay before you land. This is the #1 thing to do.',
      modal: { id: 'payment-modal', label: 'How to →' }
    },
    {
      id: 'step-network',
      num: 'Step 6',
      title: '🌐 Firewall & VPN',
      desc: 'Google, Instagram, WhatsApp and ChatGPT are blocked in China. Download a VPN before you fly. I\'ll tell you which ones actually work.',
      modal: { id: 'network-modal', label: 'Learn more →' }
    },
    {
      id: 'step-apps',
      num: 'Step 7',
      title: '📱 Download Your Apps',
      desc: 'For payment, communication, transportation, translation, food recommendation... These apps will run your entire trip. Set them up now — some require verification easier outside China.',
      modal: { id: 'apps-modal', label: 'App list →' }
    },
    {
      id: 'step-transport',
      num: 'Step 8',
      title: '🚄 Understand Transport',
      desc: 'China\'s high-speed rail is the best in the world. Learn how to book trains, use Didi (no language barrier), and navigate the metro system.',
      modal: { id: 'transport-modal', label: 'Transport guide →' }
    },
    {
      id: 'step-emergency',
      num: 'Step 9',
      title: '🆘 Emergency Numbers',
      desc: 'Screenshot or save the key Chinese emergency numbers. Better to have them and not need them.',
      modal: { id: 'emergency-modal', label: 'View numbers →' }
    },
    {
      id: 'step-customs',
      num: 'Step 10',
      title: '🛃 Arrival & Immigration',
      desc: 'You can fill in the Arrival Card online within 3 days before landing. Know what to expect at immigration and how to get from airport to hotel smoothly.',
      modal: { id: 'customs-modal', label: 'What to expect →' }
    }
  ];

  // Build each step card
  const stepsHTML = STEPS.map(s => `
    <div class="check-step" id="${s.id}">
      <div class="step-check" onclick="toggleStep('${s.id}')"></div>
      <div style="flex:1">
        <div class="step-num-label">${s.num}</div>
        <div class="step-title-main">${s.title}</div>
        <div class="step-desc-main">${s.desc}</div>
      </div>
      ${s.modal ? `<div class="step-action">
        <button class="step-btn" onclick="openModal('${s.modal.id}')">${s.modal.label}</button>
      </div>` : ''}
    </div>`).join('');

  // ── SECTION HTML ─────────────────────────────────────────
  const sectionHTML = `
  <section class="section" id="ready-section">
    <div class="section-eyebrow">Step by Step · 出发准备</div>
    <h2 class="section-title">Get Ready with Me</h2>
    <p class="section-sub">Tick each step as you complete it. Your China readiness score updates in real time.</p>
    <div class="progress-area">
      <div class="progress-header">
        <div class="progress-label">🇨🇳 China Ready Score</div>
        <div class="progress-pct" id="pct-label">0%</div>
      </div>
      <div class="progress-bar-bg"><div class="progress-bar-fill" id="prog-bar"></div></div>
      <div class="progress-status" id="prog-status">Complete the steps below to track your readiness</div>
    </div>
    <div class="checklist-steps">${stepsHTML}</div>
  </section>`;

  // ── MODALS HTML ──────────────────────────────────────────
  const modalsHTML = `

  <!-- VISA MODAL -->
  <div class="modal-overlay" id="visa-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">📋 Visa Guide · 签证</div>
        <div class="modal-subtitle">Select your nationality to see your exact options</div></div>
        <button class="modal-close" onclick="closeModal('visa-modal')">×</button>
      </div>
      <div class="modal-body">
        <input class="nationality-search" id="visa-search" placeholder="Type your country..." oninput="filterCountries()"/>
        <div class="country-list" id="country-list">
          <div class="country-btn" onclick="showVisa(this,'us')">🇺🇸 USA</div>
          <div class="country-btn" onclick="showVisa(this,'uk')">🇬🇧 UK</div>
          <div class="country-btn" onclick="showVisa(this,'au')">🇦🇺 Australia</div>
          <div class="country-btn" onclick="showVisa(this,'de')">🇩🇪 Germany</div>
          <div class="country-btn" onclick="showVisa(this,'fr')">🇫🇷 France</div>
          <div class="country-btn" onclick="showVisa(this,'ca')">🇨🇦 Canada</div>
          <div class="country-btn" onclick="showVisa(this,'sg')">🇸🇬 Singapore</div>
          <div class="country-btn" onclick="showVisa(this,'jp')">🇯🇵 Japan</div>
          <div class="country-btn" onclick="showVisa(this,'kr')">🇰🇷 South Korea</div>
          <div class="country-btn" onclick="showVisa(this,'nz')">🇳🇿 New Zealand</div>
          <div class="country-btn" onclick="showVisa(this,'it')">🇮🇹 Italy</div>
          <div class="country-btn" onclick="showVisa(this,'es')">🇪🇸 Spain</div>
          <div class="country-btn" onclick="showVisa(this,'nl')">🇳🇱 Netherlands</div>
          <div class="country-btn" onclick="showVisa(this,'se')">🇸🇪 Sweden</div>
          <div class="country-btn" onclick="showVisa(this,'ch')">🇨🇭 Switzerland</div>
          <div class="country-btn" onclick="showVisa(this,'br')">🇧🇷 Brazil</div>
          <div class="country-btn" onclick="showVisa(this,'in')">🇮🇳 India</div>
          <div class="country-btn" onclick="showVisa(this,'za')">🇿🇦 South Africa</div>
        </div>
        <div class="visa-result" id="visa-result"></div>
        <div class="visa-free-section">
          <div class="vf-title">🌟 144-Hour Visa-Free Transit — Eligible Countries Include:</div>
          <div class="vf-grid">
            <div class="vf-item">🇺🇸 United States</div><div class="vf-item">🇬🇧 United Kingdom</div>
            <div class="vf-item">🇩🇪 Germany</div><div class="vf-item">🇫🇷 France</div>
            <div class="vf-item">🇦🇺 Australia</div><div class="vf-item">🇨🇦 Canada</div>
            <div class="vf-item">🇮🇹 Italy</div><div class="vf-item">🇪🇸 Spain</div>
            <div class="vf-item">🇯🇵 Japan</div><div class="vf-item">🇰🇷 South Korea</div>
            <div class="vf-item">🇳🇱 Netherlands</div><div class="vf-item">🇸🇪 Sweden</div>
          </div>
          <p style="font-size:11px;color:var(--text-muted);margin-top:10px">
            Must have onward ticket to a 3rd country. Valid in Beijing, Shanghai, Guangzhou, Chengdu + more cities.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- SIM MODAL -->
  <div class="modal-overlay" id="sim-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">📶 SIM Card & eSIM · 手机卡</div>
        <div class="modal-subtitle">Stay connected from the moment you land</div></div>
        <button class="modal-close" onclick="closeModal('sim-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-note" style="margin-bottom:16px">
          <strong>⚠️ Important:</strong> Many hotels require a local Chinese phone number for
          check-in and booking confirmations. Getting a SIM or eSIM is highly recommended.
        </div>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-title">📲 eSIM</div>
            <ul class="info-list">
              <li>Best for: Stay 5–15 days. Need chat, maps, social media. Don't need a Chinese number. Want to skip airport queues &amp; set up before flying.</li>
              <li>Where to buy: Nomad, Airalo, Holafly, Trip.com, China Unicom International — buy before flying</li>
              <li>How to set up: Buy online → scan QR code → activate → works the moment you land ✅</li>
              <li>Cost: (example) Nomad 30-day plan — 10GB for ~¥100 ($13 USD)</li>
              <li>⚠️ Note: Dial *#06# — if it shows EID → eSIM compatible ✅</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">💳 Physical SIM Card</div>
            <ul class="info-list">
              <li>Best for: Stay 2+ weeks. Need a real China number for app registration, bank codes, hotel check-in. Making local calls/texts.</li>
              <li>Where to buy: China Mobile / China Unicom / China Telecom counters at all major airports, or carrier shops in the city</li>
              <li>How to set up: Bring passport (required by law) → choose plan at counter</li>
              <li>Cost: (example) 30-day plan — 80GB data + 300 mins calls for ~¥250 ($35 USD)</li>
              <li>⚠️ Note: Passport is required to register a Chinese SIM card.</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">📡 Pocket WiFi</div>
            <ul class="info-list">
              <li>Best for: Backup if SIM doesn't work or you want to share data with companions.</li>
              <li>Where to buy: Rent at airport counter or pre-book online</li>
              <li>How to set up: Pick up at airport. Return at end of trip — may need refundable deposit.</li>
              <li>Cost: ~$4 USD per day</li>
              <li>⚠️ Note: Best when you always stay with companions. Not ideal solo.</li>
            </ul>
          </div>
        </div>
        <div class="modal-note" style="margin-top:14px">
          💡 <strong>Kat's tip:</strong> eSIM on Nomad or Airalo for trips under 2 weeks.
          If you're staying longer or need a local number for apps, get a China Mobile SIM —
          best nationwide coverage.
        </div>
      </div>
    </div>
  </div>

  <!-- PAYMENT MODAL -->
  <div class="modal-overlay" id="payment-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">💳 Payments in China · 支付</div>
        <div class="modal-subtitle">China is almost entirely cashless — here's how to survive</div></div>
        <button class="modal-close" onclick="closeModal('payment-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-note" style="margin-bottom:16px">
          <strong>The reality:</strong> Even tiny street food stalls only accept QR code payments.
          No Alipay or WeChat Pay = real trouble. My friend literally couldn't pay for her meal.
          Set this up at home.
        </div>
        <div class="app-list">
          <div class="app-item">
            <div class="app-icon-box">💳</div>
            <div><div class="app-name">Alipay 支付宝 — Priority #1</div>
            <div class="app-desc">Now officially supports foreign Visa/Mastercard/Amex directly.
              Download, register, link your card. Used everywhere — restaurants, taxis, markets,
              convenience stores.</div>
            <div class="app-tip">✅ Use the International version. Settings → Bank Cards.
              Do this BEFORE arriving.</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">💬</div>
            <div><div class="app-name">WeChat Pay 微信支付</div>
            <div class="app-desc">Built into WeChat. Also supports foreign cards.
              Set it up as backup while setting up WeChat anyway.</div>
            <div class="app-tip">✅ There are so many mini programs in WeChat too!</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">💵</div>
            <div><div class="app-name">Cash (Backup)</div>
            <div class="app-desc">Bring ¥500–1000 RMB as emergency backup. Some older vendors,
              temples, and rural areas still prefer cash. Exchange at Bank of China for best rates.</div>
            <div class="app-tip">⚠️ Notify your home bank before travel to prevent card blocks
              at ATMs (ATMs with UnionPay/Visa logos work for foreign cards).</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- NETWORK MODAL -->
  <div class="modal-overlay" id="network-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">🌐 Firewall & VPN · 网络</div>
        <div class="modal-subtitle">What's blocked in China and how to stay connected</div></div>
        <button class="modal-close" onclick="closeModal('network-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-note" style="margin-bottom:16px">
          <strong>Why are apps blocked?</strong> China operates the "Great Firewall" — a national
          internet filter. Google, Instagram, WhatsApp, Facebook, YouTube are blocked by government
          policy.
        </div>
        <div class="app-list">
          <div class="app-item">
            <div class="app-icon-box">🚫</div>
            <div><div class="app-name">What doesn't work in China</div>
            <div class="app-desc">Google (Search, Maps, Gmail, YouTube), Instagram, Facebook,
              WhatsApp, Twitter/X, Snapchat, most news websites, Spotify, Netflix, and many
              Western services.</div>
            <div class="app-tip">⚠️ Even some hotel WiFis are filtered.</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">🔐</div>
            <div><div class="app-name">VPN — The Golden Rule</div>
            <div class="app-desc">Download and TEST your VPN BEFORE flying. Once in China, the
              App Store and Play Store are filtered and you cannot easily download VPN apps.
              This is the #1 mistake first-timers make.</div>
            <div class="app-tip">Free VPNs almost never work reliably.</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">✅</div>
            <div><div class="app-name">What you can use instead</div>
            <div class="app-desc">Amap/Gaode (Google Maps) · Dianping (Yelp/TripAdvisor) ·
              Bilibili (YouTube) · Baidu (Google) · WeChat (WhatsApp + everything)</div>
            <div class="app-tip">✅ All Chinese apps work perfectly without any VPN.</div></div>
          </div>
        </div>
        <div class="modal-note" style="margin-top:14px">
          ⚖️ <strong>Legal note:</strong> VPN use by tourists is a gray area. Millions of tourists
          use them every year without issue. Use for personal access only.
        </div>
      </div>
    </div>
  </div>

  <!-- APPS MODAL -->
  <div class="modal-overlay" id="apps-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">📱 Essential Apps · 必备APP</div>
        <div class="modal-subtitle">Download these 6 before you fly — they run your entire trip</div></div>
        <button class="modal-close" onclick="closeModal('apps-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="app-list">
          <div class="app-item">
            <div class="app-icon-box">💬</div>
            <div><div class="app-name">WeChat 微信 — Everything App</div>
            <div class="app-desc">Messaging, payments, mini-programs, food ordering, maps.
              Without WeChat, China is very hard. Set it up before arrival and link a payment method.</div>
            <div class="app-tip">✅ Register with your phone number (non-Chinese numbers work!).
              Add your Chinese friends so they can show you around.</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">💳</div>
            <div><div class="app-name">Alipay 支付宝 — Pay for Everything</div>
            <div class="app-desc">China's dominant payment platform. Foreign cards now accepted.
              Street food, taxis, supermarkets — all QR code.</div>
            <div class="app-tip">✅ Link your Visa/Mastercard in Settings. Do this BEFORE you arrive.</div>
            <!-- ✏️ Add your YouTube tutorial link here when ready:
            <a href="https://youtube.com/YOUR_VIDEO_ID" target="_blank" class="yt-link">▶ Watch: How to set up Alipay</a> -->
            </div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">🚗</div>
            <div><div class="app-name">Didi 滴滴 — China's Uber</div>
            <div class="app-desc">Works in English. No language barrier. Much cheaper than taxis.
              Book in the app, the driver comes to you — no hailing required.</div>
            <div class="app-tip">🔑 Kat's hack: send driver a <strong>photo</strong> of your
              location + paste "我是外国人，不会讲中文" (I'm a foreigner, I can't speak Mandarin)</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">🗺️</div>
            <div><div class="app-name">Amap 高德地图 — Navigation</div>
            <div class="app-desc">Google Maps doesn't work well in China. Amap (Gaode) is the
              most accurate map, has an English mode and works offline.</div>
            <div class="app-tip">✅ Switch to English in Settings. Download city maps offline
              before exploring.</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">🍜</div>
            <div><div class="app-name">大众点评 Dianping — Where to Eat</div>
            <div class="app-desc">China's version of Yelp + TripAdvisor. Every restaurant, café,
              and attraction rated and reviewed. Filter by "foreigner-friendly" or "English menu".</div>
            <div class="app-tip">✅ Best way to find local spots tourists never discover.</div></div>
          </div>
          <div class="app-item">
            <div class="app-icon-box">🚆</div>
            <div><div class="app-name">Trip.com (携程) — Book Everything</div>
            <div class="app-desc">Trains, flights, hotels all in one English-language app.
              Supports foreign payment cards.</div>
            <div class="app-tip">✅ Book high-speed rail here — most reliable way as a foreigner.</div></div>
          </div>
        </div>
        <div class="modal-note" style="margin-top:14px">
          🔤 <strong>For translation:</strong> Google Translate (with offline Chinese downloaded)
          works well for text and camera translation. Baidu Translate is a solid local alternative.
          Use Papago for photo translation (menus, signs).
        </div>
      </div>
    </div>
  </div>

  <!-- TRANSPORT MODAL -->
  <div class="modal-overlay" id="transport-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">🚄 Getting Around China · 交通</div>
        <div class="modal-subtitle">The world's best rail network, easy metro, and Didi for taxis</div></div>
        <button class="modal-close" onclick="closeModal('transport-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-title">🚄 High-Speed Rail</div>
            <ul class="info-list">
              <li>World's best rail system — try it between cities!</li>
              <li>Beijing → Shanghai: 4.5 hours (vs 1.5hr flight + 3hr airport process)</li>
              <li>Book on Trip.com or 12306 app with your passport number</li>
              <li>G trains = fastest, D trains = fast, C = city rail</li>
              <li>Bring your passport to collect tickets at the station</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">🚇 Metro</div>
            <ul class="info-list">
              <li>Every major city has modern, cheap metro</li>
              <li>Machines usually have English — easy to use</li>
              <li>Or scan QR code in WeChat/Alipay at gates</li>
              <li>¥3–15 per journey — extremely affordable</li>
              <li>Covers all tourist spots in major cities</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">🚗 Didi (Taxi App)</div>
            <ul class="info-list">
              <li>Like Uber — book in the app, no language needed</li>
              <li>Very affordable: ¥20–40 for most city rides</li>
              <li>Also: 曹操出行, 花小猪 (cheaper alternatives)</li>
              <li>Never use unlicensed taxis at airports!</li>
              <li><strong>Screenshot your hotel name in Chinese and show to your driver!</strong></li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">✈️ Domestic Flights</div>
            <ul class="info-list">
              <li>Best for very long distances (Beijing → Yunnan)</li>
              <li>Book on Trip.com — English support</li>
              <li>Arrive 2 hours early — security is thorough</li>
              <li>Budget airlines: Xiamen Air, Shenzhen Airlines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- EMERGENCY MODAL -->
  <div class="modal-overlay" id="emergency-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">🆘 Emergency Numbers · 紧急电话</div>
        <div class="modal-subtitle">Screenshot this and save it before you travel</div></div>
        <button class="modal-close" onclick="closeModal('emergency-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-note" style="margin-bottom:16px">
          📱 Save these in your phone contacts before you land. If you have a Chinese number
          but struggle with Mandarin, you can send an emergency SMS to <strong>12110</strong> (police).
        </div>
        <div class="emergency-grid">
          <div class="emergency-card"><div class="emg-num">👮 110</div><div class="emg-title">Police</div><div class="emg-desc">Theft, physical attack, or any situation threatening personal safety. Available 24/7. Can also SMS 12110 if you struggle with Mandarin.</div></div>
          <div class="emergency-card"><div class="emg-num">🚑 120</div><div class="emg-title">Ambulance</div><div class="emg-desc">State your condition and exact location clearly. A single ambulance trip can cost $20–55 USD — travel insurance is strongly recommended!</div></div>
          <div class="emergency-card"><div class="emg-num">🔥 119</div><div class="emg-title">Fire</div><div class="emg-desc">Dial immediately in case of fire. Stay calm and provide your exact address for a quick response.</div></div>
          <div class="emergency-card"><div class="emg-num">🚗 122</div><div class="emg-title">Traffic Accident</div><div class="emg-desc">Call 122 for collisions on city roads. Dial 12122 for accidents on expressways or highways.</div></div>
          <div class="emergency-card"><div class="emg-num">🌍 12308</div><div class="emg-title">Foreign Affairs</div><div class="emg-desc">For foreigners: lost passport, detention, or any serious situation requiring consular support from the Ministry of Foreign Affairs.</div></div>
          <div class="emergency-card"><div class="emg-num">📋 12367</div><div class="emg-title">Visa &amp; Immigration</div><div class="emg-desc">Visa issues, entry/exit policy questions, residency permits, or immigration matters.</div></div>
        </div>
        <div class="modal-note" style="margin-top:14px">
          🏥 <strong>International hospitals</strong> with English-speaking staff exist in Beijing,
          Shanghai, Chengdu and major cities. Kat strongly recommends purchasing travel insurance
          that covers medical evacuation.
        </div>
      </div>
    </div>
  </div>

  <!-- CUSTOMS MODAL -->
  <div class="modal-overlay" id="customs-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">🛃 Arrival Card &amp; Immigration · 入关</div>
        <div class="modal-subtitle">What to expect when you land in China</div></div>
        <button class="modal-close" onclick="closeModal('customs-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-note" style="margin-bottom:16px">
          📝 <strong>Arrival Card tip:</strong> You can fill in the arrival card online
          <strong>within 3 days before landing</strong> in China — saves time at immigration.
          Search "中国入境卡网上填报" or check with your airline at check-in.
        </div>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-title">✈️ On the Plane</div>
            <ul class="info-list">
              <li>Fill in Arrival Card — given on plane or do online in advance</li>
              <li>Have your hotel address (in Chinese if possible) &amp; phone number ready</li>
              <li>Have your return/onward ticket accessible</li>
              <li>Could have ¥500 RMB cash as backup</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">🛂 At Immigration</div>
            <ul class="info-list">
              <li>Join "Foreigners" queue (外国人通道)</li>
              <li>Fingerprints and photo taken — routine, stay calm</li>
              <li>Show: passport, arrival card, hotel booking and maybe flight tickets</li>
              <li>If asked purpose: "Tourism" (旅游 lǚ yóu), "Business Trip" (出差 chū chāi)</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">🧳 Customs</div>
            <ul class="info-list">
              <li>Use green "Nothing to Declare" channel if applicable</li>
              <li>Limit: ¥5000 RMB cash without declaration</li>
              <li>No fresh fruit, meat, or dairy from abroad</li>
              <li>Personal electronics are fine (power bank must carry CCC mark)</li>
            </ul>
          </div>
          <div class="info-card">
            <div class="info-card-title">🚕 Leaving the Airport</div>
            <ul class="info-list">
              <li>Use Didi from arrivals — much cheaper than airport taxis</li>
              <li>Metro available at most major airports</li>
              <li>Airport Express train/bus in some places</li>
              <li>Having hotel address in Chinese on your phone is highly recommended!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  // ── INJECT INTO PAGE ─────────────────────────────────────
  document.getElementById('ready-container').innerHTML = sectionHTML;
  document.getElementById('ready-modals-container').innerHTML = modalsHTML;

  // Re-attach modal overlay close listeners for newly injected modals
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', function(e) {
      if (e.target === this) closeModal(this.id);
    });
  });
}

loadGetReady();