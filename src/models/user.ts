import mongoose from "mongoose";

export interface IUser extends Document {
    name: String;
    email: String;
    password: String;
    phone: String;
    otp?: Number;
    otpExpires?: Number;
    resetPasswordToken?: String;
    resetPasswordExpires?:Date;
    usdtTrc20Address?:String;
    usdtErc20Address?:String;
    bitcoinAddress?:String;
    registrationDate?:Date

  }
  

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },

    country: {
        type: String,
    },

    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    usdtTrc20Address:{
        type: String
    },
    usdtErc20Address:{
        type: String
    },
    bitcoinAddress:{
        type: String
    },
    fullname: {
        type: String,
    },
    registrationDate: {
        type: Date, 
        default: Date.now
     },

},{timestamps:true})

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;

// usdtTrc20Address,
// usdtErc20Address,
// bitcoinAddress,