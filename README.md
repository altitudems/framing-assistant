# Framing Assistant

A comprehensive tool designed specifically for professional framers to calculate lumber requirements, visualize wall layouts, and generate accurate material takeoffs for residential and light commercial framing projects.

## Tech Stack

- [Chakra UI](https://chakra-ui.com) component library for UI.

## Usage

Visit the **Projects** page to create a new job or resume work on an existing one. Projects are saved in your browser so you can return later even when offline.

## Learn More

- [Features](./docs/features.md)
- [Technical Architecture](./docs/architecture.md)
- [Project Structure](./docs/project-structure.md)
- [Development Rules (cursor)](.cursor/rules.md)

## 📞 Support & Feedback

This tool is designed by framers, for framers. We welcome feedback and suggestions for improvements. Your input helps make this tool more valuable for the entire framing community.

---

**Disclaimer**: This tool provides estimates for planning purposes. Always verify calculations against local building codes and consult with qualified professionals for structural requirements. Results should be reviewed by a licensed contractor or engineer before construction.

## Deployment

The project includes a GitHub Actions workflow that builds the app and publishes it to GitHub Pages whenever changes land on `main`. After enabling Pages in the repository settings, the site will be available at `https://<username>.github.io/framing-assistant/`.

## Releasing

- Use Conventional Commits for all changes (e.g., `feat: add WallForm validation`, `fix(button): correct disabled state)`. Avoid manual version bumps or tags.
- Merges to `main` trigger semantic-release to compute the next version, update `CHANGELOG.md`, create a GitHub release, and tag it.
- Versioning rules: `feat` → minor, `fix`/`perf` → patch, `feat!` or `BREAKING CHANGE:` in body → major.
- PR titles should follow Conventional Commits when using squash merges; CI enforces both PR title and commit style.

## Local Git Hooks

- After installing dependencies (`pnpm install`), Husky sets up Git hooks via the `prepare` script.
- Commit messages are validated locally with commitlint (`.husky/commit-msg`).
- Pre-commit runs lint-staged to format with Prettier and lint/fix staged files only (`.husky/pre-commit`).
- If hooks do not run, ensure hooks are installed: `pnpm run prepare` and that Git is not skipping hooks (`git config --get core.hooksPath` should point to `.husky`).

## Formatting

- Run `pnpm format` to format the repository.
- Run `pnpm format:check` to verify formatting without writing changes.
