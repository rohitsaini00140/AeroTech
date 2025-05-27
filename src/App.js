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
import EditUserForm from './pages/user/EditUserForm';
import ItemStatus from './pages/user/ItemStatus';
import AddPaperForm from './pages/paperAdd/AddPaper';
import GetPaper from './pages/paperAdd/GetPaper';


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
        <Route path="addpaper-form" element={<AddPaperForm/>} /> {/* /dashboard/getadminholiday */}
        <Route path="get-paper" element={<GetPaper/>} /> {/* /dashboard/getadminholiday */}
       

         <Route path="/dashboard/edit-user/:id" element={<EditUserForm />} />
         <Route path="/dashboard/item-status/:id" element={<ItemStatus/>} />

      </Route>
      <Route path="/leave-requests" element={<GetLeavePage />} /> {/* your other route */}
    </Routes>
  </Router>
);

export default App;
