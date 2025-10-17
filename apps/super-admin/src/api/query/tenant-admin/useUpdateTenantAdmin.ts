import tenantAdminEndpoints from "@/api/endpoints/tenant-admin";
import handleApiError from "@tesseract/domain/handleApiError";
import Result from "@tesseract/domain/result";
import { useMutation } from "@tanstack/react-query";

async function updateTenantAdmin({
  id,
  tenantAdmin,
}: {
  id: string;
  tenantAdmin: any;
}): Promise<unknown> {
  try {
    const response = await tenantAdminEndpoints.updateTenantAdmin(
      id,
      tenantAdmin
    );
    const { data } = response;
    const { result } = Result.success(data);
    return result;
  } catch (e: any) {
    const error = handleApiError(e);
    throw error;
  }
}

function useUpdateTenantAdmin() {
  return useMutation({
    mutationFn: (params: { id: string; tenantAdmin: any }) =>
      updateTenantAdmin(params),
  });
}

export default useUpdateTenantAdmin;
