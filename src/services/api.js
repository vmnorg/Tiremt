/**
 * services/api.js - Centralized API network layer for restaurant app
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Fallback mock dishes in case JSON server is not yet started by the student
const FALLBACK_PLATS = [
  {
    id: "1",
    nom: "Tagine de Poulet aux Citrons Confits & Olives",
    prix: 85,
    categorie: "Plats Principaux",
    image: "/tagine-poulet.jpg",
    description: "Poulet fermier mijoté lentement aux épices de Fès, safran pur de Taliouine, citrons beldi confits et olives rouges de Marrakech.",
    tempsPrep: "25 min",
    rating: 4.9,
    calories: "520 kcal",
    isPopular: true
  },
  {
    id: "2",
    nom: "Couscous Royal aux Sept Légumes & Agneau",
    prix: 110,
    categorie: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    description: "Semoule fine travaillée à la main, tendres morceaux d'agneau et merguez artisanales, courgettes, carottes, navets, potiron et pois chiches au bouillon parfumé.",
    tempsPrep: "30 min",
    rating: 5.0,
    calories: "680 kcal",
    isPopular: true
  },
  {
    id: "3",
    nom: "Pastilla Traditionnelle au Poulet & Amandes",
    prix: 95,
    categorie: "Entrées",
    image: "https://images.unsplash.com/photo-1584289134474-2123caf15113?auto=format&fit=crop&w=800&q=80",
    description: "Feuilletage ouarka croustillant renfermant une farce savoureuse de poulet effiloché, amandes torréfiées concassées, parfumée à la fleur d'oranger et cannelle.",
    tempsPrep: "20 min",
    rating: 4.8,
    calories: "450 kcal",
    isPopular: true
  },
  {
    id: "4",
    nom: "Zaalouk & Briouates Mixtes",
    prix: 45,
    categorie: "Entrées",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description: "Caviar d'aubergines grillées aux tomates fraîches et cumin torréfié, accompagné d'un trio de briouates croustillantes au fromage de chèvre et herbes.",
    tempsPrep: "15 min",
    rating: 4.7,
    calories: "280 kcal",
    isPopular: false
  },
  {
    id: "5",
    nom: "Burger Gourmet Berbère au Bœuf Charolais",
    prix: 78,
    categorie: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Pain brioché artisanal aux graines de nigelle, steak haché 180g grillé à la flamme, cheddar affiné, oignons caramélisés et sauce mayonnaise maison au harissa doux.",
    tempsPrep: "18 min",
    rating: 4.8,
    calories: "650 kcal",
    isPopular: false
  },
  {
    id: "6",
    nom: "Salade Fraîcheur Méditerranéenne & Burrata",
    prix: 55,
    categorie: "Entrées",
    image: "https://images.unsplash.com/photo-1769458313937-b5ad8f84942e?auto=format&fit=crop&w=800&q=80",
    description: "Tomates cerises multicolores, concombres croquants, grenades, cœur de burrata crémeuse, pignons de pin et vinaigrette légère à l'huile d'argan.",
    tempsPrep: "12 min",
    rating: 4.6,
    calories: "310 kcal",
    isPopular: false
  },
  {
    id: "7",
    nom: "Tartelette Croustillante aux Figues & Miel",
    prix: 40,
    categorie: "Desserts",
    image: "https://images.unsplash.com/photo-1774126632203-16553cdb3a0a?auto=format&fit=crop&w=800&q=80",
    description: "Pâte sablée au beurre pur, crème d'amandes fondante, figues fraîches rôties au miel d'oranger et éclats de pistaches grillées.",
    tempsPrep: "10 min",
    rating: 4.9,
    calories: "320 kcal",
    isPopular: true
  },
  {
    id: "8",
    nom: "Corne de Gazelle & Assortiment Marocain",
    prix: 38,
    categorie: "Desserts",
    image: "https://images.unsplash.com/photo-1766186930324-187ef2f45d47?auto=format&fit=crop&w=800&q=80",
    description: "Sélection de douceurs impériales: cornes de gazelle à l'eau de rose, ghriba aux noix et chebbakia artisanale au sésame doré.",
    tempsPrep: "8 min",
    rating: 4.9,
    calories: "390 kcal",
    isPopular: false
  },
  {
    id: "9",
    nom: "Thé à la Menthe Fraîche & Absinthe (Chiba)",
    prix: 20,
    categorie: "Boissons",
    image: "https://images.unsplash.com/photo-1541168350939-a118c5c13b4d?auto=format&fit=crop&w=800&q=80",
    description: "Thé vert gunpowder infusé à la perfection avec feuilles de menthe bio fraîches, pointe d'absinthe et servi à la marocaine avec sa belle mousse.",
    tempsPrep: "5 min",
    rating: 5.0,
    calories: "45 kcal",
    isPopular: true
  },
  {
    id: "10",
    nom: "Jus d'Orange Pressé & Fleur d'Oranger",
    prix: 25,
    categorie: "Boissons",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    description: "Oranges de Berkane fraîchement pressées à la minute, délicatement sublimées par quelques gouttes d'eau de fleur d'oranger artisanale.",
    tempsPrep: "5 min",
    rating: 4.8,
    calories: "110 kcal",
    isPopular: false
  }
]

// [C. API REST & Centralisation Fetch] :
// Hada l-moteur central dyal ga3 les requêtes réseau HTTP f l-projet.
// F blast ma n-kettro fetch() mchtata f les composants, 3zelnaha hna f service dédié:
// 1. Kan-zido les headers 'Content-Type: application/json' auto.
// 2. Kan-vérifiw wach response.ok (status 200-299) 9bl ma n-dirou response.json().
// 3. F cas d'erreur réseau, fih fallback intelligent f localStorage bach l-app tbqa khddama hta offline!
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (err) {
    // Mode de secours local (Offline fallback) ila kan JSON server ma-mkhdemch
    console.warn(`[API] Server unavailable at ${url}, falling back to local storage/mock:`, err.message)

    if (endpoint === '/plats') {
      return FALLBACK_PLATS
    }

    if (endpoint.startsWith('/plats/')) {
      const id = endpoint.split('/')[2]
      const found = FALLBACK_PLATS.find((p) => String(p.id) === String(id))
      if (found) return found
      throw new Error(`Plat avec ID ${id} introuvable`)
    }

    // PATCH / PUT local fallback
    if (endpoint.startsWith('/commandes/') && (options.method === 'PATCH' || options.method === 'PUT')) {
      const id = endpoint.split('/')[2]
      const updates = JSON.parse(options.body || '{}')
      const existing = JSON.parse(localStorage.getItem('restaurant_commandes') || '[]')
      const index = existing.findIndex((c) => String(c.id) === String(id))
      if (index !== -1) {
        existing[index] = { ...existing[index], ...updates }
        localStorage.setItem('restaurant_commandes', JSON.stringify(existing))
        return existing[index]
      }
      return { id, ...updates }
    }

    // DELETE local fallback
    if (endpoint.startsWith('/commandes/') && options.method === 'DELETE') {
      const id = endpoint.split('/')[2]
      const existing = JSON.parse(localStorage.getItem('restaurant_commandes') || '[]')
      const updated = existing.filter((c) => String(c.id) !== String(id))
      localStorage.setItem('restaurant_commandes', JSON.stringify(updated))
      return { success: true, id }
    }

    // POST local fallback
    if (endpoint === '/commandes' && options.method === 'POST') {
      const order = JSON.parse(options.body || '{}')
      const createdOrder = {
        id: String(Date.now()),
        date: new Date().toISOString(),
        ...order,
      }
      const existing = JSON.parse(localStorage.getItem('restaurant_commandes') || '[]')
      const updated = [createdOrder, ...existing]
      localStorage.setItem('restaurant_commandes', JSON.stringify(updated))
      return createdOrder
    }

    // GET local fallback
    if (endpoint === '/commandes' && (!options.method || options.method === 'GET')) {
      const stored = localStorage.getItem('restaurant_commandes')
      return stored ? JSON.parse(stored) : []
    }

    throw err
  }
}

// [C. Les 4 Méthodes CRUD exportées] :
export const api = {
  // 1. GET (READ) : Récupération dyal la liste complète des plats
  getPlats: () => request('/plats'),

  // 1. GET (READ) : Récupération d'un seul plat via son ID
  getPlatById: (id) => request(`/plats/${id}`),

  // 2. POST (CREATE) : Envoi dyal nouvelle commande avec body JSON
  createCommande: (commande) =>
    request('/commandes', {
      method: 'POST',
      body: JSON.stringify(commande),
    }),

  // 1. GET (READ) : Récupération de l'historique des commandes
  getCommandes: () => request('/commandes'),

  // 3. PATCH (UPDATE PARTIEL) : Mise à jour d'un champ précis (ex: statut 'Livré' wla notes)
  updateCommande: (id, updates) =>
    request(`/commandes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // 3. PUT (UPDATE TOTAL) : Remplacement complet d'une commande
  replaceCommande: (id, fullData) =>
    request(`/commandes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fullData),
    }),

  // 4. DELETE (SUPPRESSION) : Annulation et suppression d'une commande par son ID
  deleteCommande: (id) =>
    request(`/commandes/${id}`, {
      method: 'DELETE',
    }),
}

export default api
