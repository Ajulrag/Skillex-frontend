import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/reset-password", {
        password,
        user: id,
      });
      if (response.status === 200) {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Reset Password
          </h2>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your new password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#1eb2a6] hover:bg-[#78cbc6] text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
