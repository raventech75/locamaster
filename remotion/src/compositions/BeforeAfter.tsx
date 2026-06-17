/**
 * BeforeAfter — Reel Instagram 9:16 (1080×1920, 30fps, ~10 s / 300 frames)
 *
 * Séquence :
 *   0–30   : label "AVANT" + image gauche
 *   30–120 : balayage diagonal AVANT → APRÈS (wipe de gauche à droite)
 *   120–210: plein écran APRÈS + badge résultat
 *   210–300: CTA Locamaster (bandeau bas + logo)
 *
 * Usage : fournir deux URLs d'image (beforeUrl / afterUrl) + les props texte.
 * Sans vraies images clientes, les zones sont colorées avec un placeholder.
 */
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
} from 'remotion';
import { z } from 'zod';
import { brand } from '../brand';
import { displayFamily, sansFamily } from '../fonts';

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */
export const beforeAfterSchema = z.object({
  beforeUrl: z.string().default(''),
  afterUrl: z.string().default(''),
  secteur: z.string().default('Restaurateur'),
  resultLabel: z.string().default('+42 % de clics Google Maps'),
  ctaLabel: z.string().default('Session Découverte'),
  ctaPrice: z.string().default('190 € HT'),
});

type Props = z.infer<typeof beforeAfterSchema>;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const useSpring = (frame: number, delay: number, config = { damping: 200 }) => {
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config });
};

/* ------------------------------------------------------------------ */
/* Composant principal                                                 */
/* ------------------------------------------------------------------ */
export const BeforeAfter: React.FC<Props> = ({
  beforeUrl,
  afterUrl,
  secteur,
  resultLabel,
  ctaLabel,
  ctaPrice,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  /* Wipe progress: démarre frame 30, finit frame 110 (durée 80 frames ≈ 2.7 s) */
  const wipeProgress = interpolate(frame, [30, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* Ligne de séparation diagonale (position X du bord gauche du côté "APRÈS") */
  const wipeX = interpolate(wipeProgress, [0, 1], [0, width]);

  /* Fondu sortie */
  const outro = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: outro }}>

      {/* ---- Fond AVANT (toujours visible, à gauche du wipe) ---- */}
      <AbsoluteFill>
        <BeforePanel url={beforeUrl} />
        {/* Label AVANT */}
        <div style={{
          position: 'absolute',
          top: 120,
          left: 72,
          fontFamily: sansFamily,
          fontWeight: 800,
          fontSize: 52,
          letterSpacing: 8,
          textTransform: 'uppercase',
          color: brand.colors.white,
          opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          textShadow: '0 4px 24px rgba(0,0,0,0.7)',
        }}>
          AVANT
        </div>
      </AbsoluteFill>

      {/* ---- Côté APRÈS (masqué par clip-path qui s'étend) ---- */}
      <AbsoluteFill
        style={{
          clipPath: `polygon(${wipeX}px 0px, ${width}px 0px, ${width}px ${height}px, ${Math.max(0, wipeX - 120)}px ${height}px)`,
        }}
      >
        <AfterPanel url={afterUrl} />
        {/* Label APRÈS */}
        {wipeProgress > 0.08 && (
          <div style={{
            position: 'absolute',
            top: 120,
            right: 72,
            fontFamily: sansFamily,
            fontWeight: 800,
            fontSize: 52,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: brand.colors.accent,
            textShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            APRÈS
          </div>
        )}
      </AbsoluteFill>

      {/* ---- Ligne de séparation (diagonale légèrement inclinée) ---- */}
      {wipeProgress > 0 && wipeProgress < 1 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: wipeX - 6,
          width: 12,
          height: '100%',
          background: brand.colors.accent,
          boxShadow: `0 0 32px 8px ${brand.colors.accent}88`,
          transform: 'skewX(-4deg)',
        }} />
      )}

      {/* ---- Badge résultat (apparaît à mi-wipe) ---- */}
      <Sequence from={110}>
        <ResultBadge label={resultLabel} secteur={secteur} />
      </Sequence>

      {/* ---- CTA bas (apparaît à frame 210) ---- */}
      <Sequence from={210}>
        <CtaBanner ctaLabel={ctaLabel} ctaPrice={ctaPrice} />
      </Sequence>

    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Panneau AVANT                                                       */
/* ------------------------------------------------------------------ */
const BeforePanel: React.FC<{ url: string }> = ({ url }) => (
  <AbsoluteFill style={{ filter: 'saturate(0.25) brightness(0.55) contrast(1.1)' }}>
    {url ? (
      <Img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      /* Placeholder texturé si pas d'image */
      <div style={{
        width: '100%',
        height: '100%',
        backgroundImage: `
          repeating-linear-gradient(45deg, #3D362B 0px, #3D362B 2px, transparent 2px, transparent 20px),
          repeating-linear-gradient(-45deg, #3D362B 0px, #3D362B 2px, transparent 2px, transparent 20px)
        `,
        backgroundColor: '#2A2319',
      }} />
    )}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Panneau APRÈS                                                       */
/* ------------------------------------------------------------------ */
const AfterPanel: React.FC<{ url: string }> = ({ url }) => (
  <AbsoluteFill style={{ filter: 'saturate(1.15) brightness(1.05)' }}>
    {url ? (
      <Img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      /* Placeholder warm si pas d'image */
      <div style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at 40% 40%, #F2B01E22 0%, transparent 60%),
                     linear-gradient(160deg, #FBF9F4 0%, #F2ECE0 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: displayFamily,
          fontWeight: 800,
          fontSize: 72,
          color: brand.colors.accent,
          opacity: 0.3,
          textAlign: 'center',
        }}>
          PHOTO PRO
        </div>
      </div>
    )}
    {/* Vignette douce pour la lisibilité des textes */}
    <AbsoluteFill style={{
      background: `
        linear-gradient(to bottom, rgba(21,18,13,0.55) 0%, transparent 30%),
        linear-gradient(to top, rgba(21,18,13,0.75) 0%, transparent 45%)
      `,
    }} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Badge résultat                                                      */
/* ------------------------------------------------------------------ */
const ResultBadge: React.FC<{ label: string; secteur: string }> = ({ label, secteur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 180 } });
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        backgroundColor: brand.colors.accent,
        borderRadius: 32,
        padding: '40px 56px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        boxShadow: `0 24px 64px rgba(242,176,30,0.55)`,
        border: `4px solid ${brand.colors.ink}`,
      }}>
        <span style={{
          fontFamily: sansFamily,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: brand.colors.ink,
          opacity: 0.7,
        }}>
          Résultat · {secteur}
        </span>
        <span style={{
          fontFamily: displayFamily,
          fontWeight: 800,
          fontSize: 88,
          lineHeight: 1,
          letterSpacing: -2,
          color: brand.colors.ink,
          textAlign: 'center',
        }}>
          {label}
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Bandeau CTA bas                                                     */
/* ------------------------------------------------------------------ */
const CtaBanner: React.FC<{ ctaLabel: string; ctaPrice: string }> = ({
  ctaLabel,
  ctaPrice,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(s, [0, 1], [180, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', padding: 64 }}>
      <div style={{
        transform: `translateY(${y}px)`,
        backgroundColor: brand.colors.ink,
        borderRadius: 40,
        padding: '48px 56px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        {/* Logo Locamaster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 72,
            height: 72,
            backgroundColor: brand.colors.accent,
            borderRadius: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: displayFamily,
            fontWeight: 800,
            fontSize: 42,
            color: brand.colors.ink,
            border: `3px solid rgba(255,255,255,0.15)`,
          }}>
            L
          </div>
          <div>
            <div style={{
              fontFamily: displayFamily,
              fontWeight: 700,
              fontSize: 44,
              letterSpacing: -1,
              color: brand.colors.white,
            }}>
              Locamaster
            </div>
            <div style={{
              fontFamily: sansFamily,
              fontWeight: 400,
              fontSize: 26,
              color: brand.colors.muted,
              marginTop: 4,
            }}>
              {brand.baseline}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div style={{ height: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999 }} />

        {/* Prix + CTA */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: sansFamily,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: brand.colors.accent,
              marginBottom: 8,
            }}>
              {ctaLabel}
            </div>
            <div style={{
              fontFamily: displayFamily,
              fontWeight: 800,
              fontSize: 80,
              lineHeight: 1,
              letterSpacing: -2,
              color: brand.colors.white,
            }}>
              {ctaPrice}
            </div>
          </div>
          {/* Lien site */}
          <div style={{
            fontFamily: sansFamily,
            fontWeight: 600,
            fontSize: 32,
            color: brand.colors.muted,
            textDecoration: 'underline',
            opacity: 0.8,
          }}>
            {brand.site}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
