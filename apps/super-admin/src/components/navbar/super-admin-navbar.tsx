import { useLocation } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { Button } from "@tesseract/ui/components/button";
import { Separator } from "@tesseract/ui/components/separator";
import {
  Avatar,
  AvatarFallback,
} from "@tesseract/ui/components/avatar";

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

  // simple breadcrumb based on pathname
  const segments = location.pathname.split("/").filter(Boolean);
  const lastSegment = segments.length > 0 ? segments[segments.length - 1] : "";
  const breadcrumb = [
    "Home",
    lastSegment
      ? lastSegment
          .replace(/-/g, " ")
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : ""
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <nav
      className="w-full h-14 border-b bg-background/80 backdrop-blur"
      {...props}
    >
      <div className="flex items-center h-full px-6">
        {/* LEFT: Breadcrumbs */}
        <h2 className="text-base font-medium text-muted-foreground">{breadcrumb}</h2>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-4">
          {/* Search icon in circle */}
          <Button
            type="button"
            aria-label="Search"
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-card text-foreground/70 hover:bg-muted/50"
          >
            <Search className="h-5 w-5 text-primary-40" />
          </Button>

          {/* Bell with red dot in circle */}
          <Button
            type="button"
            aria-label="Notifications"
            variant="outline"
            size="icon"
            className="relative rounded-full h-10 w-10 bg-card text-foreground/70 hover:bg-muted/50"
          >
            <Bell className="h-5 w-5 text-primary-40" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-error-40" />
          </Button>

          {/* Divider */}
          <Separator orientation="vertical" className="h-6" />

          {/* User pill */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              {/* <AvatarImage src={user?.avatar} alt={user?.name ?? "User"} /> */}
              <AvatarFallback className="bg-primary-40 w-full h-full flex items-center justify-center text-white">
                {(user?.name?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("") || "JD").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-foreground">{user?.name || "John Doe"}</div>
              <div className="text-xs text-muted-foreground">Super Admin</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
