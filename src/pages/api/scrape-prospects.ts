import type { APIRoute } from 'astro';

export const prerender = false;

const getEnv = (k: string) => process.env[k];

function checkToken(request: Request): boolean {
  const token = new URL(request.url).searchParams.get('token');
  const adminToken = getEnv('ADMIN_TOKEN');
  return !!adminToken && token === adminToken;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json' },
  });
}

const EMAIL_BLACKLIST = ['sentry', 'wixpress', 'example', 'domain', '@2x', 'noreply', 'no-reply', 'placeholder', 'schema', 'pixel', 'amazonaws', '.png', '.jpg', '.gif', 'support@wix'];

function isValidEmail(email: string): boolean {
  if (email.length > 80 || email.length < 6) return false;
  if (!email.includes('@') || !email.includes('.')) return false;
  if (EMAIL_BLACKLIST.some(b => email.includes(b))) return false;
  if (/\.(png|jpg|gif|svg|webp|css|js)$/i.test(email)) return false;
  return true;
}

function extractEmailFromHtml(html: string): string | null {
  const mailtoMatches = [...html.matchAll(/mailto:([^"'?>\s,;]+)/g)];
  for (const m of mailtoMatches) {
    const email = m[1].split('?')[0].toLowerCase().trim();
    if (isValidEmail(email)) return email;
  }
  const emailRe = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailRe) || [];
  for (const email of matches) {
    if (isValidEmail(email.toLowerCase())) return email.toLowerCase();
  }
  return null;
}

async function scrapeEmail(websiteUrl: string): Promise<string | null> {
  const urlsToTry = [websiteUrl];
  try {
    const base = new URL(websiteUrl).origin;
    if (!websiteUrl.includes('/contact')) {
      urlsToTry.push(base + '/contact', base + '/nous-contacter', base + '/a-propos');
    }
  } catch { /* invalid url */ }

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(3500),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
        },
      });
      if (!res.ok) continue;
      const html = await res.text();
      const email = extractEmailFromHtml(html);
      if (email) return email;
    } catch { /* timeout */ }
  }
  return null;
}

async function fetchFromOutscraper(query: string, limit: number, apiKey: string): Promise<Record<string, unknown>[]> {
  const params = new URLSearchParams({
    query,
    limit: String(limit),
    language: 'fr',
    region: 'FR',
    fields: 'name,full_address,phone,site,emails_from_website,social_networks,rating,reviews',
    async: 'false',
  });
  const res = await fetch(`https://api.app.outscraper.com/maps/search-v3?${params}`, {
    headers: { 'X-API-KEY': apiKey },
  });
  if (!res.ok) throw new Error(`Outscraper: ${await res.text()}`);
  const data = await res.json();
  return (data.data || []).flat();
}

export const POST: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return json({ error: 'Non autorisé' }, 401);

  const API_KEY = getEnv('OUTSCRAPER_API_KEY');
  if (!API_KEY) return json({ error: 'OUTSCRAPER_API_KEY non configuré' }, 500);

  const body = await request.json();
  const { secteur, ville, codePostal, max = 20 } = body;
  if (!secteur || !ville) return json({ error: 'secteur et ville requis' }, 400);

  const secteurNorm = secteur.toLowerCase()
    .replace(/s$/, '').replace(/ies$/, 'ie').replace(/eurs$/, 'eur');

  // Inclure le code postal dans la requête pour limiter le rayon géographique
  const locationQuery = codePostal ? `${ville} ${codePostal}` : ville;
  const seen = new Set<string>();
  let places: Record<string, unknown>[] = [];

  try {
    // Première requête avec code postal si dispo
    const batch1 = await fetchFromOutscraper(`${secteur} ${locationQuery}`, 20, API_KEY);
    for (const p of batch1) {
      const key = (p.name as string) + (p.phone as string || '');
      if (!seen.has(key)) { seen.add(key); places.push(p); }
    }

    // Si on veut plus de résultats, requêtes supplémentaires
    if (max > 20 && places.length < max) {
      const batch2 = await fetchFromOutscraper(`${secteur} ${ville}`, 20, API_KEY);
      for (const p of batch2) {
        const key = (p.name as string) + (p.phone as string || '');
        if (!seen.has(key)) { seen.add(key); places.push(p); }
      }
    }
  } catch (e: unknown) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }

  // Filtre géographique sur l'adresse réelle retournée par Outscraper
  const villeWords = ville.toLowerCase().split(/[\s\-]+/).filter((w: string) => w.length > 2);
  const cpFilter = codePostal ? codePostal.toString() : null;

  places = places.filter(p => {
    const addr = ((p.full_address as string) || '').toLowerCase();
    if (!addr) return true; // pas d'adresse = on garde
    const cpMatch = cpFilter ? addr.includes(cpFilter) : true;
    const villeMatch = villeWords.some((w: string) => addr.includes(w));
    return cpMatch || villeMatch;
  }).slice(0, max);

  // Enrichir avec emails en parallèle
  const results = await Promise.all(
    places.map(async (p) => {
      const outscrapeEmails: string[] = (p.emails_from_website as string[]) || [];
      const websiteUrl = (p.site as string) || null;
      let email = outscrapeEmails.find(e => isValidEmail(e.toLowerCase())) || null;
      if (!email && websiteUrl) email = await scrapeEmail(websiteUrl);

      const socials = (p.social_networks as Record<string, string>) || {};
      const phone = (p.phone as string) || null;
      const phoneWa = phone
        ? '33' + phone.replace(/[\s\-\.]/g, '').replace(/^\+33/, '').replace(/^0/, '')
        : null;

      const rating = (p.rating as number) || null;
      const reviews = (p.reviews as number) || 0;
      // Score 1-5 : bon prospect = établissement sérieux (note haute) + gaps visuels (pas de site/email)
      const score = Math.min(5, Math.max(1,
        (rating && rating >= 4.0 ? 2 : rating && rating >= 3.5 ? 1 : 0) + // bonne note = budget + sérieux
        (!websiteUrl ? 2 : 0) +  // pas de site = gap à combler
        (!email ? 1 : 0) +       // pas d'email = contenu digital manquant
        (reviews >= 20 ? 1 : 0)  // assez d'avis = établissement actif
      ));
      return {
        nom: (p.name as string) || '',
        entreprise: (p.name as string) || '',
        telephone: phone,
        telephone_wa: phoneWa,
        ville: extractVille((p.full_address as string) || '', ville),
        website: websiteUrl,
        email,
        instagram: socials.instagram || null,
        facebook: socials.facebook || null,
        source: 'google-maps',
        secteur: secteurNorm,
        note_google: rating,
        reviews,
        score,
      };
    })
  );

  return json({ results: results.filter(r => r.nom), query: `${secteur} ${ville}` });
};

function extractVille(address: string, fallback: string): string {
  if (!address) return fallback;
  const parts = address.split(',').map(s => s.trim());
  // Format FR : "Rue X, 93230 Romainville, France" → "93230 Romainville"
  for (const part of parts) {
    const m = part.match(/^\d{5}\s+(.+)$/);
    if (m) return m[1]; // retourne "Romainville", "Paris", etc.
  }
  // Fallback : avant-dernier élément (avant "France")
  const filtered = parts.filter(p => p && p.toLowerCase() !== 'france');
  return filtered[filtered.length - 1] || fallback;
}
