/**
 * Returns the ASCII-alpha char code at `index` in `str`. If char isn't an ASCII-alpha than -1 is returned.
 */
export function getLowerCaseCharCodeAt(str: string, index: number): number {
  const charCode = str.charCodeAt(index);

  if (charCode >= 65 /*A*/ && charCode <= 90 /*Z*/) {
    return charCode - 65 /*A*/ + 97 /*a*/;
  }
  if (charCode >= 97 /*a*/ && charCode <= 122 /*z*/) {
    return charCode;
  }

  // Non-alpha-ASCII chars
  return -1;
}
