// App shell responsible for page layout and wiring of high-level sections.
// The state lives in the Zustand store; components below consume it directly.
import './App.css'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import PomodoroTimer from './components/PomodoroTimer'

function App() {
  // Minimal layout: header, timer, and tasks.
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: 24, display: 'grid', gap: 24 }}>
      <header style={{ display: 'grid', gap: 8 }}>
        <h1 style={{ margin: 0 }}>Pomodoro Timer</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>Track tasks and focus in sprints.</p>
      </header>

      {/* Timer section: start/stop/reset controls + current session time */}
      <section>
        <PomodoroTimer />
      </section>

      {/* Task section: add new tasks and manage existing ones */}
      <section style={{ display: 'grid', gap: 12 }}>
        <TaskInput />
        <TaskList />
      </section>
    </div>
  )
}

export default App
