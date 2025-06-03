import { useEffect, useState, useCallback, useRef } from 'react';
import request from '@/core/services/api.service';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type UseApiOptions<T> = {
  url: string;
  method?: HttpMethod;
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  enabled?: boolean; // gọi tự động khi mounted
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
};

export function useApi<T = any>({
  url,
  method = 'get',
  params,
  data,
  headers,
  enabled = true,
  onSuccess,
  onError,
}: UseApiOptions<T>) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Giữ các giá trị params/data để dùng trong refetch
  const configRef = useRef({
    url,
    method,
    params,
    data,
    headers,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await request.request<T>({
        ...configRef.current,
      });

      setResponse(res.data);
      onSuccess?.(res.data);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  useEffect(() => {
    configRef.current = { url, method, params, data, headers };
    if (enabled) {
      fetchData();
    }
  }, [url, method, JSON.stringify(params), JSON.stringify(data), enabled, fetchData]);

  return {
    data: response,
    error,
    loading,
    refetch: fetchData,
  };
}
