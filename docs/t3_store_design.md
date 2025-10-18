# TODO t3: Design Zustand store with localStorage persistence

- **Goal**: Centralize tasks and Pomodoro timer state with persistence.
- **State Shape** (`src/store/usePomodoroStore.ts`):
  - `tasks: Task[]` with `addTask(title)`, `toggleTask(id)`, `deleteTask(id)`.
  - Timer: `mode: 'work' | 'break'`, `isRunning`, `secondsRemaining`, `workDuration`, `breakDuration`.
  - Controls: `start()`, `stop()`, `reset()`, `tick()`.
- **Timer Logic**:
  - `tick()` decrements `secondsRemaining` if > 0.
  - When 0, auto-switches `mode` and resets `secondsRemaining` to next session length.
- **Persistence**:
  - `zustand/middleware` `persist` with `createJSONStorage(localStorage)`.
  - Partialized to store only relevant fields for resilience.
- **Defaults**:
  - Work 25m, Break 5m. Initial mode `work`.
- **Decision Rationale**:
  - Keep tasks and timer in a single store to avoid prop drilling and simplify cross-component interactions.
  - Expose minimal imperative API from the store; components remain dumb.
- **Impact**:
  - Non-breaking; additive. Ready for UI components to consume.
