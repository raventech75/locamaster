import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Brique framer-motion réutilisable : apparition douce (fondu + montée)
 * quand l'élément entre dans le viewport. À utiliser dans une page Astro :
 *
 *   <MotionReveal client:visible>
 *     <div>…contenu…</div>
 *   </MotionReveal>
 *
 * `client:visible` = l'îlot React ne s'hydrate qu'à l'approche du viewport
 * (coût JS nul tant que l'élément n'est pas visible).
 */
export default function MotionReveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
