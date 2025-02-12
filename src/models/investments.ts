import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestment extends Document {
  userEmail: string;
  userId: string;
  totalDeposit: number;          // Process A: deposit amount
  activeDeposit: number;         // Process A: current active deposit (increments from 0 to targetActiveDeposit)
  targetActiveDeposit: number;   // Process A: target value for active deposit increment
  duration: number;              // Process A: duration for active deposit increment
  durationUnit: 'min' | 'hour' | 'day'; // Process A: unit for active deposit duration
  startTime: Date;               // Process A start time
  status: 'active' | 'completed';
  // Process B fields:
  pendingAccountBalance: number; // The new account balance entered by admin
  accountBalanceUpdateDuration: number; // Process B: duration delay for updating the account balance
  accountBalanceUpdateUnit: 'min' | 'hour' | 'day'; // Process B: unit for account balance update delay
  accountBalanceUpdateStartTime: Date; // Process B start time
  accountBalance: number;        // Final account balance (displayed only after Process B completes)
}

const InvestmentSchema: Schema = new Schema({
  userEmail: { type: String, required: true },
  userId: { type: String, required: true },
  totalDeposit: { type: Number, required: true },
  activeDeposit: { type: Number, required: true, default: 0 },
  targetActiveDeposit: { type: Number, required: true },
  duration: { type: Number, required: true },
  durationUnit: { type: String, enum: ['min', 'hour', 'day'], required: true },
  startTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  pendingAccountBalance: { type: Number, required: true, default: 0 },
  accountBalanceUpdateDuration: { type: Number, required: true },
  accountBalanceUpdateUnit: { type: String, enum: ['min', 'hour', 'day'], required: true },
  accountBalanceUpdateStartTime: { type: Date, default: Date.now },
  accountBalance: { type: Number, required: true, default: 0 },
});

export default mongoose.models.Investment ||
  mongoose.model<IInvestment>('Investment', InvestmentSchema);

