/**
 * Rend toutes les vidéos "prêtes à poster" (packs + abonnements + cas d'usage)
 * dans le dossier out/. Usage : npm run render:all
 */
import { execSync } from 'node:child_process';

const ids = [
  // Packs (1:1)
  'Pack-royal-starter',
  'Pack-branding-pro',
  'Pack-premium-artisan',
  // Abonnements (1:1)
  'Abo-social-starter',
  'Abo-social-pro',
  'Abo-social-elite',
  // Cas d'usage (9:16)
  'Cas-plombier',
  'Cas-cuisiniste',
  'Cas-menuisier',
  'Cas-electricien',
  'Cas-renovation',
  // Signature
  'SocialPromo',
  'LogoSting',
];

console.log(`\n🎬 Rendu de ${ids.length} vidéos Locamaster...\n`);

for (const id of ids) {
  const out = `out/${id}.mp4`;
  console.log(`→ ${id}`);
  execSync(`npx remotion render src/index.ts ${id} ${out}`, { stdio: 'inherit' });
}

console.log(`\n✅ Terminé. Vidéos disponibles dans remotion/out/\n`);
