/**
 * Route API POST /api/contact
 * Réception des leads du formulaire de contact
 *
 * Intégrations disponibles (décommenter selon besoin) :
 *
 * 1. SUPABASE (stockage leads)
 *    → Décommenter la section "Supabase" ci-dessous
 *    → Ajouter dans .env : PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *    → Créer la table leads (voir README)
 *
 * 2. MAKE (automatisation webhook)
 *    → Décommenter la section "Make" ci-dessous
 *    → Ajouter dans .env : MAKE_WEBHOOK_URL
 *    → Créer un scénario Make avec déclencheur "Custom webhook"
 *
 * 3. EMAIL (notification)
 *    → Utiliser Resend ou SendGrid
 *    → Ajouter dans .env : RESEND_API_KEY + NOTIFICATION_EMAIL
 */

import type { APIRoute } from 'astro';

export const prerender = false; // Cette route est server-side

interface ContactPayload {
  nom: string;
  entreprise?: string;
  email: string;
  telephone?: string;
  besoin: string;
  budget?: string;
  message: string;
  _hp?: string; // honeypot anti-spam
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let body: ContactPayload;

    // Accepter JSON et FormData
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData) as unknown as ContactPayload;
    }

    // Anti-spam honeypot
    if (body._hp && body._hp.trim() !== '') {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Validation
    if (!body.nom?.trim() || !body.email?.trim() || !body.message?.trim() || !body.besoin) {
      return new Response(
        JSON.stringify({ error: 'Champs obligatoires manquants.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Email invalide.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const lead = {
      nom: body.nom.trim(),
      entreprise: body.entreprise?.trim() || null,
      email: body.email.trim().toLowerCase(),
      telephone: body.telephone?.trim() || null,
      besoin: body.besoin,
      budget: body.budget || null,
      message: body.message.trim(),
      created_at: new Date().toISOString(),
      source: 'site-web',
    };

    // --------------------------------------------------------
    // 1. SUPABASE — Stockage du lead
    // process.env = runtime Vercel ; import.meta.env = build-time Vite (fallback dev)
    const getEnv = (k: string): string | undefined => {
      try { return process.env[k] ?? (import.meta.env as Record<string, string | undefined>)[k]; }
      catch { return process.env[k]; }
    };

    const SUPABASE_URL = getEnv('PUBLIC_SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = getEnv('SUPABASE_SERVICE_ROLE_KEY');
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: { persistSession: false },
        });
        const { error } = await supabase.from('leads').insert([lead]);
        if (error) console.error('[contact] Supabase insert error:', error.message);
      } catch (e) {
        console.error('[contact] Supabase exception:', e);
        // Ne bloque pas : on tente quand même Make / email
      }
    }

    // --------------------------------------------------------
    // 2. MAKE — Webhook pour automatisation
    // --------------------------------------------------------
    const MAKE_WEBHOOK_URL = getEnv('MAKE_WEBHOOK_URL');
    console.log('[contact] MAKE_WEBHOOK_URL défini :', !!MAKE_WEBHOOK_URL);
    if (MAKE_WEBHOOK_URL) {
      try {
        const makeRes = await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
        console.log('[contact] Make webhook status :', makeRes.status);
      } catch (e) {
        console.error('[contact] Make webhook error :', e);
      }
    } else {
      console.warn('[contact] MAKE_WEBHOOK_URL absent — webhook non déclenché');
    }

    // --------------------------------------------------------
    // 3. EMAIL via Resend (notification, optionnel)
    // --------------------------------------------------------
    const RESEND_API_KEY = env('RESEND_API_KEY');
    const NOTIFICATION_EMAIL = env('NOTIFICATION_EMAIL') || 'contact@locamaster.fr';
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Locamaster Site <noreply@locamaster.fr>',
            to: [NOTIFICATION_EMAIL],
            reply_to: lead.email,
            subject: `Nouveau lead : ${lead.nom} — ${lead.besoin}`,
            html: `
              <h2>Nouveau lead Locamaster</h2>
              <p><strong>Nom :</strong> ${lead.nom}</p>
              <p><strong>Entreprise :</strong> ${lead.entreprise || '—'}</p>
              <p><strong>Email :</strong> ${lead.email}</p>
              <p><strong>Téléphone :</strong> ${lead.telephone || '—'}</p>
              <p><strong>Besoin :</strong> ${lead.besoin}</p>
              <p><strong>Budget :</strong> ${lead.budget || '—'}</p>
              <p><strong>Message :</strong></p>
              <p>${lead.message.replace(/\n/g, '<br>')}</p>
            `,
          }),
        });
      } catch (e) {
        console.error('[contact] Resend error:', e);
      }
    }

    // Log en développement
    if (import.meta.env.DEV) {
      console.log('[DEV] Nouveau lead reçu :', JSON.stringify(lead, null, 2));
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Votre message a bien été envoyé.' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('[contact API] Erreur inattendue :', err instanceof Error ? err.message : err, err instanceof Error ? err.stack : '');
    return new Response(
      JSON.stringify({ error: 'Une erreur inattendue s\'est produite.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
