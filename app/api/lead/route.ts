import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const J = (s:number,b:any)=>NextResponse.json(b,{status:s});

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error("[/api/lead] Missing env",{hasUrl:!!url,hasServiceKey:!!key});
      return J(500,{ok:false,error:"Supabase env missing"});
    }

    const supabase = createClient(url, key);

    const body = await req.json().catch(()=> ({}));
    const { name, school, email, phone, message, source = "web" } = body || {};
    if (!name && !email && !message) return J(400,{ok:false,error:"Invalid payload"});

    const ua = req.headers.get("user-agent") || "";
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const meta = { ua, forwardedFor, source };

    // Try with meta; retry without if the column doesn't exist
    let { data, error } = await supabase.from("leads").insert({
      name: name ?? null,
      school: school ?? null,
      email: email ?? null,
      phone: phone ?? null,
      message: message ?? null,
      meta, // JSONB (optional)
    }).select("id").single();

    if (error && /column.*meta/i.test(error.message)) {
      console.warn("[/api/lead] meta column missing -> retry without it");
      const retry = await supabase.from("leads").insert({
        name: name ?? null,
        school: school ?? null,
        email: email ?? null,
        phone: phone ?? null,
        message: message ?? null,
      }).select("id").single();
      error = retry.error ?? null;
      data  = retry.data ?? null;
    }

    if (error) {
      console.error("[/api/lead] insert error:", error);
      return J(500,{ok:false,error:error.message});
    }

    return J(200,{ok:true,id:data?.id});
  } catch (e:any) {
    console.error("[/api/lead] uncaught:", e);
    return J(500,{ok:false,error:"Server error"});
  }
}