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
  const { data: session } = useSession();
  const router = useRouter();
  const [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null); // New state for registration date
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

  interface User {
    fullname?: string;
    username?: string;
    email?: string;
    phone?: string;
    usdtTrc20Address?: string;
    usdtErc20Address?: string;
    bitcoinAddress?: string;
    // other properties here
  }
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/getuser");
          setFetchedUsername(response.data.username || "");
          setEmail(response.data.email || "");
          setRegistrationDate(response.data.registrationDate || null); // Set registration date

          // setFetchedUsername(data.username || '');
          // setEmail(data.email || '');
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
      fullName: fullName.trim() || undefined,
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
        console.error(
          "Error updating account data:",
          error.response?.data || error
        );
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
            headers: { "user-id": session.user.id }, // Pass user ID from session
          });
          setUserData(response.data); // Set fetched data
        } catch (error) {
          console.error("Error fetching user data:", error);
          setModalMessage("Failed to load user data.");
          setIsModalVisible(true);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      offset: 200, // Offset in pixels
      once: false,
    });
  }, []);

  const displayUsername = fetchedUsername || "Guest";

  // if (isLoading) {
  //   return <p>Loading...</p>; // Show loading indicator while data fetch is in progress
  // }

  const userInfo = userData || {}; // Ensure safe access

  return (
    <div className="">
      <Layout username={""}>
        <div className="w-full bg-white rounded-sm shadow-sm lg:p-3 md:p-5 p-3 mt-[-24px] flex flex-row justify-end z-10 top">
          <div className=" w-full mx-auto items-center gap-5">
            <h1 className="text-sm font-semibold  text-gray-600 ml-3 ">
              Your Account
            </h1>
            <div className="flex items-center w-full mx-auto">
              <div className="p-4 top">
                <Image
                  className="opacity-80 img"
                  src={"/avatar3.png"}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>

              <div className="flex flex-col  ">
                <div className="flex flex-col gap-1 w-full my-4 lg:my-0 md:my-0 ">
                  <div>
                    <span className="text-sm  text-gray-600 relative">
                      Username:
                    </span>
                    <p className="text-xs lg:mt-1 md:mt-1">{displayUsername}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                      Registration date:
                    </p>
                    <p className="text-xs lg:mt-1 md:mt-1">
                      {registrationDate
                        ? new Date(registrationDate).toLocaleDateString()
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <p
              onClick={() => setShowInfo(!showInfo)}
              className=" text-lg text-blue-600 cursor-pointer hover:text-[1.22rem]  hover:text-blue-700 hover:rotate-180 duration-300 delay-100 transition-all ease-in-out "
            >
              <IoIosInformationCircle />
            </p>
          </div>

          {showInfo && userData && (
            <div
              data-aos="fade-down"
              data-aos-duration="500"
              className="absolute right-0 mt-20 lg:mr-3 text-black lg:rounded-md rounded-tl-md rounded-bl-md shadow-sm w-fit h-fit transition-all ease-linear delay-200 duration-300 opacity-100 transform translate-y-2 z-10 "
            >
              <ul className="text-xs">
                <li className="text-sm py-2 px-3 bg-white/40 backdrop-blur-md shadow-lg lg:rounded-t-md  rounded-tl-md  glass">
                  <span className="font-semibold text-xs text-slate-700">
                    Full Name:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo?.fullname || "Not set"}
                  </p>
                </li>
                <li className="text-sm py-2 px-3 bg-white/40 backdrop-blur-md shadow-lg glass">
                  <span className="font-semibold text-xs text-slate-700 ">
                    Email:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo?.email || "Not set"}
                  </p>
                </li>
                <li className="text-sm py-2 px-3 bg-white/40 backdrop-blur-md shadow-lg glass">
                  <span className="font-semibold text-xs text-slate-700">
                    Username:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo?.username || "Not set"}
                  </p>
                </li>
                <li className="text-sm py-2 px-3 bg-white/40 backdrop-blur-md shadow-lg glass">
                  <span className="font-semibold text-xs text-slate-700">
                    USDT TRC20:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo?.usdtTrc20Address || "Not set"}
                  </p>
                </li>
                <li className="text-sm py-2 px-3 bg-white/40 backdrop-blur-md shadow-lg glass">
                  <span className="font-semibold text-xs text-slate-700">
                    USDT ERC20:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo?.usdtErc20Address || "Not set"}
                  </p>
                </li>
                <li className="text-sm py-2 px-3 bg-white/40 backdrop-blur-md shadow-lg glass">
                  <span className="font-semibold text-xs text-slate-700">
                    Bitcoin:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo.bitcoinAddress || "Not set"}
                  </p>
                </li>
                <li className="text-sm py-2 pb-3 px-3 bg-white/40 backdrop-blur-md shadow-lg rounded-bl-md lg:rounded-bl-none glass">
                  <span className="font-semibold text-xs text-slate-700">
                    Phone:
                  </span>
                  <p className="text-xs text-gray-600">
                    {userInfo.phone || "Not set"}
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="w-full bg-slate-50 glass rounded-sm shadow-sm lg:p-5  md:p-6 py-5 px-4  mt-3 lg:mb-0 mb-10 profile">
          <form
            className="flex flex-col gap-3 p-1 vest"
            onSubmit={handleSubmit}
          >
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

            <div className="pt-3 flex lg:justify-end md:justify-end justify-center w-full  ">
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
