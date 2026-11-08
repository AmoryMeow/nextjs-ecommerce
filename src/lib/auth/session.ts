import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/auth/token";

/** Sets the session cookie. Call only from a Server Action. */
export async function createSession(): Promise<void> {
  const token = await signSession({ role: "admin" });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // Over HTTPS only in production; localhost runs on plain HTTP.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Removes the session cookie. Call only from a Server Action. */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Reads and verifies the current session. Returns null for guests. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value);
}

function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/**
 * Compares the password with ADMIN_PASSWORD in constant time,
 * so response timing doesn't reveal how many characters matched.
 */
export function isValidAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not set. See .env.example.");
  }
  return timingSafeEqual(sha256(password), sha256(expected));
}
