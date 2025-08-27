import { useState } from 'react'
import Head from 'next/head'

interface FormData {
  email: string
  properties: string
  phone: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    properties: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xeojwpbd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          properties: formData.properties,
          phone: formData.phone,
          _subject: '🚀 Nouvelle inscription LocaMaster'
        }),
      })

      if (response.ok) {
        window.location.href = '/merci'
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>LocaMaster - Maîtrisez votre gestion locative parisienne</title>
        <meta name="description" content="Automatisez votre gestion locative parisienne. Fini les Excel compliqués et les relances oubliées." />
        <meta property="og:title" content="LocaMaster - Gestion locative intelligente" />
        <meta property="og:description" content="La plateforme dédiée aux propriétaires parisiens" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              LocaMaster
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 font-medium">
              Maîtrisez votre gestion locative parisienne
            </p>
            
            <p className="text-lg mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Fini les Excel compliqués et les relances oubliées. LocaMaster automatise votre gestion locative pour vous faire gagner du temps et de l'argent.
            </p>

            {/* Formulaire d'inscription */}
            <div className="glass-effect rounded-2xl p-8 max-w-lg mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                🚀 Rejoignez la liste d'attente
              </h3>
              <p className="mb-6 opacity-90">
                Soyez parmi les premiers à tester LocaMaster gratuitement
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email professionnel"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 border-0 focus:ring-2 focus:ring-white"
                />
                
                <input
                  type="number"
                  name="properties"
                  placeholder="Combien de biens possédez-vous ?"
                  min="1"
                  required
                  value={formData.properties}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 border-0 focus:ring-2 focus:ring-white"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone (optionnel)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 border-0 focus:ring-2 focus:ring-white"
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-secondary py-4 rounded-lg font-semibold text-white hover:scale-105 transform transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Inscription en cours...' : 'Rejoindre la liste d\'attente'}
                </button>
              </form>

              <div className="flex justify-center items-center gap-6 mt-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>100% Sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Spécialisé Paris</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Lancement Q4 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Vous reconnaissez-vous ?
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { icon: '😫', text: 'Vous passez des heures sur Excel pour suivre vos loyers et charges' },
              { icon: '📧', text: 'Vous oubliez de relancer vos locataires en retard de paiement' },
              { icon: '📊', text: 'Impossible de calculer facilement votre rentabilité réelle' },
              { icon: '💸', text: 'Vous perdez de l\'argent avec des impayés et une mauvaise organisation' },
              { icon: '🏢', text: 'Les outils génériques ne comprennent pas le marché parisien' }
            ].map((problem, index) => (
              <div key={index} className="flex items-center gap-6 bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                <span className="text-2xl">{problem.icon}</span>
                <span className="text-lg text-gray-700">{problem.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            LocaMaster résout tout ça
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: '📊', title: 'Dashboard Intelligent', desc: 'Visualisez tous vos revenus locatifs en un coup d\'œil. Alertes automatiques pour les impayés.' },
              { icon: '🏠', title: 'Gestion Multi-Biens', desc: 'Centralisez tous vos appartements parisiens. Photos, documents, historique des travaux.' },
              { icon: '👥', title: 'Suivi Locataires', desc: 'Profils complets, relances automatiques par email/SMS, suivi des dépôts de garantie.' },
              { icon: '💰', title: 'Comptabilité Simplifiée', desc: 'Export automatique pour vos impôts. Calcul de rentabilité en temps réel.' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-12 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500">5h</div>
              <div className="text-gray-600">économisées par mois</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500">15%</div>
              <div className="text-gray-600">d'impayés en moins</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500">100%</div>
              <div className="text-gray-600">automatisé</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 gradient-secondary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tarifs Transparents
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Gratuit',
                subtitle: 'Pour commencer',
                features: ['1 bien maximum', 'Dashboard basique', 'Suivi des loyers', 'Support email'],
                popular: false
              },
              {
                name: 'Pro',
                price: '29€/mois',
                subtitle: 'Pour la plupart des propriétaires',
                features: ['Jusqu\'à 10 biens', 'Toutes les fonctionnalités', 'Relances automatiques', 'Export comptable', 'Support prioritaire'],
                popular: true
              },
              {
                name: 'Premium',
                price: '79€/mois',
                subtitle: 'Pour les gros portefeuilles',
                features: ['Biens illimités', 'Comptable partenaire', 'API personnalisée', 'Formation incluse', 'Support téléphonique'],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20 relative ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ POPULAIRE
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <p className="text-white/80 mb-6">{plan.subtitle}</p>
                
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-green-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">LocaMaster</h3>
            <p className="text-gray-300 mb-4">
              Créé par un entrepreneur parisien pour les propriétaires parisiens.
            </p>
            <p className="text-gray-400 mb-8">
              10 ans d'expérience IT + 10 ans dans l'immobilier parisien = la solution qu'il vous fallait.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 LocaMaster - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}