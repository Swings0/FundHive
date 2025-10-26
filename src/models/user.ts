import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  // phone: string;
  otp?: string;
  fullname: string;
  otpExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  usdtTrc20Address?: string;
  usdtErc20Address?: string;
  bitcoinAddress?: string;
  registrationDate?: Date;
  referrals: number;
  activeReferrals: number;
  referral?: mongoose.Schema.Types.ObjectId;
  isVerified: boolean;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    country: {
      type: String,
    },
    otp: {
      type: String,
      defualt: null,
    },
    otpExpires: {
      type: Date,
    },
    otpExpiresAt: {
      type: Date,
      default: null, 
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    usdtTrc20Address: {
      type: String,
    },
    usdtErc20Address: {
      type: String,
    },
    bitcoinAddress: {
      type: String,
    },
    fullname: {
      type: String,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    referrals: {
      type: Number,
      default: 0,
    },
    activeReferrals: {
      type: Number,
      default: 0,
    },
    referral: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;


// usdtTrc20Address,
// usdtErc20Address,
// bitcoinAddress,