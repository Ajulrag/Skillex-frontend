import React from "react";
import { Link } from "react-router-dom";

const CoursesHeader = () => {
    return (
        <>
            <div className=" text-right">
                <h1 className="text-2xl font-semibold text-left text-gray-800">Course Management</h1>
                <Link to="/admin/courses/pendingcourses">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md mr-7">
                        Pendings
                    </button>
                </Link>
            </div>
        </>
    )
}

export default CoursesHeader;