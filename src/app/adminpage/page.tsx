"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

type Currency = "USDT TRC20" | "USDT ERC20" | "Bitcoin";
const currencies: Currency[] = ["USDT TRC20", "USDT ERC20", "Bitcoin"];

const Page = () => {
  const router = useRouter();

  // User email state.
  const [email, setEmail] = useState("");

  // Process A fields.
  const [totalDeposit, setTotalDeposit] = useState("");
  const [targetActiveDeposit, setTargetActiveDeposit] = useState("");
  const [processADuration, setProcessADuration] = useState("");
  const [processADurationUnit, setProcessADurationUnit] = useState("min");

  // Process B fields.
  const [accountBalance, setAccountBalance] = useState("");
  const [accountBalanceUpdateDuration, setAccountBalanceUpdateDuration] = useState("");
  const [accountBalanceUpdateUnit, setAccountBalanceUpdateUnit] = useState("min");

  // Process messages.
  const [messageA, setMessageA] = useState("");
  const [errorA, setErrorA] = useState("");
  const [messageB, setMessageB] = useState("");
  const [errorB, setErrorB] = useState("");

  // Withdrawal activation state and messages.
  const [withdrawalActivation, setWithdrawalActivation] = useState<{ [key in Currency]: boolean }>(() => ({
    "USDT TRC20": false,
    "USDT ERC20": false,
    Bitcoin: false,
  }));
  const [activationDurations, setActivationDurations] = useState<{ [key in Currency]: string }>(() => ({
    "USDT TRC20": "",
    "USDT ERC20": "",
    Bitcoin: "",
  }));
  const [activationUnits, setActivationUnits] = useState<{ [key in Currency]: string }>(() => ({
    "USDT TRC20": "min",
    "USDT ERC20": "min",
    Bitcoin: "min",
  }));
  const [withdrawalMsg, setWithdrawalMsg] = useState("");
  const [withdrawalErr, setWithdrawalErr] = useState("");

  // Global display status for withdrawals.
  const [displayStatus, setDisplayStatus] = useState(false);
  const [globalMsg, setGlobalMsg] = useState("");
  const [globalErr, setGlobalErr] = useState("");

  // Withdrawal status update inputs.
  const [wsHeader, setWsHeader] = useState("");
  const [wsMessage, setWsMessage] = useState("");
  const [wsButtonText, setWsButtonText] = useState("");
  const [wsMsg, setWsMsg] = useState("");
  const [wsErr, setWsErr] = useState("");
  const [warnHidden, setWarnHidden] = useState(false);

  // Transaction Section states.
  const [txType, setTxType] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txWallet, setTxWallet] = useState("");
  const [txDateTime, setTxDateTime] = useState("");
  const [txMsg, setTxMsg] = useState("");
  const [txErr, setTxErr] = useState("");

  // Process A submission.
  const handleProcessASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageA("");
    setErrorA("");
    try {
      const { data } = await axios.post(
        "/api/update-investment/processA",
        {
          email,
          totalDeposit: totalDeposit ? parseFloat(totalDeposit) : undefined,
          activeDeposit: targetActiveDeposit ? parseFloat(targetActiveDeposit) : undefined,
          duration: processADuration ? parseFloat(processADuration) : undefined,
          durationUnit: processADurationUnit,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessageA(data.message);
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setErrorA(errorMessage);
    }
  };

  // Process B submission.
  const handleProcessBSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageB("");
    setErrorB("");
    try {
      const { data } = await axios.post(
        "/api/update-investment/processB",
        {
          email,
          accountBalance: accountBalance ? parseFloat(accountBalance) : undefined,
          accountBalanceUpdateDuration: accountBalanceUpdateDuration ? parseFloat(accountBalanceUpdateDuration) : undefined,
          accountBalanceUpdateUnit: accountBalanceUpdateUnit,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessageB(data.message);
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setErrorB(errorMessage);
    }
  };

  // Withdrawal activation toggle.
  const handleWithdrawalToggle = async (currency: Currency) => {
    if (!email) {
      setWithdrawalErr("Please enter an email.");
      return;
    }
    const newState = !withdrawalActivation[currency];
    setWithdrawalActivation((prev) => ({ ...prev, [currency]: newState }));
    try {
      const { data } = await axios.post(
        "/api/update-investment/withdrawal",
        {
          email,
          currency,
          activate: newState,
          activationDuration: newState ? parseFloat(activationDurations[currency]) : 0,
          activationUnit: newState ? activationUnits[currency] : "min"
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWithdrawalMsg(data.message);
      setWithdrawalErr("");
    } catch (error: unknown) {
      setWithdrawalActivation((prev) => ({ ...prev, [currency]: !newState }));
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setWithdrawalErr(errorMessage);
      setWithdrawalMsg("");
    }
  };

  // Global display status toggle.
  const handleDisplayStatusToggle = async () => {
    if (!email) {
      setGlobalErr("Please enter an email before toggling global status.");
      return;
    }
    const newStatus = !displayStatus;
    setDisplayStatus(newStatus);
    try {
      const { data } = await axios.post(
        "/api/update-investment/display-status",
        { email, displayStatus: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setGlobalMsg(data.message);
      setGlobalErr("");
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setGlobalErr(errorMessage);
      setGlobalMsg("");
    }
  };

  // Update withdrawal status display.
  const handleWithdrawalStatusUpdate = async () => {
    try {
      const { data } = await axios.post(
        "/api/update-withdrawal-status",
        { email, header: wsHeader, message: wsMessage, buttonText: wsButtonText, hidden: warnHidden },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWsMsg(data.message);
      setWsErr("");
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setWsErr(errorMessage);
      setWsMsg("");
    }
  };

  // Clear a specific withdrawal status field.
  const handleClearField = async (field: "header" | "message" | "buttonText") => {
    let newWsHeader = wsHeader;
    let newWsMessage = wsMessage;
    let newWsButtonText = wsButtonText;

    if (field === "header") {
      newWsHeader = "";
      setWsHeader("");
    } else if (field === "message") {
      newWsMessage = "";
      setWsMessage("");
    } else if (field === "buttonText") {
      newWsButtonText = "";
      setWsButtonText("");
    }
    try {
      const { data } = await axios.post(
        "/api/update-withdrawal-status",
        { email, header: newWsHeader, message: newWsMessage, buttonText: newWsButtonText, hidden: warnHidden },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWsMsg(data.message || "Field update confirmed.");
      setWsErr("");
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setWsErr(errorMessage);
      setWsMsg("");
    }
  };

  // Toggle warning icon and button display.
  const handleToggleWarnAndButton = async () => {
    const newHidden = !warnHidden;
    try {
       await axios.post(
        "/api/update-withdrawal-status",
        { email, hidden: newHidden },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWsMsg(newHidden ? "Warning icon and button hidden." : "Warning icon and button displayed.");
      setWsErr("");
      setWarnHidden(newHidden);
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setWsErr(errorMessage);
      setWsMsg("");
    }
  };

  // Clear pending withdrawal.
  const clearPendingWithdrawal = async () => {
    try {
      const { data } = await axios.post(
        "/api/update-withdrawal",
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(data.message);
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      alert(errorMessage);
    }
  };

  // Transaction Section handler.
  const handleAddTransaction = async () => {
    if (!email || !txType || !txAmount || !txWallet || !txDateTime) {
      setTxErr("Please fill all transaction fields");
      return;
    }
    try {
      const { data } = await axios.post("/api/add-transaction", {
        email,
        type: txType,
        amount: parseFloat(txAmount),
        wallet: txWallet,
        dateTime: txDateTime,
      });
      setTxMsg(data.message);
      setTxErr("");
      // Clear transaction fields.
      setTxType("");
      setTxAmount("");
      setTxWallet("");
      setTxDateTime("");
    } catch (error: unknown) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setTxErr(errorMessage);
      setTxMsg("");
    }
  };

  // Logout handler.
  const handleLogout = async () => {
    try {
      await fetch("/api/adminlogout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error during admin logout", error);
    }
    router.push("/adminlogin");
  };
  
  // Client-side inactivity detection for admin page (15 minutes)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/adminlogin";
      }, 15 * 60 * 1000); // 15 minutes
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    resetTimer();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center font-sans">
      <nav className="w-full bg-black p-4 shadow-2xl fixed top-0 left-0 z-20 flex justify-between items-center">
        <div className="text-white text-xl font-bold tracking-wide">FundHive Admin</div>
        <button onClick={handleLogout} className="text-white glass bg-red-600 px-4 py-2 rounded-lg transition duration-300 hover:bg-red-700">
          Logout
        </button>
      </nav>

      <div className="mt-32 w-full px-4">
        <div className="mb-8">
          <label htmlFor="email" className="text-lg font-medium text-white">User Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
          />
        </div>

        <div className="grid lg:flex md:flex gap-4">
          {/* Process A Form */}
          <div className="lg:w-2/3 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">Process A: Active Deposit Increment</h2>
            <form onSubmit={handleProcessASubmit} className="space-y-4">
              <div>
                <label htmlFor="totalDeposit" className="text-lg text-white">Total Deposit:</label>
                <input
                  type="number"
                  id="totalDeposit"
                  value={totalDeposit}
                  onChange={(e) => setTotalDeposit(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="targetActiveDeposit" className="text-lg text-white">Active Deposit (Target):</label>
                <input
                  type="number"
                  id="targetActiveDeposit"
                  value={targetActiveDeposit}
                  onChange={(e) => setTargetActiveDeposit(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="processADuration" className="text-lg text-white">Process A Duration:</label>
                <input
                  type="number"
                  id="processADuration"
                  value={processADuration}
                  onChange={(e) => setProcessADuration(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="processADurationUnit" className="text-lg text-white">Process A Duration Unit:</label>
                <select
                  id="processADurationUnit"
                  value={processADurationUnit}
                  onChange={(e) => setProcessADurationUnit(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                >
                  <option value="min">Minutes</option>
                  <option value="hour">Hours</option>
                  <option value="day">Days</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                  Save Process A
                </button>
              </div>
              {messageA && <div className="text-blue-500 text-center">{messageA}</div>}
              {errorA && <div className="text-red-500 text-center">{errorA}</div>}
            </form>
          </div>

          {/* Process B Form */}
          <div className="lg:w-1/3 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">Process B: Account Balance Update</h2>
            <form onSubmit={handleProcessBSubmit} className="space-y-4">
              <div>
                <label htmlFor="accountBalance" className="text-lg text-white">Account Balance:</label>
                <input
                  type="number"
                  id="accountBalance"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="accountBalanceUpdateDuration" className="text-lg text-white">Balance Update Duration:</label>
                <input
                  type="number"
                  id="accountBalanceUpdateDuration"
                  value={accountBalanceUpdateDuration}
                  onChange={(e) => setAccountBalanceUpdateDuration(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="accountBalanceUpdateUnit" className="text-lg text-white">Balance Update Duration Unit:</label>
                <select
                  id="accountBalanceUpdateUnit"
                  value={accountBalanceUpdateUnit}
                  onChange={(e) => setAccountBalanceUpdateUnit(e.target.value)}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                >
                  <option value="min">Minutes</option>
                  <option value="hour">Hours</option>
                  <option value="day">Days</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                  Save Process B
                </button>
              </div>
              {messageB && <div className="text-blue-500 text-center">{messageB}</div>}
              {errorB && <div className="text-red-500 text-center">{errorB}</div>}
            </form>
          </div>
        </div>

        {/* Withdrawal Settings Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8 mb-8">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Withdrawal Settings</h2>
          {currencies.map((currency) => (
            <div key={currency} className="flex flex-col gap-2 border-b border-gray-600 py-4">
              {/* Duration inputs always visible */}
              <div className="flex gap-2 items-center">
                <label className="text-sm text-white">Duration:</label>
                <input
                  type="number"
                  placeholder="Duration"
                  value={activationDurations[currency]}
                  onChange={(e) =>
                    setActivationDurations((prev) => ({
                      ...prev,
                      [currency]: e.target.value,
                    }))
                  }
                  className="w-1/2 p-2 border border-gray-500 rounded-md bg-gray-700 text-white focus:outline-none"
                />
                <select
                  value={activationUnits[currency]}
                  onChange={(e) =>
                    setActivationUnits((prev) => ({
                      ...prev,
                      [currency]: e.target.value,
                    }))
                  }
                  className="w-1/2 p-2 border border-gray-500 rounded-md bg-gray-700 text-white focus:outline-none"
                >
                  <option value="min">Minutes</option>
                  <option value="hour">Hours</option>
                  <option value="day">Days</option>
                </select>
              </div>
              <p className="text-xs text-gray-300">
                Withdraw will display only after the specified duration has elapsed.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleWithdrawalToggle(currency)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors duration-300 ${
                    withdrawalActivation[currency]
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {withdrawalActivation[currency] ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
          {withdrawalMsg && <div className="mt-4 text-blue-500 text-center">{withdrawalMsg}</div>}
          {withdrawalErr && <div className="mt-4 text-red-500 text-center">{withdrawalErr}</div>}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="text-white text-lg">Display users withdrawal status:</span>
            <button
              onClick={handleDisplayStatusToggle}
              className={`px-4 py-2 rounded-md text-sm transition-colors duration-300 ${
                displayStatus ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {displayStatus ? "On" : "Off"}
            </button>
          </div>
          {globalMsg && <div className="mt-4 text-blue-500 text-center">{globalMsg}</div>}
          {globalErr && <div className="mt-4 text-red-500 text-center">{globalErr}</div>}

          {/* New Withdrawal Status Inputs */}
          <div className="mt-12 bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Update Withdrawal Status Display</h2>
            <div className="mb-4 flex items-center gap-2">
              <label className="block text-sm text-white mb-1">Header</label>
              <input
                type="text"
                value={wsHeader}
                onChange={(e) => setWsHeader(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-gray-800 text-white"
              />
              <button onClick={() => handleClearField("header")}>
                <MdDelete className="text-red-500" size={20} />
              </button>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <label className="block text-sm text-white mb-1">Message</label>
              <input
                type="text"
                value={wsMessage}
                onChange={(e) => setWsMessage(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-gray-800 text-white"
              />
              <button onClick={() => handleClearField("message")}>
                <MdDelete className="text-red-500" size={20} />
              </button>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <label className="block text-sm text-white mb-1">Button Text</label>
              <input
                type="text"
                value={wsButtonText}
                onChange={(e) => setWsButtonText(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-gray-800 text-white"
              />
              <button onClick={() => handleClearField("buttonText")}>
                <MdDelete className="text-red-500" size={20} />
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={handleWithdrawalStatusUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md transition hover:bg-blue-700"
              >
                Save Withdrawal Status
              </button>
            </div>
            {wsMsg && <div className="mt-4 text-blue-500 text-center">{wsMsg}</div>}
            {wsErr && <div className="mt-4 text-red-500 text-center">{wsErr}</div>}
            <div className="mt-6 text-center">
              <button
                onClick={handleToggleWarnAndButton}
                className="bg-purple-600 text-white px-4 py-2 rounded-md transition hover:bg-purple-700"
              >
                {warnHidden ? "Display warn and button" : "Remove warn and button"}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={clearPendingWithdrawal}
              className="bg-red-600 glass text-white px-4 py-2 rounded-md transition"
            >
              Clear user pending withdrawal
            </button>
          </div>

          {/* Transaction Section */}
          <div className="mt-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">Transaction Section</h2>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Type:</label>
              <input
                type="text"
                value={txType}
                onChange={(e) => setTxType(e.target.value)}
                placeholder="Deposit or Withdrawal"
                className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Amount:</label>
              <input
                type="number"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                placeholder="Amount"
                className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Wallet:</label>
              <select
                value={txWallet}
                onChange={(e) => setTxWallet(e.target.value)}
                className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
              >
                <option value="">Select Wallet</option>
                <option value="USDT TRC20">USDT TRC20</option>
                <option value="USDT ERC20">USDT ERC20</option>
                <option value="Bitcoin">Bitcoin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg text-white mb-2">Date &amp; Time:</label>
              <input
                type="datetime-local"
                value={txDateTime}
                onChange={(e) => setTxDateTime(e.target.value)}
                className="w-full p-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleAddTransaction}
                className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Save Transaction
              </button>
            </div>
            {txMsg && <div className="mt-4 text-blue-500 text-center">{txMsg}</div>}
            {txErr && <div className="mt-4 text-red-500 text-center">{txErr}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
