'use client';

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<boolean>(false);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [success,setSuccess] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reset-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Invalid response from server" }));
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await res.json();
      setMessage(data.message ||`${ <div className="text-green-600">Password updated successfully.</div>}`);
      setSuccess(true);
    } catch (error:unknown) {
      if(error instanceof Error) {
        setMessage(error.message || `${<div className="text-red-600">An error occurred. Please try again.</div>}`);
      } else {
        setMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  const toggle = () => {
    setShow(!show);
  };

  return (
  
    <div className="flex flex-col items-center justify-center h-screen bg">
      {!success ? (
          <>
          <h1 className="text-blue-500 font-semibold font-sans text-xl">Reset Password</h1>
          <form onSubmit={handleSubmit} className="mt-5">
            <label className="text-sm text-blue-500 mr-3">
              New Password:
            </label>
            <input
              type={show ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="outline-none border-[1.9px] border-blue-500 focus:border-blue-600 text-sm text-blue-500 px-2 py-1 rounded-sm"
            />
    
            <div className="mt-4">
              <button
                type="submit"
                className="w-full glass bg-blue-500 text-sm text-center hover:bg-blue-600 text-white transition-all ease-linear duration-200 delay-100 py-1 px-6 rounded"
              >
                Update Password
              </button>
            </div>
    
            <div className="w-full relative text-xs text-center align-middle flex items-center mt-3">
              {show ? (
                <p onClick={toggle} className="text-blue-400 ml-auto flex items-center text-center mr-2 cursor-pointer text-xs">
                  <FaRegSquare />
                </p>
              ) : (
                <p onClick={toggle} className="text-blue-400 ml-auto flex items-center text-center mr-2 cursor-pointer text-xs">
                  <FaCheckSquare />
                </p>
              )}
              <p className="text-xs text-blue-400 mr-3">Show password</p>
            </div>
          </form>
    
          {message && <p className="text-xs lg:text-center w-full ml-48 lg:ml-0 md:ml-0  mt-3">{message}</p>}
          </>
      ) : (
        <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full glass bg-green-500 text-white">
          <span className="text-lg font-bold">✓</span>
        </div>
        <h1 className="mt-3 text-blue-500 font-semibold">Password Updated Successfully</h1>
        <button
          onClick={() => window.location.href = "/login"} // Redirect to login
          className="mt-4 bg-blue-500 text-white py-2 glass px-4 rounded-full hover:bg-blue-600 transition-all duration-200 delay-100 ease-linear "
        >
          Login
        </button>
      </div>

      )}
      </div> 
  );
}

