// TaskInput: controlled form that creates new tasks in the global store.
// It uses the `addTask(title)` action exposed by the Zustand store.
import { useState } from 'react'
import { usePomodoroStore } from '../store/usePomodoroStore'

export default function TaskInput() {
  const [title, setTitle] = useState('')
  const addTask = usePomodoroStore((s) => s.addTask)

  // On submit, validate and dispatch `addTask` to the store.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addTask(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        style={{ flex: 1, padding: '8px 10px' }}
      />
      <button type="submit">Add</button>
    </form>
  )
}
