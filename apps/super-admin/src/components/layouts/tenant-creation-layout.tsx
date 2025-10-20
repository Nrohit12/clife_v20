import { Outlet } from "@tanstack/react-router";
import { SuperAdminNavbar } from "../navbar";
import { TenantCreationSidebar } from "../sideBar";

//
// interface TenantCreationLayoutProps {

// }

export default function TenantCreationLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-gray-100 border-r overflow-y-auto"> */}
      <TenantCreationSidebar />
      {/* </aside> */}

      {/* Main Content + Navbar */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="border-t bg-white shadow">
          <SuperAdminNavbar
            user={{
              name: "Clife",
              email: "",
              // avatar: "https://i.pravatar.cc/150?img=3",
            }}
          />
        </nav>
        {/* Main content BEFORE Navbar */}
        <main className="flex-1 p-4 overflow-auto"><Outlet /></main>

        {/* Navbar at the bottom of main area */}

      </div>
    </div>
  )
}

