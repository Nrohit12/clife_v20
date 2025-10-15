export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  rolesMask: number;
  permissionsMask: number;
  featuresMask: number;
} | null;