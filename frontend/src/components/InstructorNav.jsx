import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";
import { SECTIONS } from "../data/lesson";

export default function InstructorNav({
  current,
  total,
  goPrev,
  goNext,
  goTo,
  sectionTitle,
  slideTitle,
  sections = SECTIONS,
  deckTitle = "Sealing the Deal",
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="mx-auto w-full max-w-[92%] pb-4 flex items-end justify-between">
          {/* Left: section + slide title */}
          <div className="pointer-events-auto mono text-[11px] uppercase tracking-[0.28em] text-gold-100/80 flex flex-col gap-0.5">
            <span className="text-gold-300/90">{sectionTitle}</span>
            <span className="text-gray-400">{slideTitle}</span>
          </div>

          {/* Center: controls */}
          <div className="pointer-events-auto flex items-center gap-2 bg-ink-900/85 backdrop-blur-md border border-gold-300/20 rounded-full px-3 py-2 shadow-stage">
            <button
              data-testid="nav-prev"
              onClick={goPrev}
              disabled={current === 1}
              className="p-2 rounded-full text-gold-100 hover:bg-gold-300/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <div
              data-testid="nav-counter"
              className="mono text-xs text-gold-50 tabular-nums px-2 min-w-[56px] text-center"
            >
              {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <button
              data-testid="nav-next"
              onClick={goNext}
              disabled={current === total}
              className="p-2 rounded-full text-gold-100 hover:bg-gold-300/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
            <div className="w-px h-5 bg-gold-300/20 mx-1" />
            <button
              data-testid="nav-menu"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-full text-gold-100 hover:bg-gold-300/15 transition-colors"
              aria-label="Open section menu"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Right: progress bar */}
          <div className="pointer-events-auto w-[220px] mono text-[10px] uppercase tracking-[0.28em] text-gold-100/70 flex flex-col gap-1 items-end">
            <span>Progress</span>
            <div className="w-full h-[3px] bg-ink-700 rounded-full overflow-hidden">
              <motion.div
                data-testid="progress-bar"
                className="h-full bg-gold-300"
                initial={false}
                animate={{ width: `${(current / total) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <SectionMenu
            close={() => setMenuOpen(false)}
            goTo={(n) => {
              goTo(n);
              setMenuOpen(false);
            }}
            current={current}
            sections={sections}
            deckTitle={deckTitle}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SectionMenu({ close, goTo, current, sections = SECTIONS, deckTitle = "Sealing the Deal" }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 grain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="section-menu"
    >
      <div className="absolute inset-0 bg-ink-950/95 backdrop-blur-2xl" />
      <div className="relative h-full w-full flex flex-col items-center justify-center px-16">
        <button
          onClick={close}
          data-testid="section-menu-close"
          className="absolute top-6 right-6 p-2 rounded-full text-gold-100 hover:bg-gold-300/15"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-4">
          Lesson Sections
        </div>
        <h2 className="heading-serif text-5xl text-gold-50 mb-10">
          {deckTitle}
        </h2>
        <div className="grid grid-cols-3 gap-5 max-w-5xl w-full">
          {sections.map((s, idx) => {
            const isActive = current >= s.range[0] && current <= s.range[1];
            return (
              <motion.button
                key={s.id}
                data-testid={`section-jump-${s.id}`}
                onClick={() => goTo(s.range[0])}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.4 }}
                className={`text-left rounded-xl border p-5 transition-all group ${
                  isActive
                    ? "border-gold-300/70 bg-gold-300/10"
                    : "border-gold-300/20 bg-ink-800/40 hover:border-gold-300/50 hover:bg-ink-800/80"
                }`}
              >
                <div className="mono text-[10px] uppercase tracking-[0.28em] text-gold-300 mb-2">
                  {String(s.range[0]).padStart(2, "0")}–{String(s.range[1]).padStart(2, "0")}
                </div>
                <div className="heading-serif text-2xl text-gold-50 group-hover:text-white">
                  {s.label}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
