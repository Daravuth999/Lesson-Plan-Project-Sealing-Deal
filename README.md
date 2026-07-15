# Sealing the Deal — Client Meetings & Negotiation
### An immersive, instructor-led React lesson experience

A polished 34-screen presentation deck built for adult business-English learners
watching over Zoom. Designed for PC 16:9 landscape with cinematic charcoal + gold
styling, animated intonation curves, voice-wave rhythm, linking-sound bridges,
click-to-reveal cues, and speaking timers.

---

## Tech stack

- React 18 (Create React App)
- Framer Motion (transitions + micro-animations)
- Tailwind CSS (utility styling)
- Lucide React (icons)
- Fonts (via Google Fonts): Cormorant Garamond · IBM Plex Sans · IBM Plex Mono
- Minimal FastAPI stub in `/backend` (only `/api/health` — pure frontend app)

---

## Quick start

### Prerequisites
- Node.js 18+ and Yarn (`npm i -g yarn`)
- Python 3.11+ (only if you want to run the backend health stub)

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

## Presenting

- Full-screen the browser (F11) after opening `http://localhost:3000`.
- Keyboard controls:
  - **→** / **Space** / **PageDown** — next slide
  - **←** / **PageUp** — previous slide
  - **Escape** — close the section menu
- Bottom bar (subtle) — prev / next / counter / section-menu / live progress.
- Click the ⊞ icon (bottom center) to jump between the 9 lesson sections.

---

## Project layout

```
frontend/src/
├── App.js                     # slide state + keyboard handler
├── data/lesson.js             # ALL lesson content (vocab, dialogue, phrases…)
├── components/                # reusable primitives
│   ├── InstructorNav.jsx      # bottom bar + section menu overlay
│   ├── CueWord.jsx            # click-to-reveal vocabulary word
│   ├── ClickReveal.jsx        # hidden answer / definition chip
│   ├── IntonationCurve.jsx    # animated SVG rising/falling/rise-fall/fall-rise
│   ├── VoiceWave.jsx          # rhythm underline wave
│   ├── LinkingBridge.jsx      # arc connecting linked words
│   ├── Timer.jsx              # 60s / 90s speaking timer
│   └── StressWord.jsx         # stressed-syllable pulse
└── slides/
    ├── Intro.jsx              # Screens 1–6  (title, outcomes, image, warm-up)
    ├── Vocabulary.jsx         # Screens 7–9
    ├── Conversation.jsx       # Screens 10–14
    ├── Pronunciation.jsx      # Screens 15–19
    ├── Practice.jsx           # Screens 20–24
    ├── Comprehension.jsx      # Screens 25–27
    ├── Roleplay.jsx           # Screens 28–32
    ├── Closing.jsx            # Screens 33–34
    └── index.js               # SLIDES registry
backend/
├── server.py                  # FastAPI health stub only
├── requirements.txt
└── .env
```

---

## Customization tips

- **Change lesson content** → edit `frontend/src/data/lesson.js` (vocab list,
  dialogue turns, listening blanks, role-play scenarios, phrase bank…).
- **Change the observation image** → replace `IMAGE_URL` in `data/lesson.js`.
- **Change palette / fonts** → `frontend/tailwind.config.js` + `public/index.html`.
- **Add a new slide** → create a component, then register it in
  `frontend/src/slides/index.js`.

Enjoy the class — *let's get it signed.* ✎
