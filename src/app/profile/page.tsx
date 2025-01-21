"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";
import { MdPermDeviceInformation } from "react-icons/md";
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
      if(error instanceof AxiosError){
        console.error(
          "Error updating account data:",
          error.response?.data || error
        );
        setModalMessage(
          error.response?.data?.message ||
            "An error occurred while updating account data."
        );
      } else if (error instanceof Error){
        console.error("Error updating account data:", error.message);
        setModalMessage(error.message || "An error occurred while updating account data.");
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
    <Layout username={''}>
      <div className="w-full bg-blue-50 rounded-lg shadow-md p-5 mt-[-20px] flex flex-row justify-end">
        <div className=" w-full mx-auto items-center gap-5">
          <h1 className="text-sm font-semibold opacity-80 ml-3 ">
            Your Account
          </h1>
          <div className="flex items-center w-full mx-auto">
            <div className="p-4">
              <Image
                className="opacity-80"
                src={"/avatar3.png"}
                alt=""
                width={100}
                height={100}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col gap-1">
                <div>
                  <p className="text-sm opacity-70">Username:</p>
                  <p className="text-xs mt-1">{displayUsername}</p>
                </div>
                <div>
                  <p className="text-sm opacity-70">Registration date:</p>
                  <p className="text-xs mt-1">
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
            className=" text-lg text-blue-600 cursor-pointer"
          >
            <MdPermDeviceInformation />
          </p>
        </div>

        {showInfo && userData && (
          <div
            data-aos="fade-down"
            data-aos-duration="500"
            className="absolute right-0 mt-20 mr-4   text-black rounded-md shadow-lg w-fit h-fit transition-all ease-linear delay-200 duration-300 opacity-100 transform translate-y-2 z-10 "
          >
            <ul className="text-xs">
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg rounded-t-md">
                <span className="font-semibold text-xs text-white">FullName:</span>
                <p className="text-xs text-blue-100">{userInfo?.fullname || "Not set"}</p>
              </li>
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg">
                <span className="font-semibold text-xs text-white ">Email:</span>
                <p className="text-xs text-blue-100">{userInfo?.email || "Not set"}</p>
              </li>
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg">
                <span className="font-semibold text-xs text-white">Username:</span>
                <p className="text-xs text-blue-100">{userInfo?.username || "Not set"}</p>
              </li>
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg">
                <span className="font-semibold text-xs text-white">USDT TRC20:</span>
                <p className="text-xs text-blue-100">{userInfo?.usdtTrc20Address || "Not set"}</p>
              </li>
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg">
                <span className="font-semibold text-xs text-white">USDT ERC20:</span>
                <p className="text-xs text-blue-100">{userInfo?.usdtErc20Address || "Not set"}</p>
              </li>
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg">
                <span className="font-semibold text-xs text-white">Bitcoin:</span>
                <p className="text-xs text-blue-100">{userInfo.bitcoinAddress || "Not set"}</p>
              </li>
              <li className="text-sm py-2 px-3 bg-blue-600 glass shadow-lg">
                <span className="font-semibold text-xs text-white">Phone:</span>
                <p className="text-xs text-blue-100">{userInfo.phone || "Not set"}</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="w-full bg-blue-600 glass rounded-lg shadow-md p-6 mt-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Enter full name:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Email:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">New Email:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">New Password:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {newPassword && (
            <div className="flex items-center justify-between">
              <label className="text-xs text-white">Retype Password:</label>
              <input
                className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">
              Your USDT TRC20 Withdrawal Address:
            </label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={usdtTrc20Address}
              onChange={(e) => setUsdtTrc20Address(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">
              Your USDT ERC20 Withdrawal Address:
            </label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={usdtErc20Address}
              onChange={(e) => setUsdtErc20Address(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">
              Your Bitcoin Withdrawal Address:
            </label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={bitcoinAddress}
              onChange={(e) => setBitcoinAddress(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">U-name</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Phone</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="pt-5 flex justify-end">
            <button
              type="submit"
              className={`update-btn ${
                isLoading
                  ? "loading text-white"
                  : "text-blue-600 bg-blue-400 glass px-4 py-2 rounded-sm font-semibold text-xs hover:bg-blue-600 hover:text-white transition-all delay-200 duration-300 ease-linear"
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
  );
};

export default Page;
