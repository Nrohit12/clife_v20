import { Tenant } from "@/types/tenant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TenantState {
  tenant: Tenant | null;
  tenants: Tenant[];
  allTenants: Tenant[];
  selectedTenantId: string | null;
}

const initialState: TenantState = {
  tenant: null,
  tenants: [],
  selectedTenantId: "",
  allTenants: [],
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant | null>) => {
      state.tenant = action.payload;
    },
    setTenants: (state, action: PayloadAction<Tenant[] | []>) => {
      state.tenants = action.payload;
    },
    setAllTenants: (state, action: PayloadAction<Tenant[] | []>) => {
      state.allTenants = action.payload;
    },
    setSelectedTenantId: (state, action: PayloadAction<string | null>) => {
      state.selectedTenantId = action.payload;
    },
  },
});

export const { setTenant, setTenants, setSelectedTenantId, setAllTenants } =
  tenantSlice.actions;
export const tenantReducer = tenantSlice.reducer;
