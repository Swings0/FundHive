// src/app/api/clear-user-balance/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Clear numeric balance on user document if field exists.
    // Use a defensive check in case schema differs: set only if field exists on doc or just set to 0.
    try {
      // set user account balance to 0 (best-effort)
      // If your User schema doesn't have accountBalance, this still won't crash Mongoose.
      (user as any).accountBalance = 0;
      await user.save();
    } catch (err) {
      console.warn("Warning: could not update User.accountBalance", err);
      // continue to attempt clearing investment
    }

    // Clear balances on Investment document if it exists
    const investment = await Investment.findOne({ userEmail: email });
    if (investment) {
      investment.accountBalance = 0;
      investment.pendingAccountBalance = 0;
      investment.totalDeposit = 0;
      investment.activeDeposit = 0;
      investment.targetActiveDeposit = 0;
      investment.pendingWithdrawal = 0;
      // If you want to reset any other derived fields you can add them here.
      await investment.save();
    }

    return NextResponse.json({ message: "User balance(s) cleared successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error clearing user balance:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
