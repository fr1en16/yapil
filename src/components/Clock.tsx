"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Calculate UTC+5 time
      // now.getTime() + now.getTimezoneOffset()*60*1000 gives UTC time in ms
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const utc5Time = new Date(utcTime + 5 * 60 * 60 * 1000);

      const hh = String(utc5Time.getHours()).padStart(2, "0");
      const mm = String(utc5Time.getMinutes()).padStart(2, "0");
      const ss = String(utc5Time.getSeconds()).padStart(2, "0");
      setTimeString(`${hh}:${mm}:${ss}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show placeholder during SSR to avoid hydration mismatch
  return (
    <div className="top-clock-bar" aria-label="Текущее время">
      <span>{timeString || "00:00:00"}</span>
      <span className="clock-tz">UTC 5</span>
    </div>
  );
}
