// Internationalization utilities for rebundle-tools

export type Lang = "en" | "es";

// Type for colocated translations - enforces both languages
export type Localized<T> = {
  en: T;
  es: T;
};

// Helper to create localized content with type safety
export function localized<T>(en: T, es: T): Localized<T> {
  return { en, es };
}

// Get localized value
export function t<T>(content: Localized<T>, lang: Lang): T {
  return content[lang];
}

// Parse language from URL search params
export function getLangFromUrl(searchParams: URLSearchParams): Lang {
  const lang = searchParams.get("lang");
  if (lang === "es") return "es";
  return "en"; // Default to English
}

// Build URL with language param
export function buildLangUrl(lang: Lang, currentPath: string = "/"): string {
  if (lang === "en") {
    // Default language - no param needed
    return currentPath;
  }
  const separator = currentPath.includes("?") ? "&" : "?";
  return `${currentPath}${separator}lang=${lang}`;
}
