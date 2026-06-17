import { motion } from 'framer-motion';

const MIEL = '#F2B01E';
const INK = '#15120D';
const INK2 = 'rgba(21,18,13,0.55)';

function IconBadge({ type }: { type: 'camera' | 'video' | 'star' }) {
  const icons = {
    camera: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    video: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    star: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill={INK} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  };
  return (
    <div style={{
      width: 28,
      height: 28,
      borderRadius: 7,
      backgroundColor: MIEL,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icons[type]}
    </div>
  );
}

const CARDS: { icon: 'camera' | 'video' | 'star'; title: string; sub: string; delay: number; x: string; y: string; rotate: number }[] = [
  {
    icon: 'video',
    title: 'Vidéo livrée — 5 jours',
    sub: 'Le Clos des Saveurs · Restaurant',
    delay: 0.3,
    x: '-8%',
    y: '12%',
    rotate: -2,
  },
  {
    icon: 'camera',
    title: '20 photos retouchées',
    sub: 'Atelier Blanc · Fleuriste Paris 11',
    delay: 0.7,
    x: '5%',
    y: '52%',
    rotate: 1.5,
  },
  {
    icon: 'star',
    title: '5/5 — Résultat bluffant',
    sub: 'La Bouquinerie · Librairie',
    delay: 1.1,
    x: '-12%',
    y: '75%',
    rotate: -1,
  },
];

export default function HeroGlassCards() {
  return (
    <>
      {CARDS.map((card, i) => (
        <motion.div
          key={i}
          className="absolute z-30 left-0"
          style={{ top: card.y, x: card.x, rotate: card.rotate }}
          initial={{ opacity: 0, x: -32, scale: 0.9 }}
          animate={{ opacity: 1, x: card.x, scale: 1 }}
          transition={{ delay: card.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            {/* Carte simple : fond blanc, bordure légère, ombre douce */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              minWidth: 180,
              backgroundColor: 'rgba(251,249,244,0.95)',
              border: '1.5px solid rgba(21,18,13,0.10)',
              borderRadius: 14,
              padding: '10px 14px',
              boxShadow: '0 4px 16px rgba(21,18,13,0.12)',
            }}>
              <IconBadge type={card.icon} />
              <div>
                <p style={{ color: INK, fontSize: 11, fontWeight: 700, lineHeight: 1.2, margin: 0, letterSpacing: 0.1 }}>
                  {card.title}
                </p>
                <p style={{ color: INK2, fontSize: 9.5, margin: '2px 0 0', lineHeight: 1.3 }}>
                  {card.sub}
                </p>
              </div>
              {/* Dot miel */}
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: MIEL, flexShrink: 0, marginLeft: 'auto' }} />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
