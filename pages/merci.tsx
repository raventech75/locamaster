// pages/merci.tsx
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Merci() {
  useEffect(() => {
    // Analytics tracking
    console.log('Waitlist conversion completed')
    
    // Confetti animation
    const createConfetti = () => {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div')
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4ade80']
        
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          left: ${Math.random() * 100}vw;
          top: -10px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          animation: fall ${Math.random() * 3 + 2}s linear forwards;
        `
        
        document.body.appendChild(confetti)
        setTimeout(() => confetti.remove(), 5000)
      }
    }
    
    // Add animation CSS
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `
    document.head.appendChild(style)
    
    // Launch confetti
    setTimeout(createConfetti, 500)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Merci ! Vous êtes sur la liste d'attente LocaMaster</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen gradient-primary flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-12 max-w-2xl mx-auto text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-pink-500"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl animate-bounce-slow">
            🎉
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Félicitations !
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Vous êtes maintenant inscrit sur la liste d'attente privilégiée de <strong>LocaMaster</strong>. 
            Vous serez parmi les premiers à tester la plateforme gratuitement.
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              📋 Ce qui se passe maintenant
            </h3>
            
            <div className="space-y-4 text-left max-w-md mx-auto">
              {[
                'Vous allez recevoir un email de confirmation dans les prochaines minutes',
                'Je vous tiendrai informé du développement via une newsletter mensuelle',
                'Lancement prévu Q4 2025 avec accès prioritaire gratuit 3 mois',
                'Vous pourrez tester toutes les fonctionnalités avant tout le monde'
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="text-3xl mb-3">🚀</div>
              <div className="font-semibold text-blue-900">Accès prioritaire</div>
              <div className="text-blue-700 text-sm">Testez avant tout le monde</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <div className="text-3xl mb-3">💰</div>
              <div className="font-semibold text-green-900">3 mois gratuits</div>
              <div className="text-green-700 text-sm">Économisez 87€</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <div className="text-3xl mb-3">🎯</div>
              <div className="font-semibold text-purple-900">Sur-mesure</div>
              <div className="text-purple-700 text-sm">Conçu pour Paris</div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-8">
            <h4 className="font-semibold text-orange-900 mb-3">💬 Une question ? Envie de discuter ?</h4>
            <p className="text-orange-800">
              N'hésitez pas à me contacter directement à <strong>contact@locamaster.fr</strong><br />
              En tant qu'entrepreneur parisien, j'adore échanger avec d'autres investisseurs !
            </p>
          </div>

          <div className="gradient-secondary p-6 rounded-xl text-white mb-8">
            <h3 className="font-semibold mb-3">🔥 Aidez-moi à faire connaître LocaMaster</h3>
            <p className="text-white/90 mb-4">
              Plus nous serons nombreux, plus je pourrai négocier de partenariats avantageux (banques, assurances, comptables...)
            </p>
            
            <div className="flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://locamaster.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>💼</span> LinkedIn
              </a>
              <a
                href="mailto:?subject=Découvre LocaMaster&body=Salut ! Je viens de découvrir LocaMaster, une plateforme pour gérer ses biens locatifs parisiens. Ça a l'air top : https://locamaster.fr"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>📧</span> Email
              </a>
            </div>
          </div>

          <Link href="/" className="inline-block text-primary-500 hover:text-primary-600 font-medium">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  )
}