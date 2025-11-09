'use client';

import useSWR from 'swr';

export function useMarketNews(symbols?: string[]) {
  const key =
    Array.isArray(symbols) && symbols.length > 0
      ? `/api/news?symbols=${encodeURIComponent(symbols.join(','))}`
      : `/api/news`;
  const { data, error, isLoading, mutate } = useSWR<{ items: MarketNewsArticle[] }>(
    key,
    undefined,
    { keepPreviousData: true }
  );
  return {
    items: data?.items ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}


