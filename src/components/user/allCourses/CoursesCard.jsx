import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils/instance";
import Search from "./Search";

const CourseCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/instructor/get-courses");
        setCourses(response.data.results.courses);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Search />
      <section className="coursesCard">
        <div className="container grid2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((val, index) => (
            <div
              className="items flex flex-col bg-white border border-gray-300 p-4 rounded-lg shadow-md"
              key={index}
            >
              <div className="img bg-teal-600 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex justify-center items-center mx-auto ">
                <img src={val.course_image} alt="" className="w-full h-full object-cover px-2" />
              </div>
              <div className="text mt-4">
                <h1 className="font-semibold text-lg md:text-xl lg:text-2xl text-teal-600 text-center">{val.course_title}</h1>
              </div>
              <div className="px-6 md:px-10 py-3">
                {/* Use Link to navigate to the single course page */}
                <Link to={`/single-course/${val.course_id}`}>
                  <button className="outline-btn h-10 md:h-12 lg:h-14 w-full">
                    ENROLL NOW!
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CourseCard;
