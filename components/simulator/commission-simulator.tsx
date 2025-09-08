"use client";

import { useMemo, useState } from "react";

/** ------------------- PAGE ------------------- */
export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero (garde seulement ton existant, supprime le doublon si tu en avais 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-3xl border shadow-xl overflow-hidden bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-600 text-white">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              LOCAMASTER — 25% de commission, 100% d’excellence
            </h1>
            <p className="mt-3 text-white/90 max-w-2xl">
              La photo scolaire réinventée par des photographes événementiels haut de gamme.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/dashboard" className="px-4 py-2 rounded-xl bg-white text-black font-medium">
                Accéder au dashboard
              </a>
              <a href="#simulateur" className="px-4 py-2 rounded-xl bg-white/10 border border-white/30 hover:bg-white/15">
                Calculer vos gains
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Simulateur sous le hero */}
      <section
        id="simulateur"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <CommissionSimulatorRedesign />
      </section>
    </main>
  );
}

/** ------------------- SIMULATEUR ------------------- */
function CommissionSimulatorRedesign() {
  const [students, setStudents] = useState(800);
  const [ordersRate, setOrdersRate] = useState(0.7);
  const [avgCart, setAvgCart] = useState(35);
  const [competitorRate, setCompetitorRate] = useState(0.08);

  const gross = useMemo(() => Math.round(students * ordersRate * avgCart), [students, ordersRate, avgCart]);
  const ours = Math.round(gross * 0.25);
  const theirs = Math.round(gross * competitorRate);
  const gain = ours - theirs;

  return (
    <section className="rounded-3xl border shadow-xl overflow-hidden">
      {/* Bandeau titre avec même dégradé que le hero */}
      <div className="bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-600 p-6 md:p-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Votre établissement gagne <span className="text-emerald-200">plus</span> avec LOCAMASTER
        </h2>
      </div>

      {/* Comparatif */}
      <div className="bg-gradient-to-br from-[#0b1220] via-[#141018] to-[#0b0b0b] p-8 md:p-10 text-white">
        <div className="grid md:grid-cols-3 gap-8 items-stretch text-center">
          {/* CA total */}
          <CardGlass>
            <p className="text-sm text-white/70 uppercase">Chiffre d’affaires total</p>
            <p className="text-4xl md:text-5xl font-extrabold mt-2 tabular-nums">{gross.toLocaleString("fr-FR")} €</p>
          </CardGlass>

          {/* Concurrents vs LOCAMASTER */}
          <div className="grid grid-cols-2 gap-6">
            <CardWhite>
              <p className="text-sm text-gray-500 uppercase">Concurrents</p>
              <p className="text-3xl md:text-4xl font-bold mt-2 tabular-nums text-black">
                {theirs.toLocaleString("fr-FR")} €
              </p>
              <span className="text-xs text-gray-400 mt-1">~{(competitorRate * 100).toFixed(1)}%</span>
            </CardWhite>
            <CardEmerald>
              <p className="text-sm text-white/80 uppercase">LOCAMASTER</p>
              <p className="text-3xl md:text-4xl font-extrabold mt-2 tabular-nums">
                {ours.toLocaleString("fr-FR")} €
              </p>
              <span className="text-xs text-white/70 mt-1">25%</span>
            </CardEmerald>
          </div>

          {/* Gain */}
          <CardGain>
            <p className="text-sm text-emerald-400 uppercase">Gain supplémentaire</p>
            <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 mt-2 tabular-nums">
              + {gain.toLocaleString("fr-FR")} €
            </p>
            <span className="text-xs text-white/70 mt-1">pour vos projets pédagogiques</span>
          </CardGain>
        </div>

        {/* Sliders */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <Slider label="Élèves photographiés" min={50} max={5000} value={students} onChange={setStudents} />
          <Slider label="Taux de commande" min={0.1} max={1} step={0.01} value={ordersRate} onChange={setOrdersRate} percent />
          <Slider label="Panier moyen (€)" min={10} max={50} step={1} value={avgCart} onChange={setAvgCart} euro />
          <Slider label="Taux concurrent" min={0.05} max={0.1} step={0.005} value={competitorRate} onChange={setCompetitorRate} percent />
        </div>

        <p className="mt-6 text-center text-white/70 text-sm">
          LOCAMASTER reverse <strong>25%</strong> au lieu de <strong>5–10%</strong> habituellement. Aucun coût pour l’établissement.
        </p>
      </div>
    </section>
  );
}

/** ------------------- UI helpers ------------------- */
function CardGlass({ children }: { children: React.ReactNode }) {
  return <div className="bg-white/10 rounded-2xl p-6 flex flex-col justify-center backdrop-blur">{children}</div>;
}
function CardWhite({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl p-6 flex flex-col justify-center items-center text-black">{children}</div>;
}
function CardEmerald({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl p-6 flex flex-col justify-center items-center text-white">
      {children}
    </div>
  );
}
function CardGain({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black rounded-2xl border border-emerald-400 p-6 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (n: number) => void;
  percent?: boolean;
  euro?: boolean;
};

function Slider({ label, min, max, step = 1, value, onChange, percent = false, euro = false }: SliderProps) {
  const display = percent ? `${(value * 100).toFixed(0)}%` : euro ? `${value.toFixed(0)} €` : value;
  const leftLabel = percent ? `${(min * 100).toFixed(0)}%` : euro ? `${min} €` : min;
  const rightLabel = percent ? `${(max * 100).toFixed(0)}%` : euro ? `${max} €` : max;

  return (
    <label className="grid gap-2 text-white/90">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-400"
      />
      <div className="flex justify-between text-xs text-white/70">
        <span>{leftLabel}</span>
        <span className="font-semibold">{display}</span>
        <span>{rightLabel}</span>
      </div>
    </label>
  );
}