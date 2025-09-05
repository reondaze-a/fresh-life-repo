// New import - useLocation
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  anonymous = false,
}) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return (
      <Navigate to="/login" state={{ from: location }} />
    );
  }

  // Otherwise, display the children of the current route.
  return children;
}
