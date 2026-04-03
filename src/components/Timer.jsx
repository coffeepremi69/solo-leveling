import { useState, useEffect } from 'react';

const Timer = ({ onComplete }) => {
  const [time, setTime] = useState(5 * 60); // 5 min
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0) {
      onComplete();
      setIsRunning(false);
    }
  }, [time, onComplete]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="section glow">
      <h2>Workout Timer</h2>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-controls">
        {!isRunning ? (
          <button className="task-btn glow" onClick={() => {
            setTime(5 * 60);
            setIsRunning(true);
          }}>Start 5min</button>
        ) : (
          <button className="task-btn" onClick={() => setIsRunning(false)}>Pause</button>
        )}
      </div>
    </div>
  );
};

export default Timer;

