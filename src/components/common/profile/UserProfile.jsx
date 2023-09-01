import React from "react";

const UserProfile = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-2xl font-semibold">{user.name}'s Profile</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        {/* Add more user profile information here */}
      </div>
    </div>
  );
};

export default UserProfile;
