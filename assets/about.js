// ============================================================
//  assets/about.js — About Katherine modal component
//
//  HOW TO EDIT:
//  • Change bio text    → edit the about-story divs below
//  • Change name/flags  → edit about-name and about-flags
//  • Change email       → edit the mailto link
//  • Change stories     → edit the about-ex blocks
//
//  This file injects the modal into the page automatically.
//  Zero changes needed in index.html when you update content.
// ============================================================

function loadAbout() {
  const html = `
  <div class="modal-overlay" id="about-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div>
          <div class="modal-title">🙋‍♀️ About Katherine · 关于我</div>
          <div class="modal-subtitle">The person behind Ready? China!</div>
        </div>
        <button class="modal-close" onclick="closeModal('about-modal')">×</button>
      </div>
      <div class="modal-body" style="padding:0">
        <div class="about-card">
          <div class="about-top">
            <div class="about-avatar">🌏</div>
            <div class="about-intro">
              <div class="about-name">Hey, I'm Katherine!</div>
              <div class="about-role">Local Chinese · World Traveler · Your China Guide</div>
              <div class="about-flags">🇨🇳</div>
            </div>
          </div>
          <div class="about-body">
            <div class="about-story">
              Born in the Philippines, grew up between Hong Kong, Quanzhou China,
              studied in Australia and traveled around Australia, New Zealand and Asian
              countries — I've lived in many places and carry a little piece of all of them.<br><br>
              Now I'm back in China, and I keep inviting my friends to come visit me.
              The problem? Every single one of them panics when they start planning.
              "I don't know where to start." "Will I survive without Google?"
              "Can I actually pay for things?" "Is it safe?"<br><br>
              So I built this — a website I wish existed when my friends first asked me
              those questions. I'll be their guide, and yours too, step by step.
            </div>
            <div class="about-examples">
              <div class="about-ex">
                <div class="about-ex-icon">📶</div>
                <div class="about-ex-text">My Australian friend landed in Shanghai and spent
                  <strong>2 hours at the airport</strong> trying to get wifi. His phone had
                  no signal and he couldn't contact the hotel. He was stuck.</div>
              </div>
              <div class="about-ex">
                <div class="about-ex-icon">💳</div>
                <div class="about-ex-text">Another friend <strong>couldn't pay for dinner</strong>
                  — she thought credit cards worked everywhere. The restaurant only took
                  WeChat Pay. A stranger finally helped her. She was so embarrassed.</div>
              </div>
              <div class="about-ex">
                <div class="about-ex-icon">🗺️</div>
                <div class="about-ex-text">A third friend wanted to go somewhere "off the
                  tourist path" but had no idea where. She ended up following everyone to
                  Shanghai and Chengdu, missing <strong>so many hidden gems</strong>.</div>
              </div>
            </div>
            <div class="about-story" style="margin-bottom:16px">
              Traveling in China sounds difficult, but for you, my friends, I will be
              right here, guiding you through every step. You're not alone.
            </div>
            <div class="about-contact">
              <span>📧</span>
              <span>Questions? Stories? Just want to say hi? Email Katherine directly:
                <a href="mailto:katherine011004@gmail.com">katherine011004@gmail.com</a>
              </span>
            </div>
            <div class="about-hometown">Welcome to China! 🏮</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  // Inject into page — uses the placeholder div added to index.html
  document.getElementById('about-container').innerHTML = html;
}

// Run automatically when page loads
loadAbout();