# TODO t7: Minimal styling

- **Goal**: Provide clean, readable UI without introducing Tailwind (optional) yet.
- **Decisions**:
  - Keep inline styles in components for simplicity.
  - Replace Vite scaffold CSS in `src/App.css` with minimal app-centric styles.
  - Use `index.css` base (already centers app) and avoid extra dependencies.
- **Changes**:
  - `src/App.css`: remove logo/spinner styles; add container and utility rules.
- **Why no Tailwind (for now)**:
  - Scope is minimal; inline styles + a few CSS rules suffice.
  - Can add Tailwind later if design requirements grow.
- **Impact**:
  - No breaking changes; purely visual improvements.
