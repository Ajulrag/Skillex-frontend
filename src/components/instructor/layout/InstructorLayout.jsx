import InstructorNavbar from "../common/InstructorSidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <>
      <div className="flex">
        <InstructorNavbar />
        <div className="flex-grow ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default InstructorLayout;
