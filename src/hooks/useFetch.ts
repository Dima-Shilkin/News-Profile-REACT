import { useState, useEffect } from "react";

export const useFetch = <T>(fetchFunction: (endpoint?: string) => Promise<T>, endpoint?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(endpoint);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, fetchFunction]);

  return { data, isLoading, error };
};
