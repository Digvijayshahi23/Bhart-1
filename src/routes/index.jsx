/**
 * AppRoutes — fully lazy-loaded routes with Suspense + ErrorBoundary.
 * Each module page is loaded on demand, reducing initial bundle size.
 */
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import ErrorBoundary from "../components/common/ErrorBoundary.jsx";

// ─── Lazy imports ─────────────────────────────────────────────────────────────
const LandingPage = lazy(() => import("../features/landing/LandingPage.jsx"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage.jsx"));
const RegisterPage = lazy(
  () => import("../features/auth/pages/RegisterPage.jsx"),
);
const ForgotPasswordPage = lazy(
  () => import("../features/auth/pages/ForgotPasswordPage.jsx"),
);
const VerifyEmailPage = lazy(
  () => import("../features/auth/pages/VerifyEmailPage.jsx"),
);
const CompleteProfilePage = lazy(
  () => import("../features/auth/pages/CompleteProfilePage.jsx"),
);
const Dashboard = lazy(
  () => import("../features/dashboard/pages/Dashboard.jsx"),
);
const ChatPage = lazy(() => import("../features/chat/pages/ChatPage.jsx"));
const GovernmentPage = lazy(
  () => import("../features/schemes/pages/GovernmentPage.jsx"),
);
const DocumentsPage = lazy(
  () => import("../features/documents/pages/DocumentsPage.jsx"),
);
const HealthcarePage = lazy(
  () => import("../features/healthcare/pages/HealthcarePage.jsx"),
);
const CareerPage = lazy(
  () => import("../features/career/pages/CareerPage.jsx"),
);
const LegalPage = lazy(() => import("../features/legal/pages/LegalPage.jsx"));
const FinancePage = lazy(
  () => import("../features/finance/pages/FinancePage.jsx"),
);
const ProfilePage = lazy(
  () => import("../features/profile/pages/ProfilePage.jsx"),
);

// ─── Loading skeleton shown while lazy chunk is fetching ─────────────────────
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page…"
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-saffron border-t-transparent animate-spin" />
        <p className="text-sm text-text-secondary font-semibold">
          लोड हो रहा है… (Loading)
        </p>
      </div>
    </div>
  );
}

// ─── Root route — authenticated users see Dashboard, guests see Landing ──────
const HomeRoute = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LandingPage />;
};

// ─── 404 shell ────────────────────────────────────────────────────────────────
const NotFoundShell = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-center px-6">
    <div className="flex flex-col items-center gap-4">
      <div className="text-6xl font-black text-saffron">404</div>
      <h1 className="text-2xl font-bold text-text-primary font-serif">
        पृष्ठ नहीं मिला (Page Not Found)
      </h1>
      <p className="text-sm text-text-secondary max-w-xs">
        यह पृष्ठ मौजूद नहीं है। होम पर वापस जाएं।
      </p>
      <a
        href="/"
        className="mt-2 px-6 py-3 bg-saffron text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors"
      >
        होम पर जाएं (Go Home)
      </a>
    </div>
  </div>
);

// ─── Route wrapper: Suspense + per-route ErrorBoundary ────────────────────────
function LazyRoute({ children, title }) {
  return (
    <ErrorBoundary title={title}>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Root ─────────────────────────────────────────────────────────── */}
      <Route
        path="/"
        element={
          <LazyRoute title="होम">
            <HomeRoute />
          </LazyRoute>
        }
      />

      {/* ── Public auth routes ────────────────────────────────────────────── */}
      <Route
        path="/login"
        element={
          <LazyRoute title="लॉगिन">
            <LoginPage />
          </LazyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <LazyRoute title="पंजीकरण">
            <RegisterPage />
          </LazyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <LazyRoute title="पासवर्ड रीसेट">
            <ForgotPasswordPage />
          </LazyRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <LazyRoute title="ईमेल सत्यापन">
            <VerifyEmailPage />
          </LazyRoute>
        }
      />

      {/* ── Protected onboarding ─────────────────────────────────────────── */}
      <Route
        path="/complete-profile"
        element={
          <LazyRoute title="प्रोफ़ाइल सेटअप">
            <ProtectedRoute>
              <CompleteProfilePage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />

      {/* ── Protected app modules ─────────────────────────────────────────── */}
      <Route
        path="/chat"
        element={
          <LazyRoute title="AI चैट">
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/schemes"
        element={
          <LazyRoute title="सरकारी योजनाएं">
            <ProtectedRoute>
              <GovernmentPage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <LazyRoute title="AI दस्तावेज़">
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/healthcare"
        element={
          <LazyRoute title="स्वास्थ्य सहायक">
            <ProtectedRoute>
              <HealthcarePage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/career"
        element={
          <LazyRoute title="करियर सलाहकार">
            <ProtectedRoute>
              <CareerPage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/legal"
        element={
          <LazyRoute title="कानूनी सहायता">
            <ProtectedRoute>
              <LegalPage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/finance"
        element={
          <LazyRoute title="वित्त सहायक">
            <ProtectedRoute>
              <FinancePage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <LazyRoute title="मेरी प्रोफ़ाइल">
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </LazyRoute>
        }
      />

      {/* ── Fallback ──────────────────────────────────────────────────────── */}
      <Route path="/404" element={<NotFoundShell />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
