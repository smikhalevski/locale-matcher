import { lowerCharCodeAt } from './lowerCharCodeAt.js';

const fromCharCode = String.fromCharCode;

export function normalizeLocale(locale: string, subtagSeparator = '-'): string {
  let normalizedLocale = '';
  let lastCharCode = -1;

  for (let i = 0; i < locale.length; ++i) {
    const charCode = lowerCharCodeAt(locale, i);

    if (charCode !== -1) {
      if (lastCharCode === -1 && normalizedLocale.length !== 0) {
        normalizedLocale += subtagSeparator;
      }
      normalizedLocale += fromCharCode(charCode);
    }
    lastCharCode = charCode;
  }

  return normalizedLocale;
}
