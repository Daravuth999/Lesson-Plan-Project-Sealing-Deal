import { SLIDES } from "../slides";
import { SECTIONS } from "../data/lesson";
import { buildLessonFromDefinition } from "../engine";
import { loadLocalLessons } from "./localStore";

/**
 * Lesson registry — every lesson the factory can present.
 *
 * Three sources:
 *  - legacy: hand-built slide components (the original Sealing the Deal deck,
 *    untouched — exactly what students have been seeing).
 *  - repo templates: definition files registered below (optional).
 *  - device lessons: authored in the Instructor Panel (#/builder), stored in
 *    this browser only, compiled through the same engine.
 */
export const DEFAULT_SLUG = "sealing-the-deal";

const BUILTINS = [
  {
    slug: "sealing-the-deal",
    title: "Sealing the Deal",
    subtitle: "Client Meetings & Negotiation",
    level: "B1–B2",
    style: "conversation",
    screenCount: SLIDES.length,
    source: "built-in",
    getDeck: () => ({
      slides: SLIDES,
      sections: SECTIONS,
      deckTitle: "Sealing the Deal",
      brand: {
        left: "English Speaking Lab",
        right: "Sealing the Deal · Client Meetings & Negotiation",
      },
    }),
  },
  // Repo-based template lessons can be registered here:
  // buildLessonFromDefinition(myLessonDefinition),
];

export const BUILTIN_SLUGS = BUILTINS.map((l) => l.slug);

function deviceLessons() {
  return loadLocalLessons()
    .map((def) => {
      try {
        return { ...buildLessonFromDefinition(def), source: "device" };
      } catch (e) {
        // A malformed definition must never break the presenter.
        console.warn(`Skipping device lesson "${def && def.slug}":`, e);
        return null;
      }
    })
    .filter(Boolean);
}

export function getAllLessons() {
  return [...BUILTINS, ...deviceLessons()];
}

export function getLesson(slug) {
  return getAllLessons().find((l) => l.slug === slug);
}

// Backwards-compatible named export (Library used to import LESSONS).
export const LESSONS = BUILTINS;
