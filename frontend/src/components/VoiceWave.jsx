import React from "react";
import { motion } from "framer-motion";

/**
 * VoiceWave — animated wave underline for rhythm/shadowing practice.
 * mode: "slow" | "natural"
 */
export default function VoiceWave({
  width = 520,
  height = 40,
  mode = "natural",
  color = "#DEB966",
  playing = true,
}) {
  const dur = mode === "slow" ? 3.6 : 1.6;
  const amp = mode === "slow" ? 10 : 14;
  const cycles = 6;

  const buildPath = () => {
    const step = width / (cycles * 2);
    let d = `M 0 ${height / 2}`;
    for (let i = 1; i <= cycles * 2; i++) {
      const y = i % 2 === 1 ? height / 2 - amp : height / 2 + amp;
      const x = i * step;
      const cx = x - step / 2;
      d += ` Q ${cx} ${y} ${x} ${height / 2}`;
    }
    return d;
  };

  return (
    <svg width={width} height={height} className="block">
      <defs>
        <linearGradient id="wave-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="30%" stopColor={color} stopOpacity="1" />
          <stop offset="70%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d={buildPath()}
        stroke="url(#wave-grad)"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: playing ? 1 : 0 }}
        transition={{
          duration: dur,
          ease: "linear",
          repeat: playing ? Infinity : 0,
          repeatType: "loop",
        }}
      />
    </svg>
  );
}
