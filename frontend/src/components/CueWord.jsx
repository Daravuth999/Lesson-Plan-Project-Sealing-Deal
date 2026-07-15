import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * CueWord — a hoverable/clickable word that reveals a teaching cue.
 * Cue is temporary: clicking another CueWord (globally handled by parent) closes prior.
 */
export default function CueWord({
  word,
  cue,
  activeId,
  setActiveId,
  id,
  className = "",
  size = "md",
}) {
  const isActive = activeId === id;
  const sizeCls =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        data-testid={`cue-word-${id}`}
        type="button"
        onClick={() => setActiveId(isActive ? null : id)}
        className={`cue-word ${isActive ? "active" : ""} ${sizeCls} font-medium`}
      >
        {word}
      </button>
      <AnimatePresence>
        {isActive && cue && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 min-w-[220px] max-w-[340px]"
          >
            <span className="block rounded-xl bg-ink-800/90 backdrop-blur-md border border-gold-300/30 shadow-stage px-4 py-3 text-sm leading-relaxed text-gold-50">
              {cue}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
