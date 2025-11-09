'use client';

import { useEffect, useMemo, useRef } from 'react';

/**
 * 初始化并挂载 TradingView 外部脚本到容器中。
 * 兼容所有 TradingView embed-widget 脚本（将配置作为 script.text 传入）。
 */
export default function useTradingViewWidget(
  scriptUrl: string,
  config: Record<string, unknown>,
  height: number | string
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 清空同容器内的旧脚本，保留内部 widget 容器 div
    const prevScripts = Array.from(container.querySelectorAll('script'));
    prevScripts.forEach((s) => s.remove());

    // 创建脚本
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = scriptUrl;
    script.innerHTML = configString; // TradingView 要求将 JSON 作为脚本文本

    // 设置容器高度（部分小部件需要父容器高度）
    container.style.height =
      typeof height === 'number' ? `${height}px` : String(height);

    // 挂载
    container.appendChild(script);

    // 卸载时清理
    return () => {
      script.remove();
    };
  }, [scriptUrl, configString, height]);

  return containerRef;
}


