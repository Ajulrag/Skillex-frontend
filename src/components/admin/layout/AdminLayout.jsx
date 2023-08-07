import Navbar from "../../admin/common/Navbar";
import { Outlet } from "react-router-dom";
import Head from "../common/Head";

const UserLayout = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-grow ">
            <Head />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
