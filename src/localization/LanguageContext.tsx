import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {translations} from "./translations";

export type Language = "ru" | "kk";
type LanguageContextValue = {language: Language; setLanguage: (language: Language) => void; t: (text: string) => string};
const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "universityy-language";
export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [language, updateLanguage] = useState<Language>("kk");
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY).then(value => {
      if (mounted && (value === "ru" || value === "kk")) updateLanguage(value);
    }).catch(() => {});
    return () => {mounted = false;};
  }, []);
  const setLanguage = useCallback((value: Language) => {
    updateLanguage(value);
    AsyncStorage.setItem(STORAGE_KEY, value).catch(() => {});
  }, []);
  const t = useCallback((text: string) => translations[language][text] ?? text, [language]);
  const value = useMemo(() => ({language, setLanguage, t}), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
