import React from "react";
import { motion } from "framer-motion";

/**
 * NowSpeakingCaption — Netflix-style lower-third caption strip.
 * Shows on dialogue slides to make it unmistakably clear who is speaking.
 */
export default function NowSpeakingCaption({ role, subtitle }) {
  const color = role === "Sarah" ? "#E6B863" : "#6BA8E8";
  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-3 rounded-full pl-3 pr-5 py-2 bg-ink-900/85 backdrop-blur-md border"
      style={{ borderColor: `${color}55` }}
      data-testid="now-speaking-caption"
    >
      <span
        className="inline-block w-2.5 h-2.5 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 0 3px ${color}22`,
        }}
      />
      <span className="mono text-[10px] uppercase tracking-[0.32em]" style={{ color }}>
        Now Speaking
      </span>
      <span className="heading-serif text-xl text-gold-50">{role}</span>
      {subtitle && (
        <>
          <span className="text-gold-300/40">·</span>
          <span className="italic text-sm text-gray-300">{subtitle}</span>
        </>
      )}
    </motion.div>
  );
}
