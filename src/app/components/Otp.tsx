"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Otp = () => {
  let currentOTPIndex: number = 0;
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(59);
  const [err, setErr] = useState<string | null>(null);
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    if (!value) setActiveOtpIndex(currentOTPIndex - 1);
    else setActiveOtpIndex(currentOTPIndex + 1);
    setOtp(newOTP);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index;
    if (e.key === "Tab") {
      e.preventDefault();
      setActiveOtpIndex(currentOTPIndex + 1);
    }
    if (e.key === "Backspace" && !e.currentTarget.value) {
      e.preventDefault();
      setActiveOtpIndex(currentOTPIndex - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData("text");
    if (isNaN(Number(value))) return false;
    const updatedValue = value.toString().split("").slice(0, otp.length);
    setOtp(updatedValue);
    inputRef.current?.blur();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join("") }),
      });
      const data = await response.json();
      if (response.status === 404) {
        setErr("User not found");
      } else if (response.status === 401) {
        setErr("OTP expired");
      } else if (response.status === 400) {
        setErr("OTP incorrect");
      } else if (response.ok) {
        router.push("/login");
      } else {
        setErr(data.error || "Invalid OTP");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    setLoading(true);
    setIsResendAvailable(false);
    setTimer(59);
    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resend OTP");
      }
      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Error in handleResendOTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center bg p-6">
      <div className="flex flex-col items-start bg-gray-900/70 backdrop-blur-md sm:rounded-lg  shadow-2xl lg:w-[35rem] w-fit  lg:py-6 md:py-6 py-4 px-8 border-t-4 border-blue-400">
        <h1 className="text-xl font-semibold text-blue-300 sm:mb-2 mb-1 whitespace-nowrap">
          Enter OTP to verify your account
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 sm:mb-4 mb-2">
          OTP has been sent to your email
        </p>
        <form className="w-full flex justify-center mb-4 sm:mb-6" onSubmit={handleVerifyOTP}>
          <div className="flex space-x-3">
            {otp.map((_, index) => (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  type="number"
                  value={otp[index]}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border border-gray-500 rounded-lg bg-transparent text-center font-bold text-lg sm:text-xl md:text-2xl text-gray-300 focus:border-blue-400 focus:text-blue-400 transition duration-200"
                  maxLength={1}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  onChange={handleChange}
                  onPaste={handlePaste}
                />
                {index < otp.length - 1 && (
                  <span className="hidden sm:flex text-gray-400 text-xl items-center">-</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </form>
        <button
          onClick={handleVerifyOTP}
          className="group flex items-center justify-center w-full px-6 py-2 glass text-white bg-blue-600 rounded-md transition transform hover:scale-105 hover:bg-blue-700 duration-300"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="spinner animate-spin ml-4">
                <span className="block w-2 h-2 bg-blue-300 rounded-full"></span>
              </span>
            </span>
          ) : (
            <>
              <span className="text-sm sm:text-base">Verify</span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition">
                <MdOutlineKeyboardArrowRight />
              </span>
            </>
          )}
        </button>
        {err && <p className="text-red-400 text-xs sm:text-sm mt-2">{err}</p>}
        <div className="sm:pt-4 pt-2">
          {isResendAvailable ? (
            <button
              onClick={handleResendOTP}
              className="text-blue-300 text-xs sm:text-sm hover:underline"
              disabled={loading}
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-xs sm:text-sm text-gray-300">
              Resend available in {timer}s
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Otp;
