import tenantEndpoints from "@/api/endpoints/tenant";
import { queryKeys } from "@/api/query/queryKeys";
import { TenantsResponse } from "@/types/tenant.types";
import handleApiError, { ApiError } from "@tesseract/domain/handleApiError";
import Result from "@tesseract/domain/result";
import { useQuery } from "@tanstack/react-query";
import { QUERY_BASE_OPTS } from "..";

async function getOneTenant(tenantId: string): Promise<unknown> {
  try {
    const response = await tenantEndpoints.getOneTenant(tenantId);
    const { data } = response;
    const { result } = Result.success(data);
    return result.data as TenantsResponse;
  } catch (e: unknown) {
    const error = handleApiError(e as unknown as ApiError);
    throw error;
  }
}

/**
 * Hook to get one tenant by ID
 * @param {string} tenantId
 * @returns
 */
function useGetOneTenant(tenantId: string) {
  //   const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.getOneTenant, tenantId],
    queryFn: async () => {
      const response = (await getOneTenant(tenantId)) as TenantsResponse;
      //   dispatch(setTenants(response.items));

      //   if (!page && !pageSize && !searchTerm) {
      //     dispatch(setAllTenants(response.items));
      //   }
      return response;
    },
    ...QUERY_BASE_OPTS,
  });
}

export default useGetOneTenant;
