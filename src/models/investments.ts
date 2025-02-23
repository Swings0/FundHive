import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction {
  type: string;
  amount: number;
  wallet: string;
  dateTime: Date;
}

export interface IInvestment extends Document {
  userEmail: string;
  userId: string;
  totalDeposit: number;
  activeDeposit: number;
  targetActiveDeposit: number;
  duration: number;
  durationUnit: 'min' | 'hour' | 'day';
  startTime: Date;
  status: 'active' | 'completed';
  pendingAccountBalance: number;
  accountBalanceUpdateDuration: number;
  accountBalanceUpdateUnit: 'min' | 'hour' | 'day';
  accountBalanceUpdateStartTime: Date;
  accountBalance: number;
  withdrawalActivation: {
    USDT_TRC20: boolean;
    USDT_ERC20: boolean;
    Bitcoin: boolean;
  };
  pendingWithdrawal: number;
  displayWithdrawalStatus: boolean;
  // New transactions field:
  transactions: ITransaction[];
  // Existing withdrawal status fields (if used)
  withdrawalStatusHeader?: string;
  withdrawalStatusMessage?: string;
  withdrawalStatusButtonText?: string;
  withdrawalStatusHidden?: boolean;
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
  withdrawalActivation: {
    type: Object,
    required: true,
    default: { USDT_TRC20: false, USDT_ERC20: false, Bitcoin: false },
  },
  pendingWithdrawal: { type: Number, required: true, default: 0 },
  displayWithdrawalStatus: { type: Boolean, default: false },
  transactions: {
    type: [
      {
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        wallet: { type: String, required: true },
        dateTime: { type: Date, required: true },
      },
    ],
    default: [],
  },
  withdrawalStatusHeader: { type: String, default: "" },
  withdrawalStatusMessage: { type: String, default: "" },
  withdrawalStatusButtonText: { type: String, default: "" },
  withdrawalStatusHidden: { type: Boolean, default: false },
});

export default mongoose.models.Investment ||
  mongoose.model<IInvestment>('Investment', InvestmentSchema);
