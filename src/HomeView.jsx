import { useState } from 'react'
import { DAYS_NL, EXERCISES } from './data'
import { ExerciseAnimation } from './ExerciseAnimation'

const REQUIRED_SELECTION = 5

export function HomeView({ history, onStart }) {
  const [selectedIds, setSelectedIds] = useState([])

  const toggleExercise = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= REQUIRED_SELECTION) return prev
      return [...prev, id]
    })
  }

  const canStart = selectedIds.length === REQUIRED_SELECTION

  const handleStart = () => {
    if (!canStart) return
    onStart(selectedIds.map(id => EXERCISES.find(e => e.id === id)))
  }

  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - ((today.getDay() + 6) % 7)) // Mon

  const workedDays = new Set(
    history
      .filter(h => {
        const d = new Date(h.timestamp)
        return d >= weekStart && d <= today
      })
      .map(h => new Date(h.timestamp).toDateString())
  )

  const totalWorkouts = history.length
  const currentStreak = (() => {
    if (!history.length) return 0
    let streak = 0
    let check = new Date()
    check.setHours(0,0,0,0)
    for (const h of history) {
      const d = new Date(h.timestamp)
      d.setHours(0,0,0,0)
      const diff = Math.round((check - d) / 86400000)
      if (diff > 1) break
      if (diff === 0 || diff === 1) { streak++; check = d }
    }
    return streak
  })()

  return (
    <div style={{ padding: '0 24px 24px', flex: 1, overflowY: 'auto' }}>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'WORKOUTS', value: totalWorkouts },
          { label: 'STREAK', value: `${currentStreak}d` },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: '#1a1a1a', borderRadius: 14,
            padding: '14px 16px',
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#555', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#c8f55a', letterSpacing: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Week grid */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#555', marginBottom: 10 }}>DEZE WEEK</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {DAYS_NL.map((d, i) => {
            const date = new Date(weekStart)
            date.setDate(weekStart.getDate() + i)
            const isToday = date.toDateString() === today.toDateString()
            const isPast  = date < today && !isToday
            const done    = workedDays.has(date.toDateString())
            return (
              <div key={d} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  aspectRatio: '1', borderRadius: 10,
                  background: done ? '#c8f55a' : isToday ? '#c8f55a18' : '#1a1a1a',
                  border: isToday ? '1.5px solid #c8f55a' : '1.5px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 5,
                }}>
                  {done && (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", color: isToday ? '#c8f55a' : '#444' }}>{d}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Exercise selection grid */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#555', marginBottom: 10 }}>
          KIES {REQUIRED_SELECTION} OEFENINGEN ({selectedIds.length}/{REQUIRED_SELECTION})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' }}>
          {EXERCISES.map(ex => {
            const order = selectedIds.indexOf(ex.id)
            const selected = order !== -1
            return (
              <div
                key={ex.id}
                onClick={() => toggleExercise(ex.id)}
                style={{
                  width: 'calc(33.333% - 7px)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', cursor: 'pointer', position: 'relative',
                }}
              >
                <div style={{
                  position: 'relative', borderRadius: 10,
                  outline: selected ? '2px solid #c8f55a' : '2px solid transparent',
                  opacity: 1,
                  transition: 'opacity 0.15s, outline-color 0.15s',
                }}>
                  <ExerciseAnimation id={ex.id} size={90} />
                  {selected && (
                    <div style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#c8f55a', color: '#111',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600,
                    }}>{order + 1}</div>
                  )}
                </div>
                <div style={{ fontSize: 11, color: selected ? '#f0f0f0' : '#aaa', marginTop: 6, textAlign: 'center' }}>{ex.name}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Start button */}
      <button onClick={handleStart} disabled={!canStart} style={{
        width: '100%', padding: '22px 0 18px',
        borderRadius: 16, border: 'none',
        background: canStart ? '#c8f55a' : '#1a1a1a',
        color: canStart ? '#111' : '#444',
        cursor: canStart ? 'pointer' : 'default',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: canStart ? 42 : 22, letterSpacing: canStart ? 3 : 1,
        marginBottom: 16,
        transition: 'transform 0.1s',
        WebkitTapHighlightColor: 'transparent',
      }}>
        {canStart ? 'BEGIN' : `SELECTEER ${REQUIRED_SELECTION} OEFENINGEN`}
      </button>
    </div>
  )
}
