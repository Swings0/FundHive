import { NextRequest, NextResponse } from 'next/server';
import { updateActiveDeposits, updateAccountBalanceUpdates } from '@/lib/update_active_deposit';

export async function GET(req: NextRequest) {
  try {
    await updateActiveDeposits();
    await updateAccountBalanceUpdates();
    return NextResponse.json({ message: 'Investments updated successfully.' });
  } catch (error) {
    console.error('Error updating investments:', error);
    return NextResponse.json({ message: 'Error updating investments.' }, { status: 500 });
  }
}
