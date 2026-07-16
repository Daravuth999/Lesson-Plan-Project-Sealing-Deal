import React from "react";
import { BLOCK_RENDERERS } from "./blocks";
import { presetFor, ROMAN_NUMERALS } from "./levels";

/**
 * buildLessonFromDefinition — compiles a lesson definition object into a
 * ready-to-present deck (slides + sections + curtain info + brand).
 *
 * Definition shape:
 * {
 *   slug, title, subtitle, level: "A2", style: "storytelling" | "conversation",
 *   brand: { left, right },
 *   speakers: { Name: { tag, color } },
 *   sections: [
 *     { id, label, blocks: [ { type, name?, ...blockProps } ] },
 *   ],
 * }
 */
export function buildLessonFromDefinition(def) {
  const preset = presetFor(def.level);
  const speakers = def.speakers || {};

  const slides = [];
  const sections = [];
  const curtainInfo = {};

  def.sections.forEach((section, si) => {
    const start = slides.length + 1;
    curtainInfo[section.id] = {
      num: ROMAN_NUMERALS[si] || String(si + 1),
      label: section.label,
    };

    section.blocks.forEach((block) => {
      const n = slides.length + 1;
      const Renderer = BLOCK_RENDERERS[block.type];
      const name = block.name || defaultName(block.type);
      const kicker = `Screen ${String(n).padStart(2, "0")} · ${name}`;

      slides.push({
        id: n,
        title: name,
        section: section.id,
        C: Renderer
          ? () => (
              <Renderer block={block} kicker={kicker} preset={preset} speakers={speakers} />
            )
          : () => <UnknownBlock type={block.type} kicker={kicker} />,
      });
    });

    sections.push({ id: section.id, label: section.label, range: [start, slides.length] });
  });

  return {
    slug: def.slug,
    title: def.title,
    subtitle: def.subtitle,
    level: def.level,
    style: def.style || "conversation",
    screenCount: slides.length,
    getDeck: () => ({
      slides,
      sections,
      deckTitle: def.title,
      curtainInfo,
      brand: def.brand || {
        left: "English Speaking Lab",
        right: `${def.title}${def.subtitle ? " · " + def.subtitle : ""}`,
      },
    }),
  };
}

function defaultName(type) {
  const names = {
    title: "Title",
    outcomes: "Lesson Outcomes",
    image: "Observation",
    story: "The Story",
    dialogue: "Conversation",
    vocabulary: "Vocabulary",
    discussion: "Discussion",
    practice: "Practice",
    media: "Watch & Listen",
    comprehension: "Comprehension",
    roleplay: "Role Play",
    homework: "Homework",
    closing: "Closing",
  };
  return names[type] || type;
}

function UnknownBlock({ type, kicker }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-16">
      <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-4">{kicker}</div>
      <div className="heading-serif text-3xl text-gray-400">
        Unknown block type: “{type}”
      </div>
    </div>
  );
}
