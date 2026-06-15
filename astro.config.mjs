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
  site: 'https://locamaster.fr',
  vite: {
    optimizeDeps: {
      exclude: [],
    },
  },
});
