const fs = require('fs');
const path = require('path');
const languages = require('./languages.json');
const { createTrie, setValue } = require('@smikhalevski/trie');

const trie = createTrie();

for (const [iso639x, iso6391] of Object.entries(languages)) {
  setValue(trie, iso639x, iso6391);
}

function genTrieSrc(node, index) {
  let src = '';

  for (let charCode in node) {
    if ((charCode = +charCode) === charCode) {
      src += `c${index}===${charCode}?${genTrieSrc(node[charCode], index + 1)}:`;
    }
  }

  if (node.isLeaf) {
    if (node.leafCharCodes) {
      src +=
        node.leafCharCodes.map((charCode, offset) => `c${index + offset}===${charCode}`).join('&&') +
        `?'${node.value}':0`;
    } else {
      src += `'${node.value}'`;
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
  return ${genTrieSrc(trie, 0)};
}`;

const dir = path.resolve(__dirname, '../main/gen');

fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'languages-trie.ts'), src);
