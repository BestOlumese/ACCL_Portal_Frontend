import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { isAuthorized } = useAuth();

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  if (isAuthorized == null) {
    return <h1>Loading</h1>
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-tr from-primary to-sky-500">
      <Outlet />
    </div>
  );
}
