// TaskList: reads tasks from the global store and exposes toggle/delete actions.
// Each item is rendered with a checkbox and a Delete button.
import { usePomodoroStore } from '../store/usePomodoroStore'

export default function TaskList() {
  // Select only the needed slices from the store to avoid unnecessary re-renders.
  const tasks = usePomodoroStore((s) => s.tasks)
  const toggleTask = usePomodoroStore((s) => s.toggleTask)
  const deleteTask = usePomodoroStore((s) => s.deleteTask)

  if (!tasks.length) {
    return <p style={{ opacity: 0.7 }}>No tasks yet.</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {tasks.map((t) => (
        <li
          key={t.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            gap: 12,
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.title}
            </span>
          </label>
          <button onClick={() => deleteTask(t.id)} aria-label={`Delete ${t.title}`}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
