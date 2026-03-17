import { Navigate, useLocation } from "react-router-dom";
import { useFetchOwnerQuery } from "../redux/services/authService";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading } = useFetchOwnerQuery();
  const location = useLocation();

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  const isAuthenticated = !!data?.data;
  
  // Define routes that are only for unauthenticated users
  const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
  const isAuthRoute = authRoutes.includes(location.pathname) || location.pathname.startsWith("/reset-password");

  if (!isAuthenticated && !isAuthRoute) {
    // If not logged in and trying to access a protected page, redirect to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  if (isAuthenticated && isAuthRoute) {
    // If logged in and trying to access an auth page (like sign-in), redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
