import {
  AuthLayout,
  TenantConfigurationLayout,
  TenantCreationLayout,
} from "@/components/layouts";
import PageNotFoundPage from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import TenantList from "@/pages/tenantManagement";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  RouterProvider,
  useRouter,
} from "@tanstack/react-router";

// Helper functions to determine the layout based on the path
function isTenantCreationPath(path: string) {
  return path.startsWith("/onboarding") || path === "/";
}

// New helper to determine if the path is for tenant configuration
function isTenantConfigurationPath(path: string) {
  return path.startsWith("/configuration");
}

// Decides which layout to use based on the current path
function AppLayoutDecider(path: string) {
  return isTenantCreationPath(path) ? (
    <TenantCreationLayout />
  ) : isTenantConfigurationPath(path) ? (
    <TenantConfigurationLayout />
  ) : (
    <AuthLayout />
  );
}

function RootLayout() {
  const { state } = useRouter();
  const path = state.location.pathname;

  const layout = AppLayoutDecider(path);
  return layout;
}

// Root route config
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: PageNotFoundPage,
});

// Child routes (note: no layout markup here)

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/onboarding/tenants" />,
});

const tenantCreationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding/tenants",
  component: () => <TenantList />,
});

const superAdminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding/settings",
  component: () => <Settings />,
});

// Combine routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  tenantCreationRoute,
  superAdminSettingsRoute,
]);

export const router = createRouter({ routeTree });

export function RouterApp() {
  return <RouterProvider router={router} />;
}
