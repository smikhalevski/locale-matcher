import { getAlpha2ByAlpha3LanguageAt, isAlpha2LanguageAt, getAlphaCodeAt } from './utils.js';

/**
 * Returns `true` if a string represents a locale.
 */
export function isLocale(str: string): boolean {
  let index = 0;

  while (index < str.length - 2 && getAlphaCodeAt(str, index) === -1) {
    ++index;
  }

  return isAlpha2LanguageAt(str, index) || getAlpha2ByAlpha3LanguageAt(str, index) !== undefined;
}
