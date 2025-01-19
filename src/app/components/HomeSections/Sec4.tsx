'use client'
import React, { useEffect, useRef, memo } from "react";


const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "500",
        "symbol": "BINANCE:BTCUSD",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);
  }, []);

  return (

    <div className="bg4 py-24">
        
        <div className='flex flex-col text-center items-center justify-center pb-10 text-white'>
            <p className='text-sm tracking-wide'>Designed  For You</p>
            <h1 className='text-3xl font-semibold'>Our Features</h1>
        </div>

        <div
        className="tradingview-widget-container lg:h-[500px] md:h-[500px] h-[400px] w-80% lg:px-6 md:px-6 px-4  "
        ref={container}
        
        >
        <div
            className="tradingview-widget-container__widget h-[500px] w-80% "
        ></div>
        <div className="tradingview-widget-copyright">
            <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
            >
            <span className="text-white text-sm tracking-wide">Track all markets on TradingView</span>
            </a>
        </div>
        </div>

    </div>

  );
};

export default memo(TradingViewWidget);

