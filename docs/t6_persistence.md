# TODO t6: Persist and hydrate state from localStorage

- **Goal**: Keep tasks and timer state across page reloads.
- **Approach**:
  - Used `zustand/middleware` `persist` with `createJSONStorage(() => localStorage)` in `src/store/usePomodoroStore.ts`.
  - Persisted subset of state via `partialize` to avoid storing transient/derivable data.
- **Persisted Fields**:
  - `tasks`, `mode`, `isRunning`, `secondsRemaining`, `workDuration`, `breakDuration`.
- **Hydration**:
  - On app load, the store rehydrates from localStorage automatically before components consume it.
  - UI components do not require changes; they read from the hydrated store.
- **Notes**:
  - If schema changes in future, `partialize` limits migration risk.
  - Consider resetting `isRunning` to `false` on load if you want timers to never resume automatically after a reload.
