import {lowerCharCodeAt} from './lowerCharCodeAt';

/**
 * The locale/language matching algorithm implementation.
 *
 * @param requestedLocale The locale to match.
 * @param supportedLocales The list of supported locales.
 * @returns An index of locale in `locales` or -1 if no locale matched.
 */
export function matchLocaleOrLanguage(requestedLocale: string, supportedLocales: Array<string>): number {
  const requestedLength = requestedLocale.length;

  let languageOnlyIndex = -1;
  let languageBaseIndex = -1;

  for (let k = 0; k < supportedLocales.length; ++k) {

    const supportedLocale = supportedLocales[k];
    const supportedLength = supportedLocale.length;

    let i = 0;
    let j = 0;

    let supportedSubtagIndex = -1;
    let requestedSubtagIndex = -1;

    let supportedCharCode = -1;
    let requestedCharCode = -1;

    let supportedEnded;
    let requestedEnded;

    while (true) {

      let supportedSubtagSeparated = false;
      let requestedSubtagSeparated = false;

      if (i < supportedLength) {
        do {
          supportedCharCode = lowerCharCodeAt(supportedLocale, i);
          supportedSubtagSeparated ||= supportedCharCode === -1;
          ++i;
        } while (supportedCharCode === -1 && i < supportedLength);
      } else {
        supportedCharCode = -1;
      }

      if (j < requestedLength) {
        do {
          requestedCharCode = lowerCharCodeAt(requestedLocale, j);
          requestedSubtagSeparated ||= requestedCharCode === -1;
          ++j;
        } while (requestedCharCode === -1 && j < requestedLength);
      } else {
        requestedCharCode = -1;
      }

      supportedEnded = supportedCharCode === -1;
      requestedEnded = requestedCharCode === -1;

      if (supportedSubtagIndex === -1 || supportedSubtagSeparated) {
        ++supportedSubtagIndex;
      }

      if (requestedSubtagIndex === -1 || requestedSubtagSeparated) {
        ++requestedSubtagIndex;
      }

      if (supportedSubtagIndex !== requestedSubtagIndex || supportedCharCode !== requestedCharCode) {
        break;
      }
      if (supportedEnded && requestedEnded) {
        return k;
      }
    }

    if (requestedSubtagIndex > 0 || requestedEnded) {
      if (supportedSubtagIndex === 0 && supportedEnded && languageOnlyIndex === -1) {
        languageOnlyIndex = k;
      }
      if (supportedSubtagIndex > 0 && languageBaseIndex === -1) {
        languageBaseIndex = k;
      }
    }
  }

  return languageOnlyIndex !== -1 ? languageOnlyIndex : languageBaseIndex;
}
