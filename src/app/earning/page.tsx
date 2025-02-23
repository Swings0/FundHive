"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";

interface EarningsData {
  accountBalance: number;
}

interface UserData {
  registrationDate: string | null;
}

const Page = () => {
  const { data: session, status } = useSession();
//   const [earnings, setEarnings] = useState<number>(0);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    // Fetch investment data to get earnings (accountBalance)
    // const fetchEarnings = async () => {
    //   try {
    //     const response = await axios.get<EarningsData>(
    //       `/api/getuser-investment?email=${session.user.email}`
    //     );
    //     // Assume the "accountBalance" field holds the earned amount.
    //     setEarnings(response.data.accountBalance || 0);
    //     setError("");
    //   } catch (err: any) {
    //     console.error("Error fetching earnings:", err);
    //     setError("Error fetching earnings data");
    //   }
    // };

    // Fetch user data to get registration date
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(
          `/api/getuser?email=${session.user.email}`
        );
        setRegistrationDate(response.data.registrationDate);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
      }
    };

    // fetchEarnings();
    fetchUserData();
  }, [session, status]);

  useEffect(() => {
    setloading(status === "loading")
  }, [status]);


  return (
    <div className=" h-full">
      <Layout username={session?.user?.name || ""}>
        {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
             <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
            </div>
        )}
        <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-8 mt-[-20px]">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Your Earnings
          </h1>
          <div className="text-center">
            <p className="text-lg text-gray-700">
              Earned Total:{" "}
              <span className="font-bold text-blue-600">
                $0.00
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {registrationDate
                ? `Since ${new Date(registrationDate).toLocaleDateString()}`
                : "Registration date not available"}
            </p>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Page;
