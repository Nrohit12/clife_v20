import { CreateTenant } from "@/types/tenant";
import { setUrlParams } from "@clife/domain/helpers";
import { endpoints } from "@/api";
import createHttpClient from "@clife/domain/httpClient";

const { TENANT } = endpoints;

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const httpClient = createHttpClient(baseUrl);

const tenantEndpoints = {
  getAllTenants(
    page?: number,
    pageSize?: number,
    searchTerm?: string | number,
    status?: string
  ) {
    const params = {
      page: page,
      pageSize: pageSize,
      searchTerm: searchTerm,
      status: status,
    };
    const url = setUrlParams(TENANT.LIST, params);
    return httpClient.get(url);
  },

  getOneTenant(id: string) {
    const url = `${TENANT.GET_ONE}/${id}`;
    return httpClient.get(url);
  },

  createTenant(tenant: CreateTenant) {
    console.log(tenant);
    const url = TENANT.CREATE;
    return httpClient.post(url, tenant);
  },

  updateTenant(id: string, tenant: any) {
    const url = `${TENANT.UPADTE}/${id}`;
    return httpClient.patch(url, tenant);
  },
};

export default tenantEndpoints;
