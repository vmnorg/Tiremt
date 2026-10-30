import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
  addToCart,
} from '../redux/cartSlice'
import { submitOrder, selectSubmissionStatus } from '../redux/orderSlice'

const Checkout = () => {
  const dispatch = useDispatch()

  // [E. Redux Selectors] : Lecture des données globales du panier et statut de soumission
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const submissionStatus = useSelector(selectSubmissionStatus)

  // [B. Formulaire & useState] :
  // Champs contrôlés (Controlled Inputs) : kol champ 3ndou valeur synchronisée f state objet 'formData'
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    adresse: '',
    notes: '',
  })

  // États locaux pour le choix du créneau de livraison et du mode de paiement
  const [selectedSlot, setSelectedSlot] = useState('asap')
  const [paymentMethod, setPaymentMethod] = useState('card')
  // State d les erreurs de validation : { nom: '...', telephone: '...' }
  const [errors, setErrors] = useState({})
  const [orderConfirmed, setOrderConfirmed] = useState(null)

  // Calcul des frais de livraison et d'emballage (dynamique selon le total)
  const deliveryFee = cartTotal >= 150 || cartTotal === 0 ? 0 : 15
  const packagingFee = cartItems.length > 0 ? 5 : 0
  const finalTotal = cartTotal + deliveryFee + packagingFee

  // [B. Gestion des événements onChange] :
  // Fonction générique ki-t-executa f kol frappe clavier bach t-mishi l'état w t-msah l'erreur dyal dak l-champ
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Mli l-user ki-bda y-ktheb, kan-haydo l'erreur bach l-interface tbqa responsive
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // [B. Validation côté client (Client-side Validation)] :
  // Kan-vérifiw les champs obligatoires b des règles précises (longueur, format Regex)
  const validateForm = () => {
    const newErrors = {}

    // 1. Validation du Nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom complet est obligatoire.'
    } else if (formData.nom.trim().length < 3) {
      newErrors.nom = 'Le nom doit comporter au moins 3 caractères.'
    }

    // 2. Validation Regex dyal le numéro de téléphone marocain (05, 06, 07 ou format international +212)
    const phoneRegex = /^(?:(?:\+|00)212|0)[5-7]\d{8}$|^[0-9+() -]{9,15}$/
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est obligatoire.'
    } else if (!phoneRegex.test(formData.telephone.trim())) {
      newErrors.telephone = 'Format de téléphone invalide (ex: 0612345678).'
    }

    // 3. Validation de l'Adresse
    if (!formData.adresse.trim()) {
      newErrors.adresse = 'L’adresse de livraison complète est obligatoire.'
    } else if (formData.adresse.trim().length < 6) {
      newErrors.adresse = 'Veuillez préciser votre adresse (au moins 6 caractères).'
    }

    setErrors(newErrors)
    // Ila kant newErrors khawya (0 clés), le formulaire rah 100% valide !
    return Object.keys(newErrors).length === 0
  }

  // [B. Gestion de la soumission onSubmit] :
  const handleSubmit = async (e) => {
    // e.preventDefault() : Darouria bach n-habso le rechargement par défaut dyal l-navigateur !
    e.preventDefault()

    // [A. Affichage conditionnel] : Vérification que le panier n'est pas vide
    if (cartItems.length === 0) {
      alert('Votre panier est vide !')
      return
    }

    // Blocage si la validation échoue
    if (!validateForm()) {
      return
    }

    const payload = {
      client: {
        nom: formData.nom.trim(),
        telephone: formData.telephone.trim(),
        adresse: formData.adresse.trim(),
        notes: formData.notes.trim() || undefined,
        creneau: selectedSlot,
        reglement: paymentMethod,
      },
      articles: cartItems.map((item) => ({
        id: item.id,
        nom: item.nom,
        prix: item.prix,
        quantity: item.quantity,
        totalArticle: item.prix * item.quantity,
      })),
      sousTotal: cartTotal,
      fraisLivraison: deliveryFee,
      ecoPackaging: packagingFee,
      total: finalTotal,
      statut: 'En préparation',
      date: new Date().toISOString(),
    }

    try {
      const resultAction = await dispatch(submitOrder(payload))
      if (submitOrder.fulfilled.match(resultAction)) {
        setOrderConfirmed(resultAction.payload)
        dispatch(clearCart())
      }
    } catch (err) {
      console.error('Erreur soumission commande:', err)
    }
  }

  const handleAddMoroccanDelight = () => {
    dispatch(
      addToCart({
        id: 'the-patisseries-tiznit',
        nom: 'Thé Royal à la Menthe & Pâtisseries aux Amandes',
        prix: 35,
        image:
          'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
        categorie: 'Desserts & Boissons',
      })
    )
  }

  // Confirmation Success Screen
  if (orderConfirmed) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-card rounded-4 text-center p-4 p-md-5 bg-white">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex p-3 mx-auto mb-3">
                <i className="bi bi-check-circle-fill display-4 text-success"></i>
              </div>
              <h2 className="display-6 fw-bold font-heading mb-2">Commande Confirmée !</h2>
              <p className="text-muted mb-4">
                Merci <strong>{orderConfirmed.client?.nom}</strong>, votre table gastronomique est en cours
                d'ordonnancement. Le Chef Alan Reid prépare vos mets avec rigueur.
              </p>

              <div className="p-4 bg-light rounded-4 text-start mb-4 border">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Numéro de Commande :</span>
                  <strong className="text-dark font-monospace">#{orderConfirmed.id}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Date &amp; Heure :</span>
                  <span>{new Date(orderConfirmed.date).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Téléphone :</span>
                  <span>{orderConfirmed.client?.telephone}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Lieu de Dégustation :</span>
                  <span>{orderConfirmed.client?.adresse}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-baseline fw-bold fs-5 text-dark">
                  <span>Total Réglé :</span>
                  <span className="text-primary font-heading fs-3">{orderConfirmed.total} DH</span>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/commandes" className="btn btn-warning rounded-pill px-4 fw-semibold text-dark shadow-sm">
                  <i className="bi bi-clock-history me-2"></i> Suivre ma Commande
                </Link>
                <Link to="/menu" className="btn btn-outline-secondary rounded-pill px-4">
                  <i className="bi bi-arrow-left me-2"></i> Retour à la Carte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5 bg-white rounded-4 border shadow-sm my-4 px-3">
          <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex p-4 mb-3">
            <i className="bi bi-bag-x display-4"></i>
          </div>
          <h2 className="fw-bold font-heading mb-2">Votre panier est vide</h2>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
            Vous n'avez pas encore sélectionné de mets gastronomiques. Parcourez notre carte
            pour composer votre table d'exception.
          </p>
          <Link to="/menu" className="btn btn-warning rounded-pill px-4 py-2 fw-semibold text-dark shadow-sm">
            <i className="bi bi-arrow-right-circle me-2"></i> Découvrir le Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/* Section Header matching Maquette */}
      <div className="mb-4">
        <span className="text-uppercase fw-bold text-warning small tracking-wider">
          FINALISATION DE COMMANDE
        </span>
        <h1 className="display-6 fw-bold font-heading mb-1">Votre Table Gastronomique</h1>
        <p className="text-muted">Renseignez vos coordonnées de dégustation et validez votre commande.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4 items-start">
          {/* ============================================================
              Left Column (7 cols): Step 1 (Details) & Step 2 (Payment)
              ============================================================ */}
          <div className="col-lg-7">
            {/* Step 1: Delivery Details */}
            <div className="checkout-card mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div className="d-flex align-items-center gap-3">
                  <span className="checkout-step-number">1</span>
                  <div>
                    <h5 className="fw-bold mb-0 font-heading">Coordonnées &amp; Lieu de Dégustation</h5>
                    <small className="text-muted">Précisez l'adresse pour notre service de livraison isotherme</small>
                  </div>
                </div>
                <span className="ssl-badge">
                  <i className="bi bi-lock-fill"></i> Chiffrement SSL
                </span>
              </div>

              <div className="row g-3">
                {/* Nom */}
                <div className="col-md-6">
                  <label htmlFor="nom" className="form-label small fw-bold text-dark d-flex justify-content-between">
                    <span>Nom et Prénom *</span>
                    {formData.nom.trim().length >= 3 && (
                      <span className="text-success small fw-semibold">
                        <i className="bi bi-check-circle me-1"></i> Valide
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                    id="nom"
                    name="nom"
                    placeholder="Ex: Youssef El Amrani"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                </div>

                {/* Téléphone */}
                <div className="col-md-6">
                  <label htmlFor="telephone" className="form-label small fw-bold text-dark d-flex justify-content-between">
                    <span>Téléphone de contact *</span>
                    {formData.telephone.trim() && !errors.telephone && (
                      <span className="text-success small fw-semibold">
                        <i className="bi bi-check-circle me-1"></i> Valide
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                    id="telephone"
                    name="telephone"
                    placeholder="Ex: 0612345678"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                  {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
                </div>

                {/* Adresse */}
                <div className="col-12">
                  <label htmlFor="adresse" className="form-label small fw-bold text-dark d-flex justify-content-between">
                    <span>Adresse de livraison complète *</span>
                    {formData.adresse.trim().length >= 6 && (
                      <span className="text-success small fw-semibold">
                        <i className="bi bi-check-circle me-1"></i> Zone desservie
                      </span>
                    )}
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <i className="bi bi-geo-alt"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors.adresse ? 'is-invalid' : ''}`}
                      id="adresse"
                      name="adresse"
                      placeholder="Ex: 45 Rue de la Liberté, Étage 2, Résidence Les Fleurs"
                      value={formData.adresse}
                      onChange={handleChange}
                    />
                    {errors.adresse && <div className="invalid-feedback">{errors.adresse}</div>}
                  </div>
                </div>

                {/* Notes Chef / Allergies */}
                <div className="col-12">
                  <label htmlFor="notes" className="form-label small fw-bold text-dark">
                    Instructions au Chef ou Allergies éventuelles
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows="2"
                    placeholder="Allergies éventuelles, code de porte, couverts de prestige..."
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Delivery Time Slot Selector from Maquette */}
                <div className="col-12 pt-2">
                  <label className="form-label small fw-bold text-dark mb-2">
                    Créneau de Dégustation Souhaité
                  </label>
                  <div className="row g-2">
                    <div className="col-sm-4">
                      <div
                        className={`time-slot-card ${selectedSlot === 'asap' ? 'active' : ''}`}
                        onClick={() => setSelectedSlot('asap')}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge bg-warning bg-opacity-25 text-warning-emphasis text-uppercase small">
                            Au plus vite
                          </span>
                          <input
                            type="radio"
                            name="slot_radio"
                            checked={selectedSlot === 'asap'}
                            onChange={() => setSelectedSlot('asap')}
                          />
                        </div>
                        <strong className="text-dark small">12h45 – 15h15</strong>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>30 min estimé</small>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div
                        className={`time-slot-card ${selectedSlot === 'diner' ? 'active' : ''}`}
                        onClick={() => setSelectedSlot('diner')}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge bg-light text-muted text-uppercase small">
                            Déjeuner Tard
                          </span>
                          <input
                            type="radio"
                            name="slot_radio"
                            checked={selectedSlot === 'diner'}
                            onChange={() => setSelectedSlot('diner')}
                          />
                        </div>
                        <strong className="text-dark small">15h30 – 21h00</strong>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>Sur réservation</small>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div
                        className={`time-slot-card ${selectedSlot === 'late' ? 'active' : ''}`}
                        onClick={() => setSelectedSlot('late')}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge bg-light text-muted text-uppercase small">
                            Dîner
                          </span>
                          <input
                            type="radio"
                            name="slot_radio"
                            checked={selectedSlot === 'late'}
                            onChange={() => setSelectedSlot('late')}
                          />
                        </div>
                        <strong className="text-dark small">21h30 – 23h30</strong>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>Service nocturne</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Mode */}
            <div className="checkout-card mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div className="d-flex align-items-center gap-3">
                  <span className="checkout-step-number bg-dark">2</span>
                  <div>
                    <h5 className="fw-bold mb-0 font-heading">Mode de Règlement</h5>
                    <small className="text-muted">Sélectionnez votre moyen de paiement sécurisé</small>
                  </div>
                </div>
                <div className="text-muted fs-5 d-flex gap-2">
                  <i className="bi bi-credit-card"></i>
                  <i className="bi bi-phone"></i>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="row g-2 mb-3">
                <div className="col-sm-4">
                  <div
                    className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <i className="bi bi-credit-card-2-front fs-4 text-warning"></i>
                      <span className={`p-1 rounded-circle ${paymentMethod === 'card' ? 'bg-warning' : 'bg-secondary'}`} style={{ width: '10px', height: '10px' }}></span>
                    </div>
                    <div>
                      <strong className="d-block text-dark small">Carte Bancaire</strong>
                      <small className="text-muted" style={{ fontSize: '0.72rem' }}>Visa, Mastercard, Amex</small>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div
                    className={`payment-tab-btn ${paymentMethod === 'apple' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <i className="bi bi-phone fs-4 text-dark"></i>
                      <span className={`p-1 rounded-circle ${paymentMethod === 'apple' ? 'bg-warning' : 'bg-secondary'}`} style={{ width: '10px', height: '10px' }}></span>
                    </div>
                    <div>
                      <strong className="d-block text-dark small">Apple / Google Pay</strong>
                      <small className="text-muted" style={{ fontSize: '0.72rem' }}>1-clic biométrique</small>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div
                    className={`payment-tab-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <i className="bi bi-cash-stack fs-4 text-success"></i>
                      <span className={`p-1 rounded-circle ${paymentMethod === 'cash' ? 'bg-warning' : 'bg-secondary'}`} style={{ width: '10px', height: '10px' }}></span>
                    </div>
                    <div>
                      <strong className="d-block text-dark small">À la Réception</strong>
                      <small className="text-muted" style={{ fontSize: '0.72rem' }}>Terminal TPE ou Espèces</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Realistic Card Sub-Form */}
              {paymentMethod === 'card' && (
                <div className="p-3 bg-light rounded-3 border">
                  <div className="mb-2">
                    <label className="form-label text-muted text-uppercase fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                      Numéro de Carte de Crédit
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control font-monospace bg-white"
                        placeholder="•••• •••• •••• 4291"
                        defaultValue="•••• •••• •••• 4291"
                        readOnly
                      />
                      <span className="input-group-text bg-white text-muted fw-bold small">
                        VISA PREMIER
                      </span>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label text-muted text-uppercase fw-bold" style={{ fontSize: '0.68rem' }}>
                        Date d'Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control font-monospace bg-white"
                        defaultValue="08 / 27"
                        readOnly
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-muted text-uppercase fw-bold" style={{ fontSize: '0.68rem' }}>
                        Cryptogramme (CVC)
                      </label>
                      <input
                        type="password"
                        className="form-control font-monospace bg-white"
                        defaultValue="•••"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================
              Right Column (5 cols, sticky): Order Summary
              ============================================================ */}
          <div className="col-lg-5">
            <div className="order-summary-sticky">
              <div className="checkout-card mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-bag-check-fill text-warning fs-5"></i>
                    <h5 className="fw-bold mb-0 font-heading">Récapitulatif de Commande</h5>
                  </div>
                  <span className="badge bg-warning bg-opacity-25 text-warning-emphasis px-2.5 py-1 rounded-pill fw-bold">
                    {cartItems.length} met{cartItems.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Items List */}
                <div className="mb-3" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="order-item-row" id={`cart-item-${item.id}`}>
                      <div className="d-flex align-items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.nom}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '10px' }}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src =
                              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'
                          }}
                        />
                        <div>
                          <h6 className="fw-bold mb-0 small text-dark" style={{ lineHeight: '1.2' }}>{item.nom}</h6>
                          <span className="text-warning fw-bold small">{item.prix} DH</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center border rounded-2 bg-light p-1">
                          <button
                            type="button"
                            className="quantity-btn border-0"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                            }
                            aria-label="Diminuer la quantité"
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="fw-bold px-2 small">{item.quantity}</span>
                          <button
                            type="button"
                            className="quantity-btn border-0"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                            }
                            aria-label="Augmenter la quantité"
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-danger p-0 ms-1"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          aria-label={`Supprimer ${item.nom}`}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="pt-2 border-top">
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Sous-total des mets</span>
                    <strong className="text-dark">{cartTotal} DH</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small text-muted align-items-center">
                    <span>
                      Livraison express sécurisée{' '}
                      <i className="bi bi-question-circle" title="Livraison en caisson isotherme 65°C"></i>
                    </span>
                    {deliveryFee === 0 ? (
                      <span className="badge bg-success-subtle text-success border border-success fw-bold text-uppercase">
                        Offerte dès 150 DH
                      </span>
                    ) : (
                      <strong className="text-dark">{deliveryFee} DH</strong>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Éco-packaging isotherme recyclable</span>
                    <strong className="text-dark">{packagingFee} DH</strong>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between align-items-baseline mb-3">
                    <div>
                      <span className="fw-bold fs-5 text-dark font-heading">Total TTC</span>
                      <small className="d-block text-muted" style={{ fontSize: '0.72rem' }}>
                        TVA et service inclus
                      </small>
                    </div>
                    <span className="font-heading fw-bold fs-3 text-warning">
                      {finalTotal} DH
                    </span>
                  </div>
                </div>

                {/* Submit Primary CTA */}
                <button
                  type="submit"
                  className="btn btn-warning w-100 py-3 rounded-pill fw-bold text-dark fs-6 shadow-sm mb-3"
                  disabled={submissionStatus === 'pending'}
                  id="submit-order-btn"
                >
                  {submissionStatus === 'pending' ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      <span>Envoi en cuisine...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-shield-check me-2"></i>
                      <span>Confirmer la Commande ({finalTotal} DH)</span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="d-flex justify-content-center align-items-center gap-3 text-muted small" style={{ fontSize: '0.75rem' }}>
                  <span>
                    <i className="bi bi-shield-lock-fill text-success me-1"></i> Service sécurisé
                  </span>
                  <span>•</span>
                  <span>
                    <i className="bi bi-hand-thumbs-up-fill text-warning me-1"></i> Fraîcheur garantie
                  </span>
                </div>
              </div>

              {/* Suggestion Douceur du Terroir */}
              <div className="sommelier-card">
                <div className="p-2 rounded-3 fs-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: '#fef3c7', color: '#d97706' }}>
                  <i className="bi bi-cup-hot-fill"></i>
                </div>
                <div className="flex-grow-1">
                  <span className="badge bg-warning bg-opacity-25 text-warning-emphasis border small mb-1" style={{ fontSize: '0.65rem' }}>
                    DOUCEUR DU TERROIR
                  </span>
                  <h6 className="fw-bold mb-0 small text-dark">Thé Royal &amp; Cornes de Gazelle</h6>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>Parfait pour conclure votre repas (+35 DH)</small>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning text-dark rounded-circle"
                  style={{ width: '34px', height: '34px', padding: 0 }}
                  onClick={handleAddMoroccanDelight}
                  title="Ajouter au panier"
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
