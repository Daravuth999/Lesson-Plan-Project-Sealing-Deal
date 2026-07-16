import React from "react";
import { motion } from "framer-motion";
import { Presentation, ArrowLeft } from "lucide-react";
import { LESSONS } from "./lessons";

/**
 * Library — instructor-only lesson catalog. Reached via #/library
 * (from the presenter HUD, hotkey P), never shown during presentation.
 */
export default function Library() {
  return (
    <div className="relative w-screen h-screen stage-bg overflow-y-auto scroll-elegant grain">
      <div className="max-w-6xl mx-auto px-10 py-14">
        <button
          onClick={() => (window.location.hash = "")}
          className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.32em] text-gray-500 hover:text-gold-100 transition-colors mb-10"
          data-testid="library-back"
        >
          <ArrowLeft size={13} /> Back to the stage
        </button>

        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
          Instructor Library
        </div>
        <h1 className="heading-serif text-6xl text-gold-50 mb-3">Lesson Library</h1>
        <p className="text-gray-400 max-w-2xl mb-12">
          Every lesson in the factory — the original decks and new template
          lessons. Open one to present it; students only ever see the stage.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {LESSONS.map((lesson, i) => (
            <motion.button
              key={lesson.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => (window.location.hash = `#/lesson/${lesson.slug}`)}
              className="text-left rounded-2xl border border-gold-300/25 bg-ink-800/40 hover:border-gold-300/60 hover:bg-ink-800/80 transition-all p-7 group"
              data-testid={`library-card-${lesson.slug}`}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-300/40 text-gold-300">
                  {lesson.level}
                </span>
                <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-thoughtful/40 text-thoughtful">
                  {lesson.style}
                </span>
                <span className="ml-auto mono text-[10px] uppercase tracking-widest text-gray-500">
                  {lesson.screenCount} screens
                </span>
              </div>
              <div className="heading-serif text-4xl text-gold-50 group-hover:text-white transition-colors">
                {lesson.title}
              </div>
              {lesson.subtitle && (
                <div className="heading-serif italic text-xl text-gray-400 mt-1">
                  {lesson.subtitle}
                </div>
              )}
              <div className="mt-6 inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.28em] text-gold-100/70 group-hover:text-gold-100">
                <Presentation size={13} /> Present
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mono text-[10px] uppercase tracking-[0.28em] text-gray-600 mt-12">
          To add a lesson: duplicate a definition in src/lessons, edit the
          content, register it in src/lessons/index.js.
        </div>
      </div>
    </div>
  );
}
