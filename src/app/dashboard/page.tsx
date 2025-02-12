'use client'
import Layout from '../components/Layout';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  const [fetchedUsername, setFetchedUsername] = useState('');
  const [investment, setInvestment] = useState({
    activeDeposit: 0,
    totalDeposit: 0,
    accountBalance: 0,
    targetActiveDeposit: 0, 
    targetTotalDeposit: 0,

    // Add more fields if needed.
    // You can include other fields if desired.
  });
  const [error, setError] = useState('');


  const progressPercentage = investment.targetActiveDeposit
  ? Math.min((investment.activeDeposit / investment.targetActiveDeposit) * 100, 100)
  : 0;

  const progressPercentageOne = investment.targetTotalDeposit
  ? Math.min((investment.totalDeposit / investment.targetTotalDeposit) * 100, 100)
  : 0;

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchInvestment = async () => {
      try {
        const response = await axios.get(`/api/getuser-investment?email=${session.user.email}`);
        // Assuming the API returns a JSON object with the investment fields.
        setInvestment(response.data);
        setError('');
        console.log('Fetched investment:', response.data);
      } catch (err: any) {
        console.error('Error fetching investment data:', err);
        setError(err.response?.data?.message || 'Error fetching investment data.');
      }
    };

    // Initial fetch
    fetchInvestment();
    // Poll every 5 seconds
    const intervalId = setInterval(fetchInvestment, 5000);

    return () => clearInterval(intervalId);
  }, [session]);


  useEffect(() => {
    if (session) {
      const fetchUsername = async () => {
        try {
          const response = await axios.get('/api/getuser');
          setFetchedUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };
      fetchUsername();
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      console.error("User is not authenticated");
    }
  }, [status]);




  const displayUsername = fetchedUsername || (session?.user?.name ?? "Guest");

  return (
    <div className="h-full">
      <Layout username="">
        <div className="lg:flex lg:flex-row flex flex-col w-full lg:gap-5 gap-7">
          <div className="lg:w-64 w-full h-80 bg-white rounded-sm shadow-sm shadow-gray-200 p-4 flex flex-col space-y-5 mt-[-20px]">
            <h1 className="font-medium text-gray-600 mb-2">Overview</h1>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Active Deposit</p>
                <span className="text-gray-800 font-semibold text-sm md:text-base lg:text-base">
                  ${investment.activeDeposit.toLocaleString()}.00
                </span>
              </div>
              <div className="flex flex-col items-end">
                <FaArrowUp className="text-blue-500 mb-1 text-xs" />
                <div className="w-16 bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-blue-500 h-1 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <span className="w-48 h-[1px] bg-slate-200"></span>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Deposit</p>
                <span className="text-gray-800 font-semibold text-sm md:text-base lg:text-base">
                  ${investment.totalDeposit.toLocaleString()}.00
                </span>
              </div>
              <div className="flex flex-col items-end">
                <FaArrowUp className="text-green-500 mb-1 text-xs" />
                <div className="w-16 bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-green-500 h-1 rounded-full"
                    style={{ width: `${progressPercentageOne}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <span className="w-48 h-[1px] bg-slate-200"></span>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Withdrawal</p>
                <span className="text-gray-800 font-semibold text-sm md:text-base lg:text-base">
                  $0.00
                </span>
              </div>
              <div className="flex flex-col items-end">
                <FaArrowDown className="text-red-500 mb-1 text-xs" />
                <div className="w-16 bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-red-500 h-1 rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="h-[21rem] bg-white rounded-sm shadow-sm shadow-gray-200 p-4 mt-[-20px] space-y-2">
              <h1 className="text-lg font-semibold text-gray-700 mb-2">
                Your Account
              </h1>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-sm text-gray-600">User:</span>
                <span className="text-gray-600 font-medium lg:text-base md:text-base text-sm">{displayUsername}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-sm text-gray-600">Account Balance:</span>
                <span className="text-gray-600 font-medium lg:text-base md:text-base text-sm">${investment.accountBalance.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-sm text-gray-600">Earned Total:</span>
                <span className="text-gray-600 font-medium lg:text-base md:text-base text-sm">$0.00</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-sm text-gray-600">Pending Withdrawal:</span>
                <span className="text-gray-600 font-medium lg:text-base md:text-base text-sm">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;

