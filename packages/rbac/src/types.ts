export type FeatureFlags = {
  [key: string]: boolean;
};

export type BitType = {
  [key: string]: number;
};

export interface Role extends BitType {}

export interface Permission extends BitType {}

export interface Feature extends BitType {}

export interface AccessControlContextType {
  hasPermission: (perm: keyof typeof PERMISSIONS) => boolean;
  hasRole: (role: keyof typeof ROLES) => boolean;
  hasFeature: (feature: keyof typeof FEATURES) => boolean;
  hasAnyRole: (roles: (keyof typeof ROLES)[]) => boolean;
  hasAnyPermission: (perms: (keyof typeof PERMISSIONS)[]) => boolean;
}

// Roles (example bit positions)
export const ROLES: BitType = {
  SUPER_ADMIN: 0,
  PATIENT: 1,
  FACILITY_ADMIN: 2,
  DEPARTMENT_ADMIN: 3,
  ORG_ADMIN: 4,
  DOCTOR: 5,
} as const;

export const PERMISSIONS: BitType = {
  CREATE: 0,
  READ: 1,
  UPDATE: 2,
  DELETE: 3,
} as const;

export const FEATURES: BitType = {
  WELLNESS_PLAN: 0,
  ACCOUNT: 1,
  POST_SURVEY: 2,
  BILLING: 3,
  REPORTS: 4,
  USER_MANAGEMENT: 5,
  APPOINTMENTS: 6,
  PRESCRIPTIONS: 7,
  LAB_RESULTS: 8,
  NOTIFICATIONS: 9,
  MEDICAL_RECORDS: 10,
  INVENTORY: 11,
} as const;
