import { useState, useEffect, useRef } from 'react'
import { REST_DURATION } from './data'

export function useRestTimer() {
  const [restSeconds, setRestSeconds] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (restSeconds === null) {
      clearInterval(intervalRef.current)
      return
    }
    if (restSeconds <= 0) {
      setRestSeconds(null)
      return
    }
    intervalRef.current = setInterval(() => {
      setRestSeconds(s => {
        if (s <= 1) { clearInterval(intervalRef.current); return null }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [restSeconds])

  const startRest = () => setRestSeconds(REST_DURATION)
  const skipRest  = () => setRestSeconds(null)

  return { restSeconds, startRest, skipRest }
}
