import {CharCode} from './CharCode';

/**
 * The locale/language matching algorithm:
 * 1. Lookup exact locale in `supportedLocales` (`en_GB` → `en_GB`);
 * 2. Lookup a language-only locale in `supportedLocales` (`en_GB` → `en`);
 * 3. Lookup the first locale in `supportedLocales` with the same language as `requestedLocale` (`en_GB` → `en_US`);
 * 4. Return -1.
 *
 * [Matching is case-insensitive](https://tools.ietf.org/search/bcp47#section-2.1.1) so `mn-Cyrl-MN` is not distinct
 * from `MN-cYRL-mn` or `mN-cYrL-Mn`.
 *
 * The locale must start with [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). Some
 * examples of valid locales: `en`, `en_US`, `en-US`, `en-us` and `en_US.UTF-8`.
 *
 * ```ts
 * matchLocaleOrLanguage('en_US', ['en_AU', 'en_GB', 'en', 'ru']); // → 2
 * ```
 *
 * @param requestedLocale The locale to match.
 * @param supportedLocales The list of supported locales.
 * @returns An index of locale in `locales` or -1 if no locale matched.
 */
export function matchLocaleOrLanguage(requestedLocale: string, supportedLocales: Array<string>): number {
  const requestedLastIndex = requestedLocale.length - 1;

  let languageOnlyIndex = -1;
  let languageBaseIndex = -1;

  for (let i = 0; i < supportedLocales.length; ++i) {

    const supportedLocale = supportedLocales[i];
    const supportedLastIndex = supportedLocale.length - 1;

    for (let j = 0; j <= supportedLastIndex && j <= requestedLastIndex; ++j) {
      if (lowerCharCodeAt(supportedLocale, j) !== lowerCharCodeAt(requestedLocale, j)) {
        break;
      }
      if (j === supportedLastIndex && j === requestedLastIndex) {
        return i;
      }
      if (j !== 1) {
        continue;
      }
      if (languageBaseIndex === -1) {
        languageBaseIndex = i;
      }
      if (languageOnlyIndex === -1 && supportedLastIndex === 1) {
        languageOnlyIndex = i;
        break;
      }
    }
  }
  return languageOnlyIndex !== -1 ? languageOnlyIndex : languageBaseIndex;
}

function lowerCharCodeAt(str: string, index: number): number {
  const charCode = str.charCodeAt(index);

  if (charCode >= CharCode['A'] && charCode <= CharCode['Z']) {
    return charCode - CharCode['A'] + CharCode['a'];
  }
  if (charCode >= CharCode['a'] && charCode <= CharCode['z']) {
    return charCode;
  }

  // Ignored non-alpha-ASCII chars
  return -1;
}
