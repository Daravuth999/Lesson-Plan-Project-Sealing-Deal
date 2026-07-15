import React from "react";
import { motion } from "framer-motion";

/**
 * IntonationCurve — animated SVG curve that draws left → right.
 * type: "rising" | "falling" | "rise-fall" | "fall-rise"
 */
export default function IntonationCurve({
  type = "rising",
  width = 320,
  height = 90,
  label,
  triggerKey = 0,
}) {
  const colorMap = {
    rising: "#5FCF80",
    falling: "#E86B6B",
    "rise-fall": "#DEB966",
    "fall-rise": "#6BA8E8",
  };
  const pathMap = {
    rising: `M 10 ${height - 15} Q ${width * 0.5} ${height - 15} ${width - 10} 15`,
    falling: `M 10 15 Q ${width * 0.5} 15 ${width - 10} ${height - 15}`,
    "rise-fall": `M 10 ${height - 15} Q ${width * 0.35} -10 ${width * 0.6} 25 T ${width - 10} ${height - 15}`,
    "fall-rise": `M 10 15 Q ${width * 0.35} ${height + 10} ${width * 0.6} ${height - 30} T ${width - 10} 15`,
  };

  const color = colorMap[type];
  const d = pathMap[type];

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <svg width={width} height={height} className="overflow-visible">
        <motion.path
          key={triggerKey}
          d={d}
          stroke={color}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          key={`dot-${triggerKey}`}
          r={5}
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3 }}
          style={{
            offsetPath: `path("${d}")`,
            offsetDistance: "100%",
          }}
        />
      </svg>
      {label && (
        <span className="mono text-[10px] uppercase tracking-[0.25em]" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}
