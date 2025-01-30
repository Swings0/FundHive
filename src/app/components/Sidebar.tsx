import Link from "next/link";
import Image from "next/image";
import { IoTvOutline } from "react-icons/io5";
import { MdAddHomeWork } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineGroupAdd } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { useState, useEffect } from "react";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


// interface SidebarProps {
//   username: string;  // Ensure it expects the 'username' prop
// }

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);

  const toggle = () => {
    setIcon(!icon);
    setIsOpen(!isOpen);
  };



  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      offset: 200, // Offset in pixels
      once: false,
    });
  }, []);

  const handleScroll = useCallback(() => {
    // Show the second navbar when scrolling down past 50px
    if (window.scrollY > 20) {
      setIcon(icon);
      setIsOpen(isOpen);
    } else {
     return(false)
    }
  },[]);

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); 


  

  return (
    <aside className="relative">
      <div
        onClick={toggle}
        className="cursor-pointer absolute lg:hidden block text-white text-2xl mb-2 -left-4 -top-7 mx-10 "
      >
        {icon ? (
          <p >
            <TbLayoutSidebarRightExpandFilled />
          </p>
        ) : (
          <p  className="opacity-90">
            <TbLayoutSidebarRightFilled />
          </p>
        )}
      </div>

      <div className="bg-blue-600 glass text-white w-full lg:w-40 p-6 min-h-screen rounded-t-md shadow-lg hidden lg:flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-5 ">
          <Image
            className=" "
            src="/avatar3.png"
            alt=""
            width={50}
            height={50}
          />
          {/* <span className="text-md font-semibold">{username}</span> */}
          <span className="text-xl font-bold">Menu</span>
        </div>

        <ul className="space-y-5 flex flex-col items-center text-center text-xs justify-center pt-5 ">
          <li className="text-center">
            <Link
              href="/dashboard"
              className="flex flex-col items-center justify-center hover:text-sky-300"
            >
              <IoTvOutline className=" mb-1 text-lg" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="text-center">
            <Link
              href="/deposit"
              className="flex flex-col items-center justify-center hover:text-sky-300"
            >
              <MdAddHomeWork className="text-lg mb-1" />
              <span>Deposit</span>
            </Link>
          </li>

          <li className="text-center">
            <Link
              href="/withdrawal"
              className="flex flex-col items-center justify-center hover:text-sky-300"
            >
              <IoWalletOutline className="text-lg mb-1" />
              Withdraw
            </Link>
          </li>

          <li className="text-center">
            <Link
              href="/transactions"
              className="flex flex-col items-center justify-center hover:text-sky-300"
            >
              <GrTransaction className="text-lg mb-1" />
              Transactions
            </Link>
          </li>

          <li className="text-center">
            <Link
              href="/referals"
              className="flex flex-col items-center justify-center hover:text-sky-300"
            >
              <MdOutlineGroupAdd className="text-lg mb-1" />
              Referral
            </Link>
          </li>

          <li className="text-center">
            <Link
              href="/earning"
              className="flex flex-col items-center justify-center hover:text-sky-300"
            >
              <GiProfit className="text-lg mb-1" />
              Earning
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div 
          data-aos="fade-right"
          data-aos-duration="500"
          className="fixed top-[7rem] left-0 h-screen bg-blue-600 text-white  glass rounded-r-md shadow-lg w-fit p-4 transition-all ease-linear delay-200 duration-300  opacity-100 transform translate-y-2 z-50 block lg:hidden "
        >
          <div className="flex flex-col items-center justify-center space-y-4 mt-3 ">
            <Image
              className=" "
              src="/avatar3.png"
              alt=""
              width={30}
              height={30}
            />
            {/* <span className="text-md font-semibold">{username}</span> */}
            <span className="text-xl font-bold">Menu</span>
          </div>

          <ul className="space-y-5 flex flex-col items-center text-center text-xs justify-center pt-5 ">
            <li className="text-center">
              <Link
                href="/dashboard"
                className="flex flex-col items-center justify-center hover:text-sky-300"
              >
                <IoTvOutline className=" mb-1 text-lg" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="text-center">
              <Link
                href="/deposit"
                className="flex flex-col items-center justify-center hover:text-sky-300"
              >
                <MdAddHomeWork className="text-lg mb-1" />
                <span>Deposit</span>
              </Link>
            </li>

            <li className="text-center">
              <Link
                href="/withdrawal"
                className="flex flex-col items-center justify-center hover:text-sky-300"
              >
                <IoWalletOutline className="text-lg mb-1" />
                Withdraw
              </Link>
            </li>

            <li className="text-center">
              <Link
                href="/transactions"
                className="flex flex-col items-center justify-center hover:text-sky-300"
              >
                <GrTransaction className="text-lg mb-1" />
                Transactions
              </Link>
            </li>

            <li className="text-center">
              <Link
                href="/referals"
                className="flex flex-col items-center justify-center hover:text-sky-300"
              >
                <MdOutlineGroupAdd className="text-lg mb-1" />
                Referral
              </Link>
            </li>

            <li className="text-center">
              <Link
                href="/earning"
                className="flex flex-col items-center justify-center hover:text-sky-300"
              >
                <GiProfit className="text-lg mb-1" />
                Earning
              </Link>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
