import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      return NextResponse.json({ error: "Investment record not found" }, { status: 404 });
    }

    // Clear pendingWithdrawal.
    investment.pendingWithdrawal = 0;
    await investment.save();

    return NextResponse.json({ message: "Pending withdrawal cleared successfully" });
  } catch (error) {
    console.error("Error clearing pending withdrawal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
