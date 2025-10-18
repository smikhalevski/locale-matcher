import { expect, test } from 'vitest';
import { normalizeLocale } from '../main/index.js';

test('normalizes locale', () => {
  expect(normalizeLocale('__HE/il-u-ca-hebrew+tz/jeruslm**')).toBe('he-il-u-ca-hebrew-tz-jeruslm');
});

test('strips leading separators', () => {
  expect(normalizeLocale('__en')).toBe('en');
});

test('strips trailing separators', () => {
  expect(normalizeLocale('en__')).toBe('en');
});

test('replaces consequent separators with a single separator', () => {
  expect(normalizeLocale('en__US')).toBe('en-us');
  expect(normalizeLocale('__en__US')).toBe('en-us');
  expect(normalizeLocale('en__US__')).toBe('en-us');
});
