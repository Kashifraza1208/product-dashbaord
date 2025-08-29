import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { IoMdLogOut } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

interface User {
  groups?: string[];
  superAdminName: string;
}

interface NavbarProps {
  user?: User;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  let name: string = "Kashif Raza";

  const firstLetterFirstWord = name?.split(" ")[0]?.charAt(0).toUpperCase();
  const firstLetterSecondWord = name?.split(" ")[1]?.charAt(0).toUpperCase();

  return (
    <div
      className={`${
        user?.groups?.[0] === "User"
          ? "w-full"
          : "md:left-52 md:ml-52 right-0 md:w-[calc(100vw-13rem)]"
      } sticky top-0 left-0
      right-0  w-full z-30    bg-[var(--background-color)]`}
    >
      {" "}
      <div className="ps-5 pe-4 flex h-20 justify-between items-center">
        <div className={`${user?.groups?.[0] === "User" ? "block" : "hidden"}`}>
          <Link to="https://www.lasica.ca" className="flex-shrink-0 flex">
            <div className="flex items-center justify-center ">
              <img
                src={""}
                alt="Lasica Logo"
                className="object-cover md:h-10 h-8"
              />
            </div>
          </Link>
        </div>
        <div></div>

        <div className="flex items-center space-x-4">
          <div className="relative me-2">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex relative items-center bg-white px-2 py-1 rounded-md shadow cursor-pointer "
            >
              <div
                style={{ backgroundColor: "red" }}
                className="w-7 h-7 mr-2 flex items-center justify-center rounded-full text-white font-semibold text-sm"
              >
                {firstLetterFirstWord}
                {firstLetterSecondWord}
              </div>

              <div className="text-sm">
                <div className="font-semibold text-gray-800">{name}</div>
                <div className="text-black font-medium text-[10px]">
                  {user?.groups?.[0]}
                </div>
              </div>
              {isOpen ? (
                <FaChevronDown className="text-xs ml-2 transition-all duration-300" />
              ) : (
                <FaChevronRight className="text-xs ml-2 transition-all duration-300" />
              )}
            </div>
            <div
              onClick={async () => {
                {
                  navigate("/login");
                }
              }}
              className={`absolute cursor-pointer hover:bg-gray-100 text-sm py-2 px-7 text-black font-medium top-12 right-0 bg-white rounded-lg transition-all duration-200 ease-out transform
    ${
      isOpen
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
            >
              <button className="flex cursor-pointer items-center justify-center">
                <IoMdLogOut className="text-xl mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
