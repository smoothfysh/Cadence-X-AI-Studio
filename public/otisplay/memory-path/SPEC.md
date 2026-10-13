# Memory Path — Game Spec (Modernized)

- **Age Group:** 3–6 (Toddlers & Early Preschool)
- **Files:** `memory-path/index.html`, `memory-path/style.css`, `memory-path/game.js`
- **Dependencies:** `../styles/main.css`, `../scripts/shared.js`

## Description

**Memory Path** is a delightful, tactile musical memory game designed specifically for young children. Players watch and listen as magical crystals illuminate in an enchanted glade, then tap along to repeat the soothing musical melody.

The modernized version transforms the original single-file implementation into a modular, multi-sensory experience featuring tuned pentatonic crystal chimes, Montessori melody step pods, an expressive guide mascot (**Otis the Star Owl**), a free-play sandbox mode, gentle non-punitive feedback, and adjustable pacing.

---

## Key Highlights & Modernizations

1. **Dual Child-Friendly Play Modes:**
   - **🎯 Quest Mode (Adventure Path):** 6 progressive levels with gentle scaffolding (starting at just 2 notes), visual milestone stars, and celebration fanfare on completion.
   - **🎵 Free Melody Mode (Musical Sandbox):** Open-ended toddler playground with no sequence targets, no mistakes, and zero pressure. Children can freely tap crystals to play harmonious chimes, spawn floating notes, and trigger sparkle fireworks.

2. **Harmonious Pentatonic Crystal Synthesizer (Web Audio API):**
   - Tuned to the pure **Pentatonic Scale** (C5, D5, E5, G5, A5, C6).
   - Notes are mathematically guaranteed to harmonize together, creating an enchanting music-box quality.
   - Dual-oscillator bell overtone synthesis: Fundamental sine + bell shimmer + crystal sparkle overtone with organic exponential decay.
   - Dedicated Sound (🎵/🔇) toggle with `localStorage` persistence.

3. **Montessori Melody Step Pods (One-to-One Visual Correspondence):**
   - Visual glowing crystal pods at the top of the glade display the exact length of the sequence.
   - During the demonstration, pods illuminate in real time.
   - During the child's turn, each correct tap fills a pod with the crystal's vibrant color and a shining star (★).
   - Children can clearly SEE their progress, eliminating working memory anxiety and cognitive overload.

4. **Otis the Star Owl Guide:**
   - Interactive SVG mascot perched in the mission banner.
   - Animated floating motion, blinking eyelids (`@keyframes eyeBlink`), and joyful hops/wing flaps on success.
   - Tapping Otis triggers a playful double-chirp and spoken encouragement.

5. **Gentle, Non-Punitive Feedback:**
   - On mismatch: The tapped gem wobbles harmlessly with a soft cartoon boing. No harsh buzzers, red crosses, or lost lives.
   - The banner and voice gently guide: *"Almost! Let's watch the melody again!"*
   - A pulsating **"🔁 Watch Again"** button appears, allowing the child to replay the sequence as many times as they want.

6. **Inactivity Hint Assist:**
   - If a child stops tapping for 6 seconds on their turn:
     - Otis does a gentle hop and speaks: *"Which crystal shone next?"*
     - The next crystal in the sequence emits a gentle golden shimmer aura (`@keyframes gemHintPulse`) to guide their eye.

7. **Adjustable Pacing & Accessibility:**
   - **Speed Toggle (🐰 Normal / 🐢 Gentle):** Normal interval (750ms) vs Gentle interval (1050ms) for younger toddlers or children needing extra visual processing time.
   - **Spoken Voice Guidance (🗣️/🤫):** Web Speech API narration with natural tone, rate 0.9, and pitch 1.25.
   - **Tactile Touch Response:** Uses pointer events and generous touch targets (60px–108px) for effortless tapping on phones and tablets.

8. **Modern Responsive Design:**
   - Modular architecture: `index.html` (markup), `style.css` (design & animations), `game.js` (engine).
   - Standard Cadence-X header + dedicated Otis Play return subbar.
   - Fits within 100dvh across desktop, tablet, mobile portrait, and mobile landscape with zero overflow.

---

## Layout Structure

```
.memory-path-game (100dvh, flex column, enchanted twilight glade)
  .mp-ambient-fx (floating fireflies and stardust)
  .cx-game-nav-container (Cadence-X global header + return subbar)
  .mp-top-bar (Title + 💎 icon badge + chunky controls: Quest, Pace, Sound, Voice, Reset)
  .mp-mission-banner (Otis Mascot + spoken prompt bubble + Montessori step pods)
  .mp-stage-arena (flex:1 column / row in landscape)
    .mp-glade-platform (twilight glade platform deck with radial aura)
      .mp-gems-container (.mp-gem-card × 3-6)
    .mp-action-area ("▶ Start Song!" / "🔁 Watch Again" buttons)
  .mp-bottom-bar (.mp-star-milestone × 6 + level status message)
  .game-footer (Cadence-X footer)
```

---

## Crystals & Musical Notes Database

| Crystal | ID | Shape Silhouette | Pitch / Freq | Accent Color | Glow Aura |
|---|---|---|---|---|---|
| **Ruby Star** | `ruby` | 6-Pointed Star Diamond | C5 (523.25 Hz) | `#FF3366` | `rgba(255, 51, 102, 0.45)` |
| **Amber Sun** | `amber` | Radiant Sun Drop | D5 (587.33 Hz) | `#F59E0B` | `rgba(245, 158, 11, 0.45)` |
| **Emerald Mint** | `emerald` | Faceted Kite Crystal | E5 (659.25 Hz) | `#10B981` | `rgba(16, 185, 129, 0.45)` |
| **Sapphire Heart** | `sapphire` | Brilliant Heart Gem | G5 (783.99 Hz) | `#3B82F6` | `rgba(59, 130, 246, 0.45)` |
| **Amethyst Gem** | `amethyst` | Octagon Lotus Jewel | A5 (880.00 Hz) | `#8B5CF6` | `rgba(139, 92, 246, 0.45)` |
| **Topaz Aqua** | `topaz` | Prism Crystal | C6 (1046.50 Hz) | `#06B6D4` | `rgba(6, 182, 212, 0.45)` |

---

## Quest Levels Progression

| Level | Title | Gem Count | Sequence Length | Toddler Learning Objective |
|---|---|---|---|---|
| 1 | Sparkle Steps | 3 gems | 2 notes | Introduction & confidence builder (instant win) |
| 2 | Melody Trail | 3 gems | 3 notes | 3-note melody recall |
| 3 | Crystal Meadow | 4 gems | 3 notes | Distractor discrimination (4 gems on stage) |
| 4 | Star Path | 4 gems | 4 notes | 4-step sequence memory |
| 5 | Glade Symphony | 5 gems | 4 notes | Extended palette recognition |
| 6 | Grand Melodist | 5 gems | 5 notes | Master melody celebration & trophy reward |

---

## Audio & Feedback Architecture

| Event | Sound Engine | Visual & Speech Feedback |
|---|---|---|
| Crystal illuminates (demo) | `SoundEngine.playCrystalTone(f)` | Glow ring, scale(1.12), floating 🎵 note, step pod active |
| Correct tap | `SoundEngine.playCrystalTone(f)` | Pressed scale, floating ✨ note, step pod fills with star |
| Incorrect tap | `SoundEngine.playGentleWobble()` (soft boing) | Gem wiggles, Otis looks sympathetic, "Watch Again" appears |
| Level completed | Sequential arpeggio chime wave + `playFanfare()` | Particle bursts per gem, Otis cheer hop, prompt praise |
| All levels done | `SoundEngine.playFanfare()` | `createCelebration()` modal with 🏆 trophy, replay & menu options |
| Mascot tap | `SoundEngine.playMascotChirp()` | Otis cheer hop, spoken friendly hoot |
| Idle hint (6s) | `Narrator.speak()` | Target gem golden shimmer pulse (`@keyframes gemHintPulse`) |

---

## Responsive Breakpoints

| Breakpoint | Platform Padding | Gem Card Dimensions | Mascot Size | Font Scale |
|---|---|---|---|---|
| Desktop (>768px) | 16px 20px 24px | 96×118px | 72×72px | 1.15rem |
| Tablet (481–768px) | 12px 14px 18px | 82×102px | 62×62px | 1.05rem |
| Mobile (≤480px) | 10px 8px 14px | 68×86px | 52×52px | 0.92rem |
| Landscape (height ≤520px) | 4px 12px 8px | 66×72px | 44×44px | 0.90rem |

---

## Architectural Integrity & Safety

- Standalone vanilla JavaScript requiring zero build steps or external bundlers.
- Modular separation into `index.html`, `style.css`, and `game.js`.
- Full integration with the global Cadence-X header and dedicated Otis Play return subbar.
- Non-consecutive sequence generation prevents confusing adjacent double taps for toddlers.
- Safe `isShowing` and `canTap` guards prevent input desync during demonstration playback.
- Pointer events with `pointerdown` for zero-lag touch response.
- `localStorage` persistence preserves user volume, voice, speed, and mode choices.
