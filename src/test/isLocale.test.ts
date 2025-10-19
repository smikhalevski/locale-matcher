import { expect, test } from 'vitest';
import { isLocale } from '../main/index.js';

test('returns true if string start with a language code', () => {
  expect(isLocale('xx')).toBe(false);
  expect(isLocale('xx-')).toBe(false);
  expect(isLocale('en')).toBe(true);
  expect(isLocale('enx')).toBe(false);
  expect(isLocale('en-')).toBe(true);
  expect(isLocale('en-US')).toBe(true);
  expect(isLocale('+++en')).toBe(true);
  expect(isLocale('+++en+++')).toBe(true);
  expect(isLocale('rus')).toBe(true);
  expect(isLocale('rusx')).toBe(false);
  expect(isLocale('rus-')).toBe(true);
  expect(isLocale('rus-US')).toBe(true);
  expect(isLocale('+++rus')).toBe(true);
  expect(isLocale('+++rus+++')).toBe(true);
});
