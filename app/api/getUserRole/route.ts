// app/api/getUserRole/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get("session")?.value;
    if (!session) return NextResponse.json({ role: null });

    const decoded = await adminAuth.verifySessionCookie(session, true);
    return NextResponse.json({ role: decoded.role || null });
  } catch {
    return NextResponse.json({ role: null });
  }
}
