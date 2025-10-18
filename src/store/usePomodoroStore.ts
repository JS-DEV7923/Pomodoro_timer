// Global app state using Zustand. This store holds:
// - Task list with CRUD actions
// - Pomodoro timer state (mode, durations, remaining seconds)
// - Timer controls (start/stop/reset) and a pure `tick()` that advances time
// Persistence is handled via `persist` to localStorage.
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Task = {
  id: string
  title: string
  completed: boolean
}

type Mode = 'work' | 'break'

export type PomodoroState = {
  // tasks
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void

  // timer
  mode: Mode
  isRunning: boolean
  secondsRemaining: number
  workDuration: number
  breakDuration: number
  start: () => void
  stop: () => void
  reset: () => void
  tick: () => void
}

const initialWork = 25 * 60
const initialBreak = 5 * 60

export const usePomodoroStore = create<PomodoroState>()(
  // `persist` wraps the store creator to sync selected fields to localStorage.
  persist(
    (set, get) => ({
      // tasks
      tasks: [],
      addTask: (title: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), title: title.trim(), completed: false },
          ],
        })),
      toggleTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        })),
      deleteTask: (id: string) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      // timer
      mode: 'work',
      isRunning: false,
      secondsRemaining: initialWork,
      workDuration: initialWork,
      breakDuration: initialBreak,
      start: () => set({ isRunning: true }),
      stop: () => set({ isRunning: false }),
      // Reset stops the timer and restores remaining seconds for the current mode.
      reset: () =>
        set((state) => ({
          isRunning: false,
          secondsRemaining:
            state.mode === 'work' ? state.workDuration : state.breakDuration,
        })),
      // Pure tick: advance time or flip mode when reaching 0.
      tick: () => {
        const { secondsRemaining, mode, workDuration, breakDuration } = get()
        if (secondsRemaining > 0) {
          set({ secondsRemaining: secondsRemaining - 1 })
        } else {
          // auto-switch
          const nextMode: Mode = mode === 'work' ? 'break' : 'work'
          const nextSeconds = nextMode === 'work' ? workDuration : breakDuration
          set({ mode: nextMode, secondsRemaining: nextSeconds })
        }
      },
    }),
    {
      name: 'pomodoro-store',
      // Store only selected fields to keep persisted payload small and future-proof.
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        mode: state.mode,
        isRunning: state.isRunning,
        secondsRemaining: state.secondsRemaining,
        workDuration: state.workDuration,
        breakDuration: state.breakDuration,
      }),
    },
  ),
)
