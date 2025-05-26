import { useEffect, useState } from "react";
import "./App.css";
import alaramSound from "./assets/audio/alaramSound.wav";
import tikSound from "./assets/audio/ClickSound.wav";
function App() {
  const [isStart, setIsStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerID, setTimerID] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const timerEndAudio = new Audio(alaramSound);
  const tik = new Audio(tikSound);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert("please provide valid input!!!");
    } else {
      setIsStart(true);
    }
  };

  const handleReset = () => {
    tik.pause();
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerID);
  };
  const handleInput = (e) => {
    let type = e.target.id;
    let value = parseInt(e.target.value);
    if (type == "hours") {
      setHours(value);
    } else if (type == "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const handlePause = () => {
    setIsPaused(false);
    clearInterval(timerID);
    tik.pause();
  };

  const handleResume = () => {
    setIsPaused(true);
    tik.play();
    runTimer(seconds, minutes, hours, timerID);
  };

  const runTimer = (sec, min, hr, tid) => {
    tik.play();
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      tik.pause();
      timerEndAudio.play();
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setIsStart(false);
      clearInterval(tid);

      alert("timer finished!! click OK");
      timerEndAudio.pause();
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerID(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);

  return (
    <>
      {!isStart && (
        <>
          <div>
            <input
              onChange={handleInput}
              id="hours"
              type="text"
              placeholder="HH"
            />
            <input
              onChange={handleInput}
              id="minutes"
              type="text"
              placeholder="MM"
            />
            <input
              onChange={handleInput}
              id="seconds"
              type="text"
              placeholder="SS"
            />
          </div>
          <div>
            <button onClick={handleStart}>Start</button>
          </div>
        </>
      )}
      {isStart && (
        <>
          <div>
            <span>{hours < 10 ? `0${hours}` : hours}:</span>
            <span>{minutes < 10 ? `0${minutes}` : minutes}:</span>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
          <div>
            {isPaused ? (
              <button onClick={handlePause}>Pause</button>
            ) : (
              <button onClick={handleResume}>Resume</button>
            )}
            <button onClick={handleReset}>Reset</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
