import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg6 ">
      <Navbar />
      <div className="w-full bg-sky-600 bg-opacity-35 ">
        <div className="py-52 text-white flex flex-col  justify-center items-center">
          <h1 className="text-5xl font-bold">About Us</h1>
          <div className="flex items-center space-x-4 mt-4">
            <p>Home </p>
            <span>-</span>
            <p>About us </p>
          </div>
        </div>

        <div className="bg-white lg:flex lg:items-center py-24 lg:px-12 gap-4 px-2  ">
          <div className="w-full">
            <Image
              className=""
              src="/Amp.png"
              alt=""
              width={500}
              height={500}
            />
          </div>

          <div className="w-full ">
            <h1 className="text-3xl font-bold text-left lg:pt-0 pt-3">
              Built For You
            </h1>

            <p className="leading-relaxed lg:py-4 lg:block hidden">
              FundHive Corporate delivers world-class investment services,
              institutional asset management and financial advisory services
              under one distinguished banner. We operate thoughtful innovation
              across asset classes and global markets. Through our expertise and
              dedication, we transform the plans of the world&apos;s most successful
              individuals, families and institutions into action so that we can
              help our clients reach their most ambitious goals. Spanning
              decades and generations, our longevity comes from the recognition
              that we are more than a financial institution. We&apos;re legal and
              registered, learn more by clicking the link below.
            </p>

            <p className="leading-relaxed text-gray-800 lg:py-8 py-6 lg:hidden block text-sm px-1">
              FundHive Corporate delivers world-class investment services,
              institutional asset management and financial advisory services
              under one distinguished banner. We operate thoughtful innovation
              across asset classes and global markets. Through our expertise and
              dedication, we transform the plans of the world&apos;s most successful
              individuals, families and institutions into action so that we can
              help our clients reach their most ambitious goals. Spanning
              decades and generations, our longevity comes from the recognition
              that we are more than a financial institution. We&apos;re legal and
              registered, learn more by clicking the link below.
            </p>

            <Link href={"/contactpage"}>
              <button className="group flex items-center justify-between  lg:px-7 px-4 py-2 relative border border-blue-400  text-blue-400 font-semibold rounded-md bg-blue-400 bg-opacity-0 hover:bg-opacity-55 hover:text-white hover:transition-opacity hover:border-blue-200  hover:translate-y-px ease-in-out duration-500">
                <span className="ml-7  -translate-x-2 transition ease-in duration-75 text-center lg:text-sm text-xs ">
                  OUR CONTACT
                </span>
                <span className=" opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 text-white  transition duration-75">
                  <MdOutlineKeyboardArrowRight />
                </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="py-24 relative px-5 sm:px-8 md:px-10 bg-slate-50">
          <div className="w-full">
            <Image
              className=" sm:w-full md:w-auto"
              src="/aboutus1.jpg"
              alt=""
              width={700}
              height={700}
            />
          </div>

          <div className="bluePrint hidden lg:block w-7/12 h-64 p-10 absolute right-[58px] top-[216px]">
            {/* This block will only show on large screens */}
          </div>

          <div className="bg-white w-full lg:pt-6 md:pt-5 pt-3 sm:w-10/12 md:w-10/12 lg:w-7/12 h-auto lg:h-64 lg:p-5 lg:px-10  md:p-10 lg:absolute md:absolute lg:right-16 lg:top-52 md:top-44 right-4 top-10  md:border-r-4 md:border-b-4 md:border-yellow-200 lg:border-none">
            <h1 className="text-2xl sm:text-3xl font-bold text-left pt-3 lg:pb-3 md:pb-3 pb-2 text-slate-900">
              Our Vision
            </h1>
            <p className=" text-xs font-light sm:text-base text-slate-600">
              FundHive Corporate is committed to creating a global, innovative,
              and dynamic investment and financial advisory service that
              empowers individuals, families, and institutions to achieve their
              financial goals. We strive to create a strong foundation for our
              clients, enabling them to take control of their own finances and
              achieve their dreams.
            </p>
          </div>
        </div>

        <div className="pt-24 bg-slate-100">
          <div className="flex flex-col text-center items-center justify-center pb-10">
            <p className="text-sm tracking-wide">Designed For You</p>
            <h1 className="text-3xl font-semibold">Our Features</h1>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:px-2 md:px-2 px-4">
            <div className="bg-white w-[22rem] h-[20-rem] flex flex-col px-8 py-10 rounded-lg border border-slate-200 hover:shadow-md hover:border-opacity-10 transition-all duration-700">
              <div>
                <Image src="/icon1.png" alt="" width={50} height={50} />
              </div>

              <div>
                <h1 className="text-lg font-semibold py-4">Risk Management</h1>
                <p className="text-gray-400 leading-relaxed tracking-wide text-sm">
                  We have established a rigorous risk management framework that
                  features dedicated investment and operational risk teams who
                  work to protect client assets.
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
                  Our ability to deliver risk-adjusted returns to clients over
                  time, and we stand by our record as a testament to the prowess
                  of our investment professionals
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
                  Our portfolio management professionals are critical,
                  independent thinkers who benefit from being part of a global,
                  diverse investment organization.
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
                  Our clients benefit from the wisdom of our seasoned
                  professionals, we are always looking to supplement their ranks
                  with emerging talent.
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
      </div>
      <Footer />
    </div>
  );
};

export default page;
