import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import sendEmail from "@/utils/sendEmail";
import deposit from "@/models/deposits";
import { getToken } from "next-auth/jwt";

// Define the structure of the request body
interface DepositRequestBody {
  plan: string;
  amount: number;
  profit?: number; // Optional if calculated on the server
  investmentType: string;
  transactionHash: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const sessionToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!sessionToken?.email) {
      return NextResponse.json({ message: "User is not authenticated." }, { status: 401 });
    }

    const userEmail = sessionToken.email;

    // Parse and validate the request body
    const body: DepositRequestBody = await request.json();
    const { plan, amount, investmentType, transactionHash } = body;

    if (!plan || !amount || !investmentType || !transactionHash) {
      return NextResponse.json(
        { message: "All fields are required: plan, amount, investmentType, transactionHash." },
        { status: 400 }
      );
    }

    // Calculate profit (Example: 10% of the amount)
    const profit = calculateProfit(amount);

    // Save the deposit to the database
    const newDeposit = new deposit({
      plan,
      amount,
      profit,
      investmentType,
      transactionHash,
      email: userEmail
    });

    await newDeposit.save();

    // Send a confirmation email with the current deposit time.
    await sendEmail({
      plan,
      amount,
      investmentType,
      transactionHash,
      email: userEmail,
      depositTime: new Date()
    });

    return NextResponse.json({
      message: "Deposit saved and email sent successfully",
    });
  } catch (error) {
    console.error("Error saving deposit:", error);
    return NextResponse.json(
      { message: "Something went wrong while saving the deposit." },
      { status: 500 }
    );
  }
}

// Helper function to calculate profit
function calculateProfit(amount: number): number {
  const profitPercentage = 0.1; // Example: 10% profit
  return Math.round(amount * profitPercentage * 100) / 100; // Rounded to 2 decimal places
}
