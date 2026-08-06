import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DIALOGUE_PART_1, DIALOGUE_PART_2, VOCAB, CONVERSATION_VIDEO_URL } from "../data/lesson";
import { Film } from "lucide-react";
import ClickReveal from "../components/ClickReveal";
import SpeakerAvatar from "../components/SpeakerAvatar";
import NowSpeakingCaption from "../components/NowSpeakingCaption";
import RehearsalScript from "../components/RehearsalScript";

const vocabLookup = Object.fromEntries(VOCAB.map((v) => [v.word.toLowerCase(), v]));

/**
 * Render a dialogue turn with vocab hover-cue words.
 */
function renderLine(line, keyBase, activeCue, setActiveCue, showVocab = true) {
  return line.map((chunk, i) => {
    if (typeof chunk === "string") return <span key={`${keyBase}-${i}`}>{chunk}</span>;
    const meta = vocabLookup[chunk.text.toLowerCase()];
    const cueId = `${keyBase}-${i}`;
    if (!showVocab) return <span key={cueId}>{chunk.text}</span>;
    return (
      <span key={cueId} className="relative inline-block">
        <button
          data-testid={`vocab-${chunk.text}-${keyBase}`}
          type="button"
          onClick={() => setActiveCue(activeCue === cueId ? null : cueId)}
          className={`cue-word ${activeCue === cueId ? "active" : ""} font-medium text-gold-100`}
        >
          {chunk.text}
        </button>
        <AnimatePresence>
          {activeCue === cueId && meta && (
            <motion.span
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40 min-w-[240px]"
            >
              <span className="block rounded-xl bg-ink-800/95 backdrop-blur-md border border-gold-300/30 shadow-stage px-4 py-3 text-left">
                <span className="mono text-xs text-gold-300 block">{meta.ipa}</span>
                <span className="text-sm text-gold-50 block mt-0.5">{meta.meaning}</span>
                <span className="italic text-xs text-gray-400 block mt-1">
                  {meta.collocations[0]}
                </span>
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    );
  });
}

/* -------------------- Screen 10 — Conversation Setup -------------------- */
export function Slide10() {
  return (
    <div className="h-full w-full px-16 py-12 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
        Screen 10 · Conversation Setup
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-8 max-w-4xl leading-[1.05]">
        The final contract meeting.
      </h2>

      <div className="flex-1 grid grid-cols-2 gap-12 min-h-0">
        {/* Left — who's meeting, and why */}
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-10 mb-10">
            {[
              { name: "Sarah", tag: "Sales & Partnerships" },
              { name: "David", tag: "Head of Procurement" },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                <div className="scale-[1.4] origin-left">
                  <SpeakerAvatar role={p.name} active size={64} />
                </div>
                <div className="text-gray-400 italic text-base mt-5">{p.tag}</div>
              </motion.div>
            ))}
          </div>
          <div className="max-w-md">
            <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300 mb-2">
              Situation
            </div>
            <p className="heading-serif italic text-2xl text-gray-200">
              They are negotiating the final terms of the contract.
            </p>
          </div>
        </div>

        {/* Right — model video, front and center before reading the script */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col min-h-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <Film size={14} className="text-gold-300" />
            <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300">
              Watch the Model Conversation
            </div>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl border border-gold-300/25 shadow-stage bg-black overflow-hidden">
            <video
              src={CONVERSATION_VIDEO_URL}
              controls
              className="w-full h-full max-h-full object-contain"
              data-testid="setup-video-player"
            />
          </div>
          <div className="mono text-[10px] uppercase tracking-[0.28em] text-gray-500 mt-2">
            Play it for the class before Screens 11–13
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------- Dialogue slide helper -------------------- */
function DialogueSlide({ screenLabel, part, showTitle }) {
  const [activeCue, setActiveCue] = useState(null);
  const [activeTurn, setActiveTurn] = useState(0);
  const currentRole = part[activeTurn]?.role || "Sarah";
  return (
    <div className="h-full w-full px-14 py-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          {screenLabel}
        </div>
        <AnimatePresence mode="wait">
          <NowSpeakingCaption
            key={currentRole + "-" + activeTurn}
            role={currentRole}
            subtitle={currentRole === "Sarah" ? "Vendor" : "Client"}
          />
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-6 mb-3">
        <SpeakerAvatar role="Sarah" active={currentRole === "Sarah"} size={44} />
        <div className="flex-1 h-px bg-gold-300/15" />
        <SpeakerAvatar role="David" active={currentRole === "David"} size={44} />
      </div>
      <h2 className="heading-serif text-2xl text-gold-50 mb-3">{showTitle}</h2>
      <div className="flex-1 overflow-y-auto scroll-elegant pr-4 -mr-2">
        <div className="space-y-3 max-w-5xl">
          {part.map((turn, idx) => {
            const isSarah = turn.role === "Sarah";
            const isActive = activeTurn === idx;
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveTurn(idx)}
                initial={{ opacity: 0, x: isSarah ? -14 : 14 }}
                animate={{
                  opacity: isActive ? 1 : 0.55,
                  x: 0,
                  scale: isActive ? 1 : 0.99,
                }}
                transition={{ delay: 0.03 * idx, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full flex gap-4 text-left ${
                  isSarah ? "" : "flex-row-reverse text-right"
                }`}
                data-testid={`turn-${idx}`}
              >
                <div
                  className={`shrink-0 w-14 heading-serif text-lg pt-1 ${
                    isSarah ? "text-gold-300" : "text-thoughtful"
                  }`}
                >
                  {turn.role}
                </div>
                <div
                  className={`text-lg leading-relaxed text-gray-100 max-w-3xl rounded-md px-5 py-3 transition-all ${
                    isSarah
                      ? isActive
                        ? "bg-gold-300/10 border-l-4 border-gold-300 shadow-[0_0_24px_rgba(230,184,99,0.15)]"
                        : "bg-gold-300/5 border-l-2 border-gold-300/40"
                      : isActive
                      ? "bg-thoughtful/10 border-r-4 border-thoughtful shadow-[0_0_24px_rgba(107,168,232,0.15)]"
                      : "bg-thoughtful/5 border-r-2 border-thoughtful/40"
                  }`}
                >
                  {renderLine(turn.line, `${screenLabel}-${idx}`, activeCue, setActiveCue)}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Screen 11 & 12 -------------------- */
export function Slide11() {
  return (
    <DialogueSlide
      screenLabel="Screen 11 · Conversation · Part 1"
      part={DIALOGUE_PART_1}
      showTitle="Opening the negotiation"
    />
  );
}
export function Slide12() {
  return (
    <DialogueSlide
      screenLabel="Screen 12 · Conversation · Part 2"
      part={DIALOGUE_PART_2}
      showTitle="Closing the deal"
    />
  );
}

/* -------------------- Screen 13 — Performance Mode -------------------- */
export function Slide13() {
  const [focus, setFocus] = useState("both"); // "sarah" | "david" | "both"
  const [showVocab, setShowVocab] = useState(true);
  const [showEmotion, setShowEmotion] = useState(true);
  const [activeCue, setActiveCue] = useState(null);
  const allTurns = useMemo(() => [...DIALOGUE_PART_1, ...DIALOGUE_PART_2], []);

  const emotionCue = (role, idx) => {
    if (!showEmotion) return null;
    const cues = {
      "Sarah-0": "warm, welcoming",
      "David-1": "direct, honest",
      "Sarah-2": "problem-solving",
      "David-3": "cautious",
      "Sarah-4": "generous",
      "David-5": "relieved",
    };
    return cues[`${role}-${idx}`] || null;
  };

  return (
    <div className="h-full w-full px-14 py-8 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300">
          Screen 13 · Performance Mode
        </div>
        <div className="flex items-center gap-2">
          {[
            { k: "sarah", l: "Sarah focus" },
            { k: "david", l: "David focus" },
            { k: "both", l: "Both" },
          ].map((o) => (
            <button
              key={o.k}
              data-testid={`perf-focus-${o.k}`}
              onClick={() => setFocus(o.k)}
              className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                focus === o.k
                  ? "border-gold-300 bg-gold-300/15 text-gold-50"
                  : "border-gold-300/25 text-gray-400 hover:text-gold-100"
              }`}
            >
              {o.l}
            </button>
          ))}
          <div className="w-px h-4 bg-gold-300/25 mx-1" />
          <button
            data-testid="perf-vocab-toggle"
            onClick={() => setShowVocab((v) => !v)}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              showVocab
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            Vocab
          </button>
          <button
            data-testid="perf-emotion-toggle"
            onClick={() => setShowEmotion((v) => !v)}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              showEmotion
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400"
            }`}
          >
            Emotion
          </button>
        </div>
      </div>

      <RehearsalScript
        turns={allTurns.map((turn, idx) => {
          const cue = emotionCue(turn.role, idx);
          return {
            role: turn.role,
            plain: turn.line
              .map((c) => (typeof c === "string" ? c : c.text))
              .join(""),
            node: (
              <>
                {cue && (
                  <div className="mono text-[10px] uppercase tracking-widest text-gold-300 mb-0.5">
                    ({cue})
                  </div>
                )}
                {renderLine(turn.line, `perf-${idx}`, activeCue, setActiveCue, showVocab)}
              </>
            ),
          };
        })}
        colorOf={(role) => (role === "Sarah" ? "#E6B863" : "#6BA8E8")}
        sideOf={(role) => (role === "Sarah" ? "left" : "right")}
        isDimmed={(role) =>
          (focus === "sarah" && role !== "Sarah") ||
          (focus === "david" && role !== "David")
        }
        testIdBase="rehearsal"
      />
    </div>
  );
}

/* -------------------- Screen 14 — Negotiation Strategy -------------------- */
export function Slide14() {
  const strategies = [
    {
      title: "Acknowledge concerns before responding",
      example:
        "\"I appreciate you saying that directly. What if we found a compromise?\"",
    },
    {
      title: "Propose alternatives instead of saying \"no\"",
      example:
        "\"What if I threw in our premium support tier as a concession — free for the first year?\"",
    },
    {
      title: "Put everything in writing",
      example:
        "\"I'll put everything into a written proposal so the terms are clear.\"",
    },
  ];
  return (
    <div className="h-full w-full px-20 py-14 flex flex-col">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
        Screen 14 · Negotiation Strategy
      </div>
      <h2 className="heading-serif text-5xl text-gold-50 mb-10 max-w-4xl">
        Three moves great negotiators make.
      </h2>
      <div className="flex-1 grid grid-cols-3 gap-6">
        {strategies.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.1, duration: 0.5 }}
            className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-6 flex flex-col"
          >
            <div className="heading-serif text-4xl text-gold-300 mb-4">
              0{i + 1}
            </div>
            <div className="text-xl text-gold-50 mb-6 leading-snug">{s.title}</div>
            <div className="mt-auto">
              <ClickReveal label="See it in the script" hiddenLabel="Hide" testId={`strategy-${i}`}>
                <div className="italic heading-serif text-lg text-gray-100 mt-1 border-l-2 border-gold-300/60 pl-3">
                  {s.example}
                </div>
              </ClickReveal>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
