import React from "react";
import { Link } from "react-router-dom";

const CoursesHeader = () => {
    return (
        <div className="flex justify-between items-center p-3">
            <h1 className="text-3xl font-bold text-gray-800 uppercase mx-auto pb-6">
                
                Course Management
            </h1>
            <Link to="/admin/courses/pendingcourses">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md">
                    Pendings
                </button>
            </Link>
        </div>
    );
};

export default CoursesHeader;
