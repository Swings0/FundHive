// pages/login.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/adminlog", { email, password });

      // Save token in localStorage (or session storage)
      localStorage.setItem("token", response.data.token);

      // Redirect to admin page
      router.push("/adminpage");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-blue-800 text-2xl font-bold text-center">
          Admin Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="rounded-md border-t-2  border-blue-300 p-10 flex flex-col gap-4">
            <div>
              <label className="text-sm">Email:</label>
              <input
                className="border-b-2  border-r-2 bg-blue-50/50 border-double outline-none text-base rounded-lg focus:border-blue-500 w-full border-blue-400 p-[0.3rem] px-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm">Password:</label>
              <input
                className="border-b-2 border-r-2 bg-blue-50/50 border-double outline-none text-base rounded-lg focus:border-blue-500 w-full border-blue-400 p-[0.3rem] px-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white px-10 py-2 glass w-fit flex items-center justify-center self-center rounded-full transition-all ease-linear duration-200 ${
                loading
                  ? "opacity-80 glass cursor-not-allowed"
                  : "hover:bg-blue-600 hover:text-[17px]"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
