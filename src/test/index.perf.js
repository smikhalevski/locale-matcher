const { match } = require('@formatjs/intl-localematcher');
const { pickLocale } = require('../../lib');

const requestedLocalesISO6391 = ['ru-RU'];
const requestedLocalesISO6392 = ['rus-RU'];
const supportedLocales = ['en-GB', 'ru', 'cz', 'ru-RU'];

describe('ISO 639-1', () => {
  test('intl-localematcher', measure => {
    measure(() => {
      match(requestedLocalesISO6391, supportedLocales, 'ru');
    });
  });

  test('locale-matcher', measure => {
    measure(() => {
      pickLocale(requestedLocalesISO6391, supportedLocales);
    });
  });
});

describe('ISO 639-2', () => {
  test('intl-localematcher', measure => {
    measure(() => {
      match(requestedLocalesISO6392, supportedLocales, 'ru');
    });
  });

  test('locale-matcher', measure => {
    measure(() => {
      pickLocale(requestedLocalesISO6392, supportedLocales);
    });
  });
});
