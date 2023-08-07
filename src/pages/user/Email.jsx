import React from 'react';
import { useLocation } from 'react-router-dom';

const VerificationPage = () => {
    const location = useLocation();
    const { email, name } = location.state;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        
        <p className="text-xl font-bold text-gray-800 mb-4">
         Welcome {name}
        </p>
        <p className="text-gray-600">
          A verification link has been send to your {email}.<br/>Please check the email and verify it.
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;
