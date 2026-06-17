// Vercel Analytics custom events — track key conversion actions
// https://vercel.com/docs/analytics/custom-events

declare const window: Window & { va?: (event: string, properties?: Record<string, string>) => void };

function track(event: string, properties?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.va === 'function') {
    window.va(event, properties);
  }
}

function initAnalytics() {
  // Phone clicks
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((el) => {
    el.addEventListener('click', () => {
      track('phone_click', { location: el.closest('section')?.id ?? 'unknown' });
    });
  });

  // WhatsApp clicks
  document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach((el) => {
    el.addEventListener('click', () => {
      track('whatsapp_click');
    });
  });

  // Primary CTA clicks — "Réserver" / "Devis" buttons
  document.querySelectorAll<HTMLAnchorElement>('a[href*="/contact"]').forEach((el) => {
    el.addEventListener('click', () => {
      const label = el.textContent?.trim().slice(0, 40) ?? 'unknown';
      track('cta_click', {
        label,
        location: el.closest('section')?.id ?? el.closest('[data-hero]') ? 'hero' : 'unknown',
      });
    });
  });

  // Form submission success — dispatched by the contact API response handler
  document.addEventListener('contact:success', () => {
    track('form_submitted');
  });

  // Session découverte CTA
  document.querySelectorAll<HTMLAnchorElement>('a[href*="session-decouverte"]').forEach((el) => {
    el.addEventListener('click', () => {
      track('session_decouverte_click', {
        source: new URLSearchParams(el.search).get('secteur') ?? 'direct',
      });
    });
  });
}

document.addEventListener('astro:page-load', initAnalytics);
