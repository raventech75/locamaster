import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const getEnv = (k: string): string | undefined => process.env[k];

function getSupabase() {
  const url = getEnv('PUBLIC_SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('Supabase non configuré');
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

// GET /api/prospects?token=xxx[&statut=xxx][&secteur=xxx]
export const GET: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return unauthorized();
  try {
    const url = new URL(request.url);

    // Diagnostic : vérifier les env vars
    const supabaseUrl = getEnv('PUBLIC_SUPABASE_URL');
    const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({
        error: 'Variables Supabase manquantes',
        details: { PUBLIC_SUPABASE_URL: !!supabaseUrl, SUPABASE_SERVICE_ROLE_KEY: !!supabaseKey },
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const supabase = getSupabase();
    let query = supabase.from('prospects').select('*').order('created_at', { ascending: false });
    const statut = url.searchParams.get('statut');
    const secteur = url.searchParams.get('secteur');
    if (statut && statut !== 'tous') query = query.eq('statut', statut);
    if (secteur && secteur !== 'tous') query = query.eq('secteur', secteur);
    const { data, error } = await query;
    if (error) {
      console.error('[prospects] Supabase error:', error);
      return new Response(JSON.stringify({ error: error.message, code: error.code }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify(data ?? []), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[prospects] GET error:', msg);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// POST /api/prospects?token=xxx — créer un prospect
export const POST: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return unauthorized();
  try {
    const body = await request.json();
    if (!body.nom?.trim()) {
      return new Response(JSON.stringify({ error: 'Nom requis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const supabase = getSupabase();
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
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// PATCH /api/prospects?token=xxx — mettre à jour un prospect
export const PATCH: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return unauthorized();
  try {
    const body = await request.json();
    if (!body.id) return new Response(JSON.stringify({ error: 'id requis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const { id, ...updates } = body;
    const supabase = getSupabase();
    const { data, error } = await supabase.from('prospects').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// DELETE /api/prospects?token=xxx — supprimer un prospect
export const DELETE: APIRoute = async ({ request }) => {
  if (!checkToken(request)) return unauthorized();
  try {
    const body = await request.json();
    if (!body.id) return new Response(JSON.stringify({ error: 'id requis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const supabase = getSupabase();
    const { error } = await supabase.from('prospects').delete().eq('id', body.id);
    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
