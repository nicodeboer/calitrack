import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useRestTimer } from './useRestTimer'
import { WORKOUTS } from './data'
import { HomeView }    from './HomeView'
import { WorkoutView } from './WorkoutView'
import { HistoryView } from './HistoryView'

const NAV = [
  { id: 'home',    label: 'Home',    icon: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
        stroke={active ? '#c8f55a' : '#555'} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M7 18v-6h6v6" stroke={active ? '#c8f55a' : '#555'} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'history', label: 'Log',     icon: (active) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="13" rx="2" stroke={active ? '#c8f55a' : '#555'} strokeWidth="1.5"/>
      <path d="M7 4V2M13 4V2M3 8h14" stroke={active ? '#c8f55a' : '#555'} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 12h6M7 15h4" stroke={active ? '#c8f55a' : '#555'} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
]

export default function App() {
  const [view,         setView]         = useState('home')
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [completedSets, setCompletedSets] = useState({})
  const [history,       setHistory]       = useLocalStorage('calitrack_history', [])
  const { restSeconds, startRest, skipRest } = useRestTimer()

  const startWorkout = (type) => {
    setActiveWorkout(type)
    setCompletedSets({})
    setView('workout')
  }

  const toggleSet = (exerciseId, setIndex) => {
    setCompletedSets(prev => {
      const current = prev[exerciseId] || 0
      const newVal  = setIndex < current ? setIndex : setIndex + 1
      return { ...prev, [exerciseId]: newVal }
    })
    startRest()
  }

  const finishWorkout = () => {
    const exercises = WORKOUTS[activeWorkout]
    const completed = exercises.filter(e => (completedSets[e.id] || 0) >= e.sets).length
    setHistory(prev => [{
      workout:   activeWorkout,
      completed,
      total:     exercises.length,
      timestamp: Date.now(),
    }, ...prev.slice(0, 49)])
    setActiveWorkout(null)
    setCompletedSets({})
    setView('home')
  }

  const cancelWorkout = () => {
    setActiveWorkout(null)
    setCompletedSets({})
    setView('home')
  }

  const isWorkout = view === 'workout'

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: '#111',
      maxWidth: 480,
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* Header */}
      <div style={{
        padding: 'env(safe-area-inset-top, 16px) 24px 16px',
        paddingTop: `max(env(safe-area-inset-top), 20px)`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 3 }}>
          CALI<span style={{ color: '#c8f55a' }}>TRACK</span>
        </div>
        {isWorkout && (
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: '#c8f55a', background: '#c8f55a18',
            padding: '4px 10px', borderRadius: 20,
          }}>
            LIVE
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {view === 'home'    && <HomeView    history={history} onStart={startWorkout} />}
        {view === 'workout' && (
          <WorkoutView
            workoutType={activeWorkout}
            completedSets={completedSets}
            onToggleSet={toggleSet}
            onFinish={finishWorkout}
            onCancel={cancelWorkout}
            restSeconds={restSeconds}
            onSkipRest={skipRest}
          />
        )}
        {view === 'history' && <HistoryView history={history} onClear={() => setHistory([])} />}
      </div>

      {/* Bottom nav (hidden during active workout) */}
      {!isWorkout && (
        <div style={{
          display: 'flex',
          borderTop: '1px solid #1e1e1e',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          flexShrink: 0,
          background: '#111',
        }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setView(n.id)} style={{
              flex: 1, padding: '14px 0 10px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}>
              {n.icon(view === n.id)}
              <span style={{
                fontSize: 9, fontFamily: "'DM Mono', monospace",
                color: view === n.id ? '#c8f55a' : '#555',
                letterSpacing: 0.5,
              }}>{n.label.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
