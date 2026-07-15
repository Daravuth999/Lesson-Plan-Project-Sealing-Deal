import React from "react";
import { motion } from "framer-motion";

/**
 * LinkingBridge — visually connects two words with an animated arc.
 * from/to are the surface forms; result is the linked/reduced form.
 */
export default function LinkingBridge({ from, to, result, index = 0 }) {
  return (
    <div className="flex flex-col items-center gap-3" data-testid={`linking-${index}`}>
      <div className="relative flex items-baseline gap-6">
        <span className="heading-serif text-3xl text-gold-50">{from}</span>
        <span className="heading-serif text-3xl text-gold-50">{to}</span>
        <svg
          className="absolute -top-8 left-0 pointer-events-none"
          width="100%"
          height="40"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 20 30 Q 100 -10 180 30"
            stroke="#6BA8E8"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
          />
        </svg>
      </div>
      <div className="mono text-sm text-thoughtful/90">→ {result}</div>
    </div>
  );
}
