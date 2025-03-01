"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import axios from 'axios';
import { useSession } from "next-auth/react";

// Define the interface for the plan structure
interface Plan {
  min: number;
  max: number;
  dailyProfit: number;
  duration: number;
  principalReturn: boolean;
}


interface InvestmentType {
  accountBalance: number;
}

const Page = () => {
  // State variables
  const {data: session, status} = useSession()
  const [selectedPlan, setSelectedPlan] = useState<string>("Gold Plan");
  const [investmentAmount, setInvestmentAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USDT TRC20");
  const [profit, setProfit] = useState<number>(0);
  const [isConfirming, setIsConfirming] = useState<boolean>(false); // Track if we're on the confirm page
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>(""); // Error message for invalid amount
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [investment, setInvestment] = useState<InvestmentType>({
      accountBalance: 0
    });

      useEffect(() => {
        if (!session?.user?.email) return;
        const fetchInvestment = async () => {
          try {
            const response = await axios.get(
              `/api/getuser-investment?email=${session.user.email}`
            );
            const inv = response.data;
            setInvestment({
              accountBalance: inv.accountBalance,
            });
            console.log("Fetched investment:", inv);
          } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.status === 404) {
              setInvestment({
                accountBalance: 0,
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

  // Plan definitions
  const plans: Record<string, Plan> = useMemo(
    () => ({
    "Gold Plan": {
      min: 100,
      max: 20000,
      dailyProfit: 36.9,
      duration: 1,
      principalReturn: true,
    },
    "Diamond Plan": {
      min: 25000,
      max: 40000,
      dailyProfit: 40,
      duration: 2,
      principalReturn: true,
    },
    "Zonal Representative": {
      min: 50000,
      max: 1000000,
      dailyProfit: 60,
      duration: 3,
      principalReturn: true,
    },
  }),
  []
);

  // Wallet addresses
  const walletAddresses: Record<string, string> = {
    "USDT TRC20": "TWNygZdC9XCFA39Ho2upMoHSRnEF9nhcy7",
    "USDT ERC20": "0xd55f4c3a290c009e69c0840f04024748c165506a",
     "Bitcoin" : "1CkQEUUup2EkgDsoDUnwLed7o98ZaGDbA6",
  };

  const handlePlanChange = (newPlan: string) => {
    setSelectedPlan(newPlan);

    const plan = plans[newPlan];

    // If the current investment amount is out of range, reset it
    if (investmentAmount < plan.min || investmentAmount > plan.max) {
      setInvestmentAmount(0);
      setError(""); // Clear error when switching plans
    } else {
      validateAmount(investmentAmount); // Revalidate for the new plan
    }
  };

  // Wrap validateAmount in useCallback so that it doesn't change on every render.
  const validateAmount = useCallback(
    (amount: number) => {
      const plan = plans[selectedPlan];
      if (amount >= plan.min && amount <= plan.max) {
        setError(""); // Clear error when valid
      } else {
        setError(`Amount must be between $${plan.min} and $${plan.max} for the ${selectedPlan}.`);
      }
    },
    [selectedPlan, plans] // Recreate the function if selectedPlan changes
  );

  // Function to calculate profit
  const calculateProfit = (): void => {
    const plan = plans[selectedPlan];
    const validAmount = Math.min(Math.max(investmentAmount, plan.min), plan.max);
    const dailyProfitAmount = (validAmount * plan.dailyProfit) / 4;
    setProfit(dailyProfitAmount);
  };

  // Function to handle the confirmation
  const handleConfirmDeposit = async () => {
    setIsLoading(true);
    const depositData = {
      plan: selectedPlan, // Ensure you're passing the correct field name here
      amount: investmentAmount, // Pass the investment amount
      investmentType: selectedCurrency, // Pass the selected investment type (currency)
      profit,
      transactionHash,
    };

    if (!transactionHash) {
      setErr(true);
    } else {
      setErr(false);
    }

    
    try {
      const response = await axios.post("/api/savedeposit", depositData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;


      if (!transactionHash) {
        setIsModalVisible(false);
      }

      if (response.status === 200) {
        setModalMessage(
          "The deposit has been saved. It will become active when the admin checks statistics."
        );
        setIsModalVisible(true); // Show the modal
        setIsConfirming(false); // Go back to the normal deposit form after saving
        setTransactionHash("");
      } else {
        console.error("Error saving deposit:", result.message);
        setModalMessage("There was an issue saving your deposit. Please try again.");
        setIsModalVisible(true); // Show the modal with error message
      }
    } catch (error: unknown) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      // if (axios.isAxiosError(error)) {
      //   errorMessage = error.response?.data?.message ?? error.message;
      // }
      console.error("Error during API request:", error);
      setModalMessage(errorMessage);
      setIsModalVisible(true); // Show the modal with error message
    } finally {
      setIsLoading(false);
    }
  };

  // Validate investment amount when plan or amount changes.
  useEffect(() => {
    validateAmount(investmentAmount);
  }, [selectedPlan, investmentAmount, validateAmount]);

  const handleAmountChange = (value: string): void => {
    if (value === "") {
      setInvestmentAmount(0);
      setError("");
      return;
    }
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      const formattedAmount = Math.floor(amount * 100) / 100;
      setInvestmentAmount(formattedAmount);
      validateAmount(formattedAmount);
    }
  };

  useEffect(() => {
   setIsLoading(status === "loading");
  }, [status]);

  
  return (
    <div className="h-full">
      <Layout username="">
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Modal Component */}
        <Modal
          isVisible={isModalVisible}
          message={modalMessage}
          onClose={() => setIsModalVisible(false)} // Close the modal after 10 seconds
        />
        {!isConfirming ? (
          // Normal Deposit Form
          <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 p-6 mt-[-20px]">
            <h1 className="text-xl font-semibold text-blue-900 mb-4">
              Make a Deposit
            </h1>

            {/* Plan Selection */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm">
                Select a plan:
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => handlePlanChange(e.target.value)}
                className="mt-2 w-full text-base lg:text-sm p-2 border border-gray-300 rounded outline-none focus:border-gray-400"
              >
                <option value="Gold Plan">Gold Plan</option>
                <option value="Diamond Plan">Diamond Plan</option>
                <option value="Zonal Representative">Zonal Representative</option>
              </select>
            </div>

            {/* Plan Details */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 space-x-1">
                Required Amount ($):{" "}
                <span className="font-medium">
                  {plans[selectedPlan].min} - {plans[selectedPlan].max}
                </span>
              </p>
              <p className="text-xs text-gray-600">
                Daily Profit:{" "}
                <span className="font-medium">
                  {plans[selectedPlan].dailyProfit}%
                </span>
              </p>
            </div>

            {/* Calculator */}
            <div className="mb-4 lg:flex md:flex grid lg:justify-between md:justify-between items-center">
              <div className="w-full">
                <label className="block text-gray-600 text-sm whitespace-nowrap">
                  Investment Amount ($):
                </label>
                <input
                  type="text"
                  value={
                    investmentAmount === 0 ? "" : investmentAmount.toString()
                  } // Show empty when reset
                  onChange={(e) => handleAmountChange(e.target.value)}
                  
                  className={`mt-2 w-full lg:text-sm text-base p-2 border rounded outline-none ${
                    error ? "border-red-500" : "border-gray-300"
                  } focus:border-gray-400`}

                />
                {error && <span className="text-red-500 text-xs">{error}</span>}
              </div>
              <button
                onClick={calculateProfit}
                className={`lg:ml-4 md:ml-4 text-xs text-center whitespace-nowrap lg:mt-7 md:mt-7 mt-2 font-medium lg:py-[11px] md:py-[11px] py-[8px] px-2 glass rounded ${
                  error 
                    ? "bg-gray-300 text-gray-600  px-2 mb-5"
                    : "bg-blue-600 text-white"
                }`}
                disabled={investmentAmount === 0 ||!!error} // Disable button if there's an error
              >
                Calculate your profit
              </button>
            </div>

            {/* Profit Output */}
            <div className="mb-8">
              <p className="text-xs text-gray-600">
                Estimated Daily Profit: <strong>${profit.toFixed(2)}</strong>
              </p>
            </div>

            {/* Currency Selection */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm">
                Select Investment Type:
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="mt-2 w-full text-base lg:text-sm p-2 border border-gray-300 rounded outline-none focus:border-gray-400"
              >
                <option value="USDT TRC20">Invest from USDT TRC20</option>
                <option value="USDT ERC20">Invest from USDT ERC20</option>
                <option value="Bitcoin">Invest from Bitcoin</option>
              </select>
            </div>

            {/* Invest Button */}
            <div className="mb-4 mt-7">
              <button
                onClick={() => setIsConfirming(true)} // Navigate to confirmation page
                className={`w-full bg-blue-600 text-white p-2 text-sm rounded glass ${
                  error || investmentAmount === 0
                  ? "bg-gray-400 text-gray-600  px-2"
                  : "bg-blue-600 text-white"
                }`}
                disabled={ investmentAmount === 0 || !!error}
              >
                Proceed to Confirmation
              
              </button>
            </div>

            {/* Account Balance */}
            <div className="text-xs text-gray-600 mt-2">
              <p className="whitespace-nowrap">
                Your account balance ($):<strong> ${investment.accountBalance.toLocaleString()}.00</strong>
              </p>
            </div>
          </div>
        ) : (
          // Confirmation Page

          <div className="w-full bg-white rounded-sm shadow-sm p-6 mt-[-20px]">
            <h1 className="text-xl font-semibold text-blue-900 lg:mb-6 md:mb-6 mb-2">
              Confirm Deposit
            </h1>

            <p className="text-xs lg:text-sm md:text-sm text-gray-600 lg:mb-5 mb-10">
              Please kindly send your deposit to this wallet address:{" "}
              <strong>{walletAddresses[selectedCurrency]}</strong>
            </p>

            <div className="mb-4 space-y-4">
              <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                <p>Plan:</p>
                <p>{selectedPlan}</p>
              </div>
              <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                <p>Profit:</p>
                <p>
                  {plans[selectedPlan].dailyProfit}% Daily for{" "}
                  {plans[selectedPlan].duration} days
                </p>
              </div>
              <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                <p>Principal Return:</p>
                <p>{plans[selectedPlan].principalReturn ? "Yes" : "No"}</p>
              </div>
              <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                <p>Principal Withdraw:</p>
                <p>Not available</p>
              </div>
              <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                <p>Amount:</p>
                <p>${investmentAmount.toFixed(2)}</p>
              </div>
              <div className="text-xs text-gray-600 flex flex-wrap justify-between">
                <p>A/M:</p>
                <p>${investmentAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Transaction Hash Input */}
            <div className="mb-4 mt-6">
              <p className="text-md text-gray-600 font-semibold mb-1 mt-3">
                Required Information:
              </p>

              <div className="flex flex-wrap items-center justify-between gap-1 lg:gap-4 md:gap-4">
                <label className="whitespace-nowrap text-gray-600 text-xs">
                  Transaction Hash
                </label>
                <input
                  type="text"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className={`mt-2 text-base lg:text-xs lg:py-1 px-2 w-full md:w-96 border rounded outline-none focus:border-gray-500
            ${err ? "border-red-500" : "border-gray-400"}`}
                />
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex flex-wrap justify-end gap-2 lg:gap-4 md:gap-4 lg:mt-4 md:mt-4 mt-8">
              <button
                onClick={handleConfirmDeposit} // Save the deposit
                className="bg-blue-600 text-sm text-white py-1 px-5 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsConfirming(false)} // Go back to normal deposit page
                className="bg-slate-700 text-sm text-white py-1 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Page;
