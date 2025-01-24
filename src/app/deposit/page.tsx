"use client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

// Define the interface for the plan structure
interface Plan {
  min: number;
  max: number;
  dailyProfit: number;
  duration: number;
  principalReturn: boolean;
}

const Page = () => {
  // State variables
  const [selectedPlan, setSelectedPlan] = useState<string>("Gold Plan");
  const [investmentAmount, setInvestmentAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>("USDT TRC20");
  const [profit, setProfit] = useState<number>(0);
  const [isConfirming, setIsConfirming] = useState<boolean>(false); // Track if we're on the confirm page
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>(""); // Error message for invalid amount
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Plan definitions
  const plans: Record<string, Plan> = {
    "Gold Plan": {
      min: 100,
      max: 20000,
      dailyProfit: 3.0,
      duration: 6,
      principalReturn: true,
    },
    "Diamond Plan": {
      min: 25000,
      max: 40000,
      dailyProfit: 3.6,
      duration: 30,
      principalReturn: true,
    },
    "Zonal Representative": {
      min: 50000,
      max: Infinity,
      dailyProfit: 4.0,
      duration: 60,
      principalReturn: true,
    },
  };

  // Wallet addresses
  const walletAddresses: Record<string, string> = {
    "USDT TRC20": "address 1",
    "USDT ERC20": "address 2",
    Bitcoin: "address 3",
  };

  // Function to validate the investment amount
  const validateAmount = (amount: number): void => {
    const plan = plans[selectedPlan];
    if (amount < plan.min) {
      setError(
        `Amount must be between $${plan.min} and $${plan.max} for the ${selectedPlan}.`
      );
    } else {
      setError(""); // Clear the error if the amount is valid
    }
  };

  // Function to calculate profit
  const calculateProfit = (): void => {
    const plan = plans[selectedPlan];
    const validAmount = Math.min(
      Math.max(investmentAmount, plan.min),
      plan.max
    );
    const dailyProfitAmount = (validAmount * plan.dailyProfit) / 100;
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
      const response = await fetch("/api/savedeposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(depositData), // Send deposit data, including transactionHash
      });

      const result = await response.json();
      if (!transactionHash) {
        setIsModalVisible(false);
      }

      if (response.ok) {
        setModalMessage(
          "The deposit has been saved. It will become active when the admin checks statistics."
        );
        setIsModalVisible(true); // Show the modal
        setIsConfirming(false); // Go back to the normal deposit form after saving
        setTransactionHash("");
      } else {
        console.error("Error saving deposit:", result.message);
        setModalMessage(
          "There was an issue saving your deposit. Please try again."
        );
        setIsModalVisible(true); // Show the modal with error message
      }
    } catch (error) {
      console.error("Error during API request:", error);
      setModalMessage("An unexpected error occurred. Please try again.");
      setIsModalVisible(true); // Show the modal with error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (value: string): void => {
    if (value === "") {
      setInvestmentAmount(0); // Reset to 0 when input is empty
      return;
    }

    // Check if the input is a valid number
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      // If valid, update the state with the formatted number
      const formattedAmount = Math.floor(amount * 100) / 100; // Ensure valid decimal precision
      setInvestmentAmount(formattedAmount); // Update the number state
      validateAmount(formattedAmount); // Call validation function
    } else if (/^\d$/.test(value)) {
      // If user starts typing a single digit after clearing, replace the 0
      setInvestmentAmount(parseFloat(value));
    }
  };

  return (
    <div className="h-screen lg:h-full">
      <Layout username="">
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop:blur-2xl flex justify-center items-center z-50">
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
          <div className="w-full bg-white lg:rounded-lg rounded-sm  shadow-md p-6 mt-[-20px]">
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
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="mt-2 w-full text-sm p-2 border border-gray-300 rounded outline-none focus:border-gray-400"
              >
                <option value="Gold Plan">Gold Plan</option>
                <option value="Diamond Plan">Diamond Plan</option>
                <option value="Zonal Representative">
                  Zonal Representative
                </option>
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
                  className={`mt-2 w-full text-sm p-2 border rounded outline-none ${
                    error ? "border-red-500" : "border-gray-300"
                  } focus:border-gray-400`}
                  min={plans[selectedPlan].min}
                  max={plans[selectedPlan].max}
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
                disabled={!!error} // Disable button if there's an error
              >
                Calculate your profit
              </button>
            </div>

            {/* Profit Output */}
            <div className="mb-4">
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
                className="mt-2 w-full text-sm p-2 border border-gray-300 rounded outline-none focus:border-gray-400"
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
                  error
                    ? "bg-gray-400 text-gray-600  px-2"
                    : "bg-blue-600 text-white"
                }`}
                disabled={!!error}
              >
                Proceed to Confirmation
              </button>
            </div>

            {/* Account Balance */}
            <div className="text-sm text-gray-600">
              <p>
                Your account balance ($): <strong> $0.00</strong>
              </p>
            </div>
          </div>
        ) : (
          // Confirmation Page

          <div className="w-full bg-white rounded-lg shadow-md p-6 mt-[-20px]">
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
            <div className="flex flex-wrap justify-between sm:justify-start gap-4 mt-4">
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
