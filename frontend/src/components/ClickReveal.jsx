import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * ClickReveal — a button that toggles a hidden answer/panel with elegant motion.
 * Used for hidden answers, definitions, strategy examples, etc.
 */
export default function ClickReveal({
  label = "Reveal",
  hiddenLabel = "Hide",
  children,
  testId = "click-reveal",
  variant = "chip",
  className = "",
}) {
  const [open, setOpen] = useState(false);

  const chip =
    "inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-ink-800/60 hover:bg-ink-700 text-gold-100 hover:text-gold-50 px-4 py-1.5 text-xs mono uppercase tracking-widest transition-colors";
  const ghost =
    "inline-flex items-center gap-2 rounded-md border border-gold-300/25 bg-transparent hover:bg-gold-300/10 text-gold-100 px-3 py-1 text-xs mono uppercase tracking-widest transition-colors";

  return (
    <div className={className}>
      <button
        data-testid={testId}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={variant === "ghost" ? ghost : chip}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-300" />
        {open ? hiddenLabel : label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
