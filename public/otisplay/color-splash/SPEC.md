# Color Splash — Modernized Game Spec

- **Age Group:** 2–4 (Toddler / Preschool)
- **Files:** `color-splash/index.html`, `color-splash/style.css`, `color-splash/game.js`
- **Dependencies:** `../styles/main.css`, `../scripts/shared.js`

## Description

An engaging, tactile watercolor splatter and color discovery game crafted specifically for young children (ages 2–4). Players explore and master vibrant colors alongside "Splishy", an adorable animated paint droplet character with kawaii expressions, blinking eyes, and giggles. The game features both a structured 3-round golden star journey and a sensory free-splatter art mode.

## Key Modernizations

1. **Dual Play Modes & Toddler Ergonomics:**
   - **Guided Color Match (Star Challenge):** Prompts the child to find a specific color (e.g. *"Tap the Red button!"*). Large, organic paint splat buttons (~80–114px) with high-contrast text and 3D white rims provide ultra-accessible hit targets.
   - **Dual Target Forgiveness:** Tapping either the matching color button below OR Splishy the paint character in the center counts as a successful match, ensuring little fingers never get frustrated.
   - **Free Splash Art Mode:** One-tap switch in the top bar transforms the screen into an open watercolor easel canvas. Toddlers can tap or drag anywhere to splatter vibrant paint droplets with liquid bubble pops. Includes 10 colors + Rainbow palette and a "Clear" sponge button.
   - **Interactive Canvas Feed-through:** Even in Match Mode, tapping anywhere on the canvas or easel produces gentle watercolor ripples so the screen never feels unresponsive to toddler hands.

2. **Adorable Kawaii Character ("Splishy"):**
   - High-DPI SVG paint droplet with glossy 3D specular shine reflections.
   - Synchronized blinking anime eyes (`@keyframes eyeBlink`), blushing rosy cheeks, and joyful smiling mouth.
   - Floats gently during play, bounces enthusiastically on correct matches (`@keyframes splishyBounce`), and giggles/wiggles with cute squeak sounds when tapped directly.

3. **Multi-Sensory Audio & Speech Engine:**
   - Procedural Web Audio API sound synthesis:
     - Juicy wet paint splatter sound (`playSplash()`) combining bandpass-filtered noise and pitch-swept oscillators.
     - Playful bubble pops on canvas taps (`playBubblePop()`).
     - Double-chirp giggle squeak when tapping Splishy (`playGiggle()`).
     - Harmonious pentatonic chimes (`OtisAudio.playChime()`) and victory fanfares (`OtisAudio.playFanfare()`).
     - Friendly cartoon wobbles (`OtisAudio.playWobble()`) on distractor taps.
   - Spoken color pronunciations via `OtisSpeech` (e.g., "Can you tap the Red splash?", "Yellow! Super splash!").
   - Dedicated Sound (🎵/🔇) and Voice (🗣️/🤫) toggle pill buttons with `localStorage` persistence.

4. **Gentle, Non-Punitive Education:**
   - On distractor tap: The button wobbles harmlessly with a soft boing, and the voice gently guides: *"That's Blue! Where is Red?"* Zero punishment, zero red crosses, zero frustration.
   - Double-tap guard prevents toddler multi-tap double triggers.

5. **Inactivity Hint Assist:**
   - If a child stops tapping for 6 seconds:
     - Splishy wiggles to regain their attention.
     - The target color splat button pulses with a warm glowing aura (`@keyframes csHintPulse`).
     - The voice gently repeats: *"Here is [Color]!"*

6. **Round Progression & Star Badges:**
   - **Round 1 (Primary Colors):** Red, Blue, Yellow (3 turns, 3 choices per turn) → Earns Star 1 ⭐.
   - **Round 2 (Rainbow Garden):** Green, Orange, Purple, Pink (4 turns, 4 choices per turn) → Earns Star 2 ⭐⭐.
   - **Round 3 (Master Painter):** Sky Blue, Brown, White, Rainbow (4 turns, 4 choices per turn) → Earns Star 3 ⭐⭐⭐.
   - 3 interactive golden star badges at the bottom track round milestones.
   - Joyful victory celebration with confetti particles, rainbow paint splash, and fanfare on completion.

7. **Tactile Cozy Pastel Studio Aesthetic & Easel Assembly:**
   - Soft, warm pastel playroom wall backdrop with illustrated framed art, floating shelf, mountain painting, and potted houseplant decor.
   - Honey-wood tabletop easel with vertical mast, top clip, and 3 legs holding the artist's canvas.
   - Warm butter-yellow console tray across the bottom (`#FFF8E7`) holding 3D cushion squircle buttons with beveled white rims resting on organic paint puddle bases.
   - Smooth quadratic bezier spline splatter engine (`SplashCanvasEngine`) rendering natural fluid splashes with zero polygonal edges.

## Layout Structure

```
.color-splash (100dvh, flex column)
  .cx-game-nav-container (Cadence-X global header + return bar)
  .cs-studio-backdrop (Illustrated pastel wall art, floating shelf, plant decor)
  .cs-top-bar
    .cs-title-box (Title + emoji badge + subtitle)
    .cs-controls-group (Mode, Sound, Voice, Reset pill buttons)
  .cs-play-arena
    .cs-prompt-bubble (Speaker icon + spoken prompt text)
    .cs-easel-assembly (Wooden tabletop easel)
      .cs-easel-top-mast + .cs-easel-clip
      .cs-easel-card (Artist's canvas stage)
        canvas#csSplashCanvas (Background watercolor splatter layer)
        .cs-character-section (Splishy droplet + sparkles + aura glow)
      .cs-easel-ledge + .cs-easel-legs × 3
    .cs-tray-panel (Warm butter-yellow console tray)
      .cs-options-container (.cs-cushion-btn × 3-4 with .cs-puddle-base)
      .cs-free-studio-bar (.cs-paint-well × 11 + Clear button)
  .cs-bottom-bar
    .cs-stars-track (.cs-star-badge × 3)
    .cs-status-msg ("Round N of 3 · Round Title (turn/total)")
  .game-footer
```

## Responsive Breakpoints & Sizing Matrix

| Breakpoint | Layout Mode | Easel Canvas Sizing | Header & Footer | Splat Cushion / Palette Wells |
|---|---|---|---|---|
| Desktop (>1100px) | Grand easel centerpiece with framed decor | Up to 940px width, 280–560px height (48vh) | Full Cadence-X header (52px) + Subbar (44px) | 96–126px cushion buttons, 40px paint wells |
| Tablet Landscape (901–1100px) | Maximized stage with scaled room decor | 720–840px width, 260–480px height (46vh) | Full header + Subbar, footer hidden | 86–112px cushion buttons, 38px paint wells |
| Tablet Portrait (769–900px) | Maximized canvas stage without decor | 680–740px width, 260–460px height | Full header + Subbar, decor hidden | 76–98px cushion buttons, 36px paint wells |
| Mobile (≤768px) | Full-screen touch easel with finger-painting | 100% width (max 540–580px), flex height (min 240px) | Header hidden, 36–38px subbar, footer hidden | 66–82px cushion buttons, 30–34px paint wells |

### Desktop, Tablet & Mobile Ergonomics:
- **Canvas Sizing Overhaul:** The easel canvas has been quadrupled in area on desktop and tablet (expanding from ~420×280px to up to **940×560px**), utilizing the available viewport height and width while eliminating empty beige space.
- **Header Optimization:** The 52px global navigation header, drawer, and breadcrumbs are hidden on mobile view (`≤768px`), reclaiming vertical space for the canvas. The compact return bar (`← 🎮 All Games`) is preserved at 36–38px height.
- **Canvas Maximization:** The canvas expands dynamically to fill viewport width and flexes vertically (`flex: 1 1 auto; min-height: 240px`). Room decor (`.cs-studio-backdrop`) is hidden on mobile and narrow tablet portrait to eliminate visual clutter and reclaim hit space.
- **Footer Deconfliction:** Overlapping `.game-footer` text is completely hidden in Color Splash to prevent collision with the round stars track.
- **Free Splash Touch & Finger-Painting:** Full multi-touch pointer engine supporting both single taps and continuous finger-drag painting with throttled liquid splatters, bubble pops, and particle bursts. Direct taps on Splishy trigger giggles, voice lines, and paint splashes.

## Architectural Integrity & Safety

- Non-blocking standalone vanilla JavaScript (`game.js`) requiring zero build steps or bundlers.
- Modular separation into `index.html`, `style.css`, and `game.js`.
- High-performance `ResizeObserver` automatically recalibrates high-DPI canvas resolution on orientation changes or screen resize.
- Preserves and enhances shared utilities from `shared.js` (`OtisAudio`, `OtisParticles`, `OtisSpeech`, `createCelebration`, `shuffleArray`).
