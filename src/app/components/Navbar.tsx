"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxEnter } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      offset: 200, // Offset in pixels
      once: true,
    });
  }, []);

  // const renderTextWithBreaks = (text: string): React.ReactNode =>
  //   text.split(/<br\s*\/?>/i).map((line, index, arr) => (
  //     <React.Fragment key={index}>
  //       {line}
  //       {index < arr.length - 1 && <br />}
  //     </React.Fragment>
  //   ));
  

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSecondNavbar, setShowSecondNavbar] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    // Show the second navbar when scrolling down past 50px
    if (window.scrollY > 30) {
      setShowSecondNavbar(true);
    } else {
      setShowSecondNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="relative w-full">
      <div className="flex justify-between lg:px-[2rem] px-[1rem] py-4 w-full fixed z-50 top-0 left-0">
        <div className="flex items-center">
          <Link className="flex items-center" href={"/"}>
            <Image
              className="w-10 opacity-95"
              src="/Fundhive1.svg"
              alt="Logo"
              width={0}
              height={0}
            />
            <h1 className="text-lg tracking-wide font-semibold text-white">
              FundHive
            </h1>
          </Link>
        </div>

        <div className="lg:hidden sm:ml-auto pt-3">
          <button
            onClick={handleToggle}
            className="text-white  bg-slate-900 p-3 rounded-full"
          >
            {isOpen ? <MdOutlineCancel /> : <RxHamburgerMenu />}
          </button>
        </div>

        <ul
          className={`lg:flex static ${
            isOpen
              ? "flex flex-col py-8 opacity-100 visible translate-y-0 h-screen"
              : "hidden"
          } lg:flex-row lg:items-center absolute lg:static top-full left-4 rounded-lg w-full lg:w-auto bg-slate-900 lg:bg-transparent lg:gap-4 p-4 lg:p-0 text-white text-sm gap-3`}
        >
          <span className="text-slate-900 bottom-[98.8%] absolute font-bold right-[46.7px] text-3xl">
            |
          </span>
          <li
            className={`delay-100 hover:text-cyan-300 transition-all duration-500 ease-linear`}
          >
            {" "}
            <Link href={"/"}>Home</Link>
          </li>
          <span className="lg:inline hidden text-white">-</span>
          <li
            className={`delay-100 hover:text-cyan-300 transition-all duration-500 ease-linear`}
          >
            <Link href={"/xaboutus"}>About us</Link>
          </li>
          <span className="lg:inline hidden text-white">-</span>
          <li
            className={`delay-100 hover:text-cyan-300 transition-all duration-500 ease-linear`}
          >
            {" "}
            <Link href={"/offers"}>Offers</Link>
          </li>
          <span className="lg:inline hidden text-white">-</span>
          <li
            className={`delay-100 hover:text-cyan-300 transition-all duration-500 ease-linear`}
          >
            <Link href={"/faq"}>FAQ</Link>{" "}
          </li>
          <span className="lg:inline hidden text-white">-</span>
          <li
            className={`delay-100 hover:text-cyan-300 transition-all duration-500 ease-linear`}
          >
            {" "}
            <Link href={"/terms"}>Terms</Link>
          </li>
          <span className="lg:inline hidden text-white">-</span>
          <li
            className={`delay-100 hover:text-cyan-300 transition-all duration-500 ease-linear`}
          >
            {" "}
            <Link href={"/contactpage"}>Contact us</Link>
          </li>

          <ul className="lg:hidden flex gap-3 ">
            <li className="whitespace-nowrap inline-flex items-center gap-1 delay-200  hover:text-cyan-300 transition-all duration-500 ease-linear">
              <Link className="inline-flex items-center gap-2" href={"/login"}>
               Login
                <span>
                  <RxEnter />
                </span>
              </Link>
            </li>
            <li className=" hover:text-cyan-300 transition-all duration-500 delay-200 ease-linear">
              <Link href={"/register"}>Register</Link>
            </li>
          </ul>
        </ul>

        <ul className="hidden lg:flex gap-6 items-center text-white cursor-pointer">
          <li className="whitespace-nowrap inline-flex items-center gap-2 hover:text-cyan-300 transition-all delay-200  duration-500 ease-linear">
            {" "}
            <Link className="inline-flex items-center gap-2" href={"/login"}>
              Login
              <span>
                <RxEnter />
              </span>
            </Link>
          </li>
          <li className=" hover:text-cyan-300 transition-all delay-200 duration-500 ease-linear">
            <Link href={"/register"}>Register</Link>{" "}
          </li>
        </ul>
      </div>

      {showSecondNavbar && (
        <div
          data-aos="zoom-out-down"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-transition="500"
          className={`flex shadow-sm justify-between lg:px-[2rem] px-[1rem] lg:py-4 py-4 w-full bg-slate-900 fixed z-50 top-0 left-0  transform ${
            showSecondNavbar ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-500`}
        >
          <div
            data-aos="fade-down"
            data-aos-duration="700"
            className="flex items-center"
          >
            <Link className="flex items-center" href={"/"}>
              <Image
                className="w-10 opacity-95"
                src="/Fundhive1.svg"
                alt="Logo"
                width={0}
                height={0}
              />
              <h1 className="text-lg tracking-wide font-semibold text-white">
                FundHive.
              </h1>
            </Link>
          </div>

          <div
            data-aos="fade-down"
            data-aos-duration="700"
            className="lg:hidden sm:ml-auto pt-3 static"
          >
            <button
              onClick={handleToggle}
              className="text-white absolute right-3"
            >
              {isOpen ? <MdOutlineCancel /> : <RxHamburgerMenu />}
            </button>
          </div>

          <ul
            data-aos="zoom-in"
            data-aos-duration="700"
            data-aos-transition="500"
            data-aos-delay="700"
            className={`hidden lg:flex items-center relative gap-4 text-white text-sm `}
          >
            <li className="hover:text-cyan-400 hover:border-b hover:border-cyan-400 transition-all ease-linear duration-300 delay-300">
              <Link href={"/"}>Home</Link>
            </li>
            <span className="text-white">-</span>
            <li className="hover:text-cyan-400 hover:border-b hover:border-cyan-400 transition-all ease-linear duration-300 delay-300">
              <Link href={"/xaboutus"}>About us</Link>
            </li>
            <span className="text-white">-</span>
            <li className="hover:text-cyan-400 hover:border-b hover:border-cyan-400 transition-all ease-linear duration-300 delay-300">
              <Link href={"/offers"}>Offers</Link>
            </li>
            <span className="text-white">-</span>
            <li className="hover:text-cyan-400 hover:border-b hover:border-cyan-400 transition-all ease-linear duration-300 delay-300">
              <Link href={"/faq"}>FAQ</Link>{" "}
            </li>
            <span className="text-white">-</span>
            <li className="hover:text-cyan-400 hover:border-b hover:border-cyan-400 transition-all ease-linear duration-300 delay-300">
              <Link href={"/terms"}>Terms</Link>
            </li>
            <span className="text-white">-</span>
            <li className="hover:text-cyan-400 hover:border-b hover:border-cyan-400 transition-all ease-linear duration-300 delay-300">
              <Link href={"/contactpage"}>Contact us</Link>
            </li>
          </ul>

          <ul
            data-aos="fade-down"
            data-aos-duration="1000"
            className="hidden lg:flex gap-6 items-center text-white"
          >
            <li className="whitespace-nowrap inline-flex items-center gap-2 hover:text-cyan-400 transition-all ease-linear duration-500  delay-200">
              {" "}
              <Link className="inline-flex items-center gap-2" href={"/login"}>
                Login
                <span>
                  <RxEnter />
                </span>
              </Link>
            </li>
            <li className="hover:text-cyan-400 transition-all ease-linear duration-500 delay-200">
              <Link href={"/register"}>Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
