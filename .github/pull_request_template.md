# Pull Request

## Summary

- Briefly explain the problem and the solution.

## Changes

- Key changes in this PR (components, hooks, utils, routes).
- Note any breaking changes or migrations.

## Screenshots / Videos

- UI changes: include before/after or a short clip.

## Linked Issues

- Closes #

## Testing

- Manual steps to verify locally:
  - `pnpm dev` and validate affected views
  - `pnpm test` (add `--coverage` if relevant)
  - `pnpm storybook` for component changes

## Checklist

- [ ] Conventional commit messages (e.g., `feat: add WallForm validation`)
- [ ] Lint passes: `pnpm lint`
- [ ] Tests pass: `pnpm test`
- [ ] Build passes: `pnpm build`
- [ ] Stories updated/added for UI components
- [ ] Accessibility checked (Storybook a11y or manual checks)
- [ ] No secrets or sensitive data committed
- [ ] Documentation updated (README/docs/inline where appropriate)

## Notes for Reviewers

- Call out any areas needing focused review (performance, accessibility, edge cases).
