# micro-glyphs – AI project rules

## Project description

`micro-glyphs` is a React component library that exports SVG components (icons/glyphs).
The project is a **library** (`lib`), **not an application** — built with Vite for distribution via npm.

## Tech stack

- **React 19** (peer dependency; devDependency for tests/Storybook)
- **TypeScript 6** – strict mode required
- **Vite 6** – bundler; config in `vite.config.ts` (imported from `vitest/config`)
- **Vitest 4** – unit tests; `jsdom` environment, globals enabled
- **Storybook 8** – component documentation and showcase
- **@testing-library/react** – component testing

## Directory structure

```
src/
  components/   # React components (.tsx)
  stories/      # Storybook files (.stories.tsx)
  test/         # unit tests (*.test.tsx)
  index.ts      # public library exports
  setupTests.ts # Vitest setup (@testing-library/jest-dom)
.storybook/     # Storybook configuration
```

## Code conventions

- Write components as **`function` declarations** (not `const` arrow functions) with props typed inline using a `type` alias (e.g. `export function Glyph({ ... }: GlyphProps) {`)
- Always use **`type`** (not `interface`) for all TypeScript type definitions
- Always receive props as a single **`props`** parameter typed with the props type, then destructure on **one line** at the top of the function body (e.g. `function Glyph(props: GlyphProps) { const { name, size = 24 } = props; ... }`)
- Export both the props interface and the component as **named exports** (not `default`)
- Always use **named imports** from `react` — never access types or hooks via the `React` namespace (e.g. use `FC`, `useState`, `useRef` instead of `React.FC`, `React.useState`, `React.useRef`)

## Tests

- Use `@testing-library/react` and `@testing-library/jest-dom` for React components
- Run tests: `npm test` (Vitest, one-shot) or `npm run test:watch`
- **Snapshot testing conventions**:
  - Prefer snapshot testing with Vitest (`toMatchSnapshot()`) to minimize test boilerplate and maximize readability.
  - Pack test cases/scenarios directly as key-value pairs inside an inline object literal in `expect({...}).toMatchSnapshot()`.
  - Use clear, descriptive keys for each scenario (e.g., `"L_3x3 90deg"`, `"OR blend mode"`).
  - Convert domain objects to concise string or JSON-serializable representations for snapshot assertions (e.g. `.toMiniature()` for rasters, `.toPath()` for SVG paths, `.toPolygons()` for vector shapes).

## Storybook

- Story files in `src/stories/`, named: `ComponentName.stories.tsx`
- Run: `npm run storybook` (port 6006)

## Build

- `npm run build` – `tsc && vite build`
- Output: `dist/` (ES module `.js` + UMD `.umd.cjs` + type declarations `.d.ts`)

## What to avoid

- Do not use `export default` for components
- Do not bundle React into the package (it is a peer dependency)
- Do not modify `vite.config.ts` without checking compatibility with `vitest/config`
