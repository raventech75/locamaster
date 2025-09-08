// app/api/leads/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SB_URL || !SB_KEY) {
      return NextResponse.json(
        { ok: false, error: "Supabase non configuré côté serveur" },
        { status: 500 }
      );
    }

    const db = createClient(SB_URL, SB_KEY);

    // 1) Tentative de suppression en traitant l'id comme chaîne (UUID le plus souvent)
    const { data: d1, error: e1 } = await db
      .from("leads")
      .delete()
      .eq("id", params.id)
      .select("id"); // <= on récupère les lignes supprimées

    if (e1) throw e1;

    let removedCount = Array.isArray(d1) ? d1.length : 0;

    // 2) Si rien supprimé ET que l'id ressemble à un nombre, re-tente en number
    if (removedCount === 0 && /^\d+$/.test(params.id)) {
      const { data: d2, error: e2 } = await db
        .from("leads")
        .delete()
        // @ts-ignore — si votre schéma a id:number, sinon ce bloc ne s’exécute pas
        .eq("id", Number(params.id))
        .select("id");

      if (e2) throw e2;
      removedCount = Array.isArray(d2) ? d2.length : 0;
    }

    if (removedCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Lead introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, removed: removedCount });
  } catch (e: any) {
    console.error("[DELETE /api/leads/[id]]", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}