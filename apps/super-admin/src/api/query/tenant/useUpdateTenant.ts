import tenantEndpoints from "@/api/endpoints/tenant";
import handleApiError from "@clife/domain/handleApiError";
import Result from "@clife/domain/result";
import { useMutation } from "@tanstack/react-query";

async function updateTenant({
  id,
  tenant,
}: {
  id: string;
  tenant: any;
}): Promise<unknown> {
  try {
    const response = await tenantEndpoints.updateTenant(id, tenant);
    const { data } = response;
    const { result } = Result.success(data);
    return result;
  } catch (e: any) {
    const error = handleApiError(e);
    throw error;
  }
}

function useUpdateTenant() {
  return useMutation({
    mutationFn: (params: { id: string; tenant: any }) => updateTenant(params),
  });
}

export default useUpdateTenant;
