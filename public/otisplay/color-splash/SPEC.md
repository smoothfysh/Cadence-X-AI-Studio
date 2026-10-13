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

7. **Tactile Watercolor Easel Aesthetic:**
   - Frosted glass easel card stage with subtle paint splatter background wallpaper.
   - Organic SVG paint splat buttons with glossy specular bubbles and color label tags.
   - Background canvas splatter engine (`SplashCanvasEngine`) rendering organic fluid splatters with radiating droplet beads.

## Layout Structure

```
.color-splash (100dvh, flex column)
  .cx-game-nav-container (Cadence-X global header + return bar)
  .cs-top-bar
    .cs-title-box (Title + emoji badge + subtitle)
    .cs-controls-group (Mode, Sound, Voice, Reset pill buttons)
  .cs-play-arena
    canvas#csSplashCanvas (Background watercolor splatter layer)
    .cs-easel-card (Main art stage)
      .cs-character-section (Splishy droplet + aura glow)
      .cs-prompt-bubble (Speaker icon + spoken prompt text)
      .cs-options-container (.cs-splat-btn × 3-4)
      .cs-free-studio-bar (.cs-paint-well × 11 + Clear button)
  .cs-bottom-bar
    .cs-stars-track (.cs-star-badge × 3)
    .cs-status-msg ("Round N of 3 · Round Title (turn/total)")
  .game-footer
```

## Responsive Breakpoints

| Breakpoint | Layout Mode | Splat Button Size | Splishy Character Size | Prompt Font |
|---|---|---|---|---|
| Desktop (>768px) | Centered easel | 96–114px | 150×175px | 1.45rem |
| Tablet (481–768px) | Centered easel | 82–92px | 135×155px | 1.25rem |
| Mobile (361–480px) | Compact easel | 76×76px | 120×135px | 1.05rem |
| Small Mobile (≤360px)| Micro easel | 68×68px | 110×120px | 0.95rem |

## Architectural Integrity & Safety

- Non-blocking standalone vanilla JavaScript (`game.js`) requiring zero build steps or bundlers.
- Modular separation into `index.html`, `style.css`, and `game.js`.
- Full integration with Cadence-X header and Otis Play navigation.
- Preserves and enhances shared utilities from `shared.js` (`OtisAudio`, `OtisParticles`, `OtisSpeech`, `createCelebration`, `shuffleArray`).
