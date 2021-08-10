# locale-matcher [![build](https://github.com/smikhalevski/locale-matcher/actions/workflows/master.yml/badge.svg?branch=master&event=push)](https://github.com/smikhalevski/locale-matcher/actions/workflows/master.yml)

[Super-fast](#performance) locale matcher and normalizer in
[just 2 kB gzipped](https://bundlephobia.com/package/locale-matcher).

```shell
npm install --save-prod locale-matcher
```

# Usage

```ts
import {matchLocale, pickLocale, normalizeLocale} from 'locale-matcher';

matchLocale(/*requestedLocale*/ 'en-US', /*supportedLocale*/ ['en-AU', 'en-GB', 'en', 'ru']); // → 2

matchLocale(['en-GB', 'ru-RU'], ['pt', 'en', 'ru']); // → 1

pickLocale('__en-US__', ['en-AU', 'en-GB', 'en', 'ru']); // → 'en'

pickLocale(['es-ES', 'cz-CZ'], ['en', 'ru'], /*defaultLocale*/ 'en_US'); // → 'en_US'

pickLocale('aaa-bbb-ccc', ['aaa', 'aaa-bbb', 'aaa-ddd']); // → aaa-bbb

normalizeLocale('__EN__US__'); // → 'en-us'
```

Lookup algorithm tries to find a locale with the maximum number of matched subtags (`en`, `US`, etc.) and shortest
overall length.

[Matching is case-insensitive](https://tools.ietf.org/search/bcp47#section-2.1.1) and ignores non-alpha-ASCII characters
so `mn-Cyrl-MN` is not distinct from `MN__cYRL--mn` or `++mN__cYrL@Mn++`.

Locales are expected start with [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes),
[ISO 639-2](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes),
[ISO 639-3](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) or
[ISO 639-5](https://en.wikipedia.org/wiki/List_of_ISO_639-5_codes) language code. These codes are interchangeable
so `chi-CN` is not distinct from `zh-CN`.

`locale-matcher` doesn't depend on `Intl` and doesn't throw exceptions if locale is malformed or subtags aren't ordered
properly.

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance test suite.

|  | Ops/sec |
| --- | ---: | 
| locale-matcher | 4,250,838 |
| [@formatjs/intl-localematcher](https://formatjs.io/docs/polyfills/intl-localematcher/) | 20,089 |
