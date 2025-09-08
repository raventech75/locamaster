// app/admin/leads/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

/* ---------- Types ---------- */
type Lead = {
  id: string;
  created_at?: string;
  name?: string | null;
  school?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  meta?: any;
};

/* ---------- Page ---------- */
export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  const [dateFrom, setDateFrom] = useState<string>(""); // yyyy-mm-dd
  const [dateTo, setDateTo] = useState<string>("");     // yyyy-mm-dd
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);

  // Chargement initial
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch("/api/leads", { cache: "no-store" });
        const r2 = res.clone();

        let json: any;
        try {
          json = await res.json();
        } catch {
          const txt = await r2.text();
          throw new Error(`Réponse non-JSON (${res.status}) : ${txt?.slice(0, 180) || "vide"}`);
        }

        if (!res.ok) {
          throw new Error(json?.error || `HTTP ${res.status}`);
        }
        setLeads(Array.isArray(json?.leads) ? json.leads : []);
      } catch (e: any) {
        setErr(e.message || "Erreur inconnue");
        setLeads([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    const fromTs = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : -Infinity;
    const toTs = dateTo ? new Date(`${dateTo}T23:59:59.999`).getTime() : Infinity;

    return (leads ?? []).filter((l) => {
      // filtre texte
      if (needle) {
        const haystack = [l.name, l.school, l.email, l.phone, l.message]
          .filter(Boolean)
          .map((v) => String(v).toLowerCase())
          .join(" | ");
        if (!haystack.includes(needle)) return false;
      }
      // filtre date
      const t = l.created_at ? new Date(l.created_at).getTime() : 0;
      return t >= fromTs && t <= toTs;
    });
  }, [leads, q, dateFrom, dateTo]);

  function exportCSV() {
    const rows = [
      ["created_at", "name", "school", "email", "phone", "message"],
      ...filtered.map((l) => [
        l.created_at ?? "",
        l.name ?? "",
        l.school ?? "",
        l.email ?? "",
        l.phone ?? "",
        (l.message ?? "").replace(/\n/g, " "),
      ]),
    ];
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dt = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.href = url;
    a.download = `leads-${dt}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(leadId: string) {
    if (!leadId) return;
    const ok = window.confirm("Supprimer cette demande ? Cette action est définitive.");
    if (!ok) return;

    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok !== true) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      // Optimistic update de la liste + fermeture du panneau si besoin
      setLeads((ls) => ls.filter((l) => l.id !== leadId));
      setSelected((cur) => (cur?.id === leadId ? null : cur));
    } catch (e: any) {
      alert(`Suppression impossible : ${e?.message || "erreur inconnue"}`);
    }
  }

  function handleLogout() {
    window.location.href = "/admin/logout";
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end gap-6 justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Leads (Formspree + Fallback)</h1>
            <p className="text-white/60 text-sm">
              Si Formspree échoue, les demandes sont sauvegardées ici (<code className="text-white/80">leads</code>).
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col">
                <label className="text-xs text-white/60 mb-1">Recherche</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="nom, école, email, tel, message"
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-white/60 mb-1">Du</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-white/60 mb-1">Au</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setQ(""); setDateFrom(""); setDateTo(""); }}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
              >
                Réinitialiser
              </button>
              <button
                onClick={exportCSV}
                className="px-4 py-2 rounded-lg bg-black/80 border border-white/20 hover:bg-black/70"
              >
                Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
                title="Déconnexion"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        {/* Table */}
        <section className="overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <Th>Date</Th>
                  <Th>Nom</Th>
                  <Th>Établissement</Th>
                  <Th>Email</Th>
                  <Th>Téléphone</Th>
                  <Th>Message</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-white/70">
                      Chargement…
                    </td>
                  </tr>
                )}
                {err && !loading && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-red-300">
                      Erreur : {err}
                    </td>
                  </tr>
                )}
                {!loading && !err && filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-white/70">
                      Aucun lead
                    </td>
                  </tr>
                )}
                {filtered.map((l) => (
                  <tr
                    key={l.id}
                    className="border-t border-white/10 hover:bg-white/[.04]"
                  >
                    <Td className="whitespace-nowrap" onClick={() => setSelected(l)}>
                      {formatDateTime(l.created_at)}
                    </Td>
                    <Td onClick={() => setSelected(l)}>{l.name}</Td>
                    <Td onClick={() => setSelected(l)}>{l.school}</Td>
                    <Td onClick={() => setSelected(l)}>
                      {l.email ? (
                        <a href={`mailto:${l.email}`} className="underline hover:text-white" onClick={(e) => e.stopPropagation()}>
                          {l.email}
                        </a>
                      ) : (
                        "-"
                      )}
                    </Td>
                    <Td onClick={() => setSelected(l)}>
                      {l.phone ? (
                        <a href={`tel:${l.phone}`} className="hover:text-white" onClick={(e) => e.stopPropagation()}>
                          {l.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </Td>
                    <Td className="max-w-[420px]">
                      <div className="truncate text-white/90" onClick={() => setSelected(l)}>{l.message}</div>
                    </Td>
                    <Td className="text-right">
                      <button
                        onClick={() => setSelected(l)}
                        className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 hover:bg-white/15 text-xs mr-2"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs"
                      >
                        Supprimer
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Drawer de détail */}
      {selected && (
        <DetailDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onDelete={() => handleDelete(selected.id)}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
}

/* ---------- Composants utilitaires ---------- */

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-4 py-3 font-semibold text-white/80 ${className}`}>{children}</th>;
}
function Td({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <td className={`px-4 py-3 align-top ${onClick ? "cursor-pointer" : ""} ${className}`} onClick={onClick}>
      {children}
    </td>
  );
}

function formatDateTime(iso?: string) {
  try {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso || "—";
  }
}

function buildMailto(lead: Lead) {
  const to = lead.email || "";
  const subject = `Demande d'informations – ${lead.school || "Établissement"} – ${lead.name || ""}`.trim();
  const lines = [
    "Bonjour,",
    "",
    "Je vous contacte suite à votre demande d’informations sur LOCAMASTER.",
    "",
    "Récapitulatif de votre demande :",
    `• Nom : ${lead.name || "—"}`,
    `• Établissement : ${lead.school || "—"}`,
    `• Email : ${lead.email || "—"}`,
    `• Téléphone : ${lead.phone || "—"}`,
    "",
    lead.message ? `Message :\n${lead.message}` : "",
    "",
    "—",
    "LOCAMASTER",
  ].filter(Boolean);
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function formatLeadForCopy(lead: Lead) {
  return [
    `Date: ${formatDateTime(lead.created_at)}`,
    `Nom: ${lead.name || "—"}`,
    `Établissement: ${lead.school || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Téléphone: ${lead.phone || "—"}`,
    `Message: ${lead.message || "—"}`,
  ].join("\n");
}

type FieldProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 items-start">
      <div className="text-white/60">{label}</div>
      <div className="text-white break-words">{children}</div>
    </div>
  );
}

/* ---------- Drawer de détail ---------- */
function DetailDrawer({
  lead,
  onClose,
  onDelete,
  onLogout,
}: {
  lead: Lead;
  onClose: () => void;
  onDelete: () => void;
  onLogout: () => void;
}) {
  const [flash, setFlash] = useState<string>("");

  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function copy(text: string, msg = "Copié !") {
    try {
      await navigator.clipboard.writeText(text);
      setFlash(msg);
      setTimeout(() => setFlash(""), 1200);
    } catch {
      setFlash("Impossible de copier");
      setTimeout(() => setFlash(""), 1500);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Panel */}
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-[560px] bg-[#0d0d0d] border-l border-white/10 z-50 shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header + actions */}
        <header className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Détail du lead</h2>

            <div className="flex flex-wrap gap-2">
              {/* Contacter (mailto) */}
              <a
                href={buildMailto(lead)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-500/25"
              >
                Contacter
              </a>

              {/* Copier email */}
              <button
                onClick={() => lead.email && copy(lead.email, "Email copié")}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 disabled:opacity-40"
                disabled={!lead.email}
              >
                Copier email
              </button>

              {/* Copier téléphone */}
              <button
                onClick={() => lead.phone && copy(lead.phone, "Téléphone copié")}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 disabled:opacity-40"
                disabled={!lead.phone}
              >
                Copier téléphone
              </button>

              {/* Copier tout */}
              <button
                onClick={() => copy(formatLeadForCopy(lead), "Lead copié")}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
              >
                Copier tout
              </button>

              {/* Supprimer */}
              <button
                onClick={onDelete}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white"
              >
                Supprimer
              </button>

              {/* Déconnexion */}
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
                title="Déconnexion"
              >
                Déconnexion
              </button>

              {/* Fermer */}
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
              >
                Fermer
              </button>
            </div>
          </div>

          {/* Flash message */}
          {flash && <div className="mt-3 text-sm text-emerald-300">{flash}</div>}
        </header>

        {/* Body */}
        <div className="p-4 space-y-4 text-sm overflow-auto">
          <Field label="Date">{formatDateTime(lead.created_at)}</Field>
          <Field label="Nom">{lead.name || "—"}</Field>
          <Field label="Établissement">{lead.school || "—"}</Field>
          <Field label="Email">
            {lead.email ? (
              <a href={`mailto:${lead.email}`} className="underline hover:text-white">
                {lead.email}
              </a>
            ) : (
              "—"
            )}
          </Field>
          <Field label="Téléphone">
            {lead.phone ? (
              <a href={`tel:${lead.phone}`} className="hover:text-white">
                {lead.phone}
              </a>
            ) : (
              "—"
            )}
          </Field>
          <Field label="Message">
            <div className="whitespace-pre-wrap text-white/90">{lead.message || "—"}</div>
          </Field>
        </div>
      </aside>
    </>
  );
}