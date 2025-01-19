import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req:NextRequest)=>{
    try {
        await dbConnect();
        // Check if the email is already registered
        const {email} = await req.json();
        const existingUser = await User.findOne({ email });
        console.log("User",existingUser);
        return NextResponse.json({existingUser})


    } catch (error) {
    if(error instanceof Error)
    console.log(error.message);  
   }
}