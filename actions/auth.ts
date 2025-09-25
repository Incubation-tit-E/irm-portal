"use server";

import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function createSession(idToken: string) {
  const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "session",
    value: sessionCookie,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn / 1000,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "session",
    value: "",
    maxAge: 0,
    path: "/",
  });
}

export async function getUserRole() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return { role: null, error: "Not logged in" };
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    return { role: decoded.role || null };
  } catch (err) {
    return { role: null, error: "Invalid session" };
  }
}
