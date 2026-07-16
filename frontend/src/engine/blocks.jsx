import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Film, Music, ChevronDown } from "lucide-react";
import ClickReveal from "../components/ClickReveal";
import Timer from "../components/Timer";

/* ============================================================
   Shared shell — matches the visual idiom of the legacy slides
   ============================================================ */

function SlideShell({ kicker, title, children, tight = false }) {
  return (
    <div
      className={`h-full w-full ${
        tight ? "px-14 py-8" : "px-20 py-14"
      } flex flex-col`}
    >
      {kicker && (
        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-2">
          {kicker}
        </div>
      )}
      {title && (
        <h2 className="heading-serif text-5xl text-gold-50 mb-8 max-w-4xl leading-[1.05]">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

/* ============================================================
   Blocks
   ============================================================ */

function TitleBlock({ block }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-16">
      {block.kicker && (
        <motion.div {...rise(0)} className="flex items-center gap-4 mono text-[11px] uppercase tracking-[0.42em] text-gold-300 mb-8">
          <span className="w-10 h-px bg-gold-300 inline-block" />
          {block.kicker}
          <span className="w-10 h-px bg-gold-300 inline-block" />
        </motion.div>
      )}
      <motion.h1 {...rise(1)} className="heading-serif text-8xl text-gold-50 leading-[1.02] max-w-5xl">
        {block.title}
      </motion.h1>
      {block.subtitle && (
        <motion.div {...rise(2)} className="heading-serif italic text-3xl text-gray-300 mt-6">
          {block.subtitle}
        </motion.div>
      )}
      {block.tagline && (
        <motion.div {...rise(3)} className="flex items-center gap-4 mono text-[11px] uppercase tracking-[0.42em] text-gold-100/80 mt-12">
          <span className="w-10 h-px bg-gold-300/60 inline-block" />
          {block.tagline}
          <span className="w-10 h-px bg-gold-300/60 inline-block" />
        </motion.div>
      )}
    </div>
  );
}

function OutcomesBlock({ block, kicker }) {
  return (
    <SlideShell kicker={kicker} title={block.title || "By the end of today, you will…"}>
      <ul className="space-y-6 max-w-4xl mt-2">
        {(block.items || []).map((item, i) => (
          <motion.li key={i} {...rise(i)} className="flex items-start gap-5">
            <span className="heading-serif text-3xl text-gold-300 leading-none pt-0.5 w-12 shrink-0">
              0{i + 1}
            </span>
            <span className="text-2xl text-gray-100 leading-snug">{item}</span>
          </motion.li>
        ))}
      </ul>
    </SlideShell>
  );
}

function ImageBlock({ block, kicker }) {
  return (
    <SlideShell kicker={kicker} title={block.title} tight>
      <div className="flex-1 flex gap-10 min-h-0">
        <div className="flex-1 min-h-0 flex items-center justify-center">
          {block.url ? (
            <img
              src={block.url}
              alt={block.alt || block.title || "Lesson visual"}
              className="max-h-full max-w-full object-contain rounded-2xl border border-gold-300/25 shadow-stage"
            />
          ) : (
            <MediaPlaceholder icon={<BookOpen size={28} />} label="Add an image URL to this block" />
          )}
        </div>
        {block.prompts && block.prompts.length > 0 && (
          <div className="w-[34%] flex flex-col justify-center gap-5">
            {block.prompts.map((p, i) => (
              <motion.div key={i} {...rise(i)} className="border-l-2 border-gold-300/60 pl-4 text-xl text-gray-100 leading-snug">
                {p}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </SlideShell>
  );
}

/**
 * StoryBlock — storytelling style. Narrative beats revealed one at a time;
 * character quotes styled with speaker colors.
 */
function StoryBlock({ block, kicker, speakers }) {
  const beats = block.beats || [];
  const [shown, setShown] = useState(1);
  const allShown = shown >= beats.length;

  return (
    <SlideShell kicker={kicker} title={block.title} tight>
      <div className="flex-1 overflow-y-auto scroll-elegant pr-4 -mr-2">
        <div className="max-w-4xl space-y-6 pb-4">
          {beats.slice(0, shown).map((beat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              data-testid={`story-beat-${i}`}
            >
              {beat.speaker ? (
                <div
                  className="rounded-md px-5 py-3 bg-ink-800/50 border-l-4"
                  style={{ borderColor: (speakers[beat.speaker] || {}).color || "#DEB966" }}
                >
                  <div
                    className="mono text-[10px] uppercase tracking-[0.28em] mb-1"
                    style={{ color: (speakers[beat.speaker] || {}).color || "#DEB966" }}
                  >
                    {beat.speaker}
                  </div>
                  <div className="heading-serif italic text-2xl text-gold-50 leading-snug">
                    “{beat.text}”
                  </div>
                </div>
              ) : (
                <p className="heading-serif text-[1.7rem] text-gray-100 leading-relaxed first-letter:text-gold-300 first-letter:text-4xl">
                  {beat.text}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="mono text-[10px] uppercase tracking-[0.32em] text-gray-500">
          Beat {Math.min(shown, beats.length)} / {beats.length}
        </div>
        <div className="flex items-center gap-3">
          {!allShown && (
            <button
              data-testid="story-next-beat"
              onClick={() => setShown((s) => Math.min(beats.length, s + 1))}
              className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-ink-800/60 hover:bg-ink-700 text-gold-100 px-5 py-2 text-xs mono uppercase tracking-widest transition-colors"
            >
              Continue the story <ChevronDown size={13} />
            </button>
          )}
          {shown > 1 && (
            <button
              data-testid="story-reset"
              onClick={() => setShown(1)}
              className="mono text-[10px] uppercase tracking-widest text-gray-500 hover:text-gold-100 transition-colors"
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

/**
 * DialogueBlock — conversation style with any speakers, active-turn spotlight.
 */
function DialogueBlock({ block, kicker, speakers }) {
  const turns = block.turns || [];
  const [active, setActive] = useState(0);
  const names = Object.keys(speakers);
  const sideOf = (role) => (names.indexOf(role) % 2 === 0 ? "left" : "right");

  return (
    <SlideShell kicker={kicker} title={block.title} tight>
      <div className="flex-1 overflow-y-auto scroll-elegant pr-4 -mr-2">
        <div className="space-y-3 max-w-5xl">
          {turns.map((turn, idx) => {
            const color = (speakers[turn.role] || {}).color || "#DEB966";
            const left = sideOf(turn.role) === "left";
            const isActive = active === idx;
            return (
              <motion.button
                key={idx}
                onClick={() => setActive(idx)}
                initial={{ opacity: 0, x: left ? -14 : 14 }}
                animate={{ opacity: isActive ? 1 : 0.55, x: 0, scale: isActive ? 1 : 0.99 }}
                transition={{ delay: 0.03 * idx, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full flex gap-4 text-left ${left ? "" : "flex-row-reverse text-right"}`}
                data-testid={`turn-${idx}`}
              >
                <div
                  className="shrink-0 w-20 heading-serif text-lg pt-1"
                  style={{ color }}
                >
                  {turn.role}
                </div>
                <div
                  className="text-lg leading-relaxed text-gray-100 max-w-3xl rounded-md px-5 py-3 transition-all"
                  style={{
                    background: `${color}${isActive ? "1A" : "0D"}`,
                    [left ? "borderLeft" : "borderRight"]: `${isActive ? 4 : 2}px solid ${color}${isActive ? "" : "66"}`,
                    boxShadow: isActive ? `0 0 24px ${color}26` : "none",
                  }}
                >
                  {turn.text}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

function VocabularyBlock({ block, kicker, preset }) {
  const words = (block.words || []).slice(0, block.max || preset.vocabMax);
  const cols = words.length <= 6 ? "grid-cols-3" : "grid-cols-4";
  return (
    <SlideShell kicker={kicker} title={block.title || "Vocabulary"} tight>
      <div className={`flex-1 grid ${cols} gap-4 content-start overflow-y-auto scroll-elegant pr-2`}>
        {words.map((w, i) => (
          <motion.div
            key={w.word}
            {...rise(i * 0.5)}
            className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-5 flex flex-col"
            data-testid={`vocab-card-${w.word}`}
          >
            <div className="heading-serif text-3xl text-gold-50">{w.word}</div>
            <div className="mono text-xs text-gold-300 mt-1">
              {w.ipa} {w.pos && <span className="text-gray-500">· {w.pos}</span>}
            </div>
            <div className="mt-4">
              <ClickReveal label="Meaning" hiddenLabel="Hide" variant="ghost" testId={`vocab-reveal-${w.word}`}>
                <div className="text-sm text-gray-100 leading-snug">{w.meaning}</div>
                {w.example && (
                  <div className="italic text-xs text-gray-400 mt-1.5">“{w.example}”</div>
                )}
              </ClickReveal>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

function DiscussionBlock({ block, kicker, preset }) {
  const seconds = block.timerSeconds || preset.speakSeconds;
  return (
    <SlideShell kicker={kicker} title={block.title || "Let's talk"}>
      <div className="flex-1 flex flex-col max-w-4xl">
        <div className="space-y-6">
          {(block.questions || []).map((q, i) => (
            <motion.div key={i} {...rise(i)} className="flex items-start gap-5">
              <span className="heading-serif text-3xl text-gold-300 leading-none pt-0.5 w-12 shrink-0">
                0{i + 1}
              </span>
              <span className="text-2xl text-gray-100 leading-snug">{q}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-auto pt-10 flex items-center gap-5">
          <Timer seconds={seconds} />
          <span className="mono text-[10px] uppercase tracking-[0.32em] text-gray-500">
            {block.timerLabel || "Speaking time"}
          </span>
        </div>
      </div>
    </SlideShell>
  );
}

function PracticeBlock({ block, kicker, preset }) {
  return (
    <SlideShell kicker={kicker} title={block.title || "Practice"} tight>
      <div className="flex-1 overflow-y-auto scroll-elegant pr-3 max-w-4xl">
        <div className="space-y-4">
          {(block.lines || []).map((line, i) => (
            <motion.div
              key={i}
              {...rise(i * 0.6)}
              className="border-l-2 border-gold-300/50 pl-5 py-1 heading-serif italic text-2xl text-gray-100"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
      {block.timerSeconds !== 0 && (
        <div className="pt-6 flex items-center gap-5">
          <Timer seconds={block.timerSeconds || preset.speakSeconds} />
          <span className="mono text-[10px] uppercase tracking-[0.32em] text-gray-500">
            {block.timerLabel || "Your turn"}
          </span>
        </div>
      )}
    </SlideShell>
  );
}

function youTubeId(url) {
  const m = String(url || "").match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

function MediaPlaceholder({ icon, label }) {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-dashed border-gold-300/30 bg-ink-800/30 flex flex-col items-center justify-center gap-3 py-16 text-gold-300/70">
      {icon}
      <div className="mono text-[10px] uppercase tracking-[0.32em]">{label}</div>
    </div>
  );
}

function MediaBlock({ block, kicker }) {
  const isVideo = (block.media || "video") === "video";
  const yt = isVideo ? youTubeId(block.url) : null;
  return (
    <SlideShell kicker={kicker} title={block.title} tight>
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        {isVideo ? (
          yt ? (
            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-gold-300/25 shadow-stage">
              <iframe
                title={block.title || "Lesson video"}
                src={`https://www.youtube-nocookie.com/embed/${yt}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : block.url ? (
            <video
              src={block.url}
              controls
              className="w-full max-w-4xl rounded-2xl border border-gold-300/25 shadow-stage"
            />
          ) : (
            <MediaPlaceholder icon={<Film size={30} />} label="Add a video link to this block" />
          )
        ) : block.url ? (
          <div className="w-full max-w-2xl rounded-2xl border border-gold-300/25 bg-ink-800/40 p-8">
            <audio src={block.url} controls className="w-full" />
          </div>
        ) : (
          <MediaPlaceholder icon={<Music size={30} />} label="Add an audio link to this block" />
        )}
        {block.task && (
          <div className="mt-8 max-w-3xl text-center">
            <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300 mb-2">
              While you listen
            </div>
            <div className="heading-serif italic text-2xl text-gray-200">{block.task}</div>
          </div>
        )}
      </div>
    </SlideShell>
  );
}

function ComprehensionBlock({ block, kicker }) {
  const groups = block.groups || [];
  return (
    <SlideShell kicker={kicker} title={block.title || "Check understanding"} tight>
      <div className="flex-1 grid gap-6 overflow-y-auto scroll-elegant pr-2" style={{ gridTemplateColumns: `repeat(${Math.min(groups.length, 3)}, 1fr)` }}>
        {groups.map((g, gi) => (
          <motion.div key={gi} {...rise(gi)} className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-6">
            <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300 mb-4">
              {g.label}
            </div>
            <ol className="space-y-4">
              {(g.questions || []).map((q, qi) => (
                <li key={qi} className="flex items-start gap-3 text-lg text-gray-100 leading-snug">
                  <span className="heading-serif text-gold-300 shrink-0">{qi + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

function RoleplayBlock({ block, kicker }) {
  return (
    <SlideShell kicker={kicker} title={block.title || "Your turn to perform"} tight>
      <div className="flex-1 grid grid-cols-3 gap-6">
        {(block.scenarios || []).map((s, i) => (
          <motion.div
            key={i}
            {...rise(i)}
            className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-6 flex flex-col"
          >
            <div className="heading-serif text-4xl text-gold-300 mb-3">0{i + 1}</div>
            <div className="text-xl text-gold-50 leading-snug">{s.title}</div>
            {s.tagline && (
              <div className="mono text-[10px] uppercase tracking-widest text-gray-500 mt-1">
                {s.tagline}
              </div>
            )}
            <div className="mt-5">
              <ClickReveal label="Scenario" hiddenLabel="Hide" testId={`scenario-${i}`}>
                <div className="text-sm text-gray-100 leading-snug">{s.detail}</div>
                {s.roleA && (
                  <div className="text-xs text-gray-400 mt-2">
                    <span className="text-gold-300">A —</span> {s.roleA}
                  </div>
                )}
                {s.roleB && (
                  <div className="text-xs text-gray-400 mt-1">
                    <span className="text-thoughtful">B —</span> {s.roleB}
                  </div>
                )}
              </ClickReveal>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

function HomeworkBlock({ block, kicker }) {
  return (
    <SlideShell kicker={kicker} title={block.title || "Before next class"}>
      <ul className="space-y-6 max-w-4xl">
        {(block.items || []).map((item, i) => (
          <motion.li key={i} {...rise(i)} className="flex items-start gap-4">
            <span className="mt-2 w-2.5 h-2.5 rounded-full bg-gold-300 shrink-0" />
            <span className="text-2xl text-gray-100 leading-snug">{item}</span>
          </motion.li>
        ))}
      </ul>
    </SlideShell>
  );
}

function ClosingBlock({ block }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-16">
      <motion.div {...rise(0)} className="mono text-[11px] uppercase tracking-[0.42em] text-gold-300 mb-8">
        {block.kicker || "Thank you"}
      </motion.div>
      <motion.h1 {...rise(1)} className="heading-serif text-7xl text-gold-50 leading-[1.05] max-w-5xl italic">
        {block.title}
      </motion.h1>
      {block.subtitle && (
        <motion.div {...rise(2)} className="heading-serif text-2xl text-gray-300 mt-8">
          {block.subtitle}
        </motion.div>
      )}
    </div>
  );
}

/* ============================================================
   Registry
   ============================================================ */

export const BLOCK_RENDERERS = {
  title: TitleBlock,
  outcomes: OutcomesBlock,
  image: ImageBlock,
  story: StoryBlock,
  dialogue: DialogueBlock,
  vocabulary: VocabularyBlock,
  discussion: DiscussionBlock,
  practice: PracticeBlock,
  media: MediaBlock,
  comprehension: ComprehensionBlock,
  roleplay: RoleplayBlock,
  homework: HomeworkBlock,
  closing: ClosingBlock,
};
