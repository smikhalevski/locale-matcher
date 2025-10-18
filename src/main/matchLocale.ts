import { matchLocaleOrLanguage } from './matchLocaleOrLanguage.js';

/**
 * Looks up a locale among `supportedLocales` that matches a `requestedLocale`.
 *
 * ```ts
 * matchLocale('en-US', ['en-AU', 'en-GB', 'en', 'ru']);
 * // → 2
 *
 * matchLocale(['pt', 'en-US'], ['en-AU', 'en-GB', 'en', 'ru']);
 * // → 2
 * ```
 *
 * @param requestedLocales The locale or the list of locales to match.
 * @param supportedLocales The list of supported locales.
 * @returns An index of locale in `locales` or -1 if no locale matched.
 */
export function matchLocale(requestedLocales: string[] | string, supportedLocales: string[]): number {
  if (typeof requestedLocales === 'string') {
    return matchLocaleOrLanguage(requestedLocales, supportedLocales);
  }

  let localeIndex = -1;
  let locale;

  for (const requestedLocale of requestedLocales) {
    const nextLocaleIndex = matchLocaleOrLanguage(requestedLocale, supportedLocales);

    if (nextLocaleIndex === -1) {
      continue;
    }

    const nextLocale = supportedLocales[nextLocaleIndex];

    if (locale === undefined || locale.length < nextLocale.length) {
      locale = nextLocale;
      localeIndex = nextLocaleIndex;
    }
  }

  return localeIndex;
}
