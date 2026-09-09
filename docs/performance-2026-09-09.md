# Performance verification — 2026-09-09

## Measurements

Online PageSpeed Insights baseline (mobile): performance 68, accessibility 96,
best practices 100, SEO 100, FCP 2.9 s, LCP 8.5 s.
Report: https://pagespeed.web.dev/analysis/https-howtofish-org/nac9egclcg?form_factor=mobile
The desktop run on that report failed because Google's rendering service was overloaded.

Local production builds measured with Lighthouse 13.4.1, default simulated mobile
throttling, the same machine and localhost:3100:

| Metric | Before | Final mobile runs |
| --- | ---: | ---: |
| Performance | 69 | 91 / 93 / 92 |
| Accessibility | 96 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 2.7 s | 0.9 s |
| LCP | 7.2 s | 3.3–3.5 s |
| TBT | 60 ms | 40–60 ms |
| CLS | 0 | 0 |
| Speed Index | 4.8 s | 0.9 s |
| Transfer size | 1,495 KiB | 590 KiB |

The final desktop run scored 99/100/100/100, with FCP 0.2 s,
LCP 0.8 s, TBT 0 ms and CLS 0. These are individual lab runs, not field
measurements or a prediction of deployed scores. Mobile LCP remains the main
opportunity. Re-run PSI after deployment; server latency and image cache warmth
can affect the result.

## Changes

- Use Turbopack's documented experimental `cssChunking: "graph"` strategy.
  Homepage CSS shrank from about 148 KB to 52 KB uncompressed before inlining.
  Enable `inlineCss` to deliver initial styles with HTML, removing blocking CSS
  requests. Trade-off: styles cannot be cached separately on full-page loads,
  and Next.js also includes them in the RSC payload.
- Serve the decorative background as WebP: 605,186 to 7,392 bytes, same dimensions.
- Serve local WOFF2 fonts through `next/font/local`, with font preloading and
  metric-adjusted fallbacks. Preserve original TTF files; subset body/display
  WOFF2 to Latin-1, punctuation, currency, arrows and mathematical symbols.
  The brand face contains only the letters in "How to Fish Wiki". The three
  served font files total 62,520 bytes instead of 501,480 bytes.
  Regenerate using `python scripts/generate-web-fonts.py` (fonttools + brotli).
  Extend character ranges before introducing other languages or changing the brand.
- Give the homepage and shared inner hero images high fetch priority.
  Pre-encode homepage hero AVIF/WebP at 640/750/960/1440/1920px, and preload
  the responsive AVIF source. No on-demand transformation on the LCP request.
  Regenerate using `node scripts/generate-hero-images.mjs`.
- Reduce favicon.ico to 16/32/48px entries (about 106 KB to 8.4 KB).
- Disable automatic link prefetch in the homepage, shared section headings
  and navigation so unrelated route downloads do not compete with initial rendering.
  Normal client-side navigation continues to work.
- Load Google Analytics with `lazyOnload`. Analytics remains enabled, but very
  short visits ending before load/idle may not be recorded.
- Fetch the statically generated search index only when search opens. Keep loaded
  data in the mounted header, and show loading/error/retry states. Cache the JSON
  for five minutes in browsers and one hour on a shared cache.
- Correct homepage definition-list markup and collapse the navigation before
  its desktop contents overflow medium-width screens.

## Verification

- `npm run lint` and `npm run build` passed.
- Verified mobile homepage, search loading, Brown Crab search and detail navigation,
  navigation menu, and client-side navigation to the Leaflet map.
- Map markers loaded; no horizontal page overflow at a 390px viewport.
- Google Analytics script loaded once after page load.

To reproduce lab measurements, run `npm run build`, then
`npm run start -- --port 3100` and, in another terminal:

```powershell
npm exec --yes --package=lighthouse@13.4.1 -- lighthouse http://localhost:3100/ --chrome-flags=--headless --output=json --output-path="$env:TEMP/how-to-fish-mobile.json"
npm exec --yes --package=lighthouse@13.4.1 -- lighthouse http://localhost:3100/ --preset=desktop --chrome-flags=--headless --output=json --output-path="$env:TEMP/how-to-fish-desktop.json"
```

Check route styling after future Next.js upgrades because graph CSS chunking is
experimental. No URLs, SEO titles or gameplay content were changed.

Final mobile tests use the unchanged Lighthouse 13.4.1 default mobile profile,
with no third-party blocking or audit-specific code paths. All three reports have
no runtimeError and all audit categories completed. Two CLI runs encountered a
Windows temporary-directory cleanup EPERM after writing complete reports.

Verified the final mobile and desktop homepage visually, and navigated from the
homepage to the beginner guide and back to check styles after CSS inlining.

## Production verification after GitHub deployment

Commit `0eccb57` passed GitHub CI and deployed successfully to Vercel.
The public homepage was tested with PageSpeed Insights on September 9, 2026:
https://pagespeed.web.dev/analysis/https-howtofish-org/9ad5h3y83u?form_factor=mobile

- Mobile: performance 92; accessibility, best practices and SEO 100.
- FCP 1.7 s, LCP 2.8 s, TBT 70 ms, CLS 0, Speed Index 4.5 s.
- Desktop: performance 89; the other three categories 100.
  FCP 0.5 s, LCP 0.8 s, TBT 270 ms, CLS 0, Speed Index 0.7 s.
- Desktop long tasks included Google Analytics (160 ms and 123 ms) and
  first-party initialization (170 ms and 83 ms).

Follow-up commit `69ee04b` loads the search interface only on first open,
retains its state and cached index after closing, and disables brand-link prefetch.
Build and lint passed. Verified the deployed search opens and returns Brown Crab.

The follow-up deployment passed GitHub CI and Vercel deployment checks.
Final online PageSpeed Insights report (10:17 GMT+8):
https://pagespeed.web.dev/analysis/https-howtofish-org/g76ugees5l?form_factor=mobile

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 96 | 98 |
| Accessibility / Best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| FCP | 1.7 s | 0.5 s |
| LCP | 2.6 s | 0.7 s |
| TBT | 50 ms | 130 ms |
| CLS | 0 | 0 |
| Speed Index | 1.7 s | 0.5 s |

Both devices exceed the 90-point target in this production lab test. Scores can
vary between runs; the difference between reports is not solely attributable to
the small follow-up code change. No CrUX field data was available in this report.
