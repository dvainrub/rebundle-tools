"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { type Lang, getLangFromUrl } from "./i18n";

export function useLang() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const lang = useMemo(
    () => getLangFromUrl(searchParams),
    [searchParams]
  );

  const setLang = useCallback(
    (newLang: Lang) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newLang === "en") {
        params.delete("lang");
      } else {
        params.set("lang", newLang);
      }
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [router, pathname, searchParams]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "es" : "en");
  }, [lang, setLang]);

  return { lang, setLang, toggleLang };
}
