const fs = require('fs');
const path = require('path');
const languages = require('./languages.json');
const { arrayTrieEncode, trieCreate, trieSet } = require('@smikhalevski/trie');

const languagesTrie = trieCreate();

for (const [iso639x, iso6391] of Object.entries(languages)) {
  trieSet(languagesTrie, iso639x, iso6391);
}

const dir = path.resolve(__dirname, '../main/gen');

fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'languages-trie.ts'), 'export default ' + JSON.stringify(arrayTrieEncode(languagesTrie)));
