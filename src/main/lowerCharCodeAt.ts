import {CharCode} from './CharCode';

/**
 * Returns the ASCII-alpha char code at `offset` in `input`. If char isn't an ASCII-alpha than -1 is returned.
 */
export function lowerCharCodeAt(input: string, offset: number): number {
  const charCode = input.charCodeAt(offset);

  if (charCode >= CharCode['A'] && charCode <= CharCode['Z']) {
    return charCode - CharCode['A'] + CharCode['a'];
  }
  if (charCode >= CharCode['a'] && charCode <= CharCode['z']) {
    return charCode;
  }

  // Non-alpha-ASCII chars
  return -1;
}
