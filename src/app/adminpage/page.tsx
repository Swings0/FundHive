// adminpage/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Page = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputToken, setInputToken] = useState("");

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("admin-token"); // Retrieve token from localStorage
    
        console.log("Admin token from localStorage:", token);  // Log the token
    
        if (!token) {
          console.log("No token found in localStorage");
          setIsAuthorized(false);
          return;
        }
    
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the Bearer prefix
          },
        });

        if (response.status === 200) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Authorization failed", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  const handleLogin = () => {
    if (inputToken === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      localStorage.setItem("admin-token", inputToken);
      setIsAuthorized(true);
    } else {
      alert("Invalid admin token!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate email and amount
    if (!email || !amount) {
      alert("Please provide both email and amount.");
      return;
    }
  
    // Parse amount to a number
    const parsedAmount = parseFloat(amount);
  
    if (isNaN(parsedAmount)) {
      alert("Please enter a valid amount.");
      return;
    }
  
    const token = localStorage.getItem("admin-token");
    if (!token) {
      alert("No admin token found!");
      return;
    }
  
    try {
      setLoading(true);
  
      console.log("Submitting data to backend:");
      console.log("Email:", email);
      console.log("Amount:", parsedAmount);
  
      // Send the request to the backend with email and amount as a number
      const response = await axios.post(
        "/api/update-deposit",
        { email, amount: parsedAmount }, // Ensure amount is a number
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check for success
      if (response.status === 200) {
        setMessage(response.data.message);
        setError("");
        setEmail("");
        setAmount("");
      } else {
        setError(response.data.error || "Error occurred");
        setMessage("");
      }
    } catch (error) {
      console.error("Error during the request:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  if (loading) return <div className="flex items-center justify-center h-screen w-full"> <p className=" text-white bg-blue-500 rounded-full py-2 px-4 font-semibold">Loading...</p></div>;

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-lg font-bold text-blue-950">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter Admin Token"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
          className="p-2 border rounded mt-2 outline-none border-gray-300 focus:border-border-500 placeholder:text-sm"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 transition-all duration-200 delay-100 text-white px-4 py-2 mt-4 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <Layout username="Admin Page">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Users Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded outline-none border-gray-300 focus:border-gray-500"
              required
            />
          </div>
          <div className="mt-4">
            <label>Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded outline-none border-gray-300 focus:border-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Page;

