import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const masked = url ? url.replace(/^https?:\/\//, "").slice(0, 22) + "…" : "";
  return NextResponse.json({
    ok: true,
    supabaseUrl: masked,           // pour vérifier que c'est le bon projet
    hasAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}