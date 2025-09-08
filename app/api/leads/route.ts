import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ok  = (data:any)=>NextResponse.json(data,{status:200});
const err = (m:string,s=500)=>NextResponse.json({leads:[],error:m},{status:s});

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return err("Missing Supabase env vars");

    const db = createClient(url, key);
    const { data, error } = await db
      .from("leads")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(500);

    if (error) { console.error("[/api/leads] supabase error:", error); return err(error.message); }
    return ok({leads:data??[]});
  } catch (e:any) {
    console.error("[/api/leads] uncaught:", e);
    return err("Unexpected server error");
  }
}