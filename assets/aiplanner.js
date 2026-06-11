// ============================================================
//  assets/planner.js — AI Planner modal component
//
//  HOW TO EDIT:
//  • Change coming soon text  → edit planner-h and planner-p
//  • Add/remove feature items → edit the feat-item divs
//  • Change email notify      → plannerNotify() at the bottom
// ============================================================

function loadPlanner() {
  const html = `
  <div class="modal-overlay" id="planning-modal">
    <div class="modal-box" style="max-width:540px">
      <div class="modal-header">
        <div>
          <div class="modal-title">🤖 AI Trip Planner · 智能行程</div>
          <div class="modal-subtitle">Your perfect China itinerary, generated in seconds</div>
        </div>
        <button class="modal-close" onclick="closeModal('planning-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="planner-teaser">
          <div class="planner-icon">✨</div>
          <div class="planner-h">Coming Soon — Your dream China trip, planned by AI</div>
          <div class="planner-p">Tell me your budget, how many days, the season you're
            visiting, and what you love — and I'll generate a complete personalized
            itinerary with routes, food spots, and local gems.</div>
          <div class="feature-list">
            <div class="feat-item"><span class="feat-icon">🗓️</span>Choose your days &amp; season</div>
            <div class="feat-item"><span class="feat-icon">💸</span>Budget, mid-range or luxury versions</div>
            <div class="feat-item"><span class="feat-icon">❤️</span>Pick your interests: food · history · nature · nightlife</div>
            <div class="feat-item"><span class="feat-icon">🚄</span>Optimized routes between cities</div>
            <div class="feat-item"><span class="feat-icon">📥</span>Export &amp; share with your travel group</div>
          </div>
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">
            Be first to know when it launches 👇
          </p>
          <div class="notify-row">
            <input class="notify-input" id="plan-email" type="email" placeholder="your@email.com"/>
            <button class="notify-btn" onclick="plannerNotify()">Notify Me</button>
          </div>
          <div class="notify-ok" id="plan-ok">🎉 Amazing! You're on the list.</div>
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('planner-container').innerHTML = html;
}

loadPlanner();