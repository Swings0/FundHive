"use client";
import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

type Currency = "USDT TRC20" | "USDT ERC20" | "Bitcoin";
const walletOptions: Currency[] = ["USDT TRC20", "USDT ERC20", "Bitcoin"];

const WithdrawPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Investment state includes accountBalance, pendingWithdrawal, and withdrawalActivation.
  const [investment, setInvestment] = useState<{
    accountBalance: number;
    pendingWithdrawal: number;
    withdrawalActivation: { [key in Currency]: boolean };
  }>({
    accountBalance: 0,
    pendingWithdrawal: 0,
    withdrawalActivation: {
      "USDT TRC20": false,
      "USDT ERC20": false,
      Bitcoin: false,
    },
  });
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Wallet selection and input.
  const [selectedWallet, setSelectedWallet] = useState<Currency>("USDT TRC20");
  const [walletInput, setWalletInput] = useState<string>("");

  // User wallet addresses fetched from /api/getuser.
  const [walletAddresses, setWalletAddresses] = useState<{
    "USDT TRC20": string;
    "USDT ERC20": string;
    Bitcoin: string;
  }>({
    "USDT TRC20": "",
    "USDT ERC20": "",
    Bitcoin: "",
  });

  // Fetch investment data.
  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchInvestment = async () => {
      try {
        const res = await axios.get(
          `/api/getuser-investment?email=${session.user.email}`
        );
        const inv = res.data;
        setInvestment({
          accountBalance: inv.accountBalance,
          pendingWithdrawal: inv.pendingWithdrawal || 0,
          withdrawalActivation: inv.withdrawalActivation || {
            "USDT TRC20": false,
            "USDT ERC20": false,
            Bitcoin: false,
          },
        });
        setErrorMsg("");
        console.log("Fetched investment:", res.data);
      } catch (error) {
        console.error("Error fetching investment data", error);
      }
    };
    fetchInvestment();
    const intervalId = setInterval(fetchInvestment, 5000);
    return () => clearInterval(intervalId);
  }, [session]);

  // Fetch user wallet addresses.
  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchUserWallets = async () => {
      try {
        const res = await axios.get(`/api/getuser?email=${session.user.email}`);
        setWalletAddresses({
          "USDT TRC20": res.data.usdtTrc20Address || "",
          "USDT ERC20": res.data.usdtErc20Address || "",
          Bitcoin: res.data.bitcoinAddress || "",
        });
      } catch (error) {
        console.error("Error fetching user wallet addresses", error);
      }
    };
    fetchUserWallets();
  }, [session]);

  // Process withdrawal action.
  const handleWithdraw = async (withdrawAll: boolean = false) => {
    setErrorMsg("");
    let amountToWithdraw: number;
    if (withdrawAll) {
      amountToWithdraw = investment.accountBalance;
    } else {
      amountToWithdraw = withdrawAmount;
    }
    // Validation checks.
    if (withdrawAll) {
      if (investment.accountBalance < 200) {
        setErrorMsg("Withdrawal amount cannot be lower than $200");
        return;
      }
    } else {
      if (amountToWithdraw > investment.accountBalance) {
        setErrorMsg("Insufficient funds");
        return;
      }
      if (amountToWithdraw < 200) {
        setErrorMsg("Withdrawal amount cannot be lower than $200");
        return;
      }
    }
    // Check for wallet address.
    const currentWalletAddress = walletAddresses[selectedWallet];
    if (!currentWalletAddress && walletInput.trim() === "") {
      setErrorMsg(
        "Please set up your wallet address on your profile or paste it in the input below."
      );
      return;
    }

    setLoading(true);
    try {
      // Optionally update wallet address if provided.
      // if (walletInput.trim() !== "") {
      //   await axios.post("/api/update-wallet", {
      //     email: session?.user?.email,
      //     walletType: selectedWallet,
      //     walletAddress: walletInput.trim(),
      //   });
      //   setWalletAddresses((prev) => ({
      //     ...prev,
      //     [selectedWallet]: walletInput.trim(),
      //   }));
      // }
      // Process withdrawal via API.
      const res = await axios.post("/api/withdraw", {
        email: session?.user?.email,
        amount: amountToWithdraw,
        withdrawAll,
      });
      if (res.status === 200) {
        setModalMessage(
          "Your withdrawal is being processed, this doesn't take too long"
        );
        setIsModalVisible(true);
        // Update local investment state.
        setInvestment((prev) => ({
          ...prev,
          pendingWithdrawal:
            prev.pendingWithdrawal +
            (withdrawAll ? prev.accountBalance : amountToWithdraw),
          accountBalance: withdrawAll
            ? 0
            : prev.accountBalance - amountToWithdraw,
        }));
        // Send email to admin.
        await axios.post("/api/send-withdrawal-email", {
          email: session?.user?.email,
          amount: amountToWithdraw,
          wallet: selectedWallet,
          walletAddress: walletInput.trim() || currentWalletAddress,
        });
        // Clear withdrawal amount and wallet input.
        setWithdrawAmount(0);
        setWalletInput("");
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      setErrorMsg("Error processing withdrawal");
    } finally {
      setLoading(false);
    }
  };

  // if (status === "loading")
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-full bg-gray- backdrop-blur-lg flex justify-center items-center">
  //      <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
  //     </div>
  //   );

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 relative">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
        </div>
      )}
      {/* Back arrow on top left */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="text-slate-300 hover:text-slate-100"
        >
          <MdArrowBack size={24} />
        </button>
      </div>
      <div className="bg-gray-800/60 glass backdrop-blur-md rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-100 mb-4">
          Withdraw Funds
        </h1>
        <div className="mb-4">
          <label className="block text-sm text-gray-200 mb-2">
            Enter amount to withdraw ($)
          </label>
          <input
            type="number"
            value={withdrawAmount || ""}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            placeholder="Enter amount to withdraw..."
            className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-700 text-white focus:outline-none focus:border-slate-300"
          />
          {errorMsg && <p className="text-red-600 text-sm mt-1">{errorMsg}</p>}
        </div>
        {/* Wallet selection */}
        <div className="mb-4">
          <label className="block text-sm text-gray-200 mb-2">
            Select Wallet Type:
          </label>
          <select
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value as Currency)}
            className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-700 text-white focus:outline-none focus:border-slate-300"
          >
            {walletOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Optional wallet address input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-200 mb-2">
            Enter your wallet address if not already set:
          </label>
          <input
            type="text"
            value={walletInput}
            onChange={(e) => setWalletInput(e.target.value)}
            placeholder="Wallet address (optional)"
            className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-700 text-white focus:outline-none focus:border-slate-300"
          />
        </div>
        <div className="flex sm:gap-4 gap-2">
          <button
            onClick={() => handleWithdraw(true)}
            disabled={loading}
            className="whitespace-nowrap glass sm:text-base text-sm px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
          >
            Withdraw all funds
          </button>
          <button
            onClick={() => handleWithdraw(false)}
            disabled={loading}
            className="px-4 py-2 glass sm:text-base text-sm bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            Withdraw
          </button>
        </div>
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

export default WithdrawPage;
