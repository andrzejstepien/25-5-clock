import { useState, useRef, useEffect } from 'react'

import './App.css'
function App() {

    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(sessionLength*60)
    const [deadline, setDeadline] = useState(new Date().getTime())
    const [paused, setPaused] = useState(true)

    useEffect(()=>{
      const timer = setTimeout(()=>{
        if(!paused){
          setTimeLeftInSeconds(calculateTimeLeft())
        }
        }
        ,1000)
      return ()=>clearTimeout(timer)
    })

    const calculateTimeLeft = ()=>{
      let current = new Date().getTime()/1000
      return Math.floor(deadline-current)
    }

    const formatTimeLeft = (timeLeftInSeconds)=>{
      const minutes = Math.floor(timeLeftInSeconds/60)
      const seconds = (timeLeftInSeconds%60)
      return minutes.toString()+":"+seconds.toString()
    }


    const resetDeadline = ()=>{
      setDeadline(()=>{
        const current = new Date().getTime()/1000
        return current+timeLeftInSeconds
      })
    }

    const pause = ()=>{
      if(paused){
        resetDeadline()
        setPaused(false)
      }else{setPaused(true)}
    }
    const reset = ()=>{
      pause()
      setTimeLeftInSeconds(sessionLength*60)
      resetDeadline()
    }
    const incrementBreak = (x)=>{
      setBreakLength(prev=>prev+x)
    }
    const incrementSession = (x)=>{
      setSessionLength(prev=>prev+x)
    }
    


    return (
      <div className="App">
        <header><h1>25 + 5 Clock</h1></header>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLength}</p>
      <button id="increment-break-length" onClick={()=>incrementBreak(1)}>MORE</button>
      <button id="increment-break-length" onClick={()=>incrementBreak(-1)}>LESS</button>
      <p id="session-label">Session</p>
      <p id="session-length">{sessionLength}</p>
      <button id="increment-session-length" onClick={()=>incrementSession(1)}>MORE</button>
      <button id="increment-session-length" onClick={()=>incrementSession(-1)}>LESS</button>
      <p id="timer-label">Timer</p>
      <p id="time-left">{formatTimeLeft(timeLeftInSeconds)}</p>
      <button onClick={pause}>PAUSE</button>
      <p>{paused?"PAUSED":"NOT PAUSED"}</p>
      <button onClick={reset}>RESET</button>
      <p>{"deadline: "+deadline}</p>

      </div>
    );
  
}

export default App
