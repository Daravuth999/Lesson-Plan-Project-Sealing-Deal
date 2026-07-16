import { SLIDES } from "../slides";
import { SECTIONS } from "../data/lesson";
// eslint-disable-next-line no-unused-vars
import { buildLessonFromDefinition } from "../engine";

/**
 * Lesson registry — every lesson the factory can present.
 *
 * Two kinds of entries:
 *  - legacy: hand-built slide components (the original Sealing the Deal deck,
 *    untouched — exactly what students have been seeing).
 *  - template: compiled from a definition file via the engine.
 *
 * To add a lesson: duplicate _lesson-template.js, fill in YOUR content,
 * then import it here and add  buildLessonFromDefinition(yourLesson)
 * to the LESSONS array below.
 */
export const DEFAULT_SLUG = "sealing-the-deal";

export const LESSONS = [
  {
    slug: "sealing-the-deal",
    title: "Sealing the Deal",
    subtitle: "Client Meetings & Negotiation",
    level: "B1–B2",
    style: "conversation",
    screenCount: SLIDES.length,
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
  // Register your template lessons here, e.g.:
  // buildLessonFromDefinition(myNewLesson),
];

export function getLesson(slug) {
  return LESSONS.find((l) => l.slug === slug);
}
