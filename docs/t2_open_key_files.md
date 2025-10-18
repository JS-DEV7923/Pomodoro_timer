# TODO t2: Open key files and confirm setup

- **Goal**: Verify build tooling and entry to align implementation.
- **Key Files Opened**:
  - `package.json`: React `^19.1.1`, Vite `^7.1.7`, TypeScript `~5.9.3`. No Zustand/Tailwind.
  - `vite.config.ts`: React plugin with React Compiler babel plugin.
  - `src/main.tsx`: Renders `App` with `StrictMode`.
  - `src/App.tsx`: Vite scaffold with counter demo.
  - `src/index.css` and `src/App.css`: Base styles.
- **Decisions**:
  - Keep React 19/Vite 7 defaults.
  - Introduce Zustand via `npm i zustand` and create `src/store/usePomodoroStore.ts`.
  - Add components under `src/components/` for tasks and timer.
- **Impact**:
  - No breaking changes; purely additive.
