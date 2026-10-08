/* ═══════════════════════════════════════════════════════
   Portfolio – Hocine Benbara
   main.js
═══════════════════════════════════════════════════════ */

/* ── Restore saved preferences immediately ── */
(function () {
  var t = localStorage.getItem('theme') || 'dark';
  var l = localStorage.getItem('lang')  || 'en';
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.setAttribute('data-lang',  l);
  document.documentElement.setAttribute('lang', l);
})();

document.addEventListener('DOMContentLoaded', function () {
  var t = document.documentElement.getAttribute('data-theme');
  var l = document.documentElement.getAttribute('data-lang');
  document.getElementById('themeBtn').textContent = t === 'dark' ? '☀' : '🌙';
  document.getElementById('langBtn').textContent  = l === 'en'   ? 'FR' : 'EN';
});

/* ── Theme toggle ── */
function toggleTheme() {
  var html   = document.documentElement;
  var isDark = html.getAttribute('data-theme') === 'dark';
  var next   = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  document.getElementById('themeBtn').textContent = isDark ? '🌙' : '☀';
  localStorage.setItem('theme', next);
}

/* ── Language toggle ── */
function toggleLang() {
  var html  = document.documentElement;
  var isEN  = html.getAttribute('data-lang') === 'en';
  var next  = isEN ? 'fr' : 'en';
  html.setAttribute('data-lang', next);
  html.setAttribute('lang', next);
  document.getElementById('langBtn').textContent = isEN ? 'EN' : 'FR';
  localStorage.setItem('lang', next);
}

/* ── Code tab switcher ── */
function switchTab(btn, tabId) {
  var block = btn.closest('.code-block');
  block.querySelectorAll('.code-tab').forEach(function (t) { t.classList.remove('active'); });
  block.querySelectorAll('.code-content').forEach(function (c) { c.classList.remove('active'); });
  btn.classList.add('active');
  var target = block.querySelector('#' + tabId);
  if (target) target.classList.add('active');
}

/* ── Smooth scroll to code block ── */
function scrollTo(id) {
  setTimeout(function () {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ── Scroll reveal ── */
var revealEls = document.querySelectorAll('.reveal');
var observer  = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(function (el) { observer.observe(el); });

/* ── Active nav link on scroll ── */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function () {
  var current = '';
  sections.forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 150) current = s.getAttribute('id');
  });
  navLinks.forEach(function (a) {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });
