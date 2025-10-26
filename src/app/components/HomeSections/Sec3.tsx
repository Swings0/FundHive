"use client";
import Image from "next/image";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Helper function to render text with line breaks based on <br /> tags.
// const renderTextWithBreaks = (text: string): React.ReactNode =>
//   text.split(/<br\s*\/?>/i).map((line, index, arr) => (
//     <React.Fragment key={index}>
//       {line}
//       {index < arr.length - 1 && <br />}
//     </React.Fragment>
//   ));

const Sec3 = () => {
  const { t } = useLanguage();

  return (
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
            <h1 className="text-lg font-semibold py-4">{t("sec3.card1.title")}</h1>
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
            <h1 className="text-lg font-semibold py-4">{t("sec3.card2.title")}</h1>
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
            <h1 className="text-lg font-semibold py-4">{t("sec3.card3.title")}</h1>
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
            <h1 className="text-lg font-semibold py-4">{t("sec3.card4.title")}</h1>
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
            <h1 className="text-lg font-semibold py-4">{t("sec3.card5.title")}</h1>
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
            <h1 className="text-lg font-semibold py-4">{t("sec3.card6.title")}</h1>
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
          <Link href={'/contactpage'}>
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
            <h1 className="text-[2rem] font-semibold">{t("sec3.stats.referralValue")}</h1>
            <p className="text-xs ">{t("sec3.stats.referralLabel")}</p>
          </div>

          <span className="border-l-[1px] h-16 hidden lg:block border-white"></span>

          <div>
            <h1 className="text-[2rem] font-semibold">{t("sec3.stats.instantValue")}</h1>
            <p className="text-xs ">{t("sec3.stats.instantLabel")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sec3;
