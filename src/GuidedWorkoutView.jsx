import { useEffect, useState } from 'react'
import { ROUNDS, COUNTDOWN_SECONDS } from './data'
import { ExerciseAnimation } from './ExerciseAnimation'

export function GuidedWorkoutView({ exercises, onFinish, onCancel }) {
  const [round, setRound] = useState(0)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [phase, setPhase] = useState('countdown')
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)

  const exercise = exercises[exerciseIndex]

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (phase === 'countdown') {
        setPhase('active')
        setSecondsLeft(exercise.duration)
      } else {
        const nextExerciseIndex = exerciseIndex + 1
        if (nextExerciseIndex < exercises.length) {
          setExerciseIndex(nextExerciseIndex)
          setPhase('countdown')
          setSecondsLeft(COUNTDOWN_SECONDS)
        } else {
          const nextRound = round + 1
          if (nextRound < ROUNDS) {
            setRound(nextRound)
            setExerciseIndex(0)
            setPhase('countdown')
            setSecondsLeft(COUNTDOWN_SECONDS)
          } else {
            onFinish()
          }
        }
      }
      return
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft, phase, exerciseIndex, round, exercise, exercises, onFinish])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#111',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 10,
    }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#555', marginBottom: 6 }}>
        RONDE {round + 1}/{ROUNDS} · OEFENING {exerciseIndex + 1}/{exercises.length}
      </div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, marginBottom: 24 }}>
        {exercise.name}
      </div>

      <ExerciseAnimation
        key={`${exercise.id}-${phase}`}
        id={exercise.id}
        playing={phase === 'active'}
        size={240}
      />

      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 2,
        color: phase === 'countdown' ? '#c8f55a' : '#f0f0f0',
        marginTop: 24,
      }}>
        {secondsLeft}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#555', marginBottom: 40 }}>
        {phase === 'countdown' ? 'KLAARMAKEN' : 'AAN DE SLAG'}
      </div>

      <button onClick={onCancel} style={{
        position: 'absolute', bottom: 'max(env(safe-area-inset-bottom), 24px)',
        background: 'transparent', border: '1px solid #2a2a2a', color: '#555',
        borderRadius: 8, padding: '10px 24px',
        fontSize: 11, cursor: 'pointer',
        fontFamily: "'DM Mono', monospace",
      }}>STOPPEN</button>
    </div>
  )
}
