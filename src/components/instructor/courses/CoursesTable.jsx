import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from your backend
    axios.get('/instructor/get-courses') // Replace with your API endpoint
      .then((response) => {
        console.log(response.data.results.courses);
        setCourses(response.data.results.courses);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      {courses.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Course Subtitle</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Duration (hours)</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{course.course_title}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{course.course_subtitle}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{course.description}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{course.duration}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">${course.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CourseTable;
