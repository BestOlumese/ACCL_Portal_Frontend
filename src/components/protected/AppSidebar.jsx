import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { notActive } from "@/redux/features/auth/authSlice";
import { adminLinks, directorLinks, portalLinks } from "@/constatnts";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
export default function AppSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { decodedToken } = useAuth();

  function logout() {
    localStorage.clear();
    dispatch(notActive());
  }

  return (
    <Sidebar className="shadow-sm">
      <SidebarHeader>
        <h1 className="font-bold text-2xl text-center text-primary">
          ACCL Portal
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md text-primary font-bold">
            User Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {portalLinks.map((portal) => (
                <SidebarMenuItem key={portal.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={portal.url}
                      className={cn(
                        "text-[17px] font-medium hover:text-primary",
                        {
                          "text-primary": location.pathname == portal.url,
                        }
                      )}
                    >
                      <span>{portal.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {decodedToken.is_staff && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-md text-primary font-bold">
              Director Links
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-2">
                {directorLinks.map((director) => (
                  <SidebarMenuItem key={director.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={director.url}
                        className={cn(
                          "text-[17px] font-medium hover:text-primary",
                          {
                            "text-primary": location.pathname == director.url,
                          }
                        )}
                      >
                        {/* <director.icon /> */}
                        <span>{director.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {decodedToken.is_superuser && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-md text-primary font-bold">
              Admin Links
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-2">
                {adminLinks.map((admin) => (
                  <SidebarMenuItem key={admin.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={admin.url}
                        className={cn(
                          "text-[17px] font-medium hover:text-primary",
                          {
                            "text-primary": location.pathname == admin.url,
                          }
                        )}
                      >
                        {/* <admin.icon /> */}
                        <span>{admin.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-primary">
                  <User2 /> {decodedToken.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  className="text-primary"
                  onClick={() => logout()}
                >
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
