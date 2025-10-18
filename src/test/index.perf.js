import { describe, test, measure } from 'toofast';
import * as formatjs from '@formatjs/intl-localematcher';
import * as localeMatcher from '../../lib/index.js';

const requestedLocalesISO6391 = ['ru-RU'];
const requestedLocalesISO6392 = ['rus-RU'];
const supportedLocales = ['en-GB', 'ru', 'cz', 'ru-RU'];

describe('ISO 639-1', () => {
  test('@formatjs/intl-localematcher', () => {
    measure(() => {
      formatjs.match(requestedLocalesISO6391, supportedLocales, 'ru');
    });
  });

  test('locale-matcher', () => {
    measure(() => {
      localeMatcher.pickLocale(requestedLocalesISO6391, supportedLocales);
    });
  });
});

describe('ISO 639-2', () => {
  test('@formatjs/intl-localematcher', () => {
    measure(() => {
      formatjs.match(requestedLocalesISO6392, supportedLocales, 'ru');
    });
  });

  test('locale-matcher', () => {
    measure(() => {
      localeMatcher.pickLocale(requestedLocalesISO6392, supportedLocales);
    });
  });
});
