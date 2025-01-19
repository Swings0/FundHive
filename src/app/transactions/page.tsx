"use client";

import { useState } from "react";
import Layout from "../components/Layout";

interface Transaction {
  id: string;
  type: "withdraw" | "deposit";
  amount: number;
  date: string;
}


// Main TransactionHistory Component
const page = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransaction = (type: "withdraw" | "deposit", amount: number) => {
    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type,
      amount,
      date: new Date().toLocaleString(), // Current date and time
    };

    setTransactions((prev) => [newTransaction, ...prev]); // Add to the top of the list
  };

  return (
    <Layout username="">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Transaction History
        </h1>

        {/* Actions */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() =>
              handleTransaction("deposit", Math.floor(Math.random() * 1000) + 1)
            }
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
          >
            Deposit Random Amount
          </button>
          <button
            onClick={() =>
              handleTransaction("withdraw", Math.floor(Math.random() * 1000) + 1)
            }
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Withdraw Random Amount
          </button>
        </div>

        {/* Transaction List */}
        <ul className="divide-y divide-gray-200">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center py-4"
              >
                <div>
                  <p
                    className={`text-lg font-medium ${
                      transaction.type === "deposit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className="text-lg font-semibold">${transaction.amount}</p>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 py-4">
              No transactions yet.
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default page;

