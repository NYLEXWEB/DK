import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { AuthSession } from "@/types";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dkdancecompany_jwt_fallback_secret_32chars_min";
const secretKey = new TextEncoder().encode(JWT_SECRET);
export const COOKIE_NAME = "dkdc_session";

// Rate limiting in-memory store: IP -> attempts timestamp array
const loginAttempts = new Map<string, number[]>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = loginAttempts.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    loginAttempts.set(ip, recent);
    return false; // Rate limit exceeded
  }

  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}

export async function createSessionToken(username: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const token = await new SignJWT({
    username,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secretKey);

  return token;
}

export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      username: payload.username as string,
      role: payload.role as "admin",
      exp: payload.exp as number,
      iat: payload.iat as number,
    };
  } catch {
    return null;
  }
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function verifyRequestAuth(req: NextRequest): Promise<AuthSession | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function validateCredentials(username: string, pass: string): boolean {
  const configuredUser = process.env.ADMIN_USERNAME || "admin";
  const configuredPass = process.env.ADMIN_PASSWORD || "dkdc@admin2025";

  return username === configuredUser && pass === configuredPass;
}
