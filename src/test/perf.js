const {test} = require('@smikhalevski/perf-test');
const {match: formatjsMatch} = require('@formatjs/intl-localematcher');
const {pickLocale} = require('../../lib/index-cjs');

const requestedLocales = ['ru-RU'];
const supportedLocales = ['en-GB', 'ru', 'cz', 'ru-RU'];

test('locale-matcher              ', () => pickLocale(requestedLocales, supportedLocales), {timeout: 10000});
test('@formatjs/intl-localematcher', () => formatjsMatch(requestedLocales, supportedLocales), {timeout: 10000});
