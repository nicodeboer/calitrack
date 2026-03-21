import { DAYS_NL } from './data'

export function HomeView({ history, onStart }) {
  const nextWorkout = history.length === 0
    ? 'A'
    : history[0].workout === 'A' ? 'B' : 'A'

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

      {/* Start buttons */}
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#555', marginBottom: 12 }}>
        VOLGENDE AANBEVOLEN: WORKOUT {nextWorkout}
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {['A', 'B'].map(type => (
          <button key={type} onClick={() => onStart(type)} style={{
            flex: 1, padding: '22px 0 18px',
            borderRadius: 16, border: 'none',
            background: type === nextWorkout ? '#c8f55a' : '#1a1a1a',
            color: type === nextWorkout ? '#111' : '#444',
            cursor: 'pointer',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 42, letterSpacing: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4,
            transition: 'transform 0.1s',
            WebkitTapHighlightColor: 'transparent',
          }}>
            {type}
            <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", letterSpacing: 1, opacity: 0.7 }}>
              {type === nextWorkout ? 'AANBEVOLEN' : 'ALTERNATIEF'}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
