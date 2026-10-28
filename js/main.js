// ===== 데이터 (책·영화를 추가하려면 여기에 한 줄씩 넣으세요) =====
const books = [
  { title: '데미안', author: '헤르만 헤세', genre: '문학', rating: 5, note: '자기 자신에게 이르는 길에 대한 이야기.' },
  { title: '채식주의자', author: '한강', genre: '문학', rating: 5, note: '폭력과 저항에 대한 서늘한 질문.' },
  { title: '사피엔스', author: '유발 하라리', genre: '인문', rating: 4, note: '인류사를 한눈에 꿰는 대담한 시선.' },
  { title: '정의란 무엇인가', author: '마이클 샌델', genre: '인문', rating: 4, note: '강의실 토론의 좋은 출발점.' },
  { title: '코스모스', author: '칼 세이건', genre: '과학', rating: 5, note: '우주 앞에서 겸손해지는 책.' },
  { title: '이기적 유전자', author: '리처드 도킨스', genre: '과학', rating: 4, note: '생명을 바라보는 관점을 뒤집다.' }
];

const movies = [
  { title: '기생충', director: '봉준호', genre: '드라마', year: 2019, emoji: '🏠', note: '계단과 냄새로 그린 계급의 풍경.' },
  { title: '쇼생크 탈출', director: '프랭크 다라본트', genre: '드라마', year: 1994, emoji: '🗝️', note: '희망은 좋은 것이다.' },
  { title: '인터스텔라', director: '크리스토퍼 놀란', genre: 'SF', year: 2014, emoji: '🪐', note: '시간과 사랑에 대한 장대한 서사.' },
  { title: '블레이드 러너', director: '리들리 스콧', genre: 'SF', year: 1982, emoji: '🌃', note: '인간다움이란 무엇인가.' },
  { title: '시민 케인', director: '오슨 웰스', genre: '고전', year: 1941, emoji: '🎬', note: '로즈버드, 영화사의 영원한 수수께끼.' },
  { title: '카사블랑카', director: '마이클 커티즈', genre: '고전', year: 1942, emoji: '✈️', note: '그대 눈동자에 건배를.' }
];

const quotes = [
  '“책은 한 권 한 권이 하나의 세계다.” — 윌리엄 워즈워스',
  '“영화는 1초에 24번의 진실이다.” — 장뤽 고다르',
  '“가르치는 것은 두 번 배우는 것이다.” — 조제프 주베르',
  '“독서는 완성된 사람을 만든다.” — 프랜시스 베이컨'
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== 책·영화 카드 =====
const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

function renderBooks(filter = 'all') {
  document.getElementById('book-list').innerHTML = books
    .filter((b) => filter === 'all' || b.genre === filter)
    .map((b) => `
      <article class="card">
        <div class="card-body">
          <span class="emoji" aria-hidden="true">📖</span>
          <h3>${b.title}</h3>
          <p class="meta">${b.author}</p>
          <p>${b.note}</p>
          <p class="stars" aria-label="별점 ${b.rating}점">${stars(b.rating)}</p>
          <ul class="tags tags-sm"><li>${b.genre}</li></ul>
        </div>
      </article>`)
    .join('');
}

function renderMovies(filter = 'all') {
  document.getElementById('movie-list').innerHTML = movies
    .filter((m) => filter === 'all' || m.genre === filter)
    .map((m) => `
      <article class="card">
        <div class="card-body">
          <span class="emoji" aria-hidden="true">${m.emoji}</span>
          <h3>${m.title}</h3>
          <p class="meta">${m.director} · ${m.year}</p>
          <p>${m.note}</p>
          <ul class="tags tags-sm"><li>${m.genre}</li></ul>
        </div>
      </article>`)
    .join('');
}

document.querySelectorAll('.filters').forEach((group) => {
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    group.querySelectorAll('.filter').forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    const filter = btn.dataset.filter;
    group.dataset.group === 'books' ? renderBooks(filter) : renderMovies(filter);
  });
});

renderBooks();
renderMovies();

// ===== 다크 모드 토글 =====
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
});

// ===== 모바일 메뉴 =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function setMenu(open) {
  navMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}

navToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// ===== 명언 순환 =====
const quoteEl = document.getElementById('quote');
let quoteIndex = 0;

if (!reduceMotion) {
  setInterval(() => {
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteEl.textContent = quotes[quoteIndex];
      quoteEl.style.opacity = 1;
    }, 400);
  }, 5000);
}

// ===== 숫자 카운트 =====
function countUp(el) {
  const target = Number(el.dataset.target);
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / 1500, 1);
    el.textContent = Math.floor(target * p) + (p === 1 ? '+' : '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ===== 스크롤 등장 효과 + 카운트 시작 =====
const revealTargets = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.num');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains('num')) {
        if (!reduceMotion) countUp(entry.target);
      } else {
        entry.target.classList.add('visible');
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  revealTargets.forEach((el) => observer.observe(el));
  counters.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('visible'));
}

// ===== 현재 섹션 메뉴 강조 + 맨 위로 버튼 =====
const sections = document.querySelectorAll('main section[id]');
const toTop = document.getElementById('to-top');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navMenu.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
  toTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// ===== 연락처 폼 (데모: 실제로 전송되지는 않음) =====
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value.trim();
  document.getElementById('form-msg').textContent = `${name}님, 메시지 감사합니다! 곧 답장드리겠습니다.`;
  e.target.reset();
});

// ===== 푸터 연도 =====
document.getElementById('year').textContent = new Date().getFullYear();
