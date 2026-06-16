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

// Mots-clés par secteur pour filtrer les résultats hors-sujet
const SECTEUR_KEYWORDS: Record<string, string[]> = {
  photographe: ['photo', 'photographe', 'studio', 'image', 'visual', 'picture', 'pic', 'film', 'vidéo', 'video', 'clic', 'clac', 'objectif', 'lens'],
  restaurateur: ['restaurant', 'brasserie', 'bistro', 'bistrot', 'café', 'cafe', 'cantine', 'traiteur', 'cuisine', 'gastronomie', 'pizzeria', 'burger', 'sushi', 'bouchon'],
  fleuriste: ['fleur', 'floral', 'atelier', 'bouquet', 'jardin', 'vegetal', 'végétal', 'rose', 'bloom'],
  coiffeur: ['coiffure', 'coiffeur', 'salon', 'hair', 'barbier', 'barber', 'beauty', 'beauté', 'tif'],
  boulangerie: ['boulange', 'boulangerie', 'pain', 'patisserie', 'pâtisserie', 'four', 'levain', 'viennoiserie'],
  antiquaire: ['antiquit', 'brocante', 'vintage', 'galerie', 'antique', 'occasion', 'collection'],
  librairie: ['librair', 'livre', 'book', 'bouquin', 'lecture'],
  architecte: ['architecte', 'architecture', 'cabinet', 'bureau', 'design', 'urbanisme'],
};

function isRelevant(name: string, address: string, secteur: string, ville: string): boolean {
  const nameLow = name.toLowerCase();
  const addrLow = address.toLowerCase();
  const villeLow = ville.toLowerCase().split(' ')[0]; // "romainville" from "romainville 93230"

  // Filtre géographique : l'adresse doit contenir la ville ou le code postal
  const villeKeywords = villeLow.split(/\s+/).filter(w => w.length > 3);
  const cityMatch = villeKeywords.some(kw => addrLow.includes(kw));

  // Filtre sectoriel : le nom doit contenir un mot-clé du secteur (optionnel, warn seulement)
  const sectorKey = Object.keys(SECTEUR_KEYWORDS).find(k => secteur.toLowerCase().includes(k));
  const keywords = sectorKey ? SECTEUR_KEYWORDS[sectorKey] : [];
  const sectorMatch = keywords.length === 0 || keywords.some(kw => nameLow.includes(kw));

  // On garde si la ville correspond ET (secteur correspond ou pas de filtre secteur)
  // Si la ville ne correspond pas du tout → on rejette
  return cityMatch && (sectorMatch || keywords.length === 0);
}

const EMAIL_BLACKLIST = ['sentry', 'wixpress', 'example', 'domain', '@2x', 'noreply', 'no-reply', 'placeholder', 'schema', 'pixel', 'amazonaws', '.png', '.jpg', '.gif', 'support@wix'];

function extractEmailFromHtml(html: string): string | null {
  // 1. mailto: links (most reliable)
  const mailtoMatches = [...html.matchAll(/mailto:([^"'?>\s,;]+)/g)];
  for (const m of mailtoMatches) {
    const email = m[1].split('?')[0].toLowerCase().trim();
    if (isValidEmail(email)) return email;
  }

  // 2. data-email / data-cfemail attributes (Cloudflare obfuscation → skip, too complex)
  // 3. Regex on visible text
  const emailRe = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailRe) || [];
  for (const email of matches) {
    if (isValidEmail(email.toLowerCase())) return email.toLowerCase();
  }
  return null;
}

function isValidEmail(email: string): boolean {
  if (email.length > 80 || email.length < 6) return false;
  if (!email.includes('@') || !email.includes('.')) return false;
  if (EMAIL_BLACKLIST.some(b => email.includes(b))) return false;
  if (/\.(png|jpg|gif|svg|webp|css|js)$/i.test(email)) return false;
  return true;
}

async function scrapeEmail(websiteUrl: string): Promise<string | null> {
  const urlsToTry = [websiteUrl];
  try {
    const base = new URL(websiteUrl).origin;
    if (!websiteUrl.includes('/contact')) urlsToTry.push(base + '/contact', base + '/contact-us', base + '/nous-contacter', base + '/a-propos');
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
    } catch { /* timeout or fetch error */ }
  }
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return json({ error: 'Non autorisé' }, 401);

  const API_KEY = getEnv('OUTSCRAPER_API_KEY');
  if (!API_KEY) return json({ error: 'OUTSCRAPER_API_KEY non configuré' }, 500);

  const body = await request.json();
  const { secteur, ville, max = 10 } = body;
  if (!secteur || !ville) return json({ error: 'secteur et ville requis' }, 400);

  // Demander plus de résultats pour compenser le filtre
  const fetchLimit = Math.min(Math.max(max * 2, 20), 20);
  const query = `${secteur} ${ville}`;

  const params = new URLSearchParams({
    query,
    limit: String(fetchLimit),
    language: 'fr',
    region: 'FR',
    fields: 'name,full_address,phone,site,emails_from_website,social_networks,place_id',
    async: 'false',
  });

  const res = await fetch(`https://api.app.outscraper.com/maps/search-v3?${params}`, {
    headers: { 'X-API-KEY': API_KEY },
  });

  if (!res.ok) {
    const err = await res.text();
    return json({ error: `Outscraper: ${err}` }, 500);
  }

  const data = await res.json();
  const places: Record<string, unknown>[] = (data.data || []).flat();

  const secteurNorm = secteur.toLowerCase()
    .replace(/s$/, '')
    .replace(/ies$/, 'ie')
    .replace(/eurs$/, 'eur');

  // Filtrer et enrichir en parallèle
  const filtered = places.filter(p => {
    const name = (p.name as string) || '';
    const address = (p.full_address as string) || '';
    return name && isRelevant(name, address, secteur, ville);
  }).slice(0, max);

  const results = await Promise.all(
    filtered.map(async (p) => {
      const outscrapeEmails: string[] = (p.emails_from_website as string[]) || [];
      const websiteUrl = (p.site as string) || null;

      // Utiliser l'email Outscraper si dispo, sinon scraper nous-mêmes
      let email = outscrapeEmails.find(e => isValidEmail(e.toLowerCase())) || null;
      if (!email && websiteUrl) {
        email = await scrapeEmail(websiteUrl);
      }

      const socials = (p.social_networks as Record<string, string>) || {};
      const phone = (p.phone as string) || null;
      const phoneWa = phone
        ? '33' + phone.replace(/[\s\-\.]/g, '').replace(/^\+33/, '').replace(/^0/, '')
        : null;

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
      };
    })
  );

  return json({ results: results.filter(r => r.nom), query });
};

function extractVille(address: string, fallback: string): string {
  const parts = address.split(',').map(s => s.trim());
  const cityPart = parts.find(p => /\d{5}/.test(p));
  return cityPart || fallback;
}
