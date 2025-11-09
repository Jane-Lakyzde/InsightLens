'use client';

import { useEffect, useRef, useState } from 'react';

export function useSSE<T = any>(url: string, eventName = 'message') {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    try {
      const es = new EventSource(url);
      esRef.current = es;
      const handler = (e: MessageEvent) => {
        try {
          setData(JSON.parse(e.data));
        } catch {
          setData(undefined as any);
        }
      };
      es.addEventListener(eventName, handler as any);
      es.onerror = (e) => setError(e);
      return () => {
        es.removeEventListener(eventName, handler as any);
        es.close();
      };
    } catch (e) {
      setError(e);
    }
  }, [url, eventName]);

  return { data, error };
}


