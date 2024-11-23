import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome, Admin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-gray-600 mt-2">Manage and view all users.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Reports</h3>
              <p className="text-gray-600 mt-2">View detailed reports.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-gray-600 mt-2">Configure system settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
