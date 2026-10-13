# Shape Sorter — Modernized Game Spec

- **Age Group:** 2–4 (Toddler / Preschool)
- **Files:** `shape-sorter/index.html`, `shape-sorter/style.css`, `shape-sorter/game.js`
- **Dependencies:** `../styles/main.css`, `../scripts/shared.js`

## Description

A modern, tactile Montessori-inspired wooden shape sorter game designed specifically for young children (ages 2–4). Players match vibrant, friendly shape characters with kawaii blinking faces into recessed wooden silhouette cutout slots across 3 progressive rounds.

## Key Modernizations

1. **Dual Play Modes (Toddler Ergonomics):**
   - **Pointer Drag-and-Drop:** Smooth 60fps dragging with `setPointerCapture`, GPU-accelerated transforms, and lifted shadow dynamics.
   - **Tap-to-Place (Alternative for Little Fingers):** Tap a shape to select it (plays a cute wiggle and audio name pronunciation), then tap the matching cutout slot to watch the shape fly smoothly into place. Enables children with emerging fine motor coordination to play without frustration.

2. **Magnetic Snapping & Forgiving Proximity:**
   - Detects proximity using Euclidean distance and bounding boxes.
   - Generous snap radius (~85% of slot dimension) pulls shapes toward matching slots and illuminates them with warm magnetic glow waves.

3. **Tactile Toybox & Wooden Board Aesthetic:**
   - Soft recessed silhouette slots with realistic inner shadows and dashed silhouette outlines.
   - White toy shelf bay layout prevents jarring grid reflows when pieces are lifted.
   - Elastic glide-back animation on missed drops (no abrupt teleportation).

4. **10 Expressive Kawaii Shapes:**
   - High-DPI SVGs with vibrant candy gradients, specular highlights, blushing cheeks, smiling mouths, and synchronized blinking eyes (`@keyframes eyeBlink`).
   - Shapes pool: Circle, Square, Triangle, Star, Heart, Diamond, Hexagon, Cloud, Crescent Moon, Oval.

5. **Multi-Sensory Audio & Speech:**
   - Custom synthesized wooden block snap / clack sound + harmonic chime on correct placement.
   - Spoken shape pronunciation via `OtisSpeech` (e.g. "Circle!", "Great job!").
   - Friendly non-punitive wobble on mismatch.
   - Dedicated Sound (🎵/🔇) and Voice (🗣️/🤫) toggle buttons with `localStorage` memory.

6. **Round Progression & Star Badges:**
   - Round 1 (Gentle): 4 shapes (`circle`, `square`, `triangle`, `star`)
   - Round 2 (Exploring): 5 shapes (`circle`, `square`, `triangle`, `heart`, `diamond`)
   - Round 3 (Mastery): 6 shapes (`star`, `heart`, `hexagon`, `cloud`, `crescent`, `oval`)
   - 3 interactive golden star badges at bottom track progress.
   - Joyful victory fanfare and rainbow star celebration overlay at completion.

7. **Inactivity Hint Assist:**
   - If child is idle for 7 seconds, the next unplaced shape gently wiggles and pulses its target silhouette slot to provide encouraging direction.

## Layout Structure

```
.shape-sorter (100dvh, flex column)
  .cx-game-nav-container (Cadence-X global header + return bar)
  .ss-top-bar
    .ss-title-box (Title + emoji badge + subtitle)
    .ss-controls-group (Sound, Voice, Reset pill buttons)
  .ss-play-arena (flex row on desktop, flex column-reverse on mobile)
    .ss-panel.ss-panel-tray (left/bottom) — Holds .ss-bay > .ss-shape
    .ss-panel.ss-panel-board (right/top) — Holds recessed .ss-slot targets
  .ss-bottom-bar
    .ss-stars-track (.ss-star-badge × 3)
    .ss-status-msg ("Round N of 3 · Match X shapes!")
  .game-footer
```

## Responsive Breakpoints

| Breakpoint | Layout | Shape Size | Slot Size | Bay Size |
|---|---|---|---|---|
| Desktop (>820px) | Side-by-side row | 86×86px | 96×96px | 92×92px |
| Tablet (481–820px) | Stacked column | 74×74px | 82×82px | 78×78px |
| Mobile (361–480px) | Compact stacked | 64×64px | 72×72px | 68×68px |
| Small Mobile (≤360px) | Micro stacked | 54×54px | 60×60px | 58×58px |

## Architectural Integrity & Safety

- Non-blocking standalone vanilla JavaScript (`game.js`) requiring zero build steps or bundlers.
- Complete backwards compatibility with Cadence-X header and Otis Play navigation.
- Preserves all shared helpers in `shared.js` (`OtisAudio`, `OtisParticles`, `OtisSpeech`, `createCelebration`, `shuffleArray`).
