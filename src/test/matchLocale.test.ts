import { expect, test } from 'vitest';
import { matchLocale } from '../main/index.js';
import { getSubtagCount } from '../main/matchLocale.js';

test('matches ISO 639-2', () => {
  expect(matchLocale('rus', ['ru'])).toBe(0);
  expect(matchLocale('rus', ['rus'])).toBe(0);
  expect(matchLocale('ru', ['rus'])).toBe(0);

  expect(matchLocale('rus', ['RU'])).toBe(0);
  expect(matchLocale('rus', ['RUS'])).toBe(0);
  expect(matchLocale('ru', ['RUS'])).toBe(0);

  expect(matchLocale('RUS', ['ru'])).toBe(0);
  expect(matchLocale('RUS', ['rus'])).toBe(0);
  expect(matchLocale('RU', ['rus'])).toBe(0);

  expect(matchLocale('+++rus', ['ru+++'])).toBe(0);
  expect(matchLocale('+++rus', ['rus+++'])).toBe(0);
  expect(matchLocale('+++ru', ['rus+++'])).toBe(0);

  expect(matchLocale('rus-RU', ['ru-RU'])).toBe(0);
  expect(matchLocale('rus-RU', ['rus-RU'])).toBe(0);
  expect(matchLocale('ru-RU', ['rus-RU'])).toBe(0);

  expect(matchLocale('rus', ['ru-RU'])).toBe(0);
  expect(matchLocale('rus', ['rus-RU'])).toBe(0);
  expect(matchLocale('ru', ['rus-RU'])).toBe(0);

  expect(matchLocale('rus', ['ru-RU', 'rus'])).toBe(1);
  expect(matchLocale('rus', ['rus-RU', 'rus'])).toBe(1);
  expect(matchLocale('ru', ['rus-RU', 'rus'])).toBe(1);

  expect(matchLocale('rus-RU', ['ru'])).toBe(0);
  expect(matchLocale('rus-RU', ['rus'])).toBe(0);
  expect(matchLocale('ru-RU', ['rus'])).toBe(0);

  expect(matchLocale('chi', ['zh'])).toBe(0);
  expect(matchLocale('zh', ['chi'])).toBe(0);
});

test('matches exact locale with ISO 639-1 language code', () => {
  expect(matchLocale('en', ['en_US', 'en', 'ru'])).toBe(1);
  expect(matchLocale('en_GB', ['en_US', 'en', 'en_GB', 'ru'])).toBe(2);
});

test('matches exact locale with ISO 639-2 language code', () => {
  expect(matchLocale('cau', ['cau_US', 'cau', 'nah'])).toBe(1);
  expect(matchLocale('cau_GB', ['cau_US', 'cau', 'cau_GB', 'nah'])).toBe(2);
});

test('matches exact locale case-insensitive', () => {
  expect(matchLocale('EN', ['en_US', 'en', 'ru'])).toBe(1);
  expect(matchLocale('EN_GB', ['en-us', 'en-gb', 'ru'])).toBe(1);
});

test('matches shorter locale', () => {
  expect(matchLocale('en_US', ['en_AU', 'en_GB', 'en', 'ru'])).toBe(2);
  expect(matchLocale('en_US', ['pt', 'en_AU', 'en_GB', 'en_IN', 'ru'])).toBe(1);
  expect(matchLocale('ll-aaa-bbb', ['ll', 'll-aaa', 'll-aaa-ccc'])).toBe(1);
  expect(matchLocale('ll-aaa-bbb', ['ll', 'll-aaa-ccc', 'll-aaa-ccc-ddd'])).toBe(1);
});

test('returns -1 if no locale matched', () => {
  expect(matchLocale('cz_CZ', ['pt', 'ru'])).toBe(-1);
});

test('matches multiple locales', () => {
  expect(matchLocale(['en_GB', 'ru'], ['pt', 'ru'])).toBe(1);
  expect(matchLocale(['en_GB', 'ru_RU'], ['pt', 'en', 'ru'])).toBe(1);
  expect(matchLocale(['aaa-bbb', 'aaa-bbb-ccc'], ['aaa-bbb-xxx', 'aaa-bbb-ccc-xxx'])).toBe(1);
  expect(matchLocale(['aaa-bbb-ccc', 'aaa-bbb'], ['aaa-bbb-xxx', 'aaa-bbb-ccc-xxx'])).toBe(1);
  expect(matchLocale(['zh-CN', 'chi-US'], ['zh-CN', 'chi-US'])).toBe(0);
  expect(matchLocale(['chi-US', 'zh-CN'], ['zh-CN', 'chi-US'])).toBe(1);
  expect(matchLocale(['zh-CN', 'chi-US'], ['chi-US', 'zh-CN'])).toBe(1);
  expect(matchLocale(['zh-CN', 'chi-US'], ['chi-US-xxxxxx', 'zh-CN-yyy'])).toBe(1);
  expect(matchLocale(['chi-US', 'zh-CN'], ['chi-US-xxxxxx', 'zh-CN-yyy'])).toBe(0);
});

test('matches case insensitive', () => {
  expect(matchLocale('EN', ['ru', 'en'])).toBe(1);
});

test('ignores leading separators', () => {
  expect(matchLocale('__en-US', ['ru-RU', 'en', 'en-GB'])).toBe(1);
  expect(matchLocale('__en-US', ['ru-RU', '+++en', 'en-GB'])).toBe(1);
  expect(matchLocale('__en-US', ['ru-RU', 'en+++', 'en-GB'])).toBe(1);
});

test('ignores training separators', () => {
  expect(matchLocale('en-US__', ['ru-RU', 'en', 'en-GB'])).toBe(1);
  expect(matchLocale('en-US__', ['ru-RU', '+++en', 'en-GB'])).toBe(1);
  expect(matchLocale('en-US__', ['ru-RU', 'en+++', 'en-GB'])).toBe(1);
});

test('ignores consequent separators', () => {
  expect(matchLocale('en__US', ['ru-RU', 'en', 'en-GB'])).toBe(1);
  expect(matchLocale('en__US', ['ru-RU', '+++en', 'en-GB'])).toBe(1);
  expect(matchLocale('en__US', ['ru-RU', 'en+++', 'en-GB'])).toBe(1);
  expect(matchLocale('en__US', ['ru-RU', 'en+++US', 'en-GB'])).toBe(1);
  expect(matchLocale('en__US', ['ru-RU', '+++en+++US', 'en-GB'])).toBe(1);
  expect(matchLocale('en__US', ['ru-RU', 'en+++US+++', 'en-GB'])).toBe(1);
});

test('does not cross-match subtags', () => {
  expect(matchLocale('en-US', ['enUS'])).toBe(-1);
  expect(matchLocale('en-US', ['enU-S'])).toBe(-1);
  expect(matchLocale('__en-US', ['+++enU-S'])).toBe(-1);
});

test('matches empty strings', () => {
  expect(matchLocale('', ['en', '', 'ru-RU'])).toBe(1);
  expect(matchLocale('+++', ['en', '', 'ru-RU'])).toBe(1);
  expect(matchLocale('+++', ['en', '+++', 'ru-RU'])).toBe(1);
  expect(matchLocale('', ['en', '+++', 'ru-RU'])).toBe(1);
});

test('returns number of subtags', () => {
  expect(getSubtagCount('')).toBe(0);
  expect(getSubtagCount('en')).toBe(1);
  expect(getSubtagCount('+++en')).toBe(1);
  expect(getSubtagCount('en+++')).toBe(1);
  expect(getSubtagCount('+++en+++')).toBe(1);
  expect(getSubtagCount('en-US')).toBe(2);
  expect(getSubtagCount('en_US')).toBe(2);
  expect(getSubtagCount('+++en_US')).toBe(2);
  expect(getSubtagCount('en_US+++')).toBe(2);
  expect(getSubtagCount('+++en_US+++')).toBe(2);
});
