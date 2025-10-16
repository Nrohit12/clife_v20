import tenantAdminEndpoints from "@/api/endpoints/tenant-admin";
import { queryKeys } from "@/api/query/queryKeys";
import { TenantsResponse } from "@/types/tenant";
import handleApiError, { ApiError } from "@clife/domain/handleApiError";
import Result from "@clife/domain/result";
import { useQuery } from "@tanstack/react-query";
import { QUERY_BASE_OPTS } from "..";

async function getOneTenantAdmin(tenantAdminId: string): Promise<unknown> {
  try {
    const response =
      await tenantAdminEndpoints.getOneTenantAdmin(tenantAdminId);
    const { data } = response;
    const { result } = Result.success(data);
    return result.data as TenantsResponse;
  } catch (e: unknown) {
    const error = handleApiError(e as unknown as ApiError);
    throw error;
  }
}

/**
 * Hook to get one tenant admin by ID
 * @param {string} tenantAdminId
 * @returns
 */
function useGetOneTenantAdmin(tenantAdminId: string) {
  //   const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.getOneTenantAdmin, tenantAdminId],
    queryFn: async () => {
      const response = (await getOneTenantAdmin(
        tenantAdminId
      )) as TenantsResponse;
      //   dispatch(setTenants(response.items));

      //   if (!page && !pageSize && !searchTerm) {
      //     dispatch(setAllTenants(response.items));
      //   }
      return response;
    },
    ...QUERY_BASE_OPTS,
  });
}

export default useGetOneTenantAdmin;
