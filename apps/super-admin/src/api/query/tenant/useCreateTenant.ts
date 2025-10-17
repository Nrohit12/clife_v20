import tenantEndpoints from "@/api/endpoints/tenant";
import { CreateTenant } from "@/types/tenant.types";
import handleApiError from "@tesseract/domain/handleApiError";
import Result from "@tesseract/domain/result";
import { useMutation } from "@tanstack/react-query";

async function createTenant(tenant: CreateTenant): Promise<unknown> {
  try {
    const response = await tenantEndpoints.createTenant(tenant);
    const { data } = response;
    const { result } = Result.success(data);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const error = handleApiError(e);
    throw error;
  }
}

function useCreateTenant() {
  return useMutation({
    mutationFn: (tenant: CreateTenant) => createTenant(tenant),
  });
}

export default useCreateTenant;
