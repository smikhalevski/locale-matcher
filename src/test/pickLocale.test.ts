import {pickLocale} from '../main';

describe('pickLocale', () => {

  test('matches a locale', () => {
    expect(pickLocale('en', ['en_US', 'en', 'ru'])).toBe('en');
    expect(pickLocale('en_GB', ['en_US', 'en_GB', 'ru'])).toBe('en_GB');
  });

  test('returns the default locale if no locale matched', () => {
    expect(pickLocale('cz_CZ', ['pt', 'ru'], 'zu')).toBe('zu');
  });
});
