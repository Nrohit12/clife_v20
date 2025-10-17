import presetEndpoints from "@/api/endpoints/presets";
import { queryKeys } from "@/api/query/queryKeys";
import { TenantsResponse } from "@/types/tenant";
import handleApiError, { ApiError } from "@tesseract/domain/handleApiError";
import Result from "@tesseract/domain/result";
import { useQuery } from "@tanstack/react-query";
import { QUERY_BASE_OPTS } from "..";

async function getLanguageAndTimezones(): Promise<unknown> {
  try {
    const response = await presetEndpoints.getLanguageAndTimezones();

    const { data } = response;
    const { result } = Result.success(data);
    return result.data as TenantsResponse;
  } catch (e: unknown) {
    const error = handleApiError(e as unknown as ApiError);
    throw error;
  }
}

function useGetLanguagesAndTimezones() {
  //   const dispatch = useDispatch();
  return useQuery({
    queryKey: [queryKeys.getLanguageAndTimezones],
    queryFn: async () => {
      const response = (await getLanguageAndTimezones()) as TenantsResponse;
      //   dispatch(setTenants(response.items));
      //   if (!page && !pageSize && !searchTerm) {
      //     dispatch(setAllTenants(response.items));
      //   }
      return response;
    },
    ...QUERY_BASE_OPTS,
  });
}

export default useGetLanguagesAndTimezones;
