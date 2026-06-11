// ============================================================
//  assets/community.js — Community section component
//
//  HOW TO EDIT:
//  • Change heading/subtext → edit section-title and section-sub
//  • Change coming soon text → edit comm-title and comm-sub
//  • Change email address    → edit the mailto link
//  • This is a full section, not a modal
// ============================================================

function loadCommunity() {
  const html = `
  <section class="section" id="community-section">
    <div class="section-eyebrow">Community · 旅行者社区</div>
    <h2 class="section-title">Real tips from real travelers</h2>
    <p class="section-sub">A space for foreigners who've been to China to share honest
      advice — and for Katherine to post real China updates, news, and local tips.</p>
    <div class="community-coming">
      <div class="comm-icon">🏮</div>
      <div class="comm-title">Community is on its way!</div>
      <div class="comm-sub">I will be posting regular updates: what's new in China,
        seasonal travel tips, visa policy changes, and real stories from travelers
        like you. Leave your email to be first in.</div>
      <form action="https://formspree.io/f/mnjypvzn" method="POST"
        style="display:flex;flex-direction:column;align-items:center;gap:12px"
        onsubmit="handleCommunityForm(event)">
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <input class="comm-input" type="email" name="email"
            placeholder="your@email.com" required/>
          <button class="comm-btn" type="submit">Notify Me</button>
        </div>
        <p style="font-size:11px;color:var(--text-muted)">
          Katherine will email you personally when community launches 🏮
        </p>
      </form>
      <div id="comm-success" style="display:none;font-size:13px;color:var(--gold);margin-top:12px">
        ✅ You're on the list! Katherine will be in touch.
      </div>
      <div style="margin-top:20px;font-size:12px;color:var(--text-muted)">
        Or reach Katherine directly:
        <a href="mailto:katherine011004@gmail.com" style="color:var(--accent)">
          katherine011004@gmail.com
        </a>
      </div>
    </div>
  </section>`;

  document.getElementById('community-container').innerHTML = html;
}

// Handles the form submission silently (no page reload)
function handleCommunityForm(e) {
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(r => {
    if (r.ok) {
      form.style.display = 'none';
      document.getElementById('comm-success').style.display = 'block';
    }
  });
}

loadCommunity();