import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export const GET = async (req: Request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      referrals: user.referrals || 0,
      activeReferrals: user.activeReferrals || 0,
    });
  } catch (error) {
    console.error("Error fetching referral data", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.referrals = (user.referrals || 0) + 1;
    await user.save();

    return NextResponse.json({ referrals: user.referrals });
  } catch (error) {
    console.error("Error updating referrals", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
