import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPREHENSION } from "../data/lesson";

/* -------------------- Screen 25 — Comprehension -------------------- */
export function Slide25() {
  const groups = [
    { key: "facts", label: "Facts", color: "text-thoughtful", border: "border-thoughtful/40", questions: COMPREHENSION.facts },
    { key: "reasoning", label: "Reasoning", color: "text-gold-300", border: "border-gold-300/40", questions: COMPREHENSION.reasoning },
    { key: "evaluation", label: "Evaluation", color: "text-fall", border: "border-fall/40", questions: COMPREHENSION.evaluation },
  ];
  return (
    <div className="h-full w-full px-14 py-10 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 25 · Comprehension Questions
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-6">
        Facts → Reasoning → Evaluation
      </h2>
      <div className="grid grid-cols-3 gap-5 flex-1 overflow-hidden">
        {groups.map((g, gi) => (
          <div
            key={g.key}
            className={`rounded-2xl border ${g.border} bg-ink-800/30 p-5 flex flex-col`}
          >
            <div className={`mono text-xs uppercase tracking-widest ${g.color} mb-4`}>
              {g.label}
            </div>
            <ol className="space-y-3 overflow-y-auto scroll-elegant pr-1">
              {g.questions.map((q, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (gi * 3 + i), duration: 0.35 }}
                  className="text-[15px] leading-snug text-gray-100 flex gap-3 rounded-md p-2 cue-word"
                >
                  <span className="mono text-[10px] text-gold-300 mt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{q}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Screen 26 — Reflection -------------------- */
export function Slide26() {
  const items = [
    "Think about a negotiation in your own job or life. What compromise could you have offered instead of just saying no?",
    "Which phrase from today's lesson could you use in your next negotiation? Why that one?",
    "How comfortable are you disagreeing with someone at work? What would help you feel more confident?",
  ];
  const [i, setI] = useState(0);
  return (
    <div className="h-full w-full px-24 py-16 flex flex-col justify-center">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 26 · Reflection
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-3">
        Turn it inward.
      </h2>
      <p className="mono text-xs uppercase tracking-widest text-gray-500 mb-14">
        Question {i + 1} of {items.length}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="heading-serif italic text-[2.4rem] leading-snug text-gold-50 max-w-4xl border-l-2 border-gold-300/60 pl-8"
        >
          "{items[i]}"
        </motion.div>
      </AnimatePresence>
      <div className="mt-14 flex gap-2">
        {items.map((_, k) => (
          <button
            key={k}
            data-testid={`reflect-${k}`}
            onClick={() => setI(k)}
            className={`w-16 h-1 rounded-full transition-all ${
              i === k ? "bg-gold-300" : "bg-ink-600 hover:bg-gold-300/40"
            }`}
            aria-label={`Reflection ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------- Screen 27 — Controlled Speaking -------------------- */
export function Slide27() {
  const stems = [
    "I'll be upfront about...",
    "My team is usually flexible when...",
    "A concession I'd be willing to make is...",
    "I think the best compromise would be...",
    "A commitment I'm proud of is...",
  ];
  const [active, setActive] = useState(null);

  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 27 · Controlled Speaking
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-8">
        Finish the sentence — out loud.
      </h2>
      <div className="flex-1 grid grid-cols-1 gap-3 content-center max-w-5xl mx-auto w-full">
        {stems.map((s, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={i}
              data-testid={`stem-${i}`}
              onClick={() => setActive(isActive ? null : i)}
              layout
              className={`text-left rounded-xl border p-5 flex items-baseline gap-5 transition-all ${
                isActive
                  ? "border-gold-300 bg-gold-300/10 py-8"
                  : "border-gold-300/20 bg-ink-800/40 hover:border-gold-300/50"
              }`}
            >
              <span className="mono text-xs text-gold-300 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`heading-serif italic text-gold-50 transition-all ${
                  isActive ? "text-5xl" : "text-2xl"
                }`}
              >
                "{s}"
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
