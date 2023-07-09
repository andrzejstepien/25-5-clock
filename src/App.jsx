import { useState, useRef, useEffect } from 'react'
import gong from "/src/assets/411574__inspectorj__alto-gong-metal-hit-b-h6-xy.wav"
import './App.css'
import plusSVG from "/src/assets/plus-square.svg"
import minusSVG from "/src/assets/minus-square.svg"
import resetSVG from "/src/assets/arrow-reload.svg"
import startSVG from "/src/assets/play-pause-white.svg"
import stopSVG from "/src/assets/play-pause-black.svg"


function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(sessionLength * 60)
  const [isRunning, setisRunning] = useState(false)
  const [phase, setPhase] = useState("session")
  const [phrase, setPhrase] = useState("")

  useEffect(()=>{
    randomizePhrase()
  },[])

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

  useEffect(()=>{
    randomizePhrase()
  },[phase])



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

  const phraseArrays = {
    break:[
      "You deserve a break!",
      "Now, breathe!",
      "Time to take a breather!",
      "And rest!"
    ],
    session:[
      "You can do it!",
      "Keep going!",
      "Back to work!",
      "Power through!"
    ]
  

  }
  const randomElem = (array)=>{
    
    return array[Math.floor(Math.random()*(array.length-1))]
  }

  const randomizePhrase = ()=>{
    setPhrase(randomElem(phraseArrays[phase]))
  }

  console.log(randomElem(phraseArrays[phase]))

  return (
    <div id="bg" className={phase}>
    <div className="App">
      <header><h1>25 + 5 Clock</h1></header>
      <div id="phase-controls">
        <div id="break-controls">
          <p id="break-label" className="phase-label">Break</p>
          <p id="break-length" className='length'>{breakLength}</p>
          <img id="break-increment" className="clickable" src={plusSVG} onClick={() => incrementBreak(1)}/>
          <img id="break-decrement" className="clickable" src={minusSVG} onClick={() => incrementBreak(-1)}/>
        </div>
        <div id="session-controls">
          <p id="session-label" className="phase-label">Session</p>
          <p id="session-length" className='length'>{sessionLength}</p>
          <img id="session-increment" className="clickable" src={plusSVG} onClick={() => incrementSession(1)}/>
          <img id="session-decrement" className="clickable" src={minusSVG} onClick={() => incrementSession(-1)}/>
        </div>
      </div>
      <div id="timer-controls">


      </div>
      <div id="timer">
        <p id="timer-label">{phrase}</p>
        <p id="time-left">{formatTimeLeft(timeLeftSeconds)}</p>
      </div>
      <div id="timer-controls">
        <img id="start_stop" className="clickable" src={isRunning?stopSVG:startSVG} onClick={pause}/>
        <img id="reset" className="clickable" src={resetSVG} onClick={reset}/>
        <audio id="beep" src={gong}></audio>
      </div>
      
      <p>"Alto Gong, Metal Hit, B (H6 XY).wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org</p>
    </div>
    </div>
  );

}

export default App
