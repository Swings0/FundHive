import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 lg:py-0 md:py-0 lg:pt-14 md:pt-12 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 justify-center items-start pb-10">
          {/* Logo and description */}
          <div className=" md:text-left">
            <div className="flex items-center md:justify-start gap-2">
              <Link href={'/'} className='flex items-center md:justify-start gap-2' >
              <Image
                className="w-10 opacity-95"
                src="/Fundhive1.svg"
                alt="FundHive Logo"
                width={40}
                height={40}
              />
              <h1 className="text-lg font-semibold tracking-wide">FundHive.</h1>
              </Link>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pt-5">
              Fund Hive Company delivers world-class investment services, institutional asset management, and financial advisory services.
            </p>
          </div>

          {/* Company Links */}
          <div className=" md:text-left">
            <h2 className="text-lg font-semibold">Company</h2>
            <ul className="text-sm text-slate-400 pt-5 ">
              <li className='font-[500]'><Link href={'/'}>Home</Link></li>
              <li className='font-[500]'><Link href={'/xaboutus'}>About Us</Link></li>
              <li className='font-[500]'><Link href={'/offers'}>Offers</Link></li>
              <li className='font-[500]'><Link href={'/faq'}>Frequently Asked</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className=" md:text-left">
            <h2 className="text-lg font-semibold">Get in Touch</h2>
            <ul className="text-sm text-slate-400 pt-5 ">
              <li className='font-[500]'><Link href={'/terms'}>Terms</Link></li>
              <li className='font-[500]'><Link href={'/contactpage'}>Contact Us</Link></li>
              <li className='font-[500]'><Link href={'/login'}>Login</Link></li>
              <li className='font-[500]'><Link href={'/register'}>Register</Link></li>
            </ul>
          </div>

          {/* Reach Us */}
          <div className=" md:text-left">
            <h2 className="text-lg font-semibold">Reach Us</h2>

            <ul className='list-none'>
            <li className='text-slate-400 font-light text-sm'>
              <strong className='text-white'>Head Office: </strong>
                Riddargatan 13A, <br /> 114 51 Stockholm, Sweden
            </li>

            <li className='text-slate-400 font-light text-xs whitespace-nowrap py-2'>
             <strong className='text-white'> Email: </strong>
              support@comingsoon.com
            </li>

            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="lg:flex md:flex  w-full bg-slate-900 lg:py-5 md:py-5 hidden  py-2  justify-center self-center lg:rounded-t-full md:rounded-t-full ">
          <span className="text-slate-500 text-center text-[10px] md:text-sm lg:text-sm">
            © All Rights Reserved 2024 fundhivecorps.com
          </span>
        </div>
        <div className="lg:hidden md:hidden flex w-full bg-slate-900 lg:py-4 md:py-4  py-2 bg-opacity-40  justify-center self-center rounded-full ">
          <span className="text-slate-500 text-center text-[10px] md:text-sm lg:text-sm">
            © All Rights Reserved 2024 fundhivecorps.com
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
