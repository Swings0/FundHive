import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";
import User from "@/models/user";

interface WithdrawalStatusUpdate {
  withdrawalStatusHidden: boolean;
  withdrawalStatusHeader?: string;
  withdrawalStatusMessage?: string;
  withdrawalStatusButtonText?: string;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, header, message, buttonText, hidden } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Ensure the user exists.
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Retrieve the existing investment document.
    const investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      // If no document exists, create one with all fields.
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
        displayWithdrawalStatus: false,
        withdrawalStatusHeader: header || "",
        withdrawalStatusMessage: message || "",
        withdrawalStatusButtonText: buttonText || "",
        withdrawalStatusHidden: hidden,
      });
      await newInvestment.save();
      return NextResponse.json({ message: "Withdrawal status created." }, { status: 200 });
    }

    // Build the update object using a proper type.
    const updateData: WithdrawalStatusUpdate = {
      withdrawalStatusHidden: hidden,
    };
    if (header !== undefined) updateData.withdrawalStatusHeader = header;
    if (message !== undefined) updateData.withdrawalStatusMessage = message;
    if (buttonText !== undefined) updateData.withdrawalStatusButtonText = buttonText;

    await Investment.updateOne({ userEmail: email }, { $set: updateData });
    return NextResponse.json({ message: "Withdrawal status updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error updating withdrawal status:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}





// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Investment from "@/models/investments";
// import User from "@/models/user";

// export async function GET() {
//   return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
// }

// export async function POST(req: Request) {
//   try {
//     await dbConnect();
//     const { email, header, message, buttonText, hidden } = await req.json();
//     if (!email || header === undefined || message === undefined || buttonText === undefined) {
//       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//     }
//     // Ensure the user exists.
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//     const updateData: any = {
//       withdrawalStatusHeader: header,
//       withdrawalStatusMessage: message,
//       withdrawalStatusButtonText: buttonText,
//     };
//     if (hidden !== undefined) {
//       updateData.withdrawalStatusHidden = hidden;
//     }
//     const updateResult = await Investment.updateOne(
//       { userEmail: email },
//       { $set: updateData }
//     );
//     if (updateResult.matchedCount === 0) {
//       const newInvestment = new Investment({
//         userEmail: email,
//         userId: email,
//         totalDeposit: 0,
//         activeDeposit: 0,
//         targetActiveDeposit: 0,
//         duration: 0,
//         durationUnit: "min",
//         startTime: new Date(),
//         status: "active",
//         pendingAccountBalance: 0,
//         accountBalanceUpdateDuration: 0,
//         accountBalanceUpdateUnit: "min",
//         accountBalanceUpdateStartTime: new Date(),
//         accountBalance: 0,
//         withdrawalActivation: { USDT_TRC20: false, USDT_ERC20: false, Bitcoin: false },
//         pendingWithdrawal: 0,
//         displayWithdrawalStatus: false,
//         withdrawalActivationSettings: {
//           USDT_TRC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
//           USDT_ERC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
//           Bitcoin: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
//         },
//         withdrawalStatusHeader: header,
//         withdrawalStatusMessage: message,
//         withdrawalStatusButtonText: buttonText,
//         withdrawalStatusHidden: hidden || false,
//       });
//       await newInvestment.save();
//     }
//     return NextResponse.json(
//       { message: "Withdrawal status updated successfully." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating withdrawal status:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
