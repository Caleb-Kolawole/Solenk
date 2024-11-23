import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md w-full h-16 flex items-center justify-between px-6">
      <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-md text-sm focus:outline-none"
        />
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
          C
        </div>
      </div>
    </div>
  );
};

export default Navbar;
