// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/AdminLogin';
import DashboardLayout from './component/dashboard/DashboardLayout';
import DashboardContent from './component/dashboard/Dashboard'; // Dashboard page
import AdminRegisterForm from './component/dashboard/AdminContent';
import GetLeavePage from './pages/Get-Leave';
import HolidayList from './pages/Holiday';
import GetItem from './pages/GetItem';
import GetHolidays from './pages/GetHoliday';
import CreateUserForm from './pages/user/CreateUser';
import GetUser from './pages/user/GetUser';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardContent />} /> {/* /dashboard */}
        <Route path="admin" element={<AdminRegisterForm />} /> {/* /dashboard/admin */}
        <Route path="leave" element={<GetLeavePage />} /> {/* /dashboard/leave */}
        <Route path="getitem" element={<GetItem />} /> {/* /dashboard/getitem */}
        <Route path="adminholiday" element={<HolidayList />} /> {/* /dashboard/adminholiday */}
        <Route path="getadminholiday" element={<GetHolidays />} /> {/* /dashboard/getadminholiday */}
        <Route path="create-user" element={<CreateUserForm/>} /> {/* /dashboard/getadminholiday */}
        <Route path="get-user" element={<GetUser/>} /> {/* /dashboard/getadminholiday */}
      </Route>
      <Route path="/leave-requests" element={<GetLeavePage />} /> {/* your other route */}
    </Routes>
  </Router>
);

export default App;
