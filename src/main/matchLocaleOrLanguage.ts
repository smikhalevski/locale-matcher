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

  let matchAlphaLength = 1 / 0;
  let matchSubtagCount = 1;
  let matchIndex = -1;

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

    // The number of alpha characters in supported locale
    let supportedAlphaLength = 0;

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

      if (!supportedEnded) {
        ++supportedAlphaLength;
      }

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

    // The number of matched subtags
    const requestedSubtagCount = requestedEnded ? requestedSubtagIndex + 1 : requestedSubtagIndex;
    const supportedSubtagCount = supportedEnded ? supportedSubtagIndex + 1 : supportedSubtagIndex;

    if (requestedSubtagCount === 0 || supportedSubtagCount < matchSubtagCount) {
      continue;
    }

    if (supportedSubtagCount === matchSubtagCount) {
      // The same number of subtags is the same, so prefer the shorter locale

      while (i < supportedLength) {
        if (lowerCharCodeAt(supportedLocale, i) !== -1) {
          ++supportedAlphaLength;
        }
        ++i;
      }

      if (supportedAlphaLength >= matchAlphaLength) {
        continue;
      }
    }

    matchAlphaLength = supportedAlphaLength;
    matchSubtagCount = supportedSubtagCount;
    matchIndex = k;
  }

  return matchIndex;
}
