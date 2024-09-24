import { useCallback, useEffect, useState } from "react";

const BASE_URL = "http://192.168.1.10:5000/api/v1";

export const useFetch = <T>(endpoint: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = `${BASE_URL}${endpoint}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      setData(result.data);
    } catch (error) {
      console.log("Fetch Error:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};
