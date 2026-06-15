import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { brand } from '../brand';
import { displayFamily, sansFamily } from '../fonts';

/**
 * Sting logo — le monogramme apparaît en ressort, le wordmark se révèle
 * par un masque, la baseline suit. Idéal en intro/outro de film vitrine.
 */
export const LogoSting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const rotate = interpolate(pop, [0, 1], [-12, 0]);

  // Masque de révélation du wordmark
  const reveal = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const clip = interpolate(reveal, [0, 1], [100, 0]);

  // Baseline
  const baseOpacity = interpolate(frame - 34, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const baseY = interpolate(frame - 34, [0, 14], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outro = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
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
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {/* Monogramme */}
        <div
          style={{
            width: 180,
            height: 180,
            backgroundColor: brand.colors.accent,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${pop}) rotate(${rotate}deg)`,
            fontFamily: displayFamily,
            fontWeight: 800,
            fontSize: 110,
            color: brand.colors.ink,
          }}
        >
          L
        </div>

        {/* Wordmark révélé par masque */}
        <div
          style={{
            overflow: 'hidden',
            clipPath: `inset(0 ${clip}% 0 0)`,
          }}
        >
          <span
            style={{
              fontFamily: displayFamily,
              fontWeight: 700,
              fontSize: 130,
              letterSpacing: -4,
              color: brand.colors.white,
              whiteSpace: 'nowrap',
            }}
          >
            Locamaster
          </span>
        </div>
      </div>

      {/* Baseline */}
      <span
        style={{
          marginTop: 40,
          opacity: baseOpacity,
          transform: `translateY(${baseY}px)`,
          fontFamily: sansFamily,
          fontWeight: 500,
          fontSize: 38,
          letterSpacing: 2,
          color: brand.colors.accent,
        }}
      >
        {brand.baseline}
      </span>
    </AbsoluteFill>
  );
};
