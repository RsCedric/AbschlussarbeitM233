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
import MeineBuchungenPage from "./pages/MeineBuchungenPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reservation" element={<ProtectedRoute><ReservationPage /></ProtectedRoute>} />
        <Route path="/reservation/view" element={<ProtectedRoute><ViewReservationPage /></ProtectedRoute>} />
        <Route path="/reservation/edit" element={<ProtectedRoute><EditReservationPage /></ProtectedRoute>} />
        <Route path="/edit-reservation/:id" element={<ProtectedRoute><EditReservationPage /></ProtectedRoute>} />
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
        <Route path="/rooms" element={<ProtectedRoute><RoomsOverviewPage /></ProtectedRoute>} />
        <Route path="/meinebuchungen" element={<ProtectedRoute><MeineBuchungenPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App; 