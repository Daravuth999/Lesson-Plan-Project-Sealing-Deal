import React from "react";
import { motion } from "framer-motion";

/**
 * SpeakerAvatar — Abstract Sarah / David silhouettes for dialogue slides.
 * Optimized for Zoom compression (thick strokes, high contrast).
 */
export default function SpeakerAvatar({ role, active = true, size = 56 }) {
  const isSarah = role === "Sarah";
  const color = isSarah ? "#E6B863" : "#6BA8E8";
  const dim = !active;

  return (
    <div
      className="relative inline-flex items-center gap-3 select-none"
      data-testid={`avatar-${role}`}
    >
      <motion.div
        animate={{
          scale: active ? 1 : 0.96,
          opacity: active ? 1 : 0.4,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: active
              ? `0 0 0 3px ${color}66, 0 0 24px ${color}55`
              : `0 0 0 2px ${color}22`,
          }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: "50%" }}
        />
        <svg viewBox="0 0 64 64" width={size} height={size} className="relative">
          <defs>
            <linearGradient id={`grad-${role}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={dim ? 0.4 : 1} />
              <stop offset="100%" stopColor={color} stopOpacity={dim ? 0.15 : 0.6} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="#0B0F14" stroke={color} strokeOpacity={dim ? 0.35 : 0.9} strokeWidth="2" />
          {isSarah ? (
            // Sarah — hair silhouette
            <g fill={`url(#grad-${role})`}>
              <circle cx="32" cy="26" r="9" />
              <path d="M18 55 C 18 42, 46 42, 46 55 Z" />
              <path d="M23 22 C 22 15, 42 15, 42 22 L 41 26 C 41 21, 23 21, 23 26 Z" />
            </g>
          ) : (
            // David — short hair + shoulders
            <g fill={`url(#grad-${role})`}>
              <circle cx="32" cy="27" r="8.5" />
              <path d="M18 55 C 18 42, 46 42, 46 55 Z" />
              <path d="M24 22 L 40 22 L 40 26 C 40 22, 24 22, 24 26 Z" />
            </g>
          )}
        </svg>
      </motion.div>
      <div className="flex flex-col leading-tight">
        <div
          className="mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: active ? color : `${color}66` }}
        >
          {isSarah ? "Vendor" : "Client"}
        </div>
        <div
          className={`heading-serif text-xl transition-colors ${
            active ? "text-gold-50" : "text-gray-500"
          }`}
        >
          {role}
        </div>
      </div>
    </div>
  );
}
