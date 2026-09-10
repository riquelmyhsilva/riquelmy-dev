import { ui, defaultLang, type Language, type UIKey } from './ui';

/**
 * Extract current language ('pt' | 'en') from a URL or pathname.
 */
export function getLangFromUrl(url: URL | string): Language {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] === 'en') {
    return 'en';
  }
  return 'pt';
}

/**
 * Get translation function for the given language.
 */
export function useTranslations(lang: Language) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
  };
}

/**
 * Convert any pathname to its equivalent in the target language.
 * Examples:
 * - getLocalizedPath('/', 'en') => '/en'
 * - getLocalizedPath('/about', 'en') => '/en/about'
 * - getLocalizedPath('/blog/my-slug', 'en') => '/en/blog/my-slug'
 * - getLocalizedPath('/en', 'pt') => '/'
 * - getLocalizedPath('/en/about', 'pt') => '/about'
 * - getLocalizedPath('/en/blog/my-slug', 'pt') => '/blog/my-slug'
 */
export function getLocalizedPath(pathname: string, targetLang: Language): string {
  // Normalize pathname to remove trailing slashes except for root '/'
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const isEn = cleanPath === '/en' || cleanPath.startsWith('/en/');

  if (targetLang === 'en') {
    if (isEn) return cleanPath || '/en';
    if (cleanPath === '/' || cleanPath === '') return '/en';
    return `/en${cleanPath}`;
  }

  // targetLang is 'pt' (default without prefix)
  if (!isEn) return cleanPath || '/';
  if (cleanPath === '/en') return '/';
  return cleanPath.replace(/^\/en/, '') || '/';
}

/**
 * Format a Date object to a human-readable localized string.
 * Example (PT): "19 de maio de 2026"
 * Example (EN): "May 19, 2026"
 */
export function formatLocalizedDate(date: Date, lang: Language = 'pt'): string {
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate estimated reading time localized by language.
 */
export function getLocalizedReadingTime(content: string, lang: Language = 'pt'): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const suffix = lang === 'pt' ? 'min de leitura' : 'min read';
  return `${minutes} ${suffix}`;
}
