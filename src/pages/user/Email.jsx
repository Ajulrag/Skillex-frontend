import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const VerificationPage = () => {
  const location = useLocation();
  const { email, name } = location.state;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-green-500 mx-auto w-12 h-12" />
        </div>
        <p className="text-xl font-bold text-gray-800 mb-4">
          Welcome, {name}
        </p>
        <p className="text-gray-600">
          A verification link has been sent to your email address ({email}).<br />
          Please check your email and click the link to verify your account.
        </p>
      </div>
      
      <p className="mt-4 text-gray-600">
        If you are already verified, please login here.
      </p>
      <Link to="/auth" className="text-blue-500 hover:underline">
        Login
      </Link>
    </div>
  );
};

export default VerificationPage;
