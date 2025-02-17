import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ existingUser: true });
  } catch (error) {
    console.error("Error in /api/user route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



// import User from "@/models/user";
// import dbConnect from "@/utils/dbConnect";
// import { NextRequest, NextResponse } from "next/server";
// export const POST = async (req:NextRequest)=>{
//     try {
//         await dbConnect();
//         // Check if the email is already registered
//         const {email} = await req.json();
//         const existingUser = await User.findOne({ email });
//         console.log("User",existingUser);
//         return NextResponse.json({existingUser})


//     } catch (error) {
//     if(error instanceof Error)
//     console.log(error.message);  
//    }
// }