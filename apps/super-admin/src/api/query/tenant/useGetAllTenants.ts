import tenantEndpoints from "@/api/endpoints/tenant";
import { TenantsResponse } from "@/types/tenant.types";
import { useDispatch } from "react-redux";
import { setAllTenants, setTenants } from "@/store/slice";
import Result from "@tesseract/domain/result";
import { useQuery } from "@tanstack/react-query";
import handleApiError from "@tesseract/domain/handleApiError";
import { ApiError } from "@tesseract/domain/handleApiError";
import { queryKeys } from "@/api/query/queryKeys";
import { QUERY_BASE_OPTS } from "..";

async function getAllTenants(
  page?: number,
  pageSize?: number,
  searchTerm?: string | number
): Promise<unknown> {
  try {
    const response = await tenantEndpoints.getAllTenants(
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
 * Hook to get all account closure requests
 * @param page
 * @param pageSize
 * @param searchTerm
 * @returns
 */
function useGetAllTenants(
  page?: number,
  pageSize?: number,
  searchTerm?: string | number
) {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.getAllTenants, page, pageSize, searchTerm],
    queryFn: async () => {
      const response = (await getAllTenants(
        page,
        pageSize,
        searchTerm
      )) as TenantsResponse;
      dispatch(setTenants(response.items));
      if (!page && !pageSize && !searchTerm) {
        dispatch(setAllTenants(response.items));
      }
      return response;
    },
    ...QUERY_BASE_OPTS,
  });
}

export default useGetAllTenants;
