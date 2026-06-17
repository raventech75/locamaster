import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // hybrid = pages statiques + API routes server-rendues (formulaire contact)
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false, // on gère nos propres base styles
    }),
    // React activé pour les composants framer-motion (îlots client ciblés).
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') && !page.includes('/api'),
    }),
  ],
  // Domaine canonique = www (c'est lui que sert Vercel ; l'apex y redirige).
  site: 'https://www.locamaster.fr',
  vite: {
    optimizeDeps: {
      exclude: [],
    },
  },
});
