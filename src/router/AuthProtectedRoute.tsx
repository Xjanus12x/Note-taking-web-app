import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/AuthContext";
const AuthProtectedRoute = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default AuthProtectedRoute;
