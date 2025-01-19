import Link from "next/link";
import Image from "next/image";
import { IoTvOutline } from "react-icons/io5";
import { MdAddHomeWork } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";
import { MdOutlineGroupAdd } from "react-icons/md";
import { GiProfit } from "react-icons/gi";

interface SidebarProps {
  username: string;  // Ensure it expects the 'username' prop
}

const Sidebar = ({ username }: { username: string }) => {
  return (
    <aside
      className="bg-blue-600 glass text-white w-full lg:w-40 p-6 lg:min-h-screen rounded-t-md shadow-lg"
    >
        <div className="flex flex-col items-center justify-center space-y-5">
            <Image className=" " src="/avatar3.png" alt="" width={50} height={50}/>
              {/* <span className="text-md font-semibold">{username}</span> */}
            <span className="text-xl font-bold">Menu</span>

        </div>


      <ul className="space-y-5 flex flex-col items-center text-center text-xs justify-center pt-5 ">

       <li className="text-center">
          <Link href="/dashboard" className="flex flex-col items-center justify-center hover:text-sky-300">
            <IoTvOutline className=" mb-1 text-lg" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="text-center">
          <Link href="/deposit" className="flex flex-col items-center justify-center hover:text-sky-300">
          <MdAddHomeWork className="text-lg mb-1"/>
           <span>Deposit</span>
          </Link>
        </li>

        <li className="text-center">
          <Link href="/withdrawal" className="flex flex-col items-center justify-center hover:text-sky-300">
          < IoWalletOutline className="text-lg mb-1" />
            Withdraw
          </Link>
        </li>

        <li className="text-center">
          <Link href="/transactions" className="flex flex-col items-center justify-center hover:text-sky-300">
          <GrTransaction className="text-lg mb-1" />
            Transactions
          </Link>
        </li>


        <li className="text-center">
          <Link href="/referal" className="flex flex-col items-center justify-center hover:text-sky-300">
          <MdOutlineGroupAdd className="text-lg mb-1" />
            Referral
          </Link>
        </li>

        <li className="text-center">
          <Link href="/earning" className="flex flex-col items-center justify-center hover:text-sky-300">
          <GiProfit className="text-lg mb-1" />
            Earning
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
