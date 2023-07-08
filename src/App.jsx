import { useState } from 'react'

import './App.css'

function App() {

    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [timeLeft, setTimeLeft] = useState(sessionLength)
  
    return (
      <div className="App">
        <header><h1>25 + 5 Clock</h1></header>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLength}</p>
      <p id="session-label">Session</p>
      <p id="session-length">{sessionLength}</p>
      </div>
    );
  
}

export default App
