import { useState, useRef, useEffect } from 'react'
import gong from "/src/assets/411574__inspectorj__alto-gong-metal-hit-b-h6-xy.wav"
import './App.css'
function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(sessionLength * 60)
  const [isRunning, setisRunning] = useState(false)
  const [phase, setPhase] = useState("session")

  useEffect(() => {
    let timer = null
    const interval = 1000
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev > 0) {
            return prev - interval / 1000
          } else {
            phaseChange()
            return 0
          }
        })
      }, interval)
    } else { clearInterval(timer) }
    return () => { clearInterval(timer) }
  }, [isRunning, phase])

  useEffect(() => {
    setTimeLeftSeconds(phaseLengthSeconds[phase]())
  }, [sessionLength, phase])



  const phaseChange = () => {
    if (phase === "session") {
      setPhase("break")
    } else if (phase === "break") {
      setPhase("session")
    }
    document.getElementById("beep").play()
  }

  const phaseLengthSeconds = {
    break: function () {
      console.log("BREAK TIME!")
      return breakLength * 60
    },
    session: function () { return sessionLength * 60 },
  }


  const formatTimeLeft = (timeLeftSeconds) => {
    const minutes = Math.floor(timeLeftSeconds / 60).toString()
    const seconds = (timeLeftSeconds % 60).toString()
    const formatted = (str) => {
      return ("0" + str).slice(-2)
    }
    return formatted(minutes) + ":" + formatted(seconds)
  }



  const pause = () => {
    if (isRunning) {
      setisRunning(false)
    } else { setisRunning(true) }
  }
  const reset = () => {
    document.getElementById("beep").pause()
    document.getElementById("beep").currentTime = 0
    setisRunning(false)
    setBreakLength(5)
    setSessionLength(25)
    setPhase("session")
    setTimeLeftSeconds(sessionLength * 60)
    setisRunning(false)
  }
  const incrementBreak = (x) => {
    setBreakLength(prev => { return increment(prev, x) })
  }
  const incrementSession = (x) => {
    setSessionLength(prev => { return increment(prev, x) })
  }
  const increment = (prev, x) => {
    const canIncrement = (prev + x) > 0 && (prev + x) <= 60
    if (canIncrement) {
      return prev + x
    } else { return prev }
  }


  return (
    <div className="App">
      <header><h1>25 + 5 Clock</h1></header>
      <div id="phase-controls">
        <div id="break-controls">
          <p id="break-label" className="phase-label">Break</p>
          <p id="break-length" className='length'>{breakLength}</p>
          <button id="break-increment" onClick={() => incrementBreak(1)}>MORE</button>
          <button id="break-decrement" onClick={() => incrementBreak(-1)}>LESS</button>
        </div>
        <div id="session-controls">
          <p id="session-label" className="phase-label">Session</p>
          <p id="session-length" className='length'>{sessionLength}</p>
          <button id="session-increment" onClick={() => incrementSession(1)}>MORE</button>
          <button id="session-decrement" onClick={() => incrementSession(-1)}>LESS</button>
        </div>
      </div>
      <div id="timer-controls">


      </div>
      <div id="timer">
        <p id="timer-label">{phase == "break" ? "BREAK TIME!" : "YOU CAN DO IT!"}</p>
        <p id="time-left">{formatTimeLeft(timeLeftSeconds)}</p>
      </div>
      <div id="timer-controls">
        <button id="start_stop" onClick={pause}>{isRunning ? "STOP" : "START"}</button>
        <button id="reset" onClick={reset}>RESET</button>
        <audio id="beep" src={gong}></audio>
      </div>
      
      <p>"Alto Gong, Metal Hit, B (H6 XY).wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org</p>
    </div>
  );

}

export default App
