/**
 * CEFR level presets — presentation defaults that adapt a template lesson
 * to the learner level. A block can always override these locally
 * (e.g. { type: "discussion", timerSeconds: 120 }).
 */
export const LEVEL_PRESETS = {
  A1: { speakSeconds: 45, vocabMax: 6, storyAutoReveal: false, label: "Beginner" },
  A2: { speakSeconds: 60, vocabMax: 8, storyAutoReveal: false, label: "Elementary" },
  B1: { speakSeconds: 60, vocabMax: 10, storyAutoReveal: false, label: "Intermediate" },
  B2: { speakSeconds: 75, vocabMax: 12, storyAutoReveal: false, label: "Upper-Intermediate" },
  C1: { speakSeconds: 90, vocabMax: 14, storyAutoReveal: false, label: "Advanced" },
  C2: { speakSeconds: 90, vocabMax: 16, storyAutoReveal: false, label: "Proficient" },
};

export function presetFor(level) {
  // Accept "A2", "B1–B2", "b1" … — first CEFR code wins.
  const m = String(level || "").toUpperCase().match(/[ABC][12]/);
  return LEVEL_PRESETS[m ? m[0] : "B1"] || LEVEL_PRESETS.B1;
}

export const ROMAN_NUMERALS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
];
