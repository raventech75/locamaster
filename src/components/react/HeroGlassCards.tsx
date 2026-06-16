import { motion } from 'framer-motion';

const MIEL = '#F2B01E';

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

const CARDS = [
  {
    icon: '🎬',
    title: 'Tournage terminé',
    sub: 'Le Clos des Saveurs · Restaurant',
    delay: 0.3,
    x: '-8%',
    y: '12%',
    rotate: -3,
  },
  {
    icon: '📸',
    title: '54 photos livrées',
    sub: 'Atelier Blanc · Fleuriste Paris 11',
    delay: 0.7,
    x: '5%',
    y: '52%',
    rotate: 2,
  },
  {
    icon: '⭐',
    title: '5/5 · Résultat bluffant !',
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
              <span style={{ fontSize: 20 }}>{card.icon}</span>
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
