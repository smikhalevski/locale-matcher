# locale-matcher

[Super-fast](#performance) locale matcher in [just 450 bytes gzipped](https://bundlephobia.com/package/locale-matcher).

```shell
npm install --save-prod locale-matcher
```

# Usage

```ts
import {matchLocale, pickLocale} from 'locale-matcher';

matchLocale(/*requestedLocale*/ 'en_US', /*supportedLocale*/ ['en_AU', 'en_GB', 'en', 'ru']); // → 2

matchLocale(['en_GB', 'ru_RU'], ['pt', 'en', 'ru']); // → 1

pickLocale('en_US', ['en_AU', 'en_GB', 'en', 'ru']); // → 'en'

pickLocale(['es_ES', 'cz_CZ'], ['en', 'ru'], /*defaultLocale*/ 'en_US'); // → 'en_US'
```

The locale/language matching algorithm:

1. Lookup exact locale in `supportedLocales` (`en_GB` → `en_GB`);
2. Lookup a language-only locale in `supportedLocales` (`en_GB` → `en`);
3. Lookup the first locale in `supportedLocales` with the same language as `requestedLocale` (`en_GB` → `en_US`);
4. Return -1.

[Matching is case-insensitive](https://tools.ietf.org/search/bcp47#section-2.1.1) and ignores non-alpha-ASCII characters
so `mn-Cyrl-MN` is not distinct from `MN_cYRL=mn` or `mN+cYrL.Mn`.

Locales are expected start with [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). Some
examples of valid locales: `en`, `en_US`, `en-US`, `en-us` and `en_US.UTF-8`.

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance test suite.

|  | Ops/sec |
| --- | ---: | 
| locale-matcher | 5,612,840 |
| [@formatjs/intl-localematcher](https://formatjs.io/docs/polyfills/intl-localematcher/) | 29,825 |

