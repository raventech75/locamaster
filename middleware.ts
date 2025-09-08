// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Helper: décodage base64 compatible Edge + Node (dev) */
function decodeBase64(b64: string): string {
  // atob est dispo en Edge; fallback Node pour le dev local si besoin
  // @ts-ignore
  if (typeof atob === "function") return atob(b64);
  // eslint-disable-next-line n/no-deprecated-api
  return Buffer.from(b64, "base64").toString("utf-8");
}

/**
 * Middleware d’auth Basic pour /admin et /dashboard
 * - Ne bloque PAS les routes /api/*
 * - Utilise atob (Edge-safe), fallback Buffer en dev
 * - Supporte mots de passe contenant ":" (on joine le reste)
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Laisse passer toutes les API (important pour le front)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Ce bloc reprend ton idée initiale "protéger uniquement l'admin"
  // mais comme le matcher inclut /dashboard (voir export config ci-dessous),
  // on protège bien /admin ET /dashboard ici.
  const expectedUser = process.env.ADMIN_USER ?? "";
  const expectedPass = process.env.ADMIN_PASS ?? "";

  // Si les identifiants ne sont pas configurés, renvoyer un 401 explicite
  if (!expectedUser || !expectedPass) {
    return new NextResponse("Admin credentials not set", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
    // (Ce comportement correspond à ton premier bloc.)
  }

  // Header Authorization: "Basic base64(user:pass)"
  const auth = req.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
    // (Conforme à tes deux blocs.)
  }

  let decoded = "";
  try {
    decoded = decodeBase64(encoded);
  } catch {
    return new NextResponse("Invalid auth header", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  // Le mot de passe peut contenir ":" -> on join le reste (conforme à ton 1er bloc)
  const [user, ...passParts] = decoded.split(":");
  const pass = passParts.join(":");

  // Validation
  if (user === expectedUser && pass === expectedPass) {
    return NextResponse.next();
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

/**
 * Matcher : protège /admin/* ET /dashboard/* (comme dans ton 2e bloc),
 * en évitant toute duplication d'exports.
 */
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};