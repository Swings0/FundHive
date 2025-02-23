import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, displayStatus } = body;
    if (!email || displayStatus === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    await dbConnect();
    // Ensure the user exists.
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // Update the displayWithdrawalStatus field.
    const updateResult = await Investment.updateOne(
      { userEmail: email },
      { $set: { displayWithdrawalStatus: displayStatus } }
    );
    if (updateResult.matchedCount === 0) {
      // If no document exists, create one with defaults.
      const newInvestment = new Investment({
        userEmail: email,
        userId: email,
        totalDeposit: 0,
        activeDeposit: 0,
        targetActiveDeposit: 0,
        duration: 0,
        durationUnit: "min",
        startTime: new Date(),
        status: "active",
        pendingAccountBalance: 0,
        accountBalanceUpdateDuration: 0,
        accountBalanceUpdateUnit: "min",
        accountBalanceUpdateStartTime: new Date(),
        accountBalance: 0,
        withdrawalActivation: { USDT_TRC20: false, USDT_ERC20: false, Bitcoin: false },
        pendingWithdrawal: 0,
        displayWithdrawalStatus: displayStatus,
        withdrawalActivationSettings: {
          USDT_TRC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
          USDT_ERC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
          Bitcoin: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
        },
      });
      await newInvestment.save();
    }
    return NextResponse.json(
      { message: `Display withdrawal status set to ${displayStatus}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating display withdrawal status:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
