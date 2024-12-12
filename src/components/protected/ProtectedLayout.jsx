import useAuth from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";

export default function ProtectedLayout() {
  const { isAuthorized } = useAuth();
  
  if (isAuthorized == null) {
    return <h1>Loading</h1>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 w-full">
        <SidebarTrigger className="text-primary" />
        <div className="mt-3 px-2">
        <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
