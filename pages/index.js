// pages/index.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Modal from '../components/Modal'
import ContactForm from '../components/ContactForm'


export default function Home() {
  const [isVisible, setIsVisible] = useState({})
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null // 'demo' | 'contact' | 'waitlist'
  })

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }))
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openModal = (type) => {
    setModalState({ isOpen: true, type })
  }

  const closeModal = () => {
    setModalState({ isOpen: false, type: null })
  }

  return (
    <>
      <Head>
        <title>LocaMaster DJ - Maîtrisez votre business DJ de A à Z</title>
        <meta name="description" content="La solution tout-en-un pour professionnaliser votre business DJ : devis, planning, playlists collaboratives, facturation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-black text-white overflow-x-hidden">
        {/* Header */}
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">🎧</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LocaMaster DJ
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fonctionnalités
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tarifs
                </button>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition-colors"
                >
                  Démo
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black to-pink-600/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-600/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-pink-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-600/40 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                🚀 La solution 100% DJ arrive enfin !
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Arrête de <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">perdre des clients</span><br/>
              parce que tu es <span className="text-red-400">désorganisé</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              En tant que DJ, tu maîtrises tes sets... mais ton business ? 
              <strong className="text-white"> LocaMaster</strong> centralise tout : devis, planning, playlists clients, facturation.
            </p>
            
            <div className="text-base sm:text-lg md:text-xl text-pink-600 mb-8 font-medium">
              ⚡ Concentre-toi sur la musique, on s'occupe du reste.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={() => openModal('demo')}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-600/30"
              >
                🎧 Démo Gratuite - 2 min
              </button>
              <button 
                onClick={() => openModal('waitlist')}
                className="w-full sm:w-auto border-2 border-purple-600 hover:bg-purple-600/10 px-8 py-4 rounded-full text-lg font-medium transition-colors"
              >
                🚀 Rejoindre la Waitlist
              </button>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-400 space-y-1 sm:space-y-0">
              <div>✅ Gratuit pour ton premier événement</div>
              <div className="hidden sm:inline"> • </div>
              <div>✅ Setup en 5 minutes</div>
              <div className="hidden sm:inline"> • </div>
              <div>✅ Support DJ expert</div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section 
          id="problems"
          className={`py-20 bg-gradient-to-b from-black to-gray-900 transition-all duration-1000 ${
            isVisible.problems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Tu reconnais ces <span className="text-red-400">galères</span> ? 😤
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">Ces problèmes qui te font perdre du temps... et des clients</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-4 text-red-400">Devis & Contrats Chaos</h3>
                <p className="text-gray-300">Tes devis sont éparpillés dans Word, WhatsApp, emails... Tu perds du temps à tout refaire à chaque fois et parfois tu oublies des détails importants.</p>
              </div>
              
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-bold mb-4 text-red-400">Planning Désorganisé</h3>
                <p className="text-gray-300">Pas de vision claire sur tes événements, les relances clients faites à la main, tu stress avant chaque date parce que tu n'es pas sûr d'avoir tout préparé.</p>
              </div>
              
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-4 text-red-400">Playlists Last Minute</h3>
                <p className="text-gray-300">"Tu peux jouer ma chanson ?" à 2h du matin... Les clients t'envoient leurs demandes par SMS pendant l'événement et tu dois tout gérer en live.</p>
              </div>
              
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-4 text-red-400">Facturation Galère</h3>
                <p className="text-gray-300">Calculer le matériel, les déplacements, les heures sup... Tu passes plus de temps sur Excel que sur tes platines !</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-red-400">Résultat ?</h3>
                <p className="text-lg text-gray-300">Tu passes 40% de ton temps sur l'administratif au lieu de développer ton art et tes performances. Certains clients partent vers des DJs plus "pro" en apparence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section 
          id="features" 
          className={`py-20 bg-gradient-to-b from-gray-900 to-black transition-all duration-1000 ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">LocaMaster DJ</span> : Ta solution tout-en-un
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">4 modules pour professionnaliser ton business DJ</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 p-8 rounded-2xl border border-purple-600/30 hover:border-purple-600/50 transition-all transform hover:scale-105">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">Gestion Événements</h3>
                <p className="text-gray-300 mb-4">CRM spécialement conçu pour les DJs. Toutes tes infos clients, dates, lieux, besoins spéciaux dans un seul endroit.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Timeline automatique</li>
                  <li>✅ Relances intelligentes</li>
                  <li>✅ Notes et historique client</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-pink-600/10 to-blue-600/10 p-8 rounded-2xl border border-pink-600/30 hover:border-pink-600/50 transition-all transform hover:scale-105">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-bold mb-4 text-pink-400">Devis & Contrats Pro</h3>
                <p className="text-gray-300 mb-4">Templates pré-remplis, signatures électroniques, tout automatisé. Fini les allers-retours par email !</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Templates personnalisables</li>
                  <li>✅ Signature électronique</li>
                  <li>✅ Suivi des statuts</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-8 rounded-2xl border border-blue-600/30 hover:border-blue-600/50 transition-all transform hover:scale-105">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Playlist Collaborative</h3>
                <p className="text-gray-300 mb-4">Tes clients ajoutent leurs souhaits musicaux en temps réel via un lien. Plus de surprises le jour J !</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Lien partageable</li>
                  <li>✅ Votes et priorités</li>
                  <li>✅ Intégration Spotify/Deezer</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 p-8 rounded-2xl border border-purple-600/30 hover:border-purple-600/50 transition-all transform hover:scale-105">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">Facturation Intelligente</h3>
                <p className="text-gray-300 mb-4">Auto-calcul matériel + déplacement + prestation. Exports comptables automatiques.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Calculs automatiques</li>
                  <li>✅ Paiements en ligne</li>
                  <li>✅ Exports comptables</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section 
          id="pricing" 
          className={`py-20 bg-gradient-to-b from-black to-gray-900 transition-all duration-1000 ${
            isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Tarifs <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">transparents</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">Choisis ton plan selon ton volume d'événements</p>
            </div>
            
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Starter Plan */}
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Gratuit</div>
                  <p className="text-gray-400">Pour tester et débuter</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> 1 événement par mois</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Gestion basique</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Devis simples</li>
                  <li className="flex items-center text-gray-500"><span className="text-gray-500 mr-3">✗</span> Playlist collaborative</li>
                  <li className="flex items-center text-gray-500"><span className="text-gray-500 mr-3">✗</span> App mobile client</li>
                </ul>
                
                <button className="w-full border-2 border-gray-600 hover:border-purple-600 py-3 rounded-full transition-colors">
                  Commencer Gratuitement
                </button>
              </div>
              
              {/* Pro Plan (Featured) */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6 sm:p-8 rounded-2xl border-2 border-purple-600 relative lg:transform lg:scale-105">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Le Plus Populaire
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">39€<span className="text-lg text-gray-400">/mois</span></div>
                  <p className="text-gray-400">Pour DJs actifs</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Événements illimités</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Toutes les fonctionnalités</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Playlist collaborative</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Devis & contrats pro</li>
                  <li className="flex items-center text-gray-500"><span className="text-gray-500 mr-3">✗</span> App mobile client</li>
                </ul>
                
                <button 
                  onClick={() => openModal('demo')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-full font-bold transition-colors"
                >
                  Essai Gratuit 14 Jours
                </button>
              </div>
              
              {/* Master Plan */}
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Master</h3>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">79€<span className="text-lg text-gray-400">/mois</span></div>
                  <p className="text-gray-400">Pour pros établis</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Tout du plan Pro</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Comptabilité avancée</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> App mobile client</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Support prioritaire</li>
                  <li className="flex items-center"><span className="text-green-400 mr-3">✓</span> Analytics avancés</li>
                </ul>
                
                <button 
                  onClick={() => openModal('demo')}
                  className="w-full border-2 border-purple-600 hover:bg-purple-600/10 py-3 rounded-full transition-colors"
                >
                  Essai Gratuit 14 Jours
                </button>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">💡 Calcul rapide : Si tu fais 2 événements/mois à 800€, LocaMaster Pro te coûte 2,4% de ton CA</p>
              <p className="text-sm text-gray-500">Pas d'engagement • Annulation en 1 clic • Support 7j/7</p>
            </div>
          </div>
        </section>

        {/* Demo CTA Section */}
        <section 
          id="demo" 
          className={`py-20 bg-gradient-to-br from-purple-600/20 via-black to-pink-600/20 transition-all duration-1000 ${
            isVisible.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Prêt à <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">professionnaliser</span><br/>
              ton business DJ ? 🎯
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Rejoins les DJs qui ont déjà transformé leur façon de travailler
            </p>
            
            <div className="bg-black/50 p-6 sm:p-8 rounded-2xl border border-purple-600/30 mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-pink-400">🚀 Setup express en 5 minutes :</h3>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="bg-purple-600/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs font-bold">1</span>
                  Crée ton compte
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="bg-purple-600/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs font-bold">2</span>
                  Import tes événements
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="bg-purple-600/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-xs font-bold">3</span>
                  Première playlist !
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => openModal('demo')}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-600/30"
              >
                🎧 Démo Gratuite Maintenant
              </button>
              <button 
                onClick={() => openModal('contact')}
                className="w-full sm:w-auto border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full text-lg font-medium transition-colors"
              >
                📞 Nous Contacter
              </button>
            </div>
            
            <div className="mt-8 text-xs sm:text-sm text-gray-400 space-y-1">
              <p>✅ Démo personnalisée avec tes vrais événements</p>
              <p>✅ Questions/réponses avec un DJ utilisateur</p>
              <p>✅ Setup gratuit si tu adhères</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🎧</span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">LocaMaster DJ</span>
                </div>
                <p className="text-gray-400 text-sm">La solution business pensée par et pour les DJs professionnels.</p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Produit</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Fonctionnalités</button></li>
                  <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Tarifs</button></li>
                  <li><button onClick={() => scrollToSection('demo')} className="hover:text-white transition-colors">Démo</button></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Ressources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Blog DJ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Guides Business</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Templates Contrats</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                  <li><a href="mailto:support@locamaster-dj.com" className="hover:text-white transition-colors">support@locamaster-dj.com</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 LocaMaster DJ. Fait avec ❤️ par un DJ pour les DJs.</p>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <Modal isOpen={modalState.isOpen} onClose={closeModal}>
          <ContactForm type={modalState.type} onClose={closeModal} />
        </Modal>
      </div>
    </>
  )
}