import {matchLocale} from '../main/matchLocale';

describe('matchLocale', () => {

  test('matches exact locale', () => {
    expect(matchLocale('en', ['en_US', 'en', 'ru'])).toBe(1);
    expect(matchLocale('en_GB', ['en_US', 'en_GB', 'ru'])).toBe(1);
  });

  test('matches exact locale case-insensitive', () => {
    expect(matchLocale('EN', ['en_US', 'en', 'ru'])).toBe(1);
    expect(matchLocale('EN_GB', ['en-us', 'en-gb', 'ru'])).toBe(1);
  });

  test('matches exact locale', () => {
    expect(matchLocale('en', ['en_US', 'en', 'ru'])).toBe(1);
    expect(matchLocale('en_GB', ['en_US', 'en_GB', 'ru'])).toBe(1);
  });

  test('matches language-only locale first', () => {
    expect(matchLocale('en_US', ['en_AU', 'en_GB', 'en', 'ru'])).toBe(2);
  });

  test('matches first locale with the same language', () => {
    expect(matchLocale('en_US', ['pt', 'en_AU', 'en_GB', 'en_IN', 'ru'])).toBe(1);
  });

  test('returns -1 if no locale matched', () => {
    expect(matchLocale('cz_CZ', ['pt', 'ru'])).toBe(-1);
  });

  test('matches multiple locales', () => {
    expect(matchLocale(['en_GB', 'ru'], ['pt', 'ru'])).toBe(1);
    expect(matchLocale(['en_GB', 'ru_RU'], ['pt', 'en', 'ru'])).toBe(1);
  });

  test('matches case insensitive', () => {
    expect(matchLocale('EN', ['ru', 'en'])).toBe(1);
  });
});
