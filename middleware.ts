// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "./lib/firebaseAdmin";

export const config = {
  matcher: ["/((?!_next|api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();

  // 🔹 Case 1: visiting `/` (login page)
  if (request.nextUrl.pathname === "/") {
    if (!session) {
      return NextResponse.next(); // not logged in → show login
    }

    try {
      const decoded = await adminAuth.verifySessionCookie(session, true);

      // redirect based on role
      if (decoded.role === "admin") {
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
      } else if (decoded.role === "user") {
        url.pathname = "/startup/report";
        return NextResponse.redirect(url);
      }

      return NextResponse.next(); // no role → stay at login
    } catch {
      return NextResponse.next(); // invalid cookie → stay at login
    }
  }

  // 🔹 Case 2: all other routes (protected)
  if (!session) {
    url.pathname = "/";
    return NextResponse.redirect(url); // not logged in → back to login
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);

    // ✅ protect role-specific routes
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      decoded.role !== "admin"
    ) {
      url.pathname = "/startup/report";
      return NextResponse.redirect(url);
    }

    if (
      request.nextUrl.pathname.startsWith("/startup") &&
      decoded.role !== "user"
    ) {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // allow access
  } catch {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

// // middleware.ts
// import { NextResponse } from "next/server";

// export function middleware() {
//   return NextResponse.next();
// }
