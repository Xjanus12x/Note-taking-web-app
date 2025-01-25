import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import { useBreakpoints } from "../../hooks/useBreakpoints";

export default function AuthLayout() {
  const { user, token } = useUser();
  const { isDesktop } = useBreakpoints();

  if (user && token) {
    return <Navigate to={isDesktop ? "/notes" : "/"} replace={true} />;
  }

  return (
    <main>
      <div className="grid min-h-dvh bg-slateBlue ">
        <Outlet />
      </div>
    </main>
  );
}
