import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, currency, activate, activationDuration, activationUnit } = body;

    if (!email || !currency || activate === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Map currency to internal key.
    let key = "";
    if (currency === "USDT TRC20") key = "USDT_TRC20";
    else if (currency === "USDT ERC20") key = "USDT_ERC20";
    else if (currency === "Bitcoin") key = "Bitcoin";
    else {
      return NextResponse.json({ message: "Invalid currency" }, { status: 400 });
    }

    // When activating, record the current time.
    const settingsUpdate = activate
      ? {
          activated: true,
          activationStartTime: new Date(),
          activationDuration: activationDuration ? parseFloat(activationDuration) : 0,
          activationUnit: activationUnit || "min",
        }
      : {
          activated: false,
          activationStartTime: null,
          activationDuration: 0,
          activationUnit: "min",
        };

    const updateResult = await Investment.updateOne(
      { userEmail: email },
      {
        $set: {
          [`withdrawalActivation.${key}`]: activate,
          [`withdrawalActivationSettings.${key}`]: settingsUpdate,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
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
        pendingWithdrawal: 0,
        withdrawalActivation: { USDT_TRC20: false, USDT_ERC20: false, Bitcoin: false },
        displayWithdrawalStatus: false,
        transactions: [],
      });
      newInvestment.withdrawalActivation[key] = activate;
      newInvestment.withdrawalActivationSettings[key] = settingsUpdate;
      await newInvestment.save();
    }

    return NextResponse.json(
      { message: `Withdrawal activation for ${currency} updated successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating withdrawal activation:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
