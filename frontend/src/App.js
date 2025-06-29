import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ReservationPage from "./pages/ReservationPage";
import ViewReservationPage from "./pages/ViewReservationPage";
import EditReservationPage from "./pages/EditReservationPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditReservationPage from "./pages/AdminEditReservationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoomsOverviewPage from "./pages/RoomsOverviewPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/reservation/view" element={<ViewReservationPage />} />
        <Route path="/reservation/edit" element={<EditReservationPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit/:id" element={
          <ProtectedRoute adminOnly={true}>
            <AdminEditReservationPage />
          </ProtectedRoute>
        } />
        <Route path="/rooms" element={<RoomsOverviewPage />} />
      </Routes>
    </Router>
  );
}

export default App; 