import { useRouterState } from "@tanstack/react-router";
import { Network, Settings, type LucideIcon } from "lucide-react";
import {
  SidebarFooter,
  SidebarProvider,
} from "@clife/ui/components/custom/app-sidebar";
// import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";
import * as React from "react";
import { ConnectedLifeAdminIcon } from "@/icons";

type MenuItem = {
  label: string;
  route: string;
  isActive?: boolean;
  icon: LucideIcon;
};

const menus: MenuItem[] = [
  { label: "Tenant list", route: "/onboarding/tenants", icon: Network },
  { label: "Settings", route: "/onboarding/settings", icon: Settings },
];

export default function TenantCreationSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;


  return (
    <aside
      className={cn(
        "border-r bg-bg-n-98 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 flex flex-col w-56"
      )}
    >
      {/* Inner container full height */}
      <div className="flex h-dvh flex-col">
        {/* Header / workspace switcher */}
        <div className="flex h-14 items-center p-4 border-b dark:border-gray-700">
          <button className="flex items-center rounded-xl p-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <p className="text-base font-medium leading-none ml-2">
              <ConnectedLifeAdminIcon className="h-6 w-auto" />
            </p>
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-2 flex-1">
          <ul className="space-y-1 px-2">
            {menus.map(({ label, route, icon: Icon, isActive }) => {
              const active = isActive ?? pathname.startsWith(route);
              return (
                <li key={route}>
                  <SidebarItem
                    icon={<Icon className="h-5 w-5" />}
                    active={active}
                    href={route}
                  >
                    {label}
                  </SidebarItem>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer fixed to bottom */}
        <div className="mt-auto">
          <SidebarProvider>
            <SidebarFooter>
              {/* <NavUser user={data.user} collapsed={collapsed} /> */}
            </SidebarFooter>
          </SidebarProvider>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  children,
  href,
  active,
  collapsed,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-center rounded-lg px-3 py-2 text-[15px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "bg-accent dark:bg-gray-600 text-accent-foreground border border-primary text-primary-50"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center" : "gap-3"
      )}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={cn(
          "flex items-center",
          active ? "text-accent-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
      </span>
      {!collapsed && <span>{children}</span>}
    </a>
  );
}
