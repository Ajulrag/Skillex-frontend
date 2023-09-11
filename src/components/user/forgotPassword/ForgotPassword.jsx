import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/instance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    try {
      console.log("Working");
      const response = await axios.post('/forgot-password', { email });
      if (response.status === 201) {
        navigate('/auth');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Forgot Password
          </h2>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#1eb2a6] hover:bg-[#78cbc6] text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
