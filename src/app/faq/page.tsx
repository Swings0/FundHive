import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg7  ">
      <Navbar />
      <div className="w-full bg-cyan-600 bg-opacity-40 ">
        <div className="py-52 text-white flex flex-col  justify-center items-center">
          <h1 className="lg:text-5xl md:text-3xl text-3xl font-bold text-center">
            Frequently Asked Questions
          </h1>
          <div className="flex items-center space-x-4 mt-4">
           <Link href={'/'}>
             <p>Home </p>
            </Link>
            <span>-</span>
            <p>FAQ&apos;s</p>
          </div>
        </div>

        <div className="bg-slate-50 flex flex-col justify-center items-center  py-24 ">
          <div className="flex flex-col items-center justify-center text-slate-900  lg:pb-10 pb-8">
            <h2 className="lg:text-3xl md:text-3xl text-center text-2xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="  bg-white rounded-md shadow-sm border-2 border-[#d9e2ea] hover:border-opacity-10 hover:shadow-md transition-all ease-linear duration-700 px-8 mx-6 md:px-10 md:mx-10 lg:px-10 lg:mx-10   py-14 space-y-5 ">
            <Image src="/icon3.png" alt="" width={50} height={50} />
            <h1 className="font-semibold text-2xl text-slate-900">FAQ&apos;s</h1>

            <div className="space-y-8 text-sm">
              <div>
                <strong>How can I invest with fundhivecorps.com ?</strong>
                <p>
                  To make a investment you must first become a registered
                  investor. Once you are signed up, you can make your first
                  deposit.
                </p>
              </div>

              <div>
                <strong>
                  I wish to invest with you but I don&apos;t have an any ecurrency
                  account. What should I do?
                </strong>
                <p>You can open a free PM account here: blockchain.com</p>
              </div>

              <div>
                <strong>How do I open my Account?</strong>
                <p>
                  It&apos;s quite easy and convenient. Follow this link, fill in the
                  registration form and then press &quot;Register&quot;
                </p>
              </div>

              <div>
                <strong>Which e-currencies do you accept</strong>
                <p>
                  We accept Bitcoin, Ethereum and Bitcoin Cash cryptocurrencies.
                </p>
              </div>

              <div>
                <strong>How can I withdraw?</strong>
                <p>
                  Login to your account using your username and password and
                  check the Withdraw section
                </p>
              </div>

              <div>
                <strong>
                  How long does it take for my deposit to be added to my
                  account?
                </strong>
                <p>All withdrawals are processed immediately.</p>
              </div>

              <div>
                <strong>How can I change my e-mail address or password?</strong>
                <p>
                  Log into your fundhivecorps.com account and click on the
                  &quot;Account Information&quot;. You can change your e-mail address and
                  password there.
                </p>
              </div>

              <div>
                <strong>
                  What if I can&apos;t log into my account because I forgot my
                  password?
                </strong>
                <p>
                  Click forgot password link, type your username or e-mail and
                  you&apos;ll receive your account information.
                </p>
              </div>

              <div>
                <strong>
                  How do you calculate the interest on my account?
                </strong>
                <p>
                  Depending on your chosen plan. Interest on your account is
                  acquired Daily and credited to your available balance at the
                  end of each day.
                </p>
              </div>

              <div>
                <strong>
                  Can I do a direct deposit from my account balance?
                </strong>
                <p>
                  Yes! To make a deposit from your account balance. Simply login
                  into your members account and click on Make Deposit and select
                  the Deposit from Account Balance.
                </p>
              </div>

              <div>
                <strong>
                  Can I make an additional deposit to my account once it has
                  been opened?
                </strong>
                <p>Yes, you can but all transactions are handled separately.</p>
              </div>

              <div>
                <strong>
                  After I make a withdrawal request, when will the funds be
                  available on my ecurrency account?
                </strong>
                <p>
                  Funds are usually available immediately depending on the
                  Blockchain network.
                </p>
              </div>

              <div>
                <strong>How can I change my password?</strong>
                <p>
                  You can change your password directly from your members area
                  by editing it in your personal profile.
                </p>
              </div>

              <div>
                <strong>How can I check my account balances?</strong>
                <p>You can access the account information at any time.</p>
              </div>

              <div>
                <strong>Who manages the funds?</strong>
                <p>
                  These funds are managed by our team of investment
                  professionals.
                </p>
              </div>

              <div>
                <strong>Do you have an affiliate commission?</strong>
                <p>
                  Yes we offer a 10% referral commission on every direct
                  referral you make.
                </p>
              </div>
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
            We offer a direct referral commission on every invested referral you
            sign up with your link.
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

          <span className=" border-l-[1px] h-16 hidden lg:block border-white"></span>

          <div>
            <h1 className="text-[2rem] font-semibold">Instant</h1>
            <p className="text-xs ">Payment</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
