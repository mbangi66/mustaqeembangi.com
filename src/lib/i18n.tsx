"use client";

import { createContext, useContext } from "react";
import { en, type SiteContent } from "./data";
import { ar } from "./content-ar";
import { uiAr, uiEn, type Ui } from "./ui";

export type Locale = "en" | "ar";

type LocaleValue = { locale: Locale; dir: "ltr" | "rtl"; c: SiteContent; t: Ui };

const values: Record<Locale, LocaleValue> = {
  en: { locale: "en", dir: "ltr", c: en, t: uiEn },
  ar: { locale: "ar", dir: "rtl", c: ar, t: uiAr },
};

const LocaleContext = createContext<LocaleValue>(values.en);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={values[locale]}>{children}</LocaleContext.Provider>;
}

/** The current language's content (`c`), interface wording (`t`) and direction. */
export function useLocale() {
  return useContext(LocaleContext);
}
