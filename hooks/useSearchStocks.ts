'use client';

import useSWR from 'swr';

export function useSearchStocks(query: string) {
  const key =
    query.trim().length > 0
      ? `/api/search?q=${encodeURIComponent(query.trim())}`
      : null;
  const { data, error, isLoading, mutate } = useSWR<{ items: StockWithWatchlistStatus[] }>(
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


