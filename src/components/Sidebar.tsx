import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import dashboardIcon from "../assets/dashboard.svg";
import dashboardIconA from "../assets/dashboardA.svg";

import { GoSidebarExpand } from "react-icons/go";

const menuItems = [
  {
    name: "Dashboard",
    icon: dashboardIcon,
    activeIcon: dashboardIconA,
    link: "/",
  },
  {
    name: "Dashboard1",
    icon: dashboardIcon,
    activeIcon: dashboardIconA,
    link: "/",
  },
  {
    name: "Dashboard2",
    icon: dashboardIcon,
    activeIcon: dashboardIconA,
    link: "/",
  },
  {
    name: "Dashboard3",
    icon: dashboardIcon,
    activeIcon: dashboardIconA,
    link: "/",
  },
];

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const matchedItem = menuItems.find(
      (item: any) => item.link === location.pathname
    );
    if (matchedItem) {
      setActiveItem(matchedItem.name);
    }
  }, [location]);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
    localStorage.setItem("activeSidebar", name);
  };

  return (
    <div className="z-40 border-l border-gray-200">
      <div
        className={`fixed border-l border-gray-200 inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed  top-0 left-0 h-screen min-h-screen bg-[var(--background-color)] z-50 transition-all duration-300 
      ${sidebarOpen ? "w-[208px]" : "w-[60px]"}
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:block overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-4 py-3 ">
          {sidebarOpen && (
            <Link to="#" className="flex-shrink-0 md:block hidden lg:block">
              <div className="flex items-center font-bold  justify-center py-4">
                Logo
              </div>
            </Link>
          )}

          {!sidebarOpen && (
            <Link to="#" className="font-bold block mt-2 -mx-5 ps-3">
              Logo
            </Link>
          )}

          <Link to="#" className="md:hidden lg:hidden block mt-2">
            Logo
          </Link>

          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 ms-1 cursor-e-resize hover:text-white rounded hover:bg-[#122645] transition hidden md:inline"
          >
            {sidebarOpen && <GoSidebarExpand className="text-xl" />}
          </button>
        </div>

        <ul className="mt-1 px-2 space-y-1">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 cursor-e-resize rounded-md  hover:text-white  hover:bg-[#122645] transition"
            >
              <GoSidebarExpand className="text-2xl rotate-180" />
            </button>
          )}
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.name;

            return (
              <li key={item.name}>
                <Link
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  to={item.link}
                  onClick={() => {
                    handleItemClick(item.name);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-[#122645] text-white"
                      : "text-black hover:bg-[#122645] hover:text-white"
                  }`}
                >
                  <img
                    src={
                      hoverIndex === index || isActive
                        ? item.activeIcon
                        : item.icon
                    }
                    alt={item.name}
                    className="h-5 w-5"
                  />
                  {sidebarOpen && <span className="text-sm">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={` top-6  fixed  md:hidden ${
          sidebarOpen ? "left-40 z-50 " : "left-4"
        }`}
      >
        <button
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 cursor-e-resize bg-[#122645] text-white rounded-md shadow-md"
        >
          <GoSidebarExpand className="md:text-xl text-sm rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
