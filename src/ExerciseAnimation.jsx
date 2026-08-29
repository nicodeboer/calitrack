import { Lottie } from 'lottie-react'
import pushupsData from './animations/pushups.json'
import squatsData from './animations/squats.json'
import squatsReachData from './animations/squatsreach.json'
import plankData from './animations/plank.json'
import lungesData from './animations/lunges.json'
import burpeesData from './animations/burpees.json'
import splitjumpsData from './animations/splitjumps.json'
import plankarmraiseData from './animations/plankarmraise.json'
import reverselungesData from './animations/reverselunges.json'

const LOTTIE_DATA = {
  pushups: pushupsData,
  squats: squatsData,
  plank: plankData,
  lunges: lungesData,
  burpees: burpeesData,
  splitjumps: splitjumpsData,
  plankarmraise: plankarmraiseData,
  squatsreach: squatsReachData,
  reverselunges: reverselungesData,
}

export function ExerciseAnimation({ id, playing = true, size = 140 }) {
  return (
    <div style={{ width: size, height: size, background: '#fff', borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
      <Lottie src={LOTTIE_DATA[id]} autoplay={playing} loop style={{ width: size, height: size }} />
    </div>
  )
}
