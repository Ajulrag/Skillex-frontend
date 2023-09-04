import React from "react";

const CoursesHeader = () => {
    return (
        <>
            <div className=" text-right">
                {/* <div className="justify-"> */}
                <h1 className="text-2xl font-semibold text-left text-gray-800">Course Management</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md mr-7 ">
                        Pendings
                    </button>

                {/* </div> */}
            </div>
        </>
    )
}

export default CoursesHeader;