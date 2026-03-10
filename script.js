/* ═══════════════════════════════════════════
   ALEXANDRE LEMES — CLIENT PORTAL
   script.js
═══════════════════════════════════════════ */

// ── EASY-EDIT VARIABLES ──────────────────────────────────────
const projectProgress   = 30;           // 0–100
const VALID_CLIENT_ID   = 'CLP-2026-01';
const VALID_ACCESS_CODE = 'PADROEIRA2026';
const VERIFY_CODE       = 'CLP-2026-OK';
const COUNTDOWN_HOURS   = 23;           // starting hours for countdown
const COUNTDOWN_MINUTES = 59;
const COUNTDOWN_SECONDS = 0;
// ─────────────────────────────────────────────────────────────

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const logged   = localStorage.getItem('clientLogged') === 'true';
  const unlocked = localStorage.getItem('projectUnlocked') === 'true';

  if (logged) {
    showDashboard(unlocked);
  } else {
    showLogin();
  }
});

/* ── LOGIN ── */
function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboard').style.display   = 'none';
  document.getElementById('logoutBtn').style.display   = 'none';
}

function handleLogin() {
  const clientId = document.getElementById('inputClientId').value.trim();
  const code     = document.getElementById('inputCode').value.trim();
  const errEl    = document.getElementById('loginError');

  if (!clientId || !code) {
    errEl.textContent = '⚠ Please fill in all fields.';
    return;
  }

  if (clientId === VALID_CLIENT_ID && code === VALID_ACCESS_CODE) {
    errEl.textContent = '';
    localStorage.setItem('clientLogged', 'true');
    const unlocked = localStorage.getItem('projectUnlocked') === 'true';
    showDashboard(unlocked);
  } else {
    errEl.textContent = '✕ Invalid credentials. Please try again.';
    document.getElementById('inputCode').value = '';
  }
}

// Allow Enter key on login fields
['inputClientId', 'inputCode'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
});

/* ── DASHBOARD ── */
function showDashboard(unlocked) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display   = 'block';
  document.getElementById('logoutBtn').style.display   = 'inline-block';

  // Progress bar
  const pct = Math.max(0, Math.min(100, projectProgress));
  document.getElementById('progressPct').textContent = pct + '%';
  setTimeout(() => {
    document.getElementById('progressBar').style.width = pct + '%';
  }, 200);

  // Unlock state
  if (unlocked) applyUnlockedState(false);

  // Countdown
  initCountdown();
}

/* ── LOGOUT ── */
function handleLogout() {
  localStorage.removeItem('clientLogged');
  showLogin();
}

/* ── PAYMENT MODAL ── */
function openPaymentModal() {
  resetModal();
  document.getElementById('paymentModal').classList.add('open');
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('paymentModal')) {
    closePaymentModal();
  }
}

function resetModal() {
  showModalStep(1);
  document.getElementById('verifyInput').value = '';
  document.getElementById('verifyError').textContent = '';
}

function showModalStep(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById('modalStep' + i).style.display = i === n ? 'block' : 'none';
  });
}

function showStep2() {
  showModalStep(2);
}

/* ── VERIFICATION ── */
function handleVerification() {
  const code  = document.getElementById('verifyInput').value.trim();
  const errEl = document.getElementById('verifyError');

  if (!code) {
    errEl.textContent = '⚠ Please enter a verification code.';
    return;
  }

  if (code === VERIFY_CODE) {
    errEl.textContent = '';
    localStorage.setItem('projectUnlocked', 'true');
    showModalStep(3);
  } else {
    errEl.textContent = '✕ Invalid code. Please check and try again.';
    document.getElementById('verifyInput').value = '';
  }
}

document.getElementById('verifyInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleVerification();
});

function closeAndUnlock() {
  closePaymentModal();
  applyUnlockedState(true);
}

/* ── APPLY UNLOCKED STATE ── */
function applyUnlockedState(animate) {
  // Payment section
  document.getElementById('paymentActions').style.display = 'none';
  document.getElementById('paymentUnlocked').style.display = 'block';

  // Status pill
  const pill = document.getElementById('statusPill');
  pill.textContent = 'Active — Unlocked';
  pill.classList.add('unlocked');

  // System bar status
  document.getElementById('sysbarStatus').textContent = 'Active';
  document.getElementById('sysbarStatus').style.color = '#00e5a0';

  // Files
  document.getElementById('filesNote').textContent = 'Files available for download.';
  ['1', '2'].forEach(n => {
    document.getElementById('fileLock' + n).textContent = '⬇';
    const item = document.getElementById('fileItem' + n);
    item.classList.add('unlocked-file');
    item.style.color = 'var(--text-primary)';
    item.querySelector('.file-name').style.color = 'var(--text-primary)';
  });

  if (animate) {
    // subtle flash
    document.getElementById('dashboard').style.transition = 'opacity 0.3s';
    document.getElementById('dashboard').style.opacity = '0.6';
    setTimeout(() => {
      document.getElementById('dashboard').style.opacity = '1';
    }, 300);
  }
}

/* ── COUNTDOWN TIMER ── */
function initCountdown() {
  // Use localStorage to persist end time across refreshes
  let endTime = localStorage.getItem('countdownEnd');

  if (!endTime) {
    const now = Date.now();
    const duration =
      (COUNTDOWN_HOURS * 3600 + COUNTDOWN_MINUTES * 60 + COUNTDOWN_SECONDS) * 1000;
    endTime = now + duration;
    localStorage.setItem('countdownEnd', endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  function tick() {
    const remaining = endTime - Date.now();

    if (remaining <= 0) {
      document.getElementById('cdHours').textContent = '00';
      document.getElementById('cdMins').textContent  = '00';
      document.getElementById('cdSecs').textContent  = '00';
      return;
    }

    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);

    document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
    document.getElementById('cdMins').textContent  = String(m).padStart(2, '0');
    document.getElementById('cdSecs').textContent  = String(s).padStart(2, '0');

    setTimeout(tick, 1000);
  }

  tick();
}