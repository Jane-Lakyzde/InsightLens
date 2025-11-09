'use client';

import { useEffect } from 'react';

let prefetched = false;

const TRADINGVIEW_SCRIPTS = [
  'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js',
  'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
];

export default function ScriptPrefetcher() {
  useEffect(() => {
    if (prefetched) return;
    prefetched = true;
    try {
      // dns-prefetch + preload 脚本，提升首次切页体验
      const head = document.head || document.getElementsByTagName('head')[0];
      const dns = document.createElement('link');
      dns.rel = 'dns-prefetch';
      dns.href = 'https://s3.tradingview.com';
      head.appendChild(dns);

      TRADINGVIEW_SCRIPTS.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = url;
        link.crossOrigin = 'anonymous';
        head.appendChild(link);
      });
    } catch {}
  }, []);
  return null;
}


