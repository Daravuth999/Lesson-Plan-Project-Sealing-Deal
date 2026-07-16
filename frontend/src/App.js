import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SLIDES } from "./slides";
import { SECTIONS } from "./data/lesson";
import InstructorNav from "./components/InstructorNav";
import PresenterTools from "./components/PresenterTools";
import SectionCurtain from "./components/SectionCurtain";

export default function App() {
  const [current, setCurrent] = useState(1);
  const [zoomSafe, setZoomSafe] = useState(false);
  const total = SLIDES.length;
  const slide = SLIDES[current - 1];
  const section = SECTIONS.find((s) => s.id === slide.section);

  // Enable zoom-safe automatically if ?zoom=1 in URL
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("zoom") === "1") setZoomSafe(true);
  }, []);

  const goTo = useCallback(
    (n) => setCurrent(() => Math.max(1, Math.min(total, n))),
    [total]
  );
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handler = (e) => {
      // Ignore when typing in form fields
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const SlideComponent = slide.C;
  const currentSection = useMemo(() => slide.section, [slide.section]);

  return (
    <div
      className={`relative w-screen h-screen stage-bg overflow-hidden ${
        zoomSafe ? "zoom-safe" : ""
      }`}
      data-testid="app-root"
    >
      {/* Subtle top brand rail */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-4 pointer-events-none">
        <div className="mono text-[10px] uppercase tracking-[0.42em] text-gold-300/80 pointer-events-auto flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-300 inline-block" />
          English Speaking Lab
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.42em] text-gray-500 pointer-events-auto">
          Sealing the Deal · Client Meetings &amp; Negotiation
        </div>
      </div>

      {/* Stage */}
      <div className="stage-frame relative" data-testid="stage-frame">
        <div className="absolute inset-0 grain">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              data-testid={`slide-${current}`}
            >
              <SlideComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        <InstructorNav
          current={current}
          total={total}
          goPrev={goPrev}
          goNext={goNext}
          goTo={goTo}
          sectionTitle={section ? section.label : ""}
          slideTitle={slide.title}
        />
      </div>

      {/* Zoom-native presenter tools (laser, ink, chat, zoom-safe scale) */}
      <PresenterTools zoomSafe={zoomSafe} setZoomSafe={setZoomSafe} />

      {/* Cinematic curtain when section changes */}
      <SectionCurtain section={currentSection} />
    </div>
  );
}
