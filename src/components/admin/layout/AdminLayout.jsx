import Navbar from "../../admin/common/Navbar";
import { Outlet } from "react-router-dom";
import Head from "../common/Head";

const UserLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <Head />
        <div className="flex-grow flex m-2 h-[10vh]">
          <Navbar />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;