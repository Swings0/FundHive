import Navbar1 from "./Navbar1";
import Sidebar from "./Sidebar";


interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

const Layout = ({ children, username }: LayoutProps) => {
  const displayName = username || "Guest";
  return (
    <div className="h-full">
      <div className="flex flex-col bg-scroll  bg-[#f1f3f6] ">
        {/* Navbar */}
        <div className="z-50 ">
          <Navbar1 username={displayName} />
        </div>
        <div className="w-full bg-blue-900 text-blue-900 lg:h-24 h-20 shadow-lg pt-36 lg:pt-44"></div>


        <div className="flex flex-col relative">
          {/* Sidebar and Main Content */}
          <div className="flex flex-col lg:flex-row lg:mx-10 mt-[-48px] min-h-screen  z-10">
            <div className="mt-2">
              {/* Sidebar */}
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex flex-col z-20">
              <main className="p-6  lg:mx-1 rounded-lg lg:mt-[-20px]">
                {children}
              </main>
            </div>

          <div className="">
           <footer className="lg:absolute bottom-0 lg:left-40 w-full bg-[#dadcdf] text-gray-500 text-left lg:p-4 p-5 text-xs lg:text-sm z-0 lg:ml-10 bg-opacity-80 whitespace-nowrap mt-16 md:mt-16 lg:mt-5">
            2025 � fundhivecorps.com. All rights reserved.
          </footer>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;
