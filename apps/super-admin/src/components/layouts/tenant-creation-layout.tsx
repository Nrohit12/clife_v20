import { Outlet } from "@tanstack/react-router";
import { SuperAdminNavbar } from "../navbar";
import { TenantCreationSidebar } from "../sideBar";

export default function TenantCreationLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar with fixed width */}
      <TenantCreationSidebar />

      {/* Main content column */}
      <div className="flex flex-1 flex-col min-w-0">
        <SuperAdminNavbar
          user={{
            name: "Clife",
            email: "",
            // avatar: "https://i.pravatar.cc/150?img=3",
          }}
        />
        <main className="flex-1 overflow-y-auto bg-muted/30 dark:bg-gray-700 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
