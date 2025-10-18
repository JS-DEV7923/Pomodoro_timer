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
      reset: () =>
        set((state) => ({
          isRunning: false,
          secondsRemaining:
            state.mode === 'work' ? state.workDuration : state.breakDuration,
        })),
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
