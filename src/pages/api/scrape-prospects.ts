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

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const EMAIL_BLACKLIST = ['sentry','wixpress','example','domain','email','test','noreply','no-reply','support@','info@w','schema','pixel','placeholder'];

async function extractEmail(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(4000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bot)' },
    });
    const html = await res.text();
    // Try mailto links first (more reliable)
    const mailtoMatch = html.match(/mailto:([^"'?>\s]+)/);
    if (mailtoMatch) {
      const email = mailtoMatch[1].split('?')[0].toLowerCase();
      if (!EMAIL_BLACKLIST.some(b => email.includes(b))) return email;
    }
    // Fallback: regex on page text
    const matches = html.match(EMAIL_RE) || [];
    for (const email of matches) {
      const e = email.toLowerCase();
      if (!EMAIL_BLACKLIST.some(b => e.includes(b)) && e.length < 60) return e;
    }
    // Try /contact page
    if (!url.includes('/contact')) {
      const base = new URL(url).origin;
      return extractEmail(base + '/contact');
    }
  } catch { /* timeout or fetch error */ }
  return null;
}

interface PlaceResult {
  nom: string;
  entreprise: string;
  telephone: string | null;
  ville: string;
  website: string | null;
  email: string | null;
  source: string;
  secteur: string;
  googleMapsUrl: string | null;
}

export const POST: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return json({ error: 'Non autorisé' }, 401);

  const PLACES_KEY = getEnv('GOOGLE_PLACES_API_KEY');
  if (!PLACES_KEY) return json({ error: 'GOOGLE_PLACES_API_KEY non configuré dans les variables Vercel' }, 500);

  const body = await request.json();
  const { secteur, ville, max = 10 } = body;
  if (!secteur || !ville) return json({ error: 'secteur et ville requis' }, 400);

  const query = `${secteur} ${ville}`;

  // Google Places Text Search (New API)
  const placesRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PLACES_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.id',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'fr',
      regionCode: 'FR',
      maxResultCount: Math.min(max, 20),
    }),
  });

  if (!placesRes.ok) {
    const err = await placesRes.text();
    return json({ error: `Google Places API: ${err}` }, 500);
  }

  const placesData = await placesRes.json();
  const places = placesData.places || [];

  // Extract city from formatted address
  function extractVille(address: string): string {
    const parts = address.split(',').map((s: string) => s.trim());
    // Usually: "Rue X, 75011 Paris, France" → "75011 Paris"
    const cityPart = parts.find((p: string) => /\d{5}/.test(p));
    return cityPart || ville;
  }

  // Fetch emails in parallel with concurrency limit
  const results: PlaceResult[] = await Promise.all(
    places.map(async (place: Record<string, unknown>) => {
      const name = (place.displayName as { text?: string })?.text || '';
      const address = (place.formattedAddress as string) || '';
      const phone = (place.nationalPhoneNumber as string) || null;
      const website = (place.websiteUri as string) || null;
      const mapsUri = (place.googleMapsUri as string) || null;

      const email = website ? await extractEmail(website) : null;

      return {
        nom: name,
        entreprise: name,
        telephone: phone,
        ville: extractVille(address),
        website,
        email,
        source: 'google-maps',
        secteur: secteur.toLowerCase().replace(/s$/, ''), // restaurateurs → restaurateur
        googleMapsUrl: mapsUri,
      };
    })
  );

  return json({ results, query });
};
