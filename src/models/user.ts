import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    otp?: number;
    otpExpires?: number;
    resetPasswordToken?: string;
    resetPasswordExpires?:Date;
    usdtTrc20Address?:string;
    usdtErc20Address?:string;
    bitcoinAddress?:string;
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