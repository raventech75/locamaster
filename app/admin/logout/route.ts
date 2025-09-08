// app/admin/logout/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Pour la plupart des navigateurs, renvoyer un 401 avec un realm
  // force l’oubli du couple user/pass pour ce domaine/chemin.
  return new NextResponse("Déconnecté", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area (logout)", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}