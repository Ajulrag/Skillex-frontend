import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ userName }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6">
        

        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="mb-4">
              <Link to="/courses">Courses</Link>
            </li>
            <li className="mb-4">
              <Link to="/users">Users</Link>
            </li>
            <li className="mb-4">
              <Link to="/instructors">Instructors</Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/dashboard/categories">Categories</Link>
            </li>
            <li className="mb-4">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="mb-4">
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

    </div>
  );
};

export default AdminLayout;
