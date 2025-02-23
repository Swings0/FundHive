import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import { updateActiveDeposits, updateAccountBalanceUpdates } from "@/lib/update_active_deposit";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Update investments on-demand.
    await updateActiveDeposits();
    await updateAccountBalanceUpdates();

    const investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      return NextResponse.json({ message: "No investment found for this user" }, { status: 404 });
    }

    // Map internal withdrawal activation to UI-friendly keys.
    const withdrawalActivation = {
      "USDT TRC20": investment.withdrawalActivation?.USDT_TRC20 ?? false,
      "USDT ERC20": investment.withdrawalActivation?.USDT_ERC20 ?? false,
      "Bitcoin": investment.withdrawalActivation?.Bitcoin ?? false,
    };

    const output = {
      accountBalance: investment.accountBalance,
      pendingWithdrawal: investment.pendingWithdrawal,
      withdrawalActivation,
      withdrawalActivationSettings: investment.withdrawalActivationSettings,
      displayWithdrawalStatus: investment.displayWithdrawalStatus,
      // NEW: include the withdrawal status display fields
      withdrawalStatusHeader: investment.withdrawalStatusHeader || "",
      withdrawalStatusMessage: investment.withdrawalStatusMessage || "",
      withdrawalStatusButtonText: investment.withdrawalStatusButtonText || "",
      withdrawalStatusHidden: investment.withdrawalStatusHidden || false,
      activeDeposit: investment.activeDeposit,
      totalDeposit: investment.totalDeposit,
      targetActiveDeposit: investment.targetActiveDeposit,
      status: investment.status,
    };

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error("Error in getuser-investment API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Investment from "@/models/investments";

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const email = url.searchParams.get('email');

//     if (!email) {
//       return NextResponse.json({ message: "Email is required" }, { status: 400 });
//     }

//     await dbConnect();
//     const investment = await Investment.findOne({ userEmail: email });

//     if (!investment) {
//       return NextResponse.json({ message: "No investment found for this user" }, { status: 404 });
//     }

//     return NextResponse.json(investment, { status: 200 });
//   } catch (error) {
//     console.error("Error in getuser-investment API:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

