import React from "react";

const UserProfile = ({ user, onClose }) => {
  const instructorDetails = user.instructor_details;

  // Format the date (user.createdAt) to display in a user-friendly format (e.g., "MM/DD/YYYY")
  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <button
          className="absolute top-4 right-4 text-black-500 text-2xl bg-gray-400 rounded-full h-10 w-10 flex items-center justify-center hover:text-gray-800"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="text-center mb-4">
          <img
            src={user.profilePictureUrl}
            alt={`${user.name}'s Profile Picture`}
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-3xl font-semibold text-blue-500">{user.name}'s Profile</h2>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">User Details:</h3>
          <ul className="list-disc ml-6">
            <li>
              <strong>Joined On:</strong> {formattedDate}
            </li>
            <li>
              <strong>Email Verified:</strong>{" "}
              {user.email_verified ? "Yes" : "No"}
            </li>
            <li>
              <strong>Is Instructor:</strong>{" "}
              {user.isInstructor ? "Yes" : "No"}
            </li>
            <li>
              <strong>Status:</strong> {user.status}
            </li>
          </ul>
        </div>

        {user.isInstructor && (
          <div>
            <h3 className="text-xl font-semibold">Instructor Details:</h3>
            <ul className="list-disc ml-6">
              <li>
                <strong>Experience Years:</strong>{" "}
                {instructorDetails.experience_years}
              </li>
              <li>
                <strong>Field of Study:</strong>{" "}
                {instructorDetails.field_of_study}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
