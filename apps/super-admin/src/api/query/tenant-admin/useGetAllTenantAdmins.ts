import tenantAdminEndpoints from "@/api/endpoints/tenant-admin";
import { queryKeys } from "@/api/query/queryKeys";
import { TenantsResponse } from "@/types/tenant";
import handleApiError, { ApiError } from "@clife/domain/handleApiError";
import Result from "@clife/domain/result";
import { useQuery } from "@tanstack/react-query";
import { QUERY_BASE_OPTS } from "..";

async function getAllTenantAdmins(
  page?: number,
  pageSize?: number,
  searchTerm?: string | number
): Promise<unknown> {
  try {
    const response = await tenantAdminEndpoints.getAllTenantAdmins(
      page,
      pageSize,
      searchTerm
    );
    const { data } = response;
    const { result } = Result.success(data);
    return result.data as TenantsResponse;
  } catch (e: unknown) {
    const error = handleApiError(e as unknown as ApiError);
    throw error;
  }
}

/**
 * Hook to get all tenant admins
 * @param {number} page
 * @param {number} pageSize
 * @param {string} searchTerm
 * @returns
 */
function useGetAllTenantAdmins(
  page?: number,
  pageSize?: number,
  searchTerm?: string | number
) {
  //   const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.getAllTenantAdmins, page, pageSize, searchTerm],
    queryFn: async () => {
      const response = (await getAllTenantAdmins(
        page,
        pageSize,
        searchTerm
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

export default useGetAllTenantAdmins;
