'use client'
import React, { useEffect, useRef, memo } from "react";
import { useLanguage } from "@/context/LanguageContext";

const TradingViewWidget: React.FC = () => {
  const {t} = useLanguage();
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!container.current)
      return;

      if (container.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"]')) {
      return;
      }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    // Update widget configuration to use full width and a taller height.
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      isTransparent: false,
      displayMode: "regular",
      width: "100%",
      height: "500",
      colorTheme: "dark",
      locale: "en",
    });
    container.current.appendChild(script);
  }, []);

  return (
    <div className="bg4 py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center items-center justify-center pb-10 text-white">
          <p className="text-sm tracking-wide">{t("sec3.header.prefix")}</p>
          <h1 className="text-3xl font-semibold">{t("sec3.header.title")}</h1>
        </div>
        {/* Single centered container for the TradingView widget */}
        <div
          className="tradingview-widget-container w-full  mx-auto"
          ref={container}
        >
          {/* <div className="tradingview-widget-container__widget"></div> */}
        </div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
