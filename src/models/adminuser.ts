import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  activeDeposit: { type: Number, default: 0 }, // Default to 0
  // Other fields...
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
