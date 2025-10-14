import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  FEATURES,
  PERMISSIONS,
  ROLES,
  type AccessControlContextType,
} from "./types";

/**
 * Returns a bitmask with only the bit at the given index set to 1.
 * Uses the unsigned right shift operator (>>> 0) to ensure the result is an unsigned 32-bit integer.
 * @param index - The bit position to set (0-based).
 * @returns The bitmask as an unsigned 32-bit integer.
 */
const bit = (index: number) => (1 << index) >>> 0;
/**
 * Checks if the bit at the given index is set in the provided mask.
 * @param mask - The bitmask to check.
 * @param index - The bit position to test (0-based).
 * @returns True if the bit at the given index is set; otherwise, false.
 */
const hasBit = (mask: number, index: number) => (mask & bit(index)) !== 0;

// kept for future reference
// const decodeMask = <T extends Record<string, number>>(
//   mask: number,
//   map: T
// ): (keyof T)[] =>
//   (Object.keys(map) as (keyof T)[]).filter((k) =>
//     hasBit(mask, map[k as string])
//   );

export const AccessControlContext = createContext<AccessControlContextType | null>(null);

//replace `any` with user type when available
export const AccessControlProvider = ({ children, user }: { children: ReactNode, user: any }) => {

  // ---- Bitmask-based checks ----
  const hasPermission = (perm: keyof typeof PERMISSIONS) => {
    if (!user) return false;
    return hasBit(user.permissionsMask, PERMISSIONS[perm]);
  };

  const hasFeature = (feature: keyof typeof FEATURES) => {
    if (!user) return false;
    return hasBit(user.featuresMask, FEATURES[feature]);
  };

  const hasRole = (role: keyof typeof ROLES) => {
    if (!user) return false;
    return hasBit(user.rolesMask, ROLES[role]);
  };

  const hasAnyRole = (roles: (keyof typeof ROLES)[]) => {
    if (!user) return false;
    return roles.some((role) => hasBit(user.rolesMask, ROLES[role]));
  };

  const hasAnyPermission = (perms: (keyof typeof PERMISSIONS)[]) => {
    if (!user) return false;
    return perms.some((perm) => hasBit(user.permissionsMask, PERMISSIONS[perm]));
  };

  const value: AccessControlContextType = {
    hasPermission,
    hasRole,
    hasFeature,
    hasAnyRole,
    hasAnyPermission
  };

  return <AccessControlContext.Provider value={value}>{children}</AccessControlContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccessControl = () => {
  const ctx = useContext(AccessControlContext);
  if (!ctx) throw new Error("useAccessControl must be used within AccessControlProvider");
  return ctx;
};
