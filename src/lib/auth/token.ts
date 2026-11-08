import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "session";

/** Admin sessions last 8 hours. */
export const SESSION_MAX_AGE = 60 * 60 * 8;

export type SessionPayload = {
  role: "admin";
};

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. See .env.example.");
  }
  return new TextEncoder().encode(secret);
}

/** Creates a signed token (JWT). Anyone can read it, but nobody can forge it without the secret. */
export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
}

/**
 * Checks the signature and expiry. Returns null for a missing, forged or expired token.
 * Has no `server-only` import so that proxy.ts can use it too.
 */
export async function verifySession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin" ? { role: "admin" } : null;
  } catch {
    return null;
  }
}
