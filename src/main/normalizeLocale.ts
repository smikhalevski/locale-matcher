import {lowerCharCodeAt} from './lowerCharCodeAt';

const SUBTAG_SEPARATOR = '-';

export function normalizeLocale(locale: string): string {

  let normalizedLocale = '';
  let lastCharCode = -1;

  for (let i = 0; i < locale.length; ++i) {
    const charCode = lowerCharCodeAt(locale, i);

    if (charCode !== -1) {
      if (lastCharCode === -1 && normalizedLocale.length !== 0) {
        normalizedLocale += SUBTAG_SEPARATOR;
      }
      normalizedLocale += String.fromCharCode(charCode);
    }
    lastCharCode = charCode;
  }

  return normalizedLocale;
}
