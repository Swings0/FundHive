// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import Link from 'next/link';

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!container.current)
      return;

      if (container.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"]')) {
      return;
      }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "gridColor": "rgba(255, 255, 255, 0.06)",
          "hide_top_toolbar": true,
          "allow_symbol_change": true,
          "calendar": false,
          "studies": [
            "STD;24h%Volume"
          ],
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );
  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        <Link href={'/'}>
         <span className="text-gray-400 tracking-wide">Fundhivecorps.com</span>
        </Link>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);

