"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Transaction {
  type: string;
  amount: number;
  wallet: string;
  dateTime: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `/api/get-transactions?email=${session.user.email}`
        );
        setTransactions(response.data.transactions || []);
        setError("");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching transactions:", err.message);
        } else {
          console.error("Error fetching transactions:", err);
        }
        setError("Error fetching transactions");
      }
    };

    fetchTransactions();
    const intervalId = setInterval(fetchTransactions, 5000);
    return () => clearInterval(intervalId);
  }, [session]);
  
  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <div className="h-full">
      <Layout username="">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
           <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
          </div>
        )}

      <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2 mt-[-20px] overflow-y-auto max-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:text-start sm:ml-2 ml-0 text-center">
            Transactions
          </h1>
          {/* Header Row */}
          <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
            <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">Type</span>
            <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">Amount</span>
            <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">Wallet</span>
            <span className="w-1/4 text-center text-xs sm:text-sm font-semibold text-gray-600">Date & Time</span>
          </div>
 {/* Transactions List */}
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
              >
                <span className="w-1/4 text-center text-xs sm:text-sm text-gray-700">
                  {tx.type}
                </span>
                <span
                  className={`w-1/4 text-center text-xs sm:text-sm font-medium ${
                    tx.type.toLowerCase() === "deposit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ${tx.amount.toLocaleString()}
                </span>
                <span className="w-1/4 text-center text-xs sm:text-sm text-gray-700">
                  {tx.wallet}
                </span>
                <span className="w-1/4 text-center text-xs sm:text-sm text-gray-700">
                  {new Date(tx.dateTime).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No transactions found.</p>
          )}
          {error && (
            <div className="text-center text-red-500 mt-4">{error}</div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;

