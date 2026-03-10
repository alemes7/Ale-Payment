/* ═══════════════════════════════════════════
   ALEXANDRE LEMES — CLIENT PORTAL
   script.js
═══════════════════════════════════════════ */

// ── EASY-EDIT VARIABLES ──────────────────────────────────────
const projectProgress   = 10;            // 0–100
const VALID_CLIENT_ID   = 'CLP-2026-01';
const VALID_ACCESS_CODE = 'PADROEIRA2026';
const VERIFY_CODE       = 'CLP-2026-OK';
const COUNTDOWN_HOURS   = 23;
const COUNTDOWN_MINUTES = 59;
const COUNTDOWN_SECONDS = 0;
const WHATSAPP_NUMBER   = '5511950702678'; // ← replace with real number
const WHATSAPP_MESSAGE  = 'Hello Alexandre, I completed the payment for the Corrida da Padroeira project and I need the verification code.';
// ─────────────────────────────────────────────────────────────

/* ══════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════ */
const i18n = {
  en: {
    sysClientId:      'CLIENT ID',
    sysStatus:        'STATUS',
    sysGenerated:     'GENERATED',
    statusPending:    'Pending Payment',
    statusActive:     'Active',
    loginTitle:       'Secure Access',
    loginSub:         'Enter your credentials to access the project portal.',
    labelClientId:    'Client ID',
    labelAccessCode:  'Access Code',
    btnAccess:        'Access Portal',
    errFill:          '⚠ Please fill in all fields.',
    errCreds:         '✕ Invalid credentials. Please try again.',
    dashLabel:        'Client Project Dashboard',
    cardStatus:       'Project Status',
    statusInDev:      'In Development',
    statusUnlocked:   'Active — Unlocked',
    statValue:        'Project Value',
    statPayment:      'Initial Payment Required',
    cardCountdown:    'Project reservation time remaining',
    cardDelivery:     'Project Delivery Deadline',
    cdHours:          'Hours',
    cdMins:           'Minutes',
    cdSecs:           'Seconds',
    deliveryText:     'Estimated completion time',
    deliveryDays:     'days',
    cardProgress:     'Project Progress',
    cardDeliverables: 'Deliverables',
    badgeInProgress:  'In Progress',
    badgePending:     'Pending',
    badgeDone:        'Completed',
    del1:             'Running shirt design',
    del2:             'Visual identity concept',
    del3:             'Presentation media',
    cardPayment:      'Payment',
    paymentApproved:  '✔ Payment Approved — Project Unlocked',
    paymentInfo:      'Make the initial payment of <strong>R$100</strong> via PIX to unlock the project and begin development.',
    btnUnlock:        'Unlock Project',
    cardFiles:        'Project Files',
    filesLocked:      'Files will be available after payment verification.',
    filesUnlocked:    'Files available for download.',
    modalPixTitle:    'PIX Payment',
    modalPixsubtitle: 'Key PIX is Email-Based',
    pixRecipient:     'Recipient',
    pixEmail:         'Email',
    pixAmount:        'Amount',
    pixRef:           'Reference',
    btnPayDone:       'I have completed the payment',
    modalVerifyTitle: 'Payment Under Verification',
    modalVerifyTime:  'Estimated verification time: <strong>30 minutes</strong>',
    modalVerifySub:   'If you have a verification code, enter it below to unlock immediately.',
    labelVerify:      'Verification Code',
    btnVerify:        'Verify Code',
    btnWhatsApp:      "I don't have the verification code yet",
    errVerifyEmpty:   '⚠ Please enter a verification code.',
    errVerifyWrong:   '✕ Invalid code. Please check and try again.',
    modalApprovedTitle:'Payment Approved',
    modalApprovedSub: 'Project Unlocked. Thank you!',
    btnDashboard:     'Go to Dashboard',
    logout:           'Logout',
    themeLight:       '☀',
    themeDark:        '🌙',
  },
  pt: {
    sysClientId:      'ID DO CLIENTE',
    sysStatus:        'STATUS',
    sysGenerated:     'GERADO',
    statusPending:    'Aguardando Pagamento',
    statusActive:     'Ativo',
    loginTitle:       'Acesso Seguro',
    loginSub:         'Insira suas credenciais para acessar o portal do projeto.',
    labelClientId:    'ID do Cliente',
    labelAccessCode:  'Código de Acesso',
    btnAccess:        'Acessar Portal',
    errFill:          '⚠ Por favor, preencha todos os campos.',
    errCreds:         '✕ Credenciais inválidas. Tente novamente.',
    dashLabel:        'Painel do Projeto',
    cardStatus:       'Status do Projeto',
    statusInDev:      'Em Desenvolvimento',
    statusUnlocked:   'Ativo — Desbloqueado',
    statValue:        'Valor do Projeto',
    statPayment:      'Pagamento Inicial Necessário',
    cardCountdown:    'Tempo restante de reserva do projeto',
    cardDelivery:     'Prazo de Entrega do Projeto',
    cdHours:          'Horas',
    cdMins:           'Minutos',
    cdSecs:           'Segundos',
    deliveryText:     'Prazo estimado de conclusão',
    deliveryDays:     'dias',
    cardProgress:     'Progresso do Projeto',
    cardDeliverables: 'Entregas',
    badgeInProgress:  'Em Andamento',
    badgePending:     'Pendente',
    badgeDone:        'Concluído',
    del1:             'Design da camiseta de corrida',
    del2:             'Conceito de identidade visual',
    del3:             'Mídia de apresentação',
    cardPayment:      'Pagamento',
    paymentApproved:  '✔ Pagamento Aprovado — Projeto Desbloqueado',
    paymentInfo:      'Faça o pagamento inicial de <strong>R$100</strong> via PIX para desbloquear o projeto e iniciar o desenvolvimento.',
    btnUnlock:        'Desbloquear Projeto',
    cardFiles:        'Arquivos do Projeto',
    filesLocked:      'Os arquivos estarão disponíveis após a verificação do pagamento.',
    filesUnlocked:    'Arquivos disponíveis para download.',
    modalPixTitle:    'Pagamento PIX',
    modalPixsubtitle: 'Chave PIX é o Email',
    pixRecipient:     'Destinatário',
    pixEmail:         'Email',
    pixAmount:        'Valor',
    pixRef:           'Referência',
    btnPayDone:       'Já realizei o pagamento',
    modalVerifyTitle: 'Pagamento em Verificação',
    modalVerifyTime:  'Tempo estimado de verificação: <strong>30 minutos</strong>',
    modalVerifySub:   'Se você tiver um código de verificação, insira abaixo para desbloquear imediatamente.',
    labelVerify:      'Código de Verificação',
    btnVerify:        'Verificar Código',
    btnWhatsApp:      'Ainda não tenho o código de verificação',
    errVerifyEmpty:   '⚠ Por favor, insira o código de verificação.',
    errVerifyWrong:   '✕ Código inválido. Verifique e tente novamente.',
    modalApprovedTitle:'Pagamento Aprovado',
    modalApprovedSub: 'Projeto Desbloqueado. Obrigado!',
    btnDashboard:     'Ir para o Painel',
    logout:           'Sair',
    themeLight:       '☀',
    themeDark:        '🌙',
  }
};

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let currentLang  = localStorage.getItem('portalLang')  || 'en';
let currentTheme = localStorage.getItem('portalTheme') || 'dark';
let countdownInterval = null;

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme, false);
  applyLang(currentLang);

  const logged   = localStorage.getItem('clientLogged')    === 'true';
  const unlocked = localStorage.getItem('projectUnlocked') === 'true';

  if (logged) {
    showDashboard(unlocked);
  } else {
    showLogin();
  }
});

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
function toggleTheme() {
  const next = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
}

function applyTheme(theme, save) {
  currentTheme = theme;
  document.body.classList.toggle('theme-light', theme === 'light');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark'
    ? i18n[currentLang].themeLight
    : i18n[currentLang].themeDark;
  if (save) localStorage.setItem('portalTheme', theme);
}

/* ══════════════════════════════════════════
   LANGUAGE
══════════════════════════════════════════ */
function toggleLang() {
  const next = currentLang === 'en' ? 'pt' : 'en';
  applyLang(next);
  localStorage.setItem('portalLang', next);
}

function applyLang(lang) {
  currentLang = lang;
  const t = i18n[lang];

  // Toggle button label
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = lang === 'en' ? 'PT' : 'EN';

  // Theme button label
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.textContent = currentTheme === 'dark' ? t.themeLight : t.themeDark;

  // All elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Dynamic: sysbar status
  const unlocked = localStorage.getItem('projectUnlocked') === 'true';
  const sysStatus = document.getElementById('sysbarStatus');
  if (sysStatus) {
    sysStatus.textContent = unlocked ? t.statusActive : t.statusPending;
    sysStatus.style.color = unlocked ? '#00e5a0' : '';
  }

  // Dynamic: status pill
  const pill = document.getElementById('statusPill');
  if (pill) {
    pill.textContent = unlocked ? t.statusUnlocked : t.statusInDev;
  }

  // Dynamic: filesNote when unlocked
  const filesNote = document.getElementById('filesNote');
  if (filesNote && unlocked) filesNote.textContent = t.filesUnlocked;

  // Dynamic: countdown card title when unlocked
  if (unlocked) {
    const countdownTitle = document.getElementById('countdownCardTitle');
    if (countdownTitle) countdownTitle.textContent = t.cardDelivery;
    const daysSpan = document.querySelector('.delivery-days span');
    if (daysSpan) daysSpan.textContent = t.deliveryDays;
    const deliveryText = document.querySelector('.delivery-text');
    if (deliveryText) deliveryText.textContent = t.deliveryText;
  }

  document.documentElement.lang = lang;
}

/* ══════════════════════════════════════════
   LOGIN
══════════════════════════════════════════ */
function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboard').style.display   = 'none';
  document.getElementById('logoutBtn').style.display   = 'none';
}

function handleLogin() {
  const clientId = document.getElementById('inputClientId').value.trim();
  const code     = document.getElementById('inputCode').value.trim();
  const errEl    = document.getElementById('loginError');
  const t        = i18n[currentLang];

  if (!clientId || !code) { errEl.textContent = t.errFill; return; }

  if (clientId === VALID_CLIENT_ID && code === VALID_ACCESS_CODE) {
    errEl.textContent = '';
    localStorage.setItem('clientLogged', 'true');
    const unlocked = localStorage.getItem('projectUnlocked') === 'true';
    showDashboard(unlocked);
  } else {
    errEl.textContent = t.errCreds;
    document.getElementById('inputCode').value = '';
  }
}

document.getElementById('inputCode').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});

/* ══════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════ */
function showDashboard(unlocked) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display   = 'block';
  document.getElementById('logoutBtn').style.display   = 'inline-block';

  const pct = Math.max(0, Math.min(100, projectProgress));
  document.getElementById('progressPct').textContent = pct + '%';
  setTimeout(() => {
    document.getElementById('progressBar').style.width = pct + '%';
  }, 200);

  if (unlocked) {
    applyUnlockedState(false);
  } else {
    initCountdown();
  }

  applyLang(currentLang);
}

/* ══════════════════════════════════════════
   LOGOUT
══════════════════════════════════════════ */
function handleLogout() {
  localStorage.removeItem('clientLogged');
  showLogin();
}

/* ══════════════════════════════════════════
   PAYMENT MODAL
══════════════════════════════════════════ */
function openPaymentModal() {
  resetModal();
  document.getElementById('paymentModal').classList.add('open');
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('paymentModal')) closePaymentModal();
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

function showStep2() { showModalStep(2); }

/* ══════════════════════════════════════════
   VERIFICATION
══════════════════════════════════════════ */
function handleVerification() {
  const code  = document.getElementById('verifyInput').value.trim();
  const errEl = document.getElementById('verifyError');
  const t     = i18n[currentLang];

  if (!code) { errEl.textContent = t.errVerifyEmpty; return; }

  if (code === VERIFY_CODE) {
    errEl.textContent = '';
    localStorage.setItem('projectUnlocked', 'true');
    showModalStep(3);
  } else {
    errEl.textContent = t.errVerifyWrong;
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

/* ══════════════════════════════════════════
   WHATSAPP
══════════════════════════════════════════ */
function openWhatsApp() {
  const msg = encodeURIComponent(WHATSAPP_MESSAGE);
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
}

/* ══════════════════════════════════════════
   APPLY UNLOCKED STATE
══════════════════════════════════════════ */
function applyUnlockedState(animate) {
  const t = i18n[currentLang];

  // Stop countdown
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }

  // Swap countdown → delivery card
  const countdownDisplay = document.getElementById('countdownDisplay');
  const deliveryInfo     = document.getElementById('deliveryInfo');
  const countdownTitle   = document.getElementById('countdownCardTitle');

  if (countdownDisplay) countdownDisplay.style.display = 'none';
  if (deliveryInfo)     deliveryInfo.style.display     = 'block';
  if (countdownTitle) {
    countdownTitle.setAttribute('data-i18n', 'cardDelivery');
    countdownTitle.textContent = t.cardDelivery;
  }
  const daysSpan = document.querySelector('.delivery-days span');
  if (daysSpan) daysSpan.textContent = t.deliveryDays;
  const deliveryText = document.querySelector('.delivery-text');
  if (deliveryText) deliveryText.textContent = t.deliveryText;

  // Payment section
  document.getElementById('paymentActions').style.display  = 'none';
  document.getElementById('paymentUnlocked').style.display = 'block';

  // Status pill
  const pill = document.getElementById('statusPill');
  if (pill) { pill.textContent = t.statusUnlocked; pill.classList.add('unlocked'); }

  // Sysbar
  const sysStatus = document.getElementById('sysbarStatus');
  if (sysStatus) { sysStatus.textContent = t.statusActive; sysStatus.style.color = '#00e5a0'; }

  // Files
  const filesNote = document.getElementById('filesNote');
  if (filesNote) filesNote.textContent = t.filesUnlocked;

  ['1', '2'].forEach(n => {
    const lockEl = document.getElementById('fileLock' + n);
    if (lockEl) lockEl.textContent = '⬇';
    const item = document.getElementById('fileItem' + n);
    if (item) {
      item.classList.add('unlocked-file');
      item.style.color = 'var(--text-primary)';
      const nameEl = item.querySelector('.file-name');
      if (nameEl) nameEl.style.color = 'var(--text-primary)';
    }
  });

  if (animate) {
    const dash = document.getElementById('dashboard');
    dash.style.transition = 'opacity 0.3s';
    dash.style.opacity = '0.6';
    setTimeout(() => { dash.style.opacity = '1'; }, 300);
  }
}

/* ══════════════════════════════════════════
   COUNTDOWN TIMER
══════════════════════════════════════════ */
function initCountdown() {
  if (localStorage.getItem('projectUnlocked') === 'true') return;

  let endTime = localStorage.getItem('countdownEnd');
  if (!endTime) {
    const duration = (COUNTDOWN_HOURS * 3600 + COUNTDOWN_MINUTES * 60 + COUNTDOWN_SECONDS) * 1000;
    endTime = Date.now() + duration;
    localStorage.setItem('countdownEnd', endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  function tick() {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      ['cdHours','cdMins','cdSecs'].forEach(id => {
        document.getElementById(id).textContent = '00';
      });
      if (countdownInterval) clearInterval(countdownInterval);
      return;
    }
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
    document.getElementById('cdMins').textContent  = String(m).padStart(2, '0');
    document.getElementById('cdSecs').textContent  = String(s).padStart(2, '0');
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}