import React, { useState } from 'react'

/**
 * =========================================================================
 * Composant : TeamSection.jsx
 * =========================================================================

 * -------------------------------------------------------------------------
 * - Hada composant jdid li kay-afficher l'équipe dyal restaurant TIREMT.
 * - Le point fort f had l-composant houwa:
 *   1. "Source Dynamique" : Ma dernach les données dyal l'équipe en dur (hardcoded).
 *      Khdemna b `import.meta.glob` dyal Vite li kay-mken lina n-scanniou
 *      dossier `src/assets/equipe/` automatique w n-choufou ay photo tzadette.
 *   2. "Convention de Nommage" : Kola fichier smitou `nom_prenom_role.(ext)`.
 *      B JavaScript (split, replace, regex) kan-extraire smiya, l-knya, w le poste.
 *   3. "Design Dark Mode Chic" : Alwan d luxe (#121212, accents dorés amber-400,
 *      bordures zinc-800) avec animations fluides au hover (zoom image, glow doré).
 *   4. "Responsive Grid" : 1 colonne f mobile, 2 f tablette, 4 f grand écran.
 * =========================================================================
 */

// 1. Vite dynamic glob import - kan-chargéou ga3 les photos f dossier equipe
// Vite kay-chouf les fichiers li f '../assets/equipe/' w kay-dir lihoum import automatique
const imageModules = import.meta.glob(
  ['../assets/equipe/*.{jpg,jpeg,png,webp}', '../assets/equipe/*.(jpg|jpeg|png|webp)'],
  { eager: true }
)

// Helper bash n-capitaliziou l-kelmat (ex: "mohamed" -> "Mohamed")
const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Helper bash n-formatiou le rôle b tariqa nqia w professionnelle
const formatRole = (rawRole) => {
  if (!rawRole) return 'Artisan Tiremt'
  const normalized = rawRole.toLowerCase().replace(/_/g, '')

  if (normalized.includes('ceo') || normalized.includes('directeur')) {
    return 'Fondateur & Directeur Général (CEO)'
  }
  if (normalized.includes('chefcuisinier') || (normalized.includes('chef') && normalized.includes('cuisinier'))) {
    return 'Chef Cuisinier Exécutif'
  }
  if (normalized.includes('chef')) {
    return 'Chef Exécutif'
  }
  if (normalized.includes('caissier') || normalized.includes('caisse')) {
    return 'Responsable Caisse & Accueil'
  }
  if (normalized.includes('serveur') || normalized.includes('service')) {
    return 'Chef de Rang & Service en Salle'
  }
  if (normalized.includes('sommelier')) {
    return 'Sommelier & Maître du Thé'
  }
  if (normalized.includes('patissier')) {
    return 'Chef Pâtissier'
  }

  // Fallback dynamique: replace '_' b espace w dir majuscule l kola kelma
  return rawRole
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

// Helper bash n-attribuiou un badge spécialité personnalisé
const getSpecialtyBadge = (rawRole, nomComplet) => {
  const text = `${rawRole} ${nomComplet}`.toLowerCase()
  if (text.includes('ceo') || text.includes('directeur') || text.includes('moutassim')) {
    return { label: 'Vision & Terroir', icon: 'bi-gem' }
  }
  if (text.includes('chef') || text.includes('cuisinier') || text.includes('abakachou')) {
    return { label: 'Tajines au Feu de Bois & Épices', icon: 'bi-fire' }
  }
  if (text.includes('caissier') || text.includes('caisse') || text.includes('abraham')) {
    return { label: 'Accueil & Relation Client', icon: 'bi-shield-check' }
  }
  if (text.includes('serveur') || text.includes('service') || text.includes('amine')) {
    return { label: 'Hospitalité & Art de la Table', icon: 'bi-cup-hot' }
  }
  return { label: 'Savoir-Faire Artisanal', icon: 'bi-award' }
}

// Helper pour l'ordre d'affichage (Direction -> Cuisine -> Service -> Caisse)
const getRolePriority = (role) => {
  const r = (role || '').toLowerCase()
  if (r.includes('ceo') || r.includes('directeur')) return 1
  if (r.includes('chef') || r.includes('cuisinier')) return 2
  if (r.includes('serveur') || r.includes('service')) return 3
  if (r.includes('caissier') || r.includes('caisse')) return 4
  return 5
}

// 2. Traitement dynamique des fichiers importés
const parseTeamMembers = () => {
  const members = []
  const seenPaths = new Set()

  for (const [path, module] of Object.entries(imageModules)) {
    // Éviter les doublons si deux patterns glob correspondent au même fichier
    if (seenPaths.has(path)) continue
    seenPaths.add(path)

    // Extraction du nom de fichier sans le chemin et sans l'extension
    const filenameWithExt = path.split('/').pop() || ''
    const filename = filenameWithExt.replace(/\.[^/.]+$/, '')

    // Convention: nom_prenom_role
    const parts = filename.split('_')

    let nom = ''
    let prenom = ''
    let rawRole = ''

    if (parts.length >= 3) {
      nom = parts[0]
      prenom = parts[1]
      // Au cas où le rôle contient plusieurs mots séparés par '_'
      rawRole = parts.slice(2).join('_')
    } else if (parts.length === 2) {
      nom = parts[0]
      prenom = parts[1]
      rawRole = 'Équipe'
    } else {
      nom = parts[0] || 'Artisan'
      prenom = ''
      rawRole = 'Équipe'
    }

    const nomComplet = [capitalize(nom), capitalize(prenom)].filter(Boolean).join(' ')
    const role = formatRole(rawRole)
    const specialty = getSpecialtyBadge(rawRole, nomComplet)
    // URL de l'image (compatible Vite dev & production build)
    const imageUrl = (module && typeof module === 'object' && 'default' in module) ? module.default : module

    members.push({
      id: filename,
      nom,
      prenom,
      nomComplet,
      role,
      rawRole,
      specialty,
      imageUrl,
      priority: getRolePriority(rawRole),
    })
  }

  // Tri pour une hiérarchie harmonieuse : Direction -> Cuisine -> Service -> Accueil
  return members.sort((a, b) => a.priority - b.priority || a.nomComplet.localeCompare(b.nomComplet))
}

const teamMembers = parseTeamMembers()

const TeamSection = () => {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section
      id="equipe"
      className="my-5 rounded-4 overflow-hidden position-relative"
      style={{
        backgroundColor: '#121212',
        border: '1px solid #27272a',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
        padding: '4rem 1.5rem',
      }}
    >
      {/* Halo décoratif d'ambiance doré subtil */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x pointer-events-none"
        style={{
          width: '600px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, rgba(18, 18, 18, 0) 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* ============================================================
            Header de la section : Badge doré, Titre & Sous-titre
            ============================================================ */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              color: '#fbbf24',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <i className="bi bi-people-fill text-warning"></i>
            <span>L'Excellence Humaine de Tiremt</span>
          </div>

          <h2 className="display-6 fw-bold text-white font-heading mb-3">
            Les Visages du Terroir &amp; de l’Hospitalité
          </h2>

          <p
            className="mx-auto mb-0"
            style={{
              color: '#a1a1aa',
              maxWidth: '720px',
              fontSize: '1.05rem',
              lineHeight: '1.7',
            }}
          >
            De la flamme des fourneaux jusqu’à la délicatesse du service en salle,
            rencontrez les artisans passionnés qui font rayonner l’art culinaire de Tiznit chaque jour.
          </p>
        </div>

        {/* ============================================================
            Grille Responsive : 1 col (mobile), 2 cols (md), 4 cols (lg)
            ============================================================ */}
        {teamMembers.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-person-x fs-1 d-block mb-3 text-warning"></i>
            <p>Aucun membre d'équipe trouvé dans <code>src/assets/equipe/</code>.</p>
          </div>
        ) : (
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4">
            {teamMembers.map((member) => {
              const isHovered = hoveredId === member.id

              return (
                <div key={member.id} className="col">
                  <div
                    className="h-100 rounded-4 overflow-hidden position-relative d-flex flex-column"
                    onMouseEnter={() => setHoveredId(member.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      backgroundColor: '#18181b',
                      border: isHovered ? '1px solid rgba(251, 191, 36, 0.6)' : '1px solid #27272a',
                      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow: isHovered
                        ? '0 20px 35px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(251, 191, 36, 0.15)'
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Conteneur Image avec zoom hover */}
                    <div
                      className="position-relative overflow-hidden"
                      style={{
                        height: '290px',
                        backgroundColor: '#09090b',
                      }}
                    >
                      <img
                        src={member.imageUrl}
                        alt={`${member.nomComplet} - ${member.role}`}
                        className="w-100 h-100 object-fit-cover"
                        style={{
                          objectPosition: 'top center',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        loading="lazy"
                      />

                      {/* Dégradé d'ombrage élégant en bas de l'image */}
                      <div
                        className="position-absolute bottom-0 start-0 end-0"
                        style={{
                          height: '90px',
                          background: 'linear-gradient(to top, #18181b 0%, rgba(24, 24, 27, 0) 100%)',
                        }}
                      />

                      {/* Badge rôle flottant en haut à droite */}
                      <div className="position-absolute top-0 end-0 m-3">
                        <span
                          className="badge rounded-pill px-2.5 py-1.5"
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#fafafa',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.03em',
                          }}
                        >
                          Tiremt Tiznit
                        </span>
                      </div>
                    </div>

                    {/* Contenu de la Carte */}
                    <div className="p-4 d-flex flex-column flex-grow-1 text-start">
                      {/* Badge Spécialité */}
                      <div className="mb-2">
                        <span
                          className="d-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-pill"
                          style={{
                            backgroundColor: 'rgba(251, 191, 36, 0.12)',
                            border: '1px solid rgba(251, 191, 36, 0.28)',
                            color: '#fbbf24',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                          }}
                        >
                          <i className={`bi ${member.specialty.icon}`}></i>
                          <span>{member.specialty.label}</span>
                        </span>
                      </div>

                      {/* Nom Complet */}
                      <h3
                        className="h5 fw-bold text-white font-heading mb-1"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {member.nomComplet}
                      </h3>

                      {/* Rôle / Poste */}
                      <p
                        className="small fw-semibold mb-3"
                        style={{
                          color: '#d4d4d8',
                          fontSize: '0.88rem',
                        }}
                      >
                        {member.role}
                      </p>

                      {/* Séparateur subtil et signature Tiznit */}
                      <div
                        className="mt-auto pt-3 d-flex align-items-center justify-content-between"
                        style={{
                          borderTop: '1px solid #27272a',
                          color: '#71717a',
                          fontSize: '0.78rem',
                        }}
                      >
                        <span className="d-flex align-items-center gap-1">
                          <i className="bi bi-geo-alt text-warning"></i>
                          <span>Place El Mechouar</span>
                        </span>
                        <span
                          className="fw-bold"
                          style={{
                            color: isHovered ? '#fbbf24' : '#52525b',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          TIREMT &bull; 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default TeamSection
