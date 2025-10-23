import { getAlpha2ByAlpha3LanguageAt, getAlphaCodeAt } from './utils.js';

/**
 * The locale/language matching algorithm implementation.
 *
 * @param requestedLocale The locale to match.
 * @param supportedLocales The list of supported locales.
 * @returns An index of requested locale in `supportedLocales` or -1 if no locale was matched.
 */
export function matchLocaleOrLanguage(requestedLocale: string, supportedLocales: readonly string[]): number {
  const exactIndex = supportedLocales.indexOf(requestedLocale);

  if (exactIndex !== -1) {
    return exactIndex;
  }

  const requestedLength = requestedLocale.length;

  let initialI = 0;

  while (initialI < requestedLength && getAlphaCodeAt(requestedLocale, initialI) === -1) {
    ++initialI;
  }

  const requestedAlpha2Language = getAlpha2ByAlpha3LanguageAt(requestedLocale, initialI);

  if (requestedAlpha2Language !== undefined) {
    ++initialI;
  }

  let matchAlphaLength = 1 / 0;
  let matchSubtagCount = 1;
  let matchIndex = -1;

  for (let k = 0; k < supportedLocales.length; ++k) {
    const supportedLocale = supportedLocales[k];
    const supportedLength = supportedLocale.length;

    let initialJ = 0;

    while (initialJ < supportedLength && getAlphaCodeAt(supportedLocale, initialJ) === -1) {
      ++initialJ;
    }

    const supportedAlpha2Language = getAlpha2ByAlpha3LanguageAt(supportedLocale, initialJ);

    if (supportedAlpha2Language !== undefined) {
      ++initialJ;
    }

    let i = initialI;
    let j = initialJ;

    let requestedSubtagIndex = -1;
    let supportedSubtagIndex = -1;

    let requestedCharCode = -1;
    let supportedCharCode = -1;

    let isRequestedEnded;
    let isSupportedEnded;

    // The number of alpha characters in supported locale
    let supportedAlphaLength = 0;

    while (true) {
      let isRequestedSubtagSeparated = false;
      let isSupportedSubtagSeparated = false;

      if (i < requestedLength) {
        do {
          if (requestedAlpha2Language !== undefined && i < initialI + 2) {
            requestedCharCode = requestedAlpha2Language.charCodeAt(i - initialI);
          } else {
            requestedCharCode = getAlphaCodeAt(requestedLocale, i);
          }
          isRequestedSubtagSeparated ||= requestedCharCode === -1;
          ++i;
        } while (requestedCharCode === -1 && i < requestedLength);
      } else {
        requestedCharCode = -1;
      }

      if (j < supportedLength) {
        do {
          if (supportedAlpha2Language !== undefined && j < initialJ + 2) {
            supportedCharCode = supportedAlpha2Language.charCodeAt(j - initialJ);
          } else {
            supportedCharCode = getAlphaCodeAt(supportedLocale, j);
          }
          isSupportedSubtagSeparated ||= supportedCharCode === -1;
          ++j;
        } while (supportedCharCode === -1 && j < supportedLength);
      } else {
        supportedCharCode = -1;
      }

      isSupportedEnded = supportedCharCode === -1;
      isRequestedEnded = requestedCharCode === -1;

      if (!isSupportedEnded) {
        ++supportedAlphaLength;
      }

      if (supportedSubtagIndex === -1 || isSupportedSubtagSeparated) {
        ++supportedSubtagIndex;
      }

      if (requestedSubtagIndex === -1 || isRequestedSubtagSeparated) {
        ++requestedSubtagIndex;
      }

      if (supportedSubtagIndex !== requestedSubtagIndex || supportedCharCode !== requestedCharCode) {
        break;
      }
      if (isSupportedEnded && isRequestedEnded) {
        return k;
      }
    }

    // The number of matched subtags
    const requestedSubtagCount = isRequestedEnded ? requestedSubtagIndex + 1 : requestedSubtagIndex;
    const supportedSubtagCount = isSupportedEnded ? supportedSubtagIndex + 1 : supportedSubtagIndex;

    if (requestedSubtagCount === 0 || supportedSubtagCount < matchSubtagCount) {
      continue;
    }

    if (supportedSubtagCount === matchSubtagCount) {
      // The number of subtags is the same, so prefer the shorter locale

      while (j < supportedLength) {
        if (getAlphaCodeAt(supportedLocale, j) !== -1) {
          ++supportedAlphaLength;
        }
        ++j;
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
