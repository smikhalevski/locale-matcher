import {CharCode} from './CharCode';

/**
 * Returns the char code at `index` in `str`. If char isn't an alpha-ASCII than -1 is returned.
 */
export function lowerCharCodeAt(str: string, index: number): number {
  const charCode = str.charCodeAt(index);

  if (charCode >= CharCode['A'] && charCode <= CharCode['Z']) {
    return charCode - CharCode['A'] + CharCode['a'];
  }
  if (charCode >= CharCode['a'] && charCode <= CharCode['z']) {
    return charCode;
  }

  // Non-alpha-ASCII chars
  return -1;
}
