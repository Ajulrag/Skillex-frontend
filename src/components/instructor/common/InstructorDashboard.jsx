import React from "react";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  return (
    <div className="">
      <div className="w-[12rem] bg-[#1eb2a6] fixed h-[100vh]">
        <ul className="pt-5">
          <Link  to="/admin/dashboard">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-house"></i>
              Dashboard
            </li>
          </Link>
          <Link  to="/courses">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-book-open-reader"></i>
              Courses
            </li>
          </Link>
          <Link to="/users">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-user"></i>
              Users
            </li>
          </Link>
          <Link  to="/instructors">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-person-chalkboard"></i>
              Instructors
            </li>
          </Link>
          <Link  to="/admin/categories">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-layer-group"></i>
              Categories
            </li>
          </Link>
          <Link  to="/profile">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-user"></i>
              Profile
            </li>
          </Link>
          <Link  to="/logout">
            <li className="p-5 font-semibold text-white hover:text-[#1eb2a6] hover:bg-white rounded-br-3xl rounded-tr-3xl">
              <i className="pl-2 fa-solid fa-right-from-bracket"></i>
              Logout
            </li>
          </Link>
        </ul>
      </div>
      <div className="items-center">

      </div>
    </div>
  );
};

export default InstructorDashboard;