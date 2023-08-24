import PrivateRoutes from "../../PrivateRoute";
import InstructorNavbar from "../common/InstructorSidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <>
     <PrivateRoutes>
     <div className="flex">
        <InstructorNavbar />
        <div className="flex-grow ">
          <Outlet />
        </div>
      </div>
     </PrivateRoutes>
    </>
  );
};

export default InstructorLayout;
