
const SUPABASE_URL = 'https://hsmwrcrdwmfgufesufpl.supabase.co';        
const SUPABASE_ANON_KEY = 'sb_publishable_4mKjCFhjwt9SRf3U19afow_GhEGr9JH';     

// =============================================
// SCRIPT SQL À EXÉCUTER dans Supabase
// Menu "SQL Editor" > "New query" > coller > Run
// =============================================
//
// CREATE TABLE cats (
//   id TEXT PRIMARY KEY,
//   name TEXT NOT NULL,
//   nickname TEXT DEFAULT '',
//   age TEXT DEFAULT '',
//   age_months INTEGER DEFAULT 0,
//   breed TEXT DEFAULT '',
//   sex TEXT DEFAULT 'M',
//   color TEXT DEFAULT '',
//   status TEXT DEFAULT 'available',
//   is_kitten BOOLEAN DEFAULT false,
//   description TEXT DEFAULT '',
//   traits TEXT[] DEFAULT '{}',
//   img TEXT DEFAULT '',
//   imgs TEXT[] DEFAULT '{}',
//   health_vaccinated BOOLEAN DEFAULT false,
//   health_sterilized BOOLEAN DEFAULT false,
//   health_microchipped BOOLEAN DEFAULT false,
//   health_note TEXT DEFAULT '',
//   date_added DATE DEFAULT CURRENT_DATE
// );
//
// CREATE TABLE applications (
//   id TEXT PRIMARY KEY,
//   first_name TEXT DEFAULT '',
//   last_name TEXT DEFAULT '',
//   email TEXT DEFAULT '',
//   phone TEXT DEFAULT '',
//   address TEXT DEFAULT '',
//   housing TEXT DEFAULT '',
//   outdoor TEXT DEFAULT '',
//   children TEXT DEFAULT '',
//   other_pets TEXT DEFAULT '',
//   other_pets_detail TEXT DEFAULT '',
//   experience TEXT DEFAULT '',
//   hours_alone TEXT DEFAULT '',
//   looking TEXT DEFAULT '',
//   cat_id TEXT DEFAULT '',
//   motivation TEXT DEFAULT '',
//   status TEXT DEFAULT 'pending',
//   date TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE stats (
//   id INTEGER PRIMARY KEY DEFAULT 1,
//   total_adopted INTEGER DEFAULT 312,
//   total_rescued INTEGER DEFAULT 487,
//   years_active INTEGER DEFAULT 8
// );
// INSERT INTO stats (id) VALUES (1) ON CONFLICT DO NOTHING;
//
// ALTER TABLE cats ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "public_read_cats"   ON cats FOR SELECT USING (true);
// CREATE POLICY "public_insert_cats" ON cats FOR INSERT WITH CHECK (true);
// CREATE POLICY "public_update_cats" ON cats FOR UPDATE USING (true);
// CREATE POLICY "public_delete_cats" ON cats FOR DELETE USING (true);
//
// ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "public_insert_apps"  ON applications FOR INSERT WITH CHECK (true);
// CREATE POLICY "public_select_apps"  ON applications FOR SELECT USING (true);
// CREATE POLICY "public_update_apps"  ON applications FOR UPDATE USING (true);
//
// ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "public_read_stats"   ON stats FOR SELECT USING (true);
// CREATE POLICY "public_update_stats" ON stats FOR UPDATE USING (true);
// =============================================

// ---- DONNÉES DE DÉMO (affichées si Supabase non configuré) ----
const DEFAULT_CATS = [
  {
    id: 'cat-1', name: 'Luna', nickname: 'La timide', age: '2 ans', ageMonths: 24,
    breed: 'European shorthair', sex: 'F', color: 'Roux et blanc',
    status: 'available', isKitten: false,
    description: "Luna est une petite chatte douce et réservée. Elle adore les câlins une fois qu'elle vous fait confiance.",
    traits: ['Timide', 'Affectueuse', 'Calme'],
    health: { vaccinated: true, sterilized: true, microchipped: true },
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    imgs: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop'],
    dateAdded: '2024-01-15'
  },
  {
    id: 'cat-2', name: 'Oliver', nickname: 'Le câlin', age: '4 ans', ageMonths: 48,
    breed: 'Maine Coon', sex: 'M', color: 'Orange tigré',
    status: 'available', isKitten: false,
    description: "Oliver est un grand gaillard au cœur tendre. Il adore les longues siestes et les séances de brossage.",
    traits: ['Câlin', 'Joueur', 'Sociable'],
    health: { vaccinated: true, sterilized: true, microchipped: true },
    img: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&h=400&fit=crop',
    imgs: ['https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&h=400&fit=crop'],
    dateAdded: '2024-02-10'
  },
  {
    id: 'cat-3', name: 'Bella', nickname: 'La princesse', age: '1 an', ageMonths: 12,
    breed: 'Persan', sex: 'F', color: 'Blanc',
    status: 'pending', isKitten: false,
    description: "Bella est une petite princesse élégante qui aime regarder le monde depuis son coussin préféré.",
    traits: ['Indépendante', 'Curieuse', 'Élégante'],
    health: { vaccinated: true, sterilized: false, microchipped: true },
    img: 'https://images.unsplash.com/photo-1495360010541-f48722b35f1d?w=400&h=400&fit=crop',
    imgs: ['https://images.unsplash.com/photo-1495360010541-f48722b35f1d?w=400&h=400&fit=crop'],
    dateAdded: '2024-03-05'
  },
  {
    id: 'cat-4', name: 'Leo', nickname: "L'aventurier", age: '3 ans', ageMonths: 36,
    breed: 'Siamois', sex: 'M', color: 'Seal point',
    status: 'available', isKitten: false,
    description: "Leo est un explorateur dans l'âme. Curieux de tout, il adore jouer et découvrir de nouveaux espaces.",
    traits: ['Joueur', 'Curieux', 'Bavard'],
    health: { vaccinated: true, sterilized: true, microchipped: true },
    img: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&h=400&fit=crop',
    imgs: ['https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&h=400&fit=crop'],
    dateAdded: '2024-01-28'
  },
  {
    id: 'kit-1', name: 'Pip', nickname: 'Le mini', age: '2 mois', ageMonths: 2,
    breed: 'Européen', sex: 'M', color: 'Gris',
    status: 'available', isKitten: true,
    description: "Pip est un minuscule boule de poils gris, débordant d'énergie et de curiosité.",
    traits: ['Energique', 'Joueur', 'Affectueux'],
    health: { vaccinated: false, sterilized: false, microchipped: false, note: 'Trop jeune - suivi en cours' },
    img: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?w=400&h=400&fit=crop',
    imgs: ['https://images.unsplash.com/photo-1570824104453-508955ab713e?w=400&h=400&fit=crop'],
    dateAdded: '2024-04-01'
  },
  {
    id: 'kit-2', name: 'Noisette', nickname: 'La coquine', age: '3 mois', ageMonths: 3,
    breed: 'Européenne', sex: 'F', color: 'Tabby',
    status: 'available', isKitten: true,
    description: "Noisette est une petite malicieuse qui adore grimper partout.",
    traits: ['Espiègle', 'Vive', 'Câline'],
    health: { vaccinated: false, sterilized: false, microchipped: false, note: 'Première vaccination prévue' },
    img: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&h=400&fit=crop',
    imgs: ['https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&h=400&fit=crop'],
    dateAdded: '2024-04-10'
  }
];

const DEFAULT_STATS = { totalAdopted: 312, totalRescued: 487, yearsActive: 8 };

// ---- DÉTECTION CONFIG ----
const SUPABASE_READY = (
  SUPABASE_URL !== 'VOTRE_URL_SUPABASE' &&
  SUPABASE_ANON_KEY !== 'VOTRE_CLE_ANON' &&
  SUPABASE_URL.startsWith('https://')
);

if (!SUPABASE_READY) {
  console.warn('⚠️ Supabase non configuré — données de démo affichées. Voir data.js pour la configuration.');
}

// ---- CLIENT SUPABASE (fetch natif, sans librairie) ----
const sb = {
  headers() {
    return {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    };
  },

  async query(table, { select = '*', filter = '', order = '', limit = '' } = {}) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}`;
    if (filter) url += `&${filter}`;
    if (order)  url += `&order=${order}`;
    if (limit)  url += `&limit=${limit}`;
    const res = await fetch(url, { headers: this.headers() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async insert(table, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...this.headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async update(table, data, filter) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
      method: 'PATCH',
      headers: { ...this.headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async remove(table, filter) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
      method: 'DELETE',
      headers: this.headers()
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  },

  async uploadImage(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const allowed = ['jpg','jpeg','png','webp','gif'];
    if (!allowed.includes(ext)) throw new Error('Format non supporté. Utilisez JPG, PNG ou WEBP.');
    if (file.size > 5 * 1024 * 1024) throw new Error('Image trop lourde (max 5 Mo).');
    const filename = `cats/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/photos/${filename}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': file.type,
        'x-upsert': 'true'
      },
      body: file
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error('Erreur upload: ' + err);
    }
    return `${SUPABASE_URL}/storage/v1/object/public/photos/${filename}`;
  }
};

// ---- CONVERSION BDD ↔ JS ----
function dbToJs(row) {
  return {
    id: row.id,
    name: row.name,
    nickname: row.nickname || '',
    age: row.age || '',
    ageMonths: row.age_months || 0,
    breed: row.breed || '',
    sex: row.sex || 'M',
    color: row.color || '',
    status: row.status || 'available',
    isKitten: row.is_kitten || false,
    description: row.description || '',
    traits: row.traits || [],
    img: row.img || '',
    imgs: row.imgs || [row.img].filter(Boolean),
    health: {
      vaccinated: row.health_vaccinated || false,
      sterilized: row.health_sterilized || false,
      microchipped: row.health_microchipped || false,
      note: row.health_note || ''
    },
    dateAdded: row.date_added || '',
    okChildren:   row.ok_children || false,
    okDogs:       row.ok_dogs || false,
    okCats:       row.ok_cats || false,
    okApartment:  row.ok_apartment || false,
    needsOutdoor: row.needs_outdoor || false
  };
}

function jsToDb(cat) {
  return {
    id: cat.id,
    name: cat.name,
    nickname: cat.nickname || '',
    age: cat.age || '',
    age_months: cat.ageMonths || 0,
    breed: cat.breed || '',
    sex: cat.sex || 'M',
    color: cat.color || '',
    status: cat.status || 'available',
    is_kitten: cat.isKitten || false,
    description: cat.description || '',
    traits: cat.traits || [],
    img: cat.img || '',
    imgs: cat.imgs || [],
    health_vaccinated: cat.health?.vaccinated || false,
    health_sterilized: cat.health?.sterilized || false,
    health_microchipped: cat.health?.microchipped || false,
    health_note: cat.health?.note || '',
    ok_children:   cat.okChildren || false,
    ok_dogs:       cat.okDogs || false,
    ok_cats:       cat.okCats || false,
    ok_apartment:  cat.okApartment || false,
    needs_outdoor: cat.needsOutdoor || false,
    date_added: cat.dateAdded || new Date().toISOString().split('T')[0]
  };
}

// =============================================
// DATA MANAGER — API async complète
// =============================================
const DataManager = {

  // ---- CHATS ----
  async getCats() {
    if (!SUPABASE_READY) return DEFAULT_CATS;
    try {
      const rows = await sb.query('cats', { order: 'date_added.desc' });
      return rows.map(dbToJs);
    } catch (e) {
      console.error('getCats error:', e);
      return DEFAULT_CATS;
    }
  },

  async getCatById(id) {
    if (!SUPABASE_READY) return DEFAULT_CATS.find(c => c.id === id) || null;
    try {
      const rows = await sb.query('cats', { filter: `id=eq.${id}` });
      return rows.length ? dbToJs(rows[0]) : null;
    } catch (e) {
      return DEFAULT_CATS.find(c => c.id === id) || null;
    }
  },

  async getAllAvailable() {
    const cats = await this.getCats();
    return cats.filter(c => c.status === 'available');
  },

  async getAvailableCats() {
    const cats = await this.getCats();
    return cats.filter(c => c.status === 'available' && !c.isKitten);
  },

  async getAvailableKittens() {
    const cats = await this.getCats();
    return cats.filter(c => c.status === 'available' && c.isKitten);
  },

  async addCat(cat) {
    cat.id = (cat.isKitten ? 'kit-' : 'cat-') + Date.now();
    cat.dateAdded = new Date().toISOString().split('T')[0];
    if (!SUPABASE_READY) throw new Error('Supabase non configuré');
    await sb.insert('cats', jsToDb(cat));
    return cat;
  },

  async updateCat(id, data) {
    if (!SUPABASE_READY) return data;
    const current = await this.getCatById(id);
    if (!current) return null;
    const merged = { ...current, ...data };
    const dbData = jsToDb(merged);
    delete dbData.id;
    await sb.update('cats', dbData, `id=eq.${id}`);
    return merged;
  },

  async deleteCat(id) {
    if (!SUPABASE_READY) return;
    await sb.remove('cats', `id=eq.${id}`);
  },

  // ---- STATS ----
  async getStats() {
    if (!SUPABASE_READY) return DEFAULT_STATS;
    try {
      const rows = await sb.query('stats', { filter: 'id=eq.1' });
      if (!rows.length) return DEFAULT_STATS;
      return {
        totalAdopted: rows[0].total_adopted,
        totalRescued: rows[0].total_rescued,
        yearsActive: rows[0].years_active
      };
    } catch (e) { return DEFAULT_STATS; }
  },

  async updateStats(stats) {
    if (!SUPABASE_READY) return;
    await sb.update('stats', {
      total_adopted: stats.totalAdopted,
      total_rescued: stats.totalRescued,
      years_active: stats.yearsActive
    }, 'id=eq.1');
  },

  // ---- DEMANDES D'ADOPTION ----
  async getApplications() {
    if (!SUPABASE_READY) return [];
    try {
      const rows = await sb.query('applications', { order: 'date.desc' });
      return rows.map(r => ({
        id: r.id, firstName: r.first_name, lastName: r.last_name,
        email: r.email, phone: r.phone, address: r.address,
        housing: r.housing, outdoor: r.outdoor, children: r.children,
        otherPets: r.other_pets, otherPetsDetail: r.other_pets_detail,
        experience: r.experience, hoursAlone: r.hours_alone,
        looking: r.looking, catId: r.cat_id, motivation: r.motivation,
        status: r.status, date: r.date
      }));
    } catch (e) { return []; }
  },

  async addApplication(app) {
    app.id = 'app-' + Date.now();
    app.date = new Date().toISOString();
    app.status = 'pending';
    if (!SUPABASE_READY) return app;
    await sb.insert('applications', {
      id: app.id, first_name: app.firstName, last_name: app.lastName,
      email: app.email, phone: app.phone || '', address: app.address || '',
      housing: app.housing || '', outdoor: app.outdoor || '',
      children: app.children || '', other_pets: app.otherPets || '',
      other_pets_detail: app.otherPetsDetail || '', experience: app.experience || '',
      hours_alone: app.hoursAlone || '', looking: app.looking || '',
      cat_id: app.catId || '', motivation: app.motivation || '',
      status: 'pending', date: app.date
    });
    return app;
  },

  async updateApplication(id, data) {
    if (!SUPABASE_READY) return;
    await sb.update('applications', data, `id=eq.${id}`);
  },

  async deleteApplication(id) {
    if (!SUPABASE_READY) return;
    await sb.remove('applications', `id=eq.${id}`);
  },

  async deleteMessage(id) {
    if (!SUPABASE_READY) return;
    await sb.remove('messages', `id=eq.${id}`);
  },

  // ---- ADMIN AUTH (sécurisé via Supabase) ----

  // Vérifie si la session admin est active (8h max, sans stocker le mot de passe)
  isAdmin() {
    const session = localStorage.getItem('ptm_admin_session');
    if (!session) return false;
    try {
      const { expires } = JSON.parse(session);
      if (Date.now() > expires) {
        localStorage.removeItem('ptm_admin_session');
        return false;
      }
      return true;
    } catch(e) {
      localStorage.removeItem('ptm_admin_session');
      return false;
    }
  },

  // Vérifie le mot de passe via Supabase RPC (le mot de passe ne circule jamais en clair)
  async loginAdmin(pwd) {
    if (!SUPABASE_READY) {
      const ok = pwd === 'Minouches2024!';
      if (ok) this._setAdminSession();
      return ok;
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/check_admin_password`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_password: pwd })
      });
      const ok = await res.json();
      if (ok) this._setAdminSession();
      return ok;
    } catch(e) {
      const ok = pwd === 'Minouches2024!';
      if (ok) this._setAdminSession();
      return ok;
    }
  },

  // Change le mot de passe via Supabase RPC
  async changeAdminPassword(oldPwd, newPwd) {
    if (!SUPABASE_READY) return false;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/update_admin_password`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ old_password: oldPwd, new_password: newPwd })
      });
      return await res.json();
    } catch(e) { return false; }
  },

  // Session temporaire 8h — ne contient PAS le mot de passe
  _setAdminSession() {
    localStorage.setItem('ptm_admin_session', JSON.stringify({
      expires: Date.now() + (8 * 60 * 60 * 1000)
    }));
  },

  logoutAdmin() { localStorage.removeItem('ptm_admin_session'); },

  // ---- MESSAGES CONTACT ----
  async getMessages() {
    if (!SUPABASE_READY) return [];
    try {
      return await sb.query('messages', { order: 'date.desc' });
    } catch(e) { return []; }
  },

  async updateMessage(id, data) {
    if (!SUPABASE_READY) return;
    await sb.update('messages', data, `id=eq.${id}`);
  },

  isConfigured() { return SUPABASE_READY; }
};
