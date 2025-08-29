# Repository Guidelines

## Project Structure & Modules

- Source: `src/` organized by feature and shared layers.
  - Features: `src/features/*` (e.g., `walls/`, `openings/`, `takeoff/`, `visualization/`).
  - Shared UI and utils: `src/shared/*` (components, hooks, styles, types, utils).
  - App shell: `src/app/*` (providers like `ThemeProvider`), routing in `src/routes/*` (TanStack Router).
  - Assets: `src/assets/*` (icons, images, fonts). Tests live alongside code (`*.test.tsx`) and in `src/tests/`.

## Build, Test, and Dev Commands

- `pnpm dev`: Start Vite dev server.
- `pnpm build`: Type-check and build for production (`tsc -b && vite build`).
- `pnpm preview`: Preview the production build.
- `pnpm lint`: Run ESLint (TS + React hooks + Storybook rules).
- `pnpm test`: Run Vitest projects (unit + Storybook). Add `--coverage` for report.
- `pnpm storybook` / `pnpm build-storybook`: Run/build component docs.

## Coding Style & Naming

- Language: TypeScript + React, 2-space indentation, no semver-breaking lint errors.
- Components: PascalCase files (`Button.tsx`), CSS Modules as `Component.module.css`.
- Stories: `Component.stories.tsx`; Tests: `Component.test.tsx` (colocate with component).
- Imports: prefer relative within a feature; keep shared logic in `src/shared`.
- Linting: configured in `eslint.config.js`; fix issues before PRs.

## Testing Guidelines

- Framework: Vitest + Testing Library (jsdom). Setup in `vite.config.ts` with projects:
  - Unit tests: `src/**/*.test.tsx`, setup `src/tests/setup.ts`.
  - Storybook tests: configured via `@storybook/addon-vitest`.
- Coverage: V8 reporters (`text`, `json`, `html`). Run `pnpm test --coverage`.
- Write tests for new components, states, and edge cases; prefer user-facing queries (roles/labels).

## Commit & Pull Requests

- Commits: Use Conventional Commits (e.g., `feat: add WallForm validation`, `fix(button): correct disabled state`).
- PRs must include: clear description, linked issues (e.g., `Closes #123`), screenshots for UI changes, and notes on tests/Storybook updates.
- Before opening: run `pnpm lint && pnpm test && pnpm build`.

## Security & Configuration

- Do not commit secrets. Frontend-only; environment config should use Vite conventions (`import.meta.env`).
- Keep dependencies current; avoid introducing node APIs in browser bundles.
