import { NextResponse } from "next/server";
import { adminCookieOptions, createAdminSession } from "../../../../lib/auth";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const current = attempts.get(ip);

  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 0, resetAt: now + WINDOW_MS });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password?: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    console.error("ADMIN_PASSWORD is not configured.");
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 500 }
    );
  }

  if (!password || password.length > 256 || password !== configuredPassword) {
    const item = attempts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };
    item.count += 1;
    attempts.set(ip, item);
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  attempts.delete(ip);

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    process.env.NODE_ENV === "production"
      ? "__Host-vexdou_admin"
      : "vexdou_admin",
    createAdminSession(),
    adminCookieOptions()
  );

  return response;
}
