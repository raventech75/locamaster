import type { APIRoute } from 'astro';

export const prerender = false;

const getEnv = (k: string): string | undefined => {
  try { return process.env[k] ?? (import.meta.env as Record<string, string | undefined>)[k]; }
  catch { return process.env[k]; }
};

function checkToken(request: Request): boolean {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const adminToken = getEnv('ADMIN_TOKEN');
  return !!adminToken && token === adminToken;
}

const templates: Record<string, { sujet: string; html: (nom: string, entreprise: string) => string }> = {
  restaurateur: {
    sujet: `Vos plats méritent mieux qu'une photo de téléphone`,
    html: (nom, entreprise) => `
<p>Bonjour ${nom},</p>
<p>J'ai découvert <strong>${entreprise}</strong> récemment, et votre cuisine a l'air vraiment soignée.</p>
<p>Malheureusement, les photos en ligne ne rendent pas justice à ce que vous proposez — et dans la restauration, l'image est souvent ce qui décide une réservation avant même que le client ait lu la carte.</p>
<p>Je m'appelle Feridun, je suis vidéaste et photographe professionnel basé en Île-de-France. Je travaille exclusivement avec des commerces locaux pour leur donner une image à la hauteur de leur travail.</p>
<p>Je propose une <strong>Session Découverte à 190 € HT</strong> : une demi-journée chez vous, 5 photos retouchées et 1 vidéo courte livrées en 5 jours. Sans engagement.</p>
<p>Est-ce que vous seriez disponible pour un appel de 15 minutes cette semaine ?</p>
<p>Cordialement,<br>Feridun Kizgin<br>Locamaster — Studio photo & vidéo local<br>01 85 09 45 42</p>`,
  },
  fleuriste: {
    sujet: `Vos créations éphémères méritent de laisser une trace`,
    html: (nom, entreprise) => `
<p>Bonjour ${nom},</p>
<p>J'ai vu le travail de <strong>${entreprise}</strong> — vos compositions ont une vraie identité.</p>
<p>Le problème avec les créations florales, c'est qu'elles disparaissent. Sans photos ou vidéos de qualité, tout ce travail ne laisse aucune trace qui puisse attirer de nouveaux clients ou convaincre un client événementiel.</p>
<p>Je suis Feridun, photographe et vidéaste spécialisé dans les commerces locaux en Île-de-France. Je viens chez vous, je capture vos créations dans les meilleures conditions, et vous récupérez des visuels prêts à publier en 5 jours.</p>
<p>Pour commencer sans risque : <strong>Session Découverte à 190 € HT</strong> — 5 photos + 1 vidéo courte.</p>
<p>Un appel rapide cette semaine pour en discuter ?</p>
<p>Cordialement,<br>Feridun Kizgin<br>Locamaster — Studio photo & vidéo local<br>01 85 09 45 42</p>`,
  },
  coiffeur: {
    sujet: `Vos créations capillaires méritent d'être vues`,
    html: (nom, entreprise) => `
<p>Bonjour ${nom},</p>
<p>J'ai vu le travail de <strong>${entreprise}</strong> — vous avez une vraie patte artistique.</p>
<p>Sur TikTok et Instagram, les salons qui cartonnent ne sont pas forcément les meilleurs techniquement — ce sont ceux qui montrent leur travail de façon régulière et qualitative. Un contenu bien filmé peut changer complètement la dynamique de vos réservations.</p>
<p>Je suis Feridun, vidéaste et photographe basé en Île-de-France. Je viens une fois par mois dans votre salon, je filme pendant les créations, et vous recevez des vidéos prêtes pour les réseaux sans mobiliser votre équipe.</p>
<p>Pour tester : <strong>Session Découverte à 190 € HT</strong> — on voit si ça colle avant tout engagement.</p>
<p>Disponible pour un appel de 15 min ?</p>
<p>Cordialement,<br>Feridun Kizgin<br>Locamaster — Studio photo & vidéo local<br>01 85 09 45 42</p>`,
  },
  default: {
    sujet: `Votre commerce mérite une image professionnelle`,
    html: (nom, entreprise) => `
<p>Bonjour ${nom},</p>
<p>J'ai découvert <strong>${entreprise}</strong> et j'ai été convaincu par ce que vous proposez.</p>
<p>Je suis Feridun, photographe et vidéaste professionnel basé en Île-de-France. Je travaille exclusivement avec des commerces et professionnels locaux pour leur donner une image visuelle à la hauteur de leur activité — photos, vidéos réseaux, film vitrine.</p>
<p>Pour commencer sans risque, je propose une <strong>Session Découverte à 190 € HT</strong> : une intervention chez vous, 5 photos retouchées + 1 vidéo courte livrées en 5 jours.</p>
<p>Est-ce qu'on peut s'appeler 15 minutes cette semaine pour voir si c'est pertinent pour vous ?</p>
<p>Cordialement,<br>Feridun Kizgin<br>Locamaster — Studio photo & vidéo local<br>01 85 09 45 42</p>`,
  },
};

export const POST: APIRoute = async ({ request }) => {
  if (!checkToken(request)) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const body = await request.json();
    const { prospectId, nom, entreprise, email, secteur } = body;

    if (!email || !nom) {
      return new Response(JSON.stringify({ error: 'Email et nom requis' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const RESEND_API_KEY = getEnv('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY non configuré' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const tpl = templates[secteur] || templates.default;
    const prenom = nom.split(' ')[0];

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Feridun — Locamaster <contact@locamaster.fr>',
        to: [email],
        subject: tpl.sujet,
        html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px">
          ${tpl.html(prenom, entreprise || nom)}
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0">
          <p style="font-size:12px;color:#999">Vous recevez cet email car votre commerce a été identifié comme pouvant bénéficier de nos services. Pour ne plus recevoir de messages : répondez "désinscription".</p>
        </body></html>`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    // Marquer l'email comme envoyé dans Supabase si on a un prospectId
    if (prospectId) {
      const { createClient } = await import('@supabase/supabase-js');
      const url = getEnv('PUBLIC_SUPABASE_URL');
      const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');
      if (url && key) {
        const supabase = createClient(url, key, { auth: { persistSession: false } });
        await supabase.from('prospects').update({
          email_envoye: true,
          email_envoye_at: new Date().toISOString(),
          statut: 'contacte',
        }).eq('id', prospectId);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
