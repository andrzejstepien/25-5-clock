import { useState, useRef, useEffect } from 'react'

import './App.css'
function App() {

    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(sessionLength*60)
    const [isRunning, setisRunning] = useState(false)

    useEffect(()=>{
      let timer = null
      const interval = 1000
      if(isRunning){
        timer = setInterval(()=>{
          setTimeLeftSeconds(prev=>{
            if(prev>0){return prev-interval/1000
          }else{return 0}  
          })
        },interval)
      }else{clearInterval(timer)}
      return ()=>{clearInterval(timer)}
    },[isRunning])

    useEffect(()=>{
      setTimeLeftSeconds(sessionLength*60)
    },[sessionLength])



    const formatTimeLeft = (timeLeftSeconds)=>{
      const minutes = Math.floor(timeLeftSeconds/60).toString()
      const seconds = (timeLeftSeconds%60).toString()
      const formatted = (str)=>{
        return ("0"+str).slice(-2)
      }
      return formatted(minutes)+":"+formatted(seconds)
    }



    const pause = ()=>{
      if(isRunning){
        setisRunning(false)
      }else{setisRunning(true)}
    }
    const reset = ()=>{
      setisRunning(true)
      setBreakLength(5)
      setSessionLength(25)
      setTimeLeftSeconds(sessionLength*60)
      setisRunning(false)
    }
    const incrementBreak = (x)=>{
      setBreakLength(prev=>{return increment(prev,x)})
    }
    const incrementSession = (x)=>{
      setSessionLength(prev=>{return increment(prev,x)})
    }
    const increment = (prev,x)=>{
      const canIncrement = (prev+x)>0 && (prev+x)<=60
      if(canIncrement){
        return prev+x
      }else{return prev}
    }


    return (
      <div className="App">
        <header><h1>25 + 5 Clock</h1></header>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLength}</p>
      <button id="break-decrement" onClick={()=>incrementBreak(1)}>MORE</button>
      <button id="break-increment" onClick={()=>incrementBreak(-1)}>LESS</button>
      <p id="session-label">Session</p>
      <p id="session-length">{sessionLength}</p>
      <button id="session-increment" onClick={()=>incrementSession(1)}>MORE</button>
      <button id="session-decrement" onClick={()=>incrementSession(-1)}>LESS</button>
      <p id="timer-label">Timer</p>
      <p id="time-left">{formatTimeLeft(timeLeftSeconds)}</p>
      <button id="start_stop" onClick={pause}>PAUSE</button>
      <p>{isRunning?"isRunning":"NOT isRunning"}</p>
      <button id="reset" onClick={reset}>RESET</button>


      </div>
    );
  
}

export default App
