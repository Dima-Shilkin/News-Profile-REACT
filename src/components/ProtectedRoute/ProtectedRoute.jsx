import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../../helpers/authHelpers";

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuth = AuthService.getIsAuthFromLs();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};
