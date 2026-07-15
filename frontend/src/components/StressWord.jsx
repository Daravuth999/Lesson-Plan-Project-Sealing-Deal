import React, { useState } from "react";

/**
 * StressWord — renders a word broken into syllables where the stressed one pulses.
 * syllables: array; stressedIndex: 0-based position of stress.
 */
export default function StressWord({ syllables, stressedIndex, testId }) {
  const [active, setActive] = useState(false);
  return (
    <button
      data-testid={testId}
      type="button"
      onClick={() => setActive((v) => !v)}
      className="inline-flex items-baseline gap-0.5 heading-serif text-4xl text-gold-50 hover:text-gold-100 transition-colors"
    >
      {syllables.map((s, i) => (
        <span key={i} className="inline-flex items-baseline">
          <span className={i === stressedIndex && active ? "stress-pulse" : ""}>
            {i === stressedIndex ? s.toUpperCase() : s.toLowerCase()}
          </span>
          {i < syllables.length - 1 && <span className="text-gold-300/60 mx-0.5">·</span>}
        </span>
      ))}
    </button>
  );
}
