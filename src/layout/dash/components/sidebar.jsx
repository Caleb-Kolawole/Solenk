import React from "react";

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:bg-gray-700 p-2 rounded-md">
          Dashboard
        </a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded-md">
          Users
        </a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded-md">
          Settings
        </a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded-md">
          Reports
        </a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded-md">
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
