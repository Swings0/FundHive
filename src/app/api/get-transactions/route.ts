import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    await dbConnect();
    const investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      return NextResponse.json({ message: "No investment record found" }, { status: 404 });
    }
    return NextResponse.json({ transactions: investment.transactions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
