import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type ErrorCallbacks = {
  on401?: (error: AxiosError) => void;
  on403?: (error: AxiosError) => void;
  onRefreshTokenError?: (error: AxiosError) => void;
};

const createHttpClient = (
  baseUrl: string,
  errorCallbacks: ErrorCallbacks = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.request.use(
    async function (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> {
      const userString = localStorage.getItem("user");
      const userState = userString ? JSON.parse(userString) : null;
      const token = userState?.state?.user?.accessToken || "";

      const headers = new AxiosHeaders(config.headers);
      headers.set("Authorization", token ? `Bearer ${token}` : undefined);

      config.headers = headers;

      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    async function (error: AxiosError) {
      const { response } = error;

      // handlle refresh token logic here
      // if (response) {
      //   errorCallbacks.onRefreshTokenError?.(error);
      // }

      if (response && response.status === 401) {
        errorCallbacks.on401?.(error);
        const userSting = localStorage.getItem("user");
        if (userSting?.length) {
          errorCallbacks.on401?.(error);
        }
      }

      if (response && response.status === 403) {
        errorCallbacks.on403?.(error);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createHttpClient;
