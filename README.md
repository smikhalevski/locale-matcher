# locale-matcher

[Super-fast](#performance) locale matcher in [just 450 bytes gzipped](https://bundlephobia.com/package/locale-matcher).

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


normalizeLocale('__EN__US__'); // → 'en-us'
```

The locale/language matching algorithm:

1. Lookup exact locale in `supportedLocales` (`en-GB` → `en-GB`);
2. Lookup a language-only locale in `supportedLocales` (`en-GB` → `en`);
3. Lookup the first locale in `supportedLocales` with the same language as `requestedLocale` (`en-GB` → `en-US`);
4. Return -1.

[Matching is case-insensitive](https://tools.ietf.org/search/bcp47#section-2.1.1) and ignores non-alpha-ASCII characters
so `mn-Cyrl-MN` is not distinct from `MN_cYRL=mn` or `mN+cYrL.Mn`.

Locales are expected start with [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) or
[ISO 639-2](https://en.wikipedia.org/wiki/ISO_639-2) language code.

Some examples of valid locales: `en`, `en_US`, `en-US`, `en-us` and `HE/il-u-ca-hebrew+tz/jeruslm`.

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance test suite.

|  | Ops/sec |
| --- | ---: | 
| locale-matcher | 5,612,840 |
| [@formatjs/intl-localematcher](https://formatjs.io/docs/polyfills/intl-localematcher/) | 29,825 |

