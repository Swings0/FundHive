'use client'
import React, { useState } from 'react';
import axios from 'axios';

// Define a type for the allowed currency values.
type Currency = "USDT TRC20" | "USDT ERC20" | "Bitcoin";

// Define an array of currencies.
const currencies: Currency[] = ["USDT TRC20", "USDT ERC20", "Bitcoin"];

const Page = () => {
  // Common field.
  const [email, setEmail] = useState('');

  // Process A fields.
  const [totalDeposit, setTotalDeposit] = useState<string>('');
  const [targetActiveDeposit, setTargetActiveDeposit] = useState<string>('');
  const [processADuration, setProcessADuration] = useState<string>('');
  const [processADurationUnit, setProcessADurationUnit] = useState<string>('min');

  // Process B fields.
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [accountBalanceUpdateDuration, setAccountBalanceUpdateDuration] = useState<string>('');
  const [accountBalanceUpdateUnit, setAccountBalanceUpdateUnit] = useState<string>('min');

  // Messages for Process A & B.
  const [messageA, setMessageA] = useState('');
  const [errorA, setErrorA] = useState('');
  const [messageB, setMessageB] = useState('');
  const [errorB, setErrorB] = useState('');

  // Withdrawal activation state.
  const [withdrawalActivation, setWithdrawalActivation] = useState<{ [key in Currency]: boolean }>({
    "USDT TRC20": false,
    "USDT ERC20": false,
    Bitcoin: false,
  });
  const [withdrawalMsg, setWithdrawalMsg] = useState('');
  const [withdrawalErr, setWithdrawalErr] = useState('');

  const handleProcessASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageA('');
    setErrorA('');
    try {
      const response = await axios.post(
        '/api/update-investment/processA',
        {
          email,
          totalDeposit: totalDeposit ? parseFloat(totalDeposit) : undefined,
          activeDeposit: targetActiveDeposit ? parseFloat(targetActiveDeposit) : undefined,
          duration: processADuration ? parseFloat(processADuration) : undefined,
          durationUnit: processADurationUnit,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessageA(response.data.message);
    } catch (error: unknown) {
      let errorMessage = 'An error occurred';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage;
      }
      setErrorA(errorMessage);
    }
  };

  const handleProcessBSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageB('');
    setErrorB('');
    try {
      const response = await axios.post(
        '/api/update-investment/processB',
        {
          email,
          accountBalance: accountBalance ? parseFloat(accountBalance) : undefined,
          accountBalanceUpdateDuration: accountBalanceUpdateDuration ? parseFloat(accountBalanceUpdateDuration) : undefined,
          accountBalanceUpdateUnit: accountBalanceUpdateUnit,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessageB(response.data.message);
    } catch (error: unknown) {
      let errorMessage = 'An error occurred';
      if (axios.isAxiosError(error)){
        errorMessage = error.response?.data?.message ?? errorMessage;
      }
      setErrorB(errorMessage);
    }
  };

  const handleWithdrawalToggle = async (currency: Currency) => {
    // Toggle the current state for the selected currency.
    const newState = !withdrawalActivation[currency];
    // Optimistically update the UI.
    setWithdrawalActivation(prev => ({ ...prev, [currency]: newState }));
    try {
      const response = await axios.post(
        '/api/update-investment/withdrawal',
        { email, currency, activate: newState },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setWithdrawalMsg(response.data.message);
      setWithdrawalErr('');
    } catch (error: unknown) {
      // Revert the UI if an error occurs.
      setWithdrawalActivation(prev => ({ ...prev, [currency]: !newState }));
      let errorMessage = 'An error occurred';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage;
      }
      setWithdrawalErr(errorMessage);
      setWithdrawalMsg('');
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center font-sans">
      <nav className="w-full bg-black p-4 shadow-2xl fixed top-0 left-0 z-20 flex justify-between items-center">
        <div className="text-white text-xl font-bold tracking-wide">FundHive</div>
        <button onClick={handleLogout} className="text-white bg-red-600 px-4 py-2 rounded-lg transition duration-300 hover:bg-red-700">
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Process A Form */}
          <div className="lg:w-2/3 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8">
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
          <div className="lg:w-1/3 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8">
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
        <div className="mt-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-3xl p-8">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">Withdrawal Settings</h2>
          {currencies.map((currency) => (
            <div key={currency} className="flex items-center justify-between border-b border-gray-600 py-4">
              <div className="text-white text-lg">{currency}</div>
              <button
                onClick={() => handleWithdrawalToggle(currency)}
                className={`px-4 py-2 rounded-md text-sm transition-colors duration-300 ${
                  withdrawalActivation[currency]
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {withdrawalActivation[currency] ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ))}
          {withdrawalMsg && <div className="mt-4 text-blue-500 text-center">{withdrawalMsg}</div>}
          {withdrawalErr && <div className="mt-4 text-red-500 text-center">{withdrawalErr}</div>}
        </div>
      </div>
    </div>
  );
};

export default Page
