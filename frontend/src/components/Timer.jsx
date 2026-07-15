import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * Timer — flexible countdown timer for speaking activities.
 * seconds prop is the initial duration in seconds.
 */
export default function Timer({ seconds = 60, testId = "timer" }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    setRemaining(seconds);
    setRunning(false);
  }, [seconds]);

  const pct = ((seconds - remaining) / seconds) * 100;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div
      data-testid={testId}
      className="inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-ink-800/70 backdrop-blur px-4 py-2"
    >
      <div className="relative w-9 h-9">
        <svg viewBox="0 0 40 40" className="w-9 h-9 -rotate-90">
          <circle cx="20" cy="20" r="17" stroke="#2A3341" strokeWidth="3" fill="none" />
          <circle
            cx="20"
            cy="20"
            r="17"
            stroke="#DEB966"
            strokeWidth="3"
            fill="none"
            strokeDasharray={2 * Math.PI * 17}
            strokeDashoffset={2 * Math.PI * 17 * (1 - pct / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
        </svg>
      </div>
      <div className="mono text-lg tracking-widest text-gold-50 tabular-nums">
        {mm}:{ss}
      </div>
      <div className="flex items-center gap-1">
        <button
          data-testid={`${testId}-toggle`}
          onClick={() => setRunning((r) => !r)}
          className="p-1.5 rounded-full hover:bg-gold-300/15 text-gold-100"
          aria-label={running ? "Pause" : "Start"}
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          data-testid={`${testId}-reset`}
          onClick={() => {
            setRunning(false);
            setRemaining(seconds);
          }}
          className="p-1.5 rounded-full hover:bg-gold-300/15 text-gold-100"
          aria-label="Reset"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
