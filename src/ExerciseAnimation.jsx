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
import squatsGif from './animations/squats.gif'
import lungesGif from './animations/lunges.gif'
import reverselungesGif from './animations/reverselunges.gif'
import jumpingsquatsData from './animations/jumping-squats.gif'
import crunchesData from './animations/crunches.gif'
import situpsData from './animations/situps.gif'

const LOTTIE_DATA = {
  pushups: pushupsData,
  plank: plankData,
  burpees: burpeesData,
  splitjumps: splitjumpsData,
  plankarmraise: plankarmraiseData,
  squatsreach: squatsReachData,
}

const GIF_DATA = {
  squats: squatsGif,
  lunges: lungesGif,
  reverselunges: reverselungesGif,
  jumpingsquats: jumpingsquatsData,
  crunches: crunchesData,
  situps: situpsData,
}

export function ExerciseAnimation({ id, playing = true, size = 140 }) {
  const gif = GIF_DATA[id]
  return (
    <div style={{ width: size, height: size, background: '#fff', borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
      {gif
        ? <img src={gif} alt="" style={{ width: size, height: size, objectFit: 'cover' }} />
        : <Lottie src={LOTTIE_DATA[id]} autoplay={playing} loop style={{ width: size, height: size }} />}
    </div>
  )
}
