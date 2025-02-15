'use client'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Define a type for the allowed currency keys.
type Currency = "USDT TRC20" | "USDT ERC20" | "Bitcoin";
const currencies: Currency[] = ["USDT TRC20", "USDT ERC20", "Bitcoin"];

const Page = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState('');
  const [investment, setInvestment] = useState<{
    accountBalance: number;
    withdrawalActivation: { [key in Currency]: boolean };
  }>({
    accountBalance: 0,
    withdrawalActivation: {
      "USDT TRC20": false,
      "USDT ERC20": false,
      Bitcoin: false,
    },
  });

  // Fetch the investment data once the session is available.
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchInvestment = async () => {
      try {
        const response = await axios.get(`/api/getuser-investment?email=${session.user.email}`);
        const inv = response.data;
        // Ensure withdrawalActivation exists.
        if (!inv.withdrawalActivation) {
          inv.withdrawalActivation = {
            "USDT TRC20": false,
            "USDT ERC20": false,
            Bitcoin: false,
          };
        }
        setInvestment({
          accountBalance: inv.accountBalance,
          withdrawalActivation: inv.withdrawalActivation,
        });
        setError('');
        console.log('Fetched investment:', response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          // If no investment record is found, set defaults.
          setInvestment({
            accountBalance: 0,
            withdrawalActivation: {
              "USDT TRC20": false,
              "USDT ERC20": false,
              Bitcoin: false,
            },
          });
        } else {
          console.error('Error fetching investment data:', err);
          setError('Error fetching investment data');
        }
      }
    };

    fetchInvestment();
    const intervalId = setInterval(fetchInvestment, 5000);
    return () => clearInterval(intervalId);
  }, [session]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="h-full bg-gray-50">
      <Layout username={session?.user?.name || ''}>
        <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2  mt-[-20px] overflow-hidden">
          {/* Header Card */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Active Withdrawal</h1>
            <div className="flex flex-col sm:flex-row justify-around items-center border-t border-b border-gray-200 py-4">
              <div className="text-center mb-4 sm:mb-0">
                <p className="text-gray-600 text-sm">Active Balance</p>
                <p className="text-3xl font-bold text-gray-900">${investment.accountBalance.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Pending Withdrawal</p>
                <p className="text-3xl font-bold text-gray-900">$0.00</p>
              </div>
            </div>
          </div>

          {/* Withdrawal Details Table */}
          <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2  mt-[-20px] overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Header Row */}
                <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
                  <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                    Processing
                  </span>
                  <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                    Available
                  </span>
                  <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                    Pending
                  </span>
                  <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">
                    Account
                  </span>
                </div>
                {/* Data Rows */}
                {currencies.map((currency) => (
                  <div
                    key={currency}
                    className="flex justify-between items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="w-1/4 text-center text-xs sm:text-sm text-gray-700">
                      {currency}
                    </span>
                    <span className="w-1/4 text-center text-xs sm:text-sm text-green-600 font-medium">
                      {investment.withdrawalActivation[currency]
                        ? `$${investment.accountBalance.toFixed(2)}`
                        : '$0.00'}
                    </span>
                    <span className="w-1/4 text-center text-xs sm:text-sm text-red-500 font-medium">
                      $0.00
                    </span>
                    <span className="w-1/4 text-center">
                      {investment.withdrawalActivation[currency] ? (
                        <Link href="/withdraw">
                          <button className="bg-blue-600 glass hover:bg-blue-700 text-white px-2 py-1 rounded-lg text-xs sm:text-sm transition">
                            Withdraw
                          </button>
                        </Link>
                      ) : (
                        <span className="text-blue-600 text-xs sm:text-sm">Not Set</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* "No funds" Message */}
          {investment.accountBalance === 0 && (
            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-500">You have no funds to withdraw.</p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-center text-red-500">
              {error}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;







// 'use client'
// import React from 'react'
// import Layout from '../components/Layout'

// const Page = () => {
//   return (
//     <div className='h-full'>
//     <Layout username='Swings'>
//         <div className='w-full bg-white rounded-sm shadow-sm shadow-gray-200 lg:p-6 md:p-6 p-4 mt-[-20px]'>
//           <div className='flex flex-col gap-1'>
//             <h1 className='flex font-medium text-md text-gray-600 lg:mb-8 md:mb-8 mb-6'>Active Withdrawel</h1>
//             <div className='flex lg:gap-0 md:gap-0 gap-16 text-sm text-slate-500 justify-between border-t border-gray-100 p-1 whitespace-nowrap '><p>Active Balance</p> <p className='font-semibold mr-36'>$0.00</p></div>
//             <div className='flex lg:gap-0 md:gap-0 gap-6 text-sm text-slate-500 justify-between border-t border-gray-100 p-1 whitespace-nowrap '><p>Pending Withdrawel</p> <p className='font-light mr-[179px]'>$</p></div>
//           </div>

//           <div className='mt-10 lg:mt-10 md:mt-10 lg:flex lg:flex-col md:flex md:flex-col gap-1 grid relative'>
//              <div className='flex justify-between lg:px-9 md:px-9 px-1 border-y border-gray-100 p-1'>
//               <p className='lg:text-sm md:text-sm font-medium text-slate-500 text-xs'>Processing</p>
//               <p className='lg:text-sm md:text-sm font-medium text-slate-500 lg:ml-12 md:ml-12 text-xs'>Avaliable</p>
//               <p className='lg:text-sm md:text-sm font-medium text-slate-500 ml-1 text-xs'>Pending</p>
//               <div>
//                <p className='lg:text-sm md:text-sm font-medium text-slate-500 ml-5 hidden lg:block md:block text-xs'>Account</p>
//               </div>
//              </div>

//              <div className='flex justify-between lg:px-9 md:px-9 px-1 '>
//               <p className='font-light lg:text-sm md:text-sm text-xs text-slate-500'>USDT TRC20</p>
//               <p className='text-green-600 font-semibold text-xs'>$0.00</p>
//               <p className='text-red-500 font-semibold text-xs'>$0.00</p>
//               <div>
//                <p className='font-sans text-blue-600 pr-3 hidden lg:block md:block'>not set</p>
//               </div>
//              </div>

//              <div className='flex justify-between lg:px-9 md:px-9 px-1  border-gray-100 p-1 border-y'>
//               <p className='font-light lg:text-sm md:text-sm text-xs text-slate-500'>USDT ERC20</p>
//               <p className='text-green-600 font-semibold text-xs'>$0.00</p>
//               <p className='text-red-500 font-semibold text-xs'>$0.00</p>
//               <div>
//                <p className='font-sans text-blue-600 pr-3 hidden lg:block md:block'>not set</p>
//               </div>
//              </div>

//              <div className='flex justify-between lg:px-9 md:px-9 px-1 '>
//               <p className='font-light lg:text-sm md:text-sm text-xs text-slate-500'>Bitcoin</p>
//               <p className='text-green-600 font-semibold text-xs ml-9'>$0.00</p>
//               <p className='text-red-500 font-semibold text-xs '>$0.00</p>
//               <div>
//                <p className='font-sans text-blue-600 pr-3 hidden lg:block md:block'>not set</p>
//               </div>
//              </div>

//              <div className='w-full lg:hidden md:hidden block mt-8'>
//               <div className='block lg:hidden md:hidden w-full text-xs'>
//                <p className='lg:text-sm md:text-sm text-xs font-medium text-slate-500  ml-1'>Account</p>
//                <p className='font-sans text-blue-600 pr-3 ml-1'>not set</p>
//                <p className='font-sans text-blue-600 pr-3 ml-1'>not set</p>
//                 <p className='font-sans text-blue-600 pr-3 ml-1'>not set</p>
//               </div>
//              </div>
//           </div>

//           <div>
//             <p className='text-xs lg:text-sm md:text-sm text-left whitespace-nowrap font-md text-slate-500 px-3 lg:px-8 md:px-8 py-7'>
//              You have no funds to withdraw.
//             </p>
//           </div>

//         </div>
//     </Layout>

//     </div>
//   )
// }

// export default Page
