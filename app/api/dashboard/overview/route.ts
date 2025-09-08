// app/api/dashboard/overview/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const days = Math.min(365, Math.max(7, parseInt(url.searchParams.get("days") || "30", 10)));
    const from = daysAgo(days).toISOString();
    const to = new Date().toISOString();

    const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Fallback démo si Supabase non configuré
    if (!SB_URL || !SB_KEY) {
      const gross = 28450;
      return NextResponse.json({
        ok: true,
        note: "Supabase non configuré: données de démonstration",
        range: { from, to },
        totals: {
          gross,
          ordersCount: 392,
          avgCart: 73,
          schoolShare: Math.round(gross * 0.25),
          locamasterShare: Math.round(gross * 0.75),
          growth: 8.4,
        },
        recentOrders: [
          { id: "ord_1", created_at: new Date().toISOString(), customer: "M. Dupont", amount: 129, status: "paid" },
          { id: "ord_2", created_at: new Date().toISOString(), customer: "Mme Bernard", amount: 59, status: "pending" },
        ],
        nextPayouts: [
          { id: "p_1", date: new Date(Date.now() + 3 * 864e5).toISOString(), school: "Collège Jean Moulin", amount: 1450, status: "scheduled" },
        ],
      });
    }

    // Supabase configuré : on lit les données
    const db = createClient(SB_URL, SB_KEY);

    // Table "orders" (adapte si besoin)
    const { data: orders, error: ordErr } = await db
      .from("orders")
      .select("id, created_at, amount, status, customer")
      .gte("created_at", from)
      .lte("created_at", to)
      .order("created_at", { ascending: false })
      .limit(50);

    // Si la table n’existe pas encore → données démo
    if (ordErr && /does not exist/i.test(ordErr.message)) {
      const gross = 28450;
      return NextResponse.json({
        ok: true,
        note: "Tables non trouvées: données de démonstration",
        range: { from, to },
        totals: {
          gross,
          ordersCount: 392,
          avgCart: 73,
          schoolShare: Math.round(gross * 0.25),
          locamasterShare: Math.round(gross * 0.75),
          growth: 8.4,
        },
        recentOrders: [
          { id: "ord_1", created_at: new Date().toISOString(), customer: "M. Dupont", amount: 129, status: "paid" },
          { id: "ord_2", created_at: new Date().toISOString(), customer: "Mme Bernard", amount: 59, status: "pending" },
        ],
        nextPayouts: [
          { id: "p_1", date: new Date(Date.now() + 3 * 864e5).toISOString(), school: "Collège Jean Moulin", amount: 1450, status: "scheduled" },
        ],
      });
    }
    if (ordErr) throw ordErr;

    const gross = (orders || []).reduce((s, o: any) => s + Number(o.amount || 0), 0);
    const ordersCount = orders?.length ?? 0;
    const avgCart = ordersCount ? Math.round(gross / ordersCount) : 0;

    // Optionnel: lire des versements planifiés (table "payouts")
    let nextPayouts: any[] = [];
    const { data: payouts } = await db
      .from("payouts")
      .select("id, date, school, amount, status")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .limit(10);
    if (payouts) nextPayouts = payouts;

    return NextResponse.json({
      ok: true,
      range: { from, to },
      totals: {
        gross,
        ordersCount,
        avgCart,
        schoolShare: Math.round(gross * 0.25),
        locamasterShare: Math.round(gross * 0.75),
        growth: 0,
      },
      recentOrders: (orders || []).slice(0, 10).map((o: any) => ({
        id: o.id,
        created_at: o.created_at,
        customer: o.customer,
        amount: Number(o.amount || 0),
        status: (o.status || "paid") as "paid" | "pending" | "refunded" | "failed",
      })),
      nextPayouts,
    });
  } catch (e: any) {
    console.error("[/api/dashboard/overview] error:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}