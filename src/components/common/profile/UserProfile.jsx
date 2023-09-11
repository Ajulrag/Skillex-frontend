import React, { useEffect, useState } from "react";
import axios from "../../../utils/instance";
import ConfirmationDialog from "../Confirmation"; // Import the custom confirmation dialog component
// ...
const Profile = ({ user, onClose }) => {
  const instructorDetails = user.instructor_details;
  const [currentUser, setCurrentUser] = useState(user);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State to control the confirmation dialog

  // Format the date (user.createdAt) to display in a user-friendly format (e.g., "MM/DD/YYYY")
  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  const userNameInCapital = user.name.toUpperCase(); // Convert the username to uppercase

  // Add a scroll event listener to close the component when scrolling
  useEffect(() => {
    const handleScroll = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  // Initialize the name input field from the 'name' state variable
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [fieldOfStudy, setFieldOfStudy] = useState(
    user.isInstructor ? instructorDetails.field_of_study : ""
  );
  const [experienceYears, setExperienceYears] = useState(
    user.isInstructor ? instructorDetails.experience_years : ""
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFieldOfStudyChange = (e) => {
    setFieldOfStudy(e.target.value);
  };

  const handleExperienceYearsChange = (e) => {
    setExperienceYears(e.target.value);
  };

  const handleUpdateProfile = async () => {
    // Display the custom confirmation dialog
    setIsConfirmationOpen(true);
  };

  const handleConfirmUpdate = async () => {
    setIsConfirmationOpen(false); // Close the confirmation dialog

    try {
      // Prepare the data to send to the server
      const data = {
        userId: currentUser._id,
        name,
        fieldOfStudy,
        experienceYears,
      };

      // Make a PUT request to your backend API endpoint (replace with your actual endpoint)
      const response = await axios.put("/user/update-profile", data);

      // Check if the update was successful (you can define your own success criteria)
      if (response.status === 200) {
        // Update the individual state variables with the new values
        setFieldOfStudy(fieldOfStudy);
        setExperienceYears(experienceYears);

        // Update the currentUser state with the new data
        const updatedUser = {
          ...currentUser,
          name,
          instructor_details: {
            ...currentUser.instructor_details,
            field_of_study: fieldOfStudy,
            experience_years: experienceYears,
          },
        };
        setCurrentUser(updatedUser); // Update the user state

        // Handle success, e.g., show a success message to the user
        console.log("Profile updated successfully");
      }
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error("Error updating profile:", error);
    }
  };

  const handleCancelUpdate = () => {
    setIsConfirmationOpen(false); // Close the confirmation dialog
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="p-8 bg-white shadow-md w-[150vh] h-[95vh] relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {/* ... (other code) */}
          </div>
          <div className="relative">
            <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute  inset-x-0 mt-23 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            {/* ... (other code) */}
          </div>
        </div>
        <div className="mt-44 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {userNameInCapital}
          </h1>
          <p className="font-light text-gray-600 mt-3 ">
            {user.isInstructor ? "Instructor" : "User"}
          </p>
          <p className="mt-8 text-gray-500 ">
            Field of Study: {fieldOfStudy}
          </p>

          <p className="mt-2 text-gray-500 ">
            Experience in Years: {experienceYears}
          </p>
        </div>
        <div className="mt flex flex-col justify-center">
          <div className="relative mt-12 md:mt-0">
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="text-gray-600"></label>
                <input
                  type="text"
                  className="border border-black rounded px-3 py-2 text-black w-[28rem]"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600"></label>
                <input
                  type="email"
                  className="border border-black rounded px-3 py-2 text-black w-[28rem]"
                  value={email}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="block text-gray-600"></label>
                <input
                  type="text"
                  className="border border-black rounded px-3 py-2 text-black w-[28rem]"
                  value={fieldOfStudy}
                  onChange={handleFieldOfStudyChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600"></label>
                <input
                  type="number"
                  className="border border-black rounded px-3 py-2 text-black w-[28rem]"
                  value={experienceYears}
                  onChange={handleExperienceYearsChange}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>

        {/* Custom confirmation dialog */}
        {isConfirmationOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <ConfirmationDialog
              message="Are you sure you want to update your profile?" // Customize the message
              onConfirm={handleConfirmUpdate}
              onCancel={handleCancelUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

