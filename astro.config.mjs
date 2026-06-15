import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

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
  ],
  // Domaine canonique = www (c'est lui que sert Vercel ; l'apex y redirige).
  site: 'https://www.locamaster.fr',
  vite: {
    optimizeDeps: {
      exclude: [],
    },
  },
});
