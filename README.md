# The 52 Cetasikas

**[Live site →](https://mrf.github.io/cetasikas/)**

An interactive mandala of the **52 cetasikas**: the mental factors described in the
Theravāda Abhidhamma. The app is a study aid for seeing how universal, occasional,
unwholesome, and beautiful factors are grouped, related, and named.

- **Static site.** No server, no account, no analytics.
- **Interactive study map.** Filter by ring or category, click any factor for details, and
  inspect relationship lines as interpretive study aids.
- **Free, forever, as dāna.** MIT-licensed static site.

## Development

```sh
npm install
npm run dev        # local dev server
npm test           # vitest suite
npm run lint       # eslint, warnings are errors
npm run build      # vite build (dist/)
npm run verify     # lint + test + build
```

Stack: React + Vite, inline SVG for the mandala, Vitest for interaction checks, and
ESLint for the JavaScript gate. Deploys to GitHub Pages via
`.github/workflows/deploy.yml` on push to `main`.

## Contributing

Issues and pull requests are welcome. The bar to merge: `npm run verify` passes. Changes
should keep the app lightweight, static, and freely usable without accounts, tracking, or
engagement mechanics.

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To publish:

1. Push the repository to GitHub with `main` as the default branch.
2. In the repository settings, open **Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The Vite base path is calculated automatically for project pages like `/cetasikas/` and user/org pages like `/username.github.io/`.

## License

[MIT](LICENSE). The code is offered as the app is: freely.

## Source Texts

This visualization is informed by the Theravāda Abhidhamma 52-factor scheme and by
comparative Buddhist mental-factor lists:

- [Bhikkhu Bodhi, *A Comprehensive Manual of Abhidhamma*](https://www.accesstoinsight.org/lib/authors/bodhi/abhiman.html)
- [*Abhidhammattha Saṅgaha*](https://www.palikanon.com/english/sangaha/sangaha.htm)
- [Mental factors overview](https://en.wikipedia.org/wiki/Mental_factors)
- [Study Buddhism: primary minds and the 51 mental factors](https://studybuddhism.com/en/advanced-studies/science-of-mind/mind-mental-factors/primary-minds-and-the-51-mental-factors)
