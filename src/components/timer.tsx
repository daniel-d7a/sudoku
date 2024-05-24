import { useEffect, useState } from "react";
import { useBoard } from "../logic/board.logic";

export default function Timer() {
  const startTime = useBoard((s) => s.startTime);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      setMinutes(Math.floor(diff / 1000 / 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startTime]);

  if (!startTime) return <div>00:00</div>;

  return (
    <div>
      {minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")}
    </div>

    // 01
  );
}
