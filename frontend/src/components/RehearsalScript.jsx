import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Square, Pause } from "lucide-react";

/**
 * RehearsalScript — hands-free role-play teleprompter.
 *
 * Renders a full dialogue script and, once started, walks a golden spotlight
 * down the turns at a natural reading pace, auto-scrolling so the active line
 * stays centered. Built so the instructor can stay passive while students
 * perform over Zoom.
 *
 * Hotkeys (work even with the presenter HUD hidden):
 *   R      start / stop rehearsal
 *   Space  pause / resume (only while rehearsing — otherwise Space still
 *          changes slides as usual)
 *   ↑ / ↓  nudge the spotlight back / forward a turn while rehearsing
 *
 * Props:
 *   turns    [{ role, plain, node }]  plain = raw text (drives timing),
 *                                     node = rendered line content
 *   colorOf  (role) => css color
 *   sideOf   (role) => "left" | "right"
 *   isDimmed (role) => bool           external focus toggles (optional)
 */

const PACES = [
  { id: "calm", label: "Calm", mult: 1.35 },
  { id: "natural", label: "Natural", mult: 1.0 },
  { id: "brisk", label: "Brisk", mult: 0.8 },
];

function turnSeconds(plain, mult) {
  const words = String(plain || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.min(30, Math.max(3.5, (1.6 + words * 0.45) * mult));
}

export default function RehearsalScript({
  turns,
  colorOf,
  sideOf,
  isDimmed = () => false,
  testIdBase = "rehearsal",
}) {
  const [active, setActive] = useState(0);
  // idle | countin | running | paused | done
  const [phase, setPhase] = useState("idle");
  const [count, setCount] = useState(3);
  const [paceId, setPaceId] = useState("natural");

  const paceRef = useRef(paceId);
  paceRef.current = paceId;
  const itemRefs = useRef([]);
  const scrollerRef = useRef(null);

  /* ---------- rehearsal state machine ---------- */

  // Count-in: 3 → 2 → 1 → running
  useEffect(() => {
    if (phase !== "countin") return;
    if (count === 0) {
      setPhase("running");
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 850);
    return () => clearTimeout(t);
  }, [phase, count]);

  // Spotlight walker: hold each turn for its reading time, then advance.
  useEffect(() => {
    if (phase !== "running") return;
    const turn = turns[active];
    if (!turn) return;
    const mult = (PACES.find((p) => p.id === paceRef.current) || PACES[1]).mult;
    const t = setTimeout(() => {
      if (active >= turns.length - 1) setPhase("done");
      else setActive((a) => a + 1);
    }, turnSeconds(turn.plain, mult) * 1000);
    return () => clearTimeout(t);
  }, [phase, active, turns]);

  // Keep the active line centered.
  useEffect(() => {
    if (phase === "idle") return;
    const el = itemRefs.current[active];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active, phase]);

  const start = () => {
    setActive(0);
    setCount(3);
    setPhase("countin");
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  };
  const stop = () => setPhase("idle");

  /* ---------- hotkeys (capture phase so Space doesn't change slides) ---------- */
  const stateRef = useRef({});
  stateRef.current = { phase, active };

  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const { phase: ph } = stateRef.current;

      if (e.key === "r" || e.key === "R") {
        if (ph === "idle" || ph === "done") start();
        else stop();
      } else if (e.key === " " && (ph === "running" || ph === "paused")) {
        // Claim Space from the deck's next-slide handler while rehearsing.
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase(ph === "running" ? "paused" : "running");
      } else if (
        (e.key === "ArrowDown" || e.key === "ArrowUp") &&
        (ph === "running" || ph === "paused")
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setActive((a) =>
          Math.max(0, Math.min(turns.length - 1, a + (e.key === "ArrowDown" ? 1 : -1)))
        );
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turns.length]);

  const rehearsing = phase === "running" || phase === "paused" || phase === "countin";

  /* ---------- UI ---------- */
  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Control chips — same idiom as the existing Screen 13 toggles */}
      <div className="flex items-center gap-2 mb-3">
        {!rehearsing ? (
          <button
            data-testid={`${testIdBase}-start`}
            onClick={start}
            className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold-300 bg-gold-300/15 text-gold-50 hover:bg-gold-300/25 transition-colors"
          >
            <Play size={11} /> {phase === "done" ? "Rehearse again · R" : "Rehearse · R"}
          </button>
        ) : (
          <>
            <button
              data-testid={`${testIdBase}-pause`}
              onClick={() => setPhase(phase === "running" ? "paused" : "running")}
              className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold-300/40 text-gold-100 hover:bg-gold-300/10 transition-colors"
            >
              <Pause size={11} /> {phase === "paused" ? "Resume · Space" : "Pause · Space"}
            </button>
            <button
              data-testid={`${testIdBase}-stop`}
              onClick={stop}
              className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold-300/25 text-gray-400 hover:text-gold-100 transition-colors"
            >
              <Square size={10} /> Stop · R
            </button>
          </>
        )}
        <div className="w-px h-4 bg-gold-300/25 mx-1" />
        {PACES.map((p) => (
          <button
            key={p.id}
            data-testid={`${testIdBase}-pace-${p.id}`}
            onClick={() => setPaceId(p.id)}
            className={`mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
              paceId === p.id
                ? "border-gold-300 bg-gold-300/15 text-gold-50"
                : "border-gold-300/25 text-gray-400 hover:text-gold-100"
            }`}
          >
            {p.label}
          </button>
        ))}
        <div
          className="ml-auto mono text-[10px] uppercase tracking-[0.28em] text-gray-500"
          data-testid={`${testIdBase}-status`}
        >
          {rehearsing
            ? `Turn ${active + 1} / ${turns.length}`
            : phase === "done"
            ? "End of script — next pair?"
            : `${turns.length} turns`}
        </div>
      </div>

      {/* Script */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto scroll-elegant pr-4 -mr-2"
        data-testid={`${testIdBase}-scroller`}
      >
        <div className="space-y-3 max-w-5xl pb-24">
          {turns.map((turn, idx) => {
            const color = colorOf(turn.role);
            const left = sideOf(turn.role) === "left";
            const isActive = rehearsing && active === idx && phase !== "countin";
            const dimByFocus = isDimmed(turn.role);
            const dimByRehearsal = rehearsing && !isActive;
            return (
              <div
                key={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                data-testid={`${testIdBase}-turn-${idx}`}
                data-active={isActive ? "true" : "false"}
                onClick={() => setActive(idx)}
                className={`flex gap-4 cursor-pointer transition-opacity duration-500 ${
                  left ? "" : "flex-row-reverse text-right"
                } ${dimByFocus ? "opacity-25" : dimByRehearsal ? "opacity-40" : "opacity-100"}`}
              >
                <div
                  className="shrink-0 w-16 heading-serif text-base pt-2"
                  style={{ color }}
                >
                  {turn.role}
                </div>
                <div
                  className="text-lg leading-relaxed text-gray-100 max-w-3xl rounded-md px-5 py-3 transition-all duration-500"
                  style={{
                    background: `${color}${isActive ? "1F" : "08"}`,
                    [left ? "borderLeft" : "borderRight"]: `${isActive ? 4 : 2}px solid ${color}${isActive ? "" : "55"}`,
                    boxShadow: isActive ? `0 0 28px ${color}30` : "none",
                  }}
                >
                  {turn.node}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Count-in overlay */}
      <AnimatePresence>
        {phase === "countin" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink-950/80 backdrop-blur-sm rounded-xl"
            data-testid={`${testIdBase}-countin`}
          >
            <div className="mono text-[11px] uppercase tracking-[0.42em] text-gold-300 mb-6">
              Get ready to speak
            </div>
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="heading-serif italic text-9xl text-gold-50"
            >
              {count === 0 ? "Go" : count}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
