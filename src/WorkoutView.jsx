import { WORKOUTS } from './data'

function SetBubble({ done, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 34, height: 34, borderRadius: '50%',
      border: done ? 'none' : '2px solid #333',
      background: done ? '#c8f55a' : 'transparent',
      cursor: 'pointer', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.18s ease',
    }}>
      {done && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7l3.5 3.5L12 3" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}

function ExerciseRow({ exercise, completedSets, onToggleSet }) {
  const allDone = completedSets >= exercise.sets
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '15px 0',
      borderBottom: '1px solid #1e1e1e',
      opacity: allDone ? 0.45 : 1,
      transition: 'opacity 0.3s',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 500,
          color: allDone ? '#c8f55a' : '#f0f0f0',
          textDecoration: allDone ? 'line-through' : 'none',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{exercise.name}</div>
        <div style={{ fontSize: 11, color: '#555', fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
          {exercise.sets} sets × {exercise.reps}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 7 }}>
        {Array.from({ length: exercise.sets }).map((_, i) => (
          <SetBubble
            key={i}
            done={i < completedSets}
            onClick={() => onToggleSet(i)}
          />
        ))}
      </div>
    </div>
  )
}

export function WorkoutView({ workoutType, completedSets, onToggleSet, onFinish, onCancel, restSeconds, onSkipRest }) {
  const exercises = WORKOUTS[workoutType]
  const totalSets = exercises.reduce((a, e) => a + e.sets, 0)
  const doneSets  = exercises.reduce((a, e) => a + Math.min(completedSets[e.id] || 0, e.sets), 0)
  const progress  = totalSets > 0 ? doneSets / totalSets : 0
  const allDone   = progress >= 1

  const circumference = 2 * Math.PI * 14
  const restProgress  = restSeconds !== null ? (restSeconds / 60) : 0

  return (
    <div style={{ padding: '0 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2, color: '#888' }}>
            WORKOUT <span style={{ color: '#c8f55a' }}>{workoutType}</span>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#555' }}>
            {doneSets}/{totalSets} sets
          </div>
        </div>
        <div style={{ height: 3, background: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #c8f55a, #a8d84a)',
            borderRadius: 2, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Rest timer */}
      {restSeconds !== null && (
        <div style={{
          background: '#141414', borderRadius: 14,
          padding: '14px 18px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 14,
          border: '1px solid #222',
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" style={{ flexShrink: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#222" strokeWidth="3"/>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#c8f55a" strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - restProgress)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div>
            <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: '#555', marginBottom: 2 }}>RUST</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: '#c8f55a', letterSpacing: 2, lineHeight: 1 }}>
              {restSeconds}s
            </div>
          </div>
          <button onClick={onSkipRest} style={{
            marginLeft: 'auto', background: 'transparent',
            border: '1px solid #2a2a2a', color: '#555',
            borderRadius: 8, padding: '5px 12px',
            fontSize: 10, cursor: 'pointer',
            fontFamily: "'DM Mono', monospace",
          }}>SKIP</button>
        </div>
      )}

      {/* Exercise list */}
      <div style={{ flex: 1 }}>
        {exercises.map(ex => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            completedSets={completedSets[ex.id] || 0}
            onToggleSet={(i) => onToggleSet(ex.id, i)}
          />
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        <button onClick={onCancel} style={{
          flex: 1, padding: 16, borderRadius: 13,
          border: '1px solid #222', background: 'transparent',
          color: '#555', cursor: 'pointer',
          fontFamily: "'DM Mono', monospace", fontSize: 11,
        }}>ANNULEER</button>
        <button onClick={onFinish} style={{
          flex: 2.5, padding: 16, borderRadius: 13, border: 'none',
          background: allDone ? '#c8f55a' : '#1a1a1a',
          color: allDone ? '#111' : '#555',
          cursor: 'pointer',
          fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600,
          transition: 'all 0.3s',
        }}>
          {allDone ? '✓ WORKOUT AFRONDEN' : 'VROEG STOPPEN'}
        </button>
      </div>
    </div>
  )
}
