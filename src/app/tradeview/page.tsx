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
  const [data, setData] = useState<number[]>(
    generateRandomData(30, 100, 10000)
  );

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
        // width={width}
        // height={height}
        className="bg-white lg:rounded md:rounded lg:shadow-lg md:shadow-lg shadow-md lg:w-80 lg:h-36 md:w-[17.8rem] md:h-36 w-[17rem] h-36 lg:ml-0 md:ml-0 ml-[3px] chart"
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
    if (!email) return; // Do nothing if no email.
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

  // Only display chart/profit if an active investment exists and activeDeposit > 0.
  const activeInvestmentExists =
    investment &&
    investment.status === "active" &&
    investment.activeDeposit > 0;
  const progressPercentage =
    investment && investment.targetActiveDeposit
      ? Math.min(
          (investment.activeDeposit / investment.targetActiveDeposit) * 100,
          100
        )
      : 0;
  const randomProfit = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

  // If session is loading, display a loading message.
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-gray-100 flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  // If no user is logged in, prompt for login.
  if (!session?.user) {
    return (
      <div className="min-h-screen space-y-2 bg-gray-900 p-8 text-gray-100 flex flex-col items-center justify-center">
        <p className="text-sm whitespace-nowrap">
          Please log in to view your investment data.
        </p>

        <Link href={"/login"}>
          <button className="py-1 px-6 bg-blue-600 glass rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Layout username="">
        <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2  mt-[-20px] overflow-hidden">
          <h1 className="text-2xl font-bold mb-2 text-left text-blue-900 lg:ml-0 md:ml-0 ml-2">
            TradeView
          </h1>

          {loading ? (
            <p className="text-center">Loading investment data...</p>
          ) : activeInvestmentExists ? (
            <div className="lg:flex lg:flex-row md:grid md:grid-cols-2 flex flex-col md:gap-6 lg:gap-3 gap-5 items-center lg:justify-between md:justify-between justify-center bg-gray-50 rounded-lg p-5 shadow-sm transition-all duration-300 delay-100 ease-in-out sharp">
              {/* Chart & Profit Info (Left Column) */}

              <div className="bg-zinc-200 p-3 rounded-sm glass ">
                <Tview />
              </div>

              <div className="flex flex-col">
                <div className="lg:border-r-2 md:border-r-2 lg:border-b-2 md:border-b-2 border-gray-300 p-2 relative">
                  <div className="absolute text-md -top-3 right-[-9px] text-gray-400 lg:block md:block hidden">
                    <RiArrowUpSLine />
                  </div>

                  <div className="">
                    <ProfitChart />
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-start md:items-start justify-center w-full">
                  <h1 className="font-semibold text-sm lg:mt-3 md:mt-2 text-gray-800">
                    Active
                  </h1>
                  <div className="lg:w-[22rem] md:w-[18rem] w-[18rem] h-2 mt-1 bg-gray-600 rounded bar">
                    <div
                      className="h-2 rounded bg-blue-500 transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="lg:mr-10 md:mr-10 text-left flex flex-col">
                <div className="flex flex-col lg:items-center">
                  <p className="mt-4 text-md whitespace-nowrap lg:whitespace-normal text-red-500 lg:bg-red-50 md:bg-red-50 rounded-full flex text-center py-2 px-3">
                    Amount deflated overtime: {randomProfit}{" "}
                    <MdOutlineKeyboardDoubleArrowDown className="text-red-600 text-base" />
                  </p>
                  <div className="flex space-x-2 mt-3 lg:ml-0 md:ml-5 ml-5">
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-100 text-sm" />
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-200 text-sm" />
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-300 text-sm" />
                    <FaArrowLeft className="text-blue-500 animate-slideLeft delay-300 text-sm" />
                  </div>
                </div>

                {/* Active Deposit (Right Column) */}
                <div className=" text-left mt-2 ml-3">
                  <h1 className="flex font-semibold text-xl  tracking-wide ">
                    Profits Earned:
                  </h1>
                  <p className="text-lg text-left flex text-gray-700">
                    ${investment.activeDeposit.toLocaleString()}
                    <MdOutlineKeyboardDoubleArrowUp className="text-green-600 text-base" />
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-left  border-[1.2px] border-gray-200 p-5 rounded-md">
              <p className="text-xl text-gray-600">
                You have no ongoing investment yet.
              </p>
              <Link href={"/deposit"}>
                <button className="mt-5 px-6 py-1 bg-blue-600 rounded hover:bg-blue-700 text-white glass transition">
                  Invest
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
