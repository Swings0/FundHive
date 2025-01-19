import Image from "next/image";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const Sec3 = () => {
  return (
    <div className="pt-24 bg-slate-100">
      <div className="flex flex-col text-center items-center justify-center pb-10">
        <p className="text-sm tracking-wide">Designed For You</p>
        <h1 className="text-3xl font-semibold">Our Features</h1>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 lg:px-2 md:px-2 px-4">
        <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all  duration-700">
          <div>
            <Image src="/icon1.png" alt="" width={50} height={50} />
          </div>

          <div>
            <h1 className="text-lg font-semibold py-4">Risk Management</h1>
            <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
              We have established a rigorous risk management framework that
              features dedicated investment and operational risk teams who work
              to protect client assets.
            </p>
          </div>
        </div>

        <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all  duration-700">
          <div>
            <Image src="/icon2.png" alt="" width={50} height={50} />
          </div>

          <div>
            <h1 className="text-lg font-semibold py-4">Purpose-driven</h1>
            <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
              We understand that for many of our clients the impact of their
              portfolio is an important consideration in conjunction with
              investment performance.
            </p>
          </div>
        </div>

        <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all  duration-700">
          <div>
            <Image src="/icon3.png" alt="" width={50} height={50} />
          </div>

          <div>
            <h1 className="text-lg font-semibold py-4">Broad Scope</h1>
            <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
              We are a passionate, independent investment firm united by our
              commitment to research-driven investment solutions and client
              service.
            </p>
          </div>
        </div>

        <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all  duration-700">
          <div>
            <Image src="/icon4.png" alt="" width={50} height={50} />
          </div>

          <div>
            <h1 className="text-lg font-semibold py-4">Stability</h1>
            <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
              Our ability to deliver risk-adjusted returns to clients over time,
              and we stand by our record as a testament to the prowess of our
              investment professionals
            </p>
          </div>
        </div>

        <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all  duration-700">
          <div>
            <Image src="/icon5.png" alt="" width={50} height={50} />
          </div>

          <div>
            <h1 className="text-lg font-semibold py-4">Diversity</h1>
            <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
              Our portfolio management professionals are critical, independent
              thinkers who benefit from being part of a global, diverse
              investment organization.
            </p>
          </div>
        </div>

        <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all  duration-700">
          <div>
            <Image src="/icon6.png" alt="" width={50} height={50} />
          </div>

          <div>
            <h1 className="text-lg font-semibold py-4">Experienced</h1>
            <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
              Our clients benefit from the wisdom of our seasoned professionals,
              we are always looking to supplement their ranks with emerging
              talent.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-cyan-400 w-full lg:pl-10 md:pl-10 py-24 mt-24 lg:flex md:grid grid lg:gap-36 md:gap-10 gap-10 px-5 items-center ">
        <div className="">
          <h2 className="lg:text-3xl md:text-3xl text-[1.700rem] font-bold tracking-tight pb-2 md:text-nowrap  lg:text-nowrap   ">
            Affiliate Commission
          </h2>
          <p className="text-white text-light lg:text-sm md:text-sm text-xs tracking-wide pb-8">
            We offer a direct referral commission on every invested referral you
            sign up with your link.
          </p>

          <Link href={'/contactpage'} >
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
  );
};

export default Sec3;
