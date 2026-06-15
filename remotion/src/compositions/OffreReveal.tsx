import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { z } from 'zod';
import { brand } from '../brand';
import { displayFamily, sansFamily } from '../fonts';

export const offreRevealSchema = z.object({
  label: z.string(),
  title: z.string(),
  features: z.array(z.string()),
  priceFrom: z.string(),
  price: z.string(),
});

type Props = z.infer<typeof offreRevealSchema>;

export const OffreReveal: React.FC<Props> = ({
  label,
  title,
  features,
  priceFrom,
  price,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const card = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const cardY = interpolate(card, [0, 1], [80, 0]);

  const priceSpring = spring({ frame: frame - 96, fps, config: { damping: 11, mass: 0.9 } });

  const outro = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.ink,
        opacity: outro,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 72,
      }}
    >
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: card,
          width: '100%',
          backgroundColor: brand.colors.bg,
          borderRadius: 48,
          padding: 72,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {/* Label */}
        <span
          style={{
            alignSelf: 'flex-start',
            backgroundColor: brand.colors.accent,
            color: brand.colors.ink,
            fontFamily: sansFamily,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 3,
            textTransform: 'uppercase',
            padding: '14px 28px',
            borderRadius: 999,
          }}
        >
          {label}
        </span>

        {/* Titre */}
        <h2
          style={{
            fontFamily: displayFamily,
            fontWeight: 800,
            fontSize: 96,
            letterSpacing: -3,
            color: brand.colors.ink,
            margin: 0,
          }}
        >
          {title}
        </h2>

        {/* Features avec apparition en cascade */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
          {features.map((feat, i) => {
            const fOpacity = interpolate(
              frame - (30 + i * 12),
              [0, 10],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const fx = interpolate(frame - (30 + i * 12), [0, 10], [-24, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  opacity: fOpacity,
                  transform: `translateX(${fx}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  fontFamily: sansFamily,
                  fontWeight: 500,
                  fontSize: 38,
                  color: brand.colors.ink2,
                }}
              >
                <Check />
                {feat}
              </div>
            );
          })}
        </div>

        {/* Prix */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'baseline',
            gap: 18,
            transform: `scale(${interpolate(priceSpring, [0, 1], [0.7, 1])})`,
            transformOrigin: 'left center',
          }}
        >
          <span
            style={{
              fontFamily: sansFamily,
              fontWeight: 500,
              fontSize: 34,
              color: brand.colors.muted,
            }}
          >
            {priceFrom}
          </span>
          <span
            style={{
              fontFamily: displayFamily,
              fontWeight: 800,
              fontSize: 100,
              letterSpacing: -3,
              color: brand.colors.accentDark,
            }}
          >
            {price}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Check: React.FC = () => (
  <div
    style={{
      width: 44,
      height: 44,
      flexShrink: 0,
      borderRadius: 999,
      backgroundColor: brand.colors.accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={brand.colors.ink} strokeWidth={3}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
