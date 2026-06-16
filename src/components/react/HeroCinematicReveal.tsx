import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// ─── Palette charte ─────────────────────────────────────────────────────────
const MIEL = '#F2B01E';
const INK  = '#15120D';
const BG   = '#FBF9F4';

// ─── Clips timeline ──────────────────────────────────────────────────────────
const TRACKS = [
  {
    label: 'V1', clips: [
      { start: 0,   width: 28, color: '#4A7CF7' },
      { start: 30,  width: 20, color: '#7C4AF7' },
      { start: 52,  width: 32, color: '#4A7CF7' },
    ],
  },
  {
    label: 'V2', clips: [
      { start: 8,  width: 18, color: '#F7A04A' },
      { start: 40, width: 24, color: '#F74A6A' },
      { start: 68, width: 22, color: MIEL      },
    ],
  },
  {
    label: 'A1', clips: [
      { start: 0,  width: 84, color: '#4AF7A0', isAudio: true },
    ],
  },
];

// ─── Waveform bars ───────────────────────────────────────────────────────────
const WAVE_HEIGHTS = [30,55,40,70,45,80,35,60,50,75,30,65,55,40,70,45,80,35,60,50,75,30,65,55,45,80,35,60];

// ─── Timecode helper ─────────────────────────────────────────────────────────
function formatTC(frames: number) {
  const fps  = 25;
  const f    = frames % fps;
  const s    = Math.floor(frames / fps) % 60;
  const m    = Math.floor(frames / (fps * 60)) % 60;
  const h    = Math.floor(frames / (fps * 3600));
  const pad  = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

// ─── Color wheel mini ────────────────────────────────────────────────────────
function ColorWheel({ hue, label }: { hue: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-10 h-10 rounded-full border border-white/10"
        style={{
          background: `conic-gradient(from ${hue}deg, hsl(${hue},70%,50%), hsl(${hue+120},70%,50%), hsl(${hue+240},70%,50%), hsl(${hue},70%,50%))`,
        }}
      />
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, letterSpacing: 1 }}>{label}</span>
    </div>
  );
}

export default function HeroCinematicReveal() {
  const [frame, setFrame]         = useState(0);
  const [wavePhase, setWavePhase] = useState(0);
  const [playhead, setPlayhead]   = useState(0); // 0–100 %
  const startRef = useRef<number | null>(null);

  // ── Animation loop ──────────────────────────────────────────────────────────
  useAnimationFrame((t) => {
    if (startRef.current === null) startRef.current = t;
    const elapsed = t - startRef.current;
    setFrame(Math.floor((elapsed / 1000) * 25) % (25 * 3600));
    setWavePhase((elapsed / 180) % (Math.PI * 2));
    setPlayhead((elapsed / 8000) % 1 * 100);
  });

  // ── Reduce motion ───────────────────────────────────────────────────────────
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const tc = formatTC(frame);

  return (
    <div
      className="absolute inset-0 overflow-hidden flex flex-col"
      style={{ background: '#0E0C09', fontFamily: "'Inter', monospace" }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06]" style={{ background: '#161310' }}>
        {/* REC */}
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: MIEL }}
            animate={reduce ? {} : { opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ color: MIEL, fontSize: 10, fontWeight: 700, letterSpacing: 2 }}>REC</span>
        </div>
        {/* Timecode */}
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, fontVariantNumeric: 'tabular-nums' }}>
          {tc}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: 1 }}>4K · 25p</span>
      </div>

      {/* ── Preview ─────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: 0 }}>
        {/* Cinematic bars */}
        <div className="absolute inset-x-0 top-0 h-[10%] z-10" style={{ background: '#0E0C09' }} />
        <div className="absolute inset-x-0 bottom-0 h-[10%] z-10" style={{ background: '#0E0C09' }} />

        {/* Photo artisan */}
        <img
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=75"
          alt="Artisan en action"
          className="w-full h-full object-cover"
          loading="eager"
          style={{ opacity: 0.85 }}
        />

        {/* Scan line */}
        {!reduce && (
          <motion.div
            className="absolute inset-x-0 h-[1px] z-20 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${MIEL}55, transparent)` }}
            animate={{ y: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* LUT badge */}
        <motion.div
          className="absolute top-4 left-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded"
          style={{ background: 'rgba(14,12,9,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: MIEL }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, letterSpacing: 1.5, fontWeight: 600 }}>CINEMATIC LUT</span>
        </motion.div>

        {/* Focus corners */}
        {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} z-20 w-5 h-5`}
            style={{
              borderColor: MIEL,
              borderStyle: 'solid',
              borderTopWidth:    i < 2 ? 2 : 0,
              borderBottomWidth: i >= 2 ? 2 : 0,
              borderLeftWidth:   i % 2 === 0 ? 2 : 0,
              borderRightWidth:  i % 2 === 1 ? 2 : 0,
            }}
            animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* ── Color wheels ────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-around px-4 py-2 border-t border-b border-white/[0.06]"
        style={{ background: '#121009' }}
      >
        <ColorWheel hue={220} label="LIFT" />
        <ColorWheel hue={40}  label="GAMMA" />
        <ColorWheel hue={0}   label="GAIN" />
        {/* Audio meters */}
        <div className="flex items-end gap-0.5 h-10">
          {[65,80,55,90,70,85,50,75].map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-sm"
              style={{ backgroundColor: h > 80 ? '#F74A6A' : h > 60 ? MIEL : '#4AF7A0' }}
              animate={reduce ? { height: `${h}%` } : { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
              transition={{ duration: 0.4 + i * 0.07, repeat: Infinity, repeatType: 'mirror' }}
            />
          ))}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8, letterSpacing: 1, marginLeft: 4, alignSelf: 'flex-end' }}>dB</span>
        </div>
      </div>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <div className="relative px-2 py-1.5" style={{ background: '#0A0907' }}>
        {/* Playhead */}
        {!reduce && (
          <div
            className="absolute top-0 bottom-0 w-px z-10 pointer-events-none"
            style={{
              left: `calc(${playhead}% + 28px)`,
              background: MIEL,
              boxShadow: `0 0 6px ${MIEL}88`,
            }}
          />
        )}

        {TRACKS.map((track) => (
          <div key={track.label} className="flex items-center gap-1 mb-1" style={{ height: 14 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 8, width: 16, flexShrink: 0, letterSpacing: 1 }}>{track.label}</span>
            <div className="relative flex-1 h-full rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {track.clips.map((clip, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0.5 bottom-0.5 rounded-sm"
                  style={{
                    left:  `${clip.start}%`,
                    width: `${clip.width}%`,
                    backgroundColor: clip.color,
                    opacity: clip.isAudio ? 0.5 : 0.75,
                  }}
                  animate={reduce || clip.isAudio ? {} : { opacity: [0.65, 0.85, 0.65] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                >
                  {clip.isAudio && (
                    <svg className="w-full h-full" viewBox="0 0 100 14" preserveAspectRatio="none">
                      {WAVE_HEIGHTS.map((h, wi) => (
                        <rect
                          key={wi}
                          x={wi * (100 / WAVE_HEIGHTS.length)}
                          y={(14 - h * 0.14) / 2}
                          width={100 / WAVE_HEIGHTS.length - 0.5}
                          height={h * 0.14}
                          fill="rgba(255,255,255,0.6)"
                        />
                      ))}
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Status bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-1" style={{ background: '#0A0907', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8, letterSpacing: 1 }}>LOCAMASTER STUDIO</span>
        <div className="flex items-center gap-3">
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8 }}>H.265</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8 }}>ProRes 422</span>
          <motion.span
            style={{ color: MIEL, fontSize: 8, fontWeight: 700, letterSpacing: 1 }}
            animate={reduce ? {} : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LIVE
          </motion.span>
        </div>
      </div>
    </div>
  );
}
