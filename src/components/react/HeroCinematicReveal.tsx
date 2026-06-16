import { motion } from 'framer-motion';

const IMAGE_URL =
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80';

const ease = [0.76, 0, 0.24, 1] as const;

export default function HeroCinematicReveal() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* Image qui se stabilise pendant le reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <img
          src={IMAGE_URL}
          alt="Artisan au travail"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-ink/20" />
      </motion.div>

      {/* Rideau miel qui glisse */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{ backgroundColor: '#F2B01E' }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.95, ease, delay: 0.15 }}
      />

      {/* Badge "En tournage" */}
      <motion.div
        className="absolute bottom-5 left-5 flex items-center gap-2 bg-bg/90 border-2 border-ink rounded-full px-3 py-1.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[11px] font-bold tracking-widest uppercase text-ink">
          En tournage
        </span>
      </motion.div>
    </div>
  );
}
