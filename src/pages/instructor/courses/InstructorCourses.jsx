import React from "react";
import ICoursesHeader from "../../../components/instructor/courses/ICoursesHeader";
import CourseTable from "../../../components/instructor/courses/CoursesTable";

const InstructorCourses = () => {
    return(
        <>
        <div className="p-4 border-black">
        <ICoursesHeader/>
        <CourseTable />
        </div>
        </>
    )
}

export default InstructorCourses;