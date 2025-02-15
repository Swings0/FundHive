import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

export async function GET() {
  // Disallow GET requests for this endpoint.
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, currency, activate } = body;

    if (!email || !currency || activate === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // First, find the user by email.
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Define the mapping between the currency string and the document key.
    let key = "";
    if (currency === "USDT TRC20") key = "USDT_TRC20";
    else if (currency === "USDT ERC20") key = "USDT_ERC20";
    else if (currency === "Bitcoin") key = "Bitcoin";
    else {
      return NextResponse.json(
        { message: "Invalid currency" },
        { status: 400 }
      );
    }

    // Update only the specific field using $set.
    const updateResult = await Investment.updateOne(
      { userEmail: email },
      { $set: { [`withdrawalActivation.${key}`]: activate } }
    );

    // If no document was updated, you might want to create one.
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
        withdrawalActivation: { USDT_TRC20: false, USDT_ERC20: false, Bitcoin: false },
      });
      newInvestment.withdrawalActivation[key] = activate;
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
