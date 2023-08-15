import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiBookmarklet, GiTeacher } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { AiOutlineMoneyCollect } from "react-icons/ai";

const Navbar = () => {
  const menus = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: MdOutlineDashboard,
    },
    { name: "Courses", link: "/admin/courses", icon: GiBookmarklet },
    { name: "Users", link: "/admin/users", icon: AiOutlineUser },
    { name: "Instructors", link: "/admin/instructors", icon: GiTeacher },
    { name: "Categories", link: "/admin/categories", icon: BiCategoryAlt },
    { name: "Sales", link: "/admin/sales", icon: AiOutlineMoneyCollect },
    { name: "Profile", link: "/admin/profile", icon: CgProfile },
    { name: "Logout", link: "/logout", icon: CiLogout },
  ];
  const [open, setOpen] = useState(false);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#2D2F31] min-h-screen ${
          open ? "w-52" : "w-16"
        } duration-500 text-gray-100 px-4`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
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
           
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
