import React, { useState, useEffect, useMemo } from "react";

export default function Timer() {
  const startTime = useMemo(() => Date.now(), []);
  const [currentTime, setCurrentTime] = useState(startTime);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);

    return () => clearInterval(interval);
  }, []);

  const diff = currentTime - startTime;
  let seconds = `${Math.floor((diff / 1000) % 60)}`.padStart(2, "0");
  let minutes = `${Math.floor((diff / 1000 / 60) % 60)}`.padStart(2, "0");

  return (
    <div className="timer">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}
