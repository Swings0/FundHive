// import { NextRequest, NextResponse } from 'next/server';
// import { updateActiveDeposits, updateAccountBalanceUpdates } from '@/lib/update_active_deposit';

// export async function GET(_req: NextRequest) {
//   void _req

//   const authHeader = _req.headers.get('Authorization') || '';
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }
  
//   try {
//     await updateActiveDeposits();
//     await updateAccountBalanceUpdates();
//     return NextResponse.json({ message: 'Investments updated successfully.' });
//   } catch (error) {
//     console.error('Error updating investments:', error);
//     return NextResponse.json({ message: 'Error updating investments.' }, { status: 500 });
//   }
// }
