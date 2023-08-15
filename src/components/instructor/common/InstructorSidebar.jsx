import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
// import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiBookmarklet } from "react-icons/gi"
// import { BiCategoryAlt } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { CiLogout } from "react-icons/ci"
// import { AiOutlineMoneyCollect } from "react-icons/ai"

const InstructorNavbar = () => {
  const menus = [
    {
      name: "Dashboard",
      link: "/instructor",
      icon: MdOutlineDashboard,
    },
    { name: "Courses", link: "/instructor/courses", icon: GiBookmarklet, },
    { name: "Profile", link: "/instructor/profile", icon: CgProfile, },
    { name: "Logout", link: "/logout", icon: CiLogout },
  ];
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#3ac5b3] min-h-screen ${
          open ? "w-52" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex  text-sm  gap-3.5 font-medium p-2 hover:bg-white hover:text-[#1eb2a6] rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 text-white font-semibold whitespace-pre bg-[#1eb2a6] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    
    </section>
  );
};

export default InstructorNavbar;
