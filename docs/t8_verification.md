# TODO t8: Run app and verify basic flows

- **Goal**: Confirm core features work end-to-end.

## Build/Compile
- Ran `npm run build`.
- Result: Success. Artifacts emitted to `dist/`.

## Manual Flows
- Add Task: Added tasks via `TaskInput`; tasks appear in `TaskList`.
- Toggle Task: Checkbox toggles `completed` state and line-through.
- Delete Task: Delete button removes the task from list.
- Start/Stop Timer: `Start` begins ticking; `Stop` halts; `Reset` restores session length.
- Auto-switch: When `secondsRemaining` reaches `0`, mode flips `work <-> break` and next session duration is set.
- Persistence: Reloaded page; tasks, mode, durations, remaining time persisted via localStorage.

## Notes
- If you prefer timer not to resume running after reload, ensure `isRunning` is not persisted or is set to `false` on hydration.
- Development server: `npm run dev`.
