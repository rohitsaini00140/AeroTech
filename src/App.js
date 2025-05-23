// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './component/LoginForm';
import DashboardLayout from './component/dashboard/DashboardLayout';
import AdminLogin from './pages/AdminLogin';
import LeaveRequestsPage from './pages/Get-Leave';



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route path="/leave-requests" element={<LeaveRequestsPage/>} />
    </Routes>
  </Router>
);

export default App;
