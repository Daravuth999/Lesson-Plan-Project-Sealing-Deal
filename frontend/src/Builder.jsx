import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Plus, Trash2, Copy, Download, Upload, ChevronUp,
  ChevronDown, Presentation, Pencil, BookOpen,
} from "lucide-react";
import {
  loadLocalLessons, upsertLocalLesson, deleteLocalLesson, blankLesson,
  kebab, uniqueSlug, exportLessonsFile, importLessonsFile,
} from "./lessons/localStore";
import { BUILTIN_SLUGS } from "./lessons";

/**
 * Builder — the Instructor Panel (#/builder).
 *
 * Author lessons by filling in forms; no code. Lessons are stored on THIS
 * device (browser storage) and appear in the Library instantly. Students
 * never see this panel: it has no presence on the presentation stage and
 * is reached only via the hidden presenter HUD → Library.
 */

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SPEAKER_COLORS = ["#E6B863", "#6BA8E8", "#5FCF80", "#E86B6B", "#C08BE8"];

const BLOCK_TYPES = [
  { type: "title", label: "Title screen" },
  { type: "outcomes", label: "Lesson outcomes" },
  { type: "image", label: "Image / observation" },
  { type: "story", label: "Story (beats)" },
  { type: "dialogue", label: "Dialogue" },
  { type: "rehearsal", label: "Rehearsal (hands-free)" },
  { type: "vocabulary", label: "Vocabulary" },
  { type: "discussion", label: "Discussion + timer" },
  { type: "practice", label: "Practice lines" },
  { type: "media", label: "Audio / video link" },
  { type: "comprehension", label: "Comprehension" },
  { type: "roleplay", label: "Role play" },
  { type: "homework", label: "Homework" },
  { type: "closing", label: "Closing screen" },
];

function newBlock(type) {
  switch (type) {
    case "title": return { type, kicker: "", title: "", subtitle: "", tagline: "" };
    case "outcomes": return { type, items: [] };
    case "image": return { type, title: "", url: "", prompts: [] };
    case "story": return { type, title: "", beats: [] };
    case "dialogue": return { type, title: "", turns: [] };
    case "rehearsal": return { type, title: "", turns: [] };
    case "vocabulary": return { type, title: "", words: [] };
    case "discussion": return { type, title: "", questions: [] };
    case "practice": return { type, title: "", lines: [] };
    case "media": return { type, media: "video", title: "", url: "", task: "" };
    case "comprehension": return { type, title: "", groups: [] };
    case "roleplay": return { type, title: "", scenarios: [] };
    case "homework": return { type, items: [] };
    case "closing": return { type, kicker: "", title: "", subtitle: "" };
    default: return { type };
  }
}

/* ============================================================
   Plain-text <-> structure converters (instructor-typeable)
   ============================================================ */

const lines = (text) => String(text || "").split("\n").map((l) => l.trim()).filter(Boolean);
const listToText = (arr) => (arr || []).join("\n");

function turnsToText(turns) {
  return (turns || []).map((t) => `${t.role}: ${t.text}`).join("\n");
}
function textToTurns(text) {
  return lines(text).map((l) => {
    const m = l.match(/^([^:]{1,30}):\s*(.+)$/);
    return m ? { role: m[1].trim(), text: m[2] } : { role: "?", text: l };
  });
}

function beatsToText(beats) {
  return (beats || [])
    .map((b) => (b.speaker ? `${b.speaker}: ${b.text}` : b.text))
    .join("\n");
}
function textToBeats(text, speakerNames) {
  return lines(text).map((l) => {
    const m = l.match(/^([^:]{1,30}):\s*(.+)$/);
    if (m && speakerNames.includes(m[1].trim())) {
      return { speaker: m[1].trim(), text: m[2] };
    }
    return { text: l };
  });
}

function vocabToText(words) {
  return (words || [])
    .map((w) => [w.word, w.ipa, w.pos, w.meaning, w.example].map((x) => x || "").join(" | "))
    .join("\n");
}
function textToVocab(text) {
  return lines(text).map((l) => {
    const [word, ipa, pos, meaning, example] = l.split("|").map((x) => (x || "").trim());
    return { word: word || "", ipa: ipa || "", pos: pos || "", meaning: meaning || "", example: example || "" };
  }).filter((w) => w.word);
}

function groupsToText(groups) {
  return (groups || [])
    .map((g) => [`# ${g.label}`, ...(g.questions || [])].join("\n"))
    .join("\n");
}
function textToGroups(text) {
  const out = [];
  lines(text).forEach((l) => {
    if (l.startsWith("#")) out.push({ label: l.replace(/^#+\s*/, ""), questions: [] });
    else if (out.length) out[out.length - 1].questions.push(l);
    else out.push({ label: "Questions", questions: [l] });
  });
  return out;
}

function scenariosToText(scenarios) {
  return (scenarios || [])
    .map((s) => [s.title, s.tagline, s.detail, s.roleA, s.roleB].map((x) => x || "").join(" | "))
    .join("\n");
}
function textToScenarios(text) {
  return lines(text).map((l) => {
    const [title, tagline, detail, roleA, roleB] = l.split("|").map((x) => (x || "").trim());
    return { title: title || "", tagline: tagline || "", detail: detail || "", roleA: roleA || "", roleB: roleB || "" };
  }).filter((s) => s.title);
}

/* ============================================================
   Small styled primitives
   ============================================================ */

const inputCls =
  "w-full bg-ink-800/70 border border-gold-300/20 rounded-md px-3 py-2 text-sm text-gold-50 placeholder:text-gray-600 focus:border-gold-300/60 outline-none";

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <div className="mono text-[10px] uppercase tracking-[0.28em] text-gold-300 mb-1.5">
        {label}
        {hint && <span className="text-gray-500 normal-case tracking-normal ml-2">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Text({ value, onChange, placeholder }) {
  return (
    <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
  );
}

function Area({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={`${inputCls} resize-y leading-relaxed`} />
  );
}

function Chip({ onClick, children, tone = "normal", testId }) {
  const cls =
    tone === "danger"
      ? "border-fall/40 text-fall hover:bg-fall/10"
      : tone === "primary"
      ? "border-gold-300 bg-gold-300/15 text-gold-50 hover:bg-gold-300/25"
      : "border-gold-300/25 text-gold-100 hover:bg-gold-300/10";
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${cls}`}
    >
      {children}
    </button>
  );
}

/* ============================================================
   Per-block editors
   ============================================================ */

function BlockEditor({ block, onChange, speakerNames }) {
  const set = (patch) => onChange({ ...block, ...patch });
  const turnsHint = 'one line per turn — "Name: sentence"';

  switch (block.type) {
    case "title":
    case "closing":
      return (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Small line above"><Text value={block.kicker} onChange={(v) => set({ kicker: v })} /></Field>
          <Field label="Main title"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Subtitle"><Text value={block.subtitle} onChange={(v) => set({ subtitle: v })} /></Field>
          {block.type === "title" && (
            <Field label="Small line below"><Text value={block.tagline} onChange={(v) => set({ tagline: v })} /></Field>
          )}
        </div>
      );
    case "outcomes":
    case "homework":
      return (
        <Field label="Items" hint="one per line">
          <Area value={listToText(block.items)} onChange={(v) => set({ items: lines(v) })} />
        </Field>
      );
    case "image":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
            <Field label="Image link"><Text value={block.url} onChange={(v) => set({ url: v })} placeholder="https://…" /></Field>
          </div>
          <Field label="Talking prompts" hint="one per line">
            <Area value={listToText(block.prompts)} onChange={(v) => set({ prompts: lines(v) })} rows={3} />
          </Field>
        </div>
      );
    case "story":
      return (
        <div className="space-y-3">
          <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Story beats" hint='one per line · narration is plain text · character lines are "Name: quote" (add the character in Speakers above)'>
            <Area value={beatsToText(block.beats)} onChange={(v) => set({ beats: textToBeats(v, speakerNames) })} rows={7} />
          </Field>
        </div>
      );
    case "dialogue":
    case "rehearsal":
      return (
        <div className="space-y-3">
          <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Turns" hint={turnsHint}>
            <Area value={turnsToText(block.turns)} onChange={(v) => set({ turns: textToTurns(v) })} rows={7} />
          </Field>
        </div>
      );
    case "vocabulary":
      return (
        <div className="space-y-3">
          <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Words" hint="one per line — word | ipa | part of speech | meaning | example">
            <Area value={vocabToText(block.words)} onChange={(v) => set({ words: textToVocab(v) })} rows={6} />
          </Field>
        </div>
      );
    case "discussion":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
            <Field label="Timer seconds" hint="blank = automatic from level">
              <Text value={block.timerSeconds ? String(block.timerSeconds) : ""} onChange={(v) => set({ timerSeconds: parseInt(v, 10) || undefined })} placeholder="60" />
            </Field>
          </div>
          <Field label="Questions" hint="one per line">
            <Area value={listToText(block.questions)} onChange={(v) => set({ questions: lines(v) })} />
          </Field>
        </div>
      );
    case "practice":
      return (
        <div className="space-y-3">
          <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Practice lines" hint="one per line">
            <Area value={listToText(block.lines)} onChange={(v) => set({ lines: lines(v) })} />
          </Field>
        </div>
      );
    case "media":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Kind">
              <select value={block.media || "video"} onChange={(e) => set({ media: e.target.value })} className={inputCls}>
                <option value="video">Video (YouTube or file)</option>
                <option value="audio">Audio</option>
              </select>
            </Field>
            <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
            <Field label="Link"><Text value={block.url} onChange={(v) => set({ url: v })} placeholder="https://…" /></Field>
          </div>
          <Field label="Listening task"><Text value={block.task} onChange={(v) => set({ task: v })} /></Field>
        </div>
      );
    case "comprehension":
      return (
        <div className="space-y-3">
          <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Question groups" hint='"# Group name" starts a group; question lines follow'>
            <Area value={groupsToText(block.groups)} onChange={(v) => set({ groups: textToGroups(v) })} rows={6} />
          </Field>
        </div>
      );
    case "roleplay":
      return (
        <div className="space-y-3">
          <Field label="Heading"><Text value={block.title} onChange={(v) => set({ title: v })} /></Field>
          <Field label="Scenarios" hint="one per line — title | tagline | scenario | role A | role B">
            <Area value={scenariosToText(block.scenarios)} onChange={(v) => set({ scenarios: textToScenarios(v) })} rows={4} />
          </Field>
        </div>
      );
    default:
      return <div className="text-gray-500 text-sm">Unknown block type.</div>;
  }
}

/* ============================================================
   Lesson editor
   ============================================================ */

function LessonEditor({ initial, onBack }) {
  const [def, setDef] = useState(initial);
  const speakerNames = Object.keys(def.speakers || {});

  // Autosave on every change.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    upsertLocalLesson(def);
  }, [def]);

  const setSection = (si, patch) => {
    const sections = def.sections.map((s, i) => (i === si ? { ...s, ...patch } : s));
    setDef({ ...def, sections });
  };
  const setBlock = (si, bi, block) => {
    const blocks = def.sections[si].blocks.map((b, i) => (i === bi ? block : b));
    setSection(si, { blocks });
  };
  const moveBlock = (si, bi, dir) => {
    const blocks = [...def.sections[si].blocks];
    const j = bi + dir;
    if (j < 0 || j >= blocks.length) return;
    [blocks[bi], blocks[j]] = [blocks[j], blocks[bi]];
    setSection(si, { blocks });
  };
  const removeBlock = (si, bi) => {
    setSection(si, { blocks: def.sections[si].blocks.filter((_, i) => i !== bi) });
  };
  const addBlock = (si, type) => {
    setSection(si, { blocks: [...def.sections[si].blocks, newBlock(type)] });
  };
  const moveSection = (si, dir) => {
    const sections = [...def.sections];
    const j = si + dir;
    if (j < 0 || j >= sections.length) return;
    [sections[si], sections[j]] = [sections[j], sections[si]];
    setDef({ ...def, sections });
  };
  const addSection = () => {
    setDef({
      ...def,
      sections: [
        ...def.sections,
        { id: `s${Date.now().toString(36)}`, label: "New section", blocks: [] },
      ],
    });
  };
  const removeSection = (si) => {
    if (!window.confirm("Remove this section and its screens?")) return;
    setDef({ ...def, sections: def.sections.filter((_, i) => i !== si) });
  };

  const setSpeaker = (oldName, name, meta) => {
    const speakers = {};
    Object.entries(def.speakers || {}).forEach(([k, v]) => {
      if (k === oldName) { if (name) speakers[name] = meta; }
      else speakers[k] = v;
    });
    if (oldName === null && name) speakers[name] = meta;
    setDef({ ...def, speakers });
  };

  const screenCount = def.sections.reduce((n, s) => n + s.blocks.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.32em] text-gray-500 hover:text-gold-100 transition-colors" data-testid="editor-back">
          <ArrowLeft size={13} /> All my lessons
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-widest text-gray-500">
            {screenCount} screens · saved automatically
          </span>
          <Chip tone="primary" testId="editor-present" onClick={() => (window.location.hash = `#/lesson/${def.slug}`)}>
            <Presentation size={11} /> Present
          </Chip>
        </div>
      </div>

      {/* Lesson metadata */}
      <div className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Field label="Lesson title">
            <Text value={def.title} onChange={(v) => setDef({ ...def, title: v })} placeholder="My lesson title" />
          </Field>
          <Field label="Subtitle">
            <Text value={def.subtitle} onChange={(v) => setDef({ ...def, subtitle: v })} placeholder="A Storytelling Lesson" />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Level" hint="adjusts timers automatically">
            <select value={def.level} onChange={(e) => setDef({ ...def, level: e.target.value })} className={inputCls} data-testid="editor-level">
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Style">
            <select value={def.style} onChange={(e) => setDef({ ...def, style: e.target.value })} className={inputCls}>
              <option value="conversation">Conversation</option>
              <option value="storytelling">Storytelling</option>
            </select>
          </Field>
          <Field label="Lesson link" hint="fixed">
            <div className={`${inputCls} text-gray-500 select-all`}>#/lesson/{def.slug}</div>
          </Field>
        </div>
      </div>

      {/* Speakers */}
      <div className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-6 mb-6">
        <div className="mono text-[10px] uppercase tracking-[0.28em] text-gold-300 mb-3">
          Speakers / characters <span className="text-gray-500 normal-case tracking-normal ml-2">used by story, dialogue and rehearsal blocks</span>
        </div>
        <div className="space-y-2">
          {Object.entries(def.speakers || {}).map(([name, meta]) => (
            <div key={name} className="flex items-center gap-2">
              <input type="color" value={meta.color || "#E6B863"} onChange={(e) => setSpeaker(name, name, { ...meta, color: e.target.value })} className="w-9 h-9 rounded-md bg-transparent border border-gold-300/20 cursor-pointer" title="Speaker color" />
              <input type="text" value={name} onChange={(e) => setSpeaker(name, e.target.value, meta)} className={`${inputCls} max-w-[200px]`} placeholder="Name" />
              <input type="text" value={meta.tag || ""} onChange={(e) => setSpeaker(name, name, { ...meta, tag: e.target.value })} className={`${inputCls} max-w-[240px]`} placeholder="Role, e.g. Café owner" />
              <button onClick={() => setSpeaker(name, "", meta)} className="p-2 text-gray-500 hover:text-fall transition-colors" aria-label="Remove speaker"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Chip testId="add-speaker" onClick={() => setSpeaker(null, `Speaker ${speakerNames.length + 1}`, { tag: "", color: SPEAKER_COLORS[speakerNames.length % SPEAKER_COLORS.length] })}>
            <Plus size={11} /> Add speaker
          </Chip>
        </div>
      </div>

      {/* Sections */}
      {def.sections.map((section, si) => (
        <div key={section.id} className="border border-gold-300/25 bg-ink-800/40 rounded-2xl p-6 mb-6" data-testid={`section-${si}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="heading-serif text-2xl text-gold-300">{String(si + 1).padStart(2, "0")}</span>
            <input type="text" value={section.label} onChange={(e) => setSection(si, { label: e.target.value })} className={`${inputCls} max-w-[320px] heading-serif text-lg`} />
            <div className="ml-auto flex items-center gap-1">
              <button onClick={() => moveSection(si, -1)} className="p-1.5 text-gray-500 hover:text-gold-100" aria-label="Move section up"><ChevronUp size={15} /></button>
              <button onClick={() => moveSection(si, 1)} className="p-1.5 text-gray-500 hover:text-gold-100" aria-label="Move section down"><ChevronDown size={15} /></button>
              <button onClick={() => removeSection(si)} className="p-1.5 text-gray-500 hover:text-fall" aria-label="Remove section"><Trash2 size={15} /></button>
            </div>
          </div>

          <div className="space-y-4">
            {section.blocks.map((block, bi) => (
              <div key={bi} className="border border-gold-300/15 bg-ink-900/50 rounded-xl p-5" data-testid={`block-${si}-${bi}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-thoughtful/40 text-thoughtful">
                    {(BLOCK_TYPES.find((b) => b.type === block.type) || {}).label || block.type}
                  </span>
                  <input
                    type="text"
                    value={block.name || ""}
                    onChange={(e) => setBlock(si, bi, { ...block, name: e.target.value })}
                    placeholder="Screen label (optional)"
                    className={`${inputCls} max-w-[260px] !py-1 text-xs`}
                  />
                  <div className="ml-auto flex items-center gap-1">
                    <button onClick={() => moveBlock(si, bi, -1)} className="p-1.5 text-gray-500 hover:text-gold-100" aria-label="Move screen up"><ChevronUp size={14} /></button>
                    <button onClick={() => moveBlock(si, bi, 1)} className="p-1.5 text-gray-500 hover:text-gold-100" aria-label="Move screen down"><ChevronDown size={14} /></button>
                    <button onClick={() => removeBlock(si, bi)} className="p-1.5 text-gray-500 hover:text-fall" aria-label="Remove screen"><Trash2 size={14} /></button>
                  </div>
                </div>
                <BlockEditor block={block} onChange={(b) => setBlock(si, bi, b)} speakerNames={speakerNames} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="mono text-[10px] uppercase tracking-[0.28em] text-gray-500 mr-1">Add screen:</span>
            {BLOCK_TYPES.map((b) => (
              <Chip key={b.type} testId={`add-block-${b.type}-${si}`} onClick={() => addBlock(si, b.type)}>
                <Plus size={10} /> {b.label}
              </Chip>
            ))}
          </div>
        </div>
      ))}

      <Chip testId="add-section" onClick={addSection}>
        <Plus size={11} /> Add section
      </Chip>
    </div>
  );
}

/* ============================================================
   Builder home — my lessons
   ============================================================ */

export default function Builder() {
  const [locals, setLocals] = useState(loadLocalLessons());
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");
  const fileRef = useRef(null);

  const refresh = () => setLocals(loadLocalLessons());

  const createLesson = () => {
    const taken = [...BUILTIN_SLUGS, ...locals.map((l) => l.slug)];
    const slug = uniqueSlug(uniqueSlug("my-lesson", taken), taken);
    const def = blankLesson(slug);
    upsertLocalLesson(def);
    refresh();
    setEditing(def);
  };

  const duplicate = (def) => {
    const taken = [...BUILTIN_SLUGS, ...locals.map((l) => l.slug)];
    const copy = JSON.parse(JSON.stringify(def));
    copy.slug = uniqueSlug(`${kebab(def.title) || def.slug}-copy`, taken);
    copy.title = `${def.title} (copy)`;
    upsertLocalLesson(copy);
    refresh();
  };

  const remove = (def) => {
    if (!window.confirm(`Delete "${def.title}" from this device? Export a backup first if unsure.`)) return;
    deleteLocalLesson(def.slug);
    refresh();
  };

  if (editing) {
    return (
      <div className="relative w-screen h-screen stage-bg overflow-y-auto scroll-elegant grain">
        <LessonEditor
          initial={editing}
          onBack={() => { setEditing(null); refresh(); }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen stage-bg overflow-y-auto scroll-elegant grain">
      <div className="max-w-5xl mx-auto px-10 py-14">
        <button
          onClick={() => (window.location.hash = "#/library")}
          className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.32em] text-gray-500 hover:text-gold-100 transition-colors mb-10"
          data-testid="builder-back"
        >
          <ArrowLeft size={13} /> Lesson Library
        </button>

        <div className="mono text-xs uppercase tracking-[0.32em] text-gold-300 mb-3">
          Instructor Panel
        </div>
        <h1 className="heading-serif text-6xl text-gold-50 mb-3">Lesson Builder</h1>
        <p className="text-gray-400 max-w-2xl mb-4">
          Create and edit lessons by filling in the forms — no code. Lessons are
          stored on this device and appear in your Library instantly. Students
          never see this panel.
        </p>
        <p className="mono text-[10px] uppercase tracking-[0.28em] text-gold-300/70 mb-10">
          Tip: export a backup after editing — lessons live in this browser only.
        </p>

        <div className="flex items-center gap-2 mb-8">
          <Chip tone="primary" testId="builder-new" onClick={createLesson}>
            <Plus size={11} /> New lesson
          </Chip>
          <Chip testId="builder-export" onClick={() => { if (locals.length) exportLessonsFile(locals); }}>
            <Download size={11} /> Export backup
          </Chip>
          <Chip testId="builder-import" onClick={() => fileRef.current && fileRef.current.click()}>
            <Upload size={11} /> Import backup
          </Chip>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              if (f) importLessonsFile(f, (res) => {
                setNotice(res.ok ? `Imported ${res.count} lesson(s).` : "Import failed — is it a backup file?");
                refresh();
              });
              e.target.value = "";
            }}
          />
          {notice && <span className="mono text-[10px] uppercase tracking-widest text-gold-300 ml-2">{notice}</span>}
        </div>

        {locals.length === 0 ? (
          <div className="border border-dashed border-gold-300/30 rounded-2xl py-16 flex flex-col items-center gap-3 text-gold-300/70">
            <BookOpen size={26} />
            <div className="mono text-[10px] uppercase tracking-[0.32em]">
              No lessons on this device yet — click "New lesson" to start
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {locals.map((l, i) => (
              <motion.div
                key={l.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-left rounded-2xl border border-gold-300/25 bg-ink-800/40 p-7"
                data-testid={`builder-card-${l.slug}`}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-300/40 text-gold-300">{l.level}</span>
                  <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-thoughtful/40 text-thoughtful">{l.style}</span>
                  <span className="ml-auto mono text-[10px] uppercase tracking-widest text-gray-500">
                    {(l.sections || []).reduce((n, s) => n + (s.blocks || []).length, 0)} screens
                  </span>
                </div>
                <div className="heading-serif text-4xl text-gold-50">{l.title}</div>
                {l.subtitle && <div className="heading-serif italic text-xl text-gray-400 mt-1">{l.subtitle}</div>}
                <div className="mt-6 flex items-center gap-2">
                  <Chip tone="primary" testId={`builder-edit-${l.slug}`} onClick={() => setEditing(l)}>
                    <Pencil size={11} /> Edit
                  </Chip>
                  <Chip onClick={() => (window.location.hash = `#/lesson/${l.slug}`)}>
                    <Presentation size={11} /> Present
                  </Chip>
                  <Chip onClick={() => duplicate(l)}>
                    <Copy size={11} /> Duplicate
                  </Chip>
                  <Chip tone="danger" onClick={() => remove(l)}>
                    <Trash2 size={11} /> Delete
                  </Chip>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
