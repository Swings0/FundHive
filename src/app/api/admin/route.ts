import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;  // Token from environment variable
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Authorized" }, { status: 200 });
}

