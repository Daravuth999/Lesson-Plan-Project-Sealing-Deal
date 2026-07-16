# Sealing the Deal — Client Meetings & Negotiation
## V1 · Zoom-Native Adaptive Lesson System

A cinematic, instructor-controlled, student-facing lesson experience purpose-built
for **online classroom teaching over Zoom**. A polished 34-screen React deck for
adult business-English learners, with premium corporate visual style and eight
Zoom-native presenter superpowers layered on top.

---

## What's new in V1

Every V1 feature is designed around five hard realities of teaching over Zoom:
video compression, no student-side cursor, audio latency, tiny student windows,
and chat being the only reliable student input channel.

| Key | Tool | What it does |
|-----|------|--------------|
| **L** | **Laser Pointer** | Cursor becomes a large glowing gold dot with a soft trail — students can see exactly where you're pointing, even after Zoom compression. |
| **I** | **Ink Mode** | Draw gold annotations directly on any slide (underline stress, circle words, sketch curves). `Ctrl+Z` undo · `E` erase all. |
| **C** | **Chat Wall** | Slide-in glass panel to display Zoom-chat responses as beautiful animated cards. Great for warm-up, reflection, and cold-calling. |
| **Z** | **Zoom-Safe Scale** | Bumps type size +15%, thickens strokes, lifts contrast for shared-screen legibility. Auto-on with `?zoom=1` URL param. |
| — | **Speaker Avatars** | Sarah (gold) and David (blue) silhouettes on the dialogue slides, with the active speaker glowing and the other dimmed. |
| — | **Now Speaking caption** | Netflix-style lower-third strip on dialogue slides — students can never lose track of who's talking. |
| — | **Curtain-Raiser transitions** | Between sections, a full-bleed cinematic curtain drops with a big Roman-numeral act card. Deck feels like theatre, not slides. |
| — | **Animated Signature** | The closing screen draws an actual signature across a contract line, finishing with a wax seal. Emotional final beat that lands the theme. |

Plus everything from V0:
- 34 screens end-to-end
- Animated SVG intonation curves (rising / falling / rise-fall / fall-rise)
- Rhythm voice-wave · linking-sound bridges · stress-syllable pulse
- 60s / 90s speaking timers
- Click-to-reveal cues, listening blanks, homework checklist
- Keyboard nav (`→ ← Space PgUp PgDn`) + section menu (`⊞`) + `Esc` to close

---

## Tech stack

- **React 18** (Create React App)
- **Framer Motion** — transitions and micro-animations
- **Tailwind CSS** — utility styling
- **Lucide React** — icons
- **Fonts** (Google): Cormorant Garamond, IBM Plex Sans, IBM Plex Mono
- **Backend**: minimal FastAPI stub in `/backend` exposing only `/api/health`
  (deck is fully client-side; you can host `/frontend` alone if you prefer)

---

## Quick start

### Prerequisites
- Node.js 18+ and Yarn (`npm i -g yarn`)
- Python 3.11+ (optional, only if you want the backend health stub)

### Install & run the frontend
```bash
cd frontend
yarn install
yarn start          # opens http://localhost:3000
```

### Optional: run the backend health stub
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Environment
- `frontend/.env` — `REACT_APP_BACKEND_URL` (only used by the health stub;
  the presentation is fully client-side and works even if the backend is off).
- `backend/.env`  — `MONGO_URL`, `DB_NAME` (unused by lesson content; kept for
  the FastAPI scaffold).

---

## Teaching over Zoom — how to run a class

1. **Open the deck** — `http://localhost:3000` (or your deployed URL).
   Optional: append `?zoom=1` to auto-enable Zoom-Safe mode.
2. **Hit F11** — full-screen the browser.
3. **Start Zoom → Share Screen → Window → your browser**.
   Recommend enabling *"Optimize for video clips"* off; leave *"Share sound"* on.
4. **Walk the deck** with `→` / `←` or `Space`.
5. **Tap the ⊞ icon** (bottom bar center) any time to jump between sections.

### Presenter shortcuts (memorize these)
- `L` — toggle **Laser Pointer**
- `I` — toggle **Ink Mode**  · `Ctrl+Z` undo · `E` erase
- `C` — toggle **Chat Wall**
- `Z` — toggle **Zoom-Safe Scale**
- `Esc` — close any open overlay
- `→` `←` `Space` `PgUp` `PgDn` — navigate slides

### Recommended workflow
- Use **Laser Pointer** whenever you point at a specific word.
- Use **Ink Mode** to underline the stressed syllable, circle a vocab word, or draw
  an intonation curve by hand.
- Use **Chat Wall** during warm-up (Screen 6), reflection (Screen 26), and any
  discussion moment — paste students' Zoom-chat responses into the panel.
- Enable **Zoom-Safe Scale** if you notice students on phones straining to read.

---

## Project layout

```
frontend/src/
├── App.js                        # slide state + keyboard + presenter tools + curtain
├── data/lesson.js                # ALL lesson content (vocab, dialogue, phrases…)
├── components/
│   ├── InstructorNav.jsx         # bottom bar + section menu overlay
│   ├── PresenterTools.jsx        # V1: laser, ink, chat wall, zoom-safe (L / I / C / Z)
│   ├── SectionCurtain.jsx        # V1: cinematic "act break" between sections
│   ├── SpeakerAvatar.jsx         # V1: Sarah / David silhouettes with active glow
│   ├── NowSpeakingCaption.jsx    # V1: Netflix-style lower-third caption
│   ├── CueWord.jsx               # click-to-reveal vocabulary word
│   ├── ClickReveal.jsx           # hidden answer / definition chip
│   ├── IntonationCurve.jsx       # animated SVG rising/falling/rise-fall/fall-rise
│   ├── VoiceWave.jsx             # rhythm underline wave
│   ├── LinkingBridge.jsx         # arc connecting linked words
│   ├── Timer.jsx                 # 60s / 90s speaking timer
│   └── StressWord.jsx            # stressed-syllable pulse
└── slides/
    ├── Intro.jsx                 # Screens 1–6
    ├── Vocabulary.jsx            # Screens 7–9
    ├── Conversation.jsx          # Screens 10–14 (with V1 avatars + caption)
    ├── Pronunciation.jsx         # Screens 15–19
    ├── Practice.jsx              # Screens 20–24
    ├── Comprehension.jsx         # Screens 25–27
    ├── Roleplay.jsx              # Screens 28–32
    ├── Closing.jsx               # Screens 33–34 (with V1 animated signature)
    └── index.js                  # SLIDES registry
backend/
├── server.py                     # FastAPI /api/health stub
├── requirements.txt
└── .env
```

---

## Hosting

- **Any static host works** for the frontend: Vercel, Netlify, GitHub Pages,
  Cloudflare Pages, S3+CloudFront. Run `yarn build` → deploy the `build/` folder.
- The backend stub is optional (not required for the lesson to run).

### GitHub

Just push this repo to GitHub. This project has been prepared to be ready to host:
- Clean structure, no lockfiles, no node_modules
- Elegant README (this file)
- `.env` files are present with safe placeholders

---

## Customization

- **Change lesson content** → edit `frontend/src/data/lesson.js`.
- **Change the observation image** → replace `IMAGE_URL` in `data/lesson.js`.
- **Change palette / fonts** → `frontend/tailwind.config.js` + `public/index.html`.
- **Add a new slide** → create a component, register in `frontend/src/slides/index.js`.
- **Add another lesson** → duplicate `data/lesson.js` + the slide files, add a
  router in `App.js`.

---

## Roadmap (V2 candidates)

- Adaptive difficulty reveal (vocab words that stumped the class get flagged).
- Blackout / curtain mode (`B`) for "listen only, no visual".
- QR-bridge for a phone-optimized student takeaway per slide.
- Confidence dial for role-play (pre / post).
- One-click printable Class Recap on Screen 34.
- Silent-vote tally animated from Zoom-chat responses.

---

Enjoy the class — *let's get it signed.*
