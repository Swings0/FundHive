"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg8">
      <Navbar />
      <div className="w-full bg-cyan-600 bg-opacity-40">
        <div className="py-52 text-white flex flex-col justify-center items-center">
          <h1 className="lg:text-5xl md:text-3xl text-3xl font-bold text-center">
            {t("terms.header.title")}
          </h1>
          <div className="flex items-center space-x-4 mt-4">
            <Link href={'/'}>
              <p>{t("terms.breadcrumb.home")}</p>
            </Link>
            <span>-</span>
            <p>{t("terms.breadcrumb.terms")}</p>
          </div>
        </div>

        <div className="bg-slate-50 flex flex-col justify-center items-center py-24">
          <div className="flex flex-col items-center justify-center text-slate-900 lg:pb-10 pb-8">
            <h2 className="lg:text-3xl md:text-3xl text-center text-[1.665rem] font-bold">
              {t("terms.section.header")}
            </h2>
          </div>

          <div className="bg-white rounded-md shadow-sm font-light lg:font-normal md:font-normal border-2 border-[#d9e2ea] hover:border-opacity-10 hover:shadow-md transition-all ease-linear duration-700 px-8 mx-6 md:px-10 md:mx-10 lg:px-10 lg:mx-10 py-14 space-y-5">
            <Image src="/icon3.png" alt="" width={50} height={50} />
            <h1 className="font-semibold text-md text-slate-900">
              {t("terms.section.intro")}
            </h1>
            <div className="space-y-8 text-sm">
              <p>{t("terms.section.p1")}</p>
              <p>{t("terms.section.p2")}</p>
              <p className="font-semibold">{t("terms.section.trademarks")}</p>
              <p>{t("terms.section.trademarks.desc")}</p>
              <p className="font-semibold">{t("terms.section.noWarranties")}</p>
              <p>{t("terms.section.noWarranties.desc")}</p>
              <p className="font-semibold">{t("terms.section.limitation")}</p>
              <p>{t("terms.section.limitation.desc")}</p>
              <p className="font-semibold">{t("terms.section.content")}</p>
              <p>{t("terms.section.content.desc")}</p>
              <p className="font-semibold">{t("terms.section.links")}</p>
              <p>{t("terms.section.links.desc")}</p>
              <p className="font-semibold">{t("terms.section.privacy")}</p>
              <p>{t("terms.section.privacy.desc")}</p>
              <p className="font-semibold">{t("terms.section.personal")}</p>
              <p>{t("terms.section.personal.desc")}</p>
              <p className="font-semibold">{t("terms.section.cookies")}</p>
              <p>{t("terms.section.cookies.desc")}</p>
              <p className="font-semibold">{t("terms.section.thirdParty")}</p>
              <p>{t("terms.section.thirdParty.desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cyan-400 w-full lg:pl-10 md:pl-10 py-24 lg:flex md:grid grid lg:gap-36 md:gap-10 gap-10 px-5 items-center">
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

      <Footer />
    </div>
  );
};

export default TermsPage;
