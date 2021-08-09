# locale-matcher

[Super-fast](#performance) locale matcher and normalizer in [just 600 bytes gzipped](https://bundlephobia.com/package/locale-matcher).

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
so `mn-Cyrl-MN` is not distinct from `MN_cYRL=mn` or `mN+cYrL.Mn`.

Locales are expected start with [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) or
[ISO 639-2](https://en.wikipedia.org/wiki/ISO_639-2) language code. For example `en`, `en_US`, `en-US`, `en-us`
and even `HE/il-u-ca---hebrew+tz/jeruslm` are valid locales for this library.

This library does't depend on `Intl`.

# Performance

Clone this repo and use `npm ci && npm run perf` to run the performance test suite.

|  | Ops/sec |
| --- | ---: | 
| locale-matcher | 6,402,041 |
| [@formatjs/intl-localematcher](https://formatjs.io/docs/polyfills/intl-localematcher/) | 17,381 |

