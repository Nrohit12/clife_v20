import { DefaultOptions } from "@tanstack/react-query";

export const QUERY_BASE_OPTS: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    staleTime: 1000 * 60,
  },
  mutations: {
    retry: false,
  },
};
