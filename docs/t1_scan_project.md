# TODO t1: Scan project structure

- **Goal**: Identify existing setup to avoid duplication and integrate cleanly.
- **Findings**:
  - `vite` + `react` + `typescript` present.
  - Entry files: `src/main.tsx`, `src/App.tsx`.
  - React 19 + Vite 7; no Zustand/Tailwind installed yet.
  - Styling via `src/index.css` and `src/App.css`.
- **Decisions**:
  - Use Zustand for app state with a single store file `src/store/usePomodoroStore.ts`.
  - Keep styling minimal with current CSS (Tailwind optional, skipping for now).
  - Add components under `src/components/` to keep `App.tsx` small.
- **Impact**:
  - Non-breaking additions only; existing Vite scaffold remains intact.
