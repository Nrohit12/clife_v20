import type { JSX } from "react";
import { useAccessControl } from "./AccessControlContext";
import IdleTimerContainer from "@clife/ui/components/custom/idle-timer-container";
import { PERMISSIONS, ROLES } from "./types";

export type ProtectedRouteProps = {
  children: JSX.Element;
  roles: (keyof typeof ROLES)[];
  permissions: (keyof typeof PERMISSIONS)[];
  user: any; //replace `any` with user type when available
  renderLoginRedirect: () => JSX.Element;
  renderNoAccessRedirect: () => JSX.Element;

  idleTimeout: number; // in ms
  idleThrottle: number; // in ms
  mockLoginRedirectTimeout: number; // in ms
};
export function ProtectedRoute({
  children,
  roles,
  permissions,
  user,
  renderLoginRedirect,
  renderNoAccessRedirect,

  idleTimeout,
  idleThrottle,
  mockLoginRedirectTimeout,
}: Readonly<ProtectedRouteProps>) {
  const { hasAnyRole, hasAnyPermission } = useAccessControl();

  // Not logged in? Redirect to login
  if (!user) {
    return renderLoginRedirect();
  }

  // Role-based check
  if (roles && !hasAnyRole(roles)) {
    return renderNoAccessRedirect();
  }

  // Permission-based check
  if (permissions && !hasAnyPermission(permissions)) {
    return renderNoAccessRedirect();
  }

  return (
    <>
      <IdleTimerContainer
        idleTimeout={idleTimeout}
        idleThrottle={idleThrottle}
        mockLoginRedirectTimeout={mockLoginRedirectTimeout}
        redirectCall={renderLoginRedirect}
      />
      {children}
    </>
  );
}
