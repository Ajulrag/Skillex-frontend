import React, { useState } from "react";
import "./becomeinstructor.css"; 
import axios from "axios";
import { useParams } from "react-router-dom";

const BecomeInstructor = ({ onClose }) => {
  const { token } = useParams()
  const [experience_years, setYearsOfExperience] = useState("");
  const [field_of_study, setFieldOfStudy] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "experience_years") {
      setYearsOfExperience(value);
    } else if (name === "field_of_study") {
      setFieldOfStudy(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    try {
      // Make a POST request to the server with the form data
      const response = await axios.post("/instructor/signup", {
        experience_years,
        field_of_study,
        token
      });

      // Handle the response from the server if needed
      console.log("Response from server:", response.data);

      // Close the overlay
      onClose();
    } catch (err) {
      // Handle any errors that occur during the POST request
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="overlay min-h-screen flex items-center justify-center bg-gray-900">
      <div className="overlay-content bg-white shadow-lg rounded-lg p-8 w-full sm:w-96 relative flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold mb-4">Become an Instructor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="experience_years" className="block mb-2">
              Years of Experience:
            </label>
            <input
              type="number"
              id="experience_years"
              name="experience_years"
              value={experience_years}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="field_of_study" className="block mb-2">
              Field of Study:
            </label>
            <input
              type="text"
              id="field_of_study"
              name="field_of_study"
              value={field_of_study}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "1rem" }}>
  <button
    id="bi_btn"
    type="submit"
    className=" py-2 px-4 rounded-md hover:bg-blue-700"
  >
    Submit
  </button>
  <button
  id="close-btn"
    className=" py-2 px-4 rounded-md hover:bg-blue-700 ml-16" 
    onClick={onClose}
  >
    Cancel
  </button>
</div>


        </form>
      </div>
    </div>
  );
};

export default BecomeInstructor;
