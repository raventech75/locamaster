import { useState } from 'react'

export default function ContactForm({ type = 'contact', onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    djType: '',
    eventsPerMonth: '',
    message: '',
    preferredContactTime: ''
  })
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      // Préparer les données pour Formspree
      const formspreeData = {
        // Champs principaux
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Non fourni',
        djType: formData.djType,
        eventsPerMonth: formData.eventsPerMonth || 'Non spécifié',
        message: formData.message,
        preferredContactTime: formData.preferredContactTime || 'Pas de préférence',
        
        // Métadonnées
        type: type,
        timestamp: new Date().toLocaleString('fr-FR'),
        _subject: `🎧 LocaMaster DJ - ${type === 'demo' ? 'Demande démo' : type === 'waitlist' ? 'Waitlist' : 'Contact'} - ${formData.name}`,
        
        // Message formaté pour l'email
        _template: 'box',
        _format: 'plain'
      }

      const response = await fetch('https://formspree.io/f/mvgboddq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formspreeData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'envoi')
      }

      setStatus({ loading: false, success: true, error: null })
      
      // Reset form après succès
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          djType: '',
          eventsPerMonth: '',
          message: '',
          preferredContactTime: ''
        })
        setStatus({ loading: false, success: false, error: null })
        if (onClose) onClose()
      }, 3000)

    } catch (error) {
      console.error('Erreur soumission:', error)
      setStatus({ 
        loading: false, 
        success: false, 
        error: 'Erreur lors de l\'envoi. Veuillez réessayer.' 
      })
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'demo': return '🎧 Réserver ta démo gratuite'
      case 'contact': return '📞 Nous contacter'
      case 'waitlist': return '🚀 Rejoindre la waitlist'
      default: return 'Contact'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'demo': return 'Démo personnalisée avec tes vrais événements en 15 minutes'
      case 'contact': return 'Une question ? Un besoin spécifique ? Parlons-en !'
      case 'waitlist': return 'Sois averti en premier du lancement officiel'
      default: return ''
    }
  }

  if (status.success) {
    return (
      <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-8 rounded-2xl border border-green-500/30 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-4 text-green-400">
          {type === 'demo' ? 'Démo réservée !' : 
           type === 'waitlist' ? 'Tu es sur la liste !' : 
           'Message envoyé !'}
        </h3>
        <p className="text-gray-300 mb-4">
          {type === 'demo' ? 'On te contacte dans les 24h pour programmer ta démo personnalisée.' :
           type === 'waitlist' ? 'Tu seras averti en priorité du lancement de LocaMaster DJ.' :
           'Nous te répondrons rapidement !'}
        </p>
        <div className="text-sm text-gray-400">
          Cette fenêtre se ferme automatiquement...
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/95 p-8 rounded-2xl border border-purple-500/30 max-w-md w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{getTitle()}</h3>
        <p className="text-gray-400">{getDescription()}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Nom / Nom de scène *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="DJ TonNom"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="ton@email.com"
          />
        </div>

        {/* Téléphone (pour démo) */}
        {type === 'demo' && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="06 12 34 56 78"
            />
          </div>
        )}

        {/* Type de DJ */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Type d'événements *
          </label>
          <select
            name="djType"
            value={formData.djType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="">Sélectionne...</option>
            <option value="mariage">Mariages</option>
            <option value="anniversaire">Anniversaires</option>
            <option value="entreprise">Événements entreprise</option>
            <option value="club">Club/Boîte de nuit</option>
            <option value="festival">Festivals</option>
            <option value="mixte">Mix de tout</option>
          </select>
        </div>

        {/* Événements par mois */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Événements par mois
          </label>
          <select
            name="eventsPerMonth"
            value={formData.eventsPerMonth}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="">Optionnel...</option>
            <option value="1-2">1-2 événements</option>
            <option value="3-5">3-5 événements</option>
            <option value="6-10">6-10 événements</option>
            <option value="10+">Plus de 10</option>
          </select>
        </div>

        {/* Heure de contact préférée (pour démo) */}
        {type === 'demo' && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Meilleur moment pour t'appeler
            </label>
            <select
              name="preferredContactTime"
              value={formData.preferredContactTime}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="">Pas de préférence</option>
              <option value="morning">Matin (9h-12h)</option>
              <option value="afternoon">Après-midi (14h-18h)</option>
              <option value="evening">Soir (18h-21h)</option>
            </select>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {type === 'demo' ? 'Tes principales galères actuelles ?' : 'Message'}
            {type !== 'waitlist' && ' *'}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required={type !== 'waitlist'}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
            placeholder={
              type === 'demo' 
                ? "Ex: Devis désorganisés, planning chaotique, clients qui changent la playlist..."
                : type === 'waitlist'
                ? "Optionnel : dis-nous ce qui t'intéresse le plus..."
                : "Ton message..."
            }
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
        >
          {status.loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi...
            </>
          ) : (
            <>
              {type === 'demo' ? '🎧 Réserver ma démo' :
               type === 'waitlist' ? '🚀 Rejoindre la liste' :
               '📤 Envoyer'}
            </>
          )}
        </button>

        {/* Error Message */}
        {status.error && (
          <div className="bg-red-900/50 border border-red-500/30 p-4 rounded-lg">
            <p className="text-red-400 text-sm">{status.error}</p>
          </div>
        )}

        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors"
          >
            Fermer
          </button>
        )}
      </form>
    </div>
  )
}