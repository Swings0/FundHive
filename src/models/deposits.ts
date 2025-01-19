import mongoose, { Schema, model, models } from "mongoose";

const DepositSchema = new Schema({
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  profit: { type: Number, required: true }, // Add profit field
  investmentType: { type: String, required: true },
  transactionHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Deposit || model("Deposit", DepositSchema);

