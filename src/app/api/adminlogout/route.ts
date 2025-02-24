import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("admin-token", "", {
    path: "/adminpage",
    expires: new Date(0),
  });
  return response;
}
