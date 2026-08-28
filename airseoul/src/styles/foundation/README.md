# Air Seoul Design System

## Breakpoints

| Token | Max width | Role |
| --- | ---: | --- |
| `mobile` | 460px | Core mobile layout |
| `tablet` | 768px | Optional bridge layout |
| `laptop` | 1024px | Core tablet/laptop layout |
| `desktop` | 1440px | Optional bridge layout |
| `wide` | 1920px | Core wide layout |

`respond-down()` includes the token value. `respond-up()` begins one pixel above it.

## Shared spacing

Only five shared spacing properties remain. Other spacing is local and hardcoded.

- Gaps: `--gap-sm` (8px), `--gap-md` (16px), `--gap-lg` (24px)
- Section padding: `--section-padding-sm` (48px), `--section-padding-base` (96px)

## Content typography (definition only)

This system is reserved for repeated visible content on future subpages. Screen-reader-only headings use only the global `.sr-only` class and do not use typography mixins.

- Size roles: `title`, `body`, `label`
- Size ranges: 460px and below, 461–1024px, and 1025px and above
- Rhythm roles: `display`, `title`, `body`, `label`
- Languages: Korean (`ko`) and English (`en`)
- Mixins: `content-type-size()` and `content-type-rhythm()`

## Home-only values

Home section values live in `src/components/home/_tokens.scss`:

- 1920px home content width
- Sky background, home section title size, home icon and large radius values
- Home animation durations and easing, including the shared fade-up motion

Header and footer do not use home tokens. Their unique values are hardcoded in their own Sass files.

## Policy

- Add a shared token only when the same meaning repeats across components.
- Keep one-off layout, spacing, and corrections local.
- Existing legacy spacing, font-size, z-index, and motion systems have been removed.
- Optional 1280px and 1440px component transitions remain local when needed.
