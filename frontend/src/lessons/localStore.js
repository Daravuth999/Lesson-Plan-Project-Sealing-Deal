/**
 * localStore — device-local lesson storage for the Instructor Panel.
 *
 * Lessons authored in the Builder live in this browser's localStorage.
 * They never touch the repo and are invisible to anyone without this
 * device. Export a JSON backup regularly (Builder → Export) — clearing
 * browser data would otherwise remove them.
 */

const KEY = "esl-factory-lessons-v1";

export function loadLocalLessons() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveLocalLessons(lessons) {
  window.localStorage.setItem(KEY, JSON.stringify(lessons));
}

export function upsertLocalLesson(def) {
  const all = loadLocalLessons();
  const i = all.findIndex((l) => l.slug === def.slug);
  if (i >= 0) all[i] = def;
  else all.push(def);
  saveLocalLessons(all);
  return all;
}

export function deleteLocalLesson(slug) {
  const all = loadLocalLessons().filter((l) => l.slug !== slug);
  saveLocalLessons(all);
  return all;
}

export function kebab(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function uniqueSlug(base, takenSlugs) {
  let slug = base || "untitled-lesson";
  let n = 2;
  while (takenSlugs.includes(slug)) slug = `${base}-${n++}`;
  return slug;
}

export function blankLesson(slug) {
  return {
    slug,
    title: "Untitled lesson",
    subtitle: "",
    level: "A2",
    style: "conversation",
    speakers: {},
    sections: [
      {
        id: "opening",
        label: "Opening",
        blocks: [
          { type: "title", kicker: "", title: "", subtitle: "", tagline: "" },
        ],
      },
    ],
  };
}

/* ---------- backup / restore ---------- */

export function exportLessonsFile(lessons, filename = "my-lessons-backup.json") {
  const blob = new Blob([JSON.stringify(lessons, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function importLessonsFile(file, onDone) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      const list = Array.isArray(incoming) ? incoming : [incoming];
      const valid = list.filter((l) => l && l.slug && l.sections);
      const all = loadLocalLessons();
      valid.forEach((l) => {
        const i = all.findIndex((x) => x.slug === l.slug);
        if (i >= 0) all[i] = l;
        else all.push(l);
      });
      saveLocalLessons(all);
      onDone({ ok: true, count: valid.length });
    } catch (e) {
      onDone({ ok: false, error: String(e) });
    }
  };
  reader.readAsText(file);
}
