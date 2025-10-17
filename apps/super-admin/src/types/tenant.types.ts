export interface CreateTenant {
  name: string;
  status: "active" | "inactive" | "archived";
}

export interface Tenant {
  _id: string;
  name: string;
  status: string;
  created: string;
  updated: string;
  __v: number;
}

export interface TenantsResponse {
  items: Tenant[];
  total: number;
  page: number;
  limit: number;
}