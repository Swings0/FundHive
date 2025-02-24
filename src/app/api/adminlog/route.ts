import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Ensure ADMIN_TOKEN is defined.
    if (!process.env.ADMIN_TOKEN) {
      throw new Error("Missing environment variable: ADMIN_TOKEN");
    }
    // Since we have checked, we can assert the token is a string.
    const token = process.env.ADMIN_TOKEN;
    const response = NextResponse.json({ token });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use production secure setting
      path: "/adminpage", // Restrict cookie to admin routes
      maxAge: 60 * 60 * 24, // e.g., 1 day
    });
    return response;
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
