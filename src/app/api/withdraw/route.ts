import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, amount, withdrawAll } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      return NextResponse.json({ error: "Investment record not found" }, { status: 404 });
    }
    let withdrawAmt: number;
    if (withdrawAll) {
      withdrawAmt = investment.accountBalance;
      if (withdrawAmt < 200) {
        return NextResponse.json(
          { error: "Withdrawal amount cannot be lower than $200" },
          { status: 400 }
        );
      }
    } else {
      if (amount === undefined) {
        return NextResponse.json({ error: "Amount is required" }, { status: 400 });
      }
      if (amount > investment.accountBalance) {
        return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
      }
      if (amount < 200) {
        return NextResponse.json(
          { error: "Withdrawal amount cannot be lower than $200" },
          { status: 400 }
        );
      }
      withdrawAmt = amount;
    }

    // Use atomic $inc update to subtract from accountBalance and add to pendingWithdrawal.
    const updatedInvestment = await Investment.findOneAndUpdate(
      { userEmail: email },
      {
        $inc: { 
          accountBalance: -withdrawAmt,
          pendingWithdrawal: withdrawAmt,
        },
      },
      { new: true }
    );

    if (!updatedInvestment) {
      return NextResponse.json({ error: "Failed to update investment" }, { status: 500 });
    }

    return NextResponse.json({ message: "Withdrawal processed successfully" });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
