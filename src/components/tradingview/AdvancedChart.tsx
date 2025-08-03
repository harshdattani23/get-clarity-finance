// TradingViewWidget.jsx
"use client"
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise: Promise<Event> | null = null;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => {
        if (onLoadScriptRef.current) {
            onLoadScriptRef.current();
        }
      });

      return () => {
        onLoadScriptRef.current = null;
      };

      function createWidget() {
        if (document.getElementById('tradingview_33958') && 'TradingView' in window) {
          new (window as any).TradingView.widget({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_33958"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id='tradingview_33958' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div>
    </div>
  );
}
