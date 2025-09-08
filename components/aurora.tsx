// components/aurora.tsx
import * as React from "react";

/** --------- Panneau de base avec bord Aurora --------- */
export function AuroraPanel({
  children,
  className = "",
  surfaceClassName = "bg-black/80",
}: {
  children: React.ReactNode;
  className?: string;
  surfaceClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] ring-1 ring-white/10 ${className}`}>
      {/* Bord dégradé animé (dépend des classes CSS déjà ajoutées) */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] aurora-border" />
      {/* Surface interne */}
      <div className={`relative ${surfaceClassName}`}>{children}</div>
    </div>
  );
}

/** --------- Section prête à l’emploi (title, subtitle, actions) --------- */
export function AuroraPanelSection({
  title,
  subtitle,
  actions,
  children,
  className = "",
  surfaceClassName = "bg-black/80",
  center = true,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  surfaceClassName?: string;
  center?: boolean;
}) {
  return (
    <AuroraPanel className={className} surfaceClassName={surfaceClassName}>
      <div className={`px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-8 ${center ? "text-center" : ""}`}>
        {(title || subtitle || actions) && (
          <header className={`flex flex-col ${center ? "items-center" : ""} gap-3 mb-6`}>
            {typeof title === "string" ? (
              <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            ) : (
              title
            )}
            {subtitle && (
              <p className="text-white/70 max-w-2xl">{subtitle}</p>
            )}
            {actions && <div className="mt-1">{actions}</div>}
          </header>
        )}

        {children}
      </div>
    </AuroraPanel>
  );
}

/** --------- Mini “Chip” réassurance --------- */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="chip">
      {children}
    </span>
  );
}