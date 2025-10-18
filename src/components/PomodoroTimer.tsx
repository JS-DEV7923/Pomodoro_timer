// Timer component: renders current session (work/break), remaining time,
// and exposes controls to start/stop/reset.
// It owns the ticking loop (setInterval) and invokes `store.tick()` each second
// when `isRunning` is true.
import { useEffect, useMemo } from 'react'
import { usePomodoroStore } from '../store/usePomodoroStore'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function PomodoroTimer() {
  const mode = usePomodoroStore((s) => s.mode)
  const isRunning = usePomodoroStore((s) => s.isRunning)
  const secondsRemaining = usePomodoroStore((s) => s.secondsRemaining)
  const start = usePomodoroStore((s) => s.start)
  const stop = usePomodoroStore((s) => s.stop)
  const reset = usePomodoroStore((s) => s.reset)
  const tick = usePomodoroStore((s) => s.tick)

  const label = useMemo(() => (mode === 'work' ? 'Work' : 'Break'), [mode])

  // Ticking loop: while running, call `tick()` every 1s.
  // Cleanup ensures no orphaned intervals.
  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => tick(), 1000)
    return () => clearInterval(id)
  }, [isRunning, tick])

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <div style={{ opacity: 0.8 }}>{label} Session</div>
      <div style={{ fontSize: 48, fontVariantNumeric: 'tabular-nums' }}>
        {formatTime(secondsRemaining)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {isRunning ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
