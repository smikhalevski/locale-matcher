import { describe, test, measure } from 'toofast';
import * as formatjs from '@formatjs/intl-localematcher';
import * as localeMatcher from '../../lib/index.js';

const requestedAlpha2Locales = ['ru-RU'];
const requestedAlpha3Locales = ['rus-RU'];
const supportedLocales = ['en-GB', 'ru', 'cz', 'ru-RU'];

describe('ISO 639-1 (alpha2)', () => {
  test('@formatjs/intl-localematcher', () => {
    measure(() => {
      formatjs.match(requestedAlpha2Locales, supportedLocales, 'ru');
    });
  });

  test('locale-matcher', () => {
    measure(() => {
      localeMatcher.pickLocale(requestedAlpha2Locales, supportedLocales);
    });
  });
});

describe('ISO 639-2 (alpha3)', () => {
  test('@formatjs/intl-localematcher', () => {
    measure(() => {
      formatjs.match(requestedAlpha3Locales, supportedLocales, 'ru');
    });
  });

  test('locale-matcher', () => {
    measure(() => {
      localeMatcher.pickLocale(requestedAlpha3Locales, supportedLocales);
    });
  });
});
