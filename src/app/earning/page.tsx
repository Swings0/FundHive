"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";

interface UserData {
  registrationDate: string | null;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [registrationDate, setRegistrationDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(
          `/api/getuser?email=${session.user.email}`
        );
        setRegistrationDate(response.data.registrationDate);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Error fetching user data:", err.response?.data?.message || err.message);
        } else {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, [session, status]);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <div className="h-full">
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
              <span className="font-bold text-blue-600">$0.00</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {registrationDate
                ? `Since ${new Date(registrationDate).toLocaleDateString()}`
                : "Registration date not available"}
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;
