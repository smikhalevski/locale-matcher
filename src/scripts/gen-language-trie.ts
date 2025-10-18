import fs from 'node:fs';
import path from 'node:path';
import languages from './languages.json' with { type: 'json' };
import { lowerCharCodeAt } from '../main/lowerCharCodeAt.ts';

const outDir = path.resolve(import.meta.dirname, '../main/gen');

fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'languages-trie.ts'), genLanguageTrie(languages));

function genLanguageTrie(languages: Record<string, string>): string {
  const keys = Object.keys(languages);

  const visitedKeys0 = new Map<number, string>();
  const visitedKeys1 = new Map<number, string>();
  const visitedKeys2 = new Map<number, string>();

  let str0 = '';

  for (let i = 0; i < keys.length; ++i) {
    const charCode0 = lowerCharCodeAt(keys[i], 0);

    if (visitedKeys0.has(charCode0)) {
      continue;
    }

    visitedKeys0.set(charCode0, languages[keys[i]]);
    visitedKeys1.clear();

    str0 += 'charCode0===' + (charCode0 - /* a */ 97);

    let str1 = '';

    for (let i = 0; i < keys.length; ++i) {
      const charCode1 = lowerCharCodeAt(keys[i], 1);

      if (lowerCharCodeAt(keys[i], 0) !== charCode0 || visitedKeys1.has(charCode1)) {
        continue;
      }

      visitedKeys1.set(charCode1, languages[keys[i]]);
      visitedKeys2.clear();

      str1 += 'charCode1===' + (charCode1 - /* a */ 97);

      let str2 = '';

      for (let i = 0; i < keys.length; ++i) {
        const charCode2 = lowerCharCodeAt(keys[i], 2);

        if (lowerCharCodeAt(keys[i], 0) !== charCode0 || lowerCharCodeAt(keys[i], 1) !== charCode1) {
          continue;
        }

        visitedKeys2.set(charCode2, languages[keys[i]]);

        str2 += 'charCode2===' + (charCode2 - /* a */ 97) + '?' + JSON.stringify(languages[keys[i]]) + ':';
      }

      if (visitedKeys2.size === 1) {
        const [charCode2, language] = visitedKeys2.entries().next().value!;
        str1 += '&&charCode2===' + (charCode2 - /* a */ 97) + '?' + JSON.stringify(language) + ':';
      } else {
        str2 += 'null:';
        str1 += '?' + str2;
      }
    }

    str1 += 'null:';

    str0 += '?' + str1;
  }

  str0 += 'null';

  return `import { lowerCharCodeAt } from '../lowerCharCodeAt.js';

export default function searchISO6391Language(str: string, offset: number): string | null {
  if (str.length < offset + 3 || (str.length > offset + 3 && lowerCharCodeAt(str, offset + 3) !== -1)) {
    return null;
  }

  const charCode0 = lowerCharCodeAt(str, offset) - /* a */ 97;
  const charCode1 = lowerCharCodeAt(str, offset + 1) - /* a */ 97;
  const charCode2 = lowerCharCodeAt(str, offset + 2) - /* a */ 97;
  
  if (charCode0 < 0 || charCode1 < 0 || charCode2 < 0) {
    return null;
  }
  
  return ${str0};
}`;
}
