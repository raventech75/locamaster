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

export const POST: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return json({ error: 'Non autorisé' }, 401);

  const API_KEY = getEnv('OUTSCRAPER_API_KEY');
  if (!API_KEY) return json({ error: 'OUTSCRAPER_API_KEY non configuré' }, 500);

  const body = await request.json();
  const { secteur, ville, max = 10 } = body;
  if (!secteur || !ville) return json({ error: 'secteur et ville requis' }, 400);

  const query = `${secteur} ${ville}`;

  const params = new URLSearchParams({
    query,
    limit: String(Math.min(max, 20)),
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

  // Outscraper returns data as array of arrays
  const places: Record<string, unknown>[] = (data.data || []).flat();

  // Normalize secteur label: "restaurateurs" → "restaurateur"
  const secteurNorm = secteur.toLowerCase().replace(/s$/, '').replace(/ies$/, 'ie').replace(/eurs$/, 'eur');

  const results = places.map((p) => {
    const emails: string[] = (p.emails_from_website as string[]) || [];
    const email = emails[0] || null;
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
      website: (p.site as string) || null,
      email,
      instagram: socials.instagram || null,
      facebook: socials.facebook || null,
      source: 'google-maps',
      secteur: secteurNorm,
    };
  }).filter(r => r.nom);

  return json({ results, query });
};

function extractVille(address: string, fallback: string): string {
  const parts = address.split(',').map(s => s.trim());
  const cityPart = parts.find(p => /\d{5}/.test(p));
  return cityPart || fallback;
}
