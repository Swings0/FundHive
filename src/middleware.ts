import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const adminToken = request.cookies.get("admin-token")?.value;

  if (!process.env.ADMIN_TOKEN || !process.env.NEXTAUTH_SECRET) {
    console.error("Missing environment variables: ADMIN_TOKEN or NEXTAUTH_SECRET");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Missing environment variables: ADMIN_EMAIL or ADMIN_PASSWORD");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For user routes, we still get the NextAuth token.
  const sessionToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = url.pathname.startsWith("/adminpage");

  if (isAdminRoute) {
    // For admin routes, require a valid admin-token cookie.
    if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
      console.warn("Unauthorized access attempt to admin route.");
      return NextResponse.redirect(new URL("/adminlogin", request.url));
    }
    // Inactivity logout for admin routes has been removed.
  } else {
    const protectedRoutes = [
      "/dashboard",
      "/profile",
      "/withdrawal",
      "/transactions",
      "/deposit",
      "/referals",
      "/earnings",
      "/withdrawal-status",
      "/withdraw",
      "/system-bill",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      url.pathname.startsWith(route)
    );

    if (isProtectedRoute && sessionToken) {
      const currentTime = Date.now();
      const lastActive =
        typeof sessionToken.lastActive === "number" ? sessionToken.lastActive : currentTime;
      if (currentTime - lastActive > 800000) { // 10-minute timeout for user routes
        console.warn("User session expired due to inactivity.");
        return NextResponse.redirect(new URL("/login", request.url));
      }
      sessionToken.lastActive = currentTime;
    } else if (isProtectedRoute && !sessionToken) {
      console.warn("Unauthorized access attempt to user route.");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/adminpage/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/withdrawal/:path*",
    "/transactions/:path*",
    "/deposit/:path*",
    "/referals/:path*",
    "/earnings/:path*",
    "/withdrawal-status/:path*",
    "/withdraw/:path*",
    "/system-bill/:path*",
  ],
};
