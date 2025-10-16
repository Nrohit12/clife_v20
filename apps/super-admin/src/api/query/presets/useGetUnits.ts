import presetEndpoints from "@/api/endpoints/presets";
import { queryKeys } from "@/api/query/queryKeys";
import { TenantsResponse } from "@/types/tenant";
import handleApiError, { ApiError } from "@clife/domain/handleApiError";
import Result from "@clife/domain/result";
import { useQuery } from "@tanstack/react-query";
import { QUERY_BASE_OPTS } from "..";

async function getUnits(): Promise<unknown> {
  try {
    const response = await presetEndpoints.getUnits();

    const { data } = response;
    const { result } = Result.success(data);
    return result.data as TenantsResponse;
  } catch (e: unknown) {
    const error = handleApiError(e as unknown as ApiError);
    throw error;
  }
}

function useGetUnits() {
  //   const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.getUnits],
    queryFn: async () => {
      const response = (await getUnits()) as TenantsResponse;
      //   dispatch(setTenants(response.items));
      //   if (!page && !pageSize && !searchTerm) {
      //     dispatch(setAllTenants(response.items));
      //   }
      return response;
    },
    ...QUERY_BASE_OPTS,
  });
}

export default useGetUnits;
