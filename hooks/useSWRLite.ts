'use client';

import { useEffect, useRef, useState } from 'react';

type Key = string | null;

const globalCache = new Map<string, any>();
const globalErrors = new Map<string, any>();
const globalPromises = new Map<string, Promise<any>>();

export function useSWRLite<T = any>(
  key: Key,
  fetcher: (key: string) => Promise<T>,
  opts?: { revalidateOnFocus?: boolean }
) {
  const revalidateOnFocus = opts?.revalidateOnFocus ?? true;
  const [data, setData] = useState<T | undefined>(() =>
    key && globalCache.has(key) ? (globalCache.get(key) as T) : undefined
  );
  const [error, setError] = useState<any>(() =>
    key && globalErrors.has(key) ? globalErrors.get(key) : undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(() => !data && !error && Boolean(key));
  const keyRef = useRef<Key>(key);

  const mutate = async () => {
    if (!keyRef.current) return;
    const k = keyRef.current;
    if (globalPromises.has(k)) return globalPromises.get(k);
    const p = fetcher(k)
      .then((res) => {
        globalCache.set(k, res);
        setData(res);
        setError(undefined);
        return res;
      })
      .catch((e) => {
        globalErrors.set(k, e);
        setError(e);
        throw e;
      })
      .finally(() => {
        globalPromises.delete(k);
        setIsLoading(false);
      });
    globalPromises.set(k, p);
    return p;
  };

  useEffect(() => {
    keyRef.current = key;
    if (!key) return;
    // 乐观展示缓存
    if (globalCache.has(key)) {
      setData(globalCache.get(key));
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    // 后台刷新
    mutate();
    // 焦点自动刷新
    if (!revalidateOnFocus) return;
    const onFocus = () => mutate();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, error, isLoading, mutate };
}


