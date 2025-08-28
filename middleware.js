// middleware.js
import { NextResponse } from 'next/server'

// Rate limiting simple en mémoire
const rateLimitStore = new Map()

function checkRateLimit(ip, windowMs = 15 * 60 * 1000, maxRequests = 10) {
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, [])
  }
  
  const requests = rateLimitStore.get(ip)
  
  // Supprimer les requêtes expirées
  const validRequests = requests.filter(timestamp => timestamp > windowStart)
  
  // Vérifier la limite
  if (validRequests.length >= maxRequests) {
    return false // Rate limit dépassé
  }
  
  // Ajouter la nouvelle requête
  validRequests.push(now)
  rateLimitStore.set(ip, validRequests)
  
  return true // OK
}

export function middleware(request) {
  // Rate limiting pour les API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limit: 10 requêtes par 15 minutes pour les APIs de contact
    if (request.nextUrl.pathname.match(/\/api\/(demo|contact|waitlist)/)) {
      const isAllowed = checkRateLimit(ip, 15 * 60 * 1000, 10)
      
      if (!isAllowed) {
        return NextResponse.json(
          { 
            error: 'Trop de requêtes. Réessaie dans 15 minutes.' 
          },
          { status: 429 }
        )
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}