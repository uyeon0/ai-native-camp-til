(() => {
  'use strict';

  // ───────── Constants ─────────
  const STORE_KEY = 'tempo.pomodoro.v1';
  const MIN = 60_000;
  const CYCLE = 4; // 집중 4회 완료마다 긴 휴식
  const TICKS = 60;
  const MODES = ['focus', 'short', 'long'];
  const LABEL = { focus: '집중', short: '짧은 휴식', long: '긴 휴식' };
  const TITLE = { focus: '집중 시간', short: '짧은 휴식', long: '긴 휴식' };
  const DEFAULTS = { focus: 25, short: 5, long: 15, sound: true, notify: false };
  const LIMITS = { focus: [1, 120], short: [1, 60], long: [1, 90] };

  // ───────── Helpers ─────────
  const $ = (id) => document.getElementById(id);
  const now = () => Date.now();
  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (t = now()) => {
    const d = new Date(t);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const clock = (t) => {
    const d = new Date(t);
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const fmtTime = (ms) => {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(s / 60);
    return `${pad(m)}:${pad(s % 60)}`;
  };
  const fmtMinutes = (ms) => {
    const total = Math.round(ms / MIN);
    const h = Math.floor(total / 60);
    const m = total % 60;
    if (h && m) return `${h}시간 ${m}분`;
    if (h) return `${h}시간`;
    return `${m}분`;
  };
  const clampInt = (v, [lo, hi], fallback) => {
    const n = Math.round(Number(v));
    return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fallback;
  };
  // 한국어 조사: 받침 유무에 따라 '으로/로'
  const ro = (word) => {
    const code = word.charCodeAt(word.length - 1) - 0xac00;
    if (code < 0 || code > 11171) return `${word}로`;
    const jong = code % 28;
    return jong === 0 || jong === 8 ? `${word}로` : `${word}으로`;
  };

  // ───────── State ─────────
  let settings = { ...DEFAULTS };
  /** status: idle(시작 전) | running | paused */
  let timer = { mode: 'focus', status: 'idle', duration: 25 * MIN, remaining: 25 * MIN, endAt: null, cycle: 0 };
  let stats = { total: 0, day: dayKey(), today: 0, todayMs: 0, log: [] };
  /** 방금 끝난 세션 안내. 다음 세션을 시작하거나 닫을 때까지 유지 */
  let notice = null;

  const durationOf = (mode) => settings[mode] * MIN;
  const remainingMs = () => (timer.status === 'running' ? Math.max(0, timer.endAt - now()) : timer.remaining);

  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { /* 손상된 저장값은 무시 */ }
    if (!data || typeof data !== 'object') return;

    const s = data.settings || {};
    settings = {
      focus: clampInt(s.focus, LIMITS.focus, DEFAULTS.focus),
      short: clampInt(s.short, LIMITS.short, DEFAULTS.short),
      long: clampInt(s.long, LIMITS.long, DEFAULTS.long),
      sound: typeof s.sound === 'boolean' ? s.sound : DEFAULTS.sound,
      notify: typeof s.notify === 'boolean' ? s.notify : DEFAULTS.notify,
    };

    const st = data.stats || {};
    stats = {
      total: Math.max(0, Number(st.total) | 0),
      day: typeof st.day === 'string' ? st.day : dayKey(),
      today: Math.max(0, Number(st.today) | 0),
      todayMs: Math.max(0, Number(st.todayMs) || 0),
      log: Array.isArray(st.log) ? st.log.filter((e) => e && Number.isFinite(e.t) && Number.isFinite(e.ms)).slice(-50) : [],
    };

    const t = data.timer || {};
    if (MODES.includes(t.mode) && ['idle', 'running', 'paused'].includes(t.status)) {
      const duration = Number(t.duration) > 0 ? Number(t.duration) : durationOf(t.mode);
      timer = {
        mode: t.mode,
        status: t.status,
        duration,
        remaining: Math.min(duration, Math.max(0, Number(t.remaining) || duration)),
        endAt: Number.isFinite(t.endAt) ? t.endAt : null,
        cycle: clampInt(t.cycle, [0, CYCLE], 0),
      };
      if (timer.status === 'running' && timer.endAt === null) timer.status = 'paused';
    }
    if (data.notice && MODES.includes(data.notice.finished) && timer.status === 'idle') notice = data.notice;
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ settings, timer, stats, notice })); } catch { /* 저장 공간 없음 등 */ }
  }

  function rollDay() {
    const key = dayKey();
    if (stats.day !== key) {
      stats.day = key;
      stats.today = 0;
      stats.todayMs = 0;
      stats.log = [];
      save();
    }
  }

  function setSession(mode) {
    timer.mode = mode;
    timer.status = 'idle';
    timer.duration = durationOf(mode);
    timer.remaining = timer.duration;
    timer.endAt = null;
  }

  // 지금 세션이 정상 완료되면 다음에 올 세션
  function nextAfterComplete() {
    if (timer.mode === 'focus') return timer.cycle + 1 >= CYCLE ? 'long' : 'short';
    return 'focus';
  }

  // ───────── Actions ─────────
  function start() {
    ensureAudio();
    if (timer.status === 'running') return;
    timer.endAt = now() + timer.remaining;
    timer.status = 'running';
    notice = null;
    save();
    announce(timer.remaining === timer.duration
      ? `${LABEL[timer.mode]} ${fmtMinutes(timer.duration)} 시작`
      : `${LABEL[timer.mode]} 재개, 남은 시간 ${fmtTime(timer.remaining)}`);
    render();
  }

  function pause() {
    if (timer.status !== 'running') return;
    timer.remaining = Math.max(0, timer.endAt - now());
    timer.endAt = null;
    timer.status = 'paused';
    save();
    announce(`일시정지. 남은 시간 ${fmtTime(timer.remaining)}`);
    render();
  }

  function toggle() {
    if (timer.status === 'running') pause();
    else start();
  }

  function snapshot() {
    return JSON.stringify({ timer, notice });
  }
  function restore(snap) {
    const s = JSON.parse(snap);
    timer = s.timer;
    notice = s.notice;
    save();
    tick();
  }

  function reset() {
    if (timer.status === 'idle' && timer.remaining === timer.duration && timer.duration === durationOf(timer.mode)) return;
    const snap = snapshot();
    const mode = timer.mode;
    setSession(mode);
    notice = null;
    save();
    render();
    showToast(`${LABEL[mode]} 세션을 처음으로 되돌렸어요`, () => restore(snap));
    announce(`${LABEL[mode]} 세션 초기화`);
  }

  function skip() {
    const snap = snapshot();
    const from = timer.mode;
    // 건너뛴 집중은 완료가 아니므로 사이클·횟수에 반영하지 않는다.
    let next;
    if (from === 'focus') next = 'short';
    else {
      if (from === 'long') timer.cycle = 0;
      next = 'focus';
    }
    setSession(next);
    notice = null;
    save();
    render();
    const note = from === 'focus' ? ' · 완료 횟수에는 포함되지 않아요' : '';
    showToast(`${ro(LABEL[next])} 넘어갔어요${note}`, () => restore(snap));
    announce(`${LABEL[from]}을 건너뛰고 ${LABEL[next]} 준비`);
  }

  function complete({ away = false } = {}) {
    const finished = timer.mode;
    const endedAt = timer.endAt ?? now();
    const next = nextAfterComplete();

    if (finished === 'focus') {
      rollDay();
      stats.total += 1;
      stats.today += 1;
      stats.todayMs += timer.duration;
      stats.log.push({ t: endedAt, ms: timer.duration });
      stats.log = stats.log.slice(-50);
      timer.cycle = Math.min(CYCLE, timer.cycle + 1);
    } else if (finished === 'long') {
      timer.cycle = 0;
    }

    setSession(next);
    notice = { finished, next, at: endedAt, away, count: stats.today };
    save();

    chime();
    systemNotify();
    celebrate(finished === 'focus');
    announce(`${LABEL[finished]} 완료. 다음은 ${LABEL[next]} ${settings[next]}분. 시작 버튼을 누르면 시작합니다.`);
  }

  function tick() {
    rollDay();
    if (timer.status === 'running' && remainingMs() <= 0) complete({ away: document.hidden });
    render();
  }

  // ───────── Feedback: sound / notification / announcements ─────────
  let audio = null;
  function ensureAudio() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
    } catch { audio = null; }
  }
  function chime(force = false) {
    if ((!settings.sound && !force) || !audio) return;
    const t0 = audio.currentTime + 0.02;
    [659.25, 830.61, 987.77, 1318.5].forEach((freq, i) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      const t = t0 + i * 0.16;
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + 1.5);
    });
  }

  function systemNotify() {
    if (!settings.notify || !document.hidden || !('Notification' in window) || Notification.permission !== 'granted') return;
    const { finished, next } = notice;
    try {
      const n = new Notification(`${LABEL[finished]} 완료`, {
        body: `다음은 ${LABEL[next]} ${settings[next]}분이에요. 돌아와서 시작을 눌러 주세요.`,
        tag: 'tempo-complete',
      });
      n.onclick = () => { window.focus(); n.close(); };
    } catch { /* 일부 모바일 브라우저는 페이지 알림을 지원하지 않음 */ }
  }

  const live = $('live');
  function announce(msg) {
    live.textContent = '';
    requestAnimationFrame(() => { live.textContent = msg; });
  }

  function celebrate(isFocus) {
    const card = $('timerCard');
    card.classList.remove('celebrate');
    void card.offsetWidth;
    card.classList.add('celebrate');
    if (isFocus) {
      const dd = $('statToday').parentElement;
      dd.classList.remove('bump');
      void dd.offsetWidth;
      dd.classList.add('bump');
    }
  }

  // ───────── Toast with undo ─────────
  let toastTimer = null;
  let toastUndo = null;
  function showToast(text, undo) {
    const el = $('toast');
    $('toastText').textContent = text;
    toastUndo = undo || null;
    $('toastAction').hidden = !undo;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, undo ? 6000 : 3200);
  }
  function hideToast() {
    $('toast').hidden = true;
    toastUndo = null;
  }
  $('toastAction').addEventListener('click', (e) => {
    const fn = toastUndo;
    hideToast();
    // 숨겨진 버튼에 포커스가 남지 않게: 키보드 사용자는 주 버튼으로 이동
    if (e.detail === 0) $('primaryBtn').focus(); else e.currentTarget.blur();
    if (fn) { fn(); announce('되돌렸어요'); }
  });

  // ───────── Rendering ─────────
  const ticksG = $('ticks');
  const tickEls = [];
  (function buildTicks() {
    const NS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < TICKS; i++) {
      const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
      const major = i % 5 === 0;
      const r1 = 150, r2 = major ? 138 : 142;
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', (160 + r1 * Math.cos(a)).toFixed(2));
      line.setAttribute('y1', (160 + r1 * Math.sin(a)).toFixed(2));
      line.setAttribute('x2', (160 + r2 * Math.cos(a)).toFixed(2));
      line.setAttribute('y2', (160 + r2 * Math.sin(a)).toFixed(2));
      if (major) line.classList.add('major');
      ticksG.appendChild(line);
      tickEls.push(line);
    }
  })();

  const strip = $('strip');
  const slotEls = [];
  (function buildStrip() {
    const defs = [];
    for (let i = 0; i < CYCLE; i++) {
      defs.push({ kind: 'focus', label: `집중 ${i + 1}` });
      defs.push(i < CYCLE - 1 ? { kind: 'break', label: '짧은 휴식' } : { kind: 'long', label: '긴 휴식' });
    }
    defs.forEach((d) => {
      const li = document.createElement('li');
      li.className = `slot ${d.kind}`;
      li.innerHTML = `<span class="slot-bar"></span><span class="slot-label">${d.kind === 'break' ? '휴식' : d.label}</span>`;
      li.setAttribute('aria-label', d.label);
      strip.appendChild(li);
      slotEls.push(li);
    });
  })();

  let lastTicks = -1;
  let lastLogKey = '';
  const root = document.documentElement;

  function render() {
    const rem = remainingMs();
    const { mode, status, duration, cycle } = timer;
    const progress = duration > 0 ? Math.min(1, Math.max(0, 1 - rem / duration)) : 0;
    const timeText = fmtTime(rem);

    root.dataset.mode = mode;
    root.dataset.status = status;
    const theme = getComputedStyle(root).getPropertyValue('--bg').trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (theme && meta.content !== theme) meta.content = theme;

    // Header of the card
    $('modeLabel').textContent = TITLE[mode];
    $('statusPill').textContent = status === 'running' ? '진행 중' : status === 'paused' ? '일시정지' : '시작 전';

    // Dial
    $('time').textContent = timeText;
    $('time').setAttribute('aria-label', `남은 시간 ${Math.floor(Math.ceil(rem / 1000) / 60)}분 ${Math.ceil(rem / 1000) % 60}초`);
    $('dial').setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    $('dial').setAttribute('aria-valuetext', `${Math.round(progress * 100)}% 진행, ${timeText} 남음`);
    $('arc').style.strokeDashoffset = String(progress * 100);
    $('timerCard').style.setProperty('--progress', progress.toFixed(4));
    const past = Math.floor(progress * TICKS + 1e-6);
    if (past !== lastTicks) {
      tickEls.forEach((el, i) => el.classList.toggle('past', i < past));
      lastTicks = past;
    }

    let sub;
    if (status === 'running') sub = `${clock(timer.endAt)}에 끝나요`;
    else if (status === 'paused') sub = `${fmtMinutes(duration)} 중 ${fmtTime(duration - rem)} 진행`;
    else sub = `${fmtMinutes(duration)} 세션`;
    $('dialSub').textContent = sub;

    // Guidance: what is happening + what to do next
    let hint;
    if (status === 'running') {
      hint = mode === 'focus' ? '지금은 한 가지 일에만 집중하세요. 잠깐 멈춰야 하면 일시정지를 누르세요.' : '화면에서 눈을 떼고 몸을 풀어 주세요. 끝나면 소리로 알려 드려요.';
    } else if (status === 'paused') {
      hint = `멈춰 있어요. 재개를 누르면 남은 ${timeText}부터 이어서 진행돼요.`;
    } else {
      hint = mode === 'focus' ? `준비되면 집중 시작을 누르세요. ${settings.focus}분 동안 타이머가 돌아가요.` : `시작을 누르면 ${LABEL[mode]} ${fmtMinutes(duration)}이 시작돼요.`;
    }
    $('hint').textContent = hint;

    // Buttons
    const primaryLabel = status === 'running' ? '일시정지' : status === 'paused' ? '재개' : mode === 'focus' ? '집중 시작' : '휴식 시작';
    $('primaryLabel').textContent = primaryLabel;
    $('primaryBtn').setAttribute('aria-label', `${primaryLabel} (Space)`);
    const pristine = status === 'idle' && rem === duration && duration === durationOf(mode);
    $('resetBtn').disabled = pristine;
    $('resetBtn').title = pristine ? '아직 진행한 시간이 없어요' : '현재 세션을 처음부터 (R)';
    const skipTarget = mode === 'focus' ? 'short' : 'focus';
    $('skipBtn').title = `${ro(LABEL[skipTarget])} 건너뛰기 (N)`;
    $('skipBtn').setAttribute('aria-label', `건너뛰기: ${ro(LABEL[skipTarget])} 이동 (N)`);

    // Up next
    const next = nextAfterComplete();
    const upNext = $('upNext');
    upNext.style.setProperty('--next-color', `var(--${next}-accent)`);
    upNext.innerHTML = `<span class="nd" aria-hidden="true"></span>이 세션이 끝나면 <b>${LABEL[next]} ${settings[next]}분</b>`;

    // Completion notice
    const noticeEl = $('notice');
    if (notice && status === 'idle') {
      const { finished, next: n, away, at, count } = notice;
      $('noticeTitle').textContent = finished === 'focus' ? `집중 완료! 오늘 ${count}번째예요` : `${LABEL[finished]} 끝`;
      const when = away ? `자리를 비운 사이 ${clock(at)}에 끝났어요. ` : '';
      $('noticeText').textContent = finished === 'focus'
        ? `${when}이제 ${LABEL[n]} ${settings[n]}분. 준비되면 휴식 시작을 누르세요.`
        : `${when}다시 집중할 차례예요. 준비되면 집중 시작을 누르세요.`;
      noticeEl.hidden = false;
    } else {
      noticeEl.hidden = true;
    }

    // Cycle strip
    let pos;
    if (mode === 'focus') pos = cycle * 2;
    else if (mode === 'long') pos = CYCLE * 2 - 1;
    else pos = Math.max(1, cycle * 2 - 1);
    slotEls.forEach((el, i) => {
      const isFocusSlot = i % 2 === 0;
      const done = isFocusSlot ? i / 2 < cycle && i !== pos : i < pos;
      el.classList.toggle('done', done);
      el.classList.toggle('passed', !isFocusSlot && i < pos);
      el.classList.toggle('current', i === pos);
      el.style.setProperty('--fill', i === pos ? progress.toFixed(4) : '0');
      if (i === pos) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
    });
    $('cycleMeta').textContent = `집중 ${cycle} / ${CYCLE}`;
    const left = CYCLE - cycle;
    $('cycleText').innerHTML = mode === 'long'
      ? '사이클 완주! 긴 휴식이 끝나면 새 사이클이 시작돼요.'
      : left <= 1 && mode === 'focus'
        ? '이번 집중을 마치면 <b>긴 휴식</b>이에요.'
        : `긴 휴식까지 집중 <b>${left}회</b> 남았어요.`;

    // Stats
    $('statToday').textContent = String(stats.today);
    $('statMinutes').textContent = fmtMinutes(stats.todayMs);
    $('statTotal').textContent = String(stats.total);
    $('todayDate').textContent = new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
    const logKey = `${stats.day}:${stats.log.length}:${stats.today}`;
    if (logKey !== lastLogKey) {
      lastLogKey = logKey;
      const ul = $('log');
      ul.textContent = '';
      const todays = stats.log.filter((e) => dayKey(e.t) === stats.day).slice(-5).reverse();
      if (!todays.length) {
        const li = document.createElement('li');
        li.className = 'empty';
        li.textContent = '아직 완료한 집중이 없어요. 첫 세션을 시작해 보세요.';
        ul.appendChild(li);
      } else {
        todays.forEach((e) => {
          const li = document.createElement('li');
          li.innerHTML = `<span>${clock(e.t - e.ms)} – ${clock(e.t)}</span><b>${fmtMinutes(e.ms)} 집중</b>`;
          ul.appendChild(li);
        });
      }
    }

    // Tab title
    document.title = status === 'running'
      ? `${timeText} · ${LABEL[mode]} — Tempo`
      : notice && status === 'idle'
        ? `✓ ${LABEL[notice.finished]} 완료 — Tempo`
        : status === 'paused' ? `⏸ ${timeText} · ${LABEL[mode]} — Tempo` : 'Tempo · 뽀모도로';
  }

  // ───────── Settings dialog ─────────
  const dlg = $('settings');
  const inputs = { focus: $('inFocus'), short: $('inShort'), long: $('inLong') };
  const errors = { focus: $('errFocus'), short: $('errShort'), long: $('errLong') };

  function openSettings() {
    MODES.forEach((m) => { inputs[m].value = settings[m]; setError(m, ''); });
    $('inSound').checked = settings.sound;
    $('inNotify').checked = settings.notify && 'Notification' in window && Notification.permission === 'granted';
    updateNotifyHelp();
    $('runningNote').hidden = timer.status === 'idle';
    dlg.showModal();
    inputs.focus.focus();
    inputs.focus.select();
  }

  function setError(m, msg) {
    errors[m].textContent = msg;
    inputs[m].closest('.field').classList.toggle('invalid', !!msg);
    inputs[m].setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validate(m) {
    const [lo, hi] = LIMITS[m];
    const raw = inputs[m].value.trim();
    const n = Number(raw);
    if (raw === '' || !Number.isInteger(n) || n < lo || n > hi) {
      setError(m, `${lo}~${hi} 사이의 정수(분)를 입력하세요.`);
      return null;
    }
    setError(m, '');
    return n;
  }

  function updateNotifyHelp() {
    const help = $('notifyHelp');
    if (!('Notification' in window)) {
      help.textContent = '이 브라우저는 알림을 지원하지 않아요';
      $('inNotify').disabled = true;
    } else if (Notification.permission === 'denied') {
      help.textContent = '알림이 차단돼 있어요. 브라우저 사이트 설정에서 허용해 주세요';
    } else {
      help.textContent = '다른 탭에 있을 때 완료를 알려줘요';
    }
  }

  document.querySelectorAll('.field').forEach((field) => {
    const m = field.dataset.key;
    field.querySelectorAll('.step').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cur = Number(inputs[m].value) || settings[m];
        inputs[m].value = clampInt(cur + Number(btn.dataset.step), LIMITS[m], settings[m]);
        validate(m);
      });
    });
    inputs[m].addEventListener('input', () => { if (errors[m].textContent) validate(m); });
    inputs[m].addEventListener('blur', () => validate(m));
  });

  $('inNotify').addEventListener('change', async (e) => {
    if (!e.target.checked || !('Notification' in window)) return;
    if (Notification.permission === 'default') {
      try { await Notification.requestPermission(); } catch { /* ignore */ }
    }
    if (Notification.permission !== 'granted') e.target.checked = false;
    updateNotifyHelp();
  });

  $('previewSound').addEventListener('click', () => { ensureAudio(); chime(true); });

  $('defaultsBtn').addEventListener('click', () => {
    MODES.forEach((m) => { inputs[m].value = DEFAULTS[m]; setError(m, ''); });
  });

  $('clearStats').addEventListener('click', () => {
    if (!window.confirm('완료 기록(오늘·누적·사이클)을 모두 지울까요? 되돌릴 수 없어요.')) return;
    stats = { total: 0, day: dayKey(), today: 0, todayMs: 0, log: [] };
    timer.cycle = 0;
    notice = null;
    save();
    render();
    showToast('완료 기록을 지웠어요');
  });

  $('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const values = {};
    let firstBad = null;
    MODES.forEach((m) => {
      values[m] = validate(m);
      if (values[m] === null && !firstBad) firstBad = inputs[m];
    });
    if (firstBad) { firstBad.focus(); return; }

    const changed = MODES.some((m) => values[m] !== settings[m]);
    Object.assign(settings, values, { sound: $('inSound').checked, notify: $('inNotify').checked });
    // 시작 전 세션은 새 길이를 바로 반영, 진행 중·일시정지 세션은 다음 세션부터
    if (timer.status === 'idle') {
      timer.duration = durationOf(timer.mode);
      timer.remaining = timer.duration;
    }
    save();
    dlg.close();
    render();
    showToast(changed && timer.status !== 'idle' ? '저장했어요. 바뀐 시간은 다음 세션부터 적용돼요' : '설정을 저장했어요');
  });

  $('settingsCancel').addEventListener('click', () => dlg.close());
  $('settingsClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => $('settingsBtn').focus());

  // ───────── Wiring ─────────
  $('primaryBtn').addEventListener('click', toggle);
  $('resetBtn').addEventListener('click', reset);
  $('skipBtn').addEventListener('click', skip);
  // 마우스로 누른 조작 버튼에는 포커스를 남기지 않는다. 그래야 다음 Space가 항상 시작/일시정지로 동작한다.
  // (키보드로 누른 경우 e.detail === 0 이므로 포커스 유지)
  ['primaryBtn', 'resetBtn', 'skipBtn'].forEach((id) => {
    $(id).addEventListener('click', (e) => { if (e.detail > 0) e.currentTarget.blur(); });
  });
  $('settingsBtn').addEventListener('click', openSettings);
  $('noticeClose').addEventListener('click', () => { notice = null; save(); render(); $('primaryBtn').focus(); });

  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
    if (dlg.open) return;
    const interactive = e.target.closest && e.target.closest('button, a, input, select, textarea, [contenteditable="true"]');
    if (e.key === ' ' || e.code === 'Space') {
      if (interactive) return; // 포커스된 버튼은 브라우저 기본 동작에 맡김
      e.preventDefault();
      toggle();
      return;
    }
    if (interactive && interactive.matches('input, select, textarea, [contenteditable="true"]')) return;
    const k = e.key.toLowerCase();
    if (k === 'r' || k === 'ㄱ') { e.preventDefault(); reset(); }
    else if (k === 'n' || k === 'ㅜ') { e.preventDefault(); skip(); }
    else if (k === ',') { e.preventDefault(); openSettings(); }
    else if (k === 'escape' && !$('toast').hidden) hideToast();
  });

  // 백그라운드 탭에서는 setInterval이 느려지므로, 남은 시간은 항상 종료 시각(endAt)과 현재 시각의 차이로 계산한다.
  document.addEventListener('visibilitychange', tick);
  window.addEventListener('focus', tick);
  window.addEventListener('pageshow', tick);
  // 다른 탭에서 바뀐 상태 동기화
  window.addEventListener('storage', (e) => {
    if (e.key !== STORE_KEY) return;
    load();
    lastLogKey = '';
    render();
  });

  // ───────── Boot ─────────
  load();
  rollDay();
  if (timer.status === 'running' && timer.endAt <= now()) complete({ away: true });
  render();
  setInterval(tick, 250);
})();
