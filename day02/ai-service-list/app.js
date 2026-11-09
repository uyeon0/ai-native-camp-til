const CATEGORIES = ["전체", ...new Set(SERVICES.map((s) => s.category))];

const state = { category: "전체", query: "" };

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const resultCount = document.getElementById("result-count");
const empty = document.getElementById("empty");
const dialog = document.getElementById("detail");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// 원본 데이터는 "- 항목" 줄바꿈이나 " / " 구분자가 섞여 있어서 목록으로 쪼갠다
function toItems(text) {
  return text
    .split(/\n| \/ /)
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

// 검색어와 일치하는 부분을 <mark>로 감싼 조각을 만든다
function highlight(text) {
  const fragment = document.createDocumentFragment();
  if (!state.query) {
    fragment.append(text);
    return fragment;
  }
  const lower = text.toLowerCase();
  let start = 0;
  let index = lower.indexOf(state.query);
  while (index !== -1) {
    fragment.append(text.slice(start, index), el("mark", null, text.slice(index, index + state.query.length)));
    start = index + state.query.length;
    index = lower.indexOf(state.query, start);
  }
  fragment.append(text.slice(start));
  return fragment;
}

function withHighlight(tag, className, text) {
  const node = el(tag, className);
  node.append(highlight(text));
  return node;
}

function renderFilters() {
  CATEGORIES.forEach((category) => {
    const count = category === "전체"
      ? SERVICES.length
      : SERVICES.filter((s) => s.category === category).length;

    const chip = el("button", "chip", category);
    chip.type = "button";
    chip.setAttribute("aria-pressed", String(category === state.category));
    chip.append(el("span", "count", String(count)));
    chip.addEventListener("click", () => {
      state.category = category;
      filters.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      renderGrid({ animate: true });
    });
    filters.append(chip);
  });
}

function matches(service) {
  if (state.category !== "전체" && service.category !== state.category) return false;
  if (!state.query) return true;
  const haystack = [service.name, service.summary, service.useCases, service.category]
    .join(" ")
    .toLowerCase();
  return haystack.includes(state.query);
}

function createCard(service, index) {
  const item = el("li");
  item.style.setProperty("--i", index);
  const card = el("button", "card");
  card.type = "button";

  const head = el("div", "card-head");
  const arrow = el("span", "card-arrow");
  arrow.setAttribute("aria-hidden", "true");
  arrow.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const chips = el("div", "chips");
  chips.append(withHighlight("span", "tag", service.category), el("span", "price-chip", service.price));
  if (service.reviews.length) {
    chips.append(el("span", "review-chip", `후기 ${service.reviews.length}`));
  }
  head.append(chips, arrow);

  const use = el("p", "card-use");
  use.append(el("span", "card-use-label", "추천"), highlight(service.useCases));

  card.append(
    head,
    withHighlight("h2", "card-name", service.name),
    withHighlight("p", "card-summary", service.summary),
    use,
  );
  card.addEventListener("click", () => openDetail(service));
  item.append(card);
  return item;
}

// 필터를 바꿀 때만 카드가 순서대로 떠오르게 한다 (검색은 입력마다 다시 그려서 제외)
function renderGrid({ animate = false } = {}) {
  const list = SERVICES.filter(matches);
  grid.classList.toggle("animate", animate);
  grid.replaceChildren(...list.map(createCard));
  resultCount.textContent = `${list.length}개의 서비스`;
  empty.hidden = list.length > 0;
}

function fillList(id, text) {
  const ul = document.getElementById(id);
  ul.replaceChildren(...toItems(text).map((line) => el("li", null, line)));
}

function createReview(review) {
  const item = el("figure", "review");
  const body = el("blockquote", "review-body");
  review.text.split("\n").forEach((line) => body.append(el("p", null, line)));

  const more = el("button", "review-more", "더 보기");
  more.type = "button";
  more.hidden = true;
  more.addEventListener("click", () => {
    const expanded = body.classList.toggle("expanded");
    more.textContent = expanded ? "접기" : "더 보기";
  });

  item.append(body, more);
  return item;
}

function fillReviews(reviews) {
  document.getElementById("detail-reviews-section").hidden = reviews.length === 0;
  document.getElementById("detail-reviews").replaceChildren(...reviews.map(createReview));
}

// dialog가 화면에 그려진 뒤에야 높이를 잴 수 있어서, 열고 나서 긴 후기에만 "더 보기"를 보여준다
function showMoreButtons() {
  dialog.querySelectorAll(".review").forEach((review) => {
    const body = review.querySelector(".review-body");
    const overflowing = body.scrollHeight > body.clientHeight + 1;
    body.classList.toggle("clamped", overflowing);
    review.querySelector(".review-more").hidden = !overflowing;
  });
}

function openDetail(service) {
  document.getElementById("detail-category").textContent = service.category;
  document.getElementById("detail-price").textContent = service.price;
  document.getElementById("detail-name").textContent = service.name;
  document.getElementById("detail-summary").textContent = service.summary;
  document.getElementById("detail-use").textContent = service.useCases;
  fillList("detail-pros", service.pros);
  fillList("detail-cons", service.cons);
  fillReviews(service.reviews);
  document.getElementById("detail-link").href = service.url;
  dialog.showModal();
  showMoreButtons();
  dialog.scrollTop = 0;
}

document.getElementById("detail-close").addEventListener("click", () => dialog.close());

// 바깥(backdrop) 클릭 시 닫기
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

search.addEventListener("input", () => {
  state.query = search.value.trim().toLowerCase();
  renderGrid();
});

renderFilters();
renderGrid({ animate: true });
