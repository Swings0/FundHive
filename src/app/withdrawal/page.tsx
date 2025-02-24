"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Currency = "USDT TRC20" | "USDT ERC20" | "Bitcoin";
const currencies: Currency[] = ["USDT TRC20", "USDT ERC20", "Bitcoin"];

interface WithdrawalActivationSetting {
  activated: boolean;
  activationStartTime: string | null;
  activationDuration: number;
  activationUnit: "min" | "hour" | "day";
}

interface InvestmentType {
  accountBalance: number;
  pendingWithdrawal: number;
  withdrawalActivation: { [key in Currency]: boolean };
  withdrawalActivationSettings: {
    USDT_TRC20: WithdrawalActivationSetting;
    USDT_ERC20: WithdrawalActivationSetting;
    Bitcoin: WithdrawalActivationSetting;
  };
  displayWithdrawalStatus: boolean;
}

const Page = () => {
  const { data: session, status } = useSession();
  // Removed unused error state.
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [investment, setInvestment] = useState<InvestmentType>({
    accountBalance: 0,
    pendingWithdrawal: 0,
    withdrawalActivation: {
      "USDT TRC20": false,
      "USDT ERC20": false,
      Bitcoin: false,
    },
    withdrawalActivationSettings: {
      USDT_TRC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
      USDT_ERC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
      Bitcoin: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
    },
    displayWithdrawalStatus: false,
  });

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchInvestment = async () => {
      try {
        const response = await axios.get(
          `/api/getuser-investment?email=${session.user.email}`
        );
        const inv = response.data;
        if (!inv.withdrawalActivation) {
          inv.withdrawalActivation = {
            "USDT TRC20": false,
            "USDT ERC20": false,
            Bitcoin: false,
          };
        }
        if (!inv.withdrawalActivationSettings) {
          inv.withdrawalActivationSettings = {
            USDT_TRC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
            USDT_ERC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
            Bitcoin: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
          };
        }
        setInvestment({
          accountBalance: inv.accountBalance,
          pendingWithdrawal: inv.pendingWithdrawal || 0,
          withdrawalActivation: inv.withdrawalActivation,
          withdrawalActivationSettings: inv.withdrawalActivationSettings,
          displayWithdrawalStatus: inv.displayWithdrawalStatus,
        });
        console.log("Fetched investment:", inv);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setInvestment({
            accountBalance: 0,
            pendingWithdrawal: 0,
            withdrawalActivation: {
              "USDT TRC20": false,
              "USDT ERC20": false,
              Bitcoin: false,
            },
            withdrawalActivationSettings: {
              USDT_TRC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
              USDT_ERC20: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
              Bitcoin: { activated: false, activationStartTime: null, activationDuration: 0, activationUnit: "min" },
            },
            displayWithdrawalStatus: false,
          });
        } else {
          console.error("Error fetching investment data:", err);
          // Optionally, you could set an error state here if needed.
        }
      }
    };

    fetchInvestment();
    const intervalId = setInterval(fetchInvestment, 5000);
    return () => clearInterval(intervalId);
  }, [session]);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <div className="h-full bg-gray-50">
      <Layout username={session?.user?.name || ""}>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2 mt-[-20px] overflow-hidden">
          {/* Header Card */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-center">
              Active Withdrawal
            </h1>
            <div className="flex flex-col sm:flex-row justify-around items-center border-t border-b border-gray-200 py-4">
              <div className="text-center mb-4 sm:mb-0">
                <p className="text-gray-600 text-sm">Active Balance</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${investment.accountBalance.toLocaleString()}.00
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Pending Withdrawal</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${investment.pendingWithdrawal.toLocaleString()}.00
                </p>
              </div>
            </div>
          </div>

          {/* Withdrawal Settings Table */}
          <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2 mt-[-20px] overflow-hidden">
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
                {currencies.map((currency) => {
                  const key = currency.replace(" ", "_");
                  const settings = investment.withdrawalActivationSettings?.[
                    key as keyof typeof investment.withdrawalActivationSettings
                  ];
                  return (
                    <div
                      key={currency}
                      className="flex justify-between items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="w-1/4 text-center text-xs sm:text-sm text-gray-700">
                        {currency}
                      </span>
                      <span className="w-1/4 text-center text-xs sm:text-sm text-green-600 font-medium">
                        {investment.withdrawalActivation[currency]
                          ? `$${investment.accountBalance.toLocaleString()}.00`
                          : "$0.00"}
                      </span>
                      <span className="w-1/4 text-center text-xs sm:text-sm text-red-500 font-medium">
                        {investment.withdrawalActivation[currency]
                          ? `$${investment.pendingWithdrawal.toLocaleString()}.00`
                          : "$0.00"}
                      </span>
                      <span className="w-1/4 text-center">
                        {investment.withdrawalActivation[currency] && investment.accountBalance > 0 ? (
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
                  );
                })}
              </div>
            </div>
          </div>

          {investment.displayWithdrawalStatus && (
            <div className="mt-8 text-center">
              <Link href={"/withdrawal-status"}>
                <button className="bg-blue-500 text-white px-4 glass py-[5px] rounded-md transition">
                  Check withdrawal status
                </button>
              </Link>
            </div>
          )}

          {investment.accountBalance === 0 && (
            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                You have no funds to withdraw.
              </p>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;
