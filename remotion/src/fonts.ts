/**
 * Chargement des polices de la charte via @remotion/google-fonts.
 * loadFont() garantit que la police est prête avant le rendu des frames.
 * On ne charge que les poids réellement utilisés (rendu plus rapide).
 */
import { loadFont as loadBricolage } from '@remotion/google-fonts/BricolageGrotesque';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const bricolage = loadBricolage('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
});
const inter = loadInter('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const displayFamily = bricolage.fontFamily;
export const sansFamily = inter.fontFamily;
