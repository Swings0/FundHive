import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/user";


export async function GET(req:Request){
    try {
        await dbConnect();
        const userId = req.headers.get('user-id')
        if (!userId){
            return NextResponse.json({error: "user ID is required"}, {status:400})
        }


        const user = await User.findById(userId).select('-password, -otp, -otpExpires, -resetPasswordToken, -resetPasswordExpires').lean();

        if (!user){
            return NextResponse.json({error: "User not found"}, {status:404})
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user data', error);
        return NextResponse.json({error: 'Internal server error'}, {status:500})
        
    }
}







