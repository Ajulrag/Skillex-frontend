import React from "react";
import Sidebar from "../../../components/instructor/common/InstructorDashboard";
import PrivateRoutes from "../../../components/PrivateRoute";

const Dashboard = () => {
    return(
        <PrivateRoutes>
        <Sidebar />
        </PrivateRoutes>
    )
}

export default Dashboard;