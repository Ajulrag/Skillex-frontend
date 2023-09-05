import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseSingleView = () => {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(courseId);
  }, [courseId]);

  const fetchData = (courseId) => {
    axios
      .get(`/admin/courses/getcourse/${courseId}`)
      .then((res) => {
        const courseData = res.data.results.course;
        setData(courseData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
        setError("An error occurred while fetching the course.");
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-md p-8 shadow-lg w-full mt-8">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : data ? (
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-blue-900">{data.course_title}</h1>
            <p className="text-gray-600 mt-2">Instructor: {data.tutor}</p>
          </div>
          <div className="mt-6">
            <img
              src={process.env.REACT_APP_IMG_URL+data.course_image}
              alt={data.course_title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Course Description</h2>
            <p className="text-gray-700 mt-2">{data.description}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Status</h2>
            {data.isApproved === "Approved" && (
              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md mt-2">
                Active
              </div>
            )}
            {data.isApproved === "Pending" && (
              <div className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-md mt-2">
                Pending
              </div>
            )}
            {data.isApproved === "Rejected" && (
              <div className="bg-red-100 text-red-600 px-3 py-1 rounded-md mt-2">
                Rejected
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No data available.</p>
      )}
    </div>
  );
};

export default CourseSingleView;
