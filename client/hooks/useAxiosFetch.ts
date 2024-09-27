import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

const BASE_URL = "http://192.168.1.10:5000/api/v1";

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useAxiosFetch = <T>() => {
  const [fetchResult, setFetchResult] = useState<FetchResult<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async (endpoint: string, options?: any) => {
    setFetchResult((prev) => ({ ...prev, loading: true }));

    const url = `${BASE_URL}${endpoint}`;
    console.log(url);

    try {
      const response = await axios.get<T>(url, options);
      setFetchResult({ data: response.data.data, loading: false, error: null });
    } catch (error) {
      console.log("🚀 ~ file: useAxiosFetch.ts:29 ~ error:", error);
      const axiosError = error as AxiosError<AxiosResponse<T>>;
      setFetchResult({
        data: null,
        loading: false,
        error: axiosError.response?.data?.message || axiosError.message,
      });
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return { ...fetchResult, fetchData };
};
