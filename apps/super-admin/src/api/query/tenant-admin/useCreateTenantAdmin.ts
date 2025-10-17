import tenantAdminEndpoints from "@/api/endpoints/tenant-admin";
import { CreateTenant } from "@/types/tenant";
import handleApiError from "@tesseract/domain/handleApiError";
import Result from "@tesseract/domain/result";
import { useMutation } from "@tanstack/react-query";

async function createTenantAdmin(tenant: CreateTenant): Promise<unknown> {
  try {
    const response = await tenantAdminEndpoints.createTenantAdmin(tenant);
    const { data } = response;
    const { result } = Result.success(data);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const error = handleApiError(e);
    throw error;
  }
}

function useCreateTenantAdmin() {
  return useMutation({
    mutationFn: (tenant: CreateTenant) => createTenantAdmin(tenant),
  });
}

export default useCreateTenantAdmin;
