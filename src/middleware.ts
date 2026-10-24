import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "dkdc_session";
const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  "dkdancecompany_jwt_secret_key_32chars_long!";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Clone headers to inject security headers
  const response = NextResponse.next();

  // 1. Strict Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // 2. Admin Route Protection
  const isAdminPath = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminPath) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    let isAuthenticated = false;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, secretKey);
        if (payload?.username && payload?.role === "admin") {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    // If on /admin/login and already authenticated, redirect to /admin dashboard
    if (isLoginPage && isAuthenticated) {
      const dashboardUrl = new URL("/admin", req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // If trying to access any other /admin route without valid auth, redirect to login
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      // Clear any invalid/expired session cookie
      redirectResponse.cookies.delete(COOKIE_NAME);
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/uploadthing (UploadThing webhook / SSE callbacks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    "/((?!api/uploadthing|_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
