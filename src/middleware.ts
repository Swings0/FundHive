import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // Clone URL to reuse
  const adminToken = request.cookies.get("admin-token")?.value;

  if (!process.env.ADMIN_TOKEN || !process.env.NEXTAUTH_SECRET) {
    console.error("Missing environment variables: ADMIN_TOKEN or NEXTAUTH_SECRET");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const sessionToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = url.pathname.startsWith("/adminpage");

  if (isAdminRoute) {
    if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
      console.warn("Unauthorized access attempt to admin route.");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/withdrawal",
    "/transactions",
    "/deposit",
    "/referals",
    "/earnings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtectedRoute && sessionToken) {
    const currentTime = Date.now();
    
    // Ensure lastActive is a number
    const lastActive = typeof sessionToken.lastActive === 'number' ? sessionToken.lastActive : currentTime;

    if (currentTime - lastActive > 800000) { // 10-minute timeout
      console.warn("Session expired due to inactivity.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    sessionToken.lastActive = currentTime; // Update lastActive timestamp
  } else if (isProtectedRoute && !sessionToken) {
    console.warn("Unauthorized access attempt to user route.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/withdrawal/:path*",
    "/transactions/:path*",
    "/deposit/:path*",
    "/referals/:path*",
    "/earnings/:path*",
  ],
};
