const chalk = require('chalk');
const {test} = require('@smikhalevski/perf-test');
const {match: formatjsMatch} = require('@formatjs/intl-localematcher');
const {pickLocale} = require('../../lib/index-cjs');

const requestedLocalesIso6391 = ['ru-RU'];
const requestedLocalesIso6392 = ['rus-RU'];
const supportedLocales = ['en-GB', 'ru', 'cz', 'ru-RU'];

console.log(chalk.bold.inverse(' ISO 639-1 ') + '\n');

test('locale-matcher              ', () => pickLocale(requestedLocalesIso6391, supportedLocales), {timeout: 10000});
test('@formatjs/intl-localematcher', () => formatjsMatch(requestedLocalesIso6391, supportedLocales), {timeout: 10000});

console.log('\n\n' + chalk.bold.inverse(' ISO 639-2 ') + '\n');

test('locale-matcher              ', () => pickLocale(requestedLocalesIso6392, supportedLocales), {timeout: 10000});
test('@formatjs/intl-localematcher', () => formatjsMatch(requestedLocalesIso6392, supportedLocales), {timeout: 10000});
