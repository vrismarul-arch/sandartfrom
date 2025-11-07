import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";


import DashboardSheet from "../pages/Dashboard/DashboardSheet";
import DashboardLayout from "../components/layout/DashboardLayout"; // 👈 ADD THIS
import FormPage from "../pages/FormPage";


export default function AppRoutes({ loggedIn, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<FormPage />} />
     
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />

      {/* ✅ Protected Admin Routes with Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage onLogout={onLogout} />} />
        <Route path="leads" element={<DashboardSheet onLogout={onLogout} />} />
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
