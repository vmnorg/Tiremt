import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import tiremtLogo from '../assets/logo-cream.png'
import {
  login,
  register,
  clearError,
  selectIsAuthenticated,
  selectAuthError,
} from '../redux/authSlice'

// ============================================================
// Cinematic Waiter Component — Séquence d'accueil Maître d'Hôtel
// Un serveur de prestige entre en scène avec prestance, portant un
// plateau avec cloche dorée, ouvre la cloche dans un éclat d'arômes
// dorés, puis révèle le formulaire de connexion/inscription.
// ============================================================
const WaiterAnimation = ({ onComplete }) => {
  return (
    <motion.div
      className="auth-intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient Spotlight */}
      <div className="auth-waiter-spotlight" />

      {/* Main Waiter & Platter SVG Scene */}
      <motion.svg
        viewBox="0 0 380 340"
        width="340"
        height="300"
        style={{ overflow: 'visible', maxWidth: '100%' }}
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="floorShadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.65)" />
            <stop offset="60%" stopColor="rgba(212,175,55,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <linearGradient id="trayGoldGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A6020" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF2B2" />
            <stop offset="75%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#7A6020" />
          </linearGradient>

          <linearGradient id="clocheGoldGrad" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#B38F28" />
            <stop offset="20%" stopColor="#F5D76E" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#FFF4C2" />
            <stop offset="85%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6B1C" />
          </linearGradient>

          <radialGradient id="knobGoldGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF9D6" />
            <stop offset="45%" stopColor="#F5D76E" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>

          <radialGradient id="gourmetGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245, 215, 110, 0.95)" />
            <stop offset="45%" stopColor="rgba(212, 175, 55, 0.45)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Floor Shadow on the Ground */}
        <motion.ellipse
          cx="195"
          cy="310"
          rx="95"
          ry="10"
          fill="url(#floorShadowGrad)"
          initial={{ scaleX: 0.3, opacity: 0 }}
          animate={{ scaleX: [0.3, 1, 1], opacity: [0, 0.9, 0.9] }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Waiter & Dish Group with Walking Entrance Movement */}
        <motion.g
          initial={{ x: -140, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            y: [0, -5, 0, -4, 0, 0],
          }}
          transition={{
            duration: 1.25,
            times: [0, 0.25, 0.5, 0.75, 0.95, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* === 1. LE CORPS DU SERVEUR (WAITER) === */}

          {/* Chaussures de service cirées */}
          <g>
            <path
              d="M 148 298 C 145 298 135 304 135 308 L 165 308 C 165 304 160 298 155 298 Z"
              fill="#0d0d0f"
            />
            <path
              d="M 185 298 C 182 298 172 304 172 308 L 202 308 C 202 304 197 298 192 298 Z"
              fill="#0d0d0f"
            />
            {/* Liseré or semelle */}
            <line x1="135" y1="308" x2="165" y2="308" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
            <line x1="172" y1="308" x2="202" y2="308" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
          </g>

          {/* Pantalon de costume noir ajusté */}
          <g>
            <path d="M 152 230 L 145 298 L 162 298 L 166 230 Z" fill="#121215" />
            <path d="M 174 230 L 178 298 L 195 298 L 188 230 Z" fill="#18181d" />
            <line x1="153" y1="234" x2="153" y2="295" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
            <line x1="186" y1="234" x2="186" y2="295" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
          </g>

          {/* Veste de smoking / Gilet de maître d'hôtel avec boutons or */}
          <g>
            <path
              d="M 145 160 C 140 190 148 240 190 240 C 225 240 235 190 230 160 C 220 145 155 145 145 160 Z"
              fill="#151519"
              stroke="#26262b"
              strokeWidth="0.6"
            />

            {/* Plastron chemise blanche immaculée */}
            <polygon points="175,142 200,142 195,195 180,195" fill="#f8fafc" />

            {/* Revers de veste liseré or */}
            <path d="M 155 150 L 172 205 L 185 205 L 170 150 Z" fill="#1c1c22" stroke="#b8860b" strokeWidth="0.8" />
            <path d="M 220 150 L 202 205 L 190 205 L 205 150 Z" fill="#222228" stroke="#b8860b" strokeWidth="0.8" />

            {/* Boutons dorés du gilet */}
            <circle cx="187.5" cy="198" r="2.2" fill="#D4AF37" />
            <circle cx="187.5" cy="212" r="2.2" fill="#D4AF37" />
            <circle cx="187.5" cy="226" r="2.2" fill="#D4AF37" />

            {/* Pochette de costume dorée */}
            <line x1="158" y1="178" x2="174" y2="178" stroke="#2a2a32" strokeWidth="1.5" />
            <polygon points="163,178 168,168 173,178" fill="#D4AF37" />

            {/* Nœud papillon chic noir & or */}
            <polygon points="187,142 178,138 178,146" fill="#0f0f12" stroke="#D4AF37" strokeWidth="0.5" />
            <polygon points="188,142 197,138 197,146" fill="#0f0f12" stroke="#D4AF37" strokeWidth="0.5" />
            <rect x="185.5" y="140" width="4" height="4" rx="1" fill="#F5D76E" />
          </g>

          {/* Tête, Coiffure & Visage en profil noble (nodding animation) */}
          <motion.g
            animate={{
              rotate: [0, 0, 3, 0],
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.45, 0.6, 0.75],
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '188px 145px' }}
          >
            {/* Cou */}
            <rect x="182" y="128" width="11" height="14" rx="2" fill="#D4A574" />
            {/* Col de chemise empesé */}
            <polygon points="180,138 187,144 194,138 188,136" fill="#ffffff" stroke="#ddd" strokeWidth="0.5" />

            {/* Profil visage */}
            <path
              d="M 180 102 C 178 122 184 132 195 130 C 199 129 203 125 203 118 C 204 114 201 110 200 108 C 200 102 195 95 180 102 Z"
              fill="#D4A574"
            />
            {/* Oreille */}
            <ellipse cx="180" cy="115" rx="3.5" ry="5.5" fill="#C4956A" />
            {/* Œil attentif & bienveillant */}
            <path d="M 194 111 Q 197 109 200 111" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Moustache fine à la française */}
            <path d="M 194 122 Q 199 120 204 121 Q 206 123 203 124 Q 198 124 194 122 Z" fill="#1a1a1a" />
            {/* Sourire accueillant */}
            <path d="M 195 125 Q 198 127 201 125" stroke="#7a3e20" strokeWidth="1" fill="none" strokeLinecap="round" />

            {/* Coiffure soignée avec éclat doré */}
            <path
              d="M 174 108 C 172 90 185 82 200 86 C 206 88 208 96 204 104 C 196 98 185 99 178 108 Z"
              fill="#1e1e24"
            />
            <path
              d="M 182 87 Q 194 85 201 89"
              stroke="rgba(212, 175, 55, 0.45)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Bras gauche au repos avec torchon de sommelier blanc & or */}
          <g>
            {/* Manche gauche */}
            <path
              d="M 152 165 C 130 185 130 220 152 230 C 158 226 158 215 146 205 C 142 190 148 175 160 168 Z"
              fill="#121215"
            />
            {/* Torchon de service blanc drapé élégamment sur l'avant-bras */}
            <path
              d="M 134 200 C 130 215 130 255 132 270 L 148 266 C 146 245 145 215 146 198 Z"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
            {/* Pli du torchon */}
            <line x1="139" y1="202" x2="140" y2="268" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Double liseré brodé d'or sur l'ourlet */}
            <line x1="132" y1="262" x2="148" y2="258" stroke="#D4AF37" strokeWidth="1.2" />
            <line x1="133" y1="265" x2="147" y2="261" stroke="#D4AF37" strokeWidth="0.8" />
          </g>

          {/* Bras droit relevé portant fièrement le plateau */}
          <g>
            <path
              d="M 218 160 C 235 178 244 195 244 212 C 248 212 254 208 255 195 C 255 175 258 160 260 150 L 248 148 C 246 160 240 178 236 195 C 234 185 228 172 216 160 Z"
              fill="#151519"
              stroke="#24242a"
              strokeWidth="0.5"
            />
            {/* Poignet de chemise blanc */}
            <rect
              x="248"
              y="146"
              width="14"
              height="6"
              rx="2"
              transform="rotate(-15 255 149)"
              fill="#ffffff"
            />
            {/* Bouton de manchette or */}
            <circle cx="255" cy="149" r="1.5" fill="#D4AF37" />
            {/* Main soutenant le plateau par en-dessous */}
            <path
              d="M 248 145 C 250 140 258 138 266 140 C 272 142 274 146 268 147 L 250 148 Z"
              fill="#D4A574"
            />
          </g>

          {/* === 2. LE PLATEAU EN ARGENT ET OR (TRAY) === */}
          <g>
            {/* Surface du plateau avec dégradé métallique */}
            <ellipse
              cx="260"
              cy="138"
              rx="85"
              ry="13"
              fill="url(#trayGoldGrad)"
              stroke="#8A6B1C"
              strokeWidth="1.5"
            />
            {/* Rebord intérieur miroir */}
            <ellipse
              cx="260"
              cy="137"
              rx="76"
              ry="10"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.8"
            />
            {/* Reflet de brillance lumineuse */}
            <path
              d="M 190 139 Q 260 146 330 139"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              fill="none"
            />
          </g>

          {/* === 3. LE METS GOURMAND RÉVÉLÉ SOUS LA CLOCHE === */}
          <g>
            {/* Base assiette gastronomique dorée */}
            <ellipse cx="260" cy="136" rx="60" ry="7" fill="#8B7335" />
            <ellipse cx="260" cy="135" rx="55" ry="5.5" fill="#F5D76E" opacity="0.6" />

            {/* Halo de chaleur et lumière gastronomique */}
            <motion.ellipse
              cx="260"
              cy="126"
              rx="50"
              ry="16"
              fill="url(#gourmetGlow)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: [0.2, 0.2, 1.25, 1],
                opacity: [0, 0, 0.9, 0.7],
              }}
              transition={{
                duration: 2.9,
                times: [0, 0.45, 0.75, 1],
                ease: 'easeOut',
              }}
            />
          </g>

          {/* === 4. LA CLOCHE ANIMÉE (DOME QUI SE SOULÈVE) === */}
          <motion.g
            initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            animate={{
              y: [0, 0, -90, -115],
              x: [0, 0, 15, 25],
              rotate: [0, 0, -14, -18],
              opacity: [1, 1, 0.85, 0],
            }}
            transition={{
              duration: 2.9,
              times: [0, 0.45, 0.82, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={onComplete}
            style={{ transformOrigin: '260px 136px' }}
          >
            {/* Dôme de la cloche */}
            <path
              d="M 205 136 C 205 65 315 65 315 136 Z"
              fill="url(#clocheGoldGrad)"
              stroke="#B8860B"
              strokeWidth="2"
            />
            {/* Reflet courbe de la cloche */}
            <path
              d="M 225 125 C 225 80 255 70 275 68"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Poignée ornementale de la cloche */}
            <ellipse cx="260" cy="65" rx="8" ry="3" fill="#B8860B" />
            <circle
              cx="260"
              cy="58"
              r="9"
              fill="url(#knobGoldGrad)"
              stroke="#B8860B"
              strokeWidth="1.2"
            />
            <circle cx="258" cy="55" r="2.5" fill="rgba(255,255,255,0.7)" />
          </motion.g>

          {/* === 5. VOLUTES DE VAPEUR AROMATIQUE (STEAM) === */}
          {[
            { d: 'M 245 130 Q 240 105 248 85 Q 255 65 248 45', delay: 1.5 },
            { d: 'M 260 130 Q 268 100 258 75 Q 266 50 260 30', delay: 1.65 },
            { d: 'M 275 130 Q 282 108 274 88 Q 280 68 275 50', delay: 1.8 },
          ].map((steam, i) => (
            <motion.path
              key={`steam-${i}`}
              d={steam.d}
              fill="none"
              stroke="rgba(245, 215, 110, 0.55)"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: [0, 0, 0.7, 0],
                pathLength: [0, 0, 1, 1],
                y: [0, 0, -18, -32],
              }}
              transition={{
                duration: 2.4,
                times: [0, 0.45, 0.75, 1],
                delay: steam.delay - 1.5,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* === 6. ÉTOILES & ÉTINCELLES DE SAVEUR (SPARKLES) === */}
          {[
            { x: 215, y: 110, delay: 1.6 },
            { x: 300, y: 105, delay: 1.7 },
            { x: 235, y: 80, delay: 1.85 },
            { x: 285, y: 75, delay: 1.95 },
            { x: 260, y: 55, delay: 2.05 },
            { x: 200, y: 125, delay: 2.1 },
            { x: 315, y: 120, delay: 2.15 },
          ].map((sparkle, i) => (
            <motion.g
              key={`sparkle-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0, 1, 0],
                scale: [0, 0, 1.4, 0],
              }}
              transition={{
                duration: 2.4,
                times: [0, 0.5, 0.75, 1],
                delay: sparkle.delay - 1.6,
                ease: 'easeOut',
              }}
            >
              <circle cx={sparkle.x} cy={sparkle.y} r="2.5" fill="#FFF4C2" />
              <line
                x1={sparkle.x - 6}
                y1={sparkle.y}
                x2={sparkle.x + 6}
                y2={sparkle.y}
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <line
                x1={sparkle.x}
                y1={sparkle.y - 6}
                x2={sparkle.x}
                y2={sparkle.y + 6}
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </motion.g>
          ))}
        </motion.g>
      </motion.svg>

      {/* Badge & Titre de bienvenue cinématique */}
      <motion.div
        className="auth-waiter-badge"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <i className="bi bi-stars me-1 text-warning" />
        <span>Service d'Exception • TIREMT</span>
      </motion.div>

      <motion.h2
        className="auth-waiter-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
      >
        Votre table est servie
      </motion.h2>

      <motion.p
        className="auth-waiter-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.7 }}
      >
        Le maître d'hôtel vous ouvre les portes de Tiremt
      </motion.p>
    </motion.div>
  )
}

// Pré-générer les positions des particules en dehors du composant (module-level)
// pour respecter la pureté du render React
const PARTICLE_STYLES = Array.from({ length: 20 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 6}s`,
  animationDuration: `${4 + Math.random() * 6}s`,
  width: `${2 + Math.random() * 4}px`,
  height: `${2 + Math.random() * 4}px`,
}))

// ============================================================
// Auth Page Component
// ============================================================
const AuthPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const authError = useSelector(selectAuthError)

  // State local
  const [isLogin, setIsLogin] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)

  // Champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [validationErrors, setValidationErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Quand l'animation se termine, afficher le formulaire après un léger délai
  const handleAnimationComplete = () => {
    setAnimationDone(true)
    setTimeout(() => setShowForm(true), 200)
  }

  // Rejouer la cinématique d'introduction
  const handleReplayIntro = () => {
    setShowForm(false)
    setAnimationDone(false)
  }

  // Effacer les erreurs quand on change de mode
  const handleToggleMode = () => {
    setIsLogin(!isLogin)
    setValidationErrors({})
    setFormData({ nom: '', email: '', password: '', confirmPassword: '' })
    dispatch(clearError())
  }

  // Mise à jour des champs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Effacer l'erreur de validation pour ce champ
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validation
  const validate = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!isLogin && !formData.nom.trim()) {
      errors.nom = 'Le nom est requis.'
    }
    if (!formData.email.trim()) {
      errors.email = "L'email est requis."
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Format d'email invalide."
    }
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis.'
    } else if (formData.password.length < 6) {
      errors.password = 'Minimum 6 caractères.'
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())
    if (!validate()) return

    if (isLogin) {
      dispatch(login({ email: formData.email, password: formData.password }))
    } else {
      dispatch(
        register({
          nom: formData.nom,
          email: formData.email,
          password: formData.password,
        }),
      )
    }
  }

  return (
    <div className="auth-page">
      {/* Background Decorative Elements */}
      <div className="auth-bg-pattern" />
      <div className="auth-bg-glow auth-bg-glow--1" />
      <div className="auth-bg-glow auth-bg-glow--2" />

      {/* Floating Gold Particles */}
      <div className="auth-particles">
        {PARTICLE_STYLES.map((style, i) => (
          <div
            key={i}
            className="auth-particle"
            style={style}
          />
        ))}
      </div>

      <div className="auth-container">
        {/* Waiter Intro Animation */}
        <AnimatePresence>
          {!animationDone && (
            <motion.div
              className="auth-animation-wrapper"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <WaiterAnimation onComplete={handleAnimationComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card with Elevation entrance */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="auth-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Card Header with Official TIREMT Logo */}
              <div className="auth-card-header">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="auth-logo-badge">
                    <img
                      src={tiremtLogo}
                      alt="Logo Tiremt Restaurant"
                      className="auth-brand-logo"
                    />
                  </div>
                  <h1 className="auth-title">
                    {isLogin ? 'Bon Retour' : 'Rejoignez-nous'}
                  </h1>
                  <p className="auth-subtitle">
                    {isLogin
                      ? 'Connectez-vous pour accéder à votre espace gourmand'
                      : 'Créez votre compte et découvrez Tiremt'}
                  </p>
                </motion.div>
              </div>

              {/* Toggle Login / Register */}
              <div className="auth-toggle-wrapper">
                <div className="auth-toggle">
                  <motion.button
                    type="button"
                    className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
                    onClick={isLogin ? undefined : handleToggleMode}
                    whileTap={{ scale: 0.97 }}
                    id="auth-toggle-login"
                  >
                    <i className="bi bi-box-arrow-in-right" />
                    <span>Connexion</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
                    onClick={isLogin ? handleToggleMode : undefined}
                    whileTap={{ scale: 0.97 }}
                    id="auth-toggle-register"
                  >
                    <i className="bi bi-person-plus-fill" />
                    <span>Inscription</span>
                  </motion.button>
                  {/* Sliding indicator */}
                  <motion.div
                    className="auth-toggle-indicator"
                    animate={{ x: isLogin ? 0 : '100%' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {authError && (
                  <motion.div
                    className="auth-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <i className="bi bi-exclamation-triangle-fill" />
                    <span>{authError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? 'login' : 'register'}
                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Nom (Register only) */}
                    {!isLogin && (
                      <motion.div
                        className="auth-field"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                      >
                        <label htmlFor="auth-nom" className="auth-label">
                          Nom complet
                        </label>
                        <div
                          className={`auth-input-wrapper ${validationErrors.nom ? 'has-error' : ''}`}
                        >
                          <i className="bi bi-person auth-input-icon" />
                          <input
                            type="text"
                            id="auth-nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className="auth-input"
                            autoComplete="name"
                          />
                        </div>
                        {validationErrors.nom && (
                          <span className="auth-field-error">
                            {validationErrors.nom}
                          </span>
                        )}
                      </motion.div>
                    )}

                    {/* Email */}
                    <div className="auth-field">
                      <label htmlFor="auth-email" className="auth-label">
                        Adresse email
                      </label>
                      <div
                        className={`auth-input-wrapper ${validationErrors.email ? 'has-error' : ''}`}
                      >
                        <i className="bi bi-envelope auth-input-icon" />
                        <input
                          type="email"
                          id="auth-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="vous@exemple.com"
                          className="auth-input"
                          autoComplete="email"
                        />
                      </div>
                      {validationErrors.email && (
                        <span className="auth-field-error">
                          {validationErrors.email}
                        </span>
                      )}
                    </div>

                    {/* Password */}
                    <div className="auth-field">
                      <label htmlFor="auth-password" className="auth-label">
                        Mot de passe
                      </label>
                      <div
                        className={`auth-input-wrapper ${validationErrors.password ? 'has-error' : ''}`}
                      >
                        <i className="bi bi-lock auth-input-icon" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="auth-password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="auth-input"
                          autoComplete={
                            isLogin ? 'current-password' : 'new-password'
                          }
                        />
                        <button
                          type="button"
                          className="auth-password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                          aria-label={
                            showPassword
                              ? 'Masquer le mot de passe'
                              : 'Afficher le mot de passe'
                          }
                          id="auth-password-toggle"
                        >
                          <i
                            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                          />
                        </button>
                      </div>
                      {validationErrors.password && (
                        <span className="auth-field-error">
                          {validationErrors.password}
                        </span>
                      )}
                    </div>

                    {/* Confirm Password (Register only) */}
                    {!isLogin && (
                      <motion.div
                        className="auth-field"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label
                          htmlFor="auth-confirm-password"
                          className="auth-label"
                        >
                          Confirmer le mot de passe
                        </label>
                        <div
                          className={`auth-input-wrapper ${validationErrors.confirmPassword ? 'has-error' : ''}`}
                        >
                          <i className="bi bi-lock-fill auth-input-icon" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="auth-confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="auth-input"
                            autoComplete="new-password"
                          />
                        </div>
                        {validationErrors.confirmPassword && (
                          <span className="auth-field-error">
                            {validationErrors.confirmPassword}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="auth-submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  id="auth-submit-btn"
                >
                  <span>
                    {isLogin ? 'Se connecter' : 'Créer mon compte'}
                  </span>
                  <i className="bi bi-arrow-right" />
                </motion.button>
              </form>

              {/* Footer */}
              <div className="auth-card-footer">
                <p>
                  {isLogin
                    ? "Vous n'avez pas de compte ?"
                    : 'Déjà un compte ?'}
                  <button
                    type="button"
                    className="auth-footer-link"
                    onClick={handleToggleMode}
                    id="auth-footer-toggle"
                  >
                    {isLogin ? "S'inscrire" : 'Se connecter'}
                  </button>
                </p>

                {/* Replay Cinematic Intro button */}
                <button
                  type="button"
                  className="auth-replay-btn"
                  onClick={handleReplayIntro}
                  id="auth-replay-intro-btn"
                  title="Revoir l'animation d'accueil du serveur"
                >
                  <i className="bi bi-arrow-clockwise" />
                  <span>Revoir l'accueil du serveur</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AuthPage
