"use client"

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MdErrorOutline } from "react-icons/md";

interface WithdrawalStatusData {
  withdrawalStatusHeader: string;
  withdrawalStatusMessage: string;
  withdrawalStatusButtonText: string;
  withdrawalStatusHidden: boolean;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [wsData, setWsData] = useState<WithdrawalStatusData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWsData = async () => {
      try {
        if (!session?.user?.email) return;
        const response = await axios.get(
          `/api/getuser-investment?email=${session.user.email}`
        );
        const inv = response.data;
        setWsData({
          withdrawalStatusHeader: inv.withdrawalStatusHeader,
          withdrawalStatusMessage: inv.withdrawalStatusMessage,
          withdrawalStatusButtonText: inv.withdrawalStatusButtonText,
          withdrawalStatusHidden: inv.withdrawalStatusHidden,
        });
        setError("");
      } catch {
        setError("Error fetching withdrawal status data");
      }
    };
    fetchWsData();

    setLoading(status === "loading");
  }, [session, status]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout username={session?.user?.name || ""}>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="w-full bg-white rounded-sm shadow-sm shadow-gray-200 py-10 lg:px-8 md:px-8 px-2 mt-[-20px]">
          <div className="border-2 border-red-100 rounded-md p-4 mb-6">
            {!wsData?.withdrawalStatusHidden && wsData?.withdrawalStatusButtonText && (
              <div className="flex sm:items-start sm:justify-start items-center justify-center sm:mb-2 mb-1">
                <MdErrorOutline className="text-red-500" size={48} />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-red-950 sm:text-start text-center sm:mb-2 mb-3">
              {wsData?.withdrawalStatusHeader || "Withdrawal Status"}
            </h1>
            <p className="text-lg text-red-600 sm:text-start leading-6 text-center sm:mb-5 mb-6">
              {wsData?.withdrawalStatusMessage || "Loading..."}
            </p>
            {/* Display warning icon and button only if hidden flag is false */}
            {!wsData?.withdrawalStatusHidden && wsData?.withdrawalStatusButtonText && (
              <div className="flex flex-col items-center gap-4">
                <button className="bg-blue-600 text-white px-6 py-[6px] glass rounded-md hover:bg-blue-700 transition">
                  {wsData.withdrawalStatusButtonText}
                </button>
              </div>
            )}
          </div>
          {error && <div className="text-center text-red-500 mt-4">{error}</div>}
        </div>
      </Layout>
    </div>
  );
};

export default Page;
