import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROMAN = {
  opening: { num: "I", label: "Opening" },
  observation: { num: "II", label: "Observation & Warm-up" },
  vocabulary: { num: "III", label: "Vocabulary" },
  conversation: { num: "IV", label: "Conversation" },
  pronunciation: { num: "V", label: "Pronunciation" },
  practice: { num: "VI", label: "Practice & Listening" },
  comprehension: { num: "VII", label: "Comprehension & Reflection" },
  roleplay: { num: "VIII", label: "Role Play" },
  closing: { num: "IX", label: "Homework & Closing" },
};

/**
 * SectionCurtain — Cinematic "act break" between sections.
 * Renders a gold horizontal sweep that closes over the stage,
 * reveals a huge Roman numeral, then withdraws to reveal the new section.
 */
export default function SectionCurtain({ section }) {
  const [visible, setVisible] = useState(false);
  const [displaySection, setDisplaySection] = useState(section);

  useEffect(() => {
    if (section === displaySection) return;
    setVisible(true);
    setDisplaySection(section);
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const info = ROMAN[displaySection] || { num: "", label: "" };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[75] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-testid="section-curtain"
        >
          {/* Top curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-ink-950 border-b border-gold-300/40"
            style={{ height: "51%" }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-ink-950 border-t border-gold-300/40"
            style={{ height: "51%" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Gold sweep line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gold-300"
            initial={{ scaleX: 0, opacity: 0.9 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            style={{ transformOrigin: "center" }}
          />
          {/* Roman numeral + label */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="mono text-[11px] uppercase tracking-[0.42em] text-gold-300 mb-4">
              Section {info.num}
            </div>
            <div className="heading-serif text-[9rem] leading-none text-gold-50 italic">
              {info.num}
            </div>
            <div className="heading-serif text-3xl text-gray-200 mt-6">
              {info.label}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
