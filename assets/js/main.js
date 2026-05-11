/* ── LANGUAGE ──────────────────────────────── */
const LANG_KEY = 'arreuLang';

function applyLang(lang) {
  if (typeof translations === 'undefined') return;
  const t = translations[lang];
  if (!t) return;

  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const page = document.body.getAttribute('data-page') || 'index';
  const titles = {
    es: { index: "Arreu Begur — Street Food & Drinks", carta: "Carta — Arreu Begur", galeria: "Galería — Arreu Begur", contacto: "Contacto — Arreu Begur" },
    ca: { index: "Arreu Begur — Street Food & Drinks", carta: "Carta — Arreu Begur", galeria: "Galeria — Arreu Begur", contacto: "Contacte — Arreu Begur" },
    en: { index: "Arreu Begur — Street Food & Drinks", carta: "Menu — Arreu Begur", galeria: "Gallery — Arreu Begur", contacto: "Contact — Arreu Begur" },
    fr: { index: "Arreu Begur — Street Food & Drinks", carta: "Carte — Arreu Begur", galeria: "Galerie — Arreu Begur", contacto: "Contact — Arreu Begur" },
  };
  if (titles[lang] && titles[lang][page]) document.title = titles[lang][page];
}

function bindLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
    btn.addEventListener('touchend', e => {
      e.preventDefault();
      applyLang(btn.getAttribute('data-lang'));
    });
  });
}

bindLangButtons();
applyLang(localStorage.getItem(LANG_KEY) || 'es');

/* ── FADE IN OBSERVER ──────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── GALLERY LIGHTBOX ──────────────────────── */
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.getAttribute('data-src') || item.querySelector('img').src;
      lightbox.classList.add('open');
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
}
