import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlats, selectAllPlats, selectMenuStatus, selectMenuError } from '../redux/menuSlice'
import { addToCart } from '../redux/cartSlice'
import PlatCard from '../components/PlatCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import TeamSection from '../components/TeamSection'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const plats = useSelector(selectAllPlats)
  const status = useSelector(selectMenuStatus)
  const error = useSelector(selectMenuError)

  const [bestsellerAdded, setBestsellerAdded] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlats())
    }
  }, [status, dispatch])

  // Get bestseller plat (Tagine or first popular dish)
  const bestsellerPlat =
    plats.find((p) => String(p.id) === '1') ||
    plats.find((p) => p.isPopular) ||
    plats[0] || {
      id: '1',
      nom: 'Tagine de Poulet aux Citrons Confits & Olives',
      prix: 85,
      categorie: 'Plats Principaux',
      image: '/tagine-poulet.jpg',
      description: 'Poulet fermier mijoté lentement aux épices de Fès, safran pur de Taliouine, citrons beldi confits et olives rouges de Marrakech.',
      tempsPrep: '25 min',
      rating: 4.9,
      calories: '520 kcal',
    }

  // Get 4 popular dishes for preview
  const featuredPlats = plats.filter((p) => p.isPopular).slice(0, 4)

  const handleAddBestseller = () => {
    if (!bestsellerPlat) return
    dispatch(
      addToCart({
        id: bestsellerPlat.id,
        nom: bestsellerPlat.nom,
        prix: bestsellerPlat.prix,
        image: bestsellerPlat.image,
        categorie: bestsellerPlat.categorie,
        quantity: 1,
      })
    )
    setBestsellerAdded(true)
    setTimeout(() => setBestsellerAdded(false), 2200)
  }

  // Menu Category Teaser Data
  const categoryTeasers = [
    {
      title: 'Plats Principaux',
      tagline: 'Tajines au feu de bois & Couscous',
      count: plats.filter((p) => p.categorie === 'Plats Principaux').length || 3,
      image: '/tagine-poulet.jpg',
      description: 'Mijotés selon les préceptes ancestraux avec viandes tendres et légumes du terroir.',
    },
    {
      title: 'Entrées & Salades',
      tagline: 'Pastillas dorées & Zaalouk',
      count: plats.filter((p) => p.categorie === 'Entrées').length || 3,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      description: 'Feuilletages croustillants, salades fraîches parfumées à l’huile d’argan de Tiznit.',
    },
    {
      title: 'Desserts',
      tagline: 'Douceurs au Miel & Fleur d’Oranger',
      count: plats.filter((p) => p.categorie === 'Desserts').length || 2,
      image: 'https://images.unsplash.com/photo-1766186930324-187ef2f45d47?auto=format&fit=crop&w=600&q=80',
      description: 'Cornes de gazelle fines, tartelettes aux figues rôties et pâtisseries artisanales.',
    },
    {
      title: 'Boissons',
      tagline: 'Thés à la Menthe & Jus Pressés',
      count: plats.filter((p) => p.categorie === 'Boissons').length || 2,
      image: 'https://images.unsplash.com/photo-1541168350939-a118c5c13b4d?auto=format&fit=crop&w=600&q=80',
      description: 'Thé vert gunpowder infusé à la minute avec menthe fraîche du jardin et agrumes.',
    },
  ]

  return (
    <div className="container py-4">
      {/* ============================================================
          1. HERO SECTION : Punchy & Bold (Crusty Inspiration)
          ============================================================ */}
      <section className="hero-wrapper">
        <div className="row align-items-center g-5">
          {/* Left Column: Typography, Badges & CTA */}
          <div className="col-lg-7">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
              <div className="hero-tag mb-0">
                <span className="pulse-dot"></span>
                <i className="bi bi-geo-alt-fill text-warning"></i>
                <span>Tiznit • Terroir du Souss</span>
              </div>
              <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-50 px-3 py-2 rounded-pill fw-semibold small">
                <i className="bi bi-patch-check-fill me-1"></i> Fait Maison
              </span>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-50 px-3 py-2 rounded-pill fw-semibold small">
                <i className="bi bi-shield-check me-1"></i> Ingrédients 100% Frais
              </span>
            </div>

            <h1 className="hero-title">
              Ce n'est pas un simple repas.{' '}
              <span className="text-gradient d-block">
                C'est l'Âme Culinaire de Tiznit.
              </span>
            </h1>

            <p className="hero-desc">
              Chez <strong>Tiremt</strong>, nous refusons les compromis. Des tajines mijotés au feu de bois
              au safran pur de Taliouine, un couscous royal généreux et des pastillas dorées au feuilletage ultra-croustillant.
              Cuisiné frais chaque jour, livré chaud chez vous en 25 à 35 minutes.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3">
              <Link to="/menu" className="hero-cta-btn" id="hero-explore-menu-btn">
                <i className="bi bi-book-half"></i>
                <span>Consulter le Menu</span>
              </Link>
              <a href="#localisation" className="hero-secondary-btn" id="hero-restaurants-btn">
                <i className="bi bi-geo-fill text-warning"></i>
                <span>Notre Restaurant à Tiznit</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Floating Badges */}
          <div className="col-lg-5 position-relative text-center">
            <div className="position-relative d-inline-block w-100">
              <div className="rounded-4 overflow-hidden shadow-lg border border-2 border-white bg-light">
                <img
                  src="/tagine-poulet.jpg"
                  alt="Tagine Gastronomique Marocain - Tiremt Tiznit"
                  className="w-100 h-100 object-fit-cover"
                  style={{ maxHeight: '460px', minHeight: '340px' }}
                />
              </div>

              {/* Floating Review Badge */}
              <div className="floating-review-badge">
                <div className="p-2 bg-warning bg-opacity-10 text-warning rounded-3 fs-5">
                  ★
                </div>
                <div className="text-start">
                  <div className="fw-bold small text-dark">4.9/5 satisfaction</div>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>+1 200 gourmets conquis</div>
                </div>
              </div>

              {/* Floating Live Badge */}
              <div className="floating-live-badge">
                <span className="p-1 bg-success rounded-circle d-inline-block"></span>
                <span>En direct des tajines à Tiznit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. BARRE DE STATISTIQUES / CONFIANCE (Key Indicators)
          ============================================================ */}
      <section className="stats-trust-banner">
        <div className="row g-4 text-start">
          <div className="col-6 col-lg-3">
            <div className="stat-item">
              <div className="stat-icon-box bg-success bg-opacity-10 text-success">
                <i className="bi bi-patch-check-fill"></i>
              </div>
              <div>
                <div className="fw-bold text-dark fs-5 font-heading">100% Frais</div>
                <div className="text-muted small">Épices nobles &amp; terroir</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="stat-item">
              <div className="stat-icon-box bg-warning bg-opacity-10 text-warning">
                <i className="bi bi-clock-history"></i>
              </div>
              <div>
                <div className="fw-bold text-dark fs-5 font-heading">Service 7j/7</div>
                <div className="text-muted small">12h-15h30 &amp; 19h-23h30</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="stat-item">
              <div className="stat-icon-box bg-danger bg-opacity-10 text-danger">
                <i className="bi bi-fire"></i>
              </div>
              <div>
                <div className="fw-bold text-dark fs-5 font-heading">Chaud Garanti</div>
                <div className="text-muted small">Caissons isothermes 65°C</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="stat-item">
              <div className="stat-icon-box bg-primary bg-opacity-10 text-primary">
                <i className="bi bi-star-fill"></i>
              </div>
              <div>
                <div className="fw-bold text-dark fs-5 font-heading">4.9 / 5 Avis</div>
                <div className="text-muted small">+1 200 avis vérifiés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. SECTION "POURQUOI TIREMT" : 4 Piliers Numérotés (01 - 04)
          ============================================================ */}
      <section className="mb-5 pb-3">
        <div className="text-center max-w-xl mx-auto mb-5">
          <div className="section-pretitle">
            <i className="bi bi-stars"></i>
            <span>Notre Engagement Culinaire</span>
          </div>
          <h2 className="display-6 fw-bold font-heading mb-3">
            La Cuisine Marocaine Faite Dans Les Règles de l'Art.
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '620px', fontSize: '1rem', lineHeight: '1.7' }}>
            Aucun raccourci, aucune triche. Quatre exigences cardinales qui forgent la réputation
            et la confiance de Tiremt auprès des amateurs de vraie cuisine marocaine.
          </p>
        </div>

        <div className="row g-4">
          {/* Pilier 01 */}
          <div className="col-md-6 col-lg-3">
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <h3 className="pillar-title">Mijoté au Feu, Jamais Précuit</h3>
              <p className="pillar-desc">
                Chaque tagine en terre cuite cuit lentement à l'étouffée afin de concentrer les sucs,
                confir les oignons et attendrir les viandes jusqu'à l'os.
              </p>
            </div>
          </div>

          {/* Pilier 02 */}
          <div className="col-md-6 col-lg-3">
            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <h3 className="pillar-title">Une Carte Resserrée &amp; Maîtrisée</h3>
              <p className="pillar-desc">
                Nous refusons les cartes à rallonge. Chaque recette est travaillée à la perfection
                avec des ingrédients sourcés au jour le jour pour garantir une fraîcheur absolue.
              </p>
            </div>
          </div>

          {/* Pilier 03 */}
          <div className="col-md-6 col-lg-3">
            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <h3 className="pillar-title">Terroirs Purs du Souss &amp; Tiznit</h3>
              <p className="pillar-desc">
                Safran d'appellation de Taliouine, huile d'argan extra-vierge bio de Tiznit,
                citrons beldi confits au sel marin et amandes de Tafraout.
              </p>
            </div>
          </div>

          {/* Pilier 04 */}
          <div className="col-md-6 col-lg-3">
            <div className="pillar-card">
              <div className="pillar-num">04</div>
              <h3 className="pillar-title">Le Juste Prix du Goût d'Exception</h3>
              <p className="pillar-desc">
                Une bistronomie généreuse et transparente. Des entrées à partir de 20 DH
                aux grands festins partagés, pour que l'excellence reste accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. BESTSELLER SPOTLIGHT : N°1 des Ventes Tiremt
          ============================================================ */}
      <section className="bestseller-container">
        <div className="row align-items-center g-5 position-relative" style={{ zIndex: 1 }}>
          {/* Left Column: High-Res Grand Format Image */}
          <div className="col-lg-6">
            <div className="bestseller-image-wrapper">
              <img
                src={bestsellerPlat.image}
                alt={bestsellerPlat.nom}
              />
              <div className="position-absolute top-0 start-0 m-3">
                <span className="bestseller-tag">
                  <i className="bi bi-trophy-fill text-warning"></i>
                  N°1 des Ventes Tiremt
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dish Info, Ingredients, Price & Add To Cart */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="text-warning small">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
                <i className="bi bi-star-fill ms-1"></i>
              </div>
              <span className="text-white-50 small fw-bold">4.9 / 5 (+480 commandes ce mois)</span>
            </div>

            <h2 className="display-6 fw-bold font-heading text-white mb-3">
              {bestsellerPlat.nom}
            </h2>

            <p className="text-white-50 mb-4" style={{ lineHeight: '1.7', fontSize: '1.02rem' }}>
              {bestsellerPlat.description}
            </p>

            {/* Ingrédients clés & badges */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-50 px-3 py-1.5 rounded-pill">
                <i className="bi bi-check-circle-fill text-warning me-1"></i> Safran de Taliouine
              </span>
              <span className="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-50 px-3 py-1.5 rounded-pill">
                <i className="bi bi-check-circle-fill text-warning me-1"></i> Citron Beldi Confit
              </span>
              <span className="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-50 px-3 py-1.5 rounded-pill">
                <i className="bi bi-check-circle-fill text-warning me-1"></i> Olives Rouges de Terroir
              </span>
              <span className="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-50 px-3 py-1.5 rounded-pill">
                <i className="bi bi-check-circle-fill text-warning me-1"></i> Poulet Fermier Mariné
              </span>
            </div>

            {/* Preparation Details */}
            <div className="d-flex align-items-center gap-4 mb-4 pb-3 border-bottom border-secondary border-opacity-25 text-white-50 small">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-clock-history text-warning fs-6"></i>
                <span>Préparation : <strong>{bestsellerPlat.tempsPrep || '25 min'}</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-fire text-danger fs-6"></i>
                <span>Chaud garanti : <strong>65°C</strong></span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-4">
              <div>
                <div className="text-white-50 small">Prix de dégustation</div>
                <div className="bestseller-price-tag">
                  {bestsellerPlat.prix} <span className="fs-5 text-warning fw-normal">DH</span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`btn px-4 py-2.5 rounded-3 fw-bold d-inline-flex align-items-center gap-2 transition-all ${
                    bestsellerAdded ? 'btn-success' : 'btn-warning'
                  }`}
                  onClick={handleAddBestseller}
                  id="bestseller-add-cart-btn"
                >
                  <i className={`bi ${bestsellerAdded ? 'bi-check2-circle' : 'bi-bag-plus-fill'}`}></i>
                  <span>{bestsellerAdded ? 'Ajouté au Panier !' : 'Ajouter au Panier'}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light px-3 py-2.5 rounded-3 fw-semibold"
                  onClick={() => navigate(`/plats/${bestsellerPlat.id}`)}
                >
                  Détails &amp; Recette
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. APERÇU DU MENU (Categories Teaser & Seasonal Plats)
          ============================================================ */}
      <section className="mb-5 pb-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 pb-3 border-bottom">
          <div>
            <div className="section-pretitle">
              <i className="bi bi-grid-fill"></i>
              <span>Aperçu de la Carte</span>
            </div>
            <h2 className="display-6 fw-bold font-heading mb-0">Nos Grandes Familles de Recettes</h2>
          </div>
          <Link to="/menu" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold mt-3 mt-md-0">
            Explorer Tout le Menu <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {/* Categories Teaser Grid */}
        <div className="row g-4 mb-5">
          {categoryTeasers.map((cat, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <Link to="/menu" className="category-card">
                <div className="category-img-box">
                  <img src={cat.image} alt={cat.title} />
                  <span className="badge bg-dark bg-opacity-75 text-white position-absolute top-0 end-0 m-2 px-2.5 py-1 rounded-pill small">
                    {cat.count} spécialités
                  </span>
                </div>
                <div className="category-content">
                  <h4 className="fw-bold font-heading text-dark mb-1 fs-5">{cat.title}</h4>
                  <div className="text-warning fw-semibold small mb-2">{cat.tagline}</div>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                    {cat.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Featured Seasonal Dishes Showcase */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="fw-bold font-heading text-dark mb-0 fs-4">
              Sélection du Chef pour Aujourd'hui
            </h4>
            <span className="text-muted small">Cuisiné frais à la commande</span>
          </div>

          {status === 'pending' && <Loader message="Mise en place des tajines et créations du Chef..." />}

          {status === 'rejected' && (
            <ErrorMessage
              message={error}
              onRetry={() => dispatch(fetchPlats())}
            />
          )}

          {status === 'fulfilled' && (
            <div className="row g-4">
              {(featuredPlats.length > 0 ? featuredPlats : plats.slice(0, 4)).map((plat) => (
                <div key={plat.id} className="col-md-6 col-lg-3">
                  <PlatCard plat={plat} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          6. SECTION ÉQUIPE : Les Artisans & Visages de Tiremt
          ============================================================ */}
      <TeamSection />

      {/* ============================================================
          7. TEASER LOCALISATION & HORAIRES : Restaurant Tiremt Tiznit
          ============================================================ */}
      <section className="location-teaser-box my-5" id="localisation">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <div className="d-inline-flex align-items-center gap-2 bg-warning bg-opacity-10 text-warning border border-warning border-opacity-50 px-3 py-1 rounded-pill fw-bold small mb-3">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span>Rendez-nous Visite au Cœur de Tiznit</span>
            </div>

            <h3 className="display-6 fw-bold font-heading mb-3 text-dark">
              L'Hospitalité &amp; la Table de Tiremt
            </h3>

            <p className="text-muted mb-4" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
              Installez-vous dans notre salle climatisée à l'ambiance feutrée ou sur notre terrasse ensoleillée
              face aux remparts historiques de Tiznit. Dégustez nos créations sur place, commandez à emporter
              ou faites-vous livrer chez vous dans tout Tiznit.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-start gap-2 text-dark">
                  <i className="bi bi-pin-map-fill text-warning fs-5 mt-0.5"></i>
                  <div>
                    <strong className="d-block">Adresse</strong>
                    <span className="text-muted small">Avenue Hassan II, Place El Mechouar, Tiznit</span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="d-flex align-items-start gap-2 text-dark">
                  <i className="bi bi-clock-fill text-warning fs-5 mt-0.5"></i>
                  <div>
                    <strong className="d-block">Horaires de Service</strong>
                    <span className="text-muted small">Déjeuner : 12h00 - 15h30 | Dîner : 19h00 - 23h30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-3">
              <a
                href="https://www.google.com/maps/search/Tiznit+Maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2"
                id="location-google-maps-btn"
              >
                <i className="bi bi-map"></i>
                <span>Itinéraire Google Maps</span>
              </a>

              <a
                href="tel:+212625956132"
                className="btn btn-outline-dark rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-telephone"></i>
                <span>+212 (0)6 25 95 61 32</span>
              </a>

              <Link to="/menu" className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold">
                Commander en Ligne
              </Link>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <div className="rounded-4 overflow-hidden shadow border border-2 border-white bg-light position-relative">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
                alt="Ambiance Restaurant Tiremt Tiznit"
                className="w-100 object-fit-cover"
                style={{ height: '340px' }}
              />
              <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-75 text-white text-start">
                <div className="fw-bold small">Restaurant Tiremt Tiznit</div>
                <div className="text-white-50" style={{ fontSize: '0.78rem' }}>
                  Terrasse &amp; Salon Marocain Gastronomique
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
