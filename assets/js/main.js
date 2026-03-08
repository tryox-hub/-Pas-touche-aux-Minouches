// =============================================
// MAIN.JS — Scripts communs (async Supabase)
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  // Navbar burger
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.classList.toggle('active');
    });
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Bannière "démo" si Supabase non configuré
  if (!DataManager.isConfigured()) {
    const banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);background:#5c4033;color:white;padding:0.65rem 1.5rem;border-radius:999px;font-size:0.82rem;font-family:Quicksand,sans-serif;font-weight:600;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.2);white-space:nowrap;';
    banner.innerHTML = '⚠️ Mode démo — <a href="admin.html" style="color:#f1908c;text-decoration:underline;">Configurer Supabase</a> pour activer la sauvegarde permanente';
    document.body.appendChild(banner);
    setTimeout(() => banner.style.opacity = '0', 8000);
  }

  // Stats counter
  await animateStats();

  // Grille d'accueil
  await renderFeaturedCats();
});

async function animateStats() {
  const stats = await DataManager.getStats();
  const targets = [
    { el: document.querySelector('#statAdopted .stat-num'), val: stats.totalAdopted },
    { el: document.querySelector('#statCats .stat-num'),    val: stats.totalRescued },
    { el: document.querySelector('#statYears .stat-num'),   val: stats.yearsActive }
  ];
  targets.forEach(({ el, val }) => {
    if (!el || !val) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(val / 80));
    const timer = setInterval(() => {
      cur = Math.min(cur + step, val);
      el.textContent = cur.toLocaleString('fr-FR');
      if (cur >= val) clearInterval(timer);
    }, 18);
  });
}

async function renderFeaturedCats() {
  const grid = document.getElementById('catsGrid');
  if (!grid) return;

  grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--brown-soft);grid-column:1/-1;">🐾 Chargement des minouches...</div>';

  const cats = await DataManager.getAllAvailable();
  const featured = cats.slice(0, 6);

  if (!featured.length) {
    grid.innerHTML = '<p class="no-cats">Aucun minouche disponible pour le moment. Revenez bientôt !</p>';
    return;
  }
  grid.innerHTML = featured.map(cat => createCatCard(cat)).join('');
}

// ---- CARTE CHAT ----
function createCatCard(cat) {
  const statusLabel = {
    available: '✅ Disponible',
    pending:   '⏳ En cours',
    adopted:   '🏠 Adopté'
  }[cat.status] || '';

  return `
  <div class="cat-card polaroid" onclick="location.href='profil-chat.html?id=${cat.id}'">
    <div class="cat-card-img-wrap">
      <img src="${cat.img || ''}" alt="${cat.name}" class="cat-card-img" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop'"/>
      <span class="cat-status-badge badge-${cat.status}">${statusLabel}</span>
      ${cat.isKitten ? '<span class="kitten-badge">🐱 Chaton</span>' : ''}
    </div>
    <div class="cat-card-body">
      <h3 class="cat-card-name">${cat.name}${cat.nickname ? ` <span class="cat-nickname">« ${cat.nickname} »</span>` : ''}</h3>
      <p class="cat-card-info">${cat.breed || '—'} · ${cat.age || '—'} · ${cat.sex === 'M' ? '♂ Mâle' : '♀ Femelle'}</p>
      <div class="cat-traits">
        ${(cat.traits || []).slice(0, 3).map(t => `<span class="trait-tag">${t}</span>`).join('')}
      </div>
      <button class="btn-primary cat-adopt-btn"
              onclick="event.stopPropagation();location.href='adoption.html?cat=${cat.id}'">
        💌 Adopter ${cat.name}
      </button>
    </div>
  </div>`;
}

// ---- NEWSLETTER ----
function handleNewsletter(e) {
  e.preventDefault();
  e.target.innerHTML = '<div class="newsletter-success">🐾 Merci ! Vous recevrez les nouvelles des minouches bientôt !</div>';
}

// ---- TOAST ----
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3500);
}

function formatDate(d) {
  try { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch(e) { return d; }
}

// Exposer globalement
window.createCatCard  = createCatCard;
window.showToast      = showToast;
window.formatDate     = formatDate;
window.handleNewsletter = handleNewsletter;
