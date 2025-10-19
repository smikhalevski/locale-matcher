import { getAlphaCodeAt } from './utils.js';

const fromCharCode = String.fromCharCode;

export function normalizeLocale(locale: string, subtagSeparator = '-'): string {
  let normalizedLocale = '';
  let lastCharCode = -1;

  for (let i = 0; i < locale.length; ++i) {
    const charCode = getAlphaCodeAt(locale, i);

    if (charCode === -1) {
      lastCharCode = charCode;
      continue;
    }

    if (lastCharCode === -1 && normalizedLocale.length !== 0) {
      normalizedLocale += subtagSeparator;
    }

    normalizedLocale += fromCharCode(charCode);
    lastCharCode = charCode;
  }

  return normalizedLocale;
}
