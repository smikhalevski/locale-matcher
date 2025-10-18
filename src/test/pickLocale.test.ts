import { expect, test } from 'vitest';
import { pickLocale } from '../main/index.js';

test('matches a locale', () => {
  expect(pickLocale('en', ['en_US', 'en', 'ru'])).toBe('en');
  expect(pickLocale('en_GB', ['en_US', 'en_GB', 'ru'])).toBe('en_GB');
});

test('returns the default locale if no locale matched', () => {
  expect(pickLocale('cz_CZ', ['pt', 'ru'], 'zu')).toBe('zu');
});

test('returns the shortest locale', () => {
  expect(pickLocale(['en_US', 'en_AU'], ['en-AU', 'en-GB', 'en', 'ru'])).toBe('en');
  expect(pickLocale('aaa-bbb-ccc', ['aaa', 'aaa-bbb', 'aaa-ddd'])).toBe('aaa-bbb');
});
