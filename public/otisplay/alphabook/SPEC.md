# ABC Animal Stickers — Modernized Game Spec

- **Target Age Group:** 2–5 (Toddlers & Preschoolers)
- **Entry point:** `public/otisplay/alphabook/index.html`
- **Styles:** `alphabook/styles/game.css` and `alphabook/style.css`
- **Modules:** `js/animals.js`, `js/facts.js`, `js/audio.js`, `js/state.js`, `js/book.js`, `js/game.js`, `js/app.js`
- **Shared deps:** `../styles/main.css`, `../scripts/shared.js`
- **Assets:** `alphabook/assets/*.png` (120 animal illustrations with fallback to high-resolution emoji stickers)

---

## 1. Overview & Modernization Summary

ABC Animal Stickers is a cheerful, tactile alphabet and phonics discovery game tailored specifically for young children (ages 2–5). 

Originally created as a monolithic HTML file, the game has been fully modernized into a fast, modular web application aligned with the Cadence-X and Otis Play design system (`color-splash`, `shape-pop`, `count-drop`).

### Key Upgrades:
1. **Cadence-X & Otis Play Ecosystem Integration:**
   - Full global header with mobile drawer and local hostname rewriter.
   - Dedicated Otis Play subbar (`cx-game-subbar`) with breadcrumb hierarchy and back navigation to all games.
   - Consistent brand typography (Hanken Grotesk, Space Grotesk) and warm cartoon aesthetic.

2. **Chunky Kid-Friendly Toy Controls:**
   - **Mode Switcher:** Instant toggle between **📖 Sticker Album** (self-guided exploration) and **🎯 Letter Quest** (interactive animal matching).
   - **Letter Case Toggle:** One-tap cycle between `Aa` (both), `A` (uppercase), and `a` (lowercase) — reinforcing early literacy.
   - **Sound FX Toggle:** Procedural Web Audio API sound effects with `localStorage` memory.
   - **Voice Speech Toggle:** Gentle, warm preschool speech narration with `localStorage` memory.
   - **Shuffle Button:** Quick one-tap shuffle of letters and animals.

3. **Multi-Sensory Audio & Speech Engine (`js/audio.js`):**
   - Procedural Web Audio API sound synthesizer:
     - Marimba/Xylophone C Major chords on letter taps and correct answers.
     - Tactile wooden stamp thump + golden bell for collecting stickers.
     - Playful harmless cartoon wobble/boing on distractor taps.
     - Shimmering fairy dust sparkles and grand fanfare on milestones.
     - Procedural animal sounds (bird chirps, friendly growls, bee buzzing, frog ribbits, cat meows, puppy barks, dolphin sonar, mouse squeaks).
   - Web Speech API integration:
     - Warm, gentle voice (`pitch: 1.15`, `rate: 0.88`).
     - Speaks letter phonics ("A says ah! Alligator!"), animal names, friendly prompts, and read-aloud fun facts.

4. **Dual Child-Centric Game Modes:**
   - **Mode 1: 📖 Sticker Album (Explore & Learn):**
     - Horizontal A–Z Alphabet Ribbon with smooth auto-scroll.
     - Spotlight Hero Card with large floating animal sticker, tactile tap-to-bounce, and animal sounds.
     - Multi-animal selector chips (each letter has 2–6 rotating animal friends).
     - Stamp Sticker Action with golden particle burst and album progress tracking.
     - Bite-sized child-friendly fact badges (Type, Home, Loves) and a wonder-filled Fun Fact read aloud.
     - Toggleable **All 26 Letters Grid View** showing collection badges.
   - **Mode 2: 🎯 Letter Quest (Animal Match Challenge):**
     - 5 guided rounds with a 5-star progress track (⭐⭐⭐⭐⭐).
     - Giant glowing target letter bubble with repeat-speech button.
     - 3 chunky, highly accessible animal choice cards (1 correct, 2 distractors).
     - Non-punitive feedback: distractors gently wobble with a soft boing and kind guidance ("That's an Elephant! Which animal starts with B?"), zero penalties or red crosses.
     - 7-second inactivity hint: target card pulses with a warm golden glow if a toddler pauses.
     - Full-screen 🔍 image preview modal.
     - Grand celebration overlay with golden trophy 🏆, fireworks, and fanfare on round 5.

---

## 2. Architecture & File Structure

| File | Purpose |
|---|---|
| `index.html` | Clean HTML5 shell with Cadence-X header, top toy controls, ribbon, view stages, and footer |
| `styles/game.css` / `style.css` | Complete stylesheet with warm pastel palette, 3D buttons, bouncy animations, responsive breakpoints |
| `js/animals.js` | 120 animals database, letters A–Z, phonics phonetic cues, animal sound mappings, resilient image loader |
| `js/facts.js` | 120 curated preschool-friendly animal facts (type, native_to, size, diet, favorite_food, fun_fact) |
| `js/audio.js` | Procedural Web Audio synthesizer (`AlphaAudio`) and warm preschool speech narrator (`AlphaSpeech`) |
| `js/state.js` | Central state, localStorage persistence (sound, voice, case mode, collected letters/stickers) |
| `js/book.js` | Sticker Album controller: ribbon navigation, spotlight card, animal chips, stamping, 26-letter grid |
| `js/game.js` | Letter Quest controller: 5-round progression, 3 chunky choices, inactivity hints, celebration overlay |
| `js/app.js` | App orchestration: toolbar handlers, view routing, keyboard navigation (A-Z keys, arrows, 1-3 keys) |

---

## 3. Responsive Breakpoints

- **Desktop (> 768px):** Centered card layout (max-width 520px - 680px), 5-column grid view, spacious 3-column quest layout.
- **Tablet / iPad (481px – 768px):** Optimal preschool touch targets (> 64px), 4-column grid view, smooth horizontal ribbon.
- **Mobile (≤ 480px):** Single-column stacked cards, 3-column grid view, compact top bar, touch-friendly min 44px tap targets.

---

## 4. Accessibility & Preschool Ergonomics

- **Zero-Punishment Learning:** Mistakes are framed as gentle, friendly exploration without buzzers, timers, or score deductions.
- **Touch & Click Forgiveness:** Large hit targets with generous padding, preventing accidental mis-taps.
- **Keyboard Navigation:** Full support for early learners with physical keyboards or assistive devices (Arrow keys, Spacebar, 1–3 keys, A–Z letters).
- **High-Res Fallback:** If any animal PNG takes time to load, the UI immediately displays a large, vibrant emoji sticker so the screen is never blank.
