import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ message: "Logged out" });
  // Remove the admin-token cookie by setting it to an empty string with an expiration in the past.
  response.cookies.set("admin-token", "", {
    path: "/adminpage",
    expires: new Date(0),
  });
  return response;
}
