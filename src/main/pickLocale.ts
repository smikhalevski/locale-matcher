import {matchLocale} from './matchLocale';

/**
 * Returns a locale from `supportedLocales` that matches `requestedLocale` or `undefined` if no locales matched.
 */
export function pickLocale(requestedLocale: Array<string> | string, supportedLocales: Array<string>): string | undefined;

/**
 * Returns a locale from `supportedLocales` that matches `requestedLocale` or `defaultLocale`.
 */
export function pickLocale(requestedLocale: Array<string> | string, supportedLocales: Array<string>, defaultLocale: string): string;

export function pickLocale(requestedLocale: Array<string> | string, supportedLocales: Array<string>, defaultLocale?: string) {
  const index = matchLocale(requestedLocale, supportedLocales);
  return index !== -1 ? supportedLocales[index] : defaultLocale;
}
