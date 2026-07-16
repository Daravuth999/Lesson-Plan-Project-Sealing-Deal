# Presenter Cheat Sheet
### English Speaking Lab · Lesson Factory · V2

Print this and keep it next to your keyboard.

## Navigation
| Key | Action |
|-----|--------|
| `→` `Space` `PgDn` | Next slide |
| `←` `PgUp` | Previous slide |
| `⊞` icon | Section menu (jump to any section) |
| `Esc` | Close any open overlay + hide the HUD |

## Presenter tools
**All instructor controls are invisible to students.** Press `P` to show/hide
your HUD (the toolbelt on the right). The hotkeys below work even while the
HUD is hidden, so nothing instructor-facing ever appears on the shared screen.

| Key | Tool | Best used for |
|-----|------|---------------|
| `P` | Presenter HUD | Show/hide your toolbelt (students never need to see it) |
| `L` | Laser Pointer | Pointing at a specific word / phrase |
| `I` | Ink Mode | Underlining stress · circling vocab · sketching curves |
| `Ctrl+Z` (during Ink) | Undo last stroke | Removing an accidental line |
| `E` | Erase all ink | Clearing the slide of annotations |
| `C` | Chat Wall | Displaying student Zoom-chat responses |
| `Z` | Zoom-Safe Scale | Bump size + contrast when students are on phones |

## Rehearsal Mode (Screen 13 · Performance Mode)
Hands-free role-play: a golden spotlight walks down the full dialogue
(parts 1 + 2 combined) at a natural reading pace and auto-scrolls — you stay
passive and just listen while students perform.

| Key | Action |
|-----|--------|
| `R` | Start rehearsal (3-2-1 count-in) · press again to stop |
| `Space` | Pause / resume **while rehearsing** (otherwise Space = next slide) |
| `↑` / `↓` | Nudge the spotlight back / forward a turn |
| Calm / Natural / Brisk | Pace chips — pick per class level |

At the end it offers "Rehearse again" — loop through as many pairs as you like.
The Sarah/David focus toggles still work, so a pair can rehearse one role with
the other side dimmed.

## Lesson Library (multi-lesson factory)
- Press `P` → click the **book icon** (or open `#/library`) to switch lessons.
- The root URL always opens **Sealing the Deal**, exactly as your students know it.
- Each lesson also has a direct link: `#/lesson/<name>`.
- Add `?screen=14` to any lesson URL to resume directly at screen 14 after a refresh.
- New lessons are plain content files: duplicate
  `frontend/src/lessons/_lesson-template.js`, fill in YOUR content, register it
  in `lessons/index.js`. Blocks available: title, outcomes, image, **story**
  (storytelling beats), **dialogue** (conversation), vocabulary, discussion,
  practice, **media** (audio/video link), comprehension, roleplay, homework,
  closing. The CEFR `level` field (A1–C2) auto-adjusts timers and vocabulary
  density. Nothing appears in the Library until you register it yourself.

## Suggested class flow (60–90 min)

1. **Screens 1–2** · Open — cinematic title + outcomes. *No tools needed.*
2. **Screens 3–4** · Observation & speaking challenge — start the **60s timer** on Screen 4. Use `L` (laser) to point at details in the meeting photo.
3. **Screens 5–6** · Prediction & warm-up — turn on `C` (Chat Wall) and post 2–3 student responses.
4. **Screens 7–9** · Vocabulary — use Guess Mode (Screen 8); reveal *IPA → POS → Meaning → Collocations* in that order for each word.
5. **Screens 10–13** · Conversation — click each turn to highlight the active speaker; use `L` (laser) to point at vocabulary; students read along.
6. **Screen 14** · Strategy — click each strategy card to reveal the matching quote from the script.
7. **Screens 15–19** · Pronunciation — use `I` (ink) to underline stressed syllables and draw intonation curves by hand.
8. **Screens 20–24** · Practice — shadowing (`Show stress` + `Show intonation` toggles).
9. **Screens 25–27** · Comprehension — three-tab triptych. Use `C` (Chat Wall) for reflection responses.
10. **Screens 28–32** · Role play — pick a scenario; start the **90s timer** on Screen 31.
11. **Screens 33–34** · Homework + closing — tap the homework items to check them off; watch the signature animation.

## Pro tips

- **Turn on `Z` (Zoom-Safe)** if any student says "the text is small on my phone." Better yet, share your class link with `?zoom=1` appended.
- **Turn on `L` (Laser)** *before* starting to explain each new visual concept. Students trust what they can see.
- **Use `C` (Chat Wall)** to make quiet students feel heard — paste their Zoom-chat reply, and they see their name up in gold on the shared screen.
- **Use `I` (Ink Mode) sparingly** — one strong underline is better than five casual scribbles. Press `E` to reset when starting a new example.
- **The section curtain** happens automatically between sections. Don't press "next" too fast during the ~1.5s transition — let the Roman-numeral card land for dramatic effect.

---

*Let's get it signed.*
