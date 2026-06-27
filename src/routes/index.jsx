import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../features/landing/LandingPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import RegisterPage from "../features/auth/pages/RegisterPage.jsx";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.jsx";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage.jsx";
import CompleteProfilePage from "../features/auth/pages/CompleteProfilePage.jsx";
import Dashboard from "../features/dashboard/pages/Dashboard.jsx";
import ChatPage from "../features/chat/pages/ChatPage.jsx";
import GovernmentPage from "../features/schemes/pages/GovernmentPage.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

const HomeRoute = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LandingPage />;
};

const HealthcareShell = () => (
  <div className="p-8 text-center text-xl font-bold">
    Healthcare Placeholder Shell
  </div>
);
const CareerShell = () => (
  <div className="p-8 text-center text-xl font-bold">
    Career Placeholder Shell
  </div>
);
const LegalShell = () => (
  <div className="p-8 text-center text-xl font-bold">
    Legal Placeholder Shell
  </div>
);
const NotFoundShell = () => (
  <div className="p-8 text-center text-xl font-bold text-red-500">
    404 - Not Found Shell
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dynamic Root Route */}
      <Route path="/" element={<HomeRoute />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Complete Profile Onboarding */}
      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <CompleteProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Protected Conversational AI Route */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Government Schemes Portal */}
      <Route
        path="/schemes"
        element={
          <ProtectedRoute>
            <GovernmentPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Module Routes */}
      <Route
        path="/healthcare"
        element={
          <ProtectedRoute>
            <HealthcareShell />
          </ProtectedRoute>
        }
      />
      <Route
        path="/career"
        element={
          <ProtectedRoute>
            <CareerShell />
          </ProtectedRoute>
        }
      />
      <Route
        path="/legal"
        element={
          <ProtectedRoute>
            <LegalShell />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="/404" element={<NotFoundShell />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
