/**
 * LESSON TEMPLATE — duplicate this file to create a new lesson.
 *
 * How to use:
 *   1. Copy this file, e.g. to  my-new-lesson.js  (the filename is yours to choose).
 *   2. Fill in every field below with YOUR content. Delete any block or
 *      section you don't need; copy/paste blocks to add more.
 *   3. Register it in  lessons/index.js :
 *        import myNewLesson from "./my-new-lesson";
 *        …and add  buildLessonFromDefinition(myNewLesson)  to the LESSONS array.
 *   4. Push — it appears in the Library (press P → book icon) about a minute later.
 *
 * This template file is NOT registered, so it never appears to students.
 *
 * Available block types:
 *   title · outcomes · image · story · dialogue · vocabulary · discussion
 *   practice · media (audio/video link) · comprehension · roleplay
 *   homework · closing
 *
 * The `level` field (A1–C2) automatically adjusts speaking-timer lengths and
 * vocabulary density. Any block can override, e.g. { timerSeconds: 120 }.
 */
const lesson = {
  slug: "",            // URL name, lowercase-with-dashes, e.g. "my-first-story"
  title: "",           // Lesson title shown on the title slide and in the Library
  subtitle: "",        // Short tagline, e.g. "A Storytelling Lesson"
  level: "A1",         // A1 | A2 | B1 | B2 | C1 | C2
  style: "storytelling", // "storytelling" or "conversation" (Library label only)
  speakers: {
    // Characters used by story quotes and dialogue turns. Pick any colors.
    // Example: Anna: { tag: "Shopkeeper", color: "#E6B863" },
  },
  sections: [
    {
      id: "opening",
      label: "Opening",
      blocks: [
        {
          type: "title",
          kicker: "",   // small line above the title
          title: "",
          subtitle: "",
          tagline: "",  // small line below, e.g. "Instructor-led · Level A1"
        },
        {
          type: "outcomes",
          items: [
            // "First learning outcome…",
          ],
        },
      ],
    },
    {
      id: "story",
      label: "The Story",
      blocks: [
        {
          type: "story",
          name: "The Story · Part 1", // label shown in the nav bar
          title: "",
          beats: [
            // Narration:        { text: "…" },
            // A character line: { speaker: "Anna", text: "…" },
          ],
        },
      ],
    },
    {
      id: "vocabulary",
      label: "Vocabulary",
      blocks: [
        {
          type: "vocabulary",
          title: "",
          words: [
            // { word: "", ipa: "", pos: "", meaning: "", example: "" },
          ],
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      blocks: [
        {
          type: "discussion",
          title: "",
          questions: [
            // "Question for students…",
          ],
        },
      ],
    },
    {
      id: "media",
      label: "Watch & Listen",
      blocks: [
        {
          type: "media",
          media: "video", // "video" (YouTube or direct file) or "audio"
          title: "",
          url: "",        // paste your link here
          task: "",       // what students listen/watch for
        },
      ],
    },
    {
      id: "closing",
      label: "Homework & Closing",
      blocks: [
        {
          type: "homework",
          items: [
            // "Homework item…",
          ],
        },
        {
          type: "closing",
          kicker: "",
          title: "",
          subtitle: "",
        },
      ],
    },
  ],
};

export default lesson;
