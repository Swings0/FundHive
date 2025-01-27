"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsPerson } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";
import axios from "axios"; // Import axios for API requests

interface Navbar1Props {
  username: string;
}

const Navbar1 = ({ username }: Navbar1Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch username from the backend API if the session is available
    if (session) {
      const fetchUsername = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/api/getuser");
          setFetchedUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsername();
    }
  }, [session]);

  // Fallback to the username from props or fetched data
  const displayUsername = fetchedUsername || username;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to login page after logout
  };

  return (
   <nav className="w-full fixed">
      <div className=" border-t-4 border-white text-white">
      </div>
      <div className="bg-blue-900 glass text-white flex h-16 items-center justify-between lg:px-6  py-1 shadow-sm">
        {/* Logo */}
        <div
          data-aos="fade-down"
          data-aos-duration="700"
          className="flex items-center lg:px-6 md:px-6 px-4"
        >
          <Link className="flex items-center" href={"/"}>
            <Image
              className="w-10 "
              src="/Fundhive1.svg"
              alt="Logo"
              width={0}
              height={0}
            />
            <h1 className="lg:text-lg md:text-lg text-sm tracking-wide font-semibold text-white lg:block md:block hidden">
              FundHive.
            </h1>
          </Link>
        </div>

        {/* User Dropdown */}
        <div className="relative ">
          {loading ? (
            <span className="flex items-center justify-center mr-3">
              <span className="button-loader py-1 ml-24">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          ) : (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none bg-gray-200 bg-opacity-0 hover:bg-opacity-20 rounded-full transition-all duration-700 ease-linear delay-300 py-2 lg:px-4 md:px-4 px-2 mr-1  flex items-center space-x-1 z-50"
              >
                <Image
                  className="mr-2 hidden md:block lg:block"
                  src="/avatar3.png"
                  alt=""
                  width={25}
                  height={25}
                />
                <span className="lg:text-sm md:text-sm text-xs font-semibold">{displayUsername}</span>
                <svg
                  className={`w-3 h-3 transform ${
                    dropdownOpen ? "rotate-180" : ""
                  } transition-transform`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </>
          )}

          {dropdownOpen && (
            <div
              data-aos="fade-down"
              data-aos-duration="1000"
              className="absolute overflow-visible right-0 mt-2 bg-white text-black rounded shadow-lg w-40 transition-all duration-300 opacity-100 transform translate-y-2 z-50"
            >
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded cursor-pointer">
                  <span className="flex items-center space-x-2">
                    <BsPerson className="text-lg" />
                    <Link href={"/profile"}><span>Profile</span></Link> 
                  </span>
                </li>

                <li className="px-4 py-2 hover:bg-gray-200 hover:rounded cursor-pointer">
                  <span className="flex items-center space-x-2">
                    <IoWalletOutline className="text-lg" />
                    <span>Withdraw</span>
                  </span>
                </li>

                <li onClick={handleLogout} className="px-4 py-4 hover:bg-gray-200 hover:rounded cursor-pointer text-red-500 border-t z-50">
                  <span className="flex items-center space-x-2">
                    <FaPowerOff className="text-xs" />
                    <span className="ml-2">Logout</span>
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

   </nav> 
  );
};

export default Navbar1;
