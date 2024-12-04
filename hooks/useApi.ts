import { useLoader } from "@/lib/contexts/LoaderContext";
import { useState, useCallback } from "react";

interface ApiCallStatus {
  id: number;
  label: string;
  isComplete: boolean;
  status: "loading" | "success" | "error";
  message: string;
}

type FetcherFunction = (...args: any[]) => Promise<any>;

interface UseApiProps {
  fetchers: FetcherFunction[];
  onSuccess?: (data: any[]) => void;
  onError?: (errors: any[]) => void;
}

export const useApi = ({ fetchers, onSuccess, onError }: UseApiProps) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [apiStatuses, setApiStatuses] = useState<ApiCallStatus[]>([]);
  const { showLoader, updateLoaderStatus, hideLoader } = useLoader();

  const updateApiStatus = useCallback(
    (
      id: number,
      status: ApiCallStatus["status"],
      message: string,
      isComplete: boolean
    ) => {
      setApiStatuses((prev) => {
        const updatedStatuses = prev.map((item) =>
          item.id === id ? { ...item, status, message, isComplete } : item
        );
        return updatedStatuses;
      });
      updateLoaderStatus(id, status, message, isComplete);
    },
    [updateLoaderStatus]
  );

  const call = useCallback(
    async (...initialParams: any[]) => {
      setLoading(true);
      setResults([]);
      const initialStatuses = fetchers.map((fetcher, index) => ({
        id: index + 1,
        label: fetcher.name || `API Call ${index + 1}`,
        isComplete: false,
        status: "loading" as const,
        message: `Initializing ${fetcher.name || `API Call ${index + 1}`}...`,
      }));
      setApiStatuses(initialStatuses);
      showLoader(initialStatuses);

      const fetcherResults: any[] = [];
      const fetcherErrors: any[] = [];

      for (let i = 0; i < fetchers.length; i++) {
        const fetcher = fetchers[i];
        const callId = i + 1;

        try {
          updateApiStatus(
            callId,
            "loading",
            `Fetching ${fetcher.name || `API Call ${callId}`}...`,
            false
          );

          const result = await fetcher(...initialParams);

          fetcherResults.push(result?.data || result);

          updateApiStatus(
            callId,
            "success",
            `Successfully fetched ${fetcher.name || `API Call ${callId}`}`,
            true
          );
        } catch (error) {
          fetcherErrors.push(error);

          updateApiStatus(
            callId,
            "error",
            error instanceof Error
              ? error.message
              : `Error in ${fetcher.name || `API Call ${callId}`}`,
            true
          );
        }
      }

      setLoading(false);
      setResults(fetcherResults);

      if (fetcherErrors.length === 0 && onSuccess) {
        onSuccess(fetcherResults);
      } else if (fetcherErrors.length > 0 && onError) {
        onError(fetcherErrors);
      }

      return {
        results: fetcherResults,
        errors: fetcherErrors,
      };
    },
    [fetchers, onSuccess, onError, updateApiStatus, showLoader]
  );

  return {
    call,
    loading,
    results,
    apiStatuses,
  };
};

export default useApi;
