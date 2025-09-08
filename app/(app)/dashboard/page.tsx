// app/(app)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
      <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
    </svg>
  );
}
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" x2="12" y1="15" y2="3"></line>
    </svg>
  );
}
function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}
function ArrowDownRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="7" x2="17" y2="17"></line>
      <polyline points="17 7 7 7 7 17"></polyline>
    </svg>
  );
}


/* ---------- Types ---------- */
type OverviewResponse = {
  ok?: boolean;
  range: { from: string; to: string };
  totals: {
    gross: number;
    ordersCount: number;
    avgCart: number;
    schoolShare: number;
    locamasterShare: number;
    growth?: number;
  };
  recentOrders: Array<{
    id: string;
    created_at: string;
    customer?: string;
    amount: number;
    status: "paid" | "pending" | "refunded" | "failed";
  }>;
  nextPayouts: Array<{
    id: string;
    date: string;
    school: string;
    amount: number;
    status: "scheduled" | "paid" | "onhold";
  }>;
  note?: string;
};

/* ---------- Page ---------- */
export default function DashboardOverviewPage() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/overview?days=${days}`, { cache: "no-store" });
      const json: OverviewResponse = await res.json();
      if (!res.ok || json?.ok === false) throw new Error((json as any)?.error || `HTTP ${res.status}`);
      setData(json);
    } catch (e: any) {
      setError(e?.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [days]);

  const k = data?.totals;
  const growth = k?.growth ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Aperçu</h1>
          <p className="text-white/70 text-sm">Vue synthétique des {days} derniers jours.</p>
        </div>
        <div className="flex items-center gap-2">
          <RangePill days={days} setDays={setDays} v={7} />
          <RangePill days={days} setDays={setDays} v={30} />
          <RangePill days={days} setDays={setDays} v={90} />
          <button onClick={load} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
  <RefreshIcon className="h-4 w-4" /> Actualiser
</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Chiffre d’affaires" value={fmt(k?.gross)} delta={growth} />
        <KpiCard label="Commandes" value={k?.ordersCount?.toLocaleString("fr-FR") ?? "—"} />
        <KpiCard label="Panier moyen" value={fmt(k?.avgCart)} />
        <KpiCard label="Part établissement (25%)" value={fmt(k?.schoolShare)} accent="emerald" />
      </div>

      {/* Graph placeholders */}
      <div className="grid md:grid-cols-2 gap-4">
        <GraphCard title="Évolution du CA">
          <PlaceholderChart note="Brancher plus tard: séries quotidiennes Supabase/Stripe" />
        </GraphCard>
        <GraphCard title="Répartition des revenus">
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="LOCAMASTER (75%)" value={fmt(k?.locamasterShare)} />
            <MiniStat label="Établissements (25%)" value={fmt(k?.schoolShare)} />
            <div className="col-span-2 text-white/60 text-xs">Basé sur la période sélectionnée.</div>
          </div>
        </GraphCard>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-4">
        <TableCard
          title="Dernières commandes"
          actions={<a href="/dashboard/orders" className="text-sm text-white/80 underline">Voir tout</a>}
          columns={["Date", "Client", "Montant", "Statut"]}
          rows={(data?.recentOrders ?? []).map(o => [
            formatDateTime(o.created_at),
            o.customer ?? "—",
            fmt(o.amount),
            <StatusPill key={o.id} status={o.status} />,
          ])}
          empty="Aucune commande récente."
        />
        <TableCard
          title="Prochains versements"
          actions={<a href="/dashboard/commissions" className="text-sm text-white/80 underline">Détails</a>}
          columns={["Date", "Établissement", "Montant", "Statut"]}
          rows={(data?.nextPayouts ?? []).map(p => [
            formatDate(p.date),
            p.school,
            fmt(p.amount),
            <PayoutPill key={p.id} status={p.status} />,
          ])}
          empty="Aucun versement planifié."
        />
      </div>

      {/* Export */}
      <div className="flex items-center justify-end">
        <a
          href={`/api/dashboard/export?days=${days}`}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
        >
          <DownloadIcon className="h-4 w-4" /> Export CSV (période)
        </a>
      </div>

      {loading && <div className="text-white/70 text-sm">Chargement…</div>}
      {error && <div className="text-red-400 text-sm">Erreur : {error}</div>}
      {data?.note && <div className="text-white/60 text-xs">{data.note}</div>}
    </div>
  );
}

/* ---------- UI smalls ---------- */
function RangePill({ days, setDays, v }: { days: number; setDays: (n: number) => void; v: number }) {
  const active = days === v;
  return (
    <button
      onClick={() => setDays(v)}
      className={`rounded-lg px-3 py-2 text-sm border ${active ? "border-white/30 bg-white/10" : "border-white/15 bg-white/5 hover:bg-white/10"}`}
    >
      {v} j
    </button>
  );
}

function KpiCard({ label, value, delta, accent }: { label: string; value: string; delta?: number; accent?: "emerald" | "none" }) {
  const pos = (delta ?? 0) >= 0;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
      <div className="text-white/70 text-xs uppercase">{label}</div>
      <div className="mt-1 text-2xl font-extrabold tabular-nums">{value}</div>
      {typeof delta === "number" && (
        <div className={`mt-1 inline-flex items-center gap-1 text-xs ${pos ? "text-emerald-400" : "text-red-400"}`}>
          {pos ? <ArrowUpRightIcon className="h-3.5 w-3.5" /> : <ArrowDownRightIcon className="h-3.5 w-3.5" />}
          {pos ? "+" : ""}{delta.toFixed(1)}%
        </div>
      )}
      {accent === "emerald" && <div className="mt-3 h-1.5 w-full rounded bg-emerald-500/30"><div className="h-1.5 w-2/3 rounded bg-emerald-400" /></div>}
    </div>
  );
}

function GraphCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-3 h-[240px] rounded-xl border border-white/10 bg-black/20 grid place-items-center">
        {children}
      </div>
    </div>
  );
}

function PlaceholderChart({ note }: { note?: string }) {
  return (
    <div className="text-center text-white/60 text-xs">
      <div className="mb-2">📈 Graphique à brancher</div>
      {note && <div>{note}</div>}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[.04] p-3">
      <div className="text-xs text-white/70">{label}</div>
      <div className="text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}

function TableCard({
  title, actions, columns, rows, empty,
}: {
  title: string;
  actions?: React.ReactNode;
  columns: string[];
  rows: React.ReactNode[][];
  empty: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">{title}</div>
        {actions}
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/60">
              {columns.map((c) => <th key={c} className="py-2 pr-3 font-medium">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="py-6 text-white/60">{empty}</td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="border-t border-white/10">
                  {r.map((cell, j) => <td key={j} className="py-2 pr-3">{cell}</td>)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "paid" | "pending" | "refunded" | "failed" }) {
  const map = {
    paid: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    pending: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    refunded: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    failed: "bg-red-500/20 text-red-300 border-red-400/30",
  } as const;
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${map[status]}`}>{status}</span>;
}

function PayoutPill({ status }: { status: "scheduled" | "paid" | "onhold" }) {
  const map = {
    scheduled: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
    paid: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    onhold: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  } as const;
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${map[status]}`}>{status}</span>;
}

/* ---------- utils ---------- */
function fmt(n?: number) {
  if (typeof n !== "number") return "—";
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}
function formatDateTime(s: string) {
  const d = new Date(s);
  return d.toLocaleString("fr-FR");
}
function formatDate(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString("fr-FR");
}