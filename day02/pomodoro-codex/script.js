(() => {
  const STORAGE_KEY = 'moa-pomodoro-v1';
  const defaults = { focus: 25, short: 5, long: 15 };
  const names = { focus: '집중', short: '짧은 휴식', long: '긴 휴식' };
  const overlines = { focus: 'FOCUS SESSION', short: 'SHORT BREAK', long: 'LONG BREAK' };
  const $ = (selector) => document.querySelector(selector);
  const elements = {
    time: $('#time'), ring: $('#timer-ring'), caption: $('#timer-caption'), overline: $('#timer-overline'),
    primary: $('#primary-button'), primaryLabel: $('#primary-label'), reset: $('#reset-button'), skip: $('#skip-button'),
    hint: $('#action-hint'), count: $('#completed-count'), cycle: $('#cycle-text'), dots: [...$('#cycle-dots').children],
    index: $('#session-index'), next: $('#next-label'), announcement: $('#announcement'), toast: $('#toast'),
    form: $('#settings-form'), today: $('#today-label'), heading: $('#page-title'),
  };

  function validMinutes(value, fallback) {
    const number = Number(value);
    return Number.isInteger(number) && number >= 1 && number <= 180 ? number : fallback;
  }
  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== 'object') throw new Error('No saved state');
      const settings = Object.fromEntries(Object.keys(defaults).map((key) => [key, validMinutes(saved.settings?.[key], defaults[key])]));
      const mode = names[saved.mode] ? saved.mode : 'focus';
      const status = ['idle', 'running', 'paused'].includes(saved.status) ? saved.status : 'idle';
      const completed = Number.isSafeInteger(saved.completed) && saved.completed >= 0 ? saved.completed : 0;
      const full = settings[mode] * 60000;
      return {
        settings, mode, status, completed,
        remainingMs: Number.isFinite(saved.remainingMs) ? Math.max(0, Math.min(saved.remainingMs, full)) : full,
        endAt: status === 'running' && Number.isFinite(saved.endAt) ? saved.endAt : null,
        message: typeof saved.message === 'string' ? saved.message : '',
      };
    } catch {
      return { settings: { ...defaults }, mode: 'focus', status: 'idle', completed: 0, remainingMs: defaults.focus * 60000, endAt: null, message: '' };
    }
  }
  let state = readState();
  let toastTimeout;
  function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function fullDuration(mode = state.mode) { return state.settings[mode] * 60000; }
  function nextModeAfterCompletion(mode = state.mode, completed = state.completed) {
    return mode === 'focus' ? (completed > 0 && completed % 4 === 0 ? 'long' : 'short') : 'focus';
  }
  function formatTime(ms) {
    const totalSeconds = Math.ceil(Math.max(0, ms) / 1000);
    return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
  }
  function notify(message, assertive = false) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    if (assertive) elements.announcement.textContent = message;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => elements.toast.classList.remove('show'), 5000);
  }
  function complete() {
    const finished = state.mode;
    if (finished === 'focus') state.completed += 1;
    state.mode = nextModeAfterCompletion(finished, state.completed);
    state.status = 'idle';
    state.remainingMs = fullDuration();
    state.endAt = null;
    state.message = `${names[finished]} 세션 완료! ${names[state.mode]}이 준비되었어요.`;
    persist();
    render();
    notify(state.message, true);
  }
  function syncClock() {
    if (state.status !== 'running') return;
    if (!Number.isFinite(state.endAt)) {
      state.status = 'paused';
      persist();
      render();
      return;
    }
    state.remainingMs = Math.max(0, state.endAt - Date.now());
    if (state.remainingMs <= 0) complete();
    else render();
  }
  function render() {
    document.body.dataset.mode = state.mode;
    const duration = fullDuration();
    const fraction = Math.min(1, Math.max(0, 1 - state.remainingMs / duration));
    const text = formatTime(state.remainingMs);
    elements.time.textContent = text;
    elements.ring.style.setProperty('--progress', `${fraction * 100}%`);
    elements.ring.setAttribute('aria-valuenow', String(Math.round(fraction * 100)));
    elements.ring.setAttribute('aria-valuetext', `${names[state.mode]} ${text} 남음`);
    elements.overline.textContent = overlines[state.mode];
    const label = state.status === 'running' ? '일시정지' : state.status === 'paused' ? '재개' : `${names[state.mode]} 시작`;
    elements.primaryLabel.textContent = label;
    elements.primary.classList.toggle('is-running', state.status === 'running');
    elements.caption.textContent = state.status === 'running' ? '지금 이 시간에 머물러요' : state.status === 'paused' ? '잠시 멈춰 있어요' : state.message || '시작할 준비가 되었어요';
    elements.hint.textContent = state.status === 'running' ? '잠시 쉬고 싶다면 일시정지하세요.' : state.status === 'paused' ? '재개를 누르면 남은 시간부터 이어집니다.' : '시작을 누르면 시간이 흐릅니다.';
    elements.count.textContent = String(state.completed);
    const cycleProgress = state.completed % 4;
    elements.cycle.textContent = `${4 - cycleProgress}번 남음`;
    elements.dots.forEach((dot, index) => dot.classList.toggle('filled', index < cycleProgress));
    elements.index.innerHTML = `${String(cycleProgress + 1).padStart(2, '0')} <span>/ 04</span>`;
    const upcoming = state.mode === 'focus' ? nextModeAfterCompletion('focus', state.completed + 1) : 'focus';
    elements.next.textContent = `${names[upcoming]} · ${state.settings[upcoming]}분`;
    elements.heading.innerHTML = state.mode === 'focus' ? '지금 이 순간에<br /><em>집중해요.</em>' : '잘 해냈어요.<br /><em>잠깐 쉬어가요.</em>';
    document.querySelectorAll('.mode-button').forEach((button) => {
      const active = button.dataset.mode === state.mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.title = `${text} · ${names[state.mode]} | 모아`;
  }
  function changeMode(mode) {
    if (mode === state.mode) return;
    state.mode = mode;
    state.status = 'idle';
    state.remainingMs = fullDuration();
    state.endAt = null;
    state.message = '';
    persist(); render();
    notify(`${names[mode]} 세션이 준비되었어요.`);
  }
  elements.primary.addEventListener('click', () => {
    if (state.status === 'running') {
      state.remainingMs = Math.max(0, state.endAt - Date.now());
      state.endAt = null;
      state.status = 'paused';
    } else {
      state.endAt = Date.now() + state.remainingMs;
      state.status = 'running';
      state.message = '';
    }
    persist(); render();
  });
  elements.reset.addEventListener('click', () => {
    state.status = 'idle'; state.endAt = null; state.remainingMs = fullDuration(); state.message = '';
    persist(); render(); notify('현재 세션을 처음부터 다시 준비했어요.');
  });
  elements.skip.addEventListener('click', () => {
    const old = state.mode;
    state.mode = old === 'focus' ? 'short' : 'focus'; state.status = 'idle'; state.endAt = null; state.remainingMs = fullDuration(); state.message = '';
    persist(); render(); notify(`${names[old]}을 건너뛰고 ${names[state.mode]}으로 이동했어요.`);
  });
  document.querySelectorAll('.mode-button').forEach((button) => button.addEventListener('click', () => changeMode(button.dataset.mode)));
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!elements.form.reportValidity()) return;
    const oldDuration = fullDuration();
    const settings = Object.fromEntries(Object.keys(defaults).map((key) => [key, validMinutes(elements.form.elements[key].value, state.settings[key])]));
    state.settings = settings;
    if (fullDuration() !== oldDuration) {
      state.status = 'idle'; state.endAt = null; state.remainingMs = fullDuration(); state.message = '';
    }
    persist(); render(); notify('시간 설정을 저장했어요.');
  });
  Object.keys(defaults).forEach((key) => { elements.form.elements[key].value = state.settings[key]; });
  elements.today.textContent = '나의 집중 기록';
  render();
  if (state.status === 'running') syncClock();
  if (state.message) notify(state.message);
  setInterval(syncClock, 250);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) syncClock(); });
  window.addEventListener('focus', syncClock);
})();
