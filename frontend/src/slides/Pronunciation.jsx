import React, { useState } from "react";
import { motion } from "framer-motion";
import StressWord from "../components/StressWord";
import LinkingBridge from "../components/LinkingBridge";
import IntonationCurve from "../components/IntonationCurve";
import VoiceWave from "../components/VoiceWave";
import ClickReveal from "../components/ClickReveal";

/* -------------------- Screen 15 — Word Stress -------------------- */
export function Slide15() {
  const words = [
    { syls: ["com", "mit", "ment"], stress: 1 },
    { syls: ["pro", "po", "sal"], stress: 1 },
    { syls: ["im", "ple", "men", "ta", "tion"], stress: 3 },
    { syls: ["ne", "go", "ti", "ate"], stress: 1 },
    { syls: ["con", "ces", "sion"], stress: 1 },
  ];
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col justify-center">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 15 · Word Stress
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-4">
        Say <span className="italic text-gold-300">louder, longer, higher</span>.
      </h2>
      <p className="text-gray-400 mono uppercase tracking-widest text-xs mb-10">
        Tap a word to pulse the stressed syllable
      </p>
      <div className="grid grid-cols-1 gap-8 max-w-4xl">
        {words.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
          >
            <StressWord
              syllables={w.syls}
              stressedIndex={w.stress}
              testId={`stress-${w.syls.join("-")}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Screen 16 — Sound Focus -------------------- */
export function Slide16() {
  const groups = [
    {
      title: "\"-ed\" endings",
      note: "/t/, /d/, /ɪd/",
      examples: [
        { word: "signed", ipa: "/saɪnd/", sound: "/d/" },
        { word: "closed", ipa: "/kloʊzd/", sound: "/d/" },
        { word: "talked", ipa: "/tɔːkt/", sound: "/t/" },
        { word: "wanted", ipa: "/ˈwɒntɪd/", sound: "/ɪd/" },
        { word: "started", ipa: "/ˈstɑːrtɪd/", sound: "/ɪd/" },
      ],
    },
    {
      title: "TH sounds",
      note: "/θ/ vs /ð/",
      examples: [
        { word: "think", ipa: "/θɪŋk/", sound: "/θ/" },
        { word: "thanks", ipa: "/θæŋks/", sound: "/θ/" },
        { word: "this", ipa: "/ðɪs/", sound: "/ð/" },
        { word: "that", ipa: "/ðæt/", sound: "/ð/" },
        { word: "then", ipa: "/ðɛn/", sound: "/ð/" },
      ],
    },
    {
      title: "Final consonants",
      note: "don't drop the ending",
      examples: [
        { word: "costs", ipa: "/kɔːsts/", sound: "/sts/" },
        { word: "weeks", ipa: "/wiːks/", sound: "/ks/" },
        { word: "terms", ipa: "/tɜːrmz/", sound: "/mz/" },
        { word: "signed", ipa: "/saɪnd/", sound: "/nd/" },
      ],
    },
  ];
  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 16 · Sound Focus
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-8">
        Three sound patterns to master.
      </h2>
      <div className="grid grid-cols-3 gap-6 flex-1">
        {groups.map((g, gi) => (
          <div
            key={gi}
            className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-5 flex flex-col"
          >
            <div className="heading-serif text-3xl text-gold-50 mb-1">{g.title}</div>
            <div className="mono text-xs text-gold-300 mb-4">{g.note}</div>
            <ClickReveal
              label="Reveal examples"
              hiddenLabel="Hide"
              testId={`sound-${gi}`}
            >
              <ul className="space-y-2 mt-1">
                {g.examples.map((e, i) => (
                  <li key={i} className="flex items-baseline justify-between text-sm">
                    <span className="text-gold-50 heading-serif text-lg">{e.word}</span>
                    <span className="mono text-xs text-gold-300">{e.ipa}</span>
                    <span className="mono text-xs text-thoughtful">{e.sound}</span>
                  </li>
                ))}
              </ul>
            </ClickReveal>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Screen 17 — Linking Sounds -------------------- */
export function Slide17() {
  const items = [
    { from: "want", to: "to", result: "wanna" },
    { from: "going", to: "to", result: "gonna" },
    { from: "did", to: "you", result: "didja" },
    { from: "a lot", to: "of", result: "alotta" },
    { from: "I'll be", to: "upfront", result: "a'll-be-upfront" },
    { from: "What if", to: "we", result: "wha-tif-we" },
  ];
  return (
    <div className="h-full w-full px-16 py-10 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 17 · Linking Sounds
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-3">
        Words <span className="italic text-gold-300">glue together</span> in natural speech.
      </h2>
      <p className="text-gray-400 mono uppercase tracking-widest text-xs mb-8">
        The bridge shows where the sounds link
      </p>
      <div className="grid grid-cols-3 gap-x-10 gap-y-14 flex-1 items-center">
        {items.map((it, i) => (
          <LinkingBridge key={i} {...it} index={i} />
        ))}
      </div>
    </div>
  );
}

/* -------------------- Screen 18 — Rhythm Practice -------------------- */
export function Slide18() {
  const [mode, setMode] = useState("slow");
  const [showAll, setShowAll] = useState(false);
  // Sentence: "What if we found a compromise?"
  const parts = [
    { text: "What", stressed: false },
    { text: "if", stressed: false },
    { text: "we", stressed: false },
    { text: "found", stressed: true },
    { text: "a", stressed: false },
    { text: "compromise", stressed: true },
  ];
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 18 · Rhythm Practice
        </div>
        <div className="flex gap-2">
          <button
            data-testid="rhythm-slow"
            onClick={() => setMode("slow")}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              mode === "slow"
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            Slow
          </button>
          <button
            data-testid="rhythm-natural"
            onClick={() => setMode("natural")}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              mode === "natural"
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            Natural
          </button>
          <button
            data-testid="rhythm-toggle-full"
            onClick={() => setShowAll((v) => !v)}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              showAll
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            {showAll ? "Only stressed" : "Full sentence"}
          </button>
        </div>
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-3">
        Stressed words carry the meaning.
      </h2>
      <p className="text-gray-400 mono uppercase tracking-widest text-xs mb-8">
        Step 1 · Say only the stressed words &nbsp;·&nbsp; Step 2 · Say the whole sentence naturally
      </p>

      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <div className="flex items-end gap-3 flex-wrap justify-center">
          {parts.map((p, i) => (
            <motion.span
              key={i}
              className={`heading-serif ${
                p.stressed
                  ? "text-6xl text-gold-50"
                  : showAll
                  ? "text-2xl text-gray-500"
                  : "text-xl text-gray-800 opacity-30"
              }`}
              animate={p.stressed ? { y: [0, -4, 0], opacity: [1, 1, 1] } : {}}
              transition={p.stressed ? { repeat: Infinity, duration: 1.4, delay: i * 0.15 } : {}}
            >
              {p.text}
            </motion.span>
          ))}
          <span className="heading-serif text-4xl text-gold-300 ml-1">?</span>
        </div>
        <div>
          <VoiceWave width={720} height={60} mode={mode} />
        </div>
      </div>
    </div>
  );
}

/* -------------------- Screen 19 — Intonation Types -------------------- */
export function Slide19() {
  const [tick, setTick] = useState(0);
  const types = [
    { key: "rising", label: "Rising", desc: "Yes/no questions, polite checks", color: "#5FCF80" },
    { key: "falling", label: "Falling", desc: "Confident statements", color: "#E86B6B" },
    { key: "rise-fall", label: "Rise–Fall", desc: "Emphasis, strong opinion", color: "#DEB966" },
    { key: "fall-rise", label: "Fall–Rise", desc: "Thoughtful, polite hesitation", color: "#6BA8E8" },
  ];
  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 19 · Intonation Types
        </div>
        <button
          data-testid="intonation-replay"
          onClick={() => setTick((t) => t + 1)}
          className="mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
        >
          Replay all
        </button>
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-8">
        Four melodies — four meanings.
      </h2>
      <div className="grid grid-cols-2 gap-8 flex-1 items-center">
        {types.map((t, i) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="border border-gold-300/20 bg-ink-800/40 rounded-2xl p-6"
          >
            <div className="mono text-xs uppercase tracking-widest mb-1" style={{ color: t.color }}>
              {t.label}
            </div>
            <div className="text-lg text-gold-50 mb-4">{t.desc}</div>
            <IntonationCurve type={t.key} width={360} height={80} triggerKey={tick} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
