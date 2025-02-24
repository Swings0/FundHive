import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg4">
      <Navbar />
      <div className="w-full bg-sky-600 bg-opacity-20 ">
        <div className="py-52 text-white flex flex-col  justify-center items-center">
          <h1 className="lg:text-5xl md:text-5xl text-3xl font-bold">
            Investment Plans
          </h1>
          <div className="flex items-center space-x-4 mt-4">
            <Link href={'/'}>
             <p>Home </p>
            </Link>
            <span>-</span>
            <p>Plans</p>
          </div>
        </div>

        <div className="py-24 bg-slate-900 bg-opacity-30 fill-teal-500 bg-blend-multiply backdrop-blur-lg border-t-[6px] border-slate-800 border-opacity-15   ">
          <div className="flex flex-col items-center justify-center text-white  lg:pb-10 pb-8">
            <span className="lg:text-base text-sm">OUR</span>
            <h2 className="lg:text-3xl text-[1.775rem] font-bold">
              Investment Plans
            </h2>
          </div>

          <div className="md:relative lg:static lg:flex lg:flex-wrap md:grid md:grid-cols-12 md:gap-4 grid px-2 gap-4 lg:px-0  lg:gap-4 items-center justify-center md:px-10  ">
            <div className="md:col-span-6 lg:w-80 lg:h-96 md:w-80 md:h-96 w-72 h-96 group bg-white rounded-md flex flex-col items-center justify-center  bg-opacity-100 hover:bg-slate-900 transition duration-500 hover:bg-opacity-50 border border-white hover:border-slate-900  ">
              <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-400 transition duration-500 lg:text-center">
                Gold plan
              </p>
              <h1 className="text-black text-lg pt-3 font-bold group-hover:text-white transition duration-500">
                3.4% Daily
              </h1>
              <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-400 transition duration-500">
                For 14 Days
              </p>

              <ul className="text-center text-sm  text-gray-500 leading-loose py-8 group-hover:text-gray-400 transition duration-500">
                <li>Stable Profit</li>
                <li>Minimum Amount - $200</li>
                <li> Maximum Amount - $20,000</li>
                <li>Support Service - 24/7</li>
              </ul>

              <Link href={"register"}>
                <button className="group flex items-center justify-between px-7 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-opacity-0 hover:bg-opacity-55 transition hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-700">
                  <span className="ml-7 whitespace-nowrap -translate-x-2 transition ease-in duration-75 text-center text-xs lg:text-sm">
                    Invest Now
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition duration-75 group-hover:text-blue-400 hover:text-white">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </button>
              </Link>
            </div>

            <div className="md:col-span-6 lg:w-80 lg:h-96 md:w-80 md:h-96 w-72 h-96 relative group bg-slate-900 bg-opacity-90 rounded-md flex flex-col items-center justify-center   hover:bg-slate-900 transition duration-500 hover:bg-opacity-50  ">
              <div className="absolute left-4 top-4">
                <p className="text-white bg-red-600 rounded-sm py-1 px-2 text-xs font-semibold">
                  HOT!
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-400 transition duration-500 text-center">
                Diamond plan
              </p>
              <h1 className="text-white text-lg pt-3 font-bold group-hover:text-white transition duration-500">
                3.6% Daily
              </h1>
              <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-400 transition duration-500">
                For 8 Days
              </p>

              <ul className="text-center text-sm text-gray-500 leading-loose py-8 group-hover:text-gray-400 transition duration-500">
                <li>Stable Profit</li>
                <li>Minimum Amount - $25,000</li>
                <li> Maximum Amount - $40,000</li>
                <li>Support Service - 24/7</li>
              </ul>

              <Link href={"register"}>
                <button className="group flex items-center justify-between px-7 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-opacity-0 hover:bg-opacity-55 transition hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-700">
                  <span className="ml-7 whitespace-nowrap -translate-x-2 transition ease-in duration-75 text-center text-xs lg:text-sm">
                    Invest Now
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition duration-75 group-hover:text-blue-400 hover:text-white">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </button>
              </Link>
            </div>

            <div className="md:col-span-6 lg:w-80 lg:h-96 md:w-80 md:h-96 w-72 h-96  group bg-white rounded-md  flex flex-col items-center justify-center bg-opacity-100 hover:bg-slate-900 transition duration-500 hover:bg-opacity-50 border border-white hover:border-slate-900 ">
              <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-400 transition duration-500 text-center">
                Zonal Representative
              </p>
              <h1 className="text-black text-lg pt-3 font-bold group-hover:text-white transition duration-500">
                4% Daily
              </h1>
              <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-400 transition duration-500">
                For 6 Days
              </p>

              <ul className="text-center text-sm text-gray-500 leading-loose py-8 group-hover:text-gray-400 transition duration-500">
                <li>Stable Profit</li>
                <li>Minimum Amount - $50,000</li>
                <li> Maximum Amount - $1,000,000</li>
                <li>Support Service - 24/7</li>
              </ul>

              <Link href={"register"}>
                <button className="group flex items-center justify-between px-7 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-opacity-0 hover:bg-opacity-55 transition hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-700">
                  <span className="ml-7 whitespace-nowrap -translate-x-2 transition ease-in duration-75 text-center text-xs lg:text-sm">
                    Invest Now
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition duration-75 group-hover:text-blue-400 hover:text-white">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </button>
              </Link>
            </div>

            <div className="md:absolute md:bottom-[5rem] md:right-[55px] lg:static lg:grid lg:grid-cols-2 lg:gap-4 md:gap-4 md:col-span-9 md:flex md:flex-col justify-between grid gap-4">
              <div className="group lg:w-80 lg:h-36 md:w-80 md:h-36 w-72 h-36 bg-white rounded-md flex flex-col items-center justify-center bg-opacity-100 hover:bg-slate-900 transition duration-500 hover:bg-opacity-50 border border-white hover:border-slate-900  ">
                <h1 className="text-black text-lg pt-3 font-bold group-hover:text-white transition duration-500 pb-3">
                  Ambassador Plan
                </h1>

                <Link href={"/contactpage"}>
                  <button className="group flex items-center justify-between px-7 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-opacity-0 hover:bg-opacity-55 transition hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-700">
                    <span className="ml-7 whitespace-nowrap -translate-x-2 transition ease-in duration-75 text-center text-xs lg:text-sm">
                      Contact Support
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition duration-75 group-hover:text-blue-400 hover:text-white">
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </button>
                </Link>
              </div>

              <div className="group lg:w-80 lg:h-36 md:w-80 md:h-36 w-72 h-36 bg-white rounded-md flex flex-col items-center justify-center  bg-opacity-100 hover:bg-slate-900 transition duration-500 hover:bg-opacity-50  border  border-white hover:border-slate-900 ">
                <h1 className="text-black text-lg pt-3 font-bold group-hover:text-white transition duration-500 text-center pb-3">
                  Savings/Fixed Deposits <br /> Plan
                </h1>

                <Link href={"/contactpage"}>
                  <button className="group flex items-center justify-between px-7 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-opacity-0 hover:bg-opacity-55 transition hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-700">
                    <span className="ml-7 whitespace-nowrap -translate-x-2 transition ease-in duration-75 text-center text-xs lg:text-sm">
                      Contact Support
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition duration-75 group-hover:text-blue-400 hover:text-white">
                      <MdOutlineKeyboardArrowRight />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-400 w-full lg:pl-10 md:pl-10 py-24  lg:flex md:grid grid lg:gap-36 md:gap-10 gap-10 px-5 items-center ">
          <div className="">
            <h2 className="lg:text-3xl md:text-3xl text-[1.700rem] font-bold tracking-tight pb-2 md:text-nowrap  lg:text-nowrap   ">
              Affiliate Commission
            </h2>
            <p className="text-white text-light lg:text-sm md:text-sm text-xs tracking-wide pb-8">
              We offer a direct referral commission on every invested referral
              you sign up with your link.
            </p>

            <Link href={"/contactpage"}>
              <button className="whitespace-nowrap group flex items-center justify-between  px-7 py-2 relative  text-white font-semibol bg-slate-900  hover:text-white hover:transition-opacity hover:border-blue-200  hover:translate-y-px ease-in-out duration-500">
                <span className="ml-7  -translate-x-2 transition ease-in duration-75 text-center text-sm">
                  Contact Us To Learn More
                </span>
                <span className=" opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 text-white  transition duration-300">
                  <MdOutlineKeyboardArrowRight />
                </span>
              </button>
            </Link>
          </div>

          <div className="lg:flex md:flex grid grid-cols-2 lg:gap-16 md:gap-16 gap-10  ">
            <div className="">
              <h1 className="text-[2rem] font-semibold">10%</h1>
              <p className="text-xs ">Referral Commission</p>
            </div>

            <span className=" border-l-[1px] h-16 hidden lg:block border-white  "></span>

            <div>
              <h1 className="text-[2rem] font-semibold">Instant</h1>
              <p className="text-xs ">Payment</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
