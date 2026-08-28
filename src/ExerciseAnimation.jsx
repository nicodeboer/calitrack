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

export function ExerciseAnimation({ id }) {
  return (
    <div style={{ width: 140, height: 140, background: '#fff', borderRadius: 10, overflow: 'hidden' }}>
      <Lottie src={LOTTIE_DATA[id]} autoplay loop style={{ width: 140, height: 140 }} />
    </div>
  )
}
