import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntonationCurve from "../components/IntonationCurve";
import VoiceWave from "../components/VoiceWave";
import ClickReveal from "../components/ClickReveal";
import { SHADOWING_LINES, LISTENING_ITEMS, MINIMAL_PAIRS } from "../data/lesson";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* -------------------- Screen 20 — Intonation Practice -------------------- */
export function Slide20() {
  const items = [
    { text: "Can your team be ready to start the same week we sign?", suggested: "rising" },
    { text: "That's reassuring.", suggested: "falling" },
    { text: "What if we found a compromise?", suggested: "rising" },
    { text: "I'll be upfront.", suggested: "falling" },
    { text: "That could work.", suggested: "rise-fall" },
  ];
  const [i, setI] = useState(0);
  const [type, setType] = useState(items[0].suggested);
  const [tick, setTick] = useState(0);

  const pick = (idx) => {
    setI(idx);
    setType(items[idx].suggested);
    setTick((t) => t + 1);
  };
  const setCurveType = (t) => {
    setType(t);
    setTick((n) => n + 1);
  };

  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 20 · Intonation Practice
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-6">
        Say it — then trace the melody.
      </h2>
      <div className="grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-4 space-y-2 overflow-y-auto scroll-elegant pr-2">
          {items.map((it, idx) => (
            <button
              key={idx}
              data-testid={`intonation-item-${idx}`}
              onClick={() => pick(idx)}
              className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${
                i === idx
                  ? "border-gold-300/70 bg-gold-300/10 text-gold-50"
                  : "border-gold-300/20 text-gray-300 hover:border-gold-300/50 hover:text-gold-100"
              }`}
            >
              <span className="mono text-[10px] uppercase tracking-widest text-gold-300 mr-2">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {it.text}
            </button>
          ))}
        </div>
        <div className="col-span-8 flex flex-col justify-center border-l border-gold-300/15 pl-8">
          <div className="heading-serif text-3xl text-gold-50 mb-6 leading-snug min-h-[100px]">
            "{items[i].text}"
          </div>
          <div className="mb-6">
            <IntonationCurve type={type} width={560} height={120} triggerKey={tick} label={type} />
          </div>
          <div className="flex flex-wrap gap-2">
            {["rising", "falling", "rise-fall", "fall-rise"].map((t) => (
              <button
                key={t}
                data-testid={`curve-${t}`}
                onClick={() => setCurveType(t)}
                className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                  type === t
                    ? "border-gold-300 bg-gold-300/15 text-gold-50"
                    : "border-gold-300/25 text-gray-400 hover:text-gold-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Screen 21 — Shadowing Practice -------------------- */
export function Slide21() {
  const [i, setI] = useState(0);
  const [showStress, setShowStress] = useState(false);
  const [showIntonation, setShowIntonation] = useState(false);
  const [tick, setTick] = useState(0);

  const go = (d) => {
    setI((n) => Math.max(0, Math.min(SHADOWING_LINES.length - 1, n + d)));
    setTick((t) => t + 1);
  };
  const sentence = SHADOWING_LINES[i];
  // Simple stressed-word heuristic: capitalize content words > 3 letters that are not common function words.
  const stopwords = new Set([
    "the", "a", "an", "and", "or", "but", "of", "for", "in", "on", "to", "with",
    "is", "are", "was", "were", "be", "by", "that", "this", "at", "as", "so",
    "if", "our", "you", "your", "we", "i", "it", "he", "she", "they", "me", "us",
    "no", "not", "just", "will",
  ]);
  const tokens = sentence.split(/(\s+|[.,;?!—-])/);

  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 21 · Shadowing Practice
        </div>
        <div className="mono text-xs text-gray-500 tabular-nums">
          {String(i + 1).padStart(2, "0")} / {SHADOWING_LINES.length}
        </div>
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-8">
        Listen. Mirror. Repeat.
      </h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full text-center">
          <div className="heading-serif text-[2.6rem] leading-tight text-gold-50 mb-6">
            {tokens.map((t, k) => {
              const clean = t.replace(/[.,;?!—-]/g, "").toLowerCase();
              const isWord = /\w/.test(t);
              const isStressed =
                isWord && showStress && clean.length > 3 && !stopwords.has(clean);
              return (
                <span
                  key={k}
                  className={
                    isStressed
                      ? "text-white font-medium underline decoration-gold-300/70 decoration-2 underline-offset-4"
                      : ""
                  }
                >
                  {t}
                </span>
              );
            })}
          </div>
          {showIntonation && (
            <div className="flex justify-center mb-4">
              <IntonationCurve
                type={sentence.endsWith("?") ? "rising" : "falling"}
                width={480}
                height={70}
                triggerKey={tick}
              />
            </div>
          )}
          <div className="mt-2">
            <VoiceWave width={520} height={36} mode="natural" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <button
            data-testid="shadow-toggle-stress"
            onClick={() => setShowStress((v) => !v)}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              showStress
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            Show stress
          </button>
          <button
            data-testid="shadow-toggle-intonation"
            onClick={() => {
              setShowIntonation((v) => !v);
              setTick((t) => t + 1);
            }}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              showIntonation
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            Show intonation
          </button>
        </div>
        <div className="flex gap-2">
          <button
            data-testid="shadow-prev"
            onClick={() => go(-1)}
            className="p-2.5 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            data-testid="shadow-next"
            onClick={() => go(1)}
            className="p-2.5 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Screen 22 — Listening Challenge -------------------- */
export function Slide22() {
  const [openIdx, setOpenIdx] = useState(null);
  const [revealAll, setRevealAll] = useState(false);

  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 22 · Listening Challenge
        </div>
        <button
          data-testid="listen-reveal-all"
          onClick={() => setRevealAll((v) => !v)}
          className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
            revealAll
              ? "border-gold-300 bg-gold-300/15 text-gold-50"
              : "border-gold-300/25 text-gray-400"
          }`}
        >
          {revealAll ? "Hide all" : "Reveal all"}
        </button>
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-3">
        Fill the missing word.
      </h2>
      <p className="mono text-xs uppercase tracking-widest text-gray-500 mb-6">
        Click a blank to reveal
      </p>
      <div className="flex-1 grid grid-cols-2 gap-x-10 gap-y-3 content-center max-w-6xl">
        {LISTENING_ITEMS.map((item, idx) => {
          const shown = revealAll || openIdx === idx;
          const parts = item.text.split("___");
          return (
            <div key={idx} className="flex items-start gap-3">
              <span className="mono text-gold-300 text-xs pt-2 tabular-nums">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="text-lg text-gray-100 leading-snug py-1">
                {parts[0]}
                <button
                  data-testid={`listen-reveal-${idx}`}
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className={`inline-block min-w-[110px] mx-1 px-3 py-0.5 rounded-md border transition-all heading-serif italic ${
                    shown
                      ? "border-gold-300 bg-gold-300/15 text-gold-50"
                      : "border-gold-300/40 bg-ink-800/40 text-gold-300/60 hover:text-gold-100"
                  }`}
                >
                  {shown ? item.answer : "\u00A0"}
                </button>
                {parts[1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Screen 23 — Minimal Pairs -------------------- */
export function Slide23() {
  const [active, setActive] = useState(null);
  return (
    <div className="h-full w-full px-16 py-10 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 23 · Minimal Pairs
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-6">
        One sound apart — one meaning apart.
      </h2>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {MINIMAL_PAIRS.map((p, i) => (
          <button
            key={i}
            data-testid={`pair-${i}`}
            onClick={() => setActive(i)}
            className={`rounded-xl border p-4 transition-all ${
              active === i
                ? "border-gold-300/70 bg-gold-300/10"
                : "border-gold-300/20 bg-ink-800/40 hover:border-gold-300/50"
            }`}
          >
            <div className="heading-serif text-2xl text-gold-50">
              {p.a}
              <span className="text-gold-300 mx-1.5">/</span>
              {p.b}
            </div>
          </button>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-center max-w-3xl"
            >
              <div className="mono text-[10px] uppercase tracking-widest text-gold-300 mb-3">
                Practice sentence
              </div>
              <div className="heading-serif text-3xl italic text-gray-100 leading-snug">
                "{MINIMAL_PAIRS[active].sentence}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------- Screen 24 — Reading Practice -------------------- */
export function Slide24() {
  const rounds = [
    { title: "Read for meaning", note: "Just understand the story.", color: "text-thoughtful" },
    { title: "Read for pronunciation", note: "Focus on individual sounds.", color: "text-rise" },
    { title: "Read for emotion", note: "Sound like you mean it.", color: "text-gold-300" },
    { title: "Read naturally", note: "Without sounding like you're reading.", color: "text-fall" },
  ];
  const [active, setActive] = useState(null);
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 24 · Reading Practice
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-10">
        Four rounds. One dialogue.
      </h2>
      <div className="grid grid-cols-2 gap-6 flex-1">
        {rounds.map((r, i) => {
          const isActive = active === i;
          return (
            <motion.button
              key={i}
              data-testid={`reading-round-${i}`}
              onClick={() => setActive(i)}
              className={`text-left rounded-2xl border p-6 transition-all ${
                isActive
                  ? "border-gold-300/70 bg-gold-300/10 scale-[1.01]"
                  : "border-gold-300/20 bg-ink-800/40 hover:border-gold-300/50"
              }`}
              whileHover={{ y: -2 }}
            >
              <div className={`heading-serif text-5xl mb-1 ${r.color}`}>
                0{i + 1}
              </div>
              <div className="heading-serif text-3xl text-gold-50 mb-1">
                {r.title}
              </div>
              <div className="text-gray-300 italic">{r.note}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
