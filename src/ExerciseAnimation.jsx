import { Lottie } from 'lottie-react'
import pushupsData from './animations/pushups.json'
import squatsData from './animations/squats.json'
import plankData from './animations/plank.json'
import lungesData from './animations/lunges.json'
import burpeesData from './animations/burpees.json'

const LOTTIE_DATA = {
  pushups: pushupsData,
  squats: squatsData,
  plank: plankData,
  lunges: lungesData,
  burpees: burpeesData,
}

function StickFigure({ id }) {
  return (
    <svg className={`exanim exanim-${id}`} width="90" height="90" viewBox="0 0 90 90" fill="none">
      <circle className="part head" cx="45" cy="18" r="8" stroke="#c8f55a" strokeWidth="3" />
      <line className="part torso" x1="45" y1="26" x2="45" y2="52" stroke="#c8f55a" strokeWidth="3" strokeLinecap="round" />
      <line className="part armL" x1="45" y1="32" x2="28" y2="46" stroke="#c8f55a" strokeWidth="3" strokeLinecap="round" />
      <line className="part armR" x1="45" y1="32" x2="62" y2="46" stroke="#c8f55a" strokeWidth="3" strokeLinecap="round" />
      <line className="part legL" x1="45" y1="52" x2="32" y2="74" stroke="#c8f55a" strokeWidth="3" strokeLinecap="round" />
      <line className="part legR" x1="45" y1="52" x2="58" y2="74" stroke="#c8f55a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function ExerciseAnimation({ id }) {
  const lottieData = LOTTIE_DATA[id]
  if (lottieData) {
    return (
      <div style={{ width: 140, height: 140, background: '#fff', borderRadius: 10, overflow: 'hidden' }}>
        <Lottie src={lottieData} autoplay loop style={{ width: 140, height: 140 }} />
      </div>
    )
  }
  return <StickFigure id={id} />
}
