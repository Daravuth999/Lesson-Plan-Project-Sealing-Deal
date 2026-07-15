import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROLEPLAY_SCENARIOS, PHRASE_BANK } from "../data/lesson";
import Timer from "../components/Timer";

/* -------------------- Screen 28 — Role Play Menu -------------------- */
export function Slide28() {
  return (
    <div className="h-full w-full px-16 py-14 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 28 · Role Play Menu
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-10">
        Choose your scenario.
      </h2>
      <div className="grid grid-cols-3 gap-6 flex-1">
        {ROLEPLAY_SCENARIOS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="relative rounded-2xl border border-gold-300/25 bg-ink-800/40 p-6 flex flex-col overflow-hidden group hover:border-gold-300/60 transition-all"
          >
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-40 group-hover:opacity-70 transition-opacity"
              style={{
                background:
                  "radial-gradient(circle, rgba(222,185,102,0.35) 0%, transparent 70%)",
              }}
            />
            <div className="mono text-xs uppercase tracking-widest text-gold-300 mb-3">
              Scenario 0{s.id}
            </div>
            <div className="heading-serif text-3xl text-gold-50 mb-1">
              {s.title}
            </div>
            <div className="italic text-gray-400 mb-4">{s.tagline}</div>
            <div className="text-sm text-gray-200 leading-relaxed">
              {s.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Screen 29 — Scenario View -------------------- */
export function Slide29() {
  const [i, setI] = useState(0);
  const s = ROLEPLAY_SCENARIOS[i];
  return (
    <div className="h-full w-full px-14 py-10 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 29 · Scenario View
        </div>
        <div className="flex gap-2">
          {ROLEPLAY_SCENARIOS.map((sc, k) => (
            <button
              key={sc.id}
              data-testid={`scenario-tab-${sc.id}`}
              onClick={() => setI(k)}
              className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                i === k
                  ? "border-gold-300 bg-gold-300/15 text-gold-50"
                  : "border-gold-300/25 text-gray-400"
              }`}
            >
              0{sc.id} {sc.title}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="heading-serif text-5xl text-gold-50 mb-1">{s.title}</h2>
          <p className="italic text-gold-300 mb-6">{s.tagline}</p>
          <p className="text-lg text-gray-100 max-w-4xl mb-8 leading-relaxed">
            {s.detail}
          </p>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="rounded-2xl border border-gold-300/30 bg-gold-300/5 p-6">
              <div className="mono text-xs uppercase tracking-widest text-gold-300 mb-2">
                Role A
              </div>
              <div className="text-xl text-gold-50 leading-snug">{s.roleA}</div>
            </div>
            <div className="rounded-2xl border border-thoughtful/30 bg-thoughtful/5 p-6">
              <div className="mono text-xs uppercase tracking-widest text-thoughtful mb-2">
                Role B
              </div>
              <div className="text-xl text-gold-50 leading-snug">{s.roleB}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------- Screen 30 — Phrase Bank -------------------- */
export function Slide30() {
  const [i, setI] = useState(null);
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 30 · Role Play Language Support
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-3">
        Use these phrases in your role play.
      </h2>
      <p className="mono text-xs uppercase tracking-widest text-gray-500 mb-10">
        Click a phrase to enlarge
      </p>
      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-2 gap-x-14 gap-y-6 max-w-6xl mx-auto">
          {PHRASE_BANK.map((p, k) => {
            const active = i === k;
            return (
              <motion.button
                key={k}
                data-testid={`phrase-${k}`}
                onClick={() => setI(active ? null : k)}
                layout
                className={`text-left transition-all rounded-xl px-5 py-4 border ${
                  active
                    ? "border-gold-300 bg-gold-300/10"
                    : "border-transparent hover:border-gold-300/30 hover:bg-gold-300/5"
                }`}
              >
                <span className="mono text-[10px] uppercase tracking-widest text-gold-300 mr-3">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span
                  className={`heading-serif italic transition-all ${
                    active ? "text-4xl text-gold-50" : "text-2xl text-gray-100"
                  }`}
                >
                  {p}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Screen 31 — Spontaneous Speaking -------------------- */
export function Slide31() {
  return (
    <div className="h-full w-full px-24 py-14 flex flex-col justify-center">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 31 · Spontaneous Speaking
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-3 max-w-4xl">
        Talk for <span className="italic text-gold-300">60–90 seconds</span> about a real negotiation.
      </h2>
      <p className="text-gray-400 mono uppercase tracking-widest text-xs mb-12">
        Use each keyword at least once
      </p>
      <div className="flex gap-8 items-center mb-12">
        {["compromise", "leverage", "trust"].map((k, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.5 }}
            className="rounded-2xl border border-gold-300/30 bg-gold-300/5 px-8 py-6"
          >
            <div className="mono text-[10px] uppercase tracking-widest text-gold-300 mb-1">
              Keyword
            </div>
            <div className="heading-serif text-4xl text-gold-50">{k}</div>
          </motion.div>
        ))}
      </div>
      <div>
        <Timer seconds={90} testId="spontaneous-timer" />
      </div>
    </div>
  );
}

/* -------------------- Screen 32 — Fluency Upgrade -------------------- */
export function Slide32() {
  const rounds = [
    {
      title: "Round 01",
      focus: "Fluency",
      note: "Speak without stopping. Don't correct. Just flow.",
    },
    {
      title: "Round 02",
      focus: "Precision",
      note: "Pronunciation, stress, linking, rhythm.",
    },
    {
      title: "Round 03",
      focus: "Delivery",
      note: "Confidence, eye contact, expressive intonation.",
    },
  ];
  const [step, setStep] = useState(0);
  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 32 · Fluency Upgrade
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-10">
        Repeat the same story — three times, three ways.
      </h2>
      <div className="flex-1 grid grid-cols-3 gap-6">
        {rounds.map((r, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <motion.button
              key={i}
              data-testid={`fluency-${i}`}
              onClick={() => setStep(i)}
              whileHover={{ y: -2 }}
              className={`text-left rounded-2xl border p-6 flex flex-col transition-all ${
                active
                  ? "border-gold-300 bg-gold-300/10"
                  : done
                  ? "border-gold-300/40 bg-ink-800/40 opacity-70"
                  : "border-gold-300/20 bg-ink-800/40"
              }`}
            >
              <div className="mono text-[10px] uppercase tracking-widest text-gold-300 mb-1">
                {r.title}
              </div>
              <div className="heading-serif text-5xl text-gold-50 mb-2">
                {r.focus}
              </div>
              <div className="text-gray-300 text-sm leading-relaxed">{r.note}</div>
              <div className="mt-6">
                <div className="w-full h-1 rounded-full bg-ink-700 overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-300"
                    initial={{ width: 0 }}
                    animate={{ width: done || active ? "100%" : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="mt-8 flex gap-3 justify-center">
        <button
          data-testid="fluency-back"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
        >
          Previous round
        </button>
        <button
          data-testid="fluency-forward"
          onClick={() => setStep((s) => Math.min(2, s + 1))}
          className="mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-gold-300 bg-gold-300/15 text-gold-50"
        >
          Next round
        </button>
      </div>
    </div>
  );
}
