/**
 * Returns the ASCII-alpha char code at `index` in `str`. If char isn't an ASCII-alpha than -1 is returned.
 */
export function lowerCharCodeAt(str: string, index: number): number {
  const charCode = str.charCodeAt(index);

  if (charCode >= /* A */ 65 && charCode <= /* Z */ 90) {
    return charCode - /* A */ 65 + /* a */ 97;
  }
  if (charCode >= /* a */ 97 && charCode <= /* z */ 122) {
    return charCode;
  }

  // Non-alpha-ASCII chars
  return -1;
}
