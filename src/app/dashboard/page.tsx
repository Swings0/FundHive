'use client'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Layout from "../components/Layout";
import React from 'react'
import { useSession } from "next-auth/react";
import axios from "axios"; // Import axios for API requests
import { useEffect,useState } from "react";





interface Page {
  username: string;
}

const Page = ({username}: Page) => {
  const { data: session, status } = useSession();
  const [fetchedUsername, setFetchedUsername] = useState<string | null>(null);


  useEffect(() => {
    // Fetch username from the backend API if the session is available
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
  
  // Fallback to the username from props or fetched data
  const displayUsername = fetchedUsername || username;

// Fetch active deposit amount (replace in your deposit page)
useEffect(() => {
  if (status === "unauthenticated") {
    console.error("User is not authenticated");
    // Redirect user to login page or show an error message
  }
}, [status]);


console.log(session);

  

  return (
    <Layout username="">
      <div className="flex gap-5">
        <div className="w-56 h-80 bg-white rounded-md shadow-md p-4 flex flex-col space-y-5 mt-[-20px]">
          {/* Header */}
          <h1 className="font-medium text-gray-600 mb-2">Overview</h1>

          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Active Deposit</p>
              <span className="text-gray-800 font-semibold text-base">
                $0.00
              </span>
            </div>
            <div className="flex flex-col items-end">
              <FaArrowUp className="text-blue-500 mb-1 text-xs" />
              <div className="w-16 bg-gray-200 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>

          <span className="w-48 h-[1px] bg-slate-200"></span>

          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Total Deposit</p>
              <span className="text-gray-800 font-semibold text-base">
                $0.00
              </span>
            </div>
            <div className="flex flex-col items-end">
              <FaArrowUp className="text-green-500 mb-1 text-xs" />
              <div className="w-16 bg-gray-200 rounded-full h-1">
                <div
                  className="bg-green-500 h-1 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
          <span className="w-48 h-[1px] bg-slate-200"></span>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Total Withdrawal</p>
              <span className="text-gray-800 font-semibold text-base">
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
          <div className=" h-[21rem] bg-white rounded-lg shadow-md p-4 mt-[-20px] space-y-2">
            {/* Header */}
            <h1 className="text-lg font-semibold text-gray-700 mb-2">
              Your Account
            </h1>

            {/* User */}
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-600">User:</span>
              <span className="text-gray-600 font-medium">{displayUsername}</span>
            </div>

            {/* Account Balance */}
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-600">Account Balance:</span>
              <span className="text-gray-600 font-medium">$0.00</span>
            </div>

            {/* Earned Total */}
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-600">Earned Total:</span>
              <span className="text-gray-600 font-medium">$0.00</span>
            </div>

            {/* Pending Withdrawal */}
            <div className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-sm text-gray-600">Pending Withdrawal:</span>
              <span className="text-gray-600 font-medium">$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default Page
