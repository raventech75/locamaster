/**
 * Charte Locamaster — synchronisée avec le site (tailwind.config.mjs)
 * Utilisée par toutes les compositions Remotion pour garder la cohérence.
 */
export const brand = {
  colors: {
    bg: '#FBF9F4',
    surface: '#F2ECE0',
    ink: '#15120D',
    ink2: '#3D362B',
    muted: '#857B6A',
    accent: '#F2B01E',
    accentDark: '#7A5A06',
    white: '#FFFFFF',
  },
  fonts: {
    display: 'Bricolage Grotesque',
    sans: 'Inter',
  },
  site: 'locamaster.fr',
  baseline: 'Branding, photo & vidéo · Île-de-France',
} as const;
