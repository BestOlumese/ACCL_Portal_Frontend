import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function DirectorLayout() {
  const { decodedToken } = useAuth();

  if (!decodedToken?.is_staff) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
