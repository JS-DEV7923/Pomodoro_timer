# TODO t4: Implement UI components (TaskInput, TaskList, PomodoroTimer)

- **Goal**: Minimal components to interact with the store.
- **Components**:
  - `TaskInput`: Form to add tasks via `usePomodoroStore().addTask`.
  - `TaskList`: List with checkbox to toggle and button to delete tasks.
  - `PomodoroTimer`: Displays mode label and formatted time, start/stop/reset controls.
- **Integration**:
  - Replaced Vite scaffold in `src/App.tsx` with sections for timer and tasks.
- **Out of Scope for t4**:
  - Interval/ticking loop. Implemented in t5 to keep commits scoped.
- **Impact**:
  - App now renders working UI; timer controls are wired but ticking added in t5.
