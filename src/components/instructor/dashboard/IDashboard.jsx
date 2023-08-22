import React from 'react';

const IDashboard = () => {
  return (
    <div className="flex-grow p-8">
      <h2 className="text-2xl font-semibold mb-4"> Dashboard</h2>
      {/* Your dashboard content goes here */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Welcome, Instructor!</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Course 1</h4>
            <p className="text-gray-600">Course description here.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Course 2</h4>
            <p className="text-gray-600">Course description here.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Course 3</h4>
            <p className="text-gray-600">Course description here.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-2">Course 4</h4>
            <p className="text-gray-600">Course description here.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IDashboard;
