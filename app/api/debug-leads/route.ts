import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok:false, error:"Missing Supabase env" }, { status: 500 });
  }
  const db = createClient(url, key);

  // count exact
  const { count, error: countErr } = await db
    .from("leads")
    .select("id", { count: "exact", head: true });

  // sample rows
  const { data: sample, error: dataErr } = await db
    .from("leads")
    .select("id, created_at, name, email, school")
    .order("created_at", { ascending: false })
    .limit(5);

  return NextResponse.json({
    ok: true,
    count: count ?? 0,
    countError: countErr?.message ?? null,
    sample: sample ?? [],
    sampleError: dataErr?.message ?? null,
  });
}