import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [position, setPosition] = useState(null);
  const [time, setTime] = useState([]);
  const [lastMoveTimestamp, setLastMoveTimestamp] = useState(null);

  useEffect(() => {
    if (isActive && !isPause) {
      const id = setInterval(() => {
        moveBox();
      }, 5000);
      return () => clearInterval(id);
    }
  }, [isActive, isPause]);

  const moveBox = () => {
    let x = Math.floor(Math.random() * 400);
    let y = Math.floor(Math.random() * 200);
    setPosition({ x, y });
    setLastMoveTimestamp(Date.now());
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPause(false);
    moveBox();
  };

  const handleBox = (e) => {
    console.log(e.target)
    if (!lastMoveTimestamp) return;
    const reactionTime = (Date.now() - lastMoveTimestamp) / 1000;
    setTime((prev) => [...prev, reactionTime.toFixed(2)]);
    moveBox();
    setIsPause(false);
  };

  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPause(false);
    setPosition(null);
    setTime([]);
    setLastMoveTimestamp(null);
  };

  return (
    <div className="app">
      <div className="btn-container">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="playground">
        {position && (
          <div
            className={isActive ? "box" : ""}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
            onClick={handleBox}
          ></div>
        )}
      </div>
      <div className="time">
        <table>
          <thead>
            <tr>
              <th>Mouse Click</th>
              <th>Reaction Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            {time.map((time, index) => (
              <tr key={index}>
                <td>{index + 1} click</td>
                <td>{time} seconds</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
