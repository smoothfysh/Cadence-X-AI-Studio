# Count & Drop — Game Spec (Modernized)

- **Age Group:** 2–5 (Toddlers & Early Preschool)
- **Files:** `count-drop/index.html`, `count-drop/style.css`, `count-drop/game.js`
- **Dependencies:** `../styles/main.css`, `../scripts/shared.js`

## Description

Count & Drop is a tactile, joyful numeracy and counting game designed specifically for young children. Players drop cute animal friends (kittens, puppies, bunnies, pandas, froggies, and more) from an animal toy tray into a lush meadow to match target counts.

The modernized version features both smooth drag-and-drop and one-touch "Tap to Leap" interaction (for toddlers who struggle with holding a drag across glass), visual Montessori stepping-stone counting pods, ascending musical marimba chimes for counting numbers 1–10, and spoken numbers via Web Speech API.

---

## Key Highlights & Modernizations

1. **Dual Child-Friendly Interaction Modes:**
   - **Smooth Drag & Drop:** Pointer events with elevated floating drag preview, glowing meadow border detection, and snap-to-meadow placement.
   - **Tap to Leap:** Direct tap on any tray animal immediately makes it leap gracefully into the meadow with a bouncy landing (essential for 2-year-olds who have trouble maintaining drag gestures).
   - **Tap to Return:** Tapping any placed animal inside the meadow hops it back to the tray with a pleasant pop sound and updates counts immediately.
2. **Pedagogical Numeracy (One-to-One Correspondence):**
   - **Montessori Counting Pods:** Stepping stones at the top of the screen light up sequentially (1, 2, 3...) as animals land in the meadow, giving toddlers a concrete visual benchmark of remaining slots.
   - **Musical Pitch Scale:** As numbers increment from 1 to 10, the Web Audio marimba plays ascending pitches (C4 through E5), connecting pitch height with quantity.
   - **Spoken Numeracy:** Natural voice pronunciation announces "One!", "Two!", "Three!" and celebrates correct totals ("Hooray! 3 Kittens!").
3. **Dual Play Modes:**
   - **Count Quest (Guided Mode):** 8 progressive rounds with round stars, spoken prompts, positive encouragement, and celebration screen upon completion.
   - **Free Play (Sandbox Mode):** Open-ended toddler playground with no target count, allowing children to freely explore numbers, listen to counting chimes, and tap animals.
4. **Customizable Difficulty:**
   - **Up to 5:** Default easy range for toddlers (ages 2–3).
   - **Up to 10:** Expanded counting range for older preschoolers (ages 4–5).
5. **Modern Responsive Design:**
   - Modular structure: `index.html` (markup), `style.css` (design & animations), `game.js` (engine).
   - Standard Cadence-X header + dedicated Otis Play return subbar.
   - Fluid typography via `clamp()` and responsive flexbox layout supporting mobile portrait, landscape, tablets, and desktop.
   - Persisted preferences (`localStorage`) for Sound, Voice, Mode, and Difficulty.

---

## Layout Structure

```
.count-drop (100dvh, flex column, vibrant sunny sky to green meadow)
  .cd-bg-nature (interactive smiling sun, clouds, butterflies)
  .cx-game-nav-container (Cadence-X header + return subbar)
  .cd-top-bar (Title + chunky 3D toy buttons: Quest, 1-5, Sound, Voice, Reset)
  .cd-mission-banner (Target mascot & count + prompt bubble + star stepping stones)
  .cd-play-arena (flex:1 column / row in landscape)
    .cd-meadow-zone (sunny green grassy hill with daisies, floating badge, placed animals)
      .cd-feedback-banner (integrated celebratory pop-up banner inside meadow)
    .cd-tray-zone (warm picnic blanket / toy shelf with squishy 3D animal cards)
  .cd-bottom-bar (floating milestone gold stars)
  .game-footer (Cadence-X footer)
```

---

## Animals Cast

| Animal | Emoji | Singular | Plural | Accent Color |
|---|---|---|---|---|
| Kitten | 🐱 | Kitten | Kittens | `#F59E0B` |
| Puppy | 🐶 | Puppy | Puppies | `#8B5CF6` |
| Bunny | 🐰 | Bunny | Bunnies | `#EC4899` |
| Panda | 🐼 | Panda | Pandas | `#10B981` |
| Froggy | 🐸 | Froggy | Froggies | `#14B8A6` |
| Monkey | 🐵 | Monkey | Monkeys | `#F97316` |
| Piggy | 🐷 | Piggy | Piggies | `#F43F5E` |
| Fox | 🦊 | Fox | Foxes | `#E11D48` |
| Chick | 🐥 | Chick | Chicks | `#EAB308` |
| Teddy Bear | 🐻 | Teddy Bear | Teddy Bears | `#6366F1` |

---

## Audio & Feedback Architecture

| Event | Synthesizer / Audio | Visual & Speech |
|---|---|---|
| Drop / Leap animal | `SoundEngine.playCountNote(N)` (marimba C4–E5) | Animal bounce in, pod lights up, spoken count ("N!") |
| Return animal to tray | `SoundEngine.playPopSound()` (pitch glide 450→160Hz) | Item fades, pod resets, spoken new count |
| Target reached | `SoundEngine.playFanfare()` (C-Major arpeggio) | Confetti burst, meadow glow, spoken "Hooray! Exactly N Kittens!" |
| Too many animals | `SoundEngine.playWobble()` (gentle 330/260Hz) | Friendly feedback: "Too many! Tap one to send back!" |
| Quest completed | `createCelebration()` + fanfare | Fullscreen star celebration card with replay and return options |

---

## Breakage Prevention & Accessibility

- **Pointer Capture:** Uses `setPointerCapture` and `releasePointerCapture` on pointerdown to ensure gestures do not drop mid-flight on high-refresh touchscreens.
- **Tap Disambiguation:** Measures movement vector `dist = hypot(dx, dy)`. If `< 8px`, treats as a tap; if `> 8px`, elevates to drag.
- **Mute Controls:** Dedicated sound and speech toggles ensure accessibility in classrooms, quiet rooms, or for noise-sensitive children.
- **Fallbacks:** Web Speech API gracefully falls back if unsupported without throwing errors; Web Audio handles suspended AudioContext on first gesture.
- **Safe State Updates:** Placed animals use unique identifiers and immutably track indices to prevent desync during rapid multi-finger taps.
