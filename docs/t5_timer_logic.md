# TODO t5: Wire up auto-switch and ticking loop

- **Goal**: Make the timer run, decrementing every second, and auto-switch between work and break.
- **Implementation**:
  - In `src/components/PomodoroTimer.tsx`, added a `useEffect` that starts an interval when `isRunning` is true and calls `tick()` every second.
  - Cleanup clears the interval on unmount or when `isRunning` changes.
  - Store's `tick()` handles `secondsRemaining > 0` decrement, and when it hits `0`, flips `mode` and resets `secondsRemaining` to the next session (`workDuration` or `breakDuration`).
- **Why in component**:
  - Keeps store pure and environment-agnostic; component owns side-effects (intervals) per React best practices.
- **Edge cases**:
  - Multiple intervals prevented by effect cleanup and dependency on `isRunning`.
  - Reset sets correct length based on current `mode`.
- **Impact**:
  - Timer is functional with start/stop/reset and seamless session switching.
