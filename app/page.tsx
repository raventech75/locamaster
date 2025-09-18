"use client";

import { useMemo, useState } from "react";
import HeroAuroraSection from "@/components/hero-aurora";
import { AuroraPanelSection, Chip } from "@/components/aurora";
import { supabaseBrowser } from "@/lib/supabase-browser";

/** ------------------- PAGE ------------------- */
export default function LandingPage() {
  return (
    <main className="min-h-screen relative text-white">
      {/* Images en fond avec flou et ajustement responsive */}
      <div className="absolute inset-0 z-0"
           style={{
             backgroundImage: 'url(/images/Gemini1.png), url(/images/Gemini2.png)',
             backgroundPosition: 'center center',
             backgroundSize: 'cover', // Assure que l'image couvre toute la surface sans distorsion
             filter: 'blur(8px)',
             backgroundRepeat: 'no-repeat',
             height: '100%',
           }}>
      </div>

      {/* Contenu principal avec fond semi-transparent pour améliorer la lisibilité */}
      <div className="relative z-10 bg-black/50 min-h-screen">
        {/* HERO réutilisable (fond confiné + CTA premium) */}
        <HeroAuroraSection
          chips={
            <>
              <Chip>Commission 25%</Chip>
              <Chip>Zéro coût établissement</Chip>
              <Chip>RGPD & galeries sécurisées</Chip>
            </>
          }
        />

        {/* Simulateur (panneau Aurora cohérent) */}
        <section id="simulateur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CommissionSimulator />
        </section>

        {/* Témoignages */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Testimonials />
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FAQ />
        </section>

        {/* CTA final (Formspree) */}
        <section className="bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-600 py-16">
          <FinalCTA />
        </section>

        <Footer />
      </div>
    </main>
  );
}

/** ------------------- Simulateur premium (AuroraPanelSection) ------------------- */
function CommissionSimulator() {
  const [students, setStudents] = useState(800);
  const [ordersRate, setOrdersRate] = useState(0.7);
  const [avgCart, setAvgCart] = useState(35);
  const [competitorRate, setCompetitorRate] = useState(0.08);

  const gross = useMemo(() => Math.round(students * ordersRate * avgCart), [students, ordersRate, avgCart]);
  const ours = Math.round(gross * 0.25);
  const theirs = Math.round(gross * competitorRate);
  const gain = ours - theirs;

  return (
    <AuroraPanelSection
      title={
        <>
          Votre établissement gagne <span className="text-emerald-300">plus</span> avec LOCAMASTER
        </>
      }
      subtitle="Ajustez les paramètres pour visualiser la part LOCAMASTER (25%) vs concurrents (5–10%)."
      actions={
        <div className="flex flex-wrap justify-center gap-2">
          <Chip>Commission 25%</Chip>
          <Chip>Zéro coût</Chip>
          <Chip>Transparence totale</Chip>
        </div>
      }
    >
      {/* Sliders */}
      <div className="grid md:grid-cols-2 gap-6">
        <SliderRow
          label={`Élèves photographiés : ${students}`}
          min={50}
          max={5000}
          value={students}
          onChange={setStudents}
          accent="accent-emerald-400"
        />
        <SliderRow
          label={`Taux de commande : ${(ordersRate * 100).toFixed(0)}%`}
          min={0.1}
          max={1}
          step={0.01}
          value={ordersRate}
          onChange={setOrdersRate}
          accent="accent-pink-400"
        />
        <SliderRow
          label={`Panier moyen (€) : ${avgCart} €`}
          min={10}
          max={50}
          step={1}
          value={avgCart}
          onChange={setAvgCart}
          accent="accent-indigo-400"
        />
        <SliderRow
          label={`Taux concurrent : ${(competitorRate * 100).toFixed(1)}%`}
          min={0.05}
          max={0.1}
          step={0.005}
          value={competitorRate}
          onChange={setCompetitorRate}
          accent="accent-amber-400"
        />
      </div>

      {/* KPIs */}
      <div className="mt-8 grid md:grid-cols-4 gap-6 text-center">
        <KpiGlass title="Chiffre d’affaires total" value={gross} />
        <KpiWhite title="Concurrents" value={theirs} />
        <KpiEmerald title="LOCAMASTER" value={ours} />
        <KpiGain title="Gain supplémentaire" value={gain} />
      </div>

      {/* Trustline */}
      <div className="mt-6 text-center text-sm text-white/60">
        LOCAMASTER reverse <span className="text-white">25%</span> du CA généré — acteurs traditionnels :{" "}
        <span className="text-white">5–10%</span>. Aucun coût pour l’établissement.
      </div>
    </AuroraPanelSection>
  );
}

/** ------------------- UI helpers ------------------- */
function SliderRow({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  accent,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (n: number) => void;
  accent: string;
}) {
  return (
    <label className="block">
      <span className="text-sm text-white/80">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full ${accent}`}
      />
    </label>
  );
}

function KpiGlass({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white/10 rounded-3xl p-6">
      <p className="text-sm text-white/70">{title}</p>
      <p className="text-3xl font-bold tabular-nums">{value.toLocaleString("fr-FR")} €</p>
    </div>
  );
}
function KpiWhite({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-3xl p-6 text-black shadow-[0_10px_30px_rgba(0,0,0,.35)]">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold tabular-nums">{value.toLocaleString("fr-FR")} €</p>
    </div>
  );
}
function KpiEmerald({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-emerald-500 rounded-3xl p-6 text-white">
      <p className="text-sm">{title}</p>
      <p className="text-3xl font-bold tabular-nums">{value.toLocaleString("fr-FR")} €</p>
    </div>
  );
}
function KpiGain({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-black border border-emerald-400 rounded-3xl p-6">
      <p className="text-sm text-emerald-400">{title}</p>
      <p className="text-3xl font-bold text-emerald-400 tabular-nums">+ {value.toLocaleString("fr-FR")} €</p>
    </div>
  );
}

/** ------------------- Témoignages ------------------- */
function Testimonials() {
  const items = [
    {
      name: "Mme De Montmorency",
      role: "Directrice d'école",
      text: "Grâce à LOCAMASTER, nous avons financé une sortie scolaire en un seul shooting. Transparence et qualité au rendez-vous.",
    },
    {
      name: "M. Wu",
      role: "Parent d'élève",
      text: "Les photos sont magnifiques, rien à voir avec les photos scolaires habituelles. On a eu envie de tout acheter.",
    },
    {
      name: "Mme Yanez",
      role: "Professeure principale",
      text: "Un vrai souffle artistique dans la photo scolaire. Les élèves étaient fiers de leurs portraits.",
    },
  ];
  return (
    <div className="bg-black/40 bg-opacity-70 p-6 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Ils nous font confiance</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="bg-white/10 p-6 rounded-2xl shadow flex flex-col">
            <p className="text-white/90 italic">“{t.text}”</p>
            <div className="mt-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-white/70">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ------------------- FAQ ------------------- */
function FAQ() {
  const faqs = [
    {
      q: "Comment fonctionne le partage de commission ?",
      a: "LOCAMASTER reverse 25% du chiffre d’affaires généré directement à l’établissement, contre 5–10% chez les acteurs traditionnels.",
    },
    {
      q: "Quid du RGPD et des mineurs ?",
      a: "Toutes nos plateformes sont 100% conformes RGPD. Les galeries sont protégées par des codes uniques et sécurisés.",
    },
    {
      q: "L’établissement doit-il avancer des frais ?",
      a: "Aucun coût, aucun risque. Tout est pris en charge par LOCAMASTER.",
    },
  ];
  return (
    <div className="bg-black/40 bg-opacity-70 p-6 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Questions fréquentes</h2>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white/10 p-6 rounded-2xl">
            <p className="font-semibold text-white">{f.q}</p>
            <p className="mt-2 text-white/80">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ------------------- CTA final (Formspree) ------------------- */
function FinalCTA() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  // ⚠️ Mets ton vrai ID Formspree
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgboddq";

  // Helper pour éviter de bloquer l'UI en cas de délai sur Formspree
  function withTimeout<T>(p: Promise<T>, ms = 6000): Promise<T> {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error("timeout")), ms);
      p.then((v) => {
        clearTimeout(t);
        resolve(v);
      }).catch((e) => {
        clearTimeout(t);
        reject(e);
      });
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: (fd.get("name") as string) || "",
      school: (fd.get("school") as string) || "",
      email: (fd.get("email") as string) || "",
      phone: (fd.get("phone") as string) || "",
      message: (fd.get("message") as string) || "",
      source: "website",
    };

    // Envoi Formspree avec timeout
    const sendFormspree = withTimeout(
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      }),
      6000
    ).catch(() => null);

    // Enregistrement dans Supabase (ou autre base)
    const sendSupabase = fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok || j?.ok !== true) {
          console.warn("[/api/lead] response", r.status, j);
          // surface the message in UI
          throw new Error(j?.error || `HTTP ${r.status}`);
        }
        return true;
      });

    // Attendre les deux
    try {
      const [fsRes, sbRes] = await Promise.allSettled([sendFormspree, sendSupabase]);

      const supabaseOk =
        sbRes.status === "fulfilled" && (sbRes.value as any)?.ok === true;
      const formspreeOk =
        fsRes.status === "fulfilled" && (fsRes.value as any)?.ok !== false;

      if (supabaseOk || formspreeOk) {
        setStatus("ok");
        setMessage("Merci ! Votre demande a bien été enregistrée.");
        form.reset();
        return;
      }

      setStatus("error");
      setMessage("Impossible d’envoyer votre demande. Réessayez un peu plus tard.");
    } catch {
      setStatus("error");
      setMessage("Erreur réseau. Réessayez plus tard.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
        Prêts à révolutionner vos photos scolaires ?
      </h2>
      <p className="text-white/90 text-center mb-8">
        Laissez-nous vos coordonnées — on vous répond sous 24h.
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-white/5 backdrop-blur rounded-2xl p-8 grid gap-5 text-white shadow-lg border border-white/10"
      >
        {/* Honeypot anti-bot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid md:grid-cols-2 gap-5">
          <label className="grid gap-1">
            <span className="text-sm text-white/90">Nom et Prénom</span>
            <input
              name="name"
              required
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none"
              placeholder="Ex. Marie Dupont"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-white/90">Établissement</span>
            <input
              name="school"
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none"
              placeholder="Ex. Collège Jean Moulin"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <label className="grid gap-1">
            <span className="text-sm text-white/90">Email</span>
            <input
              type="email"
              name="email"
              required
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none"
              placeholder="nom@domaine.fr"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-white/90">Téléphone</span>
            <input
              name="phone"
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none"
              placeholder="06 12 34 56 78"
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm text-white/90">Votre message</span>
          <textarea
            name="message"
            rows={4}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none"
            placeholder="Parlez-nous de votre besoin…"
          />
        </label>

             <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" name="consent" required className="size-4 accent-emerald-400" />
          J’accepte d’être contacté(e) par LOCAMASTER (conforme RGPD).
        </label>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-black/80 border border-white/20 text-white font-semibold hover:bg-black/70 disabled:opacity-60"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Envoi…" : "Demander des informations"}
          </button>
          {message && (
            <span className={`text-sm ${status === "ok" ? "text-emerald-300" : "text-red-300"}`}>{message}</span>
          )}
        </div>

        <input type="hidden" name="_subject" value="Nouvelle demande d’informations LOCAMASTER" />
        <input type="hidden" name="_template" value="table" />
      </form>

      <p className="text-xs text-white/60 mt-4 text-center">
        Vos données ne sont jamais revendues. Vous pouvez demander leur suppression à tout moment.
      </p>
    </div>
  );
}

/** ------------------- Footer ------------------- */
function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/10 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-white/70 text-sm">
        <p>© {new Date().getFullYear()} LOCAMASTER. Tous droits réservés.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/mentions-legales" className="hover:text-white">Mentions légales</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}