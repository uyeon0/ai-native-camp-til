"use strict";

/* ================================================================
 * 설정값
 * ================================================================ */

const LINES_PER_SESSION = 10;
const LEVEL_PLAN = [3, 4, 3]; // 세션 한 번에 level 1, 2, 3 문제를 몇 개씩 낼지
const DEFAULT_NICKNAME = "익명의 개발자";
const STORAGE_KEY = "typing-practice:v1";

const LANGS = {
  html: { label: "HTML", file: "index.html", icon: "<>", run: "open index.html" },
  python: { label: "Python", file: "main.py", icon: "py", run: "python main.py" },
  css: { label: "CSS", file: "style.css", icon: "#", run: "npx stylelint style.css" },
  javascript: { label: "JavaScript", file: "app.js", icon: "JS", run: "node app.js" },
  java: { label: "Java", file: "Main.java", icon: "J", run: "javac Main.java && java Main" },
};

const THEMES = [
  { id: "dark-plus", label: "Dark+" },
  { id: "light-plus", label: "Light+" },
  { id: "monokai", label: "Monokai" },
  { id: "github-dark", label: "GitHub Dark" },
];

// 최고 WPM과 그 세션의 정확도를 함께 본다
const RANKS = [
  { name: "Intern", wpm: 0, acc: 0 },
  { name: "Junior", wpm: 25, acc: 85 },
  { name: "Mid", wpm: 40, acc: 90 },
  { name: "Senior", wpm: 55, acc: 93 },
  { name: "Staff", wpm: 70, acc: 95 },
  { name: "10x Engineer", wpm: 90, acc: 97 },
];

const ACHIEVEMENTS = [
  { id: "first", ext: "Hello World", desc: "첫 세션 완료" },
  { id: "wpm40", ext: "Warm Up", desc: "처음으로 40 WPM 달성" },
  { id: "wpm60", ext: "Speed Typer", desc: "처음으로 60 WPM 달성" },
  { id: "wpm80", ext: "Turbo Keys", desc: "처음으로 80 WPM 달성" },
  { id: "wpm100", ext: "Hyperdrive", desc: "처음으로 100 WPM 달성" },
  { id: "perfect", ext: "Zero Bugs", desc: "정확도 100%로 세션 완료" },
  { id: "combo50", ext: "Flow State", desc: "50 콤보 달성" },
  { id: "combo100", ext: "Power Mode", desc: "100 콤보 달성" },
  { id: "polyglot", ext: "Polyglot Pack", desc: "5개 언어 모두 세션 완료" },
];

const POWER_LEVELS = [
  { combo: 100, particles: 10, shake: 2 },
  { combo: 50, particles: 6, shake: 1 },
  { combo: 20, particles: 3, shake: 0 },
];

/* ================================================================
 * 저장소: localStorage에 접근할 수 없으면 메모리에만 둔다
 * ================================================================ */

const store = loadStore();

function defaultStore() {
  return {
    best: {}, // lang -> { wpm, acc, sessions }
    achievements: [],
    rankIndex: 0,
    theme: "dark-plus",
    powerMode: true,
    nickname: "",
  };
}

function loadStore() {
  const base = defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return Object.assign(base, JSON.parse(raw));
  } catch (e) {
    /* 저장 없이 동작 */
  }
  return base;
}

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    /* 저장 없이 동작 */
  }
}

/* ================================================================
 * 문법 하이라이팅
 * ================================================================ */

const KEYWORDS = {
  python: {
    kw: "def class lambda None True False and or not is in global nonlocal async",
    ctrl: "if elif else for while return import from as with try except finally raise yield await pass break continue",
  },
  javascript: {
    kw: "const let var function class extends new this super null undefined true false typeof instanceof void delete async in of",
    ctrl: "if else for while do return import export from default try catch finally throw await yield break continue switch case",
  },
  java: {
    kw: "public private protected static final class interface record enum implements extends new this super null true false abstract int long double float boolean char byte short void var",
    ctrl: "if else for while do return import package try catch finally throw throws break continue switch case",
  },
};
for (const lang of Object.keys(KEYWORDS)) {
  KEYWORDS[lang].kw = new Set(KEYWORDS[lang].kw.split(" "));
  KEYWORDS[lang].ctrl = new Set(KEYWORDS[lang].ctrl.split(" "));
}

const STRING_RULES = [
  [/"(?:[^"\\]|\\.)*"?/y, "str"],
  [/'(?:[^'\\]|\\.)*'?/y, "str"],
];

const RULES = {
  python: [
    [/#.*/y, "com"],
    [/[fFrRbBuU]{1,2}(?=["'])/y, "kw"],
    ...STRING_RULES,
    [/\d+(?:\.\d+)?/y, "num"],
    [/[A-Za-z_]\w*/y, "ident"],
  ],
  javascript: [
    [/\/\/.*/y, "com"],
    [/\/\*[\s\S]*?(?:\*\/|$)/y, "com"],
    ...STRING_RULES,
    [/`(?:[^`\\]|\\.)*`?/y, "str"],
    [/\d+(?:\.\d+)?/y, "num"],
    [/[A-Za-z_$][\w$]*/y, "ident"],
  ],
  java: [
    [/\/\/.*/y, "com"],
    [/\/\*[\s\S]*?(?:\*\/|$)/y, "com"],
    ...STRING_RULES,
    [/@\w+/y, "fn"],
    [/\d+(?:\.\d+)?[fFdDlL]?/y, "num"],
    [/[A-Za-z_$][\w$]*/y, "ident"],
  ],
  css: [
    [/\/\*[\s\S]*?(?:\*\/|$)/y, "com"],
    ...STRING_RULES,
    [/@[\w-]+/y, "ctrl"],
    [/--[\w-]+/y, "attr"],
    [/#[0-9a-fA-F]{3,8}(?![\w-])/y, "num"],
    [/-?\d*\.?\d+(?:px|em|rem|%|ms|s|fr|vh|vw|deg|ch)?/y, "num"],
    [/[.#][A-Za-z_-][\w-]*/y, "sel"],
    [/::?[a-z-]+(?=\s*[{,:.)[]|$)/y, "sel"],
    [/[A-Za-z_][\w-]*/y, "ident"],
  ],
};

function classifyIdent(lang, word, rest) {
  if (lang === "css") {
    if (/^:[a-z]/.test(rest) || /^\s*[{,]/.test(rest)) return "sel";
    if (/^\s*:/.test(rest)) return "attr";
    if (rest[0] === "(") return "fn";
    return "val";
  }
  const kw = KEYWORDS[lang];
  if (kw.ctrl.has(word)) return "ctrl";
  if (kw.kw.has(word)) return "kw";
  if (rest[0] === "(") return "fn";
  if (/^[A-Z]/.test(word)) return word === word.toUpperCase() && word.length > 1 ? "num" : "type";
  return "var";
}

function tokenizeGeneric(lang, src) {
  const rules = RULES[lang];
  const out = [];
  let i = 0;
  outer: while (i < src.length) {
    if (/\s/.test(src[i])) {
      const m = /\s+/y;
      m.lastIndex = i;
      const text = m.exec(src)[0];
      out.push({ text, type: "plain" });
      i += text.length;
      continue;
    }
    for (const [re, type] of rules) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (m && m[0].length) {
        const text = m[0];
        const t = type === "ident" ? classifyIdent(lang, text, src.slice(i + text.length)) : type;
        out.push({ text, type: t });
        i += text.length;
        continue outer;
      }
    }
    out.push({ text: src[i], type: "punc" });
    i += 1;
  }
  return out;
}

function tokenizeHTML(src) {
  const out = [];
  let i = 0;
  let inTag = false;
  let expectName = false;
  const take = (re) => {
    re.lastIndex = i;
    const m = re.exec(src);
    return m && m[0].length ? m[0] : null;
  };
  while (i < src.length) {
    let text;
    let type;
    if (!inTag) {
      if ((text = take(/<!--[\s\S]*?(?:-->|$)/y))) type = "com";
      else if ((text = take(/<\/?(?=[A-Za-z])/y))) { type = "punc"; inTag = true; expectName = true; }
      else if ((text = take(/[^<]+/y))) type = "plain";
      else { text = src[i]; type = "plain"; }
    } else if (expectName && (text = take(/[A-Za-z][\w-]*/y))) { type = "tag"; expectName = false; }
    else if ((text = take(/\s+/y))) type = "plain";
    else if ((text = take(/\/?>/y))) { type = "punc"; inTag = false; }
    else if ((text = take(/"[^"]*"?|'[^']*'?/y))) type = "str";
    else if ((text = take(/[\w:@.-]+/y))) type = "attr";
    else { text = src[i]; type = "punc"; }
    out.push({ text, type });
    i += text.length;
  }
  return out;
}

function tokenize(lang, src) {
  return lang === "html" ? tokenizeHTML(src) : tokenizeGeneric(lang, src);
}

// 글자 하나하나의 토큰 종류
function charTypes(lang, src) {
  const types = [];
  for (const tok of tokenize(lang, src)) {
    for (let k = 0; k < tok.text.length; k++) types.push(tok.type);
  }
  return types;
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function highlightHTML(lang, src) {
  return tokenize(lang, src)
    .map((t) => `<span class="t-${t.type}">${escapeHTML(t.text)}</span>`)
    .join("");
}

/* ================================================================
 * DOM
 * ================================================================ */

const $ = (id) => document.getElementById(id);
const els = {
  workbench: $("workbench"),
  sidebar: $("sidebar"),
  fileList: $("file-list"),
  tabs: $("tabs"),
  breadcrumbs: $("breadcrumbs"),
  welcome: $("welcome"),
  welcomeLinks: $("welcome-links"),
  editor: $("editor"),
  editorScroll: $("editor-scroll"),
  lines: $("lines"),
  particles: $("particles"),
  combo: $("combo"),
  comboNum: $("combo-num"),
  result: $("result"),
  card: $("card"),
  nickname: $("nickname"),
  resultStats: $("result-stats"),
  problems: $("problems"),
  problemBadge: $("problem-badge"),
  terminal: $("panel-terminal"),
  input: $("typing-input"),
  toasts: $("toasts"),
  status: {
    errors: $("status-errors"),
    warnings: $("status-warnings"),
    ime: $("status-ime"),
    pos: $("status-pos"),
    wpm: $("status-wpm"),
    acc: $("status-acc"),
    combo: $("status-combo"),
    lang: $("status-lang"),
    rank: $("status-rank-name"),
  },
};

/* ================================================================
 * 세션 상태
 * ================================================================ */

let session = null;
let view = "welcome"; // welcome | editor | result
let lastResult = null;
let wpmTimer = null;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 앞쪽은 낮은 level, 뒤쪽은 높은 level. 같은 문제는 한 번만 낸다
function pickLines(lang) {
  const pool = SNIPPETS[lang];
  const picked = [];
  LEVEL_PLAN.forEach((count, idx) => {
    picked.push(...shuffle(pool.filter((s) => s.level === idx + 1)).slice(0, count));
  });
  return picked.map((s) => s.code);
}

function newSession(lang) {
  return {
    lang,
    queue: pickLines(lang),
    index: 0,
    typed: "",
    done: [],
    startTime: null,
    lineStart: null,
    correct: 0,
    total: 0,
    lineCorrect: 0,
    lineTotal: 0,
    lineErrors: 0,
    combo: 0,
    maxCombo: 0,
    problems: [],
    missed: {},
    warnings: 0,
    finished: false,
  };
}

function startSession(lang) {
  session = newSession(lang);
  lastResult = null;
  clearProblems();
  termCommand(`code ${LANGS[lang].file}`);
  setView("editor");
  renderFiles();
  renderLines();
  updateStatus();
  updateCombo();
  focusInput();
  clearInterval(wpmTimer);
  wpmTimer = setInterval(updateStatus, 500);
}

function elapsedMin(from) {
  return from ? Math.max((performance.now() - from) / 60000, 1 / 600) : 0;
}

function calcWpm(correct, from) {
  const m = elapsedMin(from);
  return m ? Math.round(correct / 5 / m) : 0;
}

function calcAcc(correct, total) {
  return total ? Math.round((correct / total) * 1000) / 10 : 100;
}

/* ================================================================
 * 입력 처리
 * ================================================================ */

let composing = false;
let imeTimer = null;
let typingTimer = null;

function focusInput() {
  if (view !== "editor" || !session || session.finished) return;
  els.input.focus({ preventScroll: true });
  const end = els.input.value.length;
  els.input.setSelectionRange(end, end);
}

function showImeWarning() {
  els.status.ime.hidden = false;
  clearTimeout(imeTimer);
  imeTimer = setTimeout(() => { els.status.ime.hidden = true; }, 3000);
}

els.input.addEventListener("compositionstart", () => { composing = true; showImeWarning(); });
els.input.addEventListener("compositionend", () => {
  composing = false;
  handleInput();
});
els.input.addEventListener("input", () => {
  if (!composing) handleInput();
});
els.input.addEventListener("paste", (e) => e.preventDefault());
els.input.addEventListener("drop", (e) => e.preventDefault());
els.input.addEventListener("keydown", (e) => {
  // 커서는 항상 줄 끝에 둔다
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(e.key)) {
    e.preventDefault();
  }
  if (e.key === "Tab") {
    e.preventDefault();
    insertText(" ");
  }
  if (e.key === "Enter") e.preventDefault();
});
els.input.addEventListener("focus", () => els.editor.classList.add("focused"));
els.input.addEventListener("blur", () => els.editor.classList.remove("focused"));
els.editor.addEventListener("mousedown", (e) => { e.preventDefault(); focusInput(); });

function insertText(text) {
  els.input.value += text;
  handleInput();
}

function handleInput() {
  if (!session || session.finished) { els.input.value = ""; return; }
  let value = els.input.value;
  if (/[^\x20-\x7e]/.test(value)) {
    value = value.replace(/[^\x20-\x7e]/g, "");
    showImeWarning();
  }
  const target = session.queue[session.index];
  value = value.slice(0, target.length + 8);
  els.input.value = value;

  const prev = session.typed;
  // 새로 친 글자만 채점한다. 지운 건 세지 않는다
  if (value.length > prev.length && value.startsWith(prev)) {
    for (let i = prev.length; i < value.length; i++) scoreKey(i, value[i], target);
  } else if (value.length > prev.length) {
    let i = 0;
    while (i < prev.length && prev[i] === value[i]) i++;
    for (; i < value.length; i++) scoreKey(i, value[i], target);
  }
  session.typed = value;

  els.editor.classList.add("typing");
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => els.editor.classList.remove("typing"), 500);

  if (value === target) {
    finishLine();
  } else {
    renderCurrentLine();
    updateStatus();
  }
}

function scoreKey(i, ch, target) {
  const now = performance.now();
  if (!session.startTime) session.startTime = now;
  if (!session.lineStart) session.lineStart = now;
  session.total++;
  session.lineTotal++;
  if (ch === target[i]) {
    session.correct++;
    session.lineCorrect++;
    session.combo++;
    session.maxCombo = Math.max(session.maxCombo, session.combo);
    checkComboAchievements();
    powerHit(i, target);
  } else {
    session.combo = 0;
    session.lineErrors++;
    const expected = i < target.length ? target[i] : null;
    if (expected !== null) session.missed[expected] = (session.missed[expected] || 0) + 1;
    addProblem(i, expected, ch);
  }
  updateCombo();
}

function finishLine() {
  const target = session.queue[session.index];
  const lineWpm = calcWpm(session.lineCorrect, session.lineStart);
  const lineAcc = calcAcc(session.lineCorrect, session.lineTotal);
  session.done.push({ code: target, wpm: lineWpm, acc: lineAcc, errors: session.lineErrors });

  const ln = session.index + 1;
  termCommand(LANGS[session.lang].run);
  if (session.lineErrors >= 2) {
    session.warnings++;
    termLine([["term-warn", `⚠ Line ${ln} passed with ${session.lineErrors} warnings (${lineWpm} WPM, ${lineAcc}%)`]]);
  } else {
    termLine([["term-ok", `✓ Line ${ln} passed (${lineWpm} WPM, ${lineAcc}%)`]]);
  }

  session.index++;
  session.typed = "";
  session.lineStart = performance.now();
  session.lineCorrect = 0;
  session.lineTotal = 0;
  session.lineErrors = 0;
  els.input.value = "";

  if (session.index >= session.queue.length) {
    finishSession();
  } else {
    renderLines();
    updateStatus();
  }
}

/* ================================================================
 * 편집기 그리기
 * ================================================================ */

function renderLines() {
  const rows = session.done.map((d, i) =>
    `<div class="line"><span class="ln">${i + 1}</span><span class="code">${highlightHTML(session.lang, d.code)}</span></div>`
  );
  if (!session.finished) {
    rows.push(`<div class="line current" id="current-line"><span class="ln">${session.index + 1}</span><span class="code" id="current-code"></span></div>`);
  }
  els.lines.innerHTML = rows.join("");
  if (!session.finished) renderCurrentLine();
  els.editorScroll.scrollTop = els.editorScroll.scrollHeight;
  renderTabs();
}

function renderCurrentLine() {
  const target = session.queue[session.index];
  const typed = session.typed;
  const types = charTypes(session.lang, target);
  let html = "";
  const max = Math.max(target.length, typed.length);
  for (let i = 0; i <= max; i++) {
    if (i === typed.length) html += '<span class="cursor" id="cursor"></span>';
    if (i >= max) break;
    if (i < typed.length) {
      const ok = typed[i] === target[i];
      html += ok
        ? `<span class="t-${types[i]}">${escapeHTML(typed[i])}</span>`
        : `<span class="err">${escapeHTML(typed[i])}</span>`;
    } else {
      html += `<span class="ghost">${escapeHTML(target[i])}</span>`;
    }
  }
  const code = $("current-code");
  if (code) code.innerHTML = html;
  renderTabs();
  keepCursorVisible();
}

function keepCursorVisible() {
  const cursor = $("cursor");
  if (!cursor) return;
  const box = els.editorScroll.getBoundingClientRect();
  const c = cursor.getBoundingClientRect();
  if (c.right > box.right - 40) els.editorScroll.scrollLeft += c.right - box.right + 80;
  else if (c.left < box.left + 70) els.editorScroll.scrollLeft = Math.max(0, els.editorScroll.scrollLeft - (box.left + 70 - c.left) - 40);
}

/* ================================================================
 * 탭, 탐색기, 화면 전환
 * ================================================================ */

function setView(next) {
  view = next;
  els.welcome.hidden = next !== "welcome";
  els.editor.hidden = next !== "editor";
  els.result.hidden = next !== "result";
  els.editor.classList.toggle("done", !!(session && session.finished));
  renderTabs();
  if (next === "editor") focusInput();
}

function renderTabs() {
  els.tabs.textContent = "";
  if (!session) {
    els.tabs.append(makeTab({ icon: "codicon-vscode", label: "시작", active: true, onClick: () => setView("welcome") }));
    els.breadcrumbs.textContent = "typing-practice";
    return;
  }
  const meta = LANGS[session.lang];
  const dirty = !session.finished && session.typed.length > 0;
  els.tabs.append(makeTab({
    lang: session.lang,
    label: meta.file,
    active: view === "editor",
    dirty,
    onClick: () => (session.finished ? startSession(session.lang) : setView("editor")),
  }));
  if (lastResult) {
    els.tabs.append(makeTab({ lang: "javascript", label: "result.js", active: view === "result", onClick: () => setView("result") }));
  }
  els.breadcrumbs.textContent = `typing-practice › ${view === "result" ? "result.js" : meta.file}`;
}

function makeTab({ lang, icon, label, active, dirty, onClick }) {
  const tab = document.createElement("button");
  tab.className = "tab" + (active ? " active" : "");
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-selected", String(!!active));
  if (lang) {
    const ic = document.createElement("span");
    ic.className = `file-icon lang-${lang}`;
    ic.textContent = LANGS[lang].icon;
    tab.append(ic);
  } else {
    const ic = document.createElement("i");
    ic.className = `codicon ${icon}`;
    tab.append(ic);
  }
  tab.append(label);
  const state = document.createElement("span");
  state.className = "tab-state";
  state.innerHTML = dirty ? '<span class="dirty">●</span>' : '<i class="codicon codicon-close"></i>';
  tab.append(state);
  tab.addEventListener("click", onClick);
  return tab;
}

function renderFiles() {
  els.fileList.textContent = "";
  for (const [lang, meta] of Object.entries(LANGS)) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "file" + (session && session.lang === lang ? " active" : "");
    const ic = document.createElement("span");
    ic.className = `file-icon lang-${lang}`;
    ic.textContent = meta.icon;
    btn.append(ic, meta.file);
    const best = store.best[lang];
    if (best) {
      const b = document.createElement("span");
      b.className = "file-best";
      b.textContent = `${best.wpm}`;
      b.title = `최고 ${best.wpm} WPM`;
      btn.append(b);
    }
    btn.addEventListener("click", () => {
      startSession(lang);
      if (window.matchMedia("(max-width: 760px)").matches) setSidebar(false);
    });
    li.append(btn);
    els.fileList.append(li);
  }
}

function renderWelcomeLinks() {
  els.welcomeLinks.textContent = "";
  for (const [lang, meta] of Object.entries(LANGS)) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const ic = document.createElement("span");
    ic.className = `file-icon lang-${lang}`;
    ic.textContent = meta.icon;
    btn.append(ic, `${meta.file} 열기`);
    const note = document.createElement("span");
    note.className = "term-dim";
    note.textContent = ` ${meta.label}`;
    btn.addEventListener("click", () => startSession(lang));
    li.append(btn, note);
    els.welcomeLinks.append(li);
  }
}

/* 액티비티 바 */

let sidebarView = "explorer";
let sidebarOpen = !window.matchMedia("(max-width: 760px)").matches;

function setSidebar(open) {
  sidebarOpen = open;
  els.workbench.classList.toggle("sidebar-closed", !open);
  els.sidebar.hidden = !open && window.matchMedia("(max-width: 760px)").matches;
}

function syncActivityBar() {
  document.querySelectorAll(".activity").forEach((b) => b.classList.toggle("active", b.dataset.view === sidebarView && sidebarOpen));
}

window.matchMedia("(max-width: 760px)").addEventListener("change", (e) => {
  setSidebar(!e.matches);
  syncActivityBar();
});

document.querySelectorAll(".activity").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.view;
    if (next === sidebarView && sidebarOpen) {
      setSidebar(false);
    } else {
      sidebarView = next;
      setSidebar(true);
    }
    syncActivityBar();
    document.querySelectorAll(".view").forEach((v) => { v.hidden = v.dataset.view !== sidebarView; });
    if (sidebarView === "records") renderRecords();
  });
});

/* ================================================================
 * 터미널, 문제 패널
 * ================================================================ */

function termLine(parts) {
  const div = document.createElement("div");
  for (const [cls, text] of parts) {
    const span = document.createElement("span");
    if (cls) span.className = cls;
    span.textContent = text;
    div.append(span);
  }
  els.terminal.append(div);
  while (els.terminal.childElementCount > 300) els.terminal.firstChild.remove();
  els.terminal.scrollTop = els.terminal.scrollHeight;
}

function termCommand(cmd) {
  termLine([["term-path", "~/typing-practice"], ["term-prompt", " $ "], [null, cmd]]);
}

function showChar(ch) {
  if (ch === null) return "end of line";
  if (ch === " ") return "' ' (space)";
  return `'${ch}'`;
}

function addProblem(i, expected, got) {
  const ln = session.index + 1;
  const col = i + 1;
  const item = { file: LANGS[session.lang].file, ln, col, msg: `Expected ${showChar(expected)} but got ${showChar(got)}` };
  session.problems.push(item);
  const li = document.createElement("li");
  li.innerHTML = '<i class="codicon codicon-error"></i>';
  const msg = document.createElement("span");
  msg.className = "problem-code";
  msg.textContent = item.msg;
  const loc = document.createElement("span");
  loc.className = "problem-loc";
  loc.textContent = `${item.file} [Ln ${ln}, Col ${col}]`;
  li.append(msg, loc);
  const empty = els.problems.querySelector(".empty");
  if (empty) empty.remove();
  els.problems.prepend(li);
  els.problemBadge.textContent = String(session.problems.length);
}

function clearProblems() {
  els.problems.innerHTML = '<li class="empty">작업 영역에서 문제가 감지되지 않았습니다.</li>';
  els.problemBadge.textContent = "0";
}

function topMissed(missed, n) {
  return Object.entries(missed).sort((a, b) => b[1] - a[1]).slice(0, n);
}

function addMissedSummary() {
  const top = topMissed(session.missed, 3);
  if (!top.length) return;
  const li = document.createElement("li");
  li.innerHTML = '<i class="codicon codicon-info"></i>';
  const msg = document.createElement("span");
  msg.className = "problem-code";
  msg.textContent = "자주 틀린 문자: " + top.map(([ch, n]) => `${showChar(ch)} ${n}회`).join(", ");
  li.append(msg);
  els.problems.prepend(li);
}

document.querySelectorAll(".panel-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".panel-tab").forEach((t) => t.classList.toggle("active", t === tab));
    $("panel-problems").hidden = tab.dataset.panel !== "problems";
    $("panel-terminal").hidden = tab.dataset.panel !== "terminal";
    if (view === "editor") focusInput();
  });
});

/* ================================================================
 * 상태 표시줄
 * ================================================================ */

function updateStatus() {
  const s = els.status;
  if (!session) {
    s.pos.textContent = "Ln 1, Col 1";
    s.wpm.textContent = "0 WPM";
    s.acc.textContent = "정확도 100%";
    s.combo.textContent = "콤보 0";
    s.lang.textContent = "일반 텍스트";
  } else {
    const ln = Math.min(session.index + 1, LINES_PER_SESSION);
    s.pos.textContent = `Ln ${ln}, Col ${session.typed.length + 1}`;
    if (!session.finished) s.wpm.textContent = `${calcWpm(session.correct, session.startTime)} WPM`;
    s.acc.textContent = `정확도 ${calcAcc(session.correct, session.total)}%`;
    s.combo.textContent = `콤보 ${session.combo}`;
    s.lang.textContent = LANGS[session.lang].label;
    s.errors.textContent = String(session.problems.length);
    s.warnings.textContent = String(session.warnings);
  }
  s.rank.textContent = RANKS[store.rankIndex].name;
}

/* ================================================================
 * 파워 모드
 * ================================================================ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const particles = [];
let particleRAF = null;

function powerLevel(combo) {
  return POWER_LEVELS.find((l) => combo >= l.combo) || null;
}

function updateCombo() {
  const combo = session ? session.combo : 0;
  const lv = powerLevel(combo);
  els.combo.classList.toggle("show", store.powerMode && combo >= 10);
  els.combo.classList.remove("lv1", "lv2", "lv3");
  if (lv) els.combo.classList.add(lv.combo >= 100 ? "lv3" : lv.combo >= 50 ? "lv2" : "lv1");
  els.comboNum.textContent = String(combo);
  if (store.powerMode && combo >= 10) {
    els.combo.classList.remove("bump");
    void els.combo.offsetWidth;
    els.combo.classList.add("bump");
  }
  els.status.combo.textContent = `콤보 ${combo}`;
}

function powerHit(i, target) {
  if (!store.powerMode) return;
  const lv = powerLevel(session.combo);
  if (!lv) return;
  // 커서 위치는 다음 렌더 후에 정해지므로 한 프레임 뒤에 뿌린다
  const type = charTypes(session.lang, target)[i];
  requestAnimationFrame(() => spawnParticles(lv.particles, type));
  if (lv.shake && !reducedMotion.matches) {
    const cls = `shake-${lv.shake}`;
    els.editorScroll.classList.remove("shake-1", "shake-2");
    void els.editorScroll.offsetWidth;
    els.editorScroll.classList.add(cls);
  }
}

function spawnParticles(count, type) {
  const cursor = $("cursor");
  if (!cursor) return;
  const area = els.editor.getBoundingClientRect();
  const c = cursor.getBoundingClientRect();
  const color = getComputedStyle(document.documentElement).getPropertyValue(`--syn-${type}`).trim() || "#ffffff";
  const x = c.left - area.left;
  const y = c.top - area.top + c.height / 2;
  for (let k = 0; k < count; k++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 5,
      vy: -Math.random() * 4 - 1,
      life: 1,
      size: 2 + Math.random() * 2.5,
      color,
    });
  }
  if (!particleRAF) particleRAF = requestAnimationFrame(tickParticles);
}

function tickParticles() {
  const cv = els.particles;
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth;
  const h = cv.clientHeight;
  const pw = Math.round(w * dpr); const ph = Math.round(h * dpr);
  if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  for (let k = particles.length - 1; k >= 0; k--) {
    const p = particles[k];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.22;
    p.life -= 0.03;
    if (p.life <= 0) { particles.splice(k, 1); continue; }
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
  ctx.globalAlpha = 1;
  particleRAF = particles.length ? requestAnimationFrame(tickParticles) : null;
  if (!particleRAF) ctx.clearRect(0, 0, w, h);
}

/* ================================================================
 * 알림 토스트, 업적, 직급
 * ================================================================ */

function toast(message, { icon = "codicon-info", error = false, timeout = 6000 } = {}) {
  const el = document.createElement("div");
  el.className = "toast" + (error ? " error" : "");
  const ic = document.createElement("i");
  ic.className = `codicon ${icon}`;
  const msg = document.createElement("div");
  msg.className = "toast-msg";
  msg.textContent = message;
  const close = document.createElement("button");
  close.className = "toast-close";
  close.setAttribute("aria-label", "알림 닫기");
  close.innerHTML = '<i class="codicon codicon-close"></i>';
  close.addEventListener("click", () => el.remove());
  el.append(ic, msg, close);
  els.toasts.append(el);
  while (els.toasts.childElementCount > 4) els.toasts.firstChild.remove();
  setTimeout(() => el.remove(), timeout);
}

function unlock(id) {
  if (store.achievements.includes(id)) return;
  store.achievements.push(id);
  saveStore();
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  toast(`Extension '${a.ext}' 설치 완료: ${a.desc}`, { icon: "codicon-extensions" });
}

function checkComboAchievements() {
  if (session.combo >= 50) unlock("combo50");
  if (session.combo >= 100) unlock("combo100");
}

function rankFor(wpm, acc) {
  let idx = 0;
  RANKS.forEach((r, i) => { if (wpm >= r.wpm && acc >= r.acc) idx = i; });
  return idx;
}

/* ================================================================
 * 세션 종료, 기록
 * ================================================================ */

function todayString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDuration(ms) {
  const s = Math.round(ms / 1000);
  return s >= 60 ? `${Math.floor(s / 60)}분 ${s % 60}초` : `${s}초`;
}

function finishSession() {
  session.finished = true;
  clearInterval(wpmTimer);
  const lang = session.lang;
  const wpm = calcWpm(session.correct, session.startTime);
  const acc = calcAcc(session.correct, session.total);
  const durationMs = performance.now() - session.startTime;

  // 기록
  const best = store.best[lang] || { wpm: 0, acc: 0, sessions: 0 };
  best.wpm = Math.max(best.wpm, wpm);
  best.acc = Math.max(best.acc, acc);
  best.sessions += 1;
  store.best[lang] = best;

  // 업적
  unlock("first");
  if (wpm >= 40) unlock("wpm40");
  if (wpm >= 60) unlock("wpm60");
  if (wpm >= 80) unlock("wpm80");
  if (wpm >= 100) unlock("wpm100");
  if (acc === 100) unlock("perfect");
  if (Object.keys(LANGS).every((l) => store.best[l] && store.best[l].sessions > 0)) unlock("polyglot");

  // 직급
  const rank = rankFor(wpm, acc);
  if (rank > store.rankIndex) {
    store.rankIndex = rank;
    toast(`직급이 ${RANKS[rank].name}(으)로 올랐습니다.`, { icon: "codicon-account" });
  }
  saveStore();

  termCommand("git commit -am \"practice\"");
  termLine([["term-ok", `Session complete: ${session.done.length} lines, ${wpm} WPM, ${acc}%, ${formatDuration(durationMs)}`]]);
  addMissedSummary();

  lastResult = {
    lang,
    wpm,
    accuracy: acc,
    maxCombo: session.maxCombo,
    rank: RANKS[store.rankIndex].name,
    date: todayString(),
    duration: durationMs,
    errors: session.problems.length,
    missed: topMissed(session.missed, 3),
  };

  renderLines();
  renderFiles();
  renderRecords();
  updateStatus();
  els.status.wpm.textContent = `${wpm} WPM`;
  showResult();
}

function renderRecords() {
  const body = $("records-body");
  body.textContent = "";
  for (const [lang, meta] of Object.entries(LANGS)) {
    const b = store.best[lang];
    const tr = document.createElement("tr");
    const cells = [meta.file, b ? String(b.wpm) : "-", b ? `${b.acc}%` : "-", b ? String(b.sessions) : "0"];
    cells.forEach((text, i) => {
      const td = document.createElement("td");
      td.textContent = text;
      if (i === 0) td.className = `lang-${lang}`;
      tr.append(td);
    });
    body.append(tr);
  }

  $("rank-name").textContent = RANKS[store.rankIndex].name;
  const next = RANKS[store.rankIndex + 1];
  $("rank-next").textContent = next
    ? `${next.name}: 한 세션에서 ${next.wpm} WPM 이상, 정확도 ${next.acc}% 이상`
    : "가장 높은 직급입니다.";

  const list = $("achievement-list");
  list.textContent = "";
  for (const a of ACHIEVEMENTS) {
    const got = store.achievements.includes(a.id);
    const li = document.createElement("li");
    if (!got) li.className = "locked";
    li.innerHTML = `<i class="codicon ${got ? "codicon-pass-filled" : "codicon-lock"}"></i>`;
    const text = document.createElement("span");
    const name = document.createElement("span");
    name.className = "ach-name";
    name.textContent = a.ext;
    const desc = document.createElement("span");
    desc.className = "ach-desc";
    desc.textContent = a.desc;
    text.append(name, desc);
    li.append(text);
    list.append(li);
  }
}

/* ================================================================
 * 결과 화면, 공유
 * ================================================================ */

function nicknameValue() {
  const v = els.nickname.value.trim();
  return v || DEFAULT_NICKNAME;
}

function showResult() {
  els.nickname.value = store.nickname || "";
  const stats = [
    ["WPM", String(lastResult.wpm)],
    ["정확도", `${lastResult.accuracy}%`],
    ["최대 콤보", String(lastResult.maxCombo)],
    ["걸린 시간", formatDuration(lastResult.duration)],
    ["오타", `${lastResult.errors}개`],
    ["자주 틀린 문자", lastResult.missed.length ? lastResult.missed.map(([ch]) => (ch === " " ? "space" : ch)).join(" ") : "없음"],
  ];
  els.resultStats.textContent = "";
  for (const [k, v] of stats) {
    const dt = document.createElement("dt");
    dt.textContent = k;
    const dd = document.createElement("dd");
    dd.textContent = v;
    els.resultStats.append(dt, dd);
  }
  setView("result");
  els.input.blur();
  drawCard();
}

els.nickname.addEventListener("input", () => {
  store.nickname = els.nickname.value.trim();
  saveStore();
  drawCard();
});

function cardLines(r, nickname) {
  return [
    "// result.js : typing-practice",
    "const result = {",
    `  nickname: ${JSON.stringify(nickname)},`,
    `  lang: ${JSON.stringify(r.lang)},`,
    `  wpm: ${r.wpm},`,
    `  accuracy: ${r.accuracy},`,
    `  maxCombo: ${r.maxCombo},`,
    `  rank: ${JSON.stringify(r.rank)},`,
    `  date: ${JSON.stringify(r.date)},`,
    "};",
  ];
}

let cardDrawId = 0;

async function drawCard() {
  if (!lastResult) return;
  const id = ++cardDrawId;
  try {
    await document.fonts.load('15px "Jetendard"');
    await document.fonts.ready;
  } catch (e) {
    /* 대체 글꼴로 그린다 */
  }
  if (id !== cardDrawId || !lastResult) return;

  const css = getComputedStyle(document.documentElement);
  const v = (name) => css.getPropertyValue(name).trim();
  const lines = cardLines(lastResult, nicknameValue());
  const scale = 2;
  const W = 640;
  const titleH = 36;
  const lineH = 26;
  const padY = 18;
  const statusH = 24;
  const H = titleH + padY * 2 + lines.length * lineH + statusH;
  const cv = els.card;
  cv.width = W * scale;
  cv.height = H * scale;
  const ctx = cv.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const code = '15px "Jetendard", "D2Coding", Consolas, Menlo, monospace';
  const ui = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", sans-serif';

  // 창 틀
  ctx.save();
  roundRect(ctx, 0, 0, W, H, 10);
  ctx.clip();
  ctx.fillStyle = v("--editor-bg");
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = v("--titlebar-bg");
  ctx.fillRect(0, 0, W, titleH);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(18 + i * 20, titleH / 2, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = ui;
  ctx.fillStyle = v("--titlebar-fg");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("result.js — typing-practice", W / 2, titleH / 2);

  // 코드
  ctx.font = code;
  lines.forEach((line, i) => {
    const y = titleH + padY + i * lineH + lineH / 2;
    ctx.textAlign = "right";
    ctx.fillStyle = v("--line-number");
    ctx.fillText(String(i + 1), 40, y);
    ctx.textAlign = "left";
    let x = 60;
    for (const tok of tokenize("javascript", line)) {
      ctx.fillStyle = v(`--syn-${tok.type}`) || v("--editor-fg");
      ctx.fillText(tok.text, x, y);
      x += ctx.measureText(tok.text).width;
    }
  });

  // 상태 표시줄
  const sy = H - statusH;
  ctx.fillStyle = v("--status-bg");
  ctx.fillRect(0, sy, W, statusH);
  ctx.font = ui;
  ctx.fillStyle = v("--status-fg");
  ctx.textAlign = "left";
  ctx.fillText(`${LANGS[lastResult.lang].file}`, 12, sy + statusH / 2);
  ctx.textAlign = "right";
  ctx.fillText(`${lastResult.wpm} WPM   정확도 ${lastResult.accuracy}%   ${lastResult.rank}`, W - 12, sy + statusH / 2);
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function cardBlob() {
  return new Promise((resolve) => els.card.toBlob(resolve, "image/png"));
}

function safeFilePart(s) {
  return s.replace(/[\\/:*?"<>|\s]+/g, "_");
}

$("btn-save").addEventListener("click", async () => {
  await drawCard();
  const blob = await cardBlob();
  if (!blob) { toast("이미지를 만들지 못했습니다.", { icon: "codicon-error", error: true }); return; }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `typing-${safeFilePart(nicknameValue())}-${lastResult.lang}.png`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

const copyImageBtn = $("btn-copy-image");
if (!(navigator.clipboard && window.ClipboardItem && window.isSecureContext)) copyImageBtn.hidden = true;

copyImageBtn.addEventListener("click", async () => {
  try {
    await drawCard();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": cardBlob() })]);
    toast("이미지를 복사했습니다.", { icon: "codicon-check" });
  } catch (e) {
    copyImageBtn.hidden = true;
    toast("이 브라우저에서는 이미지를 복사할 수 없습니다. 이미지 저장을 사용하세요.", { icon: "codicon-error", error: true });
  }
});

$("btn-copy-text").addEventListener("click", async () => {
  const r = lastResult;
  const text = `⌨️ ${nicknameValue()} · ${LANGS[r.lang].label} · ${r.wpm} WPM · ${r.accuracy}% · 최대 콤보 ${r.maxCombo}`;
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    // file:// 등에서 Clipboard API가 막히면 예전 방식으로 복사한다
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    if (!ok) { toast("텍스트를 복사하지 못했습니다.", { icon: "codicon-error", error: true }); return; }
  }
  toast("텍스트를 복사했습니다.", { icon: "codicon-check" });
});

$("btn-retry").addEventListener("click", () => startSession(lastResult.lang));

/* ================================================================
 * 설정
 * ================================================================ */

function applyTheme(id) {
  document.documentElement.dataset.theme = id;
  store.theme = id;
  saveStore();
  if (view === "result") drawCard();
}

function renderThemeOptions() {
  const box = $("theme-options");
  box.textContent = "";
  for (const t of THEMES) {
    const label = document.createElement("label");
    label.className = "radio";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "theme";
    input.value = t.id;
    input.checked = store.theme === t.id;
    input.addEventListener("change", () => applyTheme(t.id));
    label.append(input, t.label);
    box.append(label);
  }
}

const powerToggle = $("power-toggle");
powerToggle.addEventListener("change", () => {
  store.powerMode = powerToggle.checked;
  saveStore();
  updateCombo();
});

$("reset-records").addEventListener("click", () => {
  if (!confirm("최고 기록, 업적, 직급을 모두 지울까요?")) return;
  store.best = {};
  store.achievements = [];
  store.rankIndex = 0;
  saveStore();
  renderRecords();
  renderFiles();
  updateStatus();
  toast("기록을 초기화했습니다.");
});

/* ================================================================
 * 시작
 * ================================================================ */

function init() {
  if (!THEMES.some((t) => t.id === store.theme)) store.theme = "dark-plus";
  document.documentElement.dataset.theme = store.theme;
  powerToggle.checked = store.powerMode;
  setSidebar(sidebarOpen);
  syncActivityBar();
  renderThemeOptions();
  renderFiles();
  renderWelcomeLinks();
  renderRecords();
  clearProblems();
  updateStatus();
  setView("welcome");
  termLine([["term-dim", "typing-practice 터미널. 파일을 열면 여기에 실행 결과가 찍힙니다."]]);
}

init();
