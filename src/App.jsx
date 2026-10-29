import React from 'react'
// [D. Routage React Router] : Hna kan-importiw les composants dyal navigation f React Router v7
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import PlatDetail from './pages/PlatDetail'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import NotFound from './pages/NotFound'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    // BrowserRouter: Hada houwa l-wrapper principal li ki-f3el l-routing f l'application kamla
    <BrowserRouter>
      {/* ScrollToTop: Reviens automatiquement en haut de la page à chaque changement d'URL */}
      <ScrollToTop />

      {/* Navbar dima bayna l-fo9 f ga3 les pages */}
      <Navbar />

      <main>
        {/* Routes: Ki-comparer l-URL li f l-browser m3a les Route li 3ndna l-dakhel */}
        <Routes>
          {/* Route 1: Page d'accueil principale */}
          <Route path="/" element={<Home />} />

          {/* Route 2: Page dyal liste des plats (La Carte & Menu) */}
          <Route path="/menu" element={<Menu />} />

          {/* Route 3: Route dynamique b paramètre :id (ex: /plats/1) bash n-récupériwh b useParams() */}
          <Route path="/plats/:id" element={<PlatDetail />} />

          {/* Route 4: Page Panier & Formulaire de validation de commande */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Route 5: Historique dyal les commandes et suivi du statut */}
          <Route path="/commandes" element={<OrderHistory />} />

          {/* Route 6: Page d'authentification (Login & Register) */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Route 404: Wildcard (*) kat-declencha ila user dkhl chi lien ma-kaynch f l-app */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer dima bayn l-teht f ga3 les pages */}
      <Footer />
    </BrowserRouter>
  )
}

export default App

