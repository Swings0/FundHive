import Navbar1 from "./Navbar1";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  username: string;
}

const Layout = ({ children, username }: LayoutProps) => {

  const displayName = username || "Guest"
  return (
    <div className="flex flex-col lg:h-full h-screen bg-sky-100 border-t-4 border-white  ">
      {/* Navbar */}
      <div className="z-50">
      <Navbar1 username={displayName} />
      </div>
      <div className="w-full bg-blue-900 text-blue-900 lg:h-24 h-20 shadow-lg">-</div>

      {/* Sidebar and Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row lg:mx-10 mt-[-40px]  z-10">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6  lg:mx-3 rounded-lg  lg:overflow-auto lg:mt-[-20px]  ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

