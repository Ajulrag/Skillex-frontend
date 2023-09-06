import React from "react";

const Profile = () => {
  // Replace these with actual admin profile data
  const adminName = "Ajulrag.B";
  const adminEmail = "admin@gmail.com";
  const adminRole = "Administrator";
  const adminAvatar =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto mt-10 p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/4">
          <img
            src={adminAvatar}
            alt={adminName}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto"
          />
        </div>
        <div className="md:w-3/4 md:ml-6">
          <h2 className="text-2xl font-semibold">{adminName}</h2>
          <p className="text-gray-600">{adminRole}</p>
          <p className="mt-2">
            <strong>Email:</strong> {adminEmail}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Admin Profile Actions</h3>
        {/* Add links or buttons for admin actions */}
        <ul className="mt-4">
          <li className="mb-2">
            <a
              href="/admin/settings"
              className="text-blue-500 hover:underline"
            >
              Edit Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/users" className="text-blue-500 hover:underline">
              Manage Users
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/reports" className="text-blue-500 hover:underline">
              View Reports
            </a>
          </li>
          {/* Add more admin actions as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
