// components/hero-aurora.tsx
"use client";

import { motion } from "framer-motion";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type Props = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  chips?: React.ReactNode;
  imageUrl?: string;
};

export default function HeroAuroraSection({
  title = <>LOCAMASTER</>,
  subtitle = "La photo scolaire réinventée par des photographes événementiels haut de gamme.",
  ctaHref = "/dashboard",
  ctaLabel = "Accéder au dashboard",
  chips,
  imageUrl = "/fond.png",
}: Props) {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_12px_60px_rgba(0,0,0,.45)]">
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] aurora-border" />

        {/* Fond */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-hero-pan will-change-transform"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              filter: "brightness(0.3) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-black/85 mix-blend-multiply" />
        </div>

        {/* Contenu */}
        <div className="relative px-6 py-24 sm:px-12 md:px-16 text-center">
          {/* Nom LOCAMASTER */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl"
          >
            {title}
          </motion.h1>

          {/* Phrase d’accroche */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Chips éventuels */}
          {chips && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {chips}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <a href={ctaHref} className="cta-aurora group">
              <span className="cta-aurora__ring" />
              <span className="cta-aurora__glow" />
              <span className="relative z-10 cta-aurora__body">
                <span className="mr-2">{ctaLabel}</span>
                <ArrowRightIcon className="inline-block h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="shine absolute inset-0 rounded-2xl" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}