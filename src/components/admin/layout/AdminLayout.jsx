import Navbar from "../../admin/common/Navbar";
import { Outlet } from "react-router-dom";
import Head from "../common/Head";

const UserLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <Head />
        <div className="flex-grow flex m-2 mt-16">
          <Navbar />
          <div className="flex-grow overflow-y-scroll h-[88vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;