import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { LoadingSkeleton } from "../components/common/LoadingSkeleton.jsx";

export function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <LoadingSkeleton variant="card" className="max-w-md w-full h-40" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!profile && location.pathname !== "/complete-profile") {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
}
