// ===== 데이터 =====
const books = [
  { title: "데미안", author: "헤르만 헤세", genre: "문학", rating: 5, note: "자기 자신에게 이르는 길에 대한 이야기." },
  { title: "채식주의자", author: "한강", genre: "문학", rating: 5, note: "폭력과 저항에 대한 서늘한 질문." },
  { title: "사피엔스", author: "유발 하라리", genre: "인문", rating: 4, note: "인류사를 한눈에 꿰는 대담한 시선." },
  { title: "정의란 무엇인가", author: "마이클 샌델", genre: "인문", rating: 4, note: "강의실 토론의 좋은 출발점." },
  { title: "코스모스", author: "칼 세이건", genre: "과학", rating: 5, note: "우주 앞에서 겸손해지는 책." },
  { title: "이기적 유전자", author: "리처드 도킨스", genre: "과학", rating: 4, note: "생명을 바라보는 관점을 뒤집다." }
];

const movies = [
  { title: "기생충", director: "봉준호", genre: "드라마", year: 2019, emoji: "🏠", note: "계단과 냄새로 그린 계급의 풍경." },
  { title: "쇼생크 탈출", director: "프랭크 다라본트", genre: "드라마", year: 1994, emoji: "🗝️", note: "희망은 좋은 것이다." },
  { title: "인터스텔라", director: "크리스토퍼 놀란", genre: "SF", year: 2014, emoji: "🪐", note: "시간과 사랑에 대한 장대한 서사." },
  { title: "블레이드 러너", director: "리들리 스콧", genre: "SF", year: 1982, emoji: "🌃", note: "인간다움이란 무엇인가." },
  { title: "시민 케인", director: "오슨 웰스", genre: "고전", year: 1941, emoji: "🎬", note: "로즈버드, 영화사의 영원한 수수께끼." },
  { title: "카사블랑카", director: "마이클 커티즈", genre: "고전", year: 1942, emoji: "✈️", note: "그대 눈동자에 건배를." }
];

const quotes = [
  "“책은 한 권 한 권이 하나의 세계다.” — 윌리엄 워즈워스",
  "“영화는 1초에 24번의 진실이다.” — 장뤽 고다르",
  "“가르치는 것은 두 번 배우는 것이다.” — 조제프 주베르",
  "“독서는 완성된 사람을 만든다.” — 프랜시스 베이컨"
];

// ===== 렌더링 =====
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

function renderBooks(filter = "all") {
  const list = document.getElementById("book-list");
  list.innerHTML = books
    .filter((b) => filter === "all" || b.genre === filter)
    .map((b) => `
      <article class="card reveal">
        <span class="emoji">📖</span>
        <h3>${b.title}</h3>
        <p class="meta">${b.author}</p>
        <p>${b.note}</p>
        <span class="stars">${stars(b.rating)}</span>
        <span class="tag">${b.genre}</span>
      </article>`)
    .join("");
  observeReveal();
}

function renderMovies(filter = "all") {
  const list = document.getElementById("movie-list");
  list.innerHTML = movies
    .filter((m) => filter === "all" || m.genre === filter)
    .map((m) => `
      <article class="card reveal">
        <span class="emoji">${m.emoji}</span>
        <h3>${m.title}</h3>
        <p class="meta">${m.director} · ${m.year}</p>
        <p>${m.note}</p>
        <span class="tag">${m.genre}</span>
      </article>`)
    .join("");
  observeReveal();
}

// ===== 필터 =====
document.querySelectorAll(".filters").forEach((group) => {
  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    group.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    group.dataset.group === "books" ? renderBooks(filter) : renderMovies(filter);
  });
});

// ===== 스크롤 등장 애니메이션 =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeReveal() {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
}

// ===== 숫자 카운트 =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target);
    const start = performance.now();
    const duration = 1500;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * p) + (p === 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll(".num").forEach((el) => counterObserver.observe(el));

// ===== 명언 순환 =====
const quoteEl = document.getElementById("quote");
let quoteIndex = 0;
quoteEl.textContent = quotes[0];
setInterval(() => {
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteEl.textContent = quotes[quoteIndex];
    quoteEl.style.opacity = 1;
  }, 500);
}, 5000);

// ===== 다크 모드 =====
const themeBtn = document.querySelector(".theme-toggle");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

// ===== 모바일 메뉴 =====
const navLinks = document.querySelector(".nav-links");
document.querySelector(".menu-toggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// ===== 현재 섹션 메뉴 강조 + 맨 위로 버튼 =====
const sections = document.querySelectorAll("main section[id]");
const toTop = document.getElementById("to-top");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  toTop.classList.toggle("show", window.scrollY > 400);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== 연락처 폼 (데모) =====
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  document.getElementById("form-msg").textContent = `${name}님, 메시지 감사합니다! 곧 답장드리겠습니다.`;
  e.target.reset();
});

// ===== 초기화 =====
document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".section-title, .about-grid, #teaching .card").forEach((el) => el.classList.add("reveal"));
renderBooks();
renderMovies();
observeReveal();
