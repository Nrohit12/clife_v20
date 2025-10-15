import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@clife/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@clife/ui/components/navigation-menu";
import { useLocation } from "@tanstack/react-router";
import { LogIn, User } from "lucide-react";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

export default function SuperAdminNavbar({
  user,
  ...props
}: Readonly<React.HTMLProps<HTMLElement> & { user?: User }>) {
  const location = useLocation();

  const handleLogin = (e?: React.MouseEvent) => {
    e?.preventDefault();
  };

  const pageTitle =
    location.pathname === "/"
      ? "Home"
      : location.pathname.slice(1).charAt(0).toUpperCase() +
        location.pathname.slice(2).replace(/-/g, " ");

  return (
    <nav
      className="w-full border-b bg-n-98 backdrop-blur dark:bg-gray-800 h-14"
      {...props}
    >
      <div className="flex  items-center px-6 h-full">
        {/* LEFT: Page Title */}
        {/* Add breadcrumbs here */}
        <h2 className="text-lg font-semibold">{pageTitle}</h2>
        {/* RIGHT: nav + user + theme */}
        <div className="ml-auto flex items-center gap-4">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList>
              {!user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleLogin}
                      className="flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <div className="flex flex-row items-center gap-2 px-2 py-1">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-7 w-7 rounded-full border"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {user.name}
                      </span>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
