import { motion } from 'framer-motion';

const MIEL = '#F2B01E';
const INK = '#15120D';

// Icônes SVG sur fond accent — remplacent les emojis
function IconBadge({ type }: { type: 'camera' | 'video' | 'star' }) {
  const icons = {
    camera: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    video: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    star: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={INK} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  };
  return (
    <div style={{
      width: 30,
      height: 30,
      borderRadius: 8,
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

// SVG filter pour l'effet verre liquide
function GlassFilter() {
  return (
    <svg style={{ display: 'none' }}>
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        boxShadow: '0 6px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)',
      }}
    >
      {/* Blur layer */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ backdropFilter: 'blur(12px)', filter: 'url(#glass-distortion)', isolation: 'isolate' }}
      />
      {/* White tint */}
      <div className="absolute inset-0 rounded-2xl" style={{ background: 'rgba(255,255,255,0.18)' }} />
      {/* Inner highlight */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.5), inset -1px -1px 1px rgba(255,255,255,0.3)' }}
      />
      <div className="relative z-10">{children}</div>
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
    rotate: -3,
  },
  {
    icon: 'camera',
    title: '20 photos retouchées',
    sub: 'Atelier Blanc · Fleuriste Paris 11',
    delay: 0.7,
    x: '5%',
    y: '52%',
    rotate: 2,
  },
  {
    icon: 'star',
    title: '5/5 — Résultat bluffant',
    sub: 'La Bouquinerie · Librairie',
    delay: 1.1,
    x: '-12%',
    y: '75%',
    rotate: -1.5,
  },
];

export default function HeroGlassCards() {
  return (
    <>
      <GlassFilter />
      {CARDS.map((card, i) => (
        <motion.div
          key={i}
          className="absolute z-30 left-0"
          style={{ top: card.y, x: card.x, rotate: card.rotate }}
          initial={{ opacity: 0, x: -40, scale: 0.85 }}
          animate={{ opacity: 1, x: card.x, scale: 1 }}
          transition={{ delay: card.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <GlassCard className="px-3 py-2.5 flex items-center gap-2.5 min-w-[170px]">
              <IconBadge type={card.icon} />
              <div>
                <p style={{ color: '#15120D', fontSize: 11, fontWeight: 700, lineHeight: 1.2, letterSpacing: 0.2 }}>
                  {card.title}
                </p>
                <p style={{ color: 'rgba(21,18,13,0.55)', fontSize: 9.5, marginTop: 2 }}>{card.sub}</p>
              </div>
              {/* Dot miel */}
              <div
                style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: MIEL, flexShrink: 0, marginLeft: 'auto' }}
              />
            </GlassCard>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
