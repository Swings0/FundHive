import Navbar1 from "./Navbar1";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

const Layout = ({ children, username }: LayoutProps) => {
  const displayName = username || "Guest";
  return (
    <div className="">
      <div className="flex flex-col h-full bg-[#f1f3f6]">
        {/* Navbar */}
        <div className="z-50 ">
          <Navbar1 username={displayName} />
        </div>
        <div className="w-full bg-blue-900 text-blue-900 lg:h-24 h-20 shadow-lg pt-36 lg:pt-44"></div>


        <div className="flex flex-col relative">
          {/* Sidebar and Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row lg:mx-10 mt-[-48px]  z-10">
            <div className="mt-4">
              {/* Sidebar */}
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full flex flex-col">
              <main className="flex-1 p-6  lg:mx-3 rounded-lg lg:overflow-auto lg:mt-[-20px]">
                {children}
              </main>
            </div>

           <footer className=" lg:absolute bottom-0 left-40 w-full bg-[#dadcdf] text-gray-500 text-left p-5 text-xs lg:text-sm z-0 lg:ml-10 bg-opacity-80 whitespace-nowrap mt-24 md:mt-32">
            2025 � fundhivecorps.com. All rights reserved.
          </footer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;
