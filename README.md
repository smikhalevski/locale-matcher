# locale-matcher

The [super-fast](#performance) locale matcher and normalizer in
[just 2 kB gzipped](https://bundlephobia.com/package/locale-matcher) with zero dependencies.

```shell
npm install --save-prod locale-matcher
```

# Usage

Pick the supported locale that best matches the requested locale:

```ts
import { pickLocale } from 'locale-matcher';

pickLocale('en_US', ['en-AU', 'en-GB', 'en', 'ru']);
// ⮕ 'en'

pickLocale('hy', ['en-AU', 'en-GB', 'en', 'ru']);
// ⮕ null
```

Provide a fallback locale if the requested locale isn't supported:

```ts
pickLocale('hy', ['en', 'ru'], /* default locale */ 'en');
// ⮕ 'en'
```

Provide a list of the requested locales to choose from:

```ts
pickLocale(['en_US', 'en_AU'], ['en-AU', 'en-GB', 'en', 'ru']);
// ⮕ 'en-AU'
```

Get the index of the supported locale that best matches the requested one:

```ts
import { matchLocale } from 'locale-matcher';

matchLocale(/* requested locale */ 'en-US', /* supported locales */ ['en-AU', 'en-GB', 'en', 'ru']);
// ⮕ 2

matchLocale('hy', ['en-AU', 'en-GB', 'en', 'ru']);
// ⮕ -1
```

Provide a list of the requested locales:

```ts
matchLocale(['en-GB', 'ru-RU'], ['pt', 'en', 'ru']);
// ⮕ 1
```

Normalize the locale:

```ts
import { normalizeLocale } from 'locale-matcher';

normalizeLocale('__EN__US__');
// ⮕ 'en-us'
```

The lookup algorithm tries to find a locale with the maximum number of matching subtags (e.g., `en`, `US`, etc.) and
the shortest overall length.

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

Execution performance is measured in operations per second (± 5%), the higher number is better.
Memory consumption (RAM) is measured in bytes, the lower number is better.

|                                                                                        |       Ops/sec |       RAM |
| -------------------------------------------------------------------------------------- | ------------: | --------: |
| locale-matcher                                                                         | **8,500 kHz** |  **90 B** |
| [@formatjs/intl-localematcher](https://formatjs.io/docs/polyfills/intl-localematcher/) |         2 kHz | 357,000 B |

Tests were conducted using [TooFast](https://github.com/smikhalevski/toofast#readme) on Apple M1 with Node.js v23.1.0.

To reproduce [the performance test suite](./src/test/index.perf.js) results, clone this repo and run:

```shell
npm ci
npm run build
npm run perf
```
