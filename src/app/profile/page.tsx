"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";
import { IoIosInformationCircle } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [usdtTrc20Address, setUsdtTrc20Address] = useState<string>("");
  const [usdtErc20Address, setUsdtErc20Address] = useState<string>("");
  const [bitcoinAddress, setBitcoinAddress] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  interface User {
    fullname?: string;
    username?: string;
    email?: string;
    phone?: string;
    usdtTrc20Address?: string;
    usdtErc20Address?: string;
    bitcoinAddress?: string;
  }
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/getuser");
          // setFetchedUsername(response.data.username || "");
          setEmail(response.data.email || "");
          setRegistrationDate(response.data.registrationDate || null);
          setFullName(response.data.fullname || "");
          setUserName(response.data.username || "");
          setRegistrationDate(response.data.registrationDate || null);
          setUsdtTrc20Address(response.data.usdtTrc20Address || "");
          setUsdtErc20Address(response.data.usdtErc20Address || "");
          setBitcoinAddress(response.data.bitcoinAddress || "");
          setPhone(response.data.phone || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== retypePassword) {
      setModalMessage("Passwords do not match.");
      setIsModalVisible(true);
      return;
    }

    const payload = {
      fullname: fullName.trim() || undefined, // Changed from fullName to fullname
      email: email.trim() || undefined,
      newEmail: newEmail.trim() || undefined,
      newPassword: newPassword || undefined,
      retypePassword: retypePassword || undefined,
      usdtTrc20Address: usdtTrc20Address.trim() || undefined,
      usdtErc20Address: usdtErc20Address.trim() || undefined,
      bitcoinAddress: bitcoinAddress.trim() || undefined,
      userName: userName.trim() || undefined,
      phone: phone.trim() || undefined,
    };
    

    setIsLoading(true);

    try {
      const response = await axios.post("/api/update-user", payload);

      if (response.status === 200) {
        setModalMessage(response.data.message);
        setIsModalVisible(true);

        if (response.data.message.includes("log in again")) {
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }

        setFullName("");
        setUserName("");
        setNewPassword("");
        setRetypePassword("");
        setEmail("");
        setNewEmail("");
        setUsdtTrc20Address("");
        setUsdtErc20Address("");
        setBitcoinAddress("");
        setPhone("");
      } else {
        setModalMessage("Failed to update account data.");
        setIsModalVisible(true);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error updating account data:", error.response?.data || error);
        setModalMessage(
          error.response?.data?.message ||
            "An error occurred while updating account data."
        );
      } else if (error instanceof Error) {
        console.error("Error updating account data:", error.message);
        setModalMessage(
          error.message || "An error occurred while updating account data."
        );
      }
      setIsModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/displayinfo", {
            headers: { "user-id": session.user.id },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setModalMessage("Failed to load user data.");
          setIsModalVisible(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 200,
      once: false,
    });
  }, []);


  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);


  return (
    <div className="">
      <Layout username={""}>
        {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="loader border-y-2 border-blue-300 rounded-full animate-spin"></div>
            </div>
          )}
        {/* Profile Header */}
        <div className="relative flex flex-col sm:flex-row items-center bg-white/80 backdrop-blur-lg mb-3 transform transition-transform hover:scale-100 w-full rounded-sm shadow-sm p-5 mt-[-24px] z-10">
          {/* Avatar Container */}
          <div className="relative w-24 h-24 sm:w-[7rem] sm:h-[7rem] mb-4 sm:mb-0 p-3 ml-3 mr-0 sm:mr-5">
            <Image
              src={"/avatar3.png"}
              alt="Profile Picture"
              layout="fill"
              className="rounded-full shadow-xl"
            />
          </div>
          {/* User Details */}
          <div className="flex flex-col items-center sm:items-start mb-3 text-center sm:text-left">
            <h1 className="lg:text-2xl md:text-2xl text-xl font-bold text-blue-800 mb-1">
              <span className="font-sans inline-block break-words" >{userData?.fullname || fullName || "Not set..."}</span> 
            </h1>
            <p className="text-sm text-slate-500 mb-0">
              {userData?.email || email || "loading..."}
            </p>
            <p className="text-xs text-slate-400">
              Registration date:{" "}
              {registrationDate
                ? new Date(registrationDate).toLocaleDateString()
                : "loading..."}
            </p>
          </div>
          {/* Info Icon */}
          <div className="absolute top-4 right-4">
            <p
              onClick={() => setShowInfo(!showInfo)}
              className="text-xl text-blue-600 cursor-pointer transition-transform transform hover:rotate-180"
            >
              <IoIosInformationCircle />
            </p>
          </div>
          {showInfo && userData && (
            <div
              data-aos="fade-down"
              className="absolute right-0 top-9 mt-4 bg-white/70 backdrop-blur-lg shadow-lg rounded-lg p-3 z-10"
            >
              <ul className="text-xs text-gray-700">
                <li className="py-1">
                  <span className="font-semibold text-slate-600">Full Name:</span>{" "}
                  {userData.fullname || "Not set"}
                </li>
                <li className="py-1">
                  <span className="font-semibold text-slate-600">Email:</span>{" "}
                  {userData.email || "Not set"}
                </li>
                <li className="py-1">
                  <span className="font-semibold text-slate-600">Username:</span>{" "}
                  {userData.username || "Not set"}
                </li>
                <li className="py-1">
                  <span className="font-semibold text-slate-600">USDT TRC:</span>{" "}
                  {userData.usdtTrc20Address || "Not set"}
                </li>
                <li className="py-1">
                  <span className="font-semibold text-slate-600">USDT ERC:</span>{" "}
                  {userData.usdtErc20Address || "Not set"}
                </li>
                <li className="py-1">
                  <span className="font-semibold text-slate-600">Bitcoin:</span>{" "}
                  {userData.bitcoinAddress || "Not set"}
                </li>
                <li className="py-1">
                  <span className="font-semibold text-slate-600">Phone:</span>{" "}
                  {userData.phone || "Not set"}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Form */}
        <div className="w-full bg-slate-50 glass rounded-sm shadow-sm lg:p-5 md:p-6 py-5 px-4 mt-3 lg:mb-0 mb-10 profile">
          <form className="flex flex-col gap-3 p-1 vest" onSubmit={handleSubmit}>
            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                Enter full name:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                Email:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                New Email:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                New Password:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {newPassword && (
              <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
                <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                  Retype Password:
                </label>
                <input
                  className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                  type="password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
            )}

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                Your USDT TRC20 Withdrawal Address:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="text"
                value={usdtTrc20Address}
                onChange={(e) => setUsdtTrc20Address(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                Your USDT ERC20 Withdrawal Address:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="text"
                value={usdtErc20Address}
                onChange={(e) => setUsdtErc20Address(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                Your Bitcoin Withdrawal Address:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="text"
                value={bitcoinAddress}
                onChange={(e) => setBitcoinAddress(e.target.value)}
              />
            </div>

            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                U-name:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between grid">
              <label className="text-xs text-slate-800 mb-1 lg:mb-0 md:mb-0">
                Phone:
              </label>
              <input
                className="bg-transparent text-slate-800 focus:text-blue-700 outline-none border-[1.3px] border-slate-300 rounded-sm focus:border-blue-500 px-2 lg:text-sm md:text-sm text-base py-[2px] lg:w-[60%] md:w-[60%] w-full"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="pt-3 flex lg:justify-end md:justify-end justify-center w-full">
              <button
                type="submit"
                className={`update-btn ${
                  isLoading
                    ? "loading text-blue-600"
                    : "text-blue-50 bg-blue-500 glass px-4 py-2 rounded-sm font-semibold text-xs hover:bg-blue-600 hover:text-white transition-all delay-200 duration-300 ease-linear lg:w-fit md:w-fit w-full"
                }`}
              >
                {isLoading ? (
                  <span className="spinner"></span> // Add a spinner when loading
                ) : (
                  "Add or Change Account Data"
                )}
              </button>
            </div>
          </form>
        </div>
        <Modal
          isVisible={isModalVisible}
          message={modalMessage}
          onClose={() => setIsModalVisible(false)}
        />
      </Layout>
    </div>
  );
};

export default Page;
