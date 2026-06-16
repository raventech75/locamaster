import type { APIRoute } from 'astro';

export const prerender = false;

const getEnv = (k: string): string | undefined => process.env[k];

async function getSupabase() {
  const url = getEnv('PUBLIC_SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error(`Supabase non configuré — URL:${!!url} KEY:${!!key}`);
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(url, key, { auth: { persistSession: false } });
}

function unauthorized() {
  return new Response(JSON.stringify({ error: 'Non autorisé' }), {
    status: 401, headers: { 'Content-Type': 'application/json' },
  });
}

function checkToken(request: Request): boolean {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const adminToken = getEnv('ADMIN_TOKEN');
  return !!adminToken && token === adminToken;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!checkToken(request)) return unauthorized();
    const url = new URL(request.url);
    const supabase = await getSupabase();
    let query = supabase.from('prospects').select('*').order('created_at', { ascending: false });
    const statut = url.searchParams.get('statut');
    const secteur = url.searchParams.get('secteur');
    if (statut && statut !== 'tous') query = query.eq('statut', statut);
    if (secteur && secteur !== 'tous') query = query.eq('secteur', secteur);
    const { data, error } = await query;
    if (error) throw new Error(`Supabase: ${error.message} (${error.code})`);
    return json(data ?? []);
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
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('prospects').insert([{
      nom: body.nom.trim(),
      entreprise: body.entreprise?.trim() || null,
      secteur: body.secteur || null,
      email: body.email?.trim().toLowerCase() || null,
      telephone: body.telephone?.trim() || null,
      ville: body.ville?.trim() || null,
      statut: body.statut || 'nouveau',
      notes: body.notes?.trim() || null,
      source: body.source || 'manuel',
    }]).select().single();
    if (error) throw new Error(`Supabase: ${error.message} (${error.code})`);
    return json(data, 201);
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
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('prospects').update(updates).eq('id', id).select().single();
    if (error) throw new Error(`Supabase: ${error.message} (${error.code})`);
    return json(data);
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
    const supabase = await getSupabase();
    const { error } = await supabase.from('prospects').delete().eq('id', body.id);
    if (error) throw new Error(`Supabase: ${error.message} (${error.code})`);
    return json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[prospects DELETE]', msg);
    return json({ error: msg }, 500);
  }
};
