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
  const [sigTick, setSigTick] = useState(0);
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
          Today&apos;s Skill
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
            &ldquo;Let&apos;s get it signed.&rdquo;
          </div>
        </motion.div>
        <div className="mt-2">
          <IntonationCurve type="falling" width={520} height={90} triggerKey={tick} label="confident, falling" />
        </div>

        {/* Signature reveal on contract line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex items-center gap-6"
        >
          <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300">
            Signed
          </div>
          <div className="relative">
            <svg width="380" height="90" viewBox="0 0 380 90" className="overflow-visible">
              {/* Contract line */}
              <motion.line
                x1="0"
                y1="70"
                x2="380"
                y2="70"
                stroke="#DEB966"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              {/* Signature stroke */}
              <motion.path
                key={"sig-" + sigTick}
                d="M 8 55 C 18 25, 30 25, 40 55 S 60 78, 78 40 Q 96 8, 116 50 T 154 55 Q 178 30, 200 55 C 218 78, 240 20, 262 50 Q 288 78, 316 40 T 372 55"
                stroke="#E6B863"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: "drop-shadow(0 0 6px rgba(230,184,99,0.6))" }}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Wax seal */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "340px 30px" }}
              >
                <circle cx="340" cy="30" r="18" fill="#8E2A2A" stroke="#E6B863" strokeWidth="1.5" />
                <text
                  x="340"
                  y="35"
                  textAnchor="middle"
                  fontFamily="Cormorant Garamond, serif"
                  fontStyle="italic"
                  fontSize="16"
                  fill="#E6B863"
                >
                  S
                </text>
              </motion.g>
            </svg>
          </div>
        </motion.div>

        <div className="mt-8 flex gap-3">
          <button
            data-testid="closing-replay"
            onClick={() => setTick((t) => t + 1)}
            className="mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
          >
            Replay intonation
          </button>
          <button
            data-testid="closing-sign-again"
            onClick={() => setSigTick((t) => t + 1)}
            className="mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-gold-300 bg-gold-300/15 text-gold-50 hover:bg-gold-300/25"
          >
            Sign again
          </button>
        </div>
      </div>
    </div>
  );
}
