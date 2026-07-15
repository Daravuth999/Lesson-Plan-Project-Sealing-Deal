import React from "react";
import { motion } from "framer-motion";
import { IMAGE_URL } from "../data/lesson";
import Timer from "../components/Timer";
import ClickReveal from "../components/ClickReveal";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* -------------------- Screen 1 — Title -------------------- */
export function Slide01() {
  return (
    <div className="relative h-full w-full flex items-center justify-center px-24 grain">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px 400px at 25% 40%, rgba(222,185,102,0.16), transparent 60%), radial-gradient(700px 500px at 80% 70%, rgba(107,168,232,0.10), transparent 60%)",
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-5xl"
      >
        <motion.div
          variants={item}
          className="mono text-xs uppercase tracking-[0.42em] text-gold-300 mb-8 flex items-center gap-4"
        >
          <span className="inline-block w-10 h-px bg-gold-300" />
          English Speaking Lab
          <span className="text-gold-500">·</span>
          Professional English
        </motion.div>
        <motion.h1
          variants={item}
          className="heading-serif text-[7rem] leading-[0.95] text-gold-50 mb-4 tracking-tight"
        >
          Sealing<span className="italic text-gold-300"> the</span> Deal
        </motion.h1>
        <motion.h2
          variants={item}
          className="heading-serif text-3xl italic text-gray-300 max-w-2xl mb-10"
        >
          Client Meetings &amp; Negotiation
        </motion.h2>
        <motion.div variants={item} className="flex items-center gap-4">
          <span className="inline-block w-12 h-px bg-gold-300/60" />
          <span className="mono text-[11px] uppercase tracking-[0.35em] text-gray-400">
            Instructor-led · 34 Screens · Zoom Studio
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* -------------------- Screen 2 — Outcomes -------------------- */
export function Slide02() {
  const outcomes = [
    "Negotiate confidently in English business meetings",
    "Handle pushback diplomatically without losing ground",
    "Close a deal professionally, in writing and in voice",
    "Use stress, rhythm, linking, and intonation to sound native",
  ];
  return (
    <div className="h-full w-full px-24 py-20 flex flex-col justify-center">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-4">
        Screen 02 · Learning Outcomes
      </div>
      <h2 className="heading-serif text-6xl text-gold-50 mb-14 max-w-3xl">
        By the end of today, you will…
      </h2>
      <motion.ol
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 max-w-4xl"
      >
        {outcomes.map((o, i) => (
          <motion.li
            key={i}
            variants={item}
            className="flex items-start gap-6 group"
          >
            <span className="mono text-gold-300 text-sm mt-2 tabular-nums">
              0{i + 1}
            </span>
            <span className="text-2xl text-gray-200 leading-snug group-hover:text-white transition-colors">
              {o}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

/* -------------------- Screen 3 — Picture Observation -------------------- */
export function Slide03() {
  const qs = [
    "What can you see in the picture?",
    "Where are the people?",
    "What does the room tell you about the company?",
    "What are the two people doing with their hands and body language?",
  ];
  return (
    <div className="h-full w-full px-16 py-14 grid grid-cols-12 gap-10 items-center">
      <div className="col-span-7 relative">
        <motion.img
          src={IMAGE_URL}
          alt="Negotiation meeting"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-auto rounded-2xl shadow-stage border border-gold-300/15"
          data-testid="observation-image"
        />
        <div className="absolute -top-3 -left-3 mono text-[10px] tracking-[0.28em] uppercase text-gold-300 bg-ink-900/80 border border-gold-300/30 rounded-full px-3 py-1">
          Observation
        </div>
      </div>
      <div className="col-span-5">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
          Screen 03
        </div>
        <h2 className="heading-serif text-5xl text-gold-50 mb-8 leading-tight">
          What do you notice?
        </h2>
        <motion.ol
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-5"
        >
          {qs.map((q, i) => (
            <motion.li
              key={i}
              variants={item}
              className="flex items-start gap-4 text-gray-200 text-lg leading-snug"
            >
              <span className="mono text-gold-300 text-xs mt-1.5 tabular-nums">
                Q{i + 1}
              </span>
              <span className="cue-word">{q}</span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

/* -------------------- Screen 4 — Speaking Challenge -------------------- */
export function Slide04() {
  const prompts = [
    "How does each person probably feel?",
    "What happened just before this moment?",
    "What will happen next?",
    "If you were sitting at this table, what would you say first?",
  ];
  return (
    <div className="h-full w-full px-20 py-16 grid grid-cols-12 gap-10">
      <div className="col-span-5 flex flex-col justify-center">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
          Screen 04 · Speaking Challenge
        </div>
        <h2 className="heading-serif text-6xl leading-[1] text-gold-50 mb-6">
          Describe the picture
          <br />
          <span className="italic text-gold-300">out loud.</span>
        </h2>
        <p className="mono text-sm tracking-widest text-gray-400 uppercase mb-8">
          30–60 seconds · No script
        </p>
        <div className="mb-8">
          <Timer seconds={60} testId="speaking-timer" />
        </div>
        <img
          src={IMAGE_URL}
          alt="Meeting"
          className="w-full h-40 object-cover rounded-lg border border-gold-300/15"
        />
      </div>
      <div className="col-span-7 flex flex-col justify-center">
        <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300 mb-4">
          Optional Prompts
        </div>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {prompts.map((p, i) => (
            <motion.li
              key={i}
              variants={item}
              className="text-2xl text-gray-200 leading-snug flex gap-4 cue-word rounded-md p-2"
            >
              <span className="mono text-gold-300 text-sm mt-2">→</span>
              {p}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

/* -------------------- Screen 5 — Prediction -------------------- */
export function Slide05() {
  const qs = [
    "What is the conversation about?",
    "Who speaks first?",
    "What is the problem?",
    "How does it end?",
  ];
  return (
    <div className="h-full w-full px-24 py-16 flex flex-col justify-center">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
        Screen 05 · Prediction
      </div>
      <h2 className="heading-serif text-6xl text-gold-50 mb-14 max-w-4xl leading-[1.05]">
        Before you listen, <span className="italic text-gold-300">guess</span>.
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-x-16 gap-y-8 max-w-5xl"
      >
        {qs.map((q, i) => (
          <motion.div
            key={i}
            variants={item}
            className="flex items-start gap-5 border-l border-gold-300/40 pl-6"
          >
            <span className="mono text-gold-300 text-xs mt-2 tabular-nums">
              Q{i + 1}
            </span>
            <div className="text-2xl text-gray-100 leading-snug">{q}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------- Screen 6 — Warm-up Discussion -------------------- */
export function Slide06() {
  const qs = [
    "Think of a time you negotiated. How did you feel?",
    "What's more important: best price or good relationship?",
    "Which style works best for you: loud/direct or quiet/indirect?",
    "Have you walked away from a deal? Why?",
    "What skill makes a great negotiator?",
  ];
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col justify-center">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
        Screen 06 · Warm-up Discussion
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-4 max-w-4xl">
        Talk to your partner.
      </h2>
      <p className="italic text-gold-300/80 text-lg heading-serif mb-10">
        "Explain <span className="underline decoration-gold-300/60">why</span>, not just what."
      </p>
      <motion.ol
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-x-14 gap-y-5 max-w-6xl"
      >
        {qs.map((q, i) => (
          <motion.li
            key={i}
            variants={item}
            className="text-xl text-gray-200 leading-snug flex gap-4 group cursor-pointer rounded-md p-2 hover:bg-gold-300/5"
          >
            <span className="mono text-gold-300 text-xs mt-1.5 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="group-hover:text-gold-50 transition-colors">{q}</span>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
