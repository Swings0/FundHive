import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await dbConnect();
    const investment = await Investment.findOne({ userEmail: email, status: "active" });
    if (!investment) {
      return NextResponse.json({ message: "No active investment found for this user" }, { status: 404 });
    }

    const now = new Date();
    const startTime = new Date(investment.startTime);
    const endTime = new Date(startTime.getTime() + investment.duration * 24 * 60 * 60 * 1000);

    if (now >= endTime) {
      // Complete the investment cycle
      investment.activeDeposit = 0;
      investment.totalDeposit = 0;
      investment.accountBalance = (investment.accountBalance || 0) + investment.profit;
      investment.status = "completed";
      await investment.save();
      return NextResponse.json({ message: "Investment cycle completed, profit credited." }, { status: 200 });
    }

    return NextResponse.json({ message: "Investment still in progress." }, { status: 200 });
  } catch (error) {
    console.error("Error in investmen-tracker API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
