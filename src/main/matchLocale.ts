import { matchLocaleOrLanguage } from './matchLocaleOrLanguage.js';
import { getAlphaCodeAt } from './utils.js';

/**
 * Looks up a locale among `supportedLocales` that matches a requested locale.
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
 * @returns An index of a requested locale in `supportedLocales` or -1 if no locale was matched.
 */
export function matchLocale(requestedLocales: readonly string[] | string, supportedLocales: readonly string[]): number {
  if (typeof requestedLocales === 'string') {
    return matchLocaleOrLanguage(requestedLocales, supportedLocales);
  }

  let prevIndex = -1;
  let prevLocale;
  let prevSubtagCount = 0;

  for (let i = 0; i < requestedLocales.length; ++i) {
    const nextIndex = matchLocaleOrLanguage(requestedLocales[i], supportedLocales);

    if (nextIndex === -1) {
      continue;
    }

    const nextLocale = supportedLocales[nextIndex];

    let nextSubtagCount = 0;

    if (
      prevLocale === undefined ||
      (prevSubtagCount ||= getSubtagCount(prevLocale)) < (nextSubtagCount = getSubtagCount(nextLocale))
    ) {
      prevIndex = nextIndex;
      prevLocale = nextLocale;
      prevSubtagCount = nextSubtagCount;
    }
  }

  return prevIndex;
}

export function getSubtagCount(locale: string): number {
  let count = 0;

  for (let i = 0, prevCharCode = -1, nextCharCode; i < locale.length; ++i, prevCharCode = nextCharCode) {
    nextCharCode = getAlphaCodeAt(locale, i);

    if (prevCharCode === -1 && nextCharCode !== -1) {
      ++count;
    }
  }

  return count;
}
