"use client";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const Page = () => {
  const { t } = useLanguage();
  return (
    <div className="bg6 ">
      <Navbar />
      <div className="w-full bg-sky-600 bg-opacity-35">
        <div className="py-52 text-white flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold">{t("about.header.title")}</h1>
          <div className="flex items-center space-x-4 mt-4">
            <Link href={"/"}>
              <p>{t("about.breadcrumb.home")}</p>
            </Link>
            <span>-</span>
            <p>{t("about.breadcrumb.about")}</p>
          </div>
        </div>

        <div className="bg-white lg:flex lg:items-center py-24 lg:px-12 gap-4 px-2">
          <div className="w-full">
            <Image src="/Amp.png" alt="" width={500} height={500} />
          </div>

          <div className="w-full">
            <h1 className="text-3xl font-bold text-left lg:pt-0 pt-3">
              {t("about.section1.title")}
            </h1>
            <p className="leading-relaxed lg:py-4 lg:block hidden">
              {t("about.section1.desc")}
            </p>
            <p className="leading-relaxed text-gray-800 lg:py-8 py-6 lg:hidden block text-sm px-1">
              {t("about.section1.desc")}
            </p>
            <Link href={"/contactpage"}>
              <button className="group flex items-center justify-between lg:px-7 px-4 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-blue-400 bg-opacity-0 hover:bg-opacity-55 hover:text-white hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-500">
                <span className="ml-7 -translate-x-2 transition ease-in duration-75 text-center text-xs lg:text-sm">
                  {t("about.contact.button")}
                </span>
                <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 text-white transition duration-75">
                  <MdOutlineKeyboardArrowRight />
                </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="py-24 relative px-5 sm:px-8 md:px-10 bg-slate-50">
          <div className="w-full">
            <Image
              className="sm:w-full md:w-auto"
              src="/aboutus1.jpg"
              alt=""
              width={700}
              height={700}
            />
          </div>
          <div className="bluePrint hidden lg:block w-7/12 h-64 p-10 absolute right-[58px] top-[216px]">
            {/* This block will only show on large screens */}
          </div>
          <div className="bg-white w-full lg:pt-6 md:pt-5 pt-3 sm:w-10/12 md:w-10/12 lg:w-7/12 h-auto lg:h-64 lg:p-5 lg:px-10 md:p-10 lg:absolute md:absolute lg:right-16 lg:top-52 md:top-44 right-4 top-10 md:border-r-4 md:border-b-4 md:border-yellow-200 lg:border-none">
            <h1 className="text-2xl sm:text-3xl font-bold text-left pt-3 lg:pb-3 md:pb-3 pb-2 text-slate-900">
              {t("about.section2.title")}
            </h1>
            <p className="text-xs font-light sm:text-base text-slate-600">
              {t("about.section2.desc")}
            </p>
          </div>
        </div>

        <div className="pt-24 bg-slate-100">
          <div className="flex flex-col text-center items-center justify-center pb-10">
            <p className="text-sm tracking-wide">{t("sec3.header.prefix")}</p>
            <h1 className="text-3xl font-semibold">{t("sec3.header.title")}</h1>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:px-2 md:px-2 px-4">
            {/* Card 1: Risk Management */}
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/icon1.png" alt="" width={50} height={50} />
              </div>
              <div>
                <h1 className="text-lg font-semibold py-4">
                  {t("sec3.card1.title")}
                </h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  {t("sec3.card1.desc")}
                </p>
              </div>
            </div>

            {/* Card 2: Purpose-driven */}
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/Icon2.png" alt="" width={50} height={50} />
              </div>
              <div>
                <h1 className="text-lg font-semibold py-4">
                  {t("sec3.card2.title")}
                </h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  {t("sec3.card2.desc")}
                </p>
              </div>
            </div>

            {/* Card 3: Broad Scope */}
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/icon3.png" alt="" width={50} height={50} />
              </div>
              <div>
                <h1 className="text-lg font-semibold py-4">
                  {t("sec3.card3.title")}
                </h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  {t("sec3.card3.desc")}
                </p>
              </div>
            </div>

            {/* Card 4: Stability */}
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/icon4.png" alt="" width={50} height={50} />
              </div>
              <div>
                <h1 className="text-lg font-semibold py-4">
                  {t("sec3.card4.title")}
                </h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  {t("sec3.card4.desc")}
                </p>
              </div>
            </div>

            {/* Card 5: Diversity */}
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/icon5.png" alt="" width={50} height={50} />
              </div>
              <div>
                <h1 className="text-lg font-semibold py-4">
                  {t("sec3.card5.title")}
                </h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  {t("sec3.card5.desc")}
                </p>
              </div>
            </div>

            {/* Card 6: Experienced */}
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/icon6.png" alt="" width={50} height={50} />
              </div>
              <div>
                <h1 className="text-lg font-semibold py-4">
                  {t("sec3.card6.title")}
                </h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  {t("sec3.card6.desc")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-400 w-full lg:pl-10 md:pl-10 py-24 mt-24 lg:flex md:grid grid lg:gap-36 md:gap-10 gap-10 px-5 items-center">
            <div className="">
              <h2 className="lg:text-3xl md:text-3xl text-[1.700rem] font-bold tracking-tight pb-2 md:text-nowrap lg:text-nowrap">
                {t("sec3.affiliate.title")}
              </h2>
              <p className="text-white text-light lg:text-sm md:text-sm text-xs tracking-wide pb-8">
                {t("sec3.affiliate.desc")}
              </p>
              <Link href={"/contactpage"}>
                <button className="whitespace-nowrap group flex items-center justify-between px-7 py-2 relative text-white font-semibol bg-slate-900 hover:text-white hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-500">
                  <span className="ml-7 -translate-x-2 transition ease-in duration-75 text-center text-sm">
                    {t("sec3.affiliate.button")}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 text-white transition duration-300">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </button>
              </Link>
            </div>

            <div className="lg:flex md:flex grid grid-cols-2 lg:gap-16 md:gap-16 gap-10">
              <div className="">
                <h1 className="text-[2rem] font-semibold">
                  {t("sec3.stats.referralValue")}
                </h1>
                <p className="text-xs ">{t("sec3.stats.referralLabel")}</p>
              </div>

              <span className="border-l-[1px] h-16 hidden lg:block border-white"></span>

              <div>
                <h1 className="text-[2rem] font-semibold">
                  {t("sec3.stats.instantValue")}
                </h1>
                <p className="text-xs ">{t("sec3.stats.instantLabel")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
