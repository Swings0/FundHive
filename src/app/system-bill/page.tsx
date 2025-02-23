"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Modal from "../components/Modal";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

type WalletType = "USDT TRC20" | "USDT ERC20" | "Bitcoin";
const walletTypes: WalletType[] = ["USDT TRC20", "USDT ERC20", "Bitcoin"];

// Define static addresses for each wallet type.
const walletAddresses: Record<WalletType, string> = {
  "USDT TRC20": "address 1",
  "USDT ERC20": "address 2",
  "Bitcoin": "address 3",
};

const Page = () => {
  const { data: session, status } = useSession();
  const [selectedWallet, setSelectedWallet] = useState<WalletType>("USDT TRC20");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [txError, setTxError] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Optional: prefill email from session if available.
  const email = session?.user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxError("");
    if (!transactionHash.trim()) {
      setTxError("Transaction hash is required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/system-bill", {
        email,
        walletType: selectedWallet,
        transactionHash: transactionHash.trim(),
      });
      if (response.status === 200) {
        setModalMessage("Hold on while we process your transaction, this doesn't take too long");
        setIsModalVisible(true);
        // Clear the transaction hash after successful submission.
        setTransactionHash("");
      }
    } catch (error) {
      console.error("Error processing system bill deposit:", error);
      setTxError("Error processing transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Back arrow */}
      <div className="absolute top-4 left-4">
          <button
           className="text-slate-300 hover:text-slate-100"
           onClick={() => router.back()}
           >
            <MdArrowBack size={24} />
          </button>
      </div>


        <div className="bg-gray-800/30 glass backdrop-blur-md rounded-lg shadow-xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-100 mb-4 text-center">
            System Bill
          </h1>
          <div className="mb-4">
            <p className="text-white text-lg mb-2">Choose wallet type to make payment:</p>
            <div className="flex flex-col gap-2">
              {walletTypes.map((wallet) => (
                <label key={wallet} className="flex items-center text-white">
                  <input
                    type="radio"
                    name="wallet"
                    value={wallet}
                    checked={selectedWallet === wallet}
                    onChange={() => setSelectedWallet(wallet)}
                    className="mr-2"
                  />
                  {wallet}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-blue-300 text-sm">
              Make full payment to: <span className="font-mono">{walletAddresses[selectedWallet]}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-white text-sm mb-1">
                Transaction hash:
              </label>
              <input
                type="text"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="Enter transaction hash..."
                className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none transition border ${
                  txError ? "border-red-600" : "border-gray-600"
                }`}
              />
              {txError && <p className="text-red-500 text-xs mt-1">{txError}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 glass hover:bg-blue-800 text-white  rounded-md px-4 py-2 transition"
            >
              {loading ? "Processing..." : "Save"}
            </button>
          </form>
        </div>
        {isModalVisible && (
          <Modal
            isVisible={isModalVisible}
            message={modalMessage}
            onClose={() => setIsModalVisible(false)}
          />
        )}
    </div>
  );
};

export default Page;
