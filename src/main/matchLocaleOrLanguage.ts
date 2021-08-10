import {lowerCharCodeAt} from './lowerCharCodeAt';
import {searchTrie} from '@smikhalevski/trie';
import {languageTrieNode} from './languageTrieNode';

/**
 * The locale/language matching algorithm implementation.
 *
 * @param requestedLocale The locale to match.
 * @param supportedLocales The list of supported locales.
 * @returns An index of locale in `locales` or -1 if no locale matched.
 */
export function matchLocaleOrLanguage(requestedLocale: string, supportedLocales: Array<string>): number {
  const requestedLength = requestedLocale.length;

  let initialI = 0;

  while (initialI < requestedLength && lowerCharCodeAt(requestedLocale, initialI) === -1) {
    ++initialI;
  }

  const requestedIso6391Language = searchIso6391Language(requestedLocale, initialI);

  if (requestedIso6391Language != null) {
    ++initialI;
  }

  let matchAlphaLength = 1 / 0;
  let matchSubtagCount = 1;
  let matchIndex = -1;

  for (let k = 0; k < supportedLocales.length; ++k) {

    const supportedLocale = supportedLocales[k];
    const supportedLength = supportedLocale.length;

    let initialJ = 0;

    while (initialJ < supportedLength && lowerCharCodeAt(supportedLocale, initialJ) === -1) {
      ++initialJ;
    }

    const supportedIso6391Language = searchIso6391Language(supportedLocale, initialJ);

    if (supportedIso6391Language != null) {
      ++initialJ;
    }

    let i = initialI;
    let j = initialJ;

    let requestedSubtagIndex = -1;
    let supportedSubtagIndex = -1;

    let requestedCharCode = -1;
    let supportedCharCode = -1;

    let requestedEnded;
    let supportedEnded;

    // The number of alpha characters in supported locale
    let supportedAlphaLength = 0;

    while (true) {

      let requestedSubtagSeparated = false;
      let supportedSubtagSeparated = false;

      if (i < requestedLength) {
        do {
          if (requestedIso6391Language != null && i < initialI + 2) {
            requestedCharCode = requestedIso6391Language.charCodeAt(i - initialI);
          } else {
            requestedCharCode = lowerCharCodeAt(requestedLocale, i);
          }
          requestedSubtagSeparated ||= requestedCharCode === -1;
          ++i;
        } while (requestedCharCode === -1 && i < requestedLength);
      } else {
        requestedCharCode = -1;
      }

      if (j < supportedLength) {
        do {
          if (supportedIso6391Language != null && j < initialJ + 2) {
            supportedCharCode = supportedIso6391Language.charCodeAt(j - initialJ);
          } else {
            supportedCharCode = lowerCharCodeAt(supportedLocale, j);
          }
          supportedSubtagSeparated ||= supportedCharCode === -1;
          ++j;
        } while (supportedCharCode === -1 && j < supportedLength);
      } else {
        supportedCharCode = -1;
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

      while (j < supportedLength) {
        if (lowerCharCodeAt(supportedLocale, j) !== -1) {
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

function searchIso6391Language(locale: string, offset: number): string | undefined {
  const localeLength = locale.length;
  const languageEnd = offset + 3;

  if (localeLength < languageEnd || lowerCharCodeAt(locale, languageEnd - 1) === -1) {
    return;
  }

  const node = searchTrie(languageTrieNode, locale, offset, lowerCharCodeAt);

  if (node != null && (locale.length === languageEnd || lowerCharCodeAt(locale, languageEnd) === -1)) {
    return node.value;
  }
}
