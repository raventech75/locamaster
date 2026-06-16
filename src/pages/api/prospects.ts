import type { APIRoute } from 'astro';

export const prerender = false;

const getEnv = (k: string): string | undefined => process.env[k];

function unauthorized() {
  return json({ error: 'Non autorisé' }, 401);
}

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

function sbHeaders() {
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY')!;
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };
}

function sbUrl(path: string) {
  return `${getEnv('PUBLIC_SUPABASE_URL')}/rest/v1/${path}`;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!checkToken(request)) return unauthorized();
    const url = new URL(request.url);
    const statut = url.searchParams.get('statut');
    const secteur = url.searchParams.get('secteur');

    const params = new URLSearchParams({ select: '*', order: 'created_at.desc' });
    if (statut && statut !== 'tous') params.append('statut', `eq.${statut}`);
    if (secteur && secteur !== 'tous') params.append('secteur', `eq.${secteur}`);

    const res = await fetch(`${sbUrl('prospects')}?${params}`, { headers: sbHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(`Supabase: ${JSON.stringify(data)}`);
    return json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[prospects GET]', msg);
    return json({ error: msg }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!checkToken(request)) return unauthorized();
    const body = await request.json();
    if (!body.nom?.trim()) return json({ error: 'Nom requis' }, 400);

    const payload = {
      nom: body.nom.trim(),
      entreprise: body.entreprise?.trim() || null,
      secteur: body.secteur || null,
      email: body.email?.trim().toLowerCase() || null,
      telephone: body.telephone?.trim() || null,
      ville: body.ville?.trim() || null,
      statut: body.statut || 'nouveau',
      notes: body.notes?.trim() || null,
      source: body.source || 'manuel',
    };

    const res = await fetch(sbUrl('prospects'), {
      method: 'POST',
      headers: sbHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Supabase: ${JSON.stringify(data)}`);
    return json(Array.isArray(data) ? data[0] : data, 201);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[prospects POST]', msg);
    return json({ error: msg }, 500);
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    if (!checkToken(request)) return unauthorized();
    const body = await request.json();
    if (!body.id) return json({ error: 'id requis' }, 400);
    const { id, ...updates } = body;

    const res = await fetch(`${sbUrl('prospects')}?id=eq.${id}`, {
      method: 'PATCH',
      headers: sbHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Supabase: ${JSON.stringify(data)}`);
    return json(Array.isArray(data) ? data[0] : data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[prospects PATCH]', msg);
    return json({ error: msg }, 500);
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    if (!checkToken(request)) return unauthorized();
    const body = await request.json();
    if (!body.id) return json({ error: 'id requis' }, 400);

    const res = await fetch(`${sbUrl('prospects')}?id=eq.${body.id}`, {
      method: 'DELETE',
      headers: { ...sbHeaders(), 'Prefer': 'return=minimal' },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(`Supabase: ${JSON.stringify(data)}`);
    }
    return json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[prospects DELETE]', msg);
    return json({ error: msg }, 500);
  }
};
