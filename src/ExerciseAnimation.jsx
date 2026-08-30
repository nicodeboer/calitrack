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
import jumpingsquatsGif from './animations/jumping-squats.gif'
import crunchesGif from './animations/crunches.gif'
import situpsGif from './animations/situps.gif'
import mountainClimbersGif from './animations/mountain-climbers.gif'
import jumpingJacksGif from './animations/jumping-jacks.gif'
import wallsitGif from './animations/wall-sit.gif'

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
  jumpingsquats: jumpingsquatsGif,
  crunches: crunchesGif,
  situps: situpsGif,
  mountainclimbers: mountainClimbersGif,
  jumpingjacks: jumpingJacksGif,
  wallsit: wallsitGif,
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
