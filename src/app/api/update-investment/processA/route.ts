import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, totalDeposit, activeDeposit, duration, durationUnit } = body;
    // Here, activeDeposit is used as the target value for Process A.
    if (!email || totalDeposit === undefined || activeDeposit === undefined || duration === undefined || durationUnit === undefined) {
      return NextResponse.json({ message: "Missing required fields for Process A" }, { status: 400 });
    }
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    let investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      // Create new record; for Process B we set default values.
      investment = new Investment({
        userEmail: email,
        userId: email,
        totalDeposit: Number(totalDeposit),
        activeDeposit: 0,
        targetActiveDeposit: Number(activeDeposit),
        duration: Number(duration),
        durationUnit,
        startTime: new Date(),
        status: "active",
        pendingAccountBalance: 0, 
        accountBalanceUpdateDuration: 0,
        accountBalanceUpdateUnit: "min",
        accountBalanceUpdateStartTime: new Date(),
        accountBalance: 0,
      });
    } else {
      // Update only Process A fields.
      investment.totalDeposit = Number(totalDeposit);
      investment.targetActiveDeposit = Number(activeDeposit);
      investment.activeDeposit = 0; // Restart Process A.
      investment.duration = Number(duration);
      investment.durationUnit = durationUnit;
      investment.startTime = new Date();
      investment.status = "active";
      // Leave Process B fields unchanged.
    }
    await investment.save();
    return NextResponse.json({ message: "Process A investment updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in Process A update-investment API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

