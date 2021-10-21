import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyDataFn) => {
    setIsLoading(true);
    setRequestCompleted(false);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json(); // Made assumption that all data is in JSON
      applyDataFn(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
    setRequestCompleted(true);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    requestCompleted,
  };
};

export default useHttp;
