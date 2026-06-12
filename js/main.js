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


/*   Mise a JOur Articles    */
<script>
  // ─── CHARGEMENT DYNAMIQUE DES ARTICLES ───
  async function loadArticles() {
    try {
      // 1. Récupérer le fichier JSON
      const response = await fetch('articles/data.json');
      if (!response.ok) throw new Error("Fichier JSON introuvable");
      const articles = await response.json();

      // 2. Trier les articles par date (du plus récent au plus ancien)
      articles.sort((a, b) => new Date(b.date) - new Date(a.date));

      // 3. Mettre à jour le compteur dans le titre de la section
      const countElement = document.querySelector('.article-count');
      if (countElement) {
        countElement.textContent = `(${articles.length})`;
      }

      // 4. Générer le HTML
      const container = document.getElementById('articles-container');
      let html = '';

      articles.forEach(article => {
        // Générer les tags dynamiquement
        const tagsHtml = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // Construire la carte de l'article (format article-row)
        html += `
        <a href="articles/${article.slug}" class="article-row reveal" data-timestamp="${article.date}">
          <div class="article-row-date">
            <div class="month">${article.month}</div>
            <div class="year">${article.year}</div>
          </div>
          <div class="article-row-body">
            <div class="article-row-tags">
              ${tagsHtml}
            </div>
            <div class="article-row-title">
              <span class="en">${article.title_en}</span>
              <span class="fr">${article.title_fr}</span>
            </div>
            <div class="article-row-desc">
              <span class="en">${article.desc_en}</span>
              <span class="fr">${article.desc_fr}</span>
            </div>
          </div>
          <div class="article-row-arrow">→</div>
        </a>`;
      });

      // 5. Injecter le HTML dans la page
      container.innerHTML = html;

      // 6. Réactiver l'animation d'apparition au scroll (Scroll Reveal) pour les nouveaux éléments
      initScrollReveal();

    } catch (error) {
      console.error("Erreur lors du chargement des articles :", error);
      const container = document.getElementById('articles-container');
      if (container) {
        container.innerHTML = `<p style="text-align:center; color:var(--red);">Impossible de charger les articles. (Vérifiez que vous utilisez un serveur local ou GitHub Pages)</p>`;
      }
    }
  }

  // ─── GESTION DU SCROLL REVEAL (À adapter si vous l'avez déjà dans main.js) ───
  function initScrollReveal() {
    // Supprimer les anciens observateurs pour éviter les doublons
    if (window.scrollObserver) {
      window.scrollObserver.disconnect();
    }

    window.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Assurez-vous que votre CSS a une classe .visible
          window.scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observer tous les éléments avec la classe .reveal
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
      window.scrollObserver.observe(el);
    });
  }

  // Lancer le chargement au démarrage de la page
  document.addEventListener('DOMContentLoaded', loadArticles);
</script>



