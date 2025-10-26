"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import parse from "html-react-parser";

const Sec1 = () => {
  const { t } = useLanguage();
  

  return (
    <div className="bg3">
      <div className="flex flex-col lg:items-end gap-5 lg:pt-24 lg:pb-8 pt-16">
        <h1
          className="lg:text-5xl text-3xl text-white font-bold leading-tight lg:mr-64 lg:mt-36 mt-32 lg:px-0 px-[1rem]"
          // Use html-react-parser to render the title with <br /> tags intact.
          >{parse(t("sec1.title"))}</h1>
        <p
          className="lg:mr-[6.32rem] lg:block hidden text-white leading-relaxed md:hidden px-[0] lg:text-base text-xs"
          dangerouslySetInnerHTML={{ __html: t("sec1.desc") }}
        ></p>
        <p
          className="lg:mr-[75px] lg:hidden md:block hidden text-white leading-relaxed lg:px-0 px-[1rem] lg:text-base text-xs"
          dangerouslySetInnerHTML={{ __html: t("sec1.desc") }}
        ></p>
        <p
          className="lg:mr-[75px] lg:hidden md:hidden text-white leading-relaxed lg:px-0 px-[1rem] text-xs"
          dangerouslySetInnerHTML={{ __html: t("sec1.desc2") }}
        ></p>
      </div>

      <div className="bg-cyan-400 text-slate-900 w-full lg:px-10 px-[1rem] py-12 mt-24">
        <span className="font-semibold text-sm">{t("sec1.committed")}</span>
        <h2 className="text-2xl font-bold tracking-tight lg:mb-5 mb-2">
          {t("sec1.resultsTitle")}
        </h2>
        <p
          className="lg:text-base lg:block hidden"
          dangerouslySetInnerHTML={{ __html: t("sec1.resultsDesc") }}
        ></p>
        <p
          className="lg:text-base text-sm lg:hidden block"
          dangerouslySetInnerHTML={{ __html: t("sec1.resultsDesc2") }}
        ></p>
      </div>

      <div className="bg-slate-100 lg:flex lg:items-center py-24 lg:px-12 gap-4 px-2">
        <div className="w-full">
          <Image src="/Amp.png" alt="" width={500} height={500} />
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold text-left lg:pt-0 pt-3">
            {t("sec1.beliefsTitle")}
          </h1>
          <p
            className="leading-loose lg:py-3 lg:block hidden"
            dangerouslySetInnerHTML={{ __html: t("sec1.beliefsDesc") }}
          ></p>
          <p
            className="leading-relaxed text-gray-800 lg:py-8 py-6 lg:hidden block text-sm px-1"
            dangerouslySetInnerHTML={{ __html: t("sec1.beliefsDesc") }}
          ></p>
          <Link href={"/xaboutus"}>
            <button className="group flex items-center justify-between lg:px-7 px-4 py-2 relative border border-blue-400 text-blue-400 font-semibold rounded-md bg-blue-400 bg-opacity-0 hover:bg-opacity-55 hover:text-white hover:transition-opacity hover:border-blue-200 hover:translate-y-px ease-in-out duration-500">
              <span className="ml-7 -translate-x-2 transition ease-in duration-75 text-center lg:text-sm text-xs">
                {t("sec1.learnMore")}
              </span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition duration-75">
                <MdOutlineKeyboardArrowRight />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sec1;
