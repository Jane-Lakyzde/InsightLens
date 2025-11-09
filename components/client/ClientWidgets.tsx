'use client';

import dynamic from 'next/dynamic';
import React from 'react';

export const ClientTradingViewWidget = dynamic(
  () => import('../TradingViewWidget'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center text-gray-500">
        加载图表…
      </div>
    ),
  }
);

export const ClientAIChat = dynamic(() => import('../AIChat'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg h-[calc(100vh-160px)] p-4 text-gray-500">
      加载助手…
    </div>
  ),
});


