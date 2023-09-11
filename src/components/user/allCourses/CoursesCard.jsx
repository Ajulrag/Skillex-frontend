import React,{useEffect, useState} from "react";
import Search from "./Search";
import axios from "../../../utils/instance";

const CourseCard = () => {
  const [courses,setCourses] = useState([]);
  useEffect (() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/instructor/get-courses");
        console.log(response.data.results.courses);
        setCourses(response.data.results.courses);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCourses();
  }, [])
  return (
    <>
      <Search />
      <section className="coursesCard">
        <div className="container grid2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((val, index) => (
            <div className="items flex flex-col bg-white border border-gray-300 p-4 rounded-lg shadow-md" key={index}>
              <div className="img bg-teal-600 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex justify-center items-center mx-auto ">
              <img src={val.course_image} alt="" className="w-full h-full object-cover px-2" />
              </div>
              <div className="text mt-4">
                <h1 className="font-semibold text-lg md:text-xl lg:text-2xl text-teal-600 text-center">{val.course_title}</h1>
                {/* <div className="rate mt-2 flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className="fa fa-star text-teal-600"></i>
                  ))}
                  <label htmlFor="" className="text-teal-600 ml-1">(5.0)</label>
                </div> */}
                {/* <div className="details mt-3 ">
                  {val.courTeacher.map((details, idx) => (
                    <div className="box  items-center text-gray-500" key={idx}>
                      <div className="dimg ">
                        <img src={details.dcover} alt="" className="w-10 h-10  rounded-full " />
                        <h4>{details.name}</h4>
                      </div>
                      <span className="ml-auto text-teal-600 text-sm font-semibold">
                        {details.totalTime}
                      </span>
                    </div>
                  ))}
                </div> */}
              </div>
              {/* <div className="price bg-gray-200 p-3 md:p-4 mt-4">
                <h3 className="font-semibold text-teal-600">{val.priceAll} / {val.pricePer}</h3>
              </div> */}
              <div className="px-6 md:px-10 py-3">
                <button className="outline-btn h-10 md:h-12 lg:h-14 w-full">ENROLL NOW!</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CourseCard;
