import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { decodedToken } = useAuth();

  if (!decodedToken?.is_superuser) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
