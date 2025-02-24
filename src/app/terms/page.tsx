import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg8">
      <Navbar />
      <div className="w-full bg-cyan-600 bg-opacity-35 ">
        <div className="py-52 text-white flex flex-col  justify-center items-center">
          <h1 className="lg:text-5xl md:text-3xl text-3xl font-bold text-center">
            Terms & Conditions
          </h1>
          <div className="flex items-center space-x-4 mt-4">
            <Link href={'/'}>
             <p>Home </p>
            </Link>
            <span>-</span>
            <p>Terms</p>
          </div>
        </div>

        <div className="bg-slate-50 flex flex-col justify-center items-center  py-24 ">
          <div className="flex flex-col items-center justify-center text-slate-900  lg:pb-10 pb-8">
            <h2 className="lg:text-3xl md:text-3xl text-center text-[1.665rem] font-bold">
              Terms & Conditions
            </h2>
          </div>

          <div className="  bg-white rounded-md shadow-sm font-light lg:font-normal md:font-normal border-2 border-[#d9e2ea] hover:border-opacity-10 hover:shadow-md transition-all ease-linear duration-700 px-8 mx-6 md:px-10 md:mx-10 lg:px-10 lg:mx-10   py-14 space-y-5 ">
            <Image src="/icon3.png" alt="" width={50} height={50} />
            <h1 className="font-semibold text-md text-slate-900">
              Please read the following carefully before signing in.
            </h1>

            <div className="space-y-8 text-sm">
              <p>
                By using our website, and communicating with us via email or
                other electronic messages (collectively, “Digital Presence”),
                you consent to: (1) the collection, use, and storage of your
                personal and non-personal information, and (2) the Terms &
                Conditions of Use below, which includes our Privacy & Security
                Statement. We may amend these Terms and Conditions from time to
                time; if we do, we will post those changes on this page within a
                reasonable time after the change.
              </p>

              <p>
                Depending on your interaction with Fundhive Corporate, other
                privacy policies may apply in addition to these Terms &
                Conditions.
              </p>

              <p className="">* Trademarks and Copyrights</p>

              <p>
                The materials on this Digital Presence are copyrighted and
                protected by worldwide copyright laws and treaty provisions. Any
                unauthorized use of these materials may violate copyright,
                trademark, and other laws. Materials on this Digital Presence
                may not be copied, reproduced, modified, published, uploaded,
                posted, transmitted, or distributed in any way without the prior
                written permission of the Digital Presence host. Except as
                expressly provided, the Digital Presence host does not grant any
                express or implied right to you under any patents, copyrights,
                trademarks, or trade secrets.
              </p>

              <p className="">* No Warranties</p>

              <p>
                Although the Digital Presence host has attempted to provide
                accurate information on this Digital Presence, it assumes no
                responsibility for the accuracy of the information. The Digital
                Presence host makes no representations or warranties on this
                Digital Presence with respect to its product or service
                offerings. Information regarding products or services offerings
                contained on this Digital Presence, including but not limited to
                information regarding features and benefits, technical
                information, or other similar information contained in
                documentation available on or from this Digital Presence, shall
                not be incorporated or integrated into any Digital Presence host
                warranty or other contractual right, privilege, or obligations
                otherwise provided under the terms of any agreement with the
                Digital Presence host. The Digital Presence host may make
                changes to the materials or products described in this Digital
                Presence at any time, without notice. The Digital Presence host
                makes no commitment to update these materials. All information
                provided on this digital presence is provided to you on an “as
                is” basis, without warranty of any kind either express or
                implied, including but not limited to the implied warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement. The digital presence host makes no warranty as
                to the accuracy, completeness, currency, or reliability of any
                content available through this digital presence. You are
                responsible for verifying any information before relying on it.
                Use of this digital presence and the content available on this
                digital presence is at your sole risk. The digital presence host
                makes no representations or warranties that use of this digital
                presence will be secure, uninterrupted or error-free. You are
                responsible for taking all necessary precautions to ensure that
                any content you may obtain from this digital presence is free of
                viruses.
              </p>

              <p className="">* Limitation of Liability</p>

              <p>
                The digital presence host specifically disclaims any liability,
                whether based in contract, tort, strict liability, or otherwise,
                for any direct, indirect, incidental, consequential, or special
                damages arising out of or in any way connected with access to or
                use of this digital presence, even if the digital presence host
                has been advised of the possibility of such damages, including
                but not limited to reliance by any party on any content obtained
                through the use of this digital presence, whether caused in
                whole or in part by negligence, acts of god, telecommunications
                failure, theft or destruction of or unauthorized access to this
                digital presence, or related information or programs.
              </p>

              <p className="">* Content of Materials</p>

              <p>
                The materials on this Digital Presence have protected
                information. This means it cannot be used or copied without the
                owner’s written consent. In most cases the owner is the Digital
                Presence host. In some cases the owner is a third party.
              </p>

              <p className="">* Links to other website</p>

              <p>
                Certain links in this websites will lead you to other affiliated
                websites, which is subjected to their own Terms and Conditions.
                Other links may lead you to websites which are not under the
                control of Fundhive Corporate. When you activate any of these
                you leave Fundhive Corporate. Fundhive Corporate accepts no
                responsibility or liability for contents of any other site to
                which a hypertext links exist and gives no representation or
                warranty (expressed or implied) as to the information on such
                sites.
              </p>

              <p className="">* Privacy and Security Statement</p>

              <p>
                The Digital Presence host is committed to protecting the privacy
                of its customers and others who visit our website, or send us
                information via email. The Privacy and Security Statement below
                outlines how we collect and use information. It also tells you
                what to do if you do not want your personal information
                collected.
              </p>

              <p className="">* Personal Information and Privacy</p>

              <p>
                Each time you visit our Digital Presence, our web server
                automatically recognizes and gathers non-personally identifying
                information but not limited to your computer’s IP address,
                browser software, operating system, pages viewed, and duration
                of your visit. This information is not linked to any personally
                identifiable information (“PII”). In addition to information
                automatically collected we may also collect through surveys or
                questionnaires PII such as email addresses, name and address,
                telephone number; and customer-specific identifiers such as ID,
                TIN, etc. In cases where PII is collected the Digital Presence
                host takes precautions to ensure the security of this
                information. The information we collect is used to help us
                better understand how visitors utilize the site and enhance the
                overall Digital Presence experience. It is also used to notify
                customers about updates to our Digital Presence, and is shared
                only with agents or contractors to assist in providing support
                for our internal operations. The information is disclosed when
                we are legally required to do so, which may be at the request of
                governmental authorities conducting an investigation to verify
                or enforce compliance with the policies governing our Digital
                Presence and applicable laws, or to protect against misuse or
                unauthorized use of our Digital Presence. The information also
                may be provided to a successor entity in connection with a
                corporate merger, consolidation, sale of assets, or other
                corporate change respecting the Digital Presence.
              </p>

              <p className="">* Cookies</p>

              <p>
                Certain features of this site may require the use of cookies. A
                “cookie” is a method to pass information between the server and
                your web browser when you travel from web page to web page.
                Cookie information is stored on your hard drive in a special
                directory created when you installed your web browser. This
                information can only be read by the website that created it. No
                other website can access this information. No PII is stored in
                the cookies this site creates. Most web browsers can be
                configured to reject cookies, or to notify you if a cookie is
                sent to you. If you are not sure whether your web browser has
                these capabilities you should contact the software manufacturer
                or your Internet service provider. If a user rejects a cookie,
                certain areas of the website may not function properly. The
                affected areas may include but are not limited to the following:
                inability to access certain areas of the website, inconvenience
                of having to enter personal information more often, and
                navigation ability throughout the website. We may use
                third-party web analytics service providers that use cookies or
                other website technologies to help us analyze both how users use
                this website and the effectiveness of our marketing search
                terms. The information generated by the cookie about your use of
                this website (including, without limitation, your IP address)
                would be transmitted to and stored by this service provider.
                They will use this information to evaluate your use of our
                website and compile aggregated reports for us. The information
                that our service providers collect and provide to us is not
                personally identifiable.
              </p>

              <p className="">* Third-Party Links</p>

              <p>
                This Digital Presence contains links to other sites that may be
                helpful to our clients. The Digital Presence host provides these
                links for your convenience and is not responsible for the
                accuracy or completeness of these external sites. The Digital
                Presence host is not responsible for the content or privacy
                practices of external sites and encourages you to review the
                privacy policies of those sites before you use them.
              </p>
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

          <span className=" border-l-[1px] h-16 hidden lg:block border-white  "></span>

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
