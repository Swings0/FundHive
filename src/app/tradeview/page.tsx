"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiArrowUpSLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Tview from "../components/Chart/Tview";

// Define a TypeScript interface for the investment record.
interface Investment {
  activeDeposit: number;
  totalDeposit: number;
  accountBalance: number;
  status: string;
  targetActiveDeposit: number;
}

// Utility: generate an array of random numbers.
function generateRandomData(
  numPoints: number,
  min: number,
  max: number
): number[] {
  const arr: number[] = [];
  for (let i = 0; i < numPoints; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

// ProfitChart component: displays an animated line chart with gradient stroke.
const ProfitChart: React.FC = () => {
  const [data, setData] = useState<number[]>(generateRandomData(30, 100, 10000));

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [
          ...prev.slice(1),
          Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
        ];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const width = 320;
  const height = 160;
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      // Invert y so that higher profits appear higher.
      const y = height - ((d - minVal) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative">
      <svg
        className="bg-white rounded-lg shadow-lg w-80 h-36 md:w-[18.8rem] md:h-36 w-[17rem] h-36 ml-1 chart"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#chartGradient)"
          strokeWidth="2"
          points={points}
        />
        {/* Display min and max labels */}
        <text x="5" y={height - 5} fill="#ccc" fontSize="10">
          {minVal}
        </text>
        <text x="5" y="15" fill="#ccc" fontSize="10">
          {maxVal}
        </text>
      </svg>
    </div>
  );
};

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the session's email dynamically.
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;
    const fetchInvestment = async () => {
      try {
        const response = await axios.get(
          `/api/getuser-investment?email=${encodeURIComponent(email)}`
        );
        setInvestment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching investment data:", error);
        setLoading(false);
      }
    };
    fetchInvestment();
    const interval = setInterval(fetchInvestment, 5000);
    return () => clearInterval(interval);
  }, [email]);

  // Updated condition: an active investment exists if status is "active" and either totalDeposit or activeDeposit is > 0.
  const activeInvestmentExists =
    investment &&
    investment.status === "active" &&
    (investment.totalDeposit > 0 || investment.activeDeposit > 0);

  const progressPercentage =
    investment && investment.targetActiveDeposit
      ? Math.min(
          (investment.activeDeposit / investment.targetActiveDeposit) * 100,
          100
        )
      : 0;
  const randomProfit = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-gray-100 flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-gray-100 flex flex-col items-center justify-center space-y-4">
        <p className="text-sm">Please log in to view your investment data.</p>
        <Link href={"/login"}>
          <button className="py-1 px-6 bg-blue-600 rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <Layout username={session?.user?.name || ""}>
        <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2  mt-[-20px] overflow-hidden">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">TradeView</h1>

          {loading ? (
            <p className="text-center text-lg">Loading investment data...</p>
          ) : activeInvestmentExists ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Chart & Profit Info */}
              <div className="flex flex-col space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <Tview />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Profit Chart
                  </h2>
                  <ProfitChart />
                </div>
              </div>

              {/* Right Column: Investment Summary */}
              <div className="flex flex-col space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Progress
                  </h3>
                  <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {progressPercentage.toFixed(0)}% completed
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Profits Earned
                  </h3>
                  <p className="text-3xl font-bold text-green-600 flex items-center">
                    ${investment.activeDeposit.toLocaleString()}
                    <MdOutlineKeyboardDoubleArrowUp className="ml-2 text-green-600" />
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Amount Deflated
                  </h3>
                  <p className="text-2xl font-bold text-red-600 flex items-center">
                    {randomProfit}
                    <MdOutlineKeyboardDoubleArrowDown className="ml-2 text-red-600" />
                  </p>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <div className="flex space-x-3">
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-100 text-xl" />
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-200 text-xl" />
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-300 text-xl" />
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-300 text-xl" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-300 p-6 rounded-lg text-center">
              <p className="text-2xl text-gray-600 mb-4">
                You have no ongoing investment yet.
              </p>
              <Link href={"/deposit"}>
                <button className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white transition">
                  Invest Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;

