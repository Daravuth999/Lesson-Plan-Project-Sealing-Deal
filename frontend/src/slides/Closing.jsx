import React, { useState } from "react";
import { motion } from "framer-motion";
import IntonationCurve from "../components/IntonationCurve";

/* -------------------- Screen 33 — Homework -------------------- */
export function Slide33() {
  const items = [
    {
      title: "Vocabulary",
      task: "Write one original sentence for all 11 words.",
    },
    {
      title: "Speaking Challenge",
      task: "Record Role Play Scenario 3.",
    },
    {
      title: "Self-Recording",
      task: "60-second real-life negotiation experience.",
    },
    {
      title: "Journal",
      task: "5–6 sentences on the hardest phrase to say naturally.",
    },
  ];
  const [checked, setChecked] = useState({});
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 33 · Homework
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-10">
        Four small commitments before next class.
      </h2>
      <div className="flex-1 grid grid-cols-2 gap-5 content-center">
        {items.map((it, i) => {
          const on = !!checked[i];
          return (
            <motion.button
              key={i}
              data-testid={`hw-${i}`}
              onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              className={`text-left rounded-2xl border p-6 flex items-start gap-5 transition-all ${
                on
                  ? "border-gold-300/70 bg-gold-300/10"
                  : "border-gold-300/25 bg-ink-800/40 hover:border-gold-300/50"
              }`}
            >
              <div
                className={`shrink-0 mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                  on ? "border-gold-300 bg-gold-300" : "border-gold-300/60"
                }`}
              >
                {on && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="#0B0F14"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className="mono text-xs uppercase tracking-widest text-gold-300 mb-1">
                  0{i + 1} · {it.title}
                </div>
                <div className="text-lg text-gold-50 leading-snug">{it.task}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Screen 34 — Closing -------------------- */
export function Slide34() {
  const [tick, setTick] = useState(0);
  return (
    <div className="relative h-full w-full grain flex items-center justify-center px-24">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(700px 500px at 25% 30%, rgba(222,185,102,0.14), transparent 60%), radial-gradient(600px 400px at 80% 80%, rgba(232,107,107,0.08), transparent 60%)",
        }}
      />
      <div className="relative max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mono text-xs uppercase tracking-[0.42em] text-gold-300 mb-6 flex items-center gap-4"
        >
          <span className="inline-block w-10 h-px bg-gold-300" />
          Today's Skill
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="heading-serif text-5xl text-gold-50 mb-10 leading-tight max-w-3xl"
        >
          Disagree professionally, offer compromise, and close clearly.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 mb-4"
        >
          <div className="heading-serif text-[6rem] leading-none text-gold-50 italic">
            "Let's get it signed."
          </div>
        </motion.div>
        <div className="mt-2">
          <IntonationCurve type="falling" width={520} height={90} triggerKey={tick} label="confident, falling" />
        </div>
        <button
          data-testid="closing-replay"
          onClick={() => setTick((t) => t + 1)}
          className="mt-8 mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
        >
          Replay intonation
        </button>
      </div>
    </div>
  );
}
