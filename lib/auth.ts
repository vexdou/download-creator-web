import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "__Host-vexdou_admin";
const SESSION_SECONDS = 60 * 60 * 12;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  }
  return secret;
}

function base64url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createAdminSession(): string {
  const payload = JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
    nonce: randomBytes(16).toString("hex"),
  });
  const encoded = base64url(payload);
  return `${encoded}.${sign(encoded)}`;
}

export function verifyAdminSession(token?: string): boolean {
  if (!token) return false;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;

  const encoded = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  try {
    const expected = sign(encoded);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);

    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return Number.isFinite(payload.exp) && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSession(store.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}
