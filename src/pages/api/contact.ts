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
    // Décommenter quand Supabase est configuré
    // --------------------------------------------------------
    /*
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([lead]);
    if (supabaseError) {
      console.error('Supabase insert error:', supabaseError);
      // Ne pas bloquer si Supabase échoue — notifier quand même via Make
    }
    */

    // --------------------------------------------------------
    // 2. MAKE — Webhook pour automatisation
    // Décommenter quand MAKE_WEBHOOK_URL est configuré
    // --------------------------------------------------------
    /*
    const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;
    if (makeWebhookUrl) {
      await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch((err) => console.error('Make webhook error:', err));
    }
    */

    // --------------------------------------------------------
    // 3. EMAIL via Resend (notification)
    // Décommenter quand RESEND_API_KEY est configuré
    // --------------------------------------------------------
    /*
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const notifEmail = import.meta.env.NOTIFICATION_EMAIL || 'contact@locamaster.fr';
    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Locamaster Site <noreply@locamaster.fr>',
          to: [notifEmail],
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
      }).catch((err) => console.error('Resend error:', err));
    }
    */

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
    console.error('[contact API] Erreur inattendue :', err);
    return new Response(
      JSON.stringify({ error: 'Une erreur inattendue s\'est produite.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
