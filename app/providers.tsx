'use client';

import React from 'react';
import { SWRConfig } from 'swr';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        // 通用 fetcher：no-store，交由 SWR 管理缓存与更新
        fetcher: (url: string) =>
          fetch(url, { cache: 'no-store' }).then((r) => r.json()),
        revalidateOnFocus: true,
        revalidateIfStale: true,
        revalidateOnReconnect: true,
        dedupingInterval: 10_000,
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}


