"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { translations, t, LanguageCode } from "@/utils/translations";

interface LanguageContextProps {
  language: LanguageCode;
  t: (key: string) => string;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage") as LanguageCode | null;
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang);
    }
  }, []);

  const changeLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const translate = (key: string) => t(language, key);

  return (
    <LanguageContext.Provider value={{ language, t: translate, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

