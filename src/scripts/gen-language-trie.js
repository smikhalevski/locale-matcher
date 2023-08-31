const fs = require('fs');
const path = require('path');
const languages = require('./languages.json');
const { createTrie, setValue } = require('@smikhalevski/trie');

const languagesTrie = createTrie();

for (const [iso639x, iso6391] of Object.entries(languages)) {
  setValue(languagesTrie, iso639x, iso6391);
}

function genTrieSrc(trie, index) {
  let src = '';

  for (let charCode in trie) {
    if ((charCode = +charCode) === charCode) {
      src += `c${index}===${charCode}?${genTrieSrc(trie[charCode], index + 1)}:`;
    }
  }

  if (trie.isLeaf) {
    if (trie.leafCharCodes) {
      src +=
        trie.leafCharCodes.map((charCode, offset) => `c${index + offset}===${charCode}`).join('&&') +
        `?'${trie.value}':0`;
    } else {
      src += `'${trie.value}'`;
    }
  } else {
    src += '0';
  }

  return src;
}

const src = `import { lowerCharCodeAt } from '../lowerCharCodeAt';
export default function(str: string, offset: number): string | 0 {
  const c0 = lowerCharCodeAt(str, offset);
  const c1 = lowerCharCodeAt(str, offset + 1);
  const c2 = lowerCharCodeAt(str, offset + 2);
  return ${genTrieSrc(languagesTrie, 0)};
}`;

const dir = path.resolve(__dirname, '../main/gen');

fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'languages-trie.ts'), src);
