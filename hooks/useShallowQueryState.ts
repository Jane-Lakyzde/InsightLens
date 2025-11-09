'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useShallowQueryState<T extends Record<string, string | number | undefined>>() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setQuery = useCallback(
    (next: Partial<T>) => {
      const sp = new URLSearchParams(params.toString());
      Object.entries(next).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') sp.delete(k);
        else sp.set(k, String(v));
      });
      const url = `${pathname}?${sp.toString()}`;
      router.push(url, { scroll: false });
    },
    [router, pathname, params]
  );

  return { setQuery };
}


