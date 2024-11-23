import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layout/auth/login";
import Register from "./layout/auth/register";
import AdminDashboard from "./layout/dash/admin/admin";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
