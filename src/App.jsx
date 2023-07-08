import { useState, useRef, useEffect } from 'react'

import './App.css'

function App() {

    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [timeLeft, setTimeLeft] = useState(sessionLength)
    const [deadline, setDeadline] = useState(new Date().getTime())

    const calculateTimeLeft = ()=>{
      let current = new Date().getTime()
      return deadline-current
    }

    const delay = ms => new Promise(res=> setTimeout(res,ms))

    delay(5000).then(console.log(calculateTimeLeft()))
    
    


    return (
      <div className="App">
        <header><h1>25 + 5 Clock</h1></header>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLength}</p>
      <p id="session-label">Session</p>
      <p id="session-length">{sessionLength}</p>
      <p id="timer-label">Timer</p>
      <p id="time-left">{timeLeft}</p>

      </div>
    );
  
}

export default App
