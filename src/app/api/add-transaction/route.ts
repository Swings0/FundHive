import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Investment from "@/models/investments";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, type, amount, wallet, dateTime } = await req.json();
    if (!email || !type || !amount || !wallet || !dateTime) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    const investment = await Investment.findOne({ userEmail: email });
    if (!investment) {
      return NextResponse.json({ message: "Investment record not found" }, { status: 404 });
    }
    // Ensure the transactions array exists.
    if (!investment.transactions) {
      investment.transactions = [];
    }
    // Append the new transaction.
    investment.transactions.push({
      type,
      amount,
      wallet,
      dateTime: new Date(dateTime),
    });
    await investment.save();
    return NextResponse.json({ message: "Transaction added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
