import mongoose from "mongoose";

const ProfitSchema = new mongoose.Schema({
  targetAmount: { type: Number, required: true }, // Target profit amount
  currentAmount: { type: Number, required: true, default: 0 }, // Current profit
  duration: { type: Number, required: true }, // Duration in milliseconds
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.models.Profit || mongoose.model("Profit", ProfitSchema);
