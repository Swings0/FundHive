import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, accountBalance, accountBalanceUpdateDuration, accountBalanceUpdateUnit } = body;
    if (!email || accountBalance === undefined || accountBalanceUpdateDuration === undefined || accountBalanceUpdateUnit === undefined) {
      return NextResponse.json({ message: "Missing required fields for Process B" }, { status: 400 });
    }
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    let investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      // Create a new record with default Process A fields.
      investment = new Investment({
        userEmail: email,
        userId: email,
        totalDeposit: 0,
        activeDeposit: 0,
        targetActiveDeposit: 0,
        duration: 0,
        durationUnit: "min",
        startTime: new Date(),
        status: "active",
        pendingAccountBalance: Number(accountBalance),
        accountBalanceUpdateDuration: Number(accountBalanceUpdateDuration),
        accountBalanceUpdateUnit,
        accountBalanceUpdateStartTime: new Date(),
        accountBalance: 0,
      });
    } else {
      // Update only Process B fields.
      investment.pendingAccountBalance = Number(accountBalance);
      investment.accountBalanceUpdateDuration = Number(accountBalanceUpdateDuration);
      investment.accountBalanceUpdateUnit = accountBalanceUpdateUnit;
      investment.accountBalanceUpdateStartTime = new Date();
      // Leave Process A fields unchanged.
    }
    await investment.save();
    return NextResponse.json({ message: "Process B investment updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in Process B update-investment API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


  