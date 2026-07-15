import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VOCAB } from "../data/lesson";
import ClickReveal from "../components/ClickReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* -------------------- Screen 7 — Vocabulary Word Wall -------------------- */
export function Slide07() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 07 · Vocabulary Wall
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-2">
        Eleven words to <span className="italic text-gold-300">seal the deal</span>
      </h2>
      <p className="text-gray-400 text-sm mono uppercase tracking-widest mb-6">
        Hover or tap · Click to reveal meaning
      </p>
      <div className="flex-1 grid grid-cols-4 gap-4 content-center">
        {VOCAB.map((v, i) => {
          const open = activeIdx === i;
          return (
            <button
              key={v.word}
              data-testid={`wordwall-${v.word}`}
              onClick={() => setActiveIdx(open ? null : i)}
              className={`relative text-left rounded-xl border p-5 transition-all overflow-hidden ${
                open
                  ? "border-gold-300/70 bg-gold-300/10"
                  : "border-gold-300/20 bg-ink-800/40 hover:border-gold-300/50 hover:bg-ink-800/70"
              }`}
            >
              <div className="heading-serif text-3xl text-gold-50 mb-1">
                {v.word}
              </div>
              <div className="mono text-[11px] text-gray-400 tracking-wider">
                {v.pos}
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 space-y-1"
                  >
                    <div className="mono text-xs text-gold-300">{v.ipa}</div>
                    <div className="text-sm text-gray-200 leading-snug">
                      {v.meaning}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Screen 8 — Guess Mode -------------------- */
export function Slide08() {
  const [i, setI] = useState(0);
  const v = VOCAB[i];
  const go = (d) => setI((n) => (n + d + VOCAB.length) % VOCAB.length);
  return (
    <div className="h-full w-full px-24 py-14 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 08 · Guess Mode
        </div>
        <div className="mono text-xs text-gray-400 tabular-nums">
          {String(i + 1).padStart(2, "0")} / {VOCAB.length}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={v.word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mono text-xs uppercase tracking-[0.32em] text-gray-500 mb-4">
                Guess before you reveal
              </div>
              <div className="heading-serif text-[7rem] leading-none text-gold-50 mb-8">
                {v.word}
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <ClickReveal label="Show IPA" hiddenLabel="Hide IPA" testId={`guess-ipa-${v.word}`}>
                  <div className="mono text-2xl text-gold-100 py-2">{v.ipa}</div>
                </ClickReveal>
                <ClickReveal label="Show POS" hiddenLabel="Hide POS" testId={`guess-pos-${v.word}`}>
                  <div className="mono text-xl text-gold-100 py-2">{v.pos}</div>
                </ClickReveal>
                <ClickReveal label="Show Meaning" hiddenLabel="Hide Meaning" testId={`guess-meaning-${v.word}`}>
                  <div className="text-xl text-gray-100 py-2 max-w-xl mx-auto text-center">
                    {v.meaning}
                  </div>
                </ClickReveal>
                <ClickReveal label="Show Collocations" hiddenLabel="Hide Collocations" testId={`guess-coll-${v.word}`}>
                  <div className="italic text-gold-300 text-lg py-2">
                    {v.collocations.join("  ·  ")}
                  </div>
                </ClickReveal>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          data-testid="guess-prev"
          onClick={() => go(-1)}
          className="p-3 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          data-testid="guess-next"
          onClick={() => go(1)}
          className="p-3 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/15"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* -------------------- Screen 9 — Vocabulary Practice Grid -------------------- */
export function Slide09() {
  return (
    <div className="h-full w-full px-14 py-10 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 09 · Practice Grid
      </div>
      <h2 className="heading-serif text-4xl text-gold-50 mb-4">
        Practice all eleven — meaning hidden until you click.
      </h2>
      <div className="flex-1 overflow-y-auto scroll-elegant pr-2">
        <table className="w-full text-left">
          <thead>
            <tr className="mono text-[10px] uppercase tracking-widest text-gray-500 border-b border-gold-300/20">
              <th className="py-3 pr-3">Word</th>
              <th className="py-3 pr-3">IPA</th>
              <th className="py-3 pr-3">POS</th>
              <th className="py-3 pr-3">Collocations</th>
              <th className="py-3">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {VOCAB.map((v) => (
              <tr key={v.word} className="border-b border-gold-300/10 hover:bg-gold-300/5">
                <td className="py-3 pr-3 heading-serif text-2xl text-gold-50">
                  {v.word}
                </td>
                <td className="py-3 pr-3 mono text-sm text-gold-300">{v.ipa}</td>
                <td className="py-3 pr-3 mono text-xs text-gray-400 uppercase">
                  {v.pos}
                </td>
                <td className="py-3 pr-3 text-sm italic text-gray-300">
                  {v.collocations.join(" · ")}
                </td>
                <td className="py-3">
                  <ClickReveal
                    label="Reveal"
                    hiddenLabel="Hide"
                    variant="ghost"
                    testId={`grid-meaning-${v.word}`}
                  >
                    <div className="text-sm text-gray-100 max-w-md">{v.meaning}</div>
                  </ClickReveal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
