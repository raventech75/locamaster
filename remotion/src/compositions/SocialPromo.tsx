import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { z } from 'zod';
import { brand } from '../brand';
import { displayFamily, sansFamily } from '../fonts';

export const socialPromoSchema = z.object({
  kicker: z.string(),
  line1: z.string(),
  line2: z.string(),
  highlight: z.string(),
  subtitle: z.string(),
  ctaLabel: z.string(),
  ctaPrice: z.string(),
});

type Props = z.infer<typeof socialPromoSchema>;

// Petit utilitaire : entrée ressort + fondu décalé
const useRise = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const y = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { transform: `translateY(${y}px)`, opacity };
};

export const SocialPromo: React.FC<Props> = ({
  kicker,
  line1,
  line2,
  highlight,
  subtitle,
  ctaLabel,
  ctaPrice,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Largeur du surlignage miel qui balaie sous le mot clé
  const wipe = spring({ frame: frame - 46, fps, config: { damping: 200 } });

  // Sortie douce sur les toutes dernières frames
  const outro = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const pill = useRise(4);
  const l1 = useRise(16);
  const l2 = useRise(26);
  const hl = useRise(40);
  const sub = useRise(70);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.bg,
        opacity: outro,
        // texture pointillée subtile
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(21,18,13,0.06) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }}
    >
      <AbsoluteFill style={{ padding: 96, justifyContent: 'center' }}>
        {/* Kicker pill */}
        <div style={{ ...pill, marginBottom: 48 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              border: `3px solid ${brand.colors.ink}`,
              borderRadius: 999,
              padding: '16px 32px',
              fontFamily: sansFamily,
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: brand.colors.ink,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                backgroundColor: brand.colors.accent,
              }}
            />
            {kicker}
          </span>
        </div>

        {/* Titre */}
        <h1
          style={{
            fontFamily: displayFamily,
            fontWeight: 800,
            fontSize: 138,
            lineHeight: 0.94,
            letterSpacing: -4,
            color: brand.colors.ink,
            margin: 0,
          }}
        >
          <div style={l1}>{line1}</div>
          <div style={l2}>{line2}</div>
          <div style={{ ...hl, display: 'inline-block', position: 'relative', marginTop: 8 }}>
            {/* barre miel qui balaie */}
            <span
              style={{
                position: 'absolute',
                left: -6,
                right: -6,
                bottom: 14,
                height: '46%',
                backgroundColor: brand.colors.accent,
                transformOrigin: 'left center',
                transform: `scaleX(${wipe})`,
                zIndex: 0,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{highlight}</span>
          </div>
        </h1>

        {/* Sous-titre */}
        <p
          style={{
            ...sub,
            fontFamily: sansFamily,
            fontWeight: 400,
            fontSize: 42,
            lineHeight: 1.4,
            color: brand.colors.ink2,
            marginTop: 56,
            maxWidth: 760,
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>

      {/* Bandeau CTA bas */}
      <Sequence from={104}>
        <CtaBanner ctaLabel={ctaLabel} ctaPrice={ctaPrice} />
      </Sequence>
    </AbsoluteFill>
  );
};

const CtaBanner: React.FC<{ ctaLabel: string; ctaPrice: string }> = ({
  ctaLabel,
  ctaPrice,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(s, [0, 1], [120, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', padding: 72 }}>
      <div
        style={{
          transform: `translateY(${y}px)`,
          backgroundColor: brand.colors.ink,
          borderRadius: 40,
          padding: '56px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontFamily: sansFamily,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: brand.colors.accent,
            }}
          >
            {ctaLabel}
          </span>
          <span
            style={{
              fontFamily: displayFamily,
              fontWeight: 800,
              fontSize: 92,
              lineHeight: 1,
              letterSpacing: -2,
              color: brand.colors.white,
            }}
          >
            {ctaPrice}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 6,
          }}
        >
          <Logo size={64} />
          <span
            style={{
              fontFamily: sansFamily,
              fontWeight: 600,
              fontSize: 30,
              color: brand.colors.white,
            }}
          >
            {brand.site}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Logo: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: brand.colors.accent,
        border: `3px solid ${brand.colors.ink}`,
        borderRadius: size * 0.22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: displayFamily,
        fontWeight: 800,
        fontSize: size * 0.5,
        color: brand.colors.ink,
      }}
    >
      L
    </div>
    <span
      style={{
        fontFamily: displayFamily,
        fontWeight: 700,
        fontSize: size * 0.5,
        letterSpacing: -1,
        color: brand.colors.white,
      }}
    >
      Locamaster
    </span>
  </div>
);
